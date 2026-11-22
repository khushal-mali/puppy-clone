'use client';

import React, { useState, useEffect, useId } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Puppy } from '@/data/puppies';
import PupBuddy from '@/components/puppy/PupBuddy';

const PUPPY_DOMINANT_COLORS: Record<string, string> = {
  'maltipoo-max-male': '#785838',
  'korean-teacup-maltipoo-female': '#e8e8e8',
  'korean-teacup-poodle-female': '#f8d8b8',
  'maltipoo-cavapoo-male': '#b8a8a8',
  'toy-poodle-male-female': '#c8c8c8',
  'maltipoo-female-2': '#080808',
  'pomeranian-female': '#080808',
  'copper-male': '#e8d8c8',
  'shitzu-female': '#383848',
  'shitzu-male': '#787888',
  'maltipoo-female-1': '#e8d8c8',
  'maltipoo-female': '#e8d8c8',
  'korean-teacup-pomeranian-1': '#d8d8d8',
  'korean-teacup-pomeranian': '#484848',
  'korean-teacup-pomeranian-male': '#080808',
  'pomeranian-ace-boy': '#f8e8e8',
  'poodle-leo-male': '#f8e8e8',
  'maltipoo-mia-girl': '#b88878',
  'maltipoo-sadie-girl': '#f8d8d8',
  'blue-marle-pomeranian': '#887878',
  'pomsky-ollie-boy': '#b8c888',
  'maltipoo-bruno-boy': '#f8f8f8',
  'maltese-buddy-male': '#d8d8d8',
  'maltese-charlie-male': '#e8e8e8',
  'pomeranian-daisy-girl': '#e8e8e8',
  'pomeranian-bella-female': '#181828',
  'poodle-teddy-male': '#e8e8e8',
  'poodle-molly-female': '#c8a898',
  'pomski-coco-girl': '#f8f8f8',
  'pomsky-rosie-girl': '#e8d8b8',
  'pomeranian-leo-boy': '#e8e8e8',
  'poodle-molly-girl': '#784828',
  'poodle-rocky-boy': '#f8e8f8',
  'maltipoo-sophie-girl': '#d8b898',
  'maltipoo-lola-girl': '#f8e8e8',
  'pomeranian-rex-boy': '#c8b8b8',
  'pomsky-finn-male': '#b8b8b8',
  'maltipoo-zoe-girl': '#f8e8c8',
  'pomeranian-mimi-girl': '#f8e8e8',
  'bichon-bailey-boy': '#c8c8c8',
  puppy: '#182808',
  maltipo: '#d8d8d8',
};

interface PuppyDetailClientProps {
  puppy: Puppy;
  prevPuppy: Puppy;
  nextPuppy: Puppy;
}

