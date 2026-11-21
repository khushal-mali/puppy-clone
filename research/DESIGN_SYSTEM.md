# TeddyPups Design System & Visual Specification

## 1. Brand Identity & Aesthetic Philosophy
TeddyPups is positioned as a **high-end luxury boutique pet concierge** based in Dubai, U.A.E. The visual language blends:
- **Warm Editorial Luxury:** High-contrast serif headlines, creamy surfaces, rich cocoa text.
- **Playful Boutique Charm:** Handwritten badge scripts, dog paw print motifs, interactive custom cursors, ticket stubs.
- **Organic Soft Tactility:** Rounded pill buttons, large card corner radii, smooth silk springs, warm wood and honey accents.

---

## 2. Color Palette & Semantic Tokens

Extracted directly from the compiled stylesheets (`style_0.css` and `style_1.css`):

### Primary & Accent Colors
| Token Name | Hex Value | Semantic Usage |
| :--- | :--- | :--- |
| `--color-milk` | `#fffdf8` | Base page canvas, light card background, card surface |
| `--color-cocoa` | `#2a170e` | Primary high-contrast text, dark buttons, deep borders |
| `--color-cocoa-soft` | `#5a3a28` | Secondary body text, subheadings, muted borders |
| `--color-honey` | `#f2be6b` | Primary warm accent, star ratings, highlight badges |
| `--color-honey-soft` | `#fbe3b4` | Warm badge backgrounds, soft hover fills |
| `--color-toffee` | `#c2622b` | Primary call-to-action color, warm links, paw accents |
| `--color-toffee-deep`| `#a24a1a` | Active / hover state for toffee elements |
| `--color-toffee-ink` | `#8e3f15` | High-contrast dark toffee text on light backgrounds |
| `--color-blush` | `#f9cdbf` | Soft blush pink for gentle accents and girl badges |
| `--color-sky` | `#bfddf5` | Soft sky blue for boy badges and international travel |
| `--color-sky-deep` | `#2f6e9e` | Deep sky blue for contrast links and travel headers |
| `--night` | `#24130b` | Ultra-dark backdrop for modals and scene curtains |

### Gradients & Textures
- **Wood Texture:** `--wood: linear-gradient(#e4a85b, #d38f45)`
- **Noise Overlay:** `data:image/svg+xml...feTurbulence` (Subtle 0.85 opacity grain texture on cards)
- **Ink Soft Alpha:** `rgba(42, 23, 14, 0.12)` to `rgba(42, 23, 14, 0.29)` for borders and dividers

---

## 3. Typography & Font Specifications

The reference website uses three complementary font families loaded via Next.js Font Optimization (`_next/static/media/*.woff2`):

### Font Families
1. **Editorial Display Serif: `Fraunces`**
   - Fallback: `Times New Roman, serif`
   - Variable Weights: `100` to `900`
   - Usage: H1 page titles, hero headers, section titles, editorial quotes
   - Class token: `--font-fraunces` / `--font-display`

2. **UI & Primary Body: `Figtree`**
   - Fallback: `Arial, sans-serif`
   - Variable Weights: `300` to `900`
   - Usage: Body copy, navigation links, buttons, form inputs, meta specs
   - Class token: `--font-figtree` / `--default-font-family`

3. **Handwritten / Script Accent: `Shantell Sans`**
   - Fallback: `ui-rounded, "Comic Sans MS", cursive`
   - Variable Weights: `300` to `800`
   - Usage: Handwritten notes, paw badges, ticket subtitles, playful callouts
   - Class token: `--font-shantell` / `--font-hand`

### Type Scale & Hierarchy
| Level | Font Family | Size (Desktop) | Line Height | Weight | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero H1** | Fraunces | `clamp(2.75rem, 6vw, 4.5rem)` | `1.05 - 1.15` | 700 Bold | `-0.02em` |
| **Section H2** | Fraunces | `clamp(2rem, 4vw, 3rem)` | `1.15` | 700 Bold | `-0.015em` |
| **Card H3** | Fraunces / Figtree | `1.5rem` (`24px`) | `1.33` | 600 SemiBold | `normal` |
| **Subtitle / H4** | Shantell Sans | `1.125rem` (`18px`) | `1.4` | 500 Medium | `0.01em` |
| **Lead Body** | Figtree | `1.125rem` (`18px`) | `1.6` | 400 Regular | `normal` |
| **Body Text** | Figtree | `1rem` (`16px`) | `1.5` | 400 Regular | `normal` |
| **Small / Meta** | Figtree | `0.875rem` (`14px`) | `1.4` | 500 Medium | `0.01em` |
| **Badge / Caption** | Figtree / Shantell | `0.75rem` (`12px`) | `1.2` | 600 SemiBold | `0.025em wide` |

