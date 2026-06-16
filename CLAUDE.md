# CLAUDE.md — Michael De Luna, AIA Architect
## Website Rebuild Brief

---

## Project Overview

This is an active Vite + React SPA — NOT Next.js. Do not suggest or implement Next.js patterns, App Router, SSR, or TypeScript. The codebase is plain `.jsx`.

The client is **Michael De Luna, AIA** — a licensed architect in New York City since 1994. 30+ years of practice. Services span architecture, zoning, DOB filing/expediting, and code compliance. Primary clients are interior designers, contractors, and developers navigating NYC municipal approvals.

The operator is **DBA Studio** (Beau Lawrence) — handling all web infrastructure, design, and brand execution.

Repo: `github.com/beaurlirl/mdeluna` — branch `main`

---

## Tech Stack (actual)

- **Framework:** Vite 5 + React 18 SPA
- **Routing:** React Router DOM v7 (BrowserRouter, client-side only)
- **Styling:** Tailwind CSS 3 (utility-first, no plugins)
- **Animation:** Framer Motion 11
- **Language:** Plain `.jsx` — no TypeScript
- **Build:** `vite build` → `/dist`
- **Dev:** `npm run dev`
- **Hosting:** Vercel (not yet deployed — needs `vercel.json` with SPA rewrites)
- **Domain:** mdeluna.com (GoDaddy DNS)
- **Email:** michael@mdeluna.com (Google Workspace)
- **No CMS, no SSR**

---

## File Structure (actual)

```
/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── CLAUDE.md
├── .gitignore
│
├── src/
│   ├── main.jsx
│   ├── App.jsx                  ← Router + lazy-loaded routes + Suspense
│   ├── index.css                ← @font-face Aileron, CSS vars, utilities
│   │
│   ├── components/
│   │   ├── Layout.jsx           ← Fixed nav + motion.main page transition + breadcrumbs + footer
│   │   ├── Navigation.jsx       ← Filing strip + wordmark + desktop dropdown + mobile menu
│   │   ├── Footer.jsx           ← 4-col grid, hidden on homepage
│   │   └── ProjectCard.jsx      ← Used in Projects.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectDetail.jsx
│   │   └── Contact.jsx
│   │
│   └── data/
│       ├── siteContent.js       ← siteInfo, contact, services[], consultingWork[], stats[], about{}
│       └── projects.js          ← projects[], categories[], helper functions
│
├── public/
│   ├── fonts/
│   │   └── Aileron-Regular.ttf  ← Only font file
│   ├── petrossian1.png          ← Homepage hero + Petrossian project cover
│   ├── petrossian2.png          ← Petrossian gallery
│   ├── pizza1.png               ← Shelter Pizza cover
│   ├── jewishacademy1.png       ← BK Heights Jewish Academy cover
│   ├── mikelucidcartoon.png     ← About page portrait
│   ├── favicon.svg
│   └── projects/                ← Only a README — no actual images yet
│
└── Neue Haas Grotesk copy/      ← UNTRACKED, unused — do not reference
```

When adding new components, follow the existing pattern — `.jsx` in `src/components/`, data in `src/data/`.

---

## Typography (actual)

- **One font:** Aileron Regular (400), loaded via `@font-face` in `index.css` from `/public/fonts/Aileron-Regular.ttf`
- `font-family` in `tailwind.config.js`: `['Aileron', 'system-ui', 'sans-serif']`
- No serif, no mono, no additional weights as separate files
- Bold via synthetic `font-bold` (700) for headlines
- Label/eyebrow text: `font-sans text-[0.5625rem] tracking-[0.14em] uppercase text-ink-4`
- Do NOT import from Google Fonts or any CDN

---

## Color Palette (actual — from tailwind.config.js)

