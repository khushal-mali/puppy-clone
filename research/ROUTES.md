# TeddyPups Website Route Discovery & Analysis

## 1. Executive Summary

This document records the complete route discovery for the **TeddyPups** reference website (`https://puppy.instabizweb.com/`). The website is built on **Next.js (App Router)** with server-rendered pages and client-side hydration.

- **Total routes discovered:** 51
- **Routes successfully inspected:** 49
- **Routes inaccessible / 404:** 2 (`/delivery-collection` and `/cdn-cgi/l/email-protection`)
- **Main marketing pages:** 7
- **Individual puppy profile pages:** 42

---

## 2. Core Route Inventory

| Route | Page Title / Purpose | HTTP Status | Accessibility | Viewport Tested |
| :--- | :--- | :--- | :--- | :--- |
| `/` | TeddyPups U.A.E. — Premium teacup puppies in Dubai | 200 OK | Accessible | Desktop (1440x900), Mobile (390x844), Tablet (820x1180) |
| `/puppies` | Available puppies \| TeddyPups U.A.E. | 200 OK | Accessible | Desktop (1440x900), Mobile (390x844) |
| `/happy-families` | Happy families \| TeddyPups U.A.E. | 200 OK | Accessible | Desktop (1440x900), Mobile (390x844) |
| `/how-it-works` | How it works \| TeddyPups U.A.E. | 200 OK | Accessible | Desktop (1440x900), Mobile (390x844) |
| `/faq` | Questions & answers \| TeddyPups U.A.E. | 200 OK | Accessible | Desktop (1440x900), Mobile (390x844) |
| `/contact` | Visit & contact \| TeddyPups U.A.E. | 200 OK | Accessible | Desktop (1440x900), Mobile (390x844) |
| `/gone-home` | Gone home \| TeddyPups U.A.E. | 200 OK | Accessible | Desktop (1440x900), Mobile (390x844) |
| `/delivery-collection` | *Legacy standalone delivery route* | **404 Not Found** | Inaccessible | Desktop (1440x900), Mobile (390x844) |
| `/how-it-works#delivery` | Embedded Delivery & Collection Section | 200 OK | Accessible | Desktop (1440x900), Mobile (390x844) |

### Note on `/delivery-collection` (404 Resolution)
The route `/delivery-collection` returns a 404 status code on the reference site. Inspection of the site architecture and footer navigation revealed that the "Delivery & collection" content has been incorporated as an in-page section within `/how-it-works` at the anchor `/how-it-works#delivery`. The section details same-day Dubai delivery, international climate-controlled cargo, and worldwide shipping.

### Note on `/cdn-cgi/l/email-protection`
This is Cloudflare's built-in email obfuscation endpoint used to protect mail addresses from automated scrapers.

---

## 3. Individual Puppy Profile Routes (42 Profiles)

Every puppy has a dedicated dynamic route under `/puppies/<slug>`.

### Available Puppies (20 Profiles)
| # | Slug | Puppy / Title | Breed | Gender | Age | Location |
| :- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `/puppies/maltipoo-max-male` | Max | Maltipoo | Boy | 3 months | Imported for you |
| 2 | `/puppies/korean-teacup-maltipoo-female` | Korean Teacup Maltipoo | Maltipoo | Girl | 2 months | Imported for you |
| 3 | `/puppies/korean-teacup-poodle-female` | Korean Teacup Poodle | Poodle | Girl | 2 months | Imported for you |
| 4 | `/puppies/maltipoo-cavapoo-male` | Maltipoo & Cavapoo | Maltipoo / Cavapoo | Boy | 3 mos / 2 mos | Imported for you |
| 5 | `/puppies/toy-poodle-male-female` | Toy Poodle | Toy Poodle | Boy & Girl | 2 months | Imported for you |
| 6 | `/puppies/maltipoo-female-2` | Maltipoo | Maltipoo | Girl | 3 months | Imported for you |
| 7 | `/puppies/pomeranian-female` | Pomeranian | Pomeranian | Girl | 2 months | Imported for you |
| 8 | `/puppies/copper-male` | Copper | Cavapoo | Boy | 3 months | Dubai showroom |
| 9 | `/puppies/shitzu-female` | Shih Tzu | Shih Tzu | Girl | 2.5 months | Imported for you |
| 10 | `/puppies/shitzu-male` | Shih Tzu | Shih Tzu | Boy | 2.5 months | Imported for you |
| 11 | `/puppies/maltipoo-female-1` | Maltipoo | Maltipoo | Girl | 2.5 months | Imported for you |
| 12 | `/puppies/maltipoo-female` | Maltipoo | Maltipoo | Girl | 2.5 months | Imported for you |
| 13 | `/puppies/korean-teacup-pomeranian-1` | Korean Teacup Pomeranian | Pomeranian | Girl | 2 months | Imported for you |
| 14 | `/puppies/korean-teacup-pomeranian` | Korean Teacup Pomeranian | Pomeranian | Girl | 2 months | Imported for you |
| 15 | `/puppies/korean-teacup-pomeranian-male` | Korean Teacup Pomeranian | Pomeranian | Boy | 2 months | Imported for you |
| 16 | `/puppies/poodle-molly-girl` | Molly | Poodle | Girl | 2.5 months | Imported for you |
| 17 | `/puppies/poodle-rocky-boy` | Rocky | Poodle | Boy | 2.5 months | Imported for you |
| 18 | `/puppies/maltipoo-sophie-girl` | Sophie | Maltipoo | Girl | 2 months | Imported for you |
| 19 | `/puppies/maltipoo-lola-girl` | Lola | Maltipoo | Girl | 2.5 months | Imported for you |
| 20 | `/puppies/bichon-bailey-boy` | Bailey | Bichon | Boy | 3 months | Dubai showroom |