---

## 4. Spacing, Layout & Container Dimensions

### Container Widths
- `--container-sm`: `24rem` (384px) - Floating cards, dropdowns
- `--container-md`: `28rem` (448px) - Contact forms, modal dialogs
- `--container-xl`: `36rem` (576px) - Article text columns
- `--container-3xl`: `48rem` (768px) - Compact content grids
- `--container-5xl`: `64rem` (1024px) - Medium container
- `--container-6xl`: `72rem` (1152px) - Standard content container
- `--container-7xl`: `80rem` (1280px) - Full-width wide layouts

### Viewport Gutters & Header/Footer Heights
- **Header Height:** `--header-h: 4rem` (`64px`)
- **Safe Area Bottom Bar:** `--bar-h: calc(4rem + env(safe-area-inset-bottom))`
- **Responsive Gutter:** `--gutter: clamp(1rem, 4vw, 3.5rem)`
- **Floor Height:** `--floor-h: clamp(5rem, 13vh, 8rem)`
- **Quilt Height:** `--quilt-h: clamp(4.5rem, 12vh, 8rem)`

---

## 5. Border Radii & Elevations

### Border Radii
- Small tags / inputs: `--radius-xl: 0.75rem` (`12px`)
- Standard cards: `--radius-2xl: 1rem` (`16px`)
- Large showcase cards / modals: `--radius-3xl: 1.5rem` (`24px`)
- Buttons & Pills: `rounded-full: 9999px`

### Shadows & Elevation
- **Card Shadow:** `box-shadow: 0 4px 20px -2px rgba(42, 23, 14, 0.08)`
- **Hover Lift:** `box-shadow: 0 12px 32px -4px rgba(42, 23, 14, 0.14)`
- **Focus Ring:** `0 0 0 4px rgba(242, 190, 107, 0.6)` (`--color-honey` ring)
- **Drop Shadows:** `drop-shadow(0 1px 2px rgba(0,0,0,0.1)) drop-shadow(0 1px 1px rgba(0,0,0,0.06))`

---

## 6. Component Style Specifications

### Buttons (`.btn`)
- **Base Dimensions:** `min-height: 3.25rem` (`52px`), `padding: 0 1.75rem` (`28px`), `border-radius: 9999px`
- **Primary Button (Toffee):** Background `--color-toffee`, text `--color-milk`, font `Figtree 600`. Hover `--color-toffee-deep`.
- **Secondary Button (Outlined Cocoa):** Border `1.5px solid var(--color-cocoa)`, text `--color-cocoa`, background transparent. Hover: background `--color-cocoa`, text `--color-milk`.
- **WhatsApp Button:** Background `#25D366` / `--color-cocoa` with WhatsApp green badge, text white, rounded pill.

### Badges & Tags (`.tp-tag`, `.badge`)
- **Available Badge:** Green / Honey soft background, rounded pill, font `Figtree 600`, 12px.
- **Gender Badges:**
  - Girl: `--color-blush` background with dark toffee text.
  - Boy: `--color-sky` background with deep sky blue text.
- **Interactive Swing Animation:** Sway rotation of `-7deg` to `0deg` using `--ease-silk`.

### Cards
- **Available Puppy Card:** 
  - Aspect ratio: `4/5` or `1/1` image container with rounded-2xl corners (`16px`).
  - Overlay gradient on bottom: subtle dark vignette for title contrast.
  - Vitals strip: Name, breed, gender tag, age badge.
- **Boarding Pass / Ticket Card (Gone Home):**
  - Perforated border with circular bite notches (`mask-image` or pseudo-elements).
  - "Admit One" stamp and "Home ♥" vintage boarding pass badge.
  - Sepia / warm tint treatment.

### Custom Cursors
- Default pointer: `/cursor/paw.svg` (`url(/cursor/paw.svg), auto`)
- Click / Active state: `/cursor/paw-press.svg` (`url(/cursor/paw-press.svg), pointer`)
