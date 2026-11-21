# TeddyPups Interactive States & Behavior Specification

## 1. Overview
This document specifies all client-side interactions, form validations, responsive menus, drawer states, and interactive widgets observed and tested across the TeddyPups reference website.

Screenshots of live interactive states captured during Phase 1:
- Mobile Navigation Open: `research/screenshots/interactions/mobile-menu-open.png`
- FAQ Accordion Expanded: `research/screenshots/interactions/faq-expanded.png`
- Contact Form Validation: `research/screenshots/interactions/contact-form-validation.png`

---

## 2. Navigation & Header Interactions

### Sticky Header Behavior
- **Initial State:** Sits at the top of the viewport with a transparent or semi-translucent backdrop (`--color-milk` at 85% opacity with `backdrop-filter: blur(12px)`).
- **On Scroll Down:** Sticks to top (`position: sticky; top: 0; z-index: 50`), height stays fixed at `--header-h: 4rem` (`64px`), bottom border with soft tint (`rgba(42, 23, 14, 0.08)`) activates.
- **Skip Link:** Accessible `#main` skip link for keyboard accessibility.

### Mobile Navigation Drawer (`.tp-menu`)
- **Trigger:** Hamburger button (`aria-label="Open menu"`, two/three animated bars) in the header.
- **Backdrop:** Dimmed overlay with slight blur fades in.
- **Drawer Motion:** Slides smoothly from right or top with `--ease-snap` (`0.5s`).
- **Menu Items:** Staggered entrance animation for navigation links.
- **Dismissal:**
  - Clicking the "Close" (X) button.
  - Clicking outside on the backdrop.
  - Pressing the `Escape` key.
  - Clicking any navigation link (initiates soft route navigation).

---

## 3. Filter & Search Controls (`/puppies`)

- **Breed Filter Tabs / Pills:**
  - "All breeds" (default)
  - "Maltipoo"
  - "Poodle / Toy Poodle"
  - "Pomeranian"
  - "Cavapoo"
  - "Shih Tzu"
  - "Pomsky / Bichon"
- **Filter Pills Interaction:**
  - Clicking a pill instantly filters the client-side puppy cards without a full-page reload.
  - Active pill is highlighted with `--color-cocoa` background and `--color-milk` text.
  - Inactive pills feature `--color-honey-soft` or light outlined style with smooth hover color transitions.
- **Availability Filter:** Toggle between "Available" (20 puppies) and link to "Gone Home" (22 ticketed puppies).

---

## 4. Puppy Card & Gallery Interactions

### Available Puppy Card
- **Hover Lift:** Translates upward `translateY(-4px)` with expansion of shadow (`0 12px 32px rgba(42, 23, 14, 0.14)`).
- **Tag Sway:** The hanging badge swings on hover using `tp-tag-nudge`.
- **Video Indicator:** Puppies with video previews feature a "▶ video" pill. Clicking or hovering previews video frames.

### Puppy Profile Gallery (`/puppies/<slug>`)
- **Main Hero Image:** Displays high-resolution photo with smooth fade transition upon selecting thumbnails.
- **Thumbnail Strip:** Horizontal scrollable rail of 5 to 14 alternate puppy photos. Active thumbnail has a prominent `--color-toffee` border.
- **Pinch-to-Zoom / Lightbox:** On mobile (390x844), image supports horizontal touch swiping between photos.

### "Gone Home" Boarding Ticket Cards (`/gone-home`)
- Styled like vintage transportation passes / airline boarding passes.
- Features circular cutouts on edges and perforated dotted divider.
- Shows puppy details, "Admit One" stamp, and "Home ♥" stamp.
- Non-clickable or links to historical tribute profile.

---

## 5. Forms & Validation Logic

### A. Visit & Contact Form (`/contact`)
- **Fields:**
  - `name`: Full Name (`<input type="text" required>`). Validation: Cannot be empty.
  - `phone`: Mobile / WhatsApp (`<input type="tel" required placeholder="+971 50 123 4567">`). Validated against phone regex.
  - `email`: Optional email address (`<input type="email" placeholder="optional">`).
  - `area`: Neighborhood (`<input type="text" placeholder="e.g. Dubai Marina">`).
  - `puppyId`: Select dropdown populated with available puppies or "any puppy (not sure yet)".
  - `message`: Textarea for special requirements.
  - `website`: Hidden honeypot field (`display: none; tabIndex: -1`) to catch bot submissions.
- **Submit Action ("Post my letter"):**
  - Triggers envelope fold and seal animation (`tp-env-post`).
  - Displays inline confirmation banner ("Letter received! We'll message you on WhatsApp shortly").
  - Provides a direct one-click WhatsApp fallback button.

### B. Puppy Quick Enquiry Drawer (`/puppies/<slug>`)
- Pre-fills `puppyId` and pre-populates message: `"Hi! I'd love to know more about [Puppy Name]..."`.
- Immediate WhatsApp direct CTA: Deep-links directly to WhatsApp with pre-filled message text.

---

## 6. FAQ Accordion Component (`/faq`)

- **State:** Accordion items start collapsed.
- **Trigger:** Clicking question `<button>` toggles expansion.
- **Behavior:**
  - Multi-expand or single-active mode supported.
  - Chevron icon smoothly rotates 180 degrees (`rotate: 180deg; transition: rotate 0.3s var(--ease-silk)`).
  - Content container uses `grid-template-rows: 0fr -> 1fr` for seamless CSS height animation without fixed-pixel hacks.
  - Fully keyboard accessible (`Enter` / `Space` toggles; `aria-expanded="true/false"`).

---

## 7. Interactive Custom Cursors

- **Standard Pointer:** Replaced on desktop viewports (`@media (hover: hover) and (pointer: fine)`) with `/cursor/paw.svg`.
- **Mousedown / Click State:** Temporarily switches to `/cursor/paw-press.svg` with a slight scale down (`scale(0.9)`), giving a tactile paw-press sensation.
- **Automatic Fallback:** Gracefully disabled on touchscreen devices (`pointer: coarse`).
