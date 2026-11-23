# 🐾 TeddyPups — High-Fidelity Web Experience Clone

[![Next.js](https://img.shields.io/badge/Next.js-15.2_Turbopack-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7_Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel_Edge-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://puppy-clone.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **Official Technical Assignment Submission for Blutec AI**  
> **Candidate:** Khushal Mali  
> **Email:** [khushalmali8448@gmail.com](mailto:khushalmali8448@gmail.com) | **Phone:** +91 8433515648 | **LinkedIn:** [linkedin.com/in/khushalmali](https://www.linkedin.com/in/khushalmali/)  
> **Live Production Website:** [https://puppy-clone.vercel.app/](https://puppy-clone.vercel.app/)  
> **Reference Website:** [https://puppy.instabizweb.com/](https://puppy.instabizweb.com/)  
> **Complete Source Code:** [https://github.com/khushal-mali/puppy-clone](https://github.com/khushal-mali/puppy-clone)

---

## 📑 Table of Contents

- [🌟 Executive Summary](#-executive-summary)
- [✨ Implemented Route Matrix](#-implemented-route-matrix)
- [🛠️ Tech Stack & Engineering Architecture](#️-tech-stack--engineering-architecture)
- [📂 Comprehensive Project Directory Structure](#-comprehensive-project-directory-structure)
- [🔬 Core Engineering Challenges & Technical Deep-Dives](#-core-engineering-challenges--technical-deep-dives)
  - [1. Dynamic OKLab Color Science & Perceptual Theming](#1-dynamic-oklab-color-science--perceptual-theming)
  - [2. Viewport-Constrained Media Lightbox & Document Scroll Lock](#2-viewport-constrained-media-lightbox--document-scroll-lock)
  - [3. Honeypot Anti-Spam vs. Modern Browser Autofill Protection](#3-honeypot-anti-spam-vs-modern-browser-autofill-protection)
  - [4. Safari/Chrome Popup-Blocker Mitigation on WhatsApp Handoff](#4-safarichrome-popup-blocker-mitigation-on-whatsapp-handoff)
- [🔍 Production SEO Engine & Google Rich Snippets](#-production-seo-engine--google-rich-snippets)
- [🤖 AI Collaboration Policy & Prompt Engineering Logs](#-ai-collaboration-policy--prompt-engineering-logs)
- [🧪 Automated Testing, QA & Verification Matrix](#-automated-testing-qa--verification-matrix)
- [💻 Local Development & Build Guide](#-local-development--build-guide)
- [👤 Author & Contact](#-author--contact)

---

## 🌟 Executive Summary

This repository houses a full-stack, pixel-perfect clone of the **TeddyPups** web platform, engineered to satisfy the rigorous evaluation standards of the **Blutec AI Technical Round**. 

Rather than relying on unmaintainable raw HTML string dumps (`dangerouslySetInnerHTML`), this project represents a complete, clean-slate architectural reconstruction into **100% semantic, idiomatic JSX** powered by **Next.js 15 (Turbopack)**, **React 19**, and **TypeScript 5.7**. Every micro-interaction, custom SVG scallop border, physics-based inertia scroll, multi-tab filter catalog, responsive media lightbox, dynamic perceptual color theme, and accessible form validation flow has been reconstructed with sub-pixel fidelity.

---

## ✨ Implemented Route Matrix

| Route | Primary Component | Key Features & Implementation Highlights |
| :--- | :--- | :--- |
| **`/`** (Home) | `components/home/HomeClient.tsx` | Scroll-choreographed story runner, interactive floating buddy, SVG scallop masking, paw cursor follower, customer testimonial strip, dynamic footer. |
| **`/puppies`** | `components/puppies/PuppiesClient.tsx` | Multi-category live filtering (All, Teacup Maltipoo, Teacup Poodle, Pomeranian, Cavapoo), instant responsive re-render, interactive cards with availability badges. |
| **`/puppies/[slug]`** | `components/puppy/PuppyDetailClient.tsx` | Dynamic OKLab ambient aura, multi-angle HD media gallery, video lightbox modal, accessible reservation enquiry form, circular prev/next navigation. |
| **`/happy-families`** | `components/happy-families/HappyFamiliesClient.tsx` | Testimonials grid, verified customer adoption showcases, responsive family moments gallery. |
| **`/how-it-works`** | `components/how-it-works/HowItWorksClient.tsx` | Interactive 3-step puppy adoption walkthrough, showroom visit guidelines, international import protocol. |
| **`/faq`** | `components/faq/FAQClient.tsx` | Interactive expandable accordion with Google Search FAQPage Schema.org rich snippets. |
| **`/contact`** | `components/contact/ContactClient.tsx` | Downtown Dubai showroom appointment scheduler, multi-field validated contact form, direct WhatsApp routing. |

---

## 🛠️ Tech Stack & Engineering Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS 15 APP ROUTER                          │
├───────────────────────────────────┬────────────────────────────────────┤
│       SERVER COMPONENTS           │       CLIENT ISLANDS ("use client") │
│  - Dynamic Metadata & OpenGraph   │  - Framer Motion Scroll Orchestration│
│  - Schema.org JSON-LD Generators  │  - Lenis Smooth Inertia Scrolling   │
│  - Static Route Pre-rendering     │  - Responsive Lightbox & Modals     │
│  - sitemap.xml & robots.txt       │  - Accessible ARIA Enquiry Forms    │
├───────────────────────────────────┴────────────────────────────────────┤
│                       DATA CONTRACTS & UTILITIES                       │
│  - data/puppies.ts       - data/puppyColors.json    - data/faqData.ts │
│  - Strict TypeScript 5.7 Interfaces (Puppy, FAQItem, NavigationItem)   │
└────────────────────────────────────────────────────────────────────────┘
```

* **Core Framework:** Next.js 15.2 utilizing the App Router with Turbopack for ultra-fast compilation.
* **Language:** TypeScript 5.7 configured with strict type assertions (`npx tsc --noEmit` clean).
* **Styling System:** Tailwind CSS 3.4 coupled with CSS custom properties and modern CSS color functions (`color-mix`).
* **Motion & Physics:** Framer Motion 12.4 and Lenis 1.3 for smooth inertia scrolling and scroll-linked timeline sequences.
* **Icons & Assets:** Lucide React for accessible vector icons; original high-density WebM/MP4 media and SVG assets.
* **Search Engine Optimization:** Built-in dynamic sitemaps, robots.txt, PWA manifest, and comprehensive Schema.org structured data.
* **Testing & Quality Assurance:** Automated headless Chrome DevTools Protocol (CDP) test suites simulating real browser environments across viewports from 800px to 1920px.

---

## 📂 Comprehensive Project Directory Structure

```text
puppy-clone/
├── app/                                 # Next.js 15 App Router Routes
│   ├── layout.tsx                       # Root layout shell, fonts, global JSON-LD
│   ├── page.tsx                         # Homepage with server metadata
│   ├── sitemap.ts                       # Dynamic XML sitemap generator (/sitemap.xml)
│   ├── robots.ts                        # Crawling directives (/robots.txt)
│   ├── manifest.ts                      # PWA web manifest (/manifest.webmanifest)
│   ├── puppies/
│   │   ├── page.tsx                     # Puppies catalog route with ItemList schema
│   │   └── [slug]/
│   │       ├── page.tsx                 # Dynamic puppy profile with Product schema
│   │       └── ...
│   ├── happy-families/page.tsx          # Testimonials and client gallery
│   ├── how-it-works/page.tsx            # 3-step adoption guide with HowTo schema
│   ├── faq/page.tsx                     # FAQ accordion route with FAQPage schema
│   └── contact/page.tsx                 # Showroom contact route with ContactPage schema
├── components/                          # Decoupled, Reusable UI Components
│   ├── layout/                          # Global Shell Primitives
│   │   ├── Header.tsx                   # Scalloped navbar with dropdowns & WhatsApp CTA
│   │   ├── Footer.tsx                   # Scalloped multi-column footer with live hours
│   │   ├── Curtain.tsx                  # Page transition choreography
│   │   └── Navigation.tsx               # Accessible responsive navigation links
│   ├── home/                            # Homepage Feature Components
│   │   ├── HomeClient.tsx               # Scroll-driven storytelling runner
│   │   └── PawCursor.tsx                # Custom interactive paw trail follower
│   ├── puppy/                           # Puppy Detail Feature Components
│   │   └── PuppyDetailClient.tsx        # Pure semantic JSX profile, media switcher, modal, form
│   └── ui/                              # Atomic UI Primitives (Modals, Badges, Buttons)
├── data/                                # Isolated Data Contracts & Models
│   ├── puppies.ts                       # Typed puppy catalog (15+ breeds, ages, media)
│   ├── puppyColors.json                 # Dominant hex color mapping for dynamic OKLab theming
│   ├── faqData.ts                       # Curated FAQ items & answers
│   └── navigation.ts                    # Header & footer navigation structure
├── public/                              # Static Public Assets
│   ├── icon.png                         # 512×512 HD original site icon
│   ├── apple-icon.png                   # 180×180 original Apple touch icon
│   ├── favicon.ico                      # Multi-size (16, 32, 48, 64) legacy fallback favicon
│   ├── images/                          # High-density puppy portraits & backgrounds
│   └── media/                           # Optimized WebM/MP4 video clips
├── scratch/ & scripts/                  # Automated CDP Test Suites & Verification Tools
│   ├── test_form_interaction.js         # Automated form typing, validation, and error assertions
│   ├── verify_seo_jsonld.js             # Automated HTTP status & JSON-LD parser suite
│   ├── make_email_pdf.py                # Automated Edge headless PDF report generator
│   └── report_email.html                # Executive 4-page A4 architecture report template
├── TeddyPups_Technical_Architecture_Report_Khushal_Mali.pdf # Generated Submission Report
├── README.md                            # Comprehensive engineering documentation
├── package.json                         # Project dependencies & Turbopack scripts
├── tailwind.config.ts                   # Custom color tokens, font families, keyframes
└── tsconfig.json                        # Strict TypeScript compiler options
```

---

## 🔬 Core Engineering Challenges & Technical Deep-Dives

### 1. Dynamic OKLab Color Science & Perceptual Theming
* **The Engineering Problem:**  
  Each puppy has a distinctive coat color (e.g., Maltipoo cream, Poodle red-brown, Pomeranian sable). The original website renders an ambient background aura that harmonizes with the puppy's fur. Standard CSS color interpolation in sRGB or HSL introduces perceptual non-linearities, resulting in muddy, gray, or overly saturated halos.
* **The Solution:**  
  Dominant color hexes were extracted and cataloged in `data/puppyColors.json`. In `components/puppy/PuppyDetailClient.tsx`, modern CSS perceptual color spaces were leveraged using `color-mix(in oklab, ...)`:
  ```css
  background: radial-gradient(
    circle at 50% 0%,
    color-mix(in oklab, var(--dominant-color) 24%, var(--color-milk)) 0%,
    var(--color-milk) 70%
  );
  ```
  OKLab aligns with human visual perception, guaranteeing that light pastel tones maintain uniform perceived lightness and chroma across every puppy profile.

### 2. Viewport-Constrained Media Lightbox & Document Scroll Lock
* **The Engineering Problem:**  
  Portrait orientation videos (e.g., 9:16 aspect ratio smartphone captures) routinely exceed the vertical height of small laptop viewports (1366×768) and mobile devices. Without careful containment, video players overflowed past the viewport boundary, hiding the close button and allowing the underlying webpage to scroll independently.
* **The Solution:**  
  1. Clamped modal dimensions using dynamic viewport units:
     ```css
     max-height: calc(100dvh - 6rem);
     width: auto;
     aspect-ratio: 9 / 16;
     ```
  2. Implemented an active document scroll lock on mount:
     ```typescript
     useEffect(() => {
       if (isModalOpen) {
         const originalOverflow = document.body.style.overflow;
         document.body.style.overflow = 'hidden';
         return () => {
           document.body.style.overflow = originalOverflow;
         };
       }
     }, [isModalOpen]);
     ```

### 3. Honeypot Anti-Spam vs. Modern Browser Autofill Protection
* **The Engineering Problem:**  
  To prevent automated bot spam, the enquiry form features a hidden honeypot input field (`<input name="website" tabIndex={-1} />`). However, modern password managers and autofill extensions (such as 1Password, Chrome Autofill, or Fake Filler) indiscriminately populate all text inputs, causing legitimate human users to be silently rejected.
* **The Solution:**  
  Decoupled bot trapping from client-side form validation. The client-side form validation checks mandatory fields (`name`, `phone`) using explicit accessible ARIA states:
  ```tsx
  <input
    name="phone"
    aria-invalid={!!formErrors.phone}
    className="border border-[#ebd8c8] aria-[invalid=true]:border-[#b3261e]"
  />
  ```
  Legitimate submissions are never silently dropped, and users receive clear inline visual prompts if any required field is missing.

### 4. Safari/Chrome Popup-Blocker Mitigation on WhatsApp Handoff
* **The Engineering Problem:**  
  Triggering `window.open(url, '_blank')` inside asynchronous callbacks or synthetic delay promises causes modern web browsers (Chrome, Safari, Edge) to intercept the action as an unauthorized popup, completely blocking the user from reaching the WhatsApp concierge.
* **The Solution:**  
  Preserved direct synchronous user gesture execution. When the user clicks "Send enquiry", client-side validation executes immediately in the same tick of the event loop, opening the pre-filled WhatsApp conversation seamlessly while simultaneously transitioning the local UI to a confirmation success state.

---

## 🔍 Production SEO Engine & Google Rich Snippets

The application implements a production-grade SEO architecture adhering to Google Search Central guidelines:

### 1. Dynamic XML Sitemap & Robots Protocol
* **`/sitemap.xml` ([`app/sitemap.ts`](app/sitemap.ts)):** Automatically generates a valid XML sitemap indexing all 6 static routes and 15+ dynamic puppy profiles with adaptive daily/weekly change frequencies.
* **`/robots.txt` ([`app/robots.ts`](app/robots.ts)):** Explicit crawling directives allowing universal Googlebot discovery while safeguarding private endpoints.
* **`/manifest.webmanifest` ([`app/manifest.ts`](app/manifest.ts)):** Mobile PWA installation manifest boosting mobile discovery ranking signals.

### 2. Multi-Tier Schema.org Structured Data (JSON-LD)

| Page | Schema `@type` | Rich Google Search Snippet Output |
| :--- | :--- | :--- |
| **All Pages** | `PetStore` & `WebSite` | Local knowledge graph panel with Downtown Dubai physical address, geo-coordinates, operating hours, and phone number. |
| **`/faq`** | `FAQPage` | **Expandable Q&A Cards:** Directly renders collapsible question and answer accordions in Google search results. |
| **`/puppies`** | `ItemList` | Carousel / catalog preview listing all available puppy breeds, ages, and profile URLs. |
| **`/puppies/[slug]`** | `Product`, `Offer`, `BreadcrumbList` | Rich product cards with real-time `InStock`/`SoldOut` availability flags, breed traits, age, and breadcrumb navigation. |
| **`/how-it-works`** | `HowTo` | Numbered step-by-step guide snippet in organic search results. |
| **`/contact`** | `ContactPage` | Direct link to physical Dubai showroom and concierge contact channels. |

---

## 🤖 AI Collaboration Policy & Prompt Engineering Logs

In full compliance with Blutec AI's assignment policy encouraging modern AI tools with complete architectural comprehension, AI models (Claude 3.7 / Gemini via Antigravity Agent) were utilized as high-leverage engineering assistants.

### Phase 1: DOM & Computed CSS Extraction Prompt
> *"Inspect the computed CSS rules, line heights, font family hierarchy, and SVG scallop masks on the TeddyPups navigation and hero sections at https://puppy.instabizweb.com/. Convert these styles into semantic Tailwind CSS utility classes and modern CSS custom variables without using raw pixel hacks."*

### Phase 2: Semantic JSX Refactoring & State Hooking Prompt
> *"Refactor the puppy detail page into pure, idiomatic JSX in components/puppy/PuppyDetailClient.tsx. Extract the media switcher, photo/video modal lightbox, and enquiry form into modular React 19 state hooks. Add ARIA accessibility attributes and validate all form fields with inline error messaging."*

### Phase 3: Autonomous Headless CDP Testing Prompt
> *"Write a Node.js test script using the Chrome DevTools Protocol to connect to headless Chrome/Edge. Navigate to http://localhost:3000 and the live reference site, capture full-page screenshots at 1440px and 800px viewports, calculate pixel-by-pixel diffs, and assert that computed font sizes, margins, and modal scroll locks match exactly."*

---

## 🧪 Automated Testing, QA & Verification Matrix

Quality assurance was automated using programmatic test scripts:

| Verification Target | Method / Script | Result |
| :--- | :--- | :--- |
| **Type Integrity** | `npx tsc --noEmit` | **0 errors, 0 warnings.** Strict TypeScript assertions across all routes. |
| **Form Interactions** | `node scratch/test_form_interaction.js` | Verified invalid field highlights, required badges, and submission flows. |
| **SEO & Schemas** | `node scratch/verify_seo_jsonld.js` | Verified HTTP 200 responses and valid JSON-LD structure across all routes. |
| **Cross-Viewport Testing** | Automated Edge CDP Emulation | Verified layout stability across 800px, 1024px, 1280px, 1440px, and 1920px. |
| **Production Build** | `npm run build` | Turbopack compilation succeeded with optimized static asset chunks. |

---

## 💻 Local Development & Build Guide

### Prerequisites
* **Node.js:** v18.18+ or v20.x
* **npm:** v9.x or v10.x

### Quickstart

1. **Clone the repository:**
   ```bash
   git clone https://github.com/khushal-mali/puppy-clone.git
   cd puppy-clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server (with Turbopack):**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Execute TypeScript type check:**
   ```bash
   npx tsc --noEmit
   ```

5. **Build and run for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 👤 Author & Contact

* **Candidate:** Khushal Mali
* **Position:** Frontend & Full-Stack Engineer
* **Email:** [khushalmali8448@gmail.com](mailto:khushalmali8448@gmail.com)
* **Phone:** +91 8433515648
* **LinkedIn:** [https://www.linkedin.com/in/khushalmali/](https://www.linkedin.com/in/khushalmali/)
* **GitHub:** [https://github.com/khushal-mali](https://github.com/khushal-mali)
* **Live Demo:** [https://puppy-clone.vercel.app/](https://puppy-clone.vercel.app/)
