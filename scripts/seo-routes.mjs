// Per-route SEO copy used by scripts/prerender.mjs and mirrored by the in-app <SEO> tags.
import { projects } from '../src/data/projects.js'

export const SITE_URL = 'https://mdeluna.com'

const core = [
  {
    path: '/',
    title: 'NYC Architect & DOB Expediter | Michael De Luna, AIA',
    description: 'Licensed NYC architect and DOB expediter since 1994. Building permits, zoning analysis, code compliance, LPC approvals and certificates of occupancy in all five boroughs. Call 917.405.7186.',
    h1: 'NYC Architect and DOB Expediter',
    body: 'Michael De Luna, AIA is a licensed New York architect (Lic. 024891) who has designed, filed and expedited projects with the NYC Department of Buildings since 1994. Services: architecture, zoning analysis, code compliance, DOB filings, Landmarks Preservation Commission approvals, certificates of occupancy and equipment use permits. Brooklyn office at 220 Congress Street, Suite 4F. Call 917.405.7186 or email michael@mdeluna.com.',
  },
  {
    path: '/filing',
    title: 'NYC DOB Filing & Expediting Services',
    description: 'NYC DOB filing and expediting by a licensed architect: new building and alteration applications, work permits, LPC approvals, certificates of occupancy, TCO renewals, fire and DOT permits.',
    h1: 'NYC DOB Filing and Expediting',
    body: 'Approvals and Building Department filings, work permits, Landmarks Preservation Commission certificates, certificates of occupancy, fire department approvals, OTCR and DOT permits. Filed by a licensed NYC architect since 1994.',
  },
  {
    path: '/zoning',
    title: 'NYC Zoning Analysis, Variances & Land Use',
    description: 'NYC zoning analysis by a licensed architect: FAR and bulk calculations, BSA variances, special permits, zoning lot mergers, landmark district compliance and legalization of existing conditions.',
    h1: 'NYC Zoning Analysis',
    body: 'Zoning feasibility, FAR and bulk calculations, non-complying bulk analysis, continuation of non-conforming use, zoning compliance for certificates of occupancy and legalization of existing conditions in New York City.',
  },
  {
    path: '/code',
    title: 'NYC Building Code Compliance & Approvals',
    description: 'NYC Building Code compliance help: apartment approvals, equipment use permits, certificates of occupancy, restaurant approvals and special inspections, handled by a licensed NYC architect.',
    h1: 'NYC Building Code Compliance',
    body: 'Apartment approvals, equipment use permits, certificates of occupancy, restaurant approvals and special inspections under the NYC Building Code, explained and filed by Michael De Luna, AIA.',
  },
  {
    path: '/architecture',
    title: 'NYC Architecture: Residential, Restaurant & Commercial Design',
    description: 'NYC architect for residential, restaurant, hospitality, commercial and institutional projects. Design through DOB approval and construction by Michael De Luna, AIA, since 1994.',
    h1: 'Architecture in New York City',
    body: 'Residential, commercial, hospitality and institutional architecture in New York City, from concept through DOB approval and construction administration.',
  },
  {
    path: '/projects',
    title: 'NYC Architecture Portfolio: Restaurants, Residences & More',
    description: 'Selected work by NYC architect Michael De Luna, AIA: Petrossian Boutique, Shelter Pizza, Grey Bar & Restaurant, BK Heights Jewish Academy and more.',
    h1: 'Selected Projects',
    body: 'Restaurants, boutiques, residences and institutional projects designed and permitted across New York City.',
  },
  {
    path: '/about',
    title: 'About Michael De Luna, AIA | NYC Licensed Architect',
    description: 'Michael De Luna, AIA: licensed New York State architect (Lic. 024891), AIA member and NYC Special Inspector Agency (SIA 008232). Practicing in New York City since 1994.',
    h1: 'About Michael De Luna, AIA',
    body: 'Licensed architect in New York State since 1994, AIA member, Special Inspector Agency 008232, based in Brooklyn.',
  },
  {
    path: '/contact',
    title: 'Contact a NYC Architect & Expediter | Free Project Review',
    description: 'Need a permit, filing or architect in NYC? Call Michael De Luna, AIA at 917.405.7186 or email michael@mdeluna.com. 220 Congress Street, Suite 4F, Brooklyn.',
    h1: 'Start Your Project',
    body: 'Call 917.405.7186, cell 929.761.6640, or email michael@mdeluna.com. Office: 220 Congress Street, Suite 4F, Brooklyn, NY 11201.',
  },
  {
    path: '/resources',
    title: 'NYC DOB Forms, DOB NOW & Code Resources',
    description: 'Quick links to NYC Department of Buildings forms, DOB NOW, BIS, code bulletins, violation guidance, zoning maps and landmarks applications.',
    h1: 'Resources and References',
    body: 'Official NYC links for DOB forms and applications, DOB NOW and BIS, construction codes and bulletins, violations and stop work orders, zoning (ZoLa), the Landmarks Preservation Commission and the Board of Standards and Appeals.',
  },
]

const projectRoutes = projects.map((p) => ({
  path: `/projects/${p.id}`,
  title: `${p.title} | NYC Architecture Project`,
  description: `${p.title}: ${p.description} ${p.location}. Architecture by Michael De Luna, AIA.`,
  h1: p.title,
  body: p.description,
}))

export const routes = [...core, ...projectRoutes]