export default function PuppyDetailClient({
  puppy,
  prevPuppy,
  nextPuppy,
}: PuppyDetailClientProps) {
  const dominantColor = PUPPY_DOMINANT_COLORS[puppy.slug] || '#785838';
  const displayBreed =
    puppy.slug === 'maltipoo-max-male' ? 'Maltipoo' : puppy.breed;
  const displayAge =
    puppy.slug === 'maltipoo-max-male'
      ? '3 months'
      : puppy.age === '2-3 months'
      ? '2 months'
      : puppy.age;

  // Media items (Photo 1 and optional Video 2 or additional images)
  const defaultImages =
    puppy.images && puppy.images.length > 0
      ? puppy.images
      : ['/images/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp'];

  const mediaItems =
    puppy.slug === 'maltipoo-max-male'
      ? [
          {
            type: 'image' as const,
            src: '/images/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp',
            poster: undefined,
            alt: `${puppy.name}, ${puppy.gender.toLowerCase()} ${displayBreed} puppy`,
          },
          {
            type: 'video' as const,
            src: '/images/b942a5_a1fa75c7bf2f4d688ec0ce0344baef67.mp4',
            poster: '/images/b942a5_a1fa75c7bf2f4d688ec0ce0344baef67f000.jpg',
            alt: `Video of ${puppy.name}, ${puppy.gender.toLowerCase()} ${displayBreed} puppy`,
          },
        ]
      : defaultImages.map((src, i) => ({
          type: 'image' as const,
          src,
          poster: undefined,
          alt: `${puppy.name}, photo ${i + 1} of ${defaultImages.length}`,
        }));

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0.08);

  // Track ribbon scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const p = Math.min(1, Math.max(0.08, window.scrollY / docHeight));
        setScrollProgress(p);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('');
  const [message, setMessage] = useState(
    `Hi! I'd love to know more about ${puppy.name} (${displayBreed}).`
  );
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formError, setFormError] = useState('');

  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const areaId = useId();
  const messageId = useId();

  // Lock page scroll and handle keyboard navigation when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsLightboxOpen(false);
        } else if (e.key === 'ArrowLeft') {
          handlePrev();
        } else if (e.key === 'ArrowRight') {
          handleNext();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isLightboxOpen, activeIndex, mediaItems.length]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const handleSelect = (idx: number) => {
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    if (!name.trim() || !phone.trim()) {
      setFormError('Please enter your name and phone or WhatsApp number.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    const waText = encodeURIComponent(
      `Hi TeddyPups U.A.E.! I'd like to enquire about ${puppy.name} (${displayBreed}).\n\n` +
      `Name: ${name.trim()}\n` +
      `Phone: ${phone.trim()}\n` +
      (email.trim() ? `Email: ${email.trim()}\n` : '') +
      (area.trim() ? `Area: ${area.trim()}\n` : '') +
      (message.trim() ? `Note: ${message.trim()}\n` : '')
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      window.open(`https://wa.me/919898124987?text=${waText}`, '_blank');
    }, 400);
  };

  const waHref = `https://wa.me/919898124987?text=${encodeURIComponent(
    `Hi TeddyPups U.A.E.! I'm interested in ${puppy.name} (${displayBreed}). Could you please share more details?`
  )}`;

  const currentMedia = mediaItems[activeIndex] || mediaItems[0];

  return (
    <article
      className="tp-storybook"
      style={{
        background: `linear-gradient(180deg, color-mix(in oklab, ${dominantColor} 24%, var(--color-milk)) 0, var(--color-milk) 85%)`,
      }}
    >
      {/* Top Ribbon */}
      <div aria-hidden="true" className="tp-ribbon">
        <div className="tp-ribbon__track">
          <span
            className="tp-ribbon__band"
            style={{ transform: `scaleY(${scrollProgress})` }}
          />
        </div>
      </div>

      {/* JSON-LD Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Puppies',
                item: 'https://puppy.instabizweb.com/puppies',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: puppy.name,
                item: `https://puppy.instabizweb.com/puppies/${puppy.slug}`,
              },
            ],
          }),
        }}
      />

      <div className="gutter mx-auto max-w-[110rem] pb-20 pt-8 md:pt-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-[0.95rem] font-semibold text-cocoa-soft">
          <Link className="link-ink" href="/puppies">
            Available puppies
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{puppy.name}</span>
        </nav>

        {/* Chapter 1 Header */}
        <p className="tp-chapter">
          <span aria-hidden="true" className="tp-chapter__n font-plush">
            1
          </span>
          <span className="font-scrawl">hello, it&apos;s me</span>
        </p>

        <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Media / Gallery Column */}
          <div className="min-w-0 lg:col-span-7">
            <div>
              {/* Main Storypage Display with Framer Motion Page-Turn Effect */}
              <div className="tp-storypage relative aspect-[4/5] md:aspect-[5/6]">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.button
                    key={activeIndex}
                    type="button"
                    custom={direction}
                    className="absolute inset-0 block size-full cursor-zoom-in"
                    initial={{
                      clipPath:
                        direction > 0
                          ? 'inset(0% 0% 0% 100%)'
                          : 'inset(0% 100% 0% 0%)',
                      rotateY: -14 * direction,
                      transformPerspective: 1400,
                    }}
                    animate={{
                      clipPath: 'inset(0% 0% 0% 0%)',
                      rotateY: 0,
                    }}
                    exit={{
                      opacity: 0.4,
                      scale: 0.97,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      transformOrigin: direction > 0 ? '0% 50%' : '100% 50%',
                    }}
                    onClick={() => setIsLightboxOpen(true)}
                    aria-label={`Open ${puppy.name}, ${
                      currentMedia.type === 'video' ? 'video' : 'photo'
                    } ${activeIndex + 1} of ${mediaItems.length} full screen`}
                  >
                    {currentMedia.type === 'video' ? (
                      <video
                        src={currentMedia.src}
                        poster={currentMedia.poster}
                        className="size-full object-cover"
                        muted
                        loop
                        playsInline
                        autoPlay
                        aria-label={currentMedia.alt}
                      />
                    ) : (
                      <Image
                        alt={currentMedia.alt}
                        fill
                        priority={activeIndex === 0}
                        sizes="(min-width: 1024px) 55vw, 92vw"
                        src={currentMedia.src}
                        style={{
                          objectFit: 'cover',
                          objectPosition: '53.8% 44.3%',
                          backgroundColor: dominantColor,
                        }}
                      />
                    )}
                  </motion.button>
                </AnimatePresence>

                {/* Left/Right Arrows & Page Counter */}
                {mediaItems.length > 1 && (
                  <div className="pointer-events-none absolute inset-x-4 bottom-4 flex justify-between z-10">
                    <button
                      type="button"
                      className="pointer-events-auto grid size-12 place-items-center rounded-full border-2 border-cocoa bg-milk/95 text-xl font-bold transition hover:bg-milk active:scale-95"
                      aria-label="Previous photo"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                    >
                      ‹
                    </button>
                    <span className="self-center rounded-full bg-cocoa/80 px-3 py-1 text-sm font-semibold text-milk">
                      {activeIndex + 1} / {mediaItems.length}
                    </span>
                    <button
                      type="button"
                      className="pointer-events-auto grid size-12 place-items-center rounded-full border-2 border-cocoa bg-milk/95 text-xl font-bold transition hover:bg-milk active:scale-95"
                      aria-label="Next photo"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {mediaItems.length > 1 && (
                <ul
                  className="mt-3 flex gap-3 overflow-x-auto px-1 pb-2 pt-2 [scrollbar-width:thin]"
                  aria-label={`All photos of ${puppy.name}`}
                >
                  {mediaItems.map((item, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <li key={idx} className="shrink-0">
                        <button
                          type="button"
                          aria-label={`${puppy.name}, ${item.type} ${idx + 1} of ${mediaItems.length}`}
                          aria-current={isActive ? 'true' : undefined}
                          onClick={() => handleSelect(idx)}
                          className={`relative block h-24 w-20 overflow-hidden rounded-[0.9rem] border-[3px] transition-transform duration-300 md:h-28 md:w-24 ${
                            isActive
                              ? '-rotate-3 -translate-y-1 border-toffee-deep shadow-md'
                              : 'border-cocoa/30 hover:-rotate-2 hover:border-cocoa'
                          }`}
                        >
                          <Image
                            alt=""
                            fill
                            sizes="96px"
                            src={item.poster || item.src}
                            style={{
                              objectFit: 'cover',
                              objectPosition: '53.8% 44.3%',
                              backgroundColor: dominantColor,
                            }}
                          />
                          {item.type === 'video' && (
                            <span className="absolute inset-0 grid place-items-center bg-cocoa/30 text-lg text-milk">
                              ▶
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Fullscreen Lightbox Modal */}
              {isLightboxOpen && (
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${puppy.name} photos`}
                  className="fixed inset-0 z-50 m-0 flex h-dvh max-h-none w-screen max-w-none flex-col overflow-hidden bg-cocoa/95 p-0 text-milk backdrop:bg-cocoa/70 backdrop-blur-sm"
                  onClick={() => setIsLightboxOpen(false)}
                >
                  {/* Top Bar */}
                  <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
                    <p className="font-scrawl text-lg">
                      {puppy.name},{' '}
                      {currentMedia.type === 'video' ? 'video' : 'photo'}{' '}
                      {activeIndex + 1} of {mediaItems.length}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsLightboxOpen(false)}
                      className="h-11 rounded-full bg-milk px-5 font-semibold text-cocoa transition hover:bg-milk/90 active:scale-95"
                    >
                      Close
                    </button>
                  </div>

                  {/* Media Content Viewport - Contained strictly within remaining space */}
                  <div
                    className="relative flex-1 min-h-0 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      {currentMedia.type === 'video' ? (
                        <video
                          src={currentMedia.src}
                          poster={currentMedia.poster}
                          className="h-auto max-h-full w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                          controls
                          autoPlay
                          loop
                          playsInline
                        />
                      ) : (
                        <div className="relative h-full w-full">
                          <Image
                            alt={currentMedia.alt}
                            fill
                            sizes="90vw"
                            src={currentMedia.src}
                            className="object-contain"
                            priority
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Navigation Buttons */}
                  {mediaItems.length > 1 && (
                    <div className="flex shrink-0 justify-center gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrev();
                        }}
                        className="h-12 rounded-full border-2 border-milk px-6 font-semibold transition hover:bg-milk/20 active:scale-95"
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext();
                        }}
                        className="h-12 rounded-full bg-honey px-6 font-semibold text-cocoa transition hover:bg-honey/90 active:scale-95"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Details / Puppy Board Column */}
          <div className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+5.5rem)]">
              {/* Puppy Board Tag with Swing Animation */}
              <div
                className="tp-tag tp-board mt-16 !rounded-[2.2rem_2.2rem_2.2rem_0.6rem] !p-7 md:!p-9 lg:mt-20"
                data-reveal="true"
                data-revealed="true"
              >
                <span aria-hidden="true" className="tp-tag__ring" />

                {/* Animated PupBuddy Mascot */}
                <PupBuddy
                  pose="peek"
                  facing="right"
                  label={`Teddy, peeking over ${puppy.name}'s tag`}
                  className="absolute -top-[4.8rem] right-6 w-[9.5rem]"
                />

                {/* Status Chip */}
                <span className="chip">
                  <svg
                    viewBox="0 0 64 64"
                    className="size-4 text-toffee"
                    aria-hidden="true"
                    fill="currentColor"
                  >
                    <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                  </svg>
                  {puppy.status === 'gone_home' ? 'Happy in new home' : 'Available'}
                </span>

                {/* Puppy Name & Breed */}
                <h1 className="font-plush mt-4 text-[clamp(2.6rem,5vw,4.6rem)]">
                  {puppy.name}
                </h1>
                {puppy.name !== displayBreed && (
                  <p className="mt-2 text-lg font-semibold text-cocoa-soft">
                    {displayBreed}
                  </p>
                )}

                {/* Characteristics Description */}
                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <dt className="font-scrawl text-sm text-cocoa-soft">Breed</dt>
                    <dd className="mt-0.5 text-[1.05rem] font-semibold">{displayBreed}</dd>
                  </div>
                  <div>
                    <dt className="font-scrawl text-sm text-cocoa-soft">Boy or girl</dt>
                    <dd className="mt-0.5 text-[1.05rem] font-semibold">{puppy.gender}</dd>
                  </div>
                  <div>
                    <dt className="font-scrawl text-sm text-cocoa-soft">Age</dt>
                    <dd className="mt-0.5 text-[1.05rem] font-semibold">{displayAge}</dd>
                  </div>
                  <div>
                    <dt className="font-scrawl text-sm text-cocoa-soft">Where</dt>
                    <dd className="mt-0.5 text-[1.05rem] font-semibold">{puppy.location}</dd>
                  </div>
                </dl>

                {/* CTA Action Buttons */}
                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >
                    Ask about this puppy on WhatsApp
                  </a>
                  <a href={`#enquire-${puppy.slug}`} className="btn btn-ghost">
                    Send an enquiry
                  </a>
                </div>
              </div>

              {/* Chapter 2: What comes with Puppy */}
              <div className="tp-paper mt-8 -rotate-1">
                <p className="tp-chapter">
                  <span aria-hidden="true" className="tp-chapter__n font-plush">
                    2
                  </span>
                  <span className="font-scrawl">what comes with {puppy.name}</span>
                </p>
                <h2 className="font-plush mt-1 text-[1.9rem]">Every Teddy Pup comes</h2>
                <ul className="mt-4 space-y-2.5">
                  <li className="flex items-start gap-3 font-semibold">
                    <svg
                      viewBox="0 0 32 32"
                      className="mt-0.5 size-6 shrink-0 text-toffee-deep"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 17l7 7L27 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Vaccinated
                  </li>
                  <li className="flex items-start gap-3 font-semibold">
                    <svg
                      viewBox="0 0 32 32"
                      className="mt-0.5 size-6 shrink-0 text-toffee-deep"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 17l7 7L27 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Dewormed
                  </li>
                  <li className="flex items-start gap-3 font-semibold">
                    <svg
                      viewBox="0 0 32 32"
                      className="mt-0.5 size-6 shrink-0 text-toffee-deep"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 17l7 7L27 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Verified health certificate from licensed vets
                  </li>
                  <li className="flex items-start gap-3 font-semibold">
                    <svg
                      viewBox="0 0 32 32"
                      className="mt-0.5 size-6 shrink-0 text-toffee-deep"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 17l7 7L27 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Thoroughly checked before joining your family
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter 3: The Way Home */}
        <section
          aria-labelledby={`home-steps-${puppy.slug}`}
          className="mt-20"
        >
          <p className="tp-chapter">
            <span aria-hidden="true" className="tp-chapter__n font-plush">
              3
            </span>
            <span className="font-scrawl">the way home</span>
          </p>
          <h2 id={`home-steps-${puppy.slug}`} className="font-plush text-big mt-3">
            Coming home from abroad
          </h2>
          <ol className="tp-trail tp-trail--row tp-trail--paws mt-10">
            <li>
              <span aria-hidden="true" className="tp-trail__num font-plush">
                1
              </span>
              <h3 className="font-plush-text text-xl font-bold leading-tight">
                Reserve your puppy
              </h3>
              <p className="mt-2 max-w-[38ch] text-cocoa-soft">
                Tell us which puppy has captured your heart.
              </p>
            </li>
            <li>
              <span aria-hidden="true" className="tp-trail__num font-plush">
                2
              </span>
              <h3 className="font-plush-text text-xl font-bold leading-tight">
                Personalized consultation
              </h3>
              <p className="mt-2 max-w-[38ch] text-cocoa-soft">
                We finalize details with you and share updates on your puppy&apos;s journey.
              </p>
            </li>
            <li>
              <span aria-hidden="true" className="tp-trail__num font-plush">
                3
              </span>
              <h3 className="font-plush-text text-xl font-bold leading-tight">
                Import and arrival
              </h3>
              <p className="mt-2 max-w-[38ch] text-cocoa-soft">
                We manage health checks, travel arrangements, and documentation.
              </p>
            </li>
            <li>
              <span aria-hidden="true" className="tp-trail__num font-plush">
                4
              </span>
              <h3 className="font-plush-text text-xl font-bold leading-tight">
                Welcome home
              </h3>
              <p className="mt-2 max-w-[38ch] text-cocoa-soft">
                We help your new puppy settle in and ensure a smooth transition into your home.
              </p>
            </li>
          </ol>
        </section>

        {/* Chapter 4: Enquiry Letter Form */}
        <section
          id={`enquire-${puppy.slug}`}
          aria-labelledby={`enquire-title-${puppy.slug}`}
          className="tp-letter mt-20 grid gap-10 lg:grid-cols-12"
        >
          <span aria-hidden="true" className="tp-letter__stamp">
            <svg viewBox="0 0 64 64" className="size-9" aria-hidden="true" fill="currentColor">
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
            </svg>
          </span>

          <div className="lg:col-span-4">
            <p className="tp-chapter">
              <span aria-hidden="true" className="tp-chapter__n font-plush">
                4
              </span>
              <span className="font-scrawl">dear TeddyPups…</span>
            </p>
            <h2 id={`enquire-title-${puppy.slug}`} className="font-plush text-big mt-2">
              Ask about {puppy.name}
            </h2>
            <p className="mt-4 text-cocoa-soft">
              Leave your details and our team will get back to you promptly — or message us on WhatsApp for the quickest reply.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {isSent ? (
              <motion.div
                role="status"
                initial={{ rotateX: -80, opacity: 0, y: -10 }}
                animate={{ rotateX: 0, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 160, damping: 16 }}
                className="tp-sent rounded-[2rem] border-[3px] border-cocoa bg-honey p-8 text-center"
              >
                <svg viewBox="0 0 120 84" className="tp-envelope mx-auto w-32" aria-hidden="true">
                  <path d="M6 10h108v68H6z" fill="#fffdf8" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" />
                  <path d="M6 10l54 40 54-40" fill="none" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" />
                  <circle cx="94" cy="62" r="12" fill="#c2622b" stroke="#2a170e" strokeWidth="2.5" />
                </svg>
                <p className="font-plush mt-4 text-[2rem]">Letter sent!</p>
                <p className="mx-auto mt-2 max-w-[38ch] text-cocoa-soft">
                  We received your enquiry for {puppy.name}. Opening WhatsApp for instant chat...
                </p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp mt-6"
                >
                  WhatsApp us
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={nameId} className="block text-[0.95rem] font-semibold">
                      Your name<span className="text-toffee-ink"> *</span>
                    </label>
                    <input
                      id={nameId}
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      minLength={2}
                      maxLength={80}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base outline-none transition-[border-color,box-shadow] focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
                    />
                  </div>

                  <div>
                    <label htmlFor={phoneId} className="block text-[0.95rem] font-semibold">
                      Phone or WhatsApp<span className="text-toffee-ink"> *</span>
                    </label>
                    <input
                      id={phoneId}
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base outline-none transition-[border-color,box-shadow] focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
                    />
                    <p className="mt-1 text-sm text-cocoa-soft">
                      With country code, e.g. +971 50 123 4567
                    </p>
                  </div>

                  <div>
                    <label htmlFor={emailId} className="block text-[0.95rem] font-semibold">
                      Email<span className="font-normal text-cocoa-soft"> (optional)</span>
                    </label>
                    <input
                      id={emailId}
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base outline-none transition-[border-color,box-shadow] focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
                    />
                  </div>

                  <div>
                    <label htmlFor={areaId} className="block text-[0.95rem] font-semibold">
                      Your area<span className="font-normal text-cocoa-soft"> (optional)</span>
                    </label>
                    <input
                      id={areaId}
                      name="area"
                      type="text"
                      maxLength={80}
                      autoComplete="address-level2"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base outline-none transition-[border-color,box-shadow] focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
                    />
                    <p className="mt-1 text-sm text-cocoa-soft">e.g. Dubai Marina</p>
                  </div>
                </div>

                <div>
                  <label htmlFor={messageId} className="block text-[0.95rem] font-semibold">
                    Message <span className="font-normal text-cocoa-soft">(optional)</span>
                  </label>
                  <textarea
                    id={messageId}
                    name="message"
                    rows={4}
                    maxLength={2000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1.5 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 py-3 text-base outline-none focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
                  />
                </div>

                {/* Honeypot field */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </label>
                </div>

                {formError && (
                  <p className="text-sm font-semibold text-[#b3261e]">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full disabled:opacity-70 sm:w-auto"
                >
                  {isSubmitting ? 'Posting your enquiry... 💌' : 'Send enquiry'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Previous / Next Puppy Navigation */}
        <nav aria-label="More puppies" className="mt-16 grid gap-4 sm:grid-cols-2">
          {prevPuppy && (
            <Link
              className="group flex items-center gap-5 rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 transition-transform duration-500 hover:-rotate-1 sm:last:flex-row-reverse sm:last:text-right"
              href={`/puppies/${prevPuppy.slug}`}
            >
              <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[999px_999px_0.6rem_0.6rem] border-[3px] border-cocoa bg-honey-soft">
                <Image
                  alt={prevPuppy.name}
                  fill
                  sizes="80px"
                  src={prevPuppy.images[0] || '/images/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp'}
                  style={{ objectFit: 'cover', objectPosition: '48.9% 44.1%' }}
                />
              </span>
              <span>
                <span className="font-scrawl block text-sm text-cocoa-soft">Previous pup</span>
                <span className="font-plush text-[1.6rem]">{prevPuppy.name}</span>
              </span>
            </Link>
          )}

          {nextPuppy && (
            <Link
              className="group flex items-center gap-5 rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 transition-transform duration-500 hover:-rotate-1 sm:last:flex-row-reverse sm:last:text-right"
              href={`/puppies/${nextPuppy.slug}`}
            >
              <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[999px_999px_0.6rem_0.6rem] border-[3px] border-cocoa bg-honey-soft">
                <Image
                  alt={nextPuppy.name}
                  fill
                  sizes="80px"
                  src={nextPuppy.images[0] || '/images/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg'}
                  style={{ objectFit: 'cover', objectPosition: '52.5% 42.6%' }}
                />
              </span>
              <span>
                <span className="font-scrawl block text-sm text-cocoa-soft">Next pup</span>
                <span className="font-plush text-[1.6rem]">{nextPuppy.name}</span>
              </span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