```
paper:        #FFFFFF   ← page backgrounds
vellum:       #F7F7F7   ← form backgrounds
paper-2:      #F5F5F5   ← alternating section bg
paper-3:      #E8E8E8   ← borders, dividers
ink:          #111111   ← primary text, dark surfaces
ink-2:        #3A3A3A   ← body text
ink-3:        #666666   ← secondary text, nav links
ink-4:        #9E9E9E   ← labels, captions, metadata
red:          #C8102E   ← site accent (active nav, active service word, bullets, section labels)
red-deep:     #8A0E20   ← button hover
red-bright:   #E51938
red-wash:     #F2D8DC
approved:     #2F6B3A
pending:      #B07A1A
accent:       #2B3A2E   ← deep green (bullet dots on homepage headline)
accent-light: #E8EDE9
stone:        #C8C0B0
```

Use these Tailwind tokens (e.g. `text-red`, `bg-ink`, `text-ink-3`) — do not hardcode hex values except `#C1272D` on homepage CTAs (user-specified, keep as-is).

---

## Global Header — Persistent Across All Pages

The header is the defining visual element. It appears identically on every page. It is implemented in `Navigation.jsx` and rendered inside `Layout.jsx`.

### Header Structure

**Row 1 — Full-bleed wordmark + address**
```
Michael De Luna, AIA, Architect                    220 Congress Street, Suite 4F
```
- Aileron Bold (`font-bold`), very large — `clamp(2rem, 4.5vw, 4.5rem)`
- Full width: name left-aligned, address right-aligned
- White background (`bg-paper`), ink text (`text-ink`)
- Display only — not a nav element, not a link (name links to `/`)

**Row 2 — Service strip (active word rotates per route)**
```
Architecture   Code   Zoning   Filing
```
- Aileron Bold, same large size as Row 1 — visually one continuous typographic block
- All four words on one line, generous spacing between them
- Each word is a React Router `<Link>` to its section root
- Active word = `text-red` based on current route:
  - `/architecture/*` → **Architecture** red
  - `/code/*` → **Code** red
  - `/zoning/*` → **Zoning** red
  - `/filing/*` → **Filing** red
  - `/`, `/about`, `/contact` → all black, no active word
- Inactive words: `text-ink`, hover `text-red`
- Implement active detection via `useLocation()` + `pathname.startsWith()`

**Row 3 — Secondary nav bar**
- Thinner bar, `text-sm` (0.85rem), Aileron Regular
- Separated from Row 2 by `border-b border-paper-3`
- Left: `Home` · `About Us ▾` · `Portfolio ▾`
- Right: `Expediting ▾` · `Code/Approval Information ▾` · `Resources ▾` · `Blog`
- Far right: `Contact` button — `bg-ink text-paper px-4 py-1`
- Dropdowns on hover — see Dropdown Menus section below
- Close delay: 220ms (already implemented in Navigation.jsx for Services dropdown — match this pattern)

**Row 4 — Breadcrumb (interior pages only)**
- Rendered in `Layout.jsx` below the header, above page content
- Color: `text-red`, small, Aileron Regular
- Format: `Category › Sub-page name`
- Not shown on `/` home page
- Example: `Architecture › Residential Projects`

---

## Routing (actual + expanded)

Current routes in `App.jsx` (lazy-loaded):
```
/           → Home.jsx
/services   → Services.jsx
/about      → About.jsx
/projects   → Projects.jsx
/projects/:id → ProjectDetail.jsx
/contact    → Contact.jsx
```

**Expand to the following full route structure.** Add new routes in `App.jsx` following the existing `React.lazy` + `Suspense` pattern:

