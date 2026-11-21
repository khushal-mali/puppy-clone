# TeddyPups Page Structure & Component Architecture

## 1. Global Layout Shell

### Header (`<header>`)
- **Dimensions:** Fixed height `--header-h: 4rem` (`64px`), full-width container up to `80rem` (`1280px`).
- **Left:** Brand Logo (TeddyPups text + paw insignia linking to `/`).
- **Center (Desktop):** Horizontal navigation bar:
  - Home (`/`)
  - Puppies (`/puppies`)
  - Happy families (`/happy-families`)
  - How it works (`/how-it-works`)
  - FAQ (`/faq`)
  - Visit & contact (`/contact`)
- **Right:**
  - WhatsApp CTA Pill Button (Green WhatsApp icon + "WhatsApp us" link).
  - Mobile Hamburger Button (visible on `< 1024px` breakpoints).

### Page Curtain Overlay (`.tp-curtain`)
- Full viewport fixed overlay (`fixed inset-0 z-50 pointer-events-none`).
- Background blanket (`.tp-curtain__blanket`) colored `--color-milk` or `--night`.
- Animated running puppy SVG with tail wag and paw print steps across the horizon.

### Global Footer (`<footer>`)
- **Top Section:** Brand statement and showroom intro ("TeddyPups U.A.E. — Dubai's premier boutique for healthy, ethically raised teacup & miniature puppies").
- **Column 1 ("Explore"):**
  - Available puppies (`/puppies`)
  - Gone home (`/gone-home`)
  - Happy families (`/happy-families`)
  - How it works (`/how-it-works`)
  - Delivery & collection (`/how-it-works#delivery`)
  - FAQ (`/faq`)
  - Visit & contact (`/contact`)
- **Column 2 ("Say hello"):**
  - WhatsApp link (`+971 50 000 0000`)
  - Social media icons: Instagram, TikTok, Facebook
  - Cloudflare protected email link
- **Bottom Bar:** Copyright notice, Dubai registration, and back-to-top anchor.

---

## 2. Homepage (`/`) Template Structure

### Section 1: Hero Banner
- **Headline:** `Premium teacup puppies in Dubai` (Font: `Fraunces`, large serif).
- **Sub-headline:** "Healthy, ethically raised Maltipoos, Poodles, Pomeranians & Cavapoos ready for their loving forever homes."
- **Media:** Autoplaying looping 720p puppy video (`public/videos/hero-puppy.mp4`) with rounded-3xl container and sound toggle.
- **CTAs:**
  - Primary button: "Browse available puppies" -> `/puppies`
  - Secondary button: "Say hello on WhatsApp" -> WhatsApp link

### Section 2: "Meet the pups"
- **Headline:** `Meet the pups`
- **Sub-headline:** "Our newest arrivals looking for loving homes in the Emirates."
- **Component:** Responsive puppy cards carousel/grid showcasing 6-8 highlighted available puppies with badges ("Available", "▶ video", Age, Breed).
- **Link:** "View all 20 puppies →" (`/puppies`)

### Section 3: "Two ways to meet your puppy"
- **Grid Layout:** 2 large feature cards:
  - **Card A ("Puppies in Dubai"):** Puppies currently in the Dubai showroom, available for immediate viewing and same-day adoption.
  - **Card B ("Imported for you"):** Exclusive direct imports from premier international partners, with full veterinary passport and quarantine clearance.

### Section 4: "Your puppy journey"
- **Headline:** `Your puppy journey`
- **3-Step Timeline:**
  1. `Choose your breed`: Consultation on lifestyle and temperament.
  2. `Get photos & details`: Real-time photos, pedigree, and vet reports.
  3. `Secure & safe delivery`: Hand-delivered in Dubai or collected from showroom.

### Section 5: "Why families trust TeddyPups"
- **4 Key Trust Pillars:**
  - Full health & vaccination guarantee.
  - Ethical pedigree breeding.
  - Climate-controlled VIP air travel.
  - Lifetime breeder advice & support.

### Section 6: "Happy families & puppies"
- Carousel / Mosaic of customer photos holding their puppies in Dubai homes.
- Link: "Read more family stories →" (`/happy-families`).

