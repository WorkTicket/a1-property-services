# A1 Property Services — Agent Dev Instructions

## Project Overview

Modern redesign of **a1pslandscape.com** — a landscaping & hardscaping company based in Cedar Falls, Iowa. The existing site is built on WordPress/Elementor. The new site is **Next.js 14 (App Router) + Tailwind CSS**, deployed to Vercel.

**Business:** A1 Property Services  
**Phone:** +1 319 464 1889  
**Email:** a1propertyservices0219@gmail.com  
**Address:** 503 Bergstrom Blvd, Cedar Falls, IA 50613  
**Service Area:** Cedar Falls, Waterloo, Cedar Valley, Iowa  
**Google Place ID:** ChIJx1yIuk9V5YcRMqQd-z4_YIE

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v3 |
| Fonts | `next/font/google` — see Design Tokens |
| Images | `next/image` with `sharp` |
| Forms | React Hook Form + server actions |
| Animations | Framer Motion (use sparingly) |
| Icons | Lucide React |
| Deployment | Vercel |

**Node version:** 20+  
**Package manager:** npm

---

## Design Tokens

### Color Palette

```js
// tailwind.config.js → extend.colors
colors: {
  brand: {
    green:     '#2D5016', // deep forest green — primary CTA, logo bg
    greenLight:'#4A7C2F', // hover states, accents
    greenMuted:'#7BA05B', // badges, chips
    cream:     '#F5F0E8', // section backgrounds, light mode base
    stone:     '#3C3830', // body text, headings
    red:       '#C0392B', // logo accent (existing brand mark)
  },
  neutral: {
    50:  '#FAFAF9',
    100: '#F5F0E8',
    200: '#E8E0D0',
    800: '#3C3830',
    900: '#1A1614',
  }
}
```

### Typography

```js
// app/layout.tsx
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})
```

| Role | Font | Usage |
|---|---|---|
| Display | Playfair Display | H1, H2 section titles |
| Body | Inter | Paragraphs, nav, UI |
| Eyebrows | Inter 600 uppercase tracked | Service category labels |

### Type Scale (Tailwind)

```
text-xs   → 12px  captions, labels
text-sm   → 14px  nav links, meta
text-base → 16px  body copy
text-lg   → 18px  lead paragraphs
text-2xl  → 24px  card titles, H3
text-4xl  → 36px  H2 section headings
text-6xl  → 60px  Hero H1 (desktop)
```

---

## Folder Structure

```
a1ps-redesign/
├── app/
│   ├── layout.tsx            # Root layout, fonts, nav, footer
│   ├── page.tsx              # Homepage
│   ├── about/
│   │   └── page.tsx
│   ├── services/
│   │   ├── page.tsx          # Services overview
│   │   └── [slug]/
│   │       └── page.tsx      # Individual service pages
│   ├── gallery/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── blog/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── AboutStrip.tsx
│   │   ├── GalleryPreview.tsx
│   │   ├── TestimonialsBar.tsx
│   │   ├── CTABanner.tsx
│   │   └── FAQAccordion.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── ServiceCard.tsx
│       ├── GalleryLightbox.tsx
│       └── ContactForm.tsx
├── lib/
│   ├── services.ts           # Static service data
│   ├── metadata.ts           # Shared SEO helpers
│   └── utils.ts              # cn(), formatPhone(), etc.
├── public/
│   ├── images/               # Optimised project photos
│   └── icons/
├── styles/
│   └── globals.css           # Tailwind directives + CSS vars
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── .env.local.example
```

---

## Pages & Components to Build

### 1. `app/layout.tsx`
- Sticky transparent-on-scroll Navbar that turns white/blurred past 80px
- Logo: text "A1 Property Services" in Playfair + small leaf icon (SVG)
- Nav links: Home / About / Services / Gallery / Contact
- CTA button in nav: "Get a Free Quote" → `/contact`
- Footer: 3-col (Quick Links, Contact Info, Follow us), copyright bar

### 2. `app/page.tsx` — Homepage