```
/                              → Home.jsx (no scroll, full viewport)

/architecture                  → pages/architecture/Index.jsx
/architecture/residential      → pages/architecture/Residential.jsx
/architecture/commercial       → pages/architecture/Commercial.jsx
/architecture/hospitality      → pages/architecture/Hospitality.jsx
/architecture/landmark         → pages/architecture/Landmark.jsx
/architecture/institutional    → pages/architecture/Institutional.jsx

/code                          → pages/code/Index.jsx
/code/apartment-approvals      → pages/code/ApartmentApprovals.jsx
/code/equipment-use-permits    → pages/code/EquipmentUsePermits.jsx
/code/certificates-occupancy   → pages/code/CertificatesOccupancy.jsx
/code/restaurant-approvals     → pages/code/RestaurantApprovals.jsx
/code/special-inspections      → pages/code/SpecialInspections.jsx
/code/faq                      → pages/code/FAQ.jsx

/zoning                        → pages/zoning/Index.jsx
/zoning/analysis               → pages/zoning/Analysis.jsx
/zoning/variances              → pages/zoning/Variances.jsx
/zoning/landmarks              → pages/zoning/Landmarks.jsx

/filing                        → pages/filing/Index.jsx
/filing/dob                    → pages/filing/DOB.jsx
/filing/lpc                    → pages/filing/LPC.jsx
/filing/certificates           → pages/filing/Certificates.jsx
/filing/code-zoning-consulting → pages/filing/CodeZoningConsulting.jsx

/about                         → About.jsx (existing)
/contact                       → Contact.jsx (existing)
/resources                     → pages/Resources.jsx
/blog                          → pages/Blog.jsx (placeholder)
```

The existing `/services` and `/projects` routes stay as-is during transition — do not remove them until the architecture sub-pages are fully built.

---

## Dropdown Menus

Implement in `Navigation.jsx` following the existing Services dropdown pattern (hover open, 220ms close delay).

### About Us ▾
- About → `/about`
- Contact → `/contact`

### Portfolio ▾
- Residential → `/architecture/residential`
- Commercial → `/architecture/commercial`
- Hospitality → `/architecture/hospitality`
- Landmark → `/architecture/landmark`
- Institutional → `/architecture/institutional`

### Expediting ▾
- NYC DOB Filings → `/filing/dob`
- LPC Approvals → `/filing/lpc`
- Certificates of Occupancy → `/filing/certificates`
- Code and Zoning Consulting → `/filing/code-zoning-consulting`

### Code/Approval Information ▾
- Apartment Approvals → `/code/apartment-approvals`
- Equipment Use Permits → `/code/equipment-use-permits`
- Certificates of Occupancy → `/code/certificates-occupancy`
- Restaurant Approvals → `/code/restaurant-approvals`
- Special Inspections → `/code/special-inspections`
- Frequently Asked Questions → `/code/faq`

### Resources ▾
- Links & References → `/resources`

---

## Page Specs

### `/` — Home (Home.jsx)

**No scroll on desktop.** `lg:h-[calc(100vh-6.75rem)] lg:overflow-hidden` — already implemented, keep it.

Current layout is centered column with blurred Petrossian background. **Rebuild as split layout:**
- Left half: headline + subhead + CTAs, vertically centered, left-aligned
- Right half: `petrossian1.png`, full viewport height, `object-fit: cover`, no blur, no overlay
- Remove the `scale-110 blur-sm bg-paper/60` treatment — image should be crisp and full-bleed on the right

Hero headline:
```
Architecture.
Zoning.
Expediting.
```
`font-bold`, very large. All `text-ink`. Keep existing accent bullet dots (`text-accent`) between words if present.

Hero subhead: keep existing copy from `siteContent.js`.

CTAs: Keep `#C1272D` filled + outlined — user-specified, do not change.

Borough strip bottom left: `MANHATTAN · BROOKLYN · QUEENS · BRONX · STATEN IS.` — `text-ink-3`, small, wide tracking.

Image caption bottom right: `PETROSSIAN BOUTIQUE · MANHATTAN` — `text-ink-4`, smallest size.

---

### Architecture Sub-pages (`/architecture/*`)

All follow same layout pattern:

- Global header: **Architecture** highlighted `text-red` in Row 2
- Breadcrumb: `Architecture › [Page Name]`
- Section title bar: full-width `bg-[#4A4A4A] text-paper font-bold` — e.g. `Residential Projects`
- Two-column content: project name list left (1/3), project photography right (2/3)
- Project names are plain text; linked entries get `text-red underline`

