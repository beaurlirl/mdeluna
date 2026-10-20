// Post-build: writes a route-specific index.html per route so crawlers and link
// previews (email clients, Slack, iMessage) see correct title, description,
// canonical and visible text without executing JS. Also regenerates sitemap.xml.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { routes, SITE_URL } from './seo-routes.mjs'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const dist = new URL('../dist/', import.meta.url)
const template = await readFile(new URL('index.html', dist), 'utf8')
const today = new Date().toISOString().slice(0, 10)

const setTag = (html, re, replacement) => {
  if (!re.test(html)) throw new Error(`prerender: template missing ${re}`)
  return html.replace(re, replacement)
}

for (const r of routes) {
  const url = `${SITE_URL}${r.path === '/' ? '/' : r.path}`
  let html = template
  html = setTag(html, /<title>.*?<\/title>/, `<title>${esc(r.title)}</title>`)
  html = setTag(html, /(<meta name="description" content=")[^"]*"/, `$1${esc(r.description)}"`)
  html = setTag(html, /(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)
  html = setTag(html, /(<meta property="og:title" content=")[^"]*"/, `$1${esc(r.title)}"`)
  html = setTag(html, /(<meta property="og:description" content=")[^"]*"/, `$1${esc(r.description)}"`)
  html = setTag(html, /(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
  html = setTag(html, /(<meta name="twitter:title" content=")[^"]*"/, `$1${esc(r.title)}"`)
  html = setTag(html, /(<meta name="twitter:description" content=")[^"]*"/, `$1${esc(r.description)}"`)
  html = setTag(
    html,
    /<div id="root">[\s\S]*?<\/main><\/div>/,
    `<div id="root"><main><h1>${esc(r.h1)}</h1><p>${esc(r.body)}</p></main></div>`,
  )
  if (r.path === '/') {
    await writeFile(new URL('index.html', dist), html)
  } else {
    const dir = new URL(`.${r.path}/`, dist)
    await mkdir(dir, { recursive: true })
    await writeFile(new URL('index.html', dir), html)
  }
}

const prio = (p) => (p === '/' ? '1.0' : p.split('/').length > 2 ? '0.6' : p === '/contact' ? '0.9' : '0.8')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE_URL}${r.path}</loc><lastmod>${today}</lastmod><priority>${prio(r.path)}</priority></url>`).join('\n')}
</urlset>
`
await writeFile(new URL('sitemap.xml', dist), sitemap)
console.log(`prerender: ${routes.length} routes + sitemap`)