Sections in order:
1. **Hero** — Full-viewport, dark overlay on a landscape photo. H1: "Cedar Falls Landscaping Built to Last." Subhead. Two CTAs: "Get a Free Quote" (primary) + "View Our Work" (ghost).
2. **Trust Bar** — 3 horizontal badges: Professional Landscaper / Licensed Contractor / Free Consultation
3. **Services Grid** — 3-col card grid, 9 services. Each card: icon emoji → service name → one-line description → "View Service" link
4. **Hardscape Spotlight** — 3 horizontal "feature cards" for Retaining Walls / Paver Patio / Water Features (hero sub-services)
5. **About Strip** — Split: left text (15 yrs experience, Cedar Falls), right photo
6. **Gallery Preview** — Masonry 3-col, 6 photos, "View Full Gallery" CTA
7. **CTA Banner** — Full-width green bg: "Ready to transform your outdoor space?" + button
8. **FAQ Accordion** — 3 FAQs from existing site
9. **Map + Contact Block** — Google Maps embed left, contact details right

### 3. `app/services/page.tsx`
Full services list. Each service has an anchor ID matching the old site's hash links for 301 redirect compatibility.

### 4. `app/services/[slug]/page.tsx`
Individual service pages. Slugs: `landscape-installation`, `lawn-care`, `preservation-restoration`, `tree-service`, `landscape-maintenance`, `ponds-water-features`, `hydroseeding`, `snow-removal`.

### 5. `app/gallery/page.tsx`
Masonry photo grid with lightbox. Filter tabs: All / Hardscape / Lawn / Water Features.

### 6. `app/contact/page.tsx`
- Contact form: Name, Email, Phone, Service type (dropdown), Message
- Submit via Next.js server action → email via Resend or Nodemailer
- Google Maps embed
- Address + phone + email listed

### 7. `app/about/page.tsx`
Company story, 15 years in Cedar Valley, team photo, values section.

---

## Services Data (`lib/services.ts`)

```ts
export const services = [
  {
    slug: 'landscape-installation',
    icon: '🌿',
    name: 'Landscape Installation',
    shortDesc: 'Custom designer landscapes from lush gardens to elegant walkways.',
    anchorId: 'installation',
  },
  {
    slug: 'lawn-care',
    icon: '🏡',
    name: 'Lawn Care & Mowing',
    shortDesc: 'Mowing, aeration, fertilization, and weed control year-round.',
    anchorId: 'lawncare',
  },
  {
    slug: 'preservation-restoration',
    icon: '🪴',
    name: 'Preservation & Restoration',
    shortDesc: 'Restore neglected or damaged landscapes with focused solutions.',
    anchorId: 'preservation',
  },
  {
    slug: 'tree-service',
    icon: '🌳',
    name: 'Tree Service',
    shortDesc: 'Pruning, removal, stump grinding, and disease management.',
    anchorId: 'treeservice',
  },
  {
    slug: 'landscape-maintenance',
    icon: '🛠️',
    name: 'Landscape Maintenance',
    shortDesc: 'Pruning, mulching, edging, and fertilization every season.',
    anchorId: 'maintenance',
  },
  {
    slug: 'ponds-water-features',
    icon: '💧',
    name: 'Ponds & Water Features',
    shortDesc: 'Custom ponds, waterfalls, and water gardens for your property.',
    anchorId: 'ponds',
  },
  {
    slug: 'hydroseeding',
    icon: '🌱',
    name: 'Hydroseeding',
    shortDesc: 'Fast, efficient lawn establishment with optimal germination.',
    anchorId: 'irrigation',
  },
  {
    slug: 'snow-removal',
    icon: '❄️',
    name: 'Snow Removal',
    shortDesc: 'Reliable clearing for driveways, walkways, and parking lots.',
    anchorId: 'snow',
  },
]
```

---

## SEO Requirements

Every page must have a unique `<title>` and `<meta description>` via Next.js `generateMetadata()`.

```ts
// lib/metadata.ts
export const siteConfig = {
  name: 'A1 Property Services',
  url: 'https://a1pslandscape.com',
  description: 'Trusted landscaping Cedar Falls services for retaining walls, patios, and outdoor living spaces.',
  phone: '+13194641889',
  address: '503 Bergstrom Blvd, Cedar Falls, IA 50613',
}
```

Page title pattern: `[Page Topic] | A1 Property Services — Cedar Falls, IA`

Include `LocalBusiness` JSON-LD schema on the homepage:
```json
{
  "@context": "https://schema.org",
  "@type": "LandscapeService",
  "name": "A1 Property Services",
  "telephone": "+13194641889",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "503 Bergstrom Blvd",
    "addressLocality": "Cedar Falls",
    "addressRegion": "IA",
    "postalCode": "50613"
  },
  "areaServed": ["Cedar Falls", "Waterloo", "Cedar Valley"],
  "url": "https://a1pslandscape.com"
}
```

