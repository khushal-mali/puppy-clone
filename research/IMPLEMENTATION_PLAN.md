# TeddyPups Website Reconstruction Implementation Plan

## 1. Project Overview & Deadlines
- **Goal:** Full-fidelity reconstruction of the TeddyPups reference website (`https://puppy.instabizweb.com/`).
- **Deadline:** 1 Day (Completion by end of day).
- **Core Requirement:** 100% authentic visual parity, typography, interactions, custom cursors, animations, and responsive layouts across all 51 discovered routes.

---

## 2. Recommended Technology Stack

| Layer | Recommended Choice | Rationale |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15 (App Router, React 19)** | Matches the exact architecture, routing, and SSR/PPR performance of the reference website. |
| **Language** | **TypeScript** | Type safety for puppy profiles, FAQ data, navigation links, and theme tokens. |
| **Styling** | **Tailwind CSS + CSS Modules** | Utility-first layout with dedicated CSS module for the 46 custom `@keyframes`. |
| **Fonts** | **Next.js Font Optimization (`next/font/local`)** | Uses the downloaded `.woff2` files for `Fraunces`, `Figtree`, and `Shantell Sans` without external CDN latency. |
| **Icons** | **Lucide React + Custom SVGs** | Clean icons matching the reference site plus exact `/cursor/paw.svg` cursors. |
| **Animation** | **CSS Keyframes + Motion/Framer** | Matches exact timing tokens (`--ease-silk`, `--ease-pounce`, `--ease-snap`). |
| **Video/Media**| **HTML5 Video & Next.js `<Image>`** | Autoplay looping 720p hero video and optimized local image assets from `public/images/`. |

---

## 3. Directory & Architecture Scaffold

```
puppy-clone/
├── app/
│   ├── layout.tsx                 # Root layout with fonts, metadata, cursor & curtain
│   ├── page.tsx                   # Homepage (Hero, Meet pups, Journey, Trust, FAQ, CTA)
│   ├── puppies/
│   │   ├── page.tsx               # Puppies catalog with breed filter tabs (20 available)
│   │   └── [slug]/
│   │       └── page.tsx           # Dynamic puppy profile page (gallery, vitals, enquiry)
│   ├── happy-families/
│   │   └── page.tsx               # 66 photo mosaic + customer stories
│   ├── how-it-works/
│   │   └── page.tsx               # Journey steps, guarantees, and Delivery & Collection
│   ├── faq/
│   │   └── page.tsx               # 9 interactive accordion questions & answers
│   ├── contact/
│   │   └── page.tsx               # Showroom details & animated postal letter form
│   ├── gone-home/
│   │   └── page.tsx               # 22 collectible boarding ticket cards
│   ├── not-found.tsx              # Custom 404 page (handles /delivery-collection)
│   └── globals.css                # Extracted CSS variables, font definitions, and keyframes
├── components/
│   ├── layout/
│   │   ├── Header.tsx             # Sticky header with blur, logo, nav & WhatsApp CTA
│   │   ├── MobileDrawer.tsx       # Animated mobile navigation drawer
│   │   ├── Footer.tsx             # Complete footer with Explore & Say Hello columns
│   │   └── PageCurtain.tsx        # Animated running puppy transition overlay
│   ├── ui/
│   │   ├── Button.tsx             # Rounded pill button with hover states
│   │   ├── Badge.tsx              # Swingable badge / tag
│   │   ├── Accordion.tsx          # Smooth grid-animated accordion
│   │   └── VideoPlayer.tsx        # Video component with sound toggle
│   ├── puppy/
│   │   ├── PuppyCard.tsx          # Available puppy card with tags & hover lift
│   │   ├── PuppyGallery.tsx       # Multi-photo gallery & thumbnail strip
│   │   └── TicketCard.tsx         # Perforated boarding ticket stub for Gone Home
│   └── forms/
│       ├── ContactForm.tsx        # "Post my letter" form with honeypot & animation
│       └── QuickEnquiryDrawer.tsx # Slide-in puppy enquiry sheet
├── data/
│   ├── puppies.ts                 # Full dataset of 42 puppies (20 available + 22 gone home)
│   ├── faqs.ts                    # 9 verified FAQ questions and answers
│   └── navigation.ts              # Header, drawer, and footer navigation links
├── public/
│   ├── images/                    # 199 verified original image assets
│   ├── fonts/                     # 10 verified .woff2 font files
│   ├── videos/                    # hero-puppy.mp4 (720p 2.87MB)
│   └── icons/                     # cursor-paw.svg, cursor-paw-press.svg
└── research/                      # Phase 1 reverse-engineering documentation & screenshots
```