### Section 7: "Questions, answered"
- Accordion preview of 4 top FAQs with direct link to full `/faq` page.

### Section 8: Final Call-to-Action Banner
- Warm toffee background with curved wood accent.
- Headline: `Ready to meet your new best friend?`
- Direct contact and WhatsApp buttons.

---

## 3. Available Puppies Page (`/puppies`)

- **Hero Intro:** `Available puppies` — subtitle explaining showroom appointments and reservation process.
- **Filter Bar:** Breed tabs (All, Maltipoo, Poodle, Pomeranian, Cavapoo, Shih Tzu, etc.).
- **Card Grid:** 3 columns on desktop (`grid-cols-3`), 2 on tablet (`grid-cols-2`), 1 on mobile (`grid-cols-1`).
  - Total 20 active puppy cards.
  - Each card includes: Primary photo, "Available" chip, gender tag (boy/girl), age, breed, and location.
- **Footer Callout:** Link to vintage "Gone home" tickets page.

---

## 4. Happy Families Page (`/happy-families`)

- **Hero:** `Happy families` — "Stories and smiles from puppies in their new forever homes across the Emirates."
- **Photo Grid:** Masonry / multi-column grid of 66 curated high-res photos and video snapshots of puppies with their families.
- **Testimonial Badges:** Quotes from owners regarding puppy health, socialization, and customer experience.

---

## 5. How It Works Page (`/how-it-works`)

- **Hero:** `How it works` — "From first hello to welcoming your puppy home."
- **Two Paths Detailed Breakdown:**
  - Path 1: Showroom visit & same-day pickup.
  - Path 2: Personalized international order & import.
- **Section: "Delivery & collection"** (Addresses `/delivery-collection`):
  - Same-day Dubai VIP chauffeur delivery.
  - Abu Dhabi and Northern Emirates delivery options.
  - International temperature-controlled pet cargo.
- **Trust & Health Guarantee Section:** Microchip, passport, vaccine schedule, and vet checks.

---

## 6. FAQ Page (`/faq`)

- **Hero:** `Questions & answers`
- **Accordion List:** 9 expandable questions with answers:
  1. Vaccinations & health checks.
  2. Meeting puppies before deciding.
  3. Same-day adoption policy.
  4. International puppy import details.
  5. Travel safety to Dubai.
  6. Photos and vet details prior to deposit.
  7. Delivery options.
  8. Available breeds.
  9. Post-adoption lifetime support.

---

## 7. Visit & Contact Page (`/contact`)

- **Hero:** `Visit & contact`
- **Split Layout:**
  - **Left Column:** Showroom details (Location in Dubai, opening hours, direct phone, WhatsApp QR/link).
  - **Right Column:** Interactive "Post a Letter" contact form (Name, phone, email, area, puppy interest dropdown, message).

---

## 8. "Gone Home" Archive Page (`/gone-home`)

- **Hero:** `Gone home` — "Celebrating the puppies who found their forever families."
- **Ticket Stub Grid:** 22 collectible boarding ticket cards with retro paper styling, dotted perforation, "Admit One" stamp, and puppy commemorative details.

---

## 9. Dynamic Puppy Profile Template (`/puppies/[slug]`)

- **Hero Media Column:**
  - High-res main photo / video preview.
  - Interactive thumbnail gallery strip (5 to 14 photos).
- **Details Column:**
  - Puppy Name (H1) and breed.
  - Gender tag (Girl / Boy) with color coding.
  - Age badge (e.g. `2 months`, `3 months`).
  - Location badge (`Dubai showroom` or `Imported for you`).
  - Key specifications table (Vaccination status, Microchip, Deworming, Vet passport).
- **Direct Action Bar:**
  - Primary button: "Ask about [Name] on WhatsApp" (pre-filled WhatsApp deep link).
  - Secondary button: "Send an enquiry" (opens integrated quick inquiry form).
- **"Every Teddy Pup comes with" Checklist:**
  - Health warranty, pedigree documentation, first travel crate, puppy starter kit.
- **Related Puppies Rail:** 3-4 other available puppies of similar breed.
