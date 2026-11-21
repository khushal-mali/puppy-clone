'use client';

import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import Link from 'next/link';

interface PuppyDoor {
  id: string;
  name: string;
  meta: string;
  href: string;
  image: string;
  objectPosition: string;
  bgColor: string;
  alt: string;
}

const PUPPIES: PuppyDoor[] = [
  {
    id: 'max',
    name: 'Max',
    meta: 'Maltipoo, boy, 3 months, with video',
    href: '/puppies/maltipoo-max-male',
    image: '/images/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp',
    objectPosition: '53.8% 44.3%',
    bgColor: 'rgb(120, 88, 56)',
    alt: 'Max, male Maltipoo puppy',
  },
  {
    id: 'korean-teacup-maltipoo',
    name: 'Korean Teacup Maltipoo',
    meta: 'girl, 2 months, with video',
    href: '/puppies/korean-teacup-maltipoo-female',
    image: '/images/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg',
    objectPosition: '52.5% 42.6%',
    bgColor: 'rgb(232, 232, 232)',
    alt: 'Female Korean Teacup Maltipoo puppy',
  },
  {
    id: 'korean-teacup-poodle',
    name: 'Korean Teacup Poodle',
    meta: 'girl, 2 months',
    href: '/puppies/korean-teacup-poodle-female',
    image: '/images/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg',
    objectPosition: '54.5% 45.7%',
    bgColor: 'rgb(248, 216, 184)',
    alt: 'Female Korean Teacup Poodle puppy',
  },
  {
    id: 'maltipoo-cavapoo',
    name: 'Maltipoo & Cavapoo',
    meta: 'boy, 3 months Maltipoo & 2 months Cavapoo, with video',
    href: '/puppies/maltipoo-cavapoo-male',
    image: '/images/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg',
    objectPosition: '44.7% 29.5%',
    bgColor: 'rgb(184, 168, 168)',
    alt: 'Male Maltipoo & Cavapoo puppy',
  },
  {
    id: 'toy-poodle',
    name: 'Toy Poodle',
    meta: 'boy & girl, 2 months',
    href: '/puppies/toy-poodle-male-female',
    image: '/images/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg',
    objectPosition: '65.4% 44.7%',
    bgColor: 'rgb(200, 200, 200)',
    alt: 'Toy Poodle puppy',
  },
  {
    id: 'maltipoo-female-2',
    name: 'Maltipoo',
    meta: 'girl, 3 months, with video',
    href: '/puppies/maltipoo-female-2',
    image: '/images/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg',
    objectPosition: '64.6% 42.3%',
    bgColor: 'rgb(8, 8, 8)',
    alt: 'Female Maltipoo puppy',
  },
  {
    id: 'pomeranian-female',
    name: 'Pomeranian',
    meta: 'girl, 3 months',
    href: '/puppies/pomeranian-female',
    image: '/images/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg',
    objectPosition: '40.3% 44.3%',
    bgColor: 'rgb(8, 8, 8)',
    alt: 'Female Pomeranian puppy',
  },
  {
    id: 'copper',
    name: 'Copper',
    meta: 'Cavapoo, boy, 2 months',
    href: '/puppies/copper-male',
    image: '/images/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg',
    objectPosition: '43% 50.5%',
    bgColor: 'rgb(232, 216, 200)',
    alt: 'Copper, male Cavapoo puppy',
  },
  {
    id: 'shitzu-female',
    name: 'Shih Tzu',
    meta: 'girl, 2 months',
    href: '/puppies/shitzu-female',
    image: '/images/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg',
    objectPosition: '44.8% 42.5%',
    bgColor: 'rgb(56, 56, 72)',
    alt: 'Female Shih Tzu puppy',
  },
  {
    id: 'shitzu-male',
    name: 'Shih Tzu',
    meta: 'boy, 2 months',
    href: '/puppies/shitzu-male',
    image: '/images/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpg',
    objectPosition: '40.3% 43.6%',
    bgColor: 'rgb(120, 120, 136)',
    alt: 'Male Shih Tzu puppy',
  },
  {
    id: 'maltipoo-female-1',
    name: 'Maltipoo',
    meta: 'girl, 2.5 months',
    href: '/puppies/maltipoo-female-1',
    image: '/images/b942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.jpg',
    objectPosition: '47.5% 50.5%',
    bgColor: 'rgb(232, 216, 200)',
    alt: 'Female Maltipoo puppy',
  },
  {
    id: 'maltipoo-female',
    name: 'Maltipoo',
    meta: 'girl, 2 months',
    href: '/puppies/maltipoo-female',
    image: '/images/b942a5_6a5617708d75408b8f73725080ed0149-mv2.jpg',
    objectPosition: '56.9% 49.2%',
    bgColor: 'rgb(232, 216, 200)',
    alt: 'Female Maltipoo puppy',
  },
  {
    id: 'korean-teacup-pomeranian-1',
    name: 'Korean Teacup Pomeranian',
    meta: 'girl, 2 months',
    href: '/puppies/korean-teacup-pomeranian-1',
    image: '/images/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg',
    objectPosition: '49.9% 51.3%',
    bgColor: 'rgb(216, 216, 216)',
    alt: 'Female Korean Teacup Pomeranian puppy',
  },
  {
    id: 'korean-teacup-pomeranian',
    name: 'Korean Teacup Pomeranian',
    meta: 'girl, 2 months',
    href: '/puppies/korean-teacup-pomeranian',
    image: '/images/b942a5_967bb346583b4146acb56607f5da5f21-mv2.jpg',
    objectPosition: '49.9% 48.6%',
    bgColor: 'rgb(72, 72, 72)',
    alt: 'Female Korean Teacup Pomeranian puppy',
  },
  {
    id: 'korean-teacup-pomeranian-male',
    name: 'Korean Teacup Pomeranian',
    meta: 'boy, 2 months',
    href: '/puppies/korean-teacup-pomeranian-male',
    image: '/images/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg',
    objectPosition: '48.9% 44.1%',
    bgColor: 'rgb(8, 8, 8)',
    alt: 'Male Korean Teacup Pomeranian puppy',
  },
];

