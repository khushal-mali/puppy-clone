'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface HeroPup {
  id: string;
  name: string;
  breed: string;
  slug: string;
  image: string;
  objectPosition: string;
  bgColor: string;
}

const HERO_FRIENDS: HeroPup[] = [
  {
    id: 'maltipoo-max',
    name: 'Max',
    breed: 'Maltipoo',
    slug: 'maltipoo-max-male',
    image: '/images/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp',
    objectPosition: '53.8% 44.3%',
    bgColor: 'rgb(120, 88, 56)',
  },
  {
    id: 'korean-maltipoo',
    name: 'Korean Teacup Maltipoo',
    breed: 'Korean Teacup Maltipoo',
    slug: 'korean-teacup-maltipoo-female',
    image: '/images/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg',
    objectPosition: '52.5% 42.6%',
    bgColor: 'rgb(232, 232, 232)',
  },
  {
    id: 'korean-poodle',
    name: 'Korean Teacup Poodle',
    breed: 'Korean Teacup Poodle',
    slug: 'korean-teacup-poodle-female',
    image: '/images/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg',
    objectPosition: '54.5% 45.7%',
    bgColor: 'rgb(248, 216, 184)',
  },
  {
    id: 'maltipoo-cavapoo',
    name: 'Maltipoo & Cavapoo',
    breed: 'Maltipoo & Cavapoo',
    slug: 'maltipoo-cavapoo-male',
    image: '/images/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg',
    objectPosition: '44.7% 29.5%',
    bgColor: 'rgb(184, 168, 168)',
  },
  {
    id: 'toy-poodle',
    name: 'Toy Poodle',
    breed: 'Toy Poodle',
    slug: 'toy-poodle-male-female',
    image: '/images/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg',
    objectPosition: '65.4% 44.7%',
    bgColor: 'rgb(200, 200, 200)',
  },
  {
    id: 'maltipoo-female',
    name: 'Maltipoo',
    breed: 'Maltipoo',
    slug: 'maltipoo-female-2',
    image: '/images/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg',
    objectPosition: '64.6% 42.3%',
    bgColor: 'rgb(8, 8, 8)',
  },
  {
    id: 'pomeranian',
    name: 'Pomeranian',
    breed: 'Pomeranian',
    slug: 'pomeranian-female',
    image: '/images/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg',
    objectPosition: '40.3% 44.3%',
    bgColor: 'rgb(8, 8, 8)',
  },
  {
    id: 'copper',
    name: 'Copper',
    breed: 'Miniature Puppy',
    slug: 'copper-male',
    image: '/images/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg',
    objectPosition: '50% 50%',
    bgColor: 'rgb(160, 120, 90)',
  },
  {
    id: 'shih-tzu-female',
    name: 'Shih Tzu',
    breed: 'Shih Tzu',
    slug: 'shitzu-female',
    image: '/images/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg',
    objectPosition: '50% 50%',
    bgColor: 'rgb(210, 200, 190)',
  },
  {
    id: 'shih-tzu-male',
    name: 'Shih Tzu',
    breed: 'Shih Tzu',
    slug: 'shitzu-male',
    image: '/images/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpg',
    objectPosition: '50% 50%',
    bgColor: 'rgb(220, 210, 200)',
  },
];

const SEAT_CONFIG = [
  { x: '9%', w: '8.6rem', peek: 0.62, tilt: -5 },
  { x: '22.5%', w: '10.4rem', peek: 0.8, tilt: 3 },
  { x: '35%', w: '9.2rem', peek: 0.7, tilt: -2 },
  { x: '65%', w: '9.4rem', peek: 0.74, tilt: 3 },
  { x: '77.5%', w: '10.6rem', peek: 0.82, tilt: -3 },
  { x: '91%', w: '8.4rem', peek: 0.6, tilt: 4 },
];