---

## 4. Step-by-Step Implementation Sequence

### Phase 2: Project Setup & Core Foundation (Hours 1 - 2)
1. Initialize Next.js project with Tailwind CSS and TypeScript in workspace.
2. Wire up `globals.css` with exact extracted color tokens, typography scales, container max-widths, and custom cursors (`/cursor/paw.svg`).
3. Configure `next/font/local` to load `Fraunces`, `Figtree`, and `Shantell Sans` directly from `public/fonts/`.
4. Construct dataset files:
   - `data/puppies.ts` from `research/puppies_dataset.json`.
   - `data/faqs.ts` from `research/faqs_dataset.json`.

### Phase 3: Shell & Global Components (Hours 3 - 4)
1. Build `Header.tsx`: Sticky blur behavior (`--header-h: 4rem`), navigation items, WhatsApp action.
2. Build `MobileDrawer.tsx`: Full-bleed animated drawer triggered by hamburger with staggered link entrance.
3. Build `Footer.tsx`: Dual-column layout ("Explore" and "Say hello") with WhatsApp and social links.
4. Build `PageCurtain.tsx`: Running puppy page transition overlay (`tp-runner-x`, `tp-curtain-lift`).

### Phase 4: Homepage Construction (Hours 5 - 7)
1. **Hero Section:** Large Fraunces headline, sub-headline, autoplay looping video (`hero-puppy.mp4`), and CTA buttons.
2. **"Meet the pups" Carousel:** Filtered cards with badge swing animations.
3. **"Two ways to meet your puppy":** Dubai showroom vs. international import feature cards.
4. **"Your puppy journey":** 3-step timeline with icons.
5. **Trust & FAQ Preview:** 4 top FAQ accordions and customer quote highlights.
6. **Closing CTA Banner:** Warm toffee background and WhatsApp deep link.

### Phase 5: Catalog & Dynamic Profiles (Hours 8 - 10)
1. **Available Puppies (`/puppies`):**
   - Breed filter buttons (Maltipoo, Poodle, Pomeranian, Cavapoo, etc.).
   - Responsive 3-column grid displaying all 20 available puppies.
2. **Dynamic Profile (`/puppies/[slug]`):**
   - High-res main image with thumbnail switcher.
   - Puppy vitals (Age, breed, gender, showroom vs import).
   - "Every puppy comes with" guarantee checklist.
   - WhatsApp pre-filled enquiry button and inline letter form.
   - Related puppies recommendation rail.

### Phase 6: Secondary Pages & Special Layouts (Hours 11 - 13)
1. **Happy Families (`/happy-families`):**
   - Masonry layout of 66 verified customer puppy photos.
   - Heartwarming testimonials from Dubai owners.
2. **How It Works (`/how-it-works`):**
   - Two adoption pathways.
   - In-page "Delivery & collection" section with VIP transport details.
3. **Questions & Answers (`/faq`):**
   - 9 interactive, accessible accordion components.
4. **Visit & Contact (`/contact`):**
   - Dubai showroom visit details, opening hours, and phone numbers.
   - Interactive envelope letter form ("Post my letter") with validation.
5. **"Gone Home" Tickets (`/gone-home`):**
   - 22 perforated vintage boarding pass ticket stubs with "Admit One" stamps.

### Phase 7: Verification & Visual Regression QA (Hours 14 - 15)
1. Run Playwright automated screenshot comparison against reference screenshots in `research/screenshots/desktop/` and `research/screenshots/mobile/`.
2. Verify touch targets on mobile (390x844).
3. Test keyboard navigation, focus rings (`--color-honey`), and form validations.
4. Check build output with `npm run build` to ensure zero compilation or hydration errors.

---

## 5. Risk Assessment & Mitigation

| Potential Risk | Severity | Mitigation Strategy |
| :--- | :--- | :--- |
| **Missing asset / broken image link** | High | All 213 assets have already been downloaded locally into `public/images/`, `public/fonts/`, `public/videos/`, and verified on disk. |
| **Font rendering discrepancy** | Medium | Original `.woff2` files extracted directly from origin and loaded locally via `next/font/local`. |
| **Broken route `/delivery-collection`** | Low | Anchor link route configured: `/delivery-collection` redirects or serves the embedded `/how-it-works#delivery` content. |
| **Animation performance lag** | Medium | All 46 keyframes use GPU-accelerated CSS properties (`transform`, `opacity`, `rotate`) with no layout reflow triggers. |
