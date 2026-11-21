# TeddyPups Animation Inventory & Motion Specification

## 1. Motion Philosophy
The TeddyPups animation system is crafted around **playful, tactile warmth**. It mimics pet-like curiosity and bounce with custom cubic-bezier easing functions (dubbed "silk", "pounce", and "snap"). Animations are never rigid or corporate; they feature subtle swings, breathing pulses, and smooth curtains.

---

## 2. Global Timing Tokens & Easing Curves

Extracted directly from the compiled CSS root variables:

```css
:root {
  --default-transition-duration: 0.15s;
  --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-silk: cubic-bezier(0.22, 1, 0.36, 1);   /* Smooth, friction-free decel */
  --ease-pounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy, spring-like overshoot */
  --ease-snap: cubic-bezier(0.7, 0, 0.2, 1);     /* Snappy UI drawer motions */
}
```

---

## 3. Comprehensive Keyframe Animation Catalog (46 Animations)

### A. Page Curtain & Route Transition System (`.tp-curtain`)
The site features a custom brand transition overlay where a blanket lifts while a cartoon puppy runs across paw prints.

| Keyframe Name | Duration | Easing | Trigger / State | Visual Effect |
| :--- | :--- | :--- | :--- | :--- |
| `tp-curtain-lift` | `0.48s` | `cubic-bezier(.65, 0, .3, 1)` | Route change complete (`data-state=intro`) | Blanket pulls upwards from bottom |
| `tp-curtain-cover`| `0.30s` | `var(--ease-silk)` | Route navigation start (`data-state=covering`)| Blanket lowers smoothly to cover viewport |
| `tp-curtain-rest` | `0s` | `linear` | Delay `1.04s` forwards | Resets curtain z-index when finished |
| `tp-hold-still` | `1.04s` | `step-start` | During curtain intro | Prevents scroll/layout jitter on body |

### B. The Running Puppy Loader (`.tp-runner`)
While the transition curtain is active, an SVG running puppy sprints across the screen:

| Keyframe Name | Duration | Easing | Element | Motion Description |
| :--- | :--- | :--- | :--- | :--- |
| `tp-runner-x` | `1.15s` | `cubic-bezier(.32, .1, .4, 1)` | `.tp-curtain__runner` | Runs horizontally across screen from left to right |
| `tp-runner-bob` | `0.16s` | `ease-in-out infinite alternate`| `.tp-runner__body` | Rhythmic vertical up/down bounce |
| `tp-runner-ear` | `0.16s` | `ease-in-out infinite alternate`| `.tp-runner__ear` | Floppy ear flapping back and forth |
| `tp-runner-leg-a`| `0.32s` | `ease-in-out infinite alternate`| `.tp-runner__leg--front` | Front leg gallop cycle |
| `tp-runner-leg-b`| `0.32s` | `ease-in-out infinite alternate`| `.tp-runner__leg--back` | Hind leg gallop cycle |
| `tp-runner-wag` | `0.22s` | `ease-in-out infinite alternate`| `.tp-runner__tail` | Rapid joyful tail wagging |
| `tp-print-step` | `1.00s` | `ease-out both` | `.tp-curtain__print` | Paw prints appear one-by-one under puppy |

### C. Interactive Tags, Badges & Cards
| Keyframe Name | Duration | Easing | Trigger | Visual Effect |
| :--- | :--- | :--- | :--- | :--- |
| `tp-tag-swing` | `1.70s` | `var(--ease-silk)` | When revealed in viewport | Swings like a hanging price tag (-7deg rotation settle) |
| `tp-tag-nudge` | `1.30s` | `var(--ease-silk)` | Hover over tag (`:hover`) | Playful gentle nudge/wobble scale and tilt |
| `tp-pop-up` | `0.45s` | `var(--ease-pounce)` | Scroll into view | Bouncy pop entrance with overshoot |
| `tp-poster-in` | `0.60s` | `var(--ease-silk)` | Scroll trigger | Photo card slides up with soft shadow bloom |

### D. Navigation Menu Drawer (`.tp-menu`)
| Keyframe Name | Duration | Easing | Trigger | Visual Effect |
| :--- | :--- | :--- | :--- | :--- |
| `tp-menu-in` | `0.50s` | `var(--ease-snap)` | Hamburger click (`open`) | Full mobile drawer slides in from right/top |
| `tp-menu-out` | `0.42s` | `var(--ease-snap)` | Close click (`data-closing`) | Drawer snaps closed |
| `tp-menu-backdrop-out` | `0.35s` | `ease-out` | Close trigger | Dimmed backdrop fades out |
| `tp-menu-link` | `0.40s` | `var(--ease-silk)` | Drawer opens | Staggered fade and slide for each navigation link |

### E. Enquiry Letter & Postal Post Form (`.tp-letter`, `.tp-stamp`)
The contact page is themed like mailing a handwritten letter to the showroom:

| Keyframe Name | Duration | Easing | Trigger | Visual Effect |
| :--- | :--- | :--- | :--- | :--- |
| `tp-env-in` | `0.50s` | `var(--ease-silk)` | Form appears | Envelope flap unfolds |
| `tp-env-post` | `0.70s` | `var(--ease-pounce)` | Form submission | Envelope seals and zips away |
| `tp-stamp-in` | `0.35s` | `var(--ease-pounce)` | Stamp placement | Postage stamp lands with bounce |
| `tp-stamp-thump` | `0.20s` | `ease-out` | Postal ink stamp | Rubber stamp press impact scale down/up |
| `tp-letter-fold` | `0.60s` | `var(--ease-silk)` | Submit sequence | Paper creases into thirds |

### F. Ambient & Floating Atmospheric Effects
| Keyframe Name | Duration | Easing | Trigger | Visual Effect |
| :--- | :--- | :--- | :--- | :--- |
| `tp-plane-bob` | `3.00s` | `ease-in-out infinite alternate` | Cargo / Delivery section | Delivery airplane floating up and down |
| `tp-float` | `4.00s` | `ease-in-out infinite alternate` | Floating badges | Gentle continuous levitation |
| `tp-breathe` | `2.50s` | `ease-in-out infinite alternate` | Ambient decorative circles | Scale from 1.0 to 1.04 with soft opacity shift |
| `tp-twinkle` | `2.00s` | `ease-in-out infinite alternate` | Background star elements | Twinkle sparkle opacity oscillation |
| `tp-sun-set` / `tp-sunrise` | `8.00s` | `ease-in-out infinite alternate`| Horizon illustration | Ambient sky gradient shift |
| `tp-door-open` / `tp-house-open` | `0.80s` | `var(--ease-silk)` | Hover over puppy kennel | Door pivots open on 3D Y-axis (`rotateY(78deg)`) |
| `tp-paw-pat` | `0.40s` | `var(--ease-pounce)` | Cursor click / press | Paw stamp expands and dissipates |

---

## 4. Scroll-Triggered Behavior & Lazy Reveals
- Elements utilize `IntersectionObserver` or scroll-driven CSS attributes:
  - `data-armed`: Element is prepped with zero opacity before entering viewport.
  - `data-revealed`: Set to `true` when scrolled into view, triggering the corresponding entrance keyframe.
  - Tags use `animation-fill-mode: both` to prevent flicker.
