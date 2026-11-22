'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HAPPY_FAMILIES_PHOTOS, FamilyPhoto } from '@/data/happyFamiliesData';
import PupBuddy from '@/components/puppy/PupBuddy';

const TILTS = [-2.2, 1.6, -0.9, 2.4, -1.5, 0.8, -2.6, 1.2];
const TAPE_POSITIONS = ['center', 'left', 'right', 'corners', 'center', 'right', 'left', 'center'];
const TAPE_COLORS = ['#f6d79a', '#f9cdbf', '#cfe5f6', '#f6d79a', '#e9dcc4'];

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: 70 * direction,
    rotate: 5 * direction,
    scale: 0.92,
  }),
  center: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 26 },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: -70 * direction,
    rotate: -5 * direction,
    scale: 0.92,
    transition: { duration: 0.22 },
  }),
};

export default function HappyFamiliesClient() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(1);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const mountTime = useRef(Date.now());

  const totalPhotos = HAPPY_FAMILIES_PHOTOS.length;

  const navigatePhoto = useCallback(
    (newIndex: number, dir: number) => {
      setDirection(dir);
      setActiveIndex((newIndex % totalPhotos + totalPhotos) % totalPhotos);
    },
    [totalPhotos]
  );

  const openPhoto = useCallback((index: number) => {
    setDirection(1);
    setActiveIndex(index);
    if (dialogRef.current) {
      if (typeof dialogRef.current.showModal === 'function') {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.setAttribute('open', 'true');
      }
    }
  }, []);

  const closePhoto = useCallback(() => {
    if (dialogRef.current) {
      if (typeof dialogRef.current.close === 'function') {
        dialogRef.current.close();
      } else {
        dialogRef.current.removeAttribute('open');
      }
    }
    setActiveIndex(null);
  }, []);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        navigatePhoto(activeIndex + 1, 1);
      } else if (e.key === 'ArrowLeft') {
        navigatePhoto(activeIndex - 1, -1);
      } else if (e.key === 'Escape') {
        closePhoto();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, navigatePhoto, closePhoto]);

  // Curtain-aware reveal animations for polaroids & head elements
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        el.dataset.revealed = 'true';
      });
      return;
    }

    const curtainDown = () => {
      const curtain = document.querySelector('.tp-curtain');
      if (!curtain) return false;
      const state = curtain.getAttribute('data-state');
      if (state === 'intro') {
        return Date.now() - mountTime.current < 560;
      }
      return state === 'covering' || state === 'covered' || state === 'snap';
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
    const fallbackTimer = setTimeout(flushPending, 1600);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
      mutObserver.disconnect();
      window.removeEventListener('tp:arrived', flushPending);
    };
  }, []);

  const currentPhoto: FamilyPhoto | undefined =
    activeIndex !== null ? HAPPY_FAMILIES_PHOTOS[activeIndex] : undefined;

  return (
    <div ref={rootRef} className="tp-page" data-page="families">
      <section aria-labelledby="families-title" className="tp-memories">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Header Section */}
          <div className="tp-memories__head">
            <div>
              <p
                className="font-scrawl text-lg text-toffee-ink"
                data-reveal="true"
              >
                our wall of happy endings
              </p>
              <h1
                id="families-title"
                className="font-plush text-giant tp-memories__title"
                data-reveal="true"
              >
                Happy families
                <svg
                  aria-hidden="true"
                  className="tp-memories__heart"
                  viewBox="0 0 48 44"
                >
                  <path
                    d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                </svg>
              </h1>
              <p
                className="text-lede mt-6 max-w-[50ch] text-cocoa-soft"
                data-reveal="true"
              >
                Nothing makes us happier than seeing our puppies in loving homes!
                Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
              </p>
              <p
                className="font-scrawl mt-5 text-lg text-toffee-ink"
                data-reveal="true"
              >
                {totalPhotos} moments and counting
              </p>
            </div>

            {/* Testimonial Note */}
            <figure className="tp-memories__note" data-reveal="true">
              <span
                aria-hidden="true"
                className="tp-tape tp-tape--center"
                style={{ '--tape': '#cfe5f6' } as React.CSSProperties}
              />
              <blockquote className="font-plush-text">
                “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
              </blockquote>
              <figcaption className="font-scrawl">
                Sarah M., Dubai, UAE
              </figcaption>
            </figure>
          </div>

          {/* Wall of Polaroids */}
          <div className="mt-16 md:mt-20">
            <ul
              className="tp-wall"
              aria-label="Photos from TeddyPups families"
            >
              {HAPPY_FAMILIES_PHOTOS.map((photo, index) => {
                const tilt = TILTS[index % TILTS.length];
                const tapePos = TAPE_POSITIONS[index % TAPE_POSITIONS.length];
                const tapeColor = TAPE_COLORS[index % TAPE_COLORS.length];
                const delayMs = (index % 4) * 60;

                return (
                  <li
                    key={photo.id}
                    className="tp-wall__item"
                    data-reveal="true"
                    style={{ '--d': `${delayMs}ms` } as React.CSSProperties}
                  >
                    <button
                      type="button"
                      className="tp-wall__print"
                      onClick={() => openPhoto(index)}
                      aria-label={`Open photo ${index + 1} of ${totalPhotos}${photo.caption ? `: ${photo.caption}` : ''}`}
                    >
                      <span
                        className="tp-polaroid"
                        style={
                          {
                            '--tilt': `${tilt}deg`,
                            '--tape': tapeColor,
                            '--i': index,
                          } as React.CSSProperties
                        }
                      >
                        {tapePos === 'corners' ? (
                          <>
                            <span
                              aria-hidden="true"
                              className="tp-tape tp-tape--tl"
                            />
                            <span
                              aria-hidden="true"
                              className="tp-tape tp-tape--tr"
                            />
                          </>
                        ) : (
                          <span
                            aria-hidden="true"
                            className={`tp-tape tp-tape--${tapePos}`}
                          />
                        )}

                        <span className="tp-polaroid__photo">
                          <img
                            src={photo.url}
                            alt={photo.alt}
                            width={photo.width}
                            height={photo.height}
                            loading={index < 4 ? 'eager' : 'lazy'}
                            decoding="async"
                            style={{
                              color: 'transparent',
                              width: '100%',
                              height: 'auto',
                              backgroundColor: photo.bgColor,
                            }}
                            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
                          />
                        </span>

                        <span className="tp-polaroid__caption font-scrawl">
                          {photo.caption || ''}
                        </span>
                      </span>

                      <svg
                        aria-hidden="true"
                        className="tp-wall__paw"
                        fill="currentColor"
                        viewBox="0 0 64 64"
                      >
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Foot Section with interactive Teddy admiring the wall */}
          <div className="tp-memories__foot">
            <PupBuddy
              pose="sit"
              facing="left"
              label="Teddy, admiring the wall"
              className="w-36 md:w-44"
            />
            <p className="font-scrawl text-lg text-cocoa-soft">
              every one of them was a Teddy Pup once
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox / Photo Viewer Dialog */}
      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-cocoa/95 p-0 text-milk backdrop:bg-cocoa/70"
        onClose={() => setActiveIndex(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) closePhoto();
        }}
        data-lenis-prevent="true"
      >
        {currentPhoto && activeIndex !== null && (
          <div className="flex h-full flex-col">
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <p className="font-scrawl text-lg">
                {activeIndex + 1} / {totalPhotos}
                {currentPhoto.caption ? ` — ${currentPhoto.caption}` : ''}
              </p>
              <button
                type="button"
                onClick={closePhoto}
                className="h-11 rounded-full bg-milk px-5 font-semibold text-cocoa transition-transform hover:scale-105 active:scale-95"
              >
                Close
              </button>
            </div>

            {/* Image Slide Area */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentPhoto.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 touch-pan-y flex items-center justify-center p-4"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(_e, info) => {
                    if (info.offset.x < -80) navigatePhoto(activeIndex + 1, 1);
                    else if (info.offset.x > 80) navigatePhoto(activeIndex - 1, -1);
                  }}
                >
                  <img
                    src={currentPhoto.url}
                    alt={currentPhoto.alt}
                    className="max-h-[82vh] max-w-[90vw] rounded object-contain shadow-2xl"
                    style={{
                      backgroundColor: currentPhoto.bgColor || 'transparent',
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3">
              <button
                type="button"
                onClick={() => navigatePhoto(activeIndex - 1, -1)}
                className="h-12 rounded-full border-2 border-milk px-6 font-semibold transition-all hover:bg-milk/10 active:scale-95"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => navigatePhoto(activeIndex + 1, 1)}
                className="h-12 rounded-full bg-honey px-6 font-semibold text-cocoa transition-all hover:brightness-105 active:scale-95"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