const DOOR_COLORS = ['#a24a1a', '#5a3a28', '#d4893f', '#b8644a', '#7a4a2e'];

export default function MeetSection() {
  const pinRangeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const hallRef = useRef<HTMLDivElement>(null);

  const [maxScroll, setMaxScroll] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  // Measure and adapt door sizes and track scroll dimensions
  useLayoutEffect(() => {
    const updateDimensions = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      setIsPinned(isDesktop);

      const track = trackRef.current;
      const hall = hallRef.current;

      if (hall && track && isDesktop) {
        const stage = hall.parentElement;
        const head = stage?.querySelector('.tp-meet__head') as HTMLElement | null;
        const plates = Array.from(track.querySelectorAll('.tp-door__plate')) as HTMLElement[];
        const plateHeight = Math.max(64, ...plates.map((e) => e.offsetHeight || 0));
        const floor = hall.querySelector('.tp-meet__floor') as HTMLElement | null;
        const floorHeight = floor?.offsetHeight ?? 0;
        const headHeight = head ? head.offsetTop + head.offsetHeight : 0;
        const stageH = stage?.clientHeight || window.innerHeight;

        const doorW = Math.max(
          128,
          Math.min(
            256,
            0.15 * window.innerWidth,
            (stageH - headHeight - floorHeight - plateHeight - 40) / 1.3
          )
        );
        hall.style.setProperty('--door-w', `${doorW.toFixed(0)}px`);
      } else {
        hall?.style.removeProperty('--door-w');
      }

      const max = track ? Math.max(0, track.scrollWidth - window.innerWidth) : 0;
      setMaxScroll(max);
    };

    updateDimensions();

    const ro = new ResizeObserver(updateDimensions);
    if (trackRef.current) ro.observe(trackRef.current);
    if (hallRef.current?.parentElement) ro.observe(hallRef.current.parentElement);

    window.addEventListener('resize', updateDimensions);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Scroll listener for sticky horizontal translation
  useEffect(() => {
    if (!isPinned) return;

    const onScroll = () => {
      const pinEl = pinRangeRef.current;
      const track = trackRef.current;
      const hall = hallRef.current;
      if (!pinEl || !track || !hall) return;

      const rect = pinEl.getBoundingClientRect();
      const pinHeight = Math.round(0.8 * maxScroll);
      if (pinHeight <= 0) return;

      let progress = 0;
      if (rect.top <= 0) {
        const scrolled = -rect.top;
        progress = Math.min(1, Math.max(0, scrolled / pinHeight));
      }

      const currentX = progress * maxScroll;
      track.style.transform = `translateX(-${currentX.toFixed(2)}px)`;
      hall.style.setProperty('--floor-x', `${(-currentX).toFixed(1)}px`);

      // Open doors when approaching the dog
      const dogThreshold = 0.36 * window.innerWidth;
      const children = track.children;
      for (let i = 0; i < children.length; i++) {
        const door = children[i] as HTMLElement;
        const open = door.offsetLeft - currentX < dogThreshold;
        door.dataset.open = String(open);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isPinned, maxScroll]);

  const pinHeight = isPinned && maxScroll > 0 ? Math.round(0.8 * maxScroll) : undefined;

  return (
    <div data-section="meet">
      <section
        aria-labelledby="meet-title"
        className="tp-scene tp-meet"
        data-here="false"
        data-pinned={isPinned ? 'true' : undefined}
        data-pup-scene="true"
        data-tone="light"
        data-visited="false"
        style={
          {
            '--sky-top': '#fff1d8',
            '--sky-bottom': '#fbe3b4',
          } as React.CSSProperties
        }
      >
        <div
          ref={pinRangeRef}
          data-pin-range="true"
          style={
            {
              '--pinned': isPinned ? 1 : 0,
              height: pinHeight ? `calc(100vh + ${pinHeight}px)` : undefined,
            } as React.CSSProperties
          }
        >
          <div className="tp-meet__stage">
            <header className="tp-meet__head gutter">
              <div>
                <h2 className="font-plush text-huge" id="meet-title">
                  Meet the pups
                </h2>
                <p className="text-lede mt-3 max-w-[44ch] text-[var(--ink-soft)]">
                  Real puppies, real photos, looking for their families right now.
                </p>
              </div>
              <Link className="btn btn-primary shrink-0" href="/puppies">
                See all available puppies
              </Link>
            </header>

            <div
              ref={hallRef}
              className="tp-meet__hall"
              style={
                {
                  '--door-w': '216px',
                  '--floor-x': '0.0px',
                } as React.CSSProperties
              }
            >
              <ol
                ref={trackRef}
                aria-label="Puppies looking for a family"
                className="tp-meet__track"
                data-treadmill="true"
                style={{ transform: 'none' }}
              >
                {PUPPIES.map((pup, index) => (
                  <li key={pup.id} className="tp-door" data-open="false">
                    <Link
                      className="tp-door__link"
                      href={pup.href}
                      style={
                        {
                          '--door': DOOR_COLORS[index % DOOR_COLORS.length],
                        } as React.CSSProperties
                      }
                    >
                      <span className="tp-door__plate">
                        <span className="font-plush tp-door__name">{pup.name}</span>
                        <span className="tp-door__meta">{pup.meta}</span>
                      </span>
                      <span className="tp-door__frame">
                        <span className="tp-door__room">
                          <img
                            alt={pup.alt}
                            decoding="async"
                            loading="lazy"
                            sizes="(min-width: 1024px) 15rem, 44vw"
                            src={pup.image}
                            srcSet={`${pup.image} 1x, ${pup.image} 2x`}
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
                        <span aria-hidden="true" className="tp-door__way">
                          <span className="tp-door__leaf">
                            <svg
                              aria-hidden="true"
                              className="tp-door__peephole"
                              fill="currentColor"
                              viewBox="0 0 64 64"
                            >
                              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z"></path>
                            </svg>
                            <span className="tp-door__knob"></span>
                          </span>
                        </span>
                        <span className="tp-door__tag font-scrawl">Available</span>
                      </span>
                    </Link>
                  </li>
                ))}

                <li className="tp-door tp-door--all" data-open="false">
                  <Link className="tp-door__link" href="/puppies">
                    <span className="tp-door__frame tp-door__frame--all">
                      <span className="font-plush tp-door__all">Meet them all</span>
                    </span>
                  </Link>
                </li>
              </ol>

              <div aria-hidden="true" className="tp-meet__floor"></div>

              <div
                className="pup-stop tp-meet__teddy"
                data-act="treadmill"
                data-facing="right"
                data-pose="walk"
                data-pup-stop="true"
                style={{ aspectRatio: '300 / 240' }}
              >
                <div className="pup-buddy" data-facing="right" data-live="" style={{ width: '100%', height: '100%' }}>
                  <svg aria-hidden="true" focusable="false" style={{ overflow: 'visible', width: '100%', height: '100%' }} viewBox="0 0 300 240">
                    <rect width="300" height="240" fill="none" opacity="0" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