**Residential project list:**
- Bank Street Loft
- Sutton Place Residence
- Lispenard Penthouse
- East 64th St Townhouse
- Fifth Avenue Central Park
- Park Avenue
- Upper East Side Apartment *(linked → `/projects/upper-east-side`)*

**Commercial, Hospitality, Landmark, Institutional:** Pull project names from `projects.js`. Add new entries to `projects.js` as needed — do not hardcode in page components.

---

### Code Sub-pages (`/code/*`)

All follow same layout:

- Global header: **Code** highlighted `text-red`
- Breadcrumb: `Code/Approval Information › [Page Name]`
- Section title bar: `bg-[#4A4A4A] text-paper font-bold`
- Content: informational article text, `text-ink-2`, `leading-relaxed`, generous padding
- Pull real content from the existing Wix site where available. Do NOT write placeholder text.
- Include NYC code references verbatim (e.g. `27-105.4 and 1 RCNY 101-14 EXEMPTIONS FROM PERMIT REQUIREMENT`)

---

### Filing Sub-pages (`/filing/*`)

- Global header: **Filing** highlighted `text-red`
- Breadcrumb: `Expediting & Filing › [Page Name]`
- Same section title bar pattern
- Content pulls from `services[]` and `consultingWork[]` in `siteContent.js`

---

### Zoning Sub-pages (`/zoning/*`)

- Global header: **Zoning** highlighted `text-red`
- Breadcrumb: `Zoning › [Page Name]`
- Same section title bar pattern
- Content from `siteContent.js` — add zoning entries if not present

---

### `/contact` — Contact (Contact.jsx)

Keep existing layout (contact info left, Formspree form right).

**Fix Formspree:** Replace `'YOUR_FORM_ID'` with actual endpoint — ask user for the Formspree ID before wiring up.

**Add animated CTA button** (`StartProjectCTA.jsx`) — implement with Framer Motion:

