# CLAUDE.md — Michael De Luna, AIA Architect
## Website Rebuild Brief

---

## Project Overview

Rebuild mdeluna.com as a Next.js site hosted on Vercel. The current site is a Wix build and will be fully replaced. All existing content (services, about, project history, contact) is accurate and should be preserved but redesigned. Claude Code should read the existing codebase for structure and content references.

The client is **Michael De Luna, AIA** — a licensed architect in New York City since 1994. 30+ years of practice. Services span architecture, zoning, DOB filing/expediting, and code compliance. Primary clients are interior designers, contractors, and developers navigating NYC municipal approvals.

The operator is **DBA Studio** (Beau Lawrence) — handling all web infrastructure, design, and brand execution.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **CMS:** None required — static content, hardcoded
- **Hosting:** Vercel
- **Domain:** mdeluna.com (GoDaddy DNS, Vercel hosting)
- **Email:** michael@mdeluna.com (Google Workspace)

---

## Typography

**Primary font family: Aileron**
All type is set in Aileron. No serifs anywhere.

Font file is local — do not import from Google Fonts or CDN. Referenced from `/public/fonts/Aileron-Regular.ttf`.

Only the Regular (400) weight is loaded. Weight distinctions from the original NHG system are approximated with size, tracking, and browser-synthesized bold (`font-weight: 700`) rather than separate font files:
- **Bold (synthetic 700)** — wordmark, hero headlines
- **Regular, larger size** — section headers, nav
- **Regular** — body copy, descriptions
- **Regular, small size + wide tracking + uppercase** — labels, credentials, fine print

Wordmark treatment:
```
MICHAEL DE LUNA
AIA · ARCHITECT · EST. 1994
```
- Line 1: NHG 75 Bold, all caps, tracking -10
- Line 2: NHG 45 Light, all caps, tracking +200, smaller size

---

## Color Palette

```
--color-black:     #0A0A0A   /* near black — primary text, nav bg */
--color-white:     #F5F2EC   /* warm off-white — backgrounds */
--color-stone:     #C8C0B0   /* warm mid gray — rules, dividers, secondary text */
--color-ink:       #1C1C1C   /* deep charcoal — body text on light bg */
--color-accent:    #2B3A2E   /* deep architectural green — CTAs, active states */
--color-accent-lt: #E8EDE9   /* light green tint — hover states, backgrounds */
```

No red. No blue. The palette should feel like a Zumthor building — warm, precise, material.

---

## Site Structure

```
/             → Home (hero only, no scroll)
/services     → Full services page
/about        → About Michael
/projects     → Selected projects
/contact      → Contact form
```

---

## Page-by-Page Specs

### `/` — Home

**This page does not scroll.** It is a full-viewport hero. No footer visible on load. Everything fits within 100vh.

Layout:
- Top: Header/nav bar — fixed, full width
- Center: Hero content — left aligned, vertically centered
- Right: Hero image — full height, right half of viewport (CSS grid or absolute)
- Bottom left: Borough strip — `MANHATTAN · BROOKLYN · QUEENS · BRONX · STATEN IS.`

Header bar contains:
- Left: Wordmark (`MICHAEL DE LUNA` / credential line)
- Right: Nav links — `Services` · `About` · `Contact`
- Top credential ticker (optional, subtle): `EST. 1994 · AIA · NCARB · NYS LIC. 024891`

Hero copy:
```
Architecture.
Zoning.
Expediting.
```
Headline stack, NHG 75 Bold, large. No color variation — all `--color-black`. Remove the red accent from the current site entirely.

Subhead (NHG 55 Roman, italic optional):
```
Michael De Luna, AIA has guided DOB filings, code compliance,
and architectural design across New York City since 1994 —
from brownstone renovations to ground-up commercial buildings.
```

CTAs:
- `View Services →` (filled, --color-accent)
- `Start a Project →` (outlined, --color-black)

Hero image: Use existing Petrossian Boutique photo. Position right side, full height, object-fit cover. Caption bottom right: `PETROSSIAN BOUTIQUE · MANHATTAN` in NHG 45 Light, small, `--color-stone`.

---

### `/services` — Services

Four service categories. Each gets a full section with title, description, and a list of specific offerings.

---

#### 1. Architecture

**Section header:** ARCHITECTURE
**Description:**
From programming through construction observation, Michael De Luna, AIA delivers complete architectural services for residential, commercial, and institutional clients across New York City. The firm maintains a diversified practice with particular depth in small-scale and landmark projects.

**Services include:**
- Schematic design and design development
- Construction documents
- Construction administration and observation
- Interior architecture
- Residential renovations and combinations
- Commercial and restaurant build-outs
- Landmark restoration
- Institutional and school renovations

