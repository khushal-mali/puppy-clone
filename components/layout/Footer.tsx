'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const TWINKLE_STARS = [
  { left: '6%', top: '18%', width: 12.6, delay: '0.00s' },
  { left: '14%', top: '42%', width: 8.4, delay: '0.40s' },
  { left: '23%', top: '12%', width: 9.8, delay: '0.80s' },
  { left: '31%', top: '30%', width: 7.0, delay: '1.20s' },
  { left: '44%', top: '9%', width: 11.2, delay: '1.60s' },
  { left: '52%', top: '36%', width: 7.7, delay: '2.00s' },
  { left: '63%', top: '15%', width: 10.5, delay: '2.40s' },
  { left: '71%', top: '40%', width: 7.0, delay: '2.80s' },
  { left: '92%', top: '33%', width: 8.4, delay: '3.20s' },
];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isTeddyHovered, setIsTeddyHovered] = useState(false);

  return (
    <footer className="tp-footer relative pb-[calc(var(--bar-h,0px)+2rem)] text-milk md:pb-10">
      {/* Background Hill SVG */}
      <svg
        aria-hidden="true"
        className="tp-footer__hill"
        preserveAspectRatio="none"
        viewBox="0 0 1440 80"
      >
        <path d="M0 80V44c120-30 240-44 360-30s240 46 360 34 240-58 360-46 240 40 360 26v52z" />
      </svg>

      {/* Sky overlay with twinkling stars and glowing crescent moon */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-6 h-64 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {TWINKLE_STARS.map((star, i) => (
            <svg
              key={i}
              aria-hidden="true"
              className="tp-twinkle absolute text-honey"
              style={{
                left: star.left,
                top: star.top,
                width: `${star.width}px`,
                animationDelay: star.delay,
              }}
              viewBox="0 0 40 40"
            >
              <path
                d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                fill="currentColor"
              />
            </svg>
          ))}
        </div>
        <span className="tp-moon" />
      </div>

      {/* Main Footer Content Grid */}
      <div className="gutter relative mx-auto grid max-w-[110rem] gap-12 pt-20 md:grid-cols-12 md:gap-x-12 md:gap-y-6 md:pt-28">
        {/* Left Column: Title & Description */}
        <div className="md:col-span-5">
          <p
            className="font-plush text-big text-honey-soft"
            style={{
              fontFamily: 'Fraunces, var(--font-fraunces), serif',
              fontSize: 'clamp(2rem, 4.2vw, 4rem)',
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              textWrap: 'balance',
              fontVariationSettings: '"SOFT" 100, "WONK" 1, "opsz" 144',
            }}
          >
            Home, at last.
          </p>
          <p className="mt-5 max-w-md text-milk/80 text-[1.0625rem] leading-[1.6]">
            TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and
            worldwide shipping.
          </p>
        </div>

        {/* Woven Basket with Snug Sleeping Teddy */}
        <div className="order-last md:order-none md:col-span-5 md:col-start-1 md:row-start-2">
          <div
            className="tp-basket relative cursor-pointer group"
            onMouseEnter={() => setIsTeddyHovered(true)}
            onMouseLeave={() => setIsTeddyHovered(false)}
          >
            {/* Basket Back Rim & Shadow */}
            <svg aria-hidden="true" className="tp-basket__back" viewBox="0 0 300 240">
              <ellipse className="tp-basket__hollow" cx="212" cy="145" rx="96" ry="12" />
              <path className="tp-basket__rim-line" d="M116 145 A96 12 0 0 1 308 145" />
              <path className="tp-basket__rim" d="M116 145 A96 12 0 0 1 308 145" />
            </svg>

            {/* Snug Teddy inside Basket */}
            <div
              className={`tp-basket__pup ${isHome ? 'pup-stop' : ''}`}
              data-act="basket"
              data-behind="true"
              data-facing="right"
              data-lane="true"
              data-pose="snug"
              {...(isHome ? { 'data-pup-stop': 'true' } : {})}
            >
              <div
                className="pup-buddy"
                data-facing="right"
                style={{ visibility: 'visible', opacity: 1, pointerEvents: 'auto' }}
              >
                <svg
                  aria-label="Teddy, sitting snug in his basket"
                  focusable="false"
                  role="img"
                  style={{ overflow: 'visible', display: 'block' }}
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
                      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                      transform="translate(0 0) scale(1 1)"
                    />
                    <g data-p="body" opacity="0" transform="translate(0 0) rotate(0 196 206) translate(196 0) scale(1 1) translate(-196 0)">
                      <g data-p="bf" opacity="1" transform="translate(94 192) rotate(0)">
                        <path d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14Z" fill="#e4a352" />
                        <path d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14" fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
                        <path d="M-3.5 29 v5 M4.5 29 v5" fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
                      </g>
                      <g data-p="ff" transform="translate(168 192) rotate(0)">
                        <path d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z" fill="#e4a352" />
                        <path d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14" fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
                        <path d="M-3.5 29 v5 M4.5 29 v5" fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
                      </g>
                      <g data-p="tail" transform="rotate(-20 84 150)">
                        <path d="M86 152 C80 146 76 140 74 136" fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="9" />
                        <path d="M86 152 C80 146 76 140 74 136" fill="none" stroke="#f2be6b" strokeLinecap="round" strokeWidth="4" />
                        <path d="M70.0 110.0Q78.1 105.0 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134.0Q85.2 143.1 75.8 141.0Q70.0 148.3 64.2 141.0Q54.8 143.1 55.3 134.0Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105.0 70.0 110.0Z" fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
                      </g>
                      <g data-p="bn" opacity="1" transform="translate(110 194) rotate(0)">
                        <path d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14Z" fill="#f2be6b" />
                        <path d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14" fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
                        <path d="M-3.5 27 v5 M4.5 27 v5" fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
                      </g>
                      <path d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z" fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
                      <path d="M182.7 196.4Q169.4 196.9 166.6 183.0Q156.1 174.1 162.3 161.5Q159.6 147.6 171.9 142.2Q178.2 129.7 191.0 134.0Q203.3 128.7 210.5 140.8Q223.1 145.2 221.3 159.3Q228.4 171.5 218.5 181.0Q216.6 195.1 203.2 195.7Q193.3 205.1 182.7 196.4Z" fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
                      <g data-p="fn" transform="translate(186 194) rotate(0)">
                        <path d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z" fill="#f2be6b" />
                        <path d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14" fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
                        <path d="M-3.5 27 v5 M4.5 27 v5" fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
                      </g>
                    </g>
                    <g data-p="haunch" opacity="0" transform="translate(0 0)">
                      <path d="M80.0 204.0Q75.1 194.9 85.7 189.9Q88.4 180.2 100.7 181.2Q110.0 174.6 119.3 181.2Q131.6 180.2 134.3 189.9Q144.9 194.9 140.0 204.0Q144.9 213.1 134.3 218.1Q131.6 227.8 119.3 226.8Q110.0 233.4 100.7 226.8Q88.4 227.8 85.7 218.1Q75.1 213.1 80.0 204.0Z" fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
                    </g>
                    {/* Head in snug pose */}
                    <g data-p="head" transform="translate(0 9) rotate(4 212 100)">
                      <path d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z" fill="#a24a1a" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                      <path d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z" fill="#fbe3b4" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
                      <path d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z" data-p="earL" fill="#e4a352" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" transform="rotate(3 174 82)" />
                      <path d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z" data-p="earR" fill="#e4a352" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" transform="rotate(-3 250 82)" />
                      <path d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z" fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
                      <path d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z" fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                      <path d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z" fill="#fbe3b4" />
                      <circle cx="181" cy="116" fill="#f9b9a6" opacity="0.85" r="7" />
                      <circle cx="243" cy="116" fill="#f9b9a6" opacity="0.85" r="7" />
                      {/* Eyes with blinking */}
                      <g
                        data-p="eyes"
                        transform="translate(0 0)"
                        className="transition-opacity duration-150 group-hover:opacity-0"
                        style={{ opacity: isTeddyHovered ? 0 : 1 }}
                      >
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
                        className="transition-opacity duration-150 group-hover:opacity-100"
                        style={{ opacity: isTeddyHovered ? 1 : 0 }}
                        stroke="#2a170e"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.4"
                      />
                      <path d="M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97" data-p="shut" fill="none" opacity="0" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
                      <path d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z" fill="#2a170e" />
                      <path d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2" fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                      <path d="M207.6 127.4 Q212 136.6 216.4 127.4 Z" data-p="tongue" fill="#e98c8c" opacity="0" stroke="#2a170e" strokeLinejoin="round" strokeWidth="2.2" />
                      <g data-p="mouth" opacity="0">
                        <path d="M203 126 Q212 122 221 126 Q219 138 212 139 Q205 138 203 126 Z" fill="#6b2a1c" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" />
                        <path d="M206.5 133.5 Q212 130 217.5 133.5 Q215 138 212 138 Q209 138 206.5 133.5 Z" fill="#e98c8c" />
                      </g>
                    </g>
                    {/* Cute paws resting over the basket rim */}
                    <g data-p="ledge" opacity="1">
                      <path d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z" fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
                      <path d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5" fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            {/* Front Woven Wicker Layer */}
            <svg aria-hidden="true" className="tp-basket__front" viewBox="0 0 300 240">
              <path className="tp-basket__body" d="M116 145 C118 180 126 214 138 232 L286 232 C298 214 306 180 308 145 A96 12 0 0 1 116 145 Z" />
              <path className="tp-basket__weave" d="M121 178 Q212 197 303 178 M127 206 Q212 223 297 206" />
              <path className="tp-basket__weave tp-basket__weave--stakes" d="M150 164 L158 230 M182 168 L185 232 M212 169 V232 M242 168 L239 232 M274 164 L266 230" />
              <path className="tp-basket__rim-line" d="M116 145 A96 12 0 0 0 308 145" />
              <path className="tp-basket__rim" d="M116 145 A96 12 0 0 0 308 145" />
            </svg>
          </div>
        </div>

        {/* Middle Column: Explore Navigation */}
        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7 md:row-span-2 md:row-start-1">
          <h2 className="font-scrawl text-lg text-honey">Explore</h2>
          <ul className="mt-4 space-y-2.5 leading-[1.6]">
            <li>
              <Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" href="/puppies">
                Available puppies
              </Link>
            </li>
            <li>
              <Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" href="/gone-home">
                Gone home
              </Link>
            </li>
            <li>
              <Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" href="/happy-families">
                Happy families
              </Link>
            </li>
            <li>
              <Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" href="/how-it-works">
                How it works
              </Link>
            </li>
            <li>
              <Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" href="/how-it-works#delivery">
                Delivery &amp; collection
              </Link>
            </li>
            <li>
              <Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" href="/faq">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" href="/contact">
                Visit &amp; contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Column: Say Hello & Social */}
        <div className="md:col-span-3 md:row-span-2 md:row-start-1">
          <h2 className="font-scrawl text-lg text-honey">Say hello</h2>
          <ul className="mt-4 space-y-2.5 text-milk/90 leading-[1.6]">
            <li>
              <a
                className="font-semibold hover:text-honey whitespace-nowrap"
                href="https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project."
                rel="noopener noreferrer"
                target="_blank"
              >
                WhatsApp +971 50 000 0000
              </a>
            </li>
            <li>
              <a className="break-all hover:text-honey" href="mailto:info@instabizweb.com">
                info@instabizweb.com
              </a>
            </li>
            <li>Downtown Dubai, United Arab Emirates</li>
          </ul>

          <ul aria-label="Social media" className="mt-6 flex flex-wrap gap-3">
            <li>
              <a
                className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold hover:border-honey hover:text-honey"
                href="https://www.instabizweb.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold hover:border-honey hover:text-honey"
                href="https://www.instabizweb.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                TikTok
              </a>
            </li>
            <li>
              <a
                className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold hover:border-honey hover:text-honey"
                href="https://www.instabizweb.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright & Slogan Bar */}
      <div className="gutter relative mx-auto mt-16 flex max-w-[110rem] flex-col items-start justify-between gap-4 border-t border-milk/15 pt-6 text-sm text-milk/60 md:flex-row md:items-center">
        <span className="flex items-center gap-3">
          <img
            alt="TeddyPups Logo"
            className="size-9 rounded-full"
            height={36}
            src="/images/logo.png"
            width={36}
          />
          © 2026 TeddyPups U.A.E.
        </span>
        <span className="font-scrawl text-base text-honey/80">
          every puppy is family
        </span>
      </div>
    </footer>
  );
}