---

## Redirects (next.config.js)

Preserve old WordPress URLs:
```js
async redirects() {
  return [
    { source: '/our-landscaping-company-cedar-falls', destination: '/about', permanent: true },
    { source: '/landscaping-services-in-cedar-falls', destination: '/services', permanent: true },
    { source: '/contact-landscaping-property-maintenance-cedar-falls', destination: '/contact', permanent: true },
    { source: '/retaining-wall-in-cedar-falls', destination: '/services/retaining-walls', permanent: true },
    { source: '/paver-patio-installation', destination: '/services/paver-patio', permanent: true },
    { source: '/cedar-falls-water-features', destination: '/services/ponds-water-features', permanent: true },
    { source: '/cedar-valley-landscaping-blog', destination: '/blog', permanent: true },
  ]
}
```

---

## Component Conventions

- All components are **TypeScript** functional components with explicit prop types
- Use `cn()` from `lib/utils.ts` (clsx + tailwind-merge) for conditional classes
- Images: always use `next/image` with `alt`, `width`, `height` or `fill` + `sizes`
- No inline styles — Tailwind utility classes only
- Server components by default; add `'use client'` only when needed (forms, lightbox, mobile menu)
- Framer Motion: use `motion.div` with `initial/animate/whileInView` — wrap in `<AnimatePresence>` where needed
- Forms: React Hook Form with Zod validation schema

---

## Environment Variables

```bash
# .env.local.example
RESEND_API_KEY=           # For contact form email delivery
NEXT_PUBLIC_GA_ID=        # Google Analytics 4
NEXT_PUBLIC_MAPS_KEY=     # Google Maps embed (optional — can use iframe embed)
```

---

## Agent Task Order

When building this project step by step, follow this order:

1. `npm init` → install deps → configure Tailwind + `globals.css`
2. `tailwind.config.js` — extend colors, fonts, add custom variants
3. `app/layout.tsx` — root layout with Navbar + Footer
4. `components/layout/Navbar.tsx` — responsive, scroll-aware
5. `components/layout/Footer.tsx`
6. `lib/services.ts` + `lib/utils.ts` + `lib/metadata.ts`
7. `components/ui/Button.tsx` — primary / ghost / outline variants
8. `app/page.tsx` — Homepage, all sections
9. `components/sections/` — Hero, ServicesGrid, AboutStrip, GalleryPreview, CTABanner, FAQAccordion
10. `app/services/page.tsx`
11. `app/services/[slug]/page.tsx`
12. `app/gallery/page.tsx` + `components/ui/GalleryLightbox.tsx`
13. `app/contact/page.tsx` + `components/ui/ContactForm.tsx` + server action
14. `app/about/page.tsx`
15. `app/blog/page.tsx` (static posts or Markdown-based)
16. SEO: `generateMetadata()` on all pages + JSON-LD on homepage
17. `next.config.js` — redirects
18. Performance audit: image optimization, `loading="lazy"`, `priority` on hero image

---

## Design Direction

**Mood:** Confident, earthy, premium-local. Not generic "green leaf" landscaping clichés.  
**Signature element:** Hero section uses a **full-bleed project photo** with a dark gradient overlay, and the H1 is set in large Playfair Display italic — the contrast between the serif elegance and the raw outdoor work is the visual identity of the site.  
**Section rhythm:** Alternate between `bg-white` and `bg-brand-cream` sections.  
**Buttons:** Rounded-full, not rounded-md. Primary = `bg-brand-green text-white`. Ghost = `border-2 border-white text-white`.  
**Cards:** `rounded-2xl`, subtle `shadow-md`, `hover:shadow-xl transition-shadow` — no heavy borders.  
**Spacing:** Generous vertical padding (`py-20` sections, `py-28` hero).  

---

## Quality Checklist Before Handoff

- [ ] Lighthouse score ≥ 90 on Performance, Accessibility, SEO
- [ ] All images have descriptive `alt` text
- [ ] Mobile nav works (hamburger → slide drawer)
- [ ] Contact form sends email and shows success/error state
- [ ] All old WordPress URLs redirect correctly (test with curl -I)
- [ ] `robots.txt` and `sitemap.xml` generated via Next.js
- [ ] No console errors or TypeScript errors
- [ ] Reduced motion respected (`@media (prefers-reduced-motion)`)
- [ ] Open Graph image set for homepage and key pages