---

#### 2. Zoning

**Section header:** ZONING
**Description:**
New York City's zoning code is among the most complex in the world. Michael De Luna provides zoning analysis, variance applications, and compliance strategy for projects across all five boroughs — from pre-purchase due diligence to full land use applications.

**Services include:**
- Zoning lot analysis and FAR calculations
- Use and bulk compliance review
- Special permit applications
- Variance applications (BSA)
- Pre-purchase and pre-lease zoning review
- Zoning text interpretation and code research
- Landmark and historic district review (LPC)

---

#### 3. Expediting & DOB Filing

**Section header:** EXPEDITING
**Description:**
Navigating the New York City Department of Buildings requires expertise, relationships, and persistence. Michael De Luna manages the full filing process — from initial application through approval — keeping projects moving and clients informed.

**Services include:**
- NYC DOB plan examination and filing
- Alt-1 and Alt-2 applications
- New building applications
- Certificate of Occupancy filings
- Building Management approval coordination
- NYC LPC filing and landmark approval
- ADA compliance documentation
- Construction code compliance review
- Sign-off coordination and inspection scheduling

---

#### 4. Code Compliance

**Section header:** CODE COMPLIANCE
**Description:**
Code compliance is not a checklist — it is a discipline. Michael De Luna applies 30 years of code knowledge to identify issues early, resolve conflicts proactively, and produce documentation that passes examination the first time.

**Services include:**
- NYC Building Code analysis
- Energy code compliance (NYCECC)
- Accessibility (ADA / Local Law 58)
- Egress and life safety review
- Construction document peer review
- Existing conditions assessment
- Compliance reporting for building management

---

### `/about` — About

**Bio copy:**

Michael De Luna, AIA founded his practice in 1994 after eight years at Beyer Blinder Belle Architects, Rothzied Kasierman Thomson, and Bee Architects — firms known for rigorous work on complex residential and institutional projects in New York City.

Over three decades, the practice has grown into a trusted resource for interior designers, developers, and contractors who need an experienced architect to shepherd their projects through New York City's regulatory environment. The firm is licensed in New York State (Lic. 024891), and Michael holds membership in the American Institute of Architects (AIA) and the National Council of Architectural Registration Boards (NCARB).

Notable project experience includes:
- Petrossian Boutique, Manhattan
- Shelter Pizza, New York
- Restaurant and retail approvals citywide
- Apartment renovations and combinations, Manhattan and Brooklyn
- Landmark and historic district work
- School and institutional renovations

**Credentials block:**
```
AIA Member
NCARB Certified
NYS Licensed Architect — Lic. 024891
City College of New York, B.Arch 1989
Practice established 1994
```

---

### `/contact` — Contact

Simple, direct. No form required — just contact info displayed cleanly.

```
Michael De Luna, AIA, Architect
118 E 28th Street, Room 305
New York, NY 10016

T  212.696.4755
M  917.405.7186
E  michael@mdeluna.com
W  mdeluna.com
```

Optional: Simple mailto contact form (name, email, message, project type dropdown).

---

## Reference Sites & Design Directives

These four sites were selected as directional references. Claude Code should internalize the principles extracted from each — not copy them, but build from them.

---

### 1. yazdanistudio.com — *Restraint and scale*

**What it does:** Full-viewport locked homepage. No traditional scroll on load. Large architectural photography fills the screen. Type is small, precise, and floating against the image — it does not compete with the photography. Studio name is understated. Transitions feel considered, not decorative.

**Directives for mdeluna.com:**
- The homepage is a single viewport. No scroll. This is non-negotiable.
- The Petrossian image should fill the right half of the screen at full viewport height — not a contained box, not rounded, not shadowed. Edge to edge on its side.
- The wordmark and nav should feel like they're resting on top of the image, not contained in a separate header box. Keep nav background transparent or near-transparent on the hero.
- Type scale contrast is the design: the headline (`Architecture. Zoning. Expediting.`) is large; everything else is small. Nothing in between.
- White space on the left side of the hero is intentional — do not fill it.

---

### 2. vaulk.com — *Technical authority and numbered structure*

**What it does:** Dark background, white type, opens with a loading sequence. Headlines are tight, uppercase, wide-tracked. Services and specs are presented with numbered prefixes (`001`, `002`, `003`). The tone is institutional and precise — reads like a technical document, not a brochure. Copy is short and definitive.