const DELAYS = [1900, 2500, 1700, 2300, 2000, 2800, 1800];

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function HeroSection() {
  const SEAT_COUNT = SEAT_CONFIG.length;
  const [currentSeats, setCurrentSeats] = useState<number[]>(() =>
    HERO_FRIENDS.slice(0, SEAT_COUNT).map((_, i) => i)
  );
  const [seatStates, setSeatStates] = useState<Record<number, 'duck' | 'pop' | undefined>>({});
  const [popIndex, setPopIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [nextPupIndex, setNextPupIndex] = useState<number | null>(
    HERO_FRIENDS.length > SEAT_COUNT ? SEAT_COUNT : null
  );

  // Teddy state
  const [teddyBubble, setTeddyBubble] = useState(false);
  const [teddyText, setTeddyText] = useState('hm?');
  const [teddyHeadTilt, setTeddyHeadTilt] = useState(0);

  const lineupRef = useRef<HTMLUListElement>(null);
  const wingsRef = useRef<HTMLSpanElement>(null);
  const currentSeatsRef = useRef(currentSeats);

  useEffect(() => {
    currentSeatsRef.current = currentSeats;
  }, [currentSeats]);

  useEffect(() => {
    const el = lineupRef.current;
    if (!el) return;

    let isMounted = true;
    let isIntersecting = true;
    let pauseUntil = 0;
    const timerIds: NodeJS.Timeout[] = [];
    const setTimer = (fn: () => void, ms: number) => {
      if (!isMounted) return;
      const id = setTimeout(fn, ms);
      timerIds.push(id);
      return id;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { threshold: 0.35 }
    );
    observer.observe(el);

    const onUserActivity = () => {
      pauseUntil = performance.now() + 1200;
    };
    window.addEventListener('scroll', onUserActivity, { passive: true });
    window.addEventListener('pointerdown', onUserActivity, { passive: true });
    el.addEventListener('pointerover', onUserActivity, { passive: true });

    // Queue of puppies not currently in seats
    let waitingQueue = HERO_FRIENDS.map((_, i) => i).filter(
      (i) => !currentSeatsRef.current.includes(i)
    );
    let queue = waitingQueue.includes(SEAT_COUNT)
      ? [SEAT_COUNT, ...shuffle(waitingQueue.filter((i) => i !== SEAT_COUNT))]
      : shuffle(waitingQueue);

    let seatQueue: number[] = [];
    let lastPoppedSeat = -1;
    let delayIndex = 0;
    let retryCount = 0;

    const step = () => {
      if (!isMounted) return;
      if (document.hidden || !isIntersecting || performance.now() < pauseUntil) {
        return setTimer(step, 900);
      }

      if (HERO_FRIENDS.length <= SEAT_COUNT) {
        return executePop();
      }

      if (!queue.length) {
        queue = shuffle(
          HERO_FRIENDS.map((_, i) => i).filter(
            (i) => !currentSeatsRef.current.includes(i)
          )
        );
      }

      const nextIdx = queue[0];
      setNextPupIndex(nextIdx ?? null);

      const wingsImg = wingsRef.current?.querySelector('img');
      if (!wingsImg || !wingsImg.complete || !wingsImg.naturalWidth) {
        if (++retryCount < 15) {
          return setTimer(step, 400);
        }
        queue.push(queue.shift()!);
        setNextPupIndex(queue[0] ?? null);
        retryCount = 0;
        return setTimer(step, 800);
      }

      retryCount = 0;
      wingsImg.decode().then(executePop, executePop);
    };

    const executePop = () => {
      if (!isMounted) return;
      if (!seatQueue.length) {
        seatQueue = shuffle([0, 1, 2, 3, 4, 5]).filter(
          (seat, idx, arr) => !(idx === 0 && seat === lastPoppedSeat && arr.length > 1)
        );
      }
      const seat = seatQueue.shift();
      if (seat === undefined) return setTimer(step, 2000);
      lastPoppedSeat = seat;

      const incomingPup =
        HERO_FRIENDS.length > SEAT_COUNT ? queue.shift()! : currentSeatsRef.current[seat];

      // 1. Duck down!
      setSeatStates((prev) => ({ ...prev, [seat]: 'duck' }));

      // 2. After 360ms, swap puppy, bounce up with overshoot, and show name tag
      setTimer(() => {
        if (!isMounted) return;
        if (HERO_FRIENDS.length > SEAT_COUNT) {
          const outgoingPup = currentSeatsRef.current[seat];
          setCurrentSeats((prev) =>
            prev.map((curr, idx) => (idx === seat ? incomingPup : curr))
          );
          queue.push(outgoingPup);
          setNextPupIndex(queue[0] ?? null);
        }

        // Pop state triggers CSS animation tp-pop-up
        setSeatStates((prev) => ({ ...prev, [seat]: 'pop' }));
        // Show name tag bubble
        setPopIndex(seat);

        // Hide name tag bubble after 1800ms
        setTimer(() => {
          setPopIndex((curr) => (curr === seat ? null : curr));
        }, 1800);

        // Reset pop state after 700ms
        setTimer(() => {
          setSeatStates((prev) => ({ ...prev, [seat]: undefined }));
        }, 700);
      }, 360);

      // 3. Schedule next duck/pop
      const nextDelay = DELAYS[delayIndex++ % DELAYS.length];
      setTimer(step, nextDelay);
    };

    // Wait for initial peek animations or start after delay
    const peekAnims = [...el.querySelectorAll('.tp-lineup__pup')]
      .flatMap((pup) => pup.getAnimations())
      .filter((a) => (a as any).animationName === 'tp-peek');

    if (peekAnims.length > 0) {
      Promise.all(peekAnims.map((a) => a.finished)).then(
        () => {
          if (isMounted) setTimer(step, 400);
        },
        () => {
          if (isMounted) setTimer(step, 400);
        }
      );
    } else {
      setTimer(step, 1200);
    }

    return () => {
      isMounted = false;
      timerIds.forEach(clearTimeout);
      observer.disconnect();
      window.removeEventListener('scroll', onUserActivity);
      window.removeEventListener('pointerdown', onUserActivity);
      el.removeEventListener('pointerover', onUserActivity);
    };
  }, []);

  // Teddy playful interactions
  useEffect(() => {
    let isMounted = true;
    let timer: NodeJS.Timeout;

    const triggerTeddyBubble = () => {
      if (!isMounted) return;
      const phrases = ['hm?', 'peekaboo!', 'woof!'];
      const chosen = phrases[Math.floor(Math.random() * phrases.length)];
      setTeddyText(chosen);
      setTeddyHeadTilt(chosen === 'hm?' ? -14 : 0);
      setTeddyBubble(true);

      setTimeout(() => {
        if (!isMounted) return;
        if (chosen === 'hm?') setTeddyHeadTilt(12);
        setTimeout(() => {
          if (!isMounted) return;
          setTeddyHeadTilt(0);
          setTeddyBubble(false);
        }, 600);
      }, 1400);

      const nextTime = 8000 + Math.random() * 7000;
      timer = setTimeout(triggerTeddyBubble, nextTime);
    };

    timer = setTimeout(triggerTeddyBubble, 5000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const handleTeddyInteract = () => {
    setTeddyText('hm?');
    setTeddyHeadTilt(-14);
    setTeddyBubble(true);
    setTimeout(() => {
      setTeddyHeadTilt(12);
      setTimeout(() => {
        setTeddyHeadTilt(0);
        setTeddyBubble(false);
      }, 600);
    }, 1400);
  };

  const getSeatStyle = (index: number) => {
    const cfg = SEAT_CONFIG[index];
    return {
      '--x': cfg.x,
      '--w': cfg.w,
      '--peek': cfg.peek,
      '--tilt': `${cfg.tilt}deg`,
      '--i': index,
    } as React.CSSProperties;
  };

  return (
    <div data-section="hero">
      <section
        aria-labelledby="hero-title"
        className="tp-scene tp-hero"
        data-here="true"
        data-pup-scene="true"
        data-tone="light"
        data-visited="true"
        style={
          {
            '--sky-top': '#fffdf8',
            '--sky-bottom': '#fff1d8',
            '--quilt': '#fff1d8',
          } as React.CSSProperties
        }
      >
        <span aria-hidden="true" className="tp-hero__sun"></span>

        <div className="tp-hero__copy gutter">
          <p className="tp-hero__note font-scrawl">
            every puppy is family
            <svg
              aria-hidden="true"
              className="absolute -bottom-2 left-0 h-3 w-full text-toffee"
              preserveAspectRatio="none"
              viewBox="0 0 220 24"
            >
              <path
                d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              ></path>
            </svg>
          </p>

          <h1
            className="tp-hero__title font-plush"
            id="hero-title"
          >
            <span className="tp-hero__line">Premium teacup</span>
            <span className="tp-hero__line tp-hero__line--2">puppies in Dubai</span>
          </h1>

          <p className="tp-hero__lede">
            Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
          </p>

          <div className="tp-hero__actions">
            <a className="btn btn-primary text-white" href="/puppies">
              View available puppies
            </a>
            <a
              className="btn btn-ghost"
              href="https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project."
              rel="noopener noreferrer"
              target="_blank"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        <div className="tp-hero__stage">
          {/* Puppy photos lineup */}
          <ul
            ref={lineupRef}
            aria-label="Some of the puppies in our showroom"
            className="tp-lineup"
          >
            {currentSeats.map((pupIndex, seatIndex) => {
              const pup = HERO_FRIENDS[pupIndex];
              return (
                <li
                  key={seatIndex}
                  className="tp-lineup__seat"
                  style={getSeatStyle(seatIndex)}
                >
                  <Link
                    href={`/puppies/${pup.slug}`}
                    className="tp-lineup__pup"
                    data-pup-friend="true"
                    data-state={seatStates[seatIndex]}
                    aria-label={`Meet ${pup.name}, ${pup.breed}`}
                    onPointerEnter={() => setHoverIndex(seatIndex)}
                    onPointerLeave={() =>
                      setHoverIndex((curr) => (curr === seatIndex ? null : curr))
                    }
                    onMouseEnter={() => setHoverIndex(seatIndex)}
                    onMouseLeave={() =>
                      setHoverIndex((curr) => (curr === seatIndex ? null : curr))
                    }
                    onFocus={() => setHoverIndex(seatIndex)}
                    onBlur={() =>
                      setHoverIndex((curr) => (curr === seatIndex ? null : curr))
                    }
                  >
                    <span className="tp-lineup__photo">
                      <img
                        alt={`${pup.name}, ${pup.breed} puppy`}
                        decoding="async"
                        loading="eager"
                        sizes="11rem"
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
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Name tag bubbles overlay */}
          <ul aria-hidden="true" className="tp-lineup tp-lineup--tags">
            {currentSeats.map((pupIndex, seatIndex) => (
              <li
                key={seatIndex}
                className="tp-lineup__seat"
                style={getSeatStyle(seatIndex)}
              >
                <span
                  className="tp-lineup__ghost"
                  data-state={seatStates[seatIndex]}
                  data-tag={
                    popIndex === seatIndex || hoverIndex === seatIndex
                      ? 'show'
                      : undefined
                  }
                >
                  <span className="tp-lineup__name font-scrawl">
                    {HERO_FRIENDS[pupIndex].name}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          {/* Hidden preloader for the next waiting puppy */}
          {nextPupIndex !== null && HERO_FRIENDS[nextPupIndex] && (
            <span
              ref={wingsRef}
              aria-hidden="true"
              className="tp-lineup__wings"
              data-for={nextPupIndex}
            >
              <img
                alt=""
                decoding="async"
                loading="eager"
                sizes="11rem"
                src={HERO_FRIENDS[nextPupIndex].image}
              />
            </span>
          )}

          {/* Center cartoon Teddy */}
          <div
            className="pup-stop tp-hero__teddy cursor-pointer select-none"
            data-act="peekaboo"
            data-behind="true"
            data-facing="right"
            data-lane="true"
            data-pose="peek"
            data-pup-stop="true"
            onClick={handleTeddyInteract}
            onPointerEnter={handleTeddyInteract}
          >
            <div className="pup-buddy" data-facing="right" data-live="">
              <svg
                aria-label="Teddy, the TeddyPups puppy, peeking over the quilt"
                focusable="false"
                role="img"
                style={{ overflow: 'visible' }}
                viewBox="0 0 300 240"
              >
                <g data-p="root">
                  <ellipse
                    cx="150"
                    cy="230"
                    data-p="shadow"
                    fill="#2a170e"
                    opacity="0"
                    rx="92"
                    ry="7"
                    style={{
                      transformBox: 'fill-box',
                      transformOrigin: 'center center',
                    }}
                    transform="translate(0 0) scale(1 1)"
                  ></ellipse>
                  <g
                    data-p="body"
                    opacity="0"
                    transform="translate(0 0) rotate(0 196 206) translate(196 0) scale(1 1) translate(-196 0)"
                  >
                    <g data-p="bf" opacity="1" transform="translate(94 192) rotate(0)">
                      <path
                        d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14Z"
                        fill="#e4a352"
                      ></path>
                      <path
                        d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14"
                        fill="none"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.4"
                      ></path>
                      <path
                        d="M-3.5 29 v5 M4.5 29 v5"
                        fill="none"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.4"
                      ></path>
                    </g>
                    <g data-p="ff" transform="translate(168 192) rotate(0)">
                      <path
                        d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z"
                        fill="#e4a352"
                      ></path>
                      <path
                        d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14"
                        fill="none"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.4"
                      ></path>
                      <path
                        d="M-3.5 29 v5 M4.5 29 v5"
                        fill="none"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.4"
                      ></path>
                    </g>
                    <g data-p="tail" transform="rotate(-20 84 150)">
                      <path
                        d="M86 152 C80 146 76 140 74 136"
                        fill="none"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="9"
                      ></path>
                      <path
                        d="M86 152 C80 146 76 140 74 136"
                        fill="none"
                        stroke="#f2be6b"
                        strokeLinecap="round"
                        strokeWidth="4"
                      ></path>
                      <path
                        d="M70.0 110.0Q78.1 105.0 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134.0Q85.2 143.1 75.8 141.0Q70.0 148.3 64.2 141.0Q54.8 143.1 55.3 134.0Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105.0 70.0 110.0Z"
                        fill="#f2be6b"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.4"
                      ></path>
                    </g>
                    <g data-p="bn" opacity="1" transform="translate(110 194) rotate(0)">
                      <path
                        d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14Z"
                        fill="#f2be6b"
                      ></path>
                      <path
                        d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14"
                        fill="none"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.4"
                      ></path>
                      <path
                        d="M-3.5 27 v5 M4.5 27 v5"
                        fill="none"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.4"
                      ></path>
                    </g>
                    <path
                      d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z"
                      fill="#f2be6b"
                      stroke="#2a170e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.4"
                    ></path>
                    <path
                      d="M182.7 196.4Q169.4 196.9 166.6 183.0Q156.1 174.1 162.3 161.5Q159.6 147.6 171.9 142.2Q178.2 129.7 191.0 134.0Q203.3 128.7 210.5 140.8Q223.1 145.2 221.3 159.3Q228.4 171.5 218.5 181.0Q216.6 195.1 203.2 195.7Q193.3 205.1 182.7 196.4Z"
                      fill="#f2be6b"
                      stroke="#2a170e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.4"
                    ></path>
                    <g data-p="fn" transform="translate(186 194) rotate(0)">
                      <path
                        d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z"
                        fill="#f2be6b"
                      ></path>
                      <path
                        d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14"
                        fill="none"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.4"
                      ></path>
                      <path
                        d="M-3.5 27 v5 M4.5 27 v5"
                        fill="none"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.4"
                      ></path>
                    </g>
                  </g>
                  <g data-p="haunch" opacity="0" transform="translate(0 0)">
                    <path
                      d="M80.0 204.0Q75.1 194.9 85.7 189.9Q88.4 180.2 100.7 181.2Q110.0 174.6 119.3 181.2Q131.6 180.2 134.3 189.9Q144.9 194.9 140.0 204.0Q144.9 213.1 134.3 218.1Q131.6 227.8 119.3 226.8Q110.0 233.4 100.7 226.8Q88.4 227.8 85.7 218.1Q75.1 213.1 80.0 204.0Z"
                      fill="#f2be6b"
                      stroke="#2a170e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.4"
                    ></path>
                    <path
                      d="M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z"
                      fill="#f2be6b"
                      stroke="#2a170e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.4"
                    ></path>
                    <path
                      d="M132 222v5M139 222v5"
                      fill="none"
                      stroke="#2a170e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.4"
                    ></path>
                  </g>
                  <g
                    data-p="head"
                    transform={`translate(0 4) rotate(${teddyHeadTilt} 212 100)`}
                    style={{
                      transition: 'transform 0.35s cubic-bezier(.34, 1.56, .64, 1)',
                    }}
                  >
                    <path
                      d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z"
                      fill="#a24a1a"
                      stroke="#2a170e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                    ></path>
                    <path
                      d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z"
                      fill="#fbe3b4"
                      stroke="#2a170e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.4"
                    ></path>
                    <path
                      d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
                      data-p="earL"
                      fill="#e4a352"
                      stroke="#2a170e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.4"
                      transform="rotate(-6 174 82)"
                    ></path>
                    <path
                      d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
                      data-p="earR"
                      fill="#e4a352"
                      stroke="#2a170e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.4"
                      transform="rotate(6 250 82)"
                    ></path>
                    <path
                      d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z"
                      fill="#f2be6b"
                      stroke="#2a170e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.4"
                    ></path>
                    <path
                      d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z"
                      fill="#f2be6b"
                      stroke="#2a170e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                    ></path>
                    <path
                      d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z"
                      fill="#fbe3b4"
                    ></path>
                    <circle cx="181" cy="116" fill="#f9b9a6" opacity="0.85" r="7"></circle>
                    <circle cx="243" cy="116" fill="#f9b9a6" opacity="0.85" r="7"></circle>
                    <g data-p="eyes" transform="translate(0 0)">
                      <g data-p="open" opacity="1">
                        <g data-p="blink" transform="translate(0 0) scale(1 1)">
                          <ellipse cx="194" cy="98" fill="#2a170e" rx="7.4" ry="8.6"></ellipse>
                          <ellipse cx="230" cy="98" fill="#2a170e" rx="7.4" ry="8.6"></ellipse>
                          <circle cx="196.6" cy="94.6" fill="#fff" r="2.7"></circle>
                          <circle cx="232.6" cy="94.6" fill="#fff" r="2.7"></circle>
                          <circle cx="192" cy="101.2" fill="#fff" r="1.2"></circle>
                          <circle cx="228" cy="101.2" fill="#fff" r="1.2"></circle>
                        </g>
                      </g>
                    </g>
                    <path
                      d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101"
                      data-p="happy"
                      fill="none"
                      opacity="0"
                      stroke="#2a170e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.4"
                    ></path>
                    <path
                      d="M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97"
                      data-p="shut"
                      fill="none"
                      opacity="0"
                      stroke="#2a170e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.4"
                    ></path>
                    <path
                      d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z"
                      fill="#2a170e"
                    ></path>
                    <path
                      d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2"
                      fill="none"
                      stroke="#2a170e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                    ></path>
                    <path
                      d="M207.6 127.4 Q212 136.6 216.4 127.4 Z"
                      data-p="tongue"
                      fill="#e98c8c"
                      opacity="1"
                      stroke="#2a170e"
                      strokeLinejoin="round"
                      strokeWidth="2.2"
                    ></path>
                    <g data-p="mouth" opacity="0">
                      <path
                        d="M203 126 Q212 122 221 126 Q219 138 212 139 Q205 138 203 126 Z"
                        fill="#6b2a1c"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.6"
                      ></path>
                      <path
                        d="M206.5 133.5 Q212 130 217.5 133.5 Q215 138 212 138 Q209 138 206.5 133.5 Z"
                        fill="#e98c8c"
                      ></path>
                    </g>
                  </g>
                  <g data-p="ledge" opacity="1">
                    <path
                      d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z"
                      fill="#f2be6b"
                      stroke="#2a170e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.4"
                    ></path>
                    <path
                      d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5"
                      fill="none"
                      stroke="#2a170e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.4"
                    ></path>
                  </g>
                </g>
              </svg>
              <span
                aria-hidden="true"
                className="pup-bubble"
                data-show={teddyBubble ? 'true' : 'false'}
              >
                {teddyText}
              </span>
            </div>
          </div>

          {/* Quilt scallop border */}
          <div aria-hidden="true" className="tp-quilt">
            <svg
              className="tp-quilt__edge"
              height="40"
              preserveAspectRatio="none"
              width="100%"
            >
              <defs>
                <pattern
                  height="40"
                  id="tp-scallop"
                  patternUnits="userSpaceOnUse"
                  width="76"
                >
                  <path
                    d="M0 40V27A38 25 0 0 1 76 27V40Z"
                    style={{ fill: 'var(--quilt)' } as React.CSSProperties}
                  ></path>
                  <path
                    d="M0 27A38 25 0 0 1 76 27"
                    fill="none"
                    stroke="#2a170e"
                    strokeWidth="3"
                  ></path>
                  <path
                    d="M11 33A27 19 0 0 1 65 33"
                    fill="none"
                    opacity=".42"
                    stroke="#2a170e"
                    strokeDasharray="3.5 5.5"
                    strokeLinecap="round"
                    strokeWidth="1.6"
                  ></path>
                </pattern>
              </defs>
              <rect fill="url(#tp-scallop)" height="40" width="100%"></rect>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
