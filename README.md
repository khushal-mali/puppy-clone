# TeddyPups — High-Fidelity Web Experience Clone

> **Technical Assignment Submission for Blutec AI**  
> **Candidate:** Khushal Mali  
> **Live Demo:** [Deploy Link Pending / Add Vercel URL Here]  
> **GitHub Repository:** [https://github.com/khushal-mali/puppy-clone](https://github.com/khushal-mali/puppy-clone)  
> **Reference Website:** [https://puppy.instabizweb.com/](https://puppy.instabizweb.com/)

---

## 🌟 Executive Summary

This repository contains a full-stack, pixel-perfect clone of the **TeddyPups** web platform, built to evaluate modern frontend engineering, architecture design, design fidelity, and advanced problem-solving under real-world conditions.

Built with **Next.js 15 (Turbopack)**, **React 19**, **TypeScript**, and **Tailwind CSS**, the project replicates every layout, animation, micro-interaction, dynamic color theme, and responsive state of the original site with 100% semantic JSX.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 15.2 (App Router) | High-performance React framework with Turbopack bundler |
| **Language** | TypeScript 5.7 | Strict type safety across all props, state, and datasets |
| **Styling** | Tailwind CSS 3.4 | Utility-first styling with custom OKLab color functions |
| **Animations** | Framer Motion 12 & Lenis | Smooth inertia scrolling, scroll-triggered frame choreography |
| **Icons & Media**| Lucide React & Optimized Assets | Responsive high-density graphics, SVGs, and WebM/MP4 media |
| **Quality & CDP**| Node.js & Chrome DevTools Protocol | Automated headless verification, DOM diffing, and form simulation |

---

## 📂 Project Structure

```text
puppy-clone/
├── app/                        # Next.js 15 App Router
│   ├── layout.tsx              # Root HTML shell, typography, and metadata
│   ├── page.tsx                # Homepage featuring interactive scroll choreography
│   ├── puppies/
│   │   ├── page.tsx            # Available puppies catalog with multi-filter grid
│   │   └── [slug]/
│   │       ├── page.tsx        # Dynamic route for puppy detail view
│   │       └── ...
│   ├── happy-families/page.tsx # Testimonials and customer showcases
│   ├── how-it-works/page.tsx   # Step-by-step adoption process walkthrough
│   ├── faq/page.tsx            # Expandable interactive accordion FAQ
│   └── contact/page.tsx        # Visit & contact page with validated form
├── components/                 # Reusable, decoupled UI components
│   ├── layout/                 # Scalloped Header, Navigation, Sticky Paw, Footer
│   ├── home/                   # Hero runner, scroll-story, interactive basket
│   ├── puppy/
│   │   └── PuppyDetailClient.tsx # Pure semantic JSX detail page with OKLab theming
│   └── ui/                     # Accessible Modals, Lightbox, Form controls
├── data/                       # Structured JSON models (puppies, colors, FAQs)
│   ├── puppies.json            # Breed catalog, age, media arrays, traits
│   └── puppyColors.json        # Dominant hex color mapping for dynamic theming
├── scratch/ & scripts/         # Automated CDP test suites, crawlers, DOM diff checkers
└── public/                     # Static media assets, SVGs, textures, audio/video
```

---

## 🚀 Key Engineering Challenges & Solutions

### 1. Dynamic OKLab Color Science
* **Challenge:** Each individual puppy profile page dynamically tints the page background, badges, and accents using the puppy's unique fur/accent tones without causing color clash or muddy contrast.
* **Solution:** Extracted dominant puppy color palettes into `data/puppyColors.json` and computed harmonious background gradients using modern CSS color spaces:
  ```css
  background: radial-gradient(
    circle at 50% 0%,
    color-mix(in oklab, var(--dominant-color) 24%, var(--color-milk)) 0%,
    var(--color-milk) 70%
  );
  ```

### 2. Viewport-Constrained Media Lightbox & Scroll Locking
* **Challenge:** On mobile and compact laptop viewports, video and photo modals overflowed vertically, causing nested scroll bars and obscured action buttons.
* **Solution:** Engineered dynamic viewport-height clamping (`max-h-[calc(100dvh-6rem)]`) with flex-column aspect ratio preservation, coupled with an active document scroll lock (`overflow: hidden`) on mount to prevent underlying page drift.

### 3. Honeypot Anti-Spam vs. Browser Autofill Extensions
* **Challenge:** Standard hidden honeypot fields (`<input name="website">`) are frequently targeted by modern password managers and autofill extensions (e.g., Fake Filler, Chrome Autofill), causing legitimate inquiries to be silently dropped.
* **Solution:** Decoupled honeypot detection from immediate rejection. Kept honeypot inputs fully accessible for bot trapping while ensuring user inputs undergo robust client-side ARIA validation without silent drops.

### 4. Popup-Blocker Mitigation on WhatsApp Handoff
* **Challenge:** Triggering `window.open(url, '_blank')` after asynchronous state updates or synthetic validation delays causes modern Safari/Chrome popup blockers to intercept the redirect.
* **Solution:** Maintained direct user gesture activation during form submission, seamlessly transitioning between client-side validation feedback and external chat routing.

---

## 🤖 AI Tools & Prompt Engineering Workflow

As permitted under Blutec AI assignment guidelines, modern AI assistance was leveraged to accelerate delivery while maintaining rigorous engineering oversight:

1. **Architecture & Scaffolding:** Used **Gemini / Claude** via the Antigravity Agent to parse the original DOM structure, extract nested typography classes, and scaffold modular Next.js components.
2. **Reverse Engineering Animations:** Analyzed frame-by-frame scroll transitions and translated custom CSS keyframes into declarative Framer Motion hooks.
3. **Automated Verification:** Prompts instructed the agent to build autonomous **Chrome DevTools Protocol (CDP)** test scripts (`scratch/test_form_interaction.js`, `scratch/capture_color_fixed.js`) to capture headless screenshots, compute pixel diffs against the reference site, and assert exact computed CSS styles.

---

## 🧪 Testing & Verification

Automated regression and fidelity tests were executed using custom CDP scripts:

```bash
# Verify form validation, honeypot inputs, and error states
node scratch/test_form_interaction.js

# Test OKLab dynamic color blending across all puppy slugs
node scratch/capture_color_fixed.js

# Run TypeScript type assertion
npx tsc --noEmit
```

---

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/khushal-mali/puppy-clone.git
   cd puppy-clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production Build:**
   ```bash
   npm run build
   npm run start
   ```

---

## 👤 Author

* **Khushal Mali**
* **Application:** Blutec AI Technical Round
* **Repository:** [https://github.com/khushal-mali/puppy-clone](https://github.com/khushal-mali/puppy-clone)