### "Gone Home" Puppies (22 Profiles)
| # | Slug | Puppy / Title | Breed | Gender | Ticket Status |
| :- | :--- | :--- | :--- | :--- | :--- |
| 21 | `/puppies/pomeranian-ace-boy` | Ace | Pomeranian | Boy | Gone Home (Admit One) |
| 22 | `/puppies/poodle-leo-male` | Leo | Poodle | Boy | Gone Home (Admit One) |
| 23 | `/puppies/maltipoo-mia-girl` | Mia | Maltipoo | Girl | Gone Home (Admit One) |
| 24 | `/puppies/maltipoo-sadie-girl` | Sadie | Maltipoo | Girl | Gone Home (Admit One) |
| 25 | `/puppies/blue-marle-pomeranian` | Blue Merle Pomeranian | Pomeranian | Boy | Gone Home (Admit One) |
| 26 | `/puppies/pomsky-ollie-boy` | Ollie | Pomsky | Boy | Gone Home (Admit One) |
| 27 | `/puppies/maltipoo-bruno-boy` | Bruno | Maltipoo | Boy | Gone Home (Admit One) |
| 28 | `/puppies/maltese-buddy-male` | Buddy | Maltese | Boy | Gone Home (Admit One) |
| 29 | `/puppies/maltese-charlie-male` | Charlie | Maltese | Boy | Gone Home (Admit One) |
| 30 | `/puppies/pomeranian-daisy-girl` | Daisy | Pomeranian | Girl | Gone Home (Admit One) |
| 31 | `/puppies/pomeranian-bella-female` | Bella | Pomeranian | Girl | Gone Home (Admit One) |
| 32 | `/puppies/poodle-teddy-male` | Teddy | Poodle | Boy | Gone Home (Admit One) |
| 33 | `/puppies/poodle-molly-female` | Molly | Poodle | Girl | Gone Home (Admit One) |
| 34 | `/puppies/pomski-coco-girl` | Coco | Pomsky | Girl | Gone Home (Admit One) |
| 35 | `/puppies/pomsky-rosie-girl` | Rosie | Pomsky | Girl | Gone Home (Admit One) |
| 36 | `/puppies/pomeranian-leo-boy` | Leo | Pomeranian | Boy | Gone Home (Admit One) |
| 37 | `/puppies/pomeranian-rex-boy` | Rex | Pomeranian | Boy | Gone Home (Admit One) |
| 38 | `/puppies/pomsky-finn-male` | Finn | Pomsky | Boy | Gone Home (Admit One) |
| 39 | `/puppies/maltipoo-zoe-girl` | Zoe | Maltipoo | Girl | Gone Home (Admit One) |
| 40 | `/puppies/pomeranian-mimi-girl` | Mimi | Pomeranian | Girl | Gone Home (Admit One) |
| 41 | `/puppies/puppy` | Puppy (Maltipoo) | Maltipoo | Girl | Gone Home (Admit One) |
| 42 | `/puppies/maltipo` | Poodle puppy | Poodle | Girl | Gone Home (Admit One) |

---

## 4. Navigation Links Structure

### Main Header Navigation
1. Brand Logo: `/` (TeddyPups)
2. Home: `/`
3. Puppies: `/puppies`
4. Happy families: `/happy-families`
5. How it works: `/how-it-works`
6. FAQ: `/faq`
7. Visit & contact: `/contact`
8. WhatsApp CTA: `https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web...`

### Mobile Drawer Navigation
Full-screen animated overlay triggered by hamburger button with:
- Home (`/`)
- Puppies (`/puppies`)
- Happy families (`/happy-families`)
- How it works (`/how-it-works`)
- FAQ (`/faq`)
- Visit & contact (`/contact`)
- Direct WhatsApp quick dial button

### Footer Navigation Links
**Column 1: Explore**
- Available puppies (`/puppies`)
- Gone home (`/gone-home`)
- Happy families (`/happy-families`)
- How it works (`/how-it-works`)
- Delivery & collection (`/how-it-works#delivery`)
- FAQ (`/faq`)
- Visit & contact (`/contact`)

**Column 2: Say Hello**
- WhatsApp: `+971 50 000 0000` (`https://wa.me/919898124987...`)
- Socials: Instagram, TikTok, Facebook (`https://www.instabizweb.com/`)
