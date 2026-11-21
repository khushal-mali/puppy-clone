'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function JourneySection() {
  const [stepIndex, setStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);

  const stepsRef = useRef<HTMLOListElement>(null);
  const phoneScreenRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevStepRef = useRef(-1);

  // IntersectionObserver to activate steps on scroll
  useEffect(() => {
    const stepsList = stepsRef.current;
    if (!stepsList) return;
    const items = Array.from(stepsList.children);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target);
            if (idx !== -1) {
              setStepIndex(idx);
            }
          }
        }
      },
      { rootMargin: '-28% 0px -62% 0px' }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  // WhatsApp typing indicator and puppy cue on step advance
  useEffect(() => {
    if (stepIndex <= prevStepRef.current) {
      prevStepRef.current = stepIndex;
      return;
    }
    prevStepRef.current = stepIndex;
    if (stepIndex <= 0) return;

    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
      const targetEl = phoneScreenRef.current?.querySelector(`[data-step="${stepIndex}"]`);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('pup:cue', {
            detail: {
              look: targetEl as HTMLElement,
              secs: 1.4,
              say: stepIndex === 1 ? 'ooh, photos!' : stepIndex === 2 ? 'home soon!' : undefined,
            },
          })
        );
      }
    }, 750);

    return () => clearTimeout(timer);
  }, [stepIndex]);

  const handleToggleVideo = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().then(() => setPlayingVideo(true)).catch(() => {});
    } else {
      vid.pause();
      setPlayingVideo(false);
    }
  };

  return (
    <div data-section="journey">
      <section
        aria-labelledby="journey-title"
        className="tp-scene tp-chat"
        data-here="false"
        data-pup-scene="true"
        data-tone="light"
        data-visited="false"
        style={{ '--sky-top': '#f7d18d', '--sky-bottom': '#f0b866' } as React.CSSProperties}
      >
        <div className="tp-chat__grid gutter" data-pin-range="true">
          <div className="tp-chat__story">
            <h2 className="font-plush text-huge" id="journey-title">
              Your puppy journey
            </h2>
            <p className="text-lede mt-5 max-w-[42ch] text-[var(--ink-soft)]">
              A premium, step-by-step concierge experience. We make adoption simple, secure, and
              purely joyful.
            </p>
            <ol ref={stepsRef} className="tp-chat__steps">
              <li
                className="tp-chat__step"
                data-active={stepIndex === 0 ? true : undefined}
                data-done={stepIndex > 0 ? true : undefined}
              >
                <span aria-hidden="true" className="tp-chat__num font-plush">
                  1
                </span>
                <h3 className="font-plush tp-chat__title">Choose your breed</h3>
                <p className="tp-chat__text">
                  Select your preferred breed or tell us what you're looking for. We'll guide you
                  based on availability and your lifestyle.
                </p>
              </li>
              <li
                className="tp-chat__step"
                data-active={stepIndex === 1 ? true : undefined}
                data-done={stepIndex > 1 ? true : undefined}
              >
                <span aria-hidden="true" className="tp-chat__num font-plush">
                  2
                </span>
                <h3 className="font-plush tp-chat__title">Get photos & details</h3>
                <p className="tp-chat__text">
                  Our team will share real photos, health details, and all necessary information
                  directly on WhatsApp.
                </p>
              </li>
              <li
                className="tp-chat__step"
                data-active={stepIndex === 2 ? true : undefined}
                data-done={stepIndex > 2 ? true : undefined}
              >
                <span aria-hidden="true" className="tp-chat__num font-plush">
                  3
                </span>
                <h3 className="font-plush tp-chat__title">Secure & safe delivery</h3>
                <p className="tp-chat__text">
                  Once confirmed, we handle everything professionally and ensure your puppy reaches
                  you safely and stress-free.
                </p>
              </li>
            </ol>
            <Link className="btn btn-ghost tp-chat__cta" href="/how-it-works">
              How it works
            </Link>
          </div>

          <div className="tp-chat__side">
            <div
              aria-label="A WhatsApp conversation with TeddyPups U.A.E."
              className="tp-phone"
              role="group"
            >
              <div className="tp-phone__bar">
                <img
                  alt=""
                  className="tp-phone__avatar"
                  decoding="async"
                  height={40}
                  loading="lazy"
                  src="/images/logo.png"
                  srcSet="/images/logo.png 1x, /images/logo.png 2x"
                  style={{ color: 'transparent' }}
                  width={40}
                />
                <span>
                  <span className="tp-phone__name">TeddyPups U.A.E.</span>
                  <span className="tp-phone__status">
                    {isTyping ? 'typing…' : 'online'}
                  </span>
                </span>
              </div>

              <div ref={phoneScreenRef} className="tp-phone__screen">
                <p className="tp-msg tp-msg--me">
                  Hi TeddyPups! I'd love to know more about your puppies.
                </p>

                {/* Step 0 Messages */}
                <div
                  className="tp-msg-group"
                  data-step="0"
                  data-show={0 < stepIndex || (0 === stepIndex && !isTyping) ? 'true' : 'false'}
                >
                  <div className="tp-msg tp-msg--them">
                    <p>
                      Select your preferred breed or tell us what you're looking for. We'll guide
                      you based on availability and your lifestyle.
                    </p>
                    <ul aria-label="Breeds we have now" className="tp-chips">
                      <li>
                        <Link href="/puppies?breed=maltipoo">Maltipoo</Link>
                      </li>
                      <li>
                        <Link href="/puppies?breed=pomeranian">Pomeranian</Link>
                      </li>
                      <li>
                        <Link href="/puppies?breed=poodle">Poodle</Link>
                      </li>
                      <li>
                        <Link href="/puppies?breed=cavapoo">Cavapoo</Link>
                      </li>
                      <li>
                        <Link href="/puppies?breed=shih-tzu">Shih Tzu</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Step 1 Messages */}
                <div
                  className="tp-msg-group"
                  data-step="1"
                  data-show={1 < stepIndex || (1 === stepIndex && !isTyping) ? 'true' : 'false'}
                >
                  <div className="tp-msg tp-msg--them tp-msg--media">
                    <div className="tp-snaps">
                      <span className="tp-snaps__one">
                        <img
                          alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom"
                          decoding="async"
                          loading="lazy"
                          sizes="9rem"
                          src="/images/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                          srcSet="/images/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg 1x, /images/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg 2x"
                          style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            inset: '0px',
                            objectFit: 'cover',
                            objectPosition: '54.3% 48.3%',
                            color: 'transparent',
                            backgroundColor: 'rgb(104, 88, 72)',
                          }}
                        />
                      </span>
                      <span className="tp-snaps__one">
                        <img
                          alt="The apricot teddy bear puppy from our showroom, close up"
                          decoding="async"
                          loading="lazy"
                          sizes="9rem"
                          src="/images/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg"
                          srcSet="/images/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg 1x, /images/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg 2x"
                          style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            inset: '0px',
                            objectFit: 'cover',
                            objectPosition: '46% 44.4%',
                            color: 'transparent',
                            backgroundColor: 'rgb(104, 88, 72)',
                          }}
                        />
                      </span>
                      <span className="tp-snaps__one">
                        <img
                          alt="The apricot teddy bear puppy from our showroom, looking up"
                          decoding="async"
                          loading="lazy"
                          sizes="9rem"
                          src="/images/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpg"
                          srcSet="/images/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpg 1x, /images/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpg 2x"
                          style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            inset: '0px',
                            objectFit: 'cover',
                            objectPosition: '43.7% 40.2%',
                            color: 'transparent',
                            backgroundColor: 'rgb(8, 8, 24)',
                          }}
                        />
                      </span>
                      <span className="tp-snaps__one">
                        <img
                          alt="The apricot teddy bear puppy from our showroom, held up to say hello"
                          decoding="async"
                          loading="lazy"
                          sizes="9rem"
                          src="/images/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg"
                          srcSet="/images/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg 1x, /images/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg 2x"
                          style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            inset: '0px',
                            objectFit: 'cover',
                            objectPosition: '45.3% 44.4%',
                            color: 'transparent',
                            backgroundColor: 'rgb(104, 88, 72)',
                          }}
                        />
                      </span>
                    </div>
                  </div>

                  <div className="tp-msg tp-msg--them tp-msg--media">
                    <div className="tp-clip">
                      <video
                        ref={videoRef}
                        aria-label="Video of a tiny apricot teddy bear puppy in the TeddyPups showroom"
                        loop
                        muted
                        playsInline
                        poster="/images/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                        preload="none"
                        src="/videos/hero-puppy.mp4"
                        onEnded={() => setPlayingVideo(false)}
                      />
                      <button
                        aria-label={playingVideo ? 'Pause video' : 'Play video'}
                        aria-pressed={playingVideo}
                        className="tp-clip__play"
                        type="button"
                        onClick={handleToggleVideo}
                      >
                        <svg aria-hidden="true" viewBox="0 0 24 24">
                          {playingVideo ? (
                            <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
                          ) : (
                            <path d="M8 5v14l11-7z" />
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>

                  <p className="tp-msg tp-msg--them">
                    Our team will share real photos, health details, and all necessary information
                    directly on WhatsApp.
                  </p>
                </div>

                {/* Step 2 Messages */}
                <div
                  className="tp-msg-group"
                  data-step="2"
                  data-show={2 < stepIndex || (2 === stepIndex && !isTyping) ? 'true' : 'false'}
                >
                  <div className="tp-msg tp-msg--them">
                    <p>
                      Once confirmed, we handle everything professionally and ensure your puppy
                      reaches you safely and stress-free.
                    </p>
                    <svg aria-hidden="true" className="tp-route" viewBox="0 0 220 70">
                      <path className="tp-route__line" d="M14 52 C 60 6, 120 70, 170 28" />
                      <circle className="tp-route__dot" cx="14" cy="52" r="5" />
                      <path className="tp-route__home" d="M164 32 l12 -12 l12 12 v14 h-24 z" />
                      <path
                        className="tp-route__heart"
                        d="M176 42 c-2-3-7-2-6 2c1 3 6 5 6 5s5-2 6-5c1-4-4-5-6-2z"
                      />
                      <path
                        className="tp-route__paw"
                        d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z"
                        transform="translate(70 22) scale(.3) rotate(70 32 32)"
                      />
                      <path
                        className="tp-route__paw"
                        d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z"
                        transform="translate(104 38) scale(.3) rotate(100 32 32)"
                      />
                    </svg>
                  </div>
                </div>

                {/* Animated Typing Indicator */}
                <p aria-hidden="true" className="tp-typing" data-show={isTyping ? 'true' : 'false'}>
                  <span />
                  <span />
                  <span />
                </p>
              </div>

              <a
                className="tp-phone__compose"
                href="https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project."
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Say hello on WhatsApp</span>
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M3 20l18-8L3 4v6l12 2-12 2z" />
                </svg>
              </a>
            </div>

            {/* Static Stop / Anchor for Teddy in Journey section */}
            <div
              className="pup-stop tp-chat__teddy"
              data-facing="right"
              data-pose="sit"
              data-pup-stop="true"
            >
              <div className="pup-buddy" data-facing="right" data-live="">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  style={{ overflow: 'visible' }}
                  viewBox="0 0 300 240"
                >
                  <g data-p="root">
                    <ellipse
                      cx="150"
                      cy="230"
                      data-p="shadow"
                      fill="#2a170e"
                      opacity="0.12"
                      rx="92"
                      ry="7"
                      style={{ transformBox: 'fill-box', transformOrigin: 'center center' }}
                      transform="translate(0 0) scale(1 1)"
                    />
                    <g
                      data-p="body"
                      opacity="1"
                      transform="translate(0 -2) rotate(-24 196 206) translate(196 0) scale(1 1) translate(-196 0)"
                    >
                      <g data-p="bf" opacity="0" transform="translate(94 192) rotate(0)">
                        <path
                          d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14Z"
                          fill="#e4a352"
                        />
                        <path
                          d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14"
                          fill="none"
                          stroke="#2a170e"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3.4"
                        />
                        <path
                          d="M-3.5 29 v5 M4.5 29 v5"
                          fill="none"
                          stroke="#2a170e"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.4"
                        />
                      </g>
                      <g data-p="ff" transform="translate(168 192) rotate(24)">
                        <path
                          d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z"
                          fill="#e4a352"
                        />
                        <path
                          d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14"
                          fill="none"
                          stroke="#2a170e"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3.4"
                        />
                        <path
                          d="M-3.5 29 v5 M4.5 29 v5"
                          fill="none"
                          stroke="#2a170e"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.4"
                        />
                      </g>
                      <g data-p="tail" transform="rotate(34 84 150)">
                        <path
                          d="M86 152 C80 146 76 140 74 136"
                          fill="none"
                          stroke="#2a170e"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="9"
                        />
                        <path
                          d="M86 152 C80 146 76 140 74 136"
                          fill="none"
                          stroke="#f2be6b"
                          strokeLinecap="round"
                          strokeWidth="4"
                        />
                        <path
                          d="M70.0 110.0Q78.1 105.0 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134.0Q85.2 143.1 75.8 141.0Q70.0 148.3 64.2 141.0Q54.8 143.1 55.3 134.0Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105.0 70.0 110.0Z"
                          fill="#f2be6b"
                          stroke="#2a170e"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3.4"
                        />
                      </g>
                      <g data-p="bn" opacity="0" transform="translate(110 194) rotate(0)">
                        <path
                          d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14Z"
                          fill="#f2be6b"
                        />
                        <path
                          d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14"
                          fill="none"
                          stroke="#2a170e"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3.4"
                        />
                        <path
                          d="M-3.5 27 v5 M4.5 27 v5"
                          fill="none"
                          stroke="#2a170e"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.4"
                        />
                      </g>
                      <path
                        d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z"
                        fill="#f2be6b"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.4"
                      />
                      <path
                        d="M182.7 196.4Q169.4 196.9 166.6 183.0Q156.1 174.1 162.3 161.5Q159.6 147.6 171.9 142.2Q178.2 129.7 191.0 134.0Q203.3 128.7 210.5 140.8Q223.1 145.2 221.3 159.3Q228.4 171.5 218.5 181.0Q216.6 195.1 203.2 195.7Q193.3 205.1 182.7 196.4Z"
                        fill="#f2be6b"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.4"
                      />
                      <g data-p="fn" transform="translate(186 194) rotate(24)">
                        <path
                          d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z"
                          fill="#f2be6b"
                        />
                        <path
                          d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14"
                          fill="none"
                          stroke="#2a170e"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3.4"
                        />
                        <path
                          d="M-3.5 27 v5 M4.5 27 v5"
                          fill="none"
                          stroke="#2a170e"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.4"
                        />
                      </g>
                    </g>
                    <g data-p="haunch" opacity="1" transform="translate(0 1.44)">
                      <path
                        d="M80.0 204.0Q75.1 194.9 85.7 189.9Q88.4 180.2 100.7 181.2Q110.0 174.6 119.3 181.2Q131.6 180.2 134.3 189.9Q144.9 194.9 140.0 204.0Q144.9 213.1 134.3 218.1Q131.6 227.8 119.3 226.8Q110.0 233.4 100.7 226.8Q88.4 227.8 85.7 218.1Q75.1 213.1 80.0 204.0Z"
                        fill="#f2be6b"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.4"
                      />
                      <path
                        d="M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z"
                        fill="#f2be6b"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.4"
                      />
                      <path
                        d="M132 222v5M139 222v5"
                        fill="none"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.4"
                      />
                    </g>
                    <g data-p="head" transform="translate(-10 -6) rotate(0 212 100)">
                      <path
                        d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z"
                        fill="#a24a1a"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                      />
                      <path
                        d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z"
                        fill="#fbe3b4"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.4"
                      />
                      <path
                        d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
                        data-p="earL"
                        fill="#e4a352"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.4"
                        transform="rotate(0 174 82)"
                      />
                      <path
                        d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
                        data-p="earR"
                        fill="#e4a352"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.4"
                        transform="rotate(0 250 82)"
                      />
                      <path
                        d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z"
                        fill="#f2be6b"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.4"
                      />
                      <path
                        d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z"
                        fill="#f2be6b"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                      />
                      <path
                        d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z"
                        fill="#fbe3b4"
                      />
                      <circle cx="181" cy="116" fill="#f9b9a6" opacity="0.85" r="7" />
                      <circle cx="243" cy="116" fill="#f9b9a6" opacity="0.85" r="7" />
                      <g data-p="eyes" transform="translate(0 0)">
                        <g data-p="open" opacity="1">
                          <g data-p="blink" transform="translate(0 0) scale(1 1)">
                            <ellipse cx="194" cy="98" fill="#2a170e" rx="7.4" ry="8.6" />
                            <ellipse cx="230" cy="98" fill="#2a170e" rx="7.4" ry="8.6" />
                            <circle cx="196.6" cy="94.6" fill="#fff" r="2.7" />
                            <circle cx="232.6" cy="94.6" fill="#fff" r="2.7" />
                            <circle cx="192" cy="101.2" fill="#fff" r="1.2" />
                            <circle cx="228" cy="101.2" fill="#fff" r="1.2" />
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
                      />
                      <path
                        d="M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97"
                        data-p="shut"
                        fill="none"
                        opacity="0"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.4"
                      />
                      <path
                        d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z"
                        fill="#2a170e"
                      />
                      <path
                        d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2"
                        fill="none"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                      />
                      <path
                        d="M207.6 127.4 Q212 136.6 216.4 127.4 Z"
                        data-p="tongue"
                        fill="#e98c8c"
                        opacity="1"
                        stroke="#2a170e"
                        strokeLinejoin="round"
                        strokeWidth="2.2"
                      />
                      <g data-p="mouth" opacity="0">
                        <path
                          d="M203 126 Q212 122 221 126 Q219 138 212 139 Q205 138 203 126 Z"
                          fill="#6b2a1c"
                          stroke="#2a170e"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.6"
                        />
                        <path
                          d="M206.5 133.5 Q212 130 217.5 133.5 Q215 138 212 138 Q209 138 206.5 133.5 Z"
                          fill="#e98c8c"
                        />
                      </g>
                    </g>
                    <g data-p="ledge" opacity="0">
                      <path
                        d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z"
                        fill="#f2be6b"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.4"
                      />
                      <path
                        d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5"
                        fill="none"
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.4"
                      />
                    </g>
                  </g>
                </svg>
                <span aria-hidden="true" className="pup-bubble" data-show="false" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
