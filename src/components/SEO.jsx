import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://mdeluna.com'
const DEFAULT_OG_IMAGE = `${SITE_URL}/petrossian1.jpg`

const defaults = {
  title: 'NYC Architect & DOB Expediter | Michael De Luna, AIA',
  description: 'Licensed NYC architect and DOB expediter since 1994. Building permits, zoning analysis, code compliance, LPC approvals and certificates of occupancy in all five boroughs. Call 917.405.7186.',
  type: 'website',
}

export default function SEO({ 
  title, 
  description = defaults.description, 
  ogImage = DEFAULT_OG_IMAGE,
  ogType = defaults.type,
  path = '',
}) {
  const fullTitle = title 
    ? `${title} | Michael De Luna, AIA` 
    : defaults.title
  const canonicalUrl = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Michael De Luna, AIA Architect" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