**Directives for mdeluna.com:**
- On the Services page, present the four service categories with numbered prefixes: `01 — ARCHITECTURE`, `02 — ZONING`, `03 — EXPEDITING`, `04 — CODE COMPLIANCE`
- Section labels should be uppercase, wide-tracked, small — `NHG 45 Light, letter-spacing: 0.2em`
- Service item lists should feel like specs, not bullets. Use a thin rule or em dash separator instead of bullet points.
- Copy should be short and declarative. No sentences longer than two clauses. No filler.
- Consider a subtle page-load transition on the homepage — even a simple fade-in over 400ms signals intentionality.

---

### 3. 333southwabash.com — *Total commitment to a single visual identity*

**What it does:** The entire brand is built around one thing — the red façade of the building. Every design decision serves that one visual. Navigation disappears until needed. Photography is full-bleed and cinematic. Nothing dilutes the core identity.

**Directives for mdeluna.com:**
- Pick one thing and commit to it. For Michael, that thing is the Petrossian Boutique image — warm brick, institutional weight, real NYC project. That image should anchor the homepage completely.
- The `--color-accent` deep green should appear sparingly — only on the primary CTA button and active nav state. Everywhere else is black and off-white.
- No decorative elements, no icons, no illustration. The credential line (`AIA · NCARB · EST. 1994`) is the only graphic accent.
- The site should feel like it was designed around the photography, not the other way around.

---

### 4. aircenter.space — *Communication through omission*

**What it does:** A minimal site in the architecture/space sector. Communicates seriousness through what it leaves out. Precise grid, deep negative space, type that earns its placement.

**Directives for mdeluna.com:**
- Every element on the page must justify its presence. If it doesn't add information or create necessary structure, remove it.
- The footer on interior pages should be minimal: wordmark left, `michael@mdeluna.com` center or right, license number small. Nothing else.
- Padding and margin should be generous — at minimum `80px` vertical padding on desktop sections, `48px` on mobile.
- The nav should have three links maximum. `Services · About · Contact`. No dropdown, no hamburger on desktop.
- Do not add a hero image to interior pages (Services, About, Contact). Let the type and grid carry them.

---



1. **No scroll on home.** The homepage is a single viewport. Period.
2. **No red.** Remove all instances of the current crimson accent. Use `--color-accent` (deep green) or `--color-black` instead.
3. **No italic body copy** unless used sparingly for the hero subhead only.
4. **Generous whitespace.** Let the typography breathe. Don't fill space.
5. **Photography does the work.** The Petrossian image is strong — let it be large.
6. **No gradients, no shadows, no rounded corners.** Flat, precise, architectural.
7. **Mobile responsive** — services and about pages stack cleanly on mobile. Home hero reflows with image above copy on small screens.
8. **Performance** — no unnecessary JS. Static where possible. Image optimization via Next.js `<Image>`.

---

## Logo / Wordmark

The wordmark is typographic only — no icon or symbol. Rendered in code using Aileron, not an image file.

```
MICHAEL DE LUNA
AIA · ARCHITECT · EST. 1994
```

On dark backgrounds: `--color-white`
On light backgrounds: `--color-black`

For favicon: `MDL` monogram, Aileron bold (synthetic), black on white, square crop.

---

## File Structure

```
/app
  /page.tsx              → Home (hero)
  /services/page.tsx     → Services
  /about/page.tsx        → About
  /projects/page.tsx     → Projects (placeholder, future)
  /contact/page.tsx      → Contact
  /layout.tsx            → Root layout, fonts, nav
  /globals.css           → CSS variables, base styles

/components
  /Nav.tsx               → Header/nav bar
  /Wordmark.tsx          → Logo lockup component
  /HeroSection.tsx       → Home hero
  /ServiceBlock.tsx      → Reusable service section
  /Footer.tsx            → Minimal footer

/public
  /fonts/                → Aileron local font file
  /images/               → Project photography

/CLAUDE.md               → This file
```

---

## Content Notes for Claude Code

- All services content above is accurate and approved. Use it verbatim.
- Do not invent project names, credentials, or contact details.
- The address 220 Congress Street, Suite 4F, Brooklyn, NY 11201 is the current office — confirmed correct, keep as-is.
- NYS License number is 024891 — verify this is displayed accurately wherever credentials appear.
- Do not add placeholder lorem ipsum anywhere. If content is missing, note it with a `<!-- TODO -->` comment.

---

## Brand Voice

- **Direct.** No marketing fluff. Michael doesn't sell — he informs.
- **Institutional.** 30 years of practice. The copy should feel earned, not aspirational.
- **Precise.** Specific services, specific credentials, specific boroughs. No vague language.
- **Not cold.** There's warmth in the work — restaurants, boutiques, people's homes. Let that show.

---

*Prepared by DBA Studio for Michael De Luna, AIA Architect — June 2026*
