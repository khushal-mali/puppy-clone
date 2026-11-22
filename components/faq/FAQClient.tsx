'use client';

import React, { useState, useMemo, useId, useRef, useEffect } from 'react';
import PupBuddy from '@/components/puppy/PupBuddy';
import { FAQS_DATA, ASK_HREF, type FAQItem } from '@/data/faqData';

const TILTS = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.7, -1.9, 1.4];
const PINS = ['var(--color-toffee)', 'var(--color-sky-deep)', '#d9a13c', '#c45a6a'];

function RevealScope({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const revealAll = () => {
        root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])').forEach((el) => {
          el.dataset.revealed = 'true';
        });
      };
      revealAll();
      const m = new MutationObserver(revealAll);
      m.observe(root, { childList: true, subtree: true });
      return () => m.disconnect();
    }

    const curtainDown = () => {
      const curtain = document.querySelector('.tp-curtain');
      if (!curtain) return false;
      const state = curtain.getAttribute('data-state');
      return state === 'intro' || state === 'covering' || state === 'covered' || state === 'snap';
    };

    const pendingSet = new Set<HTMLElement>();

    const revealEl = (el: HTMLElement) => {
      el.dataset.revealed = 'true';
      observer.unobserve(el);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          if (curtainDown()) {
            pendingSet.add(el);
          } else {
            revealEl(el);
          }
        }
      },
      {
        rootMargin: '0px 0px -6% 0px',
        threshold: 0.08,
      }
    );

    const armAndObserve = (el: HTMLElement) => {
      if (el.dataset.revealed === 'true') return;
      el.dataset.armed = 'true';
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0 && !curtainDown()) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.dataset.revealed = 'true';
          });
        });
        return;
      }
      observer.observe(el);
    };

    root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])').forEach(armAndObserve);

    const mutObserver = new MutationObserver(() => {
      root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])').forEach(armAndObserve);
    });
    mutObserver.observe(root, { childList: true, subtree: true });

    const flushPending = () => {
      pendingSet.forEach(revealEl);
      pendingSet.clear();
    };

    window.addEventListener('tp:arrived', flushPending);

    let pollTimer: NodeJS.Timeout | null = null;
    const checkCurtain = () => {
      if (curtainDown()) {
        pollTimer = setTimeout(checkCurtain, 200);
      } else {
        flushPending();
      }
    };
    pollTimer = setTimeout(checkCurtain, 400);

    return () => {
      if (pollTimer) clearTimeout(pollTimer);
      observer.disconnect();
      mutObserver.disconnect();
      window.removeEventListener('tp:arrived', flushPending);
    };
  }, []);

  return (
    <div ref={containerRef} className={className} {...rest}>
      {children}
    </div>
  );
}

function HighlightText({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return (
    <>
      {parts.map((part, idx) =>
        idx % 2 ? (
          <mark key={idx}>{part}</mark>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

interface NoticeBoardProps {
  faqs: FAQItem[];
  askHref: string;
}

function NoticeBoard({ faqs, askHref }: NoticeBoardProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const searchInputId = useId();

  const query = search.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!query) return faqs;
    return faqs.filter(
      (item) => `${item.question} ${item.answer}`.toLowerCase().includes(query)
    );
  }, [faqs, query]);

  return (
    <div className="tp-notes" data-open={openId || query ? '' : undefined}>
      {/* Sidebar search & teddy */}
      <aside className="tp-notes__side" aria-label="Find a question">
        <label htmlFor={searchInputId} className="font-scrawl tp-notes__label">
          sniff out a question
        </label>
        <div className="tp-notes__search">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="tp-notes__lens">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 5 5" />
          </svg>
          <input
            id={searchInputId}
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="delivery, Korea, vaccinated…"
            autoComplete="off"
          />
        </div>
        <p className="tp-notes__count" aria-live="polite">
          {search.trim()
            ? `${filtered.length} ${filtered.length === 1 ? 'note' : 'notes'} found`
            : `${faqs.length} notes on the board`}
        </p>
        <div className="tp-notes__teddy">
          <span aria-hidden="true" className="tp-notes__bubble font-plush">
            <span className="tp-notes__q">?</span>
            <span className="tp-notes__a">!</span>
          </span>
          <PupBuddy pose="sit" label="Teddy, reading the notes" />
        </div>
        <a
          href={askHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp tp-notes__ask"
        >
          Ask your own question
        </a>
      </aside>

      {/* Sticky Notes Board */}
      <RevealScope className="tp-notes__board">
        <ul className="tp-notes__list">
          {filtered.map((item, idx) => {
            const isUnfolded =
              openId === item.id || (!!query && item.answer.toLowerCase().includes(query));

            return (
              <li
                key={item.id}
                className="tp-note"
                data-reveal="true"
                data-unfolded={isUnfolded ? '' : undefined}
                style={
                  {
                    '--tilt': `${TILTS[idx % TILTS.length]}deg`,
                    '--pin': PINS[idx % PINS.length],
                    '--i': idx,
                  } as React.CSSProperties
                }
              >
                <span aria-hidden="true" className="tp-note__pin" />
                <h2 className="tp-note__q">
                  <button
                    type="button"
                    id={`q-${item.id}`}
                    aria-expanded={isUnfolded}
                    aria-controls={`a-${item.id}`}
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  >
                    <span className="font-plush-text">
                      <HighlightText text={item.question} query={search} />
                    </span>
                    <span aria-hidden="true" className="tp-note__chevron" />
                  </button>
                </h2>
                <div
                  id={`a-${item.id}`}
                  role="region"
                  aria-labelledby={`q-${item.id}`}
                  className="tp-note__answer"
                  inert={!isUnfolded}
                >
                  <div className="tp-note__flap">
                    <p>
                      <HighlightText text={item.answer} query={search} />
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {filtered.length === 0 && (
          <div className="tp-note tp-note--empty">
            <span aria-hidden="true" className="tp-note__pin" />
            <p className="font-plush-text text-[1.2rem] font-bold">
              No note about “{search.trim()}” yet.
            </p>
            <p className="mt-2">
              <a
                href={askHref}
                target="_blank"
                rel="noopener noreferrer"
                className="link-ink"
              >
                Ask us on WhatsApp
              </a>{' '}
              and we&apos;ll answer.
            </p>
          </div>
        )}
      </RevealScope>
    </div>
  );
}

export default function FAQClient() {
  return (
    <div data-page="faq" className="tp-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS_DATA.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <section
        data-pup-scene="true"
        data-tone="dark"
        className="tp-scene tp-faqroom overflow-hidden"
        style={
          {
            '--sky-top': '#a95e32',
            '--sky-bottom': '#331c11',
          } as React.CSSProperties
        }
        aria-labelledby="faq-title"
      >
        <div className="gutter relative mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="max-w-4xl">
            <h1 id="faq-title" className="font-plush text-giant">
              Questions &amp; answers
            </h1>
            <p className="text-lede mt-6 max-w-[52ch] text-[var(--ink-soft)]">
              Can&#x27;t find what you&#x27;re looking for? Message us on WhatsApp — our team is available 24/7.
            </p>
          </header>
          <div className="mt-12 md:mt-16">
            <NoticeBoard faqs={FAQS_DATA} askHref={ASK_HREF} />
          </div>
        </div>
      </section>
    </div>
  );
}
