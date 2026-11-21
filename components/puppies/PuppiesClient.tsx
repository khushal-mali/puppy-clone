'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import TeddySelfPortrait from './TeddySelfPortrait';
import { AVAILABLE_PUPPIES, GONE_HOME_PUPPIES } from './puppyCardsData';

const FILTER_GROUPS = [
  {
    label: 'where',
    options: ['Everywhere', 'Imported', 'Korean Teacup'],
  },
  {
    label: 'breed',
    options: ['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'],
  },
  {
    label: 'boy or girl',
    options: ['Boys', 'Girls'],
  },
];

export default function PuppiesClient() {
  const [activeFilter, setActiveFilter] = useState<string>('Everywhere');

  const handleFilterClick = (opt: string) => {
    if (opt === 'Everywhere' || opt === activeFilter) {
      setActiveFilter('Everywhere');
    } else {
      setActiveFilter(opt);
    }
  };

  const filteredPuppies = useMemo(() => {
    if (activeFilter === 'Everywhere') {
      return AVAILABLE_PUPPIES;
    }

    return AVAILABLE_PUPPIES.filter((pup) => {
      const name = pup.name.toLowerCase();
      const meta = pup.meta.toLowerCase();
      const slug = pup.slug.toLowerCase();
      const combined = `${name} ${meta} ${slug}`;

      switch (activeFilter) {
        case 'Imported':
          return true; // All listed puppies are imported for client
        case 'Korean Teacup':
          return combined.includes('korean');
        case 'Maltipoo':
          return combined.includes('maltipoo');
        case 'Pomeranian':
          return combined.includes('pomeranian');
        case 'Poodle':
          return combined.includes('poodle');
        case 'Cavapoo':
          return combined.includes('cavapoo');
        case 'Shih Tzu':
          return combined.includes('shih tzu') || combined.includes('shitzu');
        case 'Boys':
          return meta.includes('boy') || slug.endsWith('-male') || slug.includes('-male-');
        case 'Girls':
          return meta.includes('girl') || slug.endsWith('-female') || slug.includes('-female-');
        default:
          return true;
      }
    });
  }, [activeFilter]);

  return (
    <div className="tp-page" data-page="pups">
      <section className="tp-sketchbook" aria-labelledby="pups-title">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <div className="tp-sketchbook__head">
            <div className="tp-sketchbook__words">
              <p
                className="font-scrawl text-lg text-toffee-ink"
                data-armed="true"
                data-reveal="true"
                data-revealed="true"
              >
                from Teddy&apos;s sketchbook
              </p>
              <h1
                className="font-plush text-giant tp-sketchbook__title"
                data-armed="true"
                data-reveal="true"
                data-revealed="true"
                id="pups-title"
                style={{
                  fontFamily: 'Fraunces, var(--font-fraunces), serif',
                  fontSize: 'clamp(3.1rem, 9.4vw, 9.75rem)',
                  fontWeight: 800,
                  lineHeight: 0.92,
                  letterSpacing: '-0.025em',
                  fontVariationSettings: '"SOFT" 100, "WONK" 1, "opsz" 144',
                  textWrap: 'balance',
                }}
              >
                Available puppies
                <svg
                  aria-hidden="true"
                  className="tp-sketchbook__underline"
                  preserveAspectRatio="none"
                  viewBox="0 0 400 24"
                >
                  <path
                    d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1"
                    pathLength={1}
                  />
                </svg>
              </h1>
              <p
                className="tp-sketchbook__lede text-lede mt-6 max-w-[46ch] text-cocoa-soft"
                data-armed="true"
                data-reveal="true"
                data-revealed="true"
              >
                Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
              </p>
            </div>

            <TeddySelfPortrait />
          </div>

          <div className="mt-12">
            <div>
              <div
                aria-label="Filter puppies"
                className="tp-sketchpad flex flex-col gap-4"
                role="group"
              >
                {FILTER_GROUPS.map((group) => (
                  <div key={group.label} className="flex flex-wrap items-center gap-2">
                    <span className="font-scrawl mr-1 w-full shrink-0 text-cocoa-soft sm:w-28">
                      {group.label}
                    </span>
                    {group.options.map((opt) => {
                      const isPressed = activeFilter === opt;
                      return (
                        <button
                          key={opt}
                          aria-pressed={isPressed ? 'true' : 'false'}
                          className="tp-sticker-chip"
                          type="button"
                          onClick={() => handleFilterClick(opt)}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <p
                aria-live="polite"
                className="font-scrawl mt-10 text-lg text-[var(--ink-soft)]"
              >
                {filteredPuppies.length} puppies looking for a home
              </p>

              <div>
                <ul className="tp-sketches mt-8">
                  {filteredPuppies.map((pup) => (
                    <li key={pup.slug} style={{ opacity: 1, transform: 'none' }}>
                      <Link
                        href={`/puppies/${pup.slug}`}
                        className="tp-sketch"
                        data-armed="true"
                        data-reveal="true"
                        data-revealed="true"
                        aria-label={pup.ariaLabel}
                        style={pup.style as React.CSSProperties}
                      >
                        <span className="tp-sketch__frame">
                          <svg
                            aria-hidden="true"
                            className="tp-sketch__wash"
                            style={pup.washStyle as React.CSSProperties}
                            viewBox="0 0 100 100"
                          >
                            <path d={pup.washPath} />
                          </svg>
                          <span
                            className="tp-sketch__photo"
                            style={{
                              maskImage: `url("${pup.photoMask}")`,
                              WebkitMaskImage: `url("${pup.photoMask}")`,
                            }}
                          >
                            <img
                              alt=""
                              src={pup.image}
                              sizes="(min-width: 1536px) 17rem, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw"
                              style={{
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                                inset: '0px',
                                objectFit: 'cover',
                                objectPosition: pup.objectPosition,
                                color: 'transparent',
                                backgroundColor: pup.bgColor,
                              }}
                            />
                          </span>
                          <svg
                            aria-hidden="true"
                            className="tp-sketch__ink"
                            viewBox="0 0 100 100"
                          >
                            {pup.inkLines.map((line, idx) => (
                              <path
                                key={idx}
                                className={`tp-sketch__line ${line.retrace ? 'tp-sketch__line--retrace' : ''}`}
                                d={line.d}
                                pathLength={1}
                              />
                            ))}
                            {pup.doodles}
                          </svg>
                          <span className="tp-sketch__sticker font-scrawl">
                            {pup.sticker || 'Available'}
                          </span>
                          {pup.hasVideo && (
                            <span className="tp-sketch__video">▶ video</span>
                          )}
                        </span>
                        <span className="tp-sketch__name font-plush">
                          {pup.name}
                        </span>
                        <span className="tp-sketch__meta">{pup.meta}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="gone-title" className="tp-gone-strip">
        <div className="gutter mx-auto flex max-w-[110rem] flex-col gap-10 md:flex-row md:items-center">
          <div className="md:w-1/3" data-armed="true" data-reveal="true">
            <h2
              className="font-plush text-big"
              id="gone-title"
              style={{
                fontFamily: 'Fraunces, var(--font-fraunces), serif',
                fontSize: 'clamp(2rem, 4.2vw, 4rem)',
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-0.025em',
                fontVariationSettings: '"SOFT" 100, "WONK" 1, "opsz" 144',
                textWrap: 'balance',
              }}
            >
              Already gone home
            </h2>
            <p className="mt-3 text-cocoa-soft">
              These puppies have found their families.
            </p>
            <Link className="btn btn-primary mt-6" href="/gone-home">
              See the puppies who&apos;ve gone home
            </Link>
          </div>
          <ul
            aria-label="Some puppies who have gone home"
            className="tp-gone-strip__row"
          >
            {GONE_HOME_PUPPIES.map((pup) => (
              <li key={pup.slug}>
                <Link
                  href={`/puppies/${pup.slug}`}
                  className="tp-sketch tp-sketch--small"
                  data-armed="true"
                  data-reveal="true"
                  data-revealed="true"
                  aria-label={pup.ariaLabel}
                  style={pup.style as React.CSSProperties}
                >
                  <span className="tp-sketch__frame">
                    <svg
                      aria-hidden="true"
                      className="tp-sketch__wash"
                      style={pup.washStyle as React.CSSProperties}
                      viewBox="0 0 100 100"
                    >
                      <path d={pup.washPath} />
                    </svg>
                    <span
                      className="tp-sketch__photo"
                      style={{
                        maskImage: `url("${pup.photoMask}")`,
                        WebkitMaskImage: `url("${pup.photoMask}")`,
                      }}
                    >
                      <img
                        alt=""
                        src={pup.image}
                        sizes="9rem"
                        style={{
                          position: 'absolute',
                          height: '100%',
                          width: '100%',
                          inset: '0px',
                          objectFit: 'cover',
                          objectPosition: pup.objectPosition,
                          color: 'transparent',
                          backgroundColor: pup.bgColor,
                        }}
                      />
                    </span>
                    <svg
                      aria-hidden="true"
                      className="tp-sketch__ink"
                      viewBox="0 0 100 100"
                    >
                      {pup.inkLines.map((line, idx) => (
                        <path
                          key={idx}
                          className={`tp-sketch__line ${line.retrace ? 'tp-sketch__line--retrace' : ''}`}
                          d={line.d}
                          pathLength={1}
                        />
                      ))}
                      {pup.doodles}
                    </svg>
                    <span className="tp-sketch__sticker tp-sketch__sticker--home font-scrawl">
                      gone home ♥
                    </span>
                  </span>
                  <span className="tp-sketch__name font-plush">
                    {pup.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