A single button labeled `Start your project`. On click it animates out (slides up + fades, like it's being "submitted upward") then navigates to `/contact` via React Router.

Animation feel: smooth, locked-in, sturdy — not bouncy, not flashy. Think a heavy door closing with precision. Parameters:
- On click: button translates `y: -8` + `opacity: 0` over `200ms`, ease `[0.4, 0, 0.2, 1]`
- Navigation fires after animation completes (`onAnimationComplete` → `navigate('/contact')`)
- No step-by-step reveal — single button, single motion, single destination

Use `motion.button` with `useNavigate` from React Router. Keep the button style consistent with the site's existing CTA treatment (`bg-ink text-paper` or outlined, flat, no rounded corners).

---

### `/about` — About (About.jsx)

**Replace placeholder bio copy** in `siteContent.js about{}` with real content:

```js
about: {
  headline: "Thirty Years of Getting Projects Built",
  intro: "Michael De Luna, AIA has practiced architecture in New York City since 1994.",
  paragraphs: [
    "Michael De Luna, AIA founded his practice in 1994 after eight years at Beyer Blinder Belle Architects, Rothzied Kasierman Thomson, and Bee Architects — firms known for rigorous work on complex residential and institutional projects in New York City.",
    "Over three decades, the practice has grown into a trusted resource for interior designers, developers, and contractors who need an experienced architect to shepherd their projects through New York City's regulatory environment.",
    "The firm is licensed in New York State (Lic. 024891), and Michael holds membership in the American Institute of Architects (AIA) and the National Council of Architectural Registration Boards (NCARB)."
  ],
  credentials: [
    "AIA Member",
    "NCARB Certified",
    "NYS Licensed Architect — Lic. 024891",
    "City College of New York, B.Arch",
    "Practice established 1994"
  ]
}
```

Keep existing 2-col layout (bio left, portrait right). Keep `mikelucidcartoon.png` with sepia filter.

---

## Animated Page Transitions (existing — do not change)

`Layout.jsx` wraps all pages in:
```jsx
<motion.main
  key={location.pathname}
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.32, ease: [0.2, 0.6, 0.2, 1] }}
>
```
`window.scrollTo(0, 0)` fires on every route change. Keep this behavior on all new pages.

---

## Data Files

### `src/data/siteContent.js`
- `siteInfo` — name, title, tagline
- `contact` — address: 220 Congress St Suite 4F, Brooklyn NY 11201 · phone: 917.405.7186 · cell: 929.761.6640 · email: michael@mdeluna.com
- `services[]` — 5 expediting categories with `details[]` arrays (real NYC DOB content — do not overwrite)
- `consultingWork[]` — 3 consulting categories with real project address lists
- `stats[]` — 30+ years, 1800+ projects, 5 boroughs, est. 1994
- `about{}` — **needs real copy** (see About section above)

### `src/data/projects.js`
Current 7 projects:
- ✅ Petrossian Boutique — images exist (`petrossian1.png`, `petrossian2.png`)
- ✅ Shelter Pizza — image exists (`pizza1.png`)
- ✅ BK Heights Jewish Academy — image exists (`jewishacademy1.png`)
- ❌ West 186th St — image missing
- ❌ East 81st St — image missing
- ❌ Grey Bar & Restaurant — image missing
- ❌ Ali Baba's Terrace — image missing

For missing images: use a gray placeholder div with the project name, do NOT show broken img tags.

---

## Known Issues — Fix These

1. **Missing project images** — `/public/projects/` is empty. Show named placeholder blocks for missing images, not broken img elements.
2. **Formspree not wired** — `Contact.jsx` has `'YOUR_FORM_ID'` placeholder. Ask user for real ID before replacing.
3. **No `vercel.json`** — React Router requires SPA rewrites for Vercel deployment. Create `vercel.json` in root:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
4. **About bio is placeholder** — update `siteContent.js about{}` with real copy (see above).
5. **Unused files** — `mdnewheader.png` in `/public` and `Neue Haas Grotesk copy/` in root are unused. Do not reference them. Safe to delete.
6. **`public/projects/` README** — placeholder directory, images needed from client.

---

## Design Principles

1. **Global header is sacred.** Same structure on every page. Only the active red service word changes.
2. **The two-row wordmark is the brand.** Row 1: `Michael De Luna, AIA, Architect` + address. Row 2: `Architecture Code Zoning Filing`. No separate logomark.
3. **Red (`text-red`, `#C8102E`) = active state only** in the service strip and breadcrumbs. CTAs use `#C1272D` (user-specified, keep as-is).
4. **Section title bars** — full-width `bg-[#4A4A4A] text-paper font-bold` on all portfolio and code sub-pages.
5. **Project lists left, photography right** — all portfolio pages.
6. **No scroll on home** — `lg:overflow-hidden` on the hero container.
7. **No gradients, no shadows, no rounded corners** — flat, precise, architectural.
8. **Mobile** — header collapses to hamburger. Service strip stacks. Project lists stack above photography.
9. **Do not add Co-Authored-By: Claude to commits.**

---

## Brand Voice

- **Direct.** No marketing fluff. Michael doesn't sell — he informs.
- **Institutional.** 30 years of practice. Copy should feel earned, not aspirational.
- **Precise.** Specific services, specific credentials, specific boroughs. No vague language.
- **Not cold.** Warmth in the work — restaurants, boutiques, people's homes.

---

## Reference Sites

- **yazdanistudio.com** — full-viewport hero, type-over-image, restraint
- **vaulk.com** — numbered structure, technical authority, institutional tone
- **333southwabash.com** — total commitment to single visual identity
- **aircenter.space** — communication through omission, negative space

---

*Prepared by DBA Studio for Michael De Luna, AIA Architect — June 2026*
