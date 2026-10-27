import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { resourceSections } from '../data/resources'
import SEO from '../components/SEO'
import { scrollToElement } from '../lib/smoothScroll'

const ease = [0.2, 0.6, 0.2, 1]

function Resources() {
  const { hash } = useLocation()

  // Router doesn't scroll to #anchors on its own; wait out the page transition first
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => {
      const el = document.getElementById(hash.slice(1))
      if (el) scrollToElement(el)
    }, 450)
    return () => clearTimeout(t)
  }, [hash])

  return (
    <div>
      <SEO
        title="NYC DOB Forms & Resources"
        description="Quick links to NYC Department of Buildings forms, DOB NOW, BIS, code bulletins, violation guidance, zoning maps and landmarks applications, curated by Michael De Luna, AIA."
        path="/resources"
      />

      <div className="bg-[#4A4A4A] text-paper">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-4">
          <h1 className="font-bold text-xl lg:text-2xl">Resources &amp; References</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-10 lg:py-16">
        <p className="font-sans text-base lg:text-lg text-ink-2 max-w-2xl leading-relaxed">
          The forms, portals and references we use every day. All links go to official New York City
          sources and open in a new tab.
        </p>

        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Resource sections">
          {resourceSections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-ink hover:text-red transition-colors duration-150">
              {s.title}
            </a>
          ))}
        </nav>

        <div className="mt-12 lg:mt-16 space-y-14 lg:space-y-20">
          {resourceSections.map((section, i) => (
            <motion.section
              key={section.id}
              id={section.id}
              className="scroll-mt-[calc(var(--header-height,9rem)+1rem)]"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, ease }}
            >
              <div className="pb-4 border-b-[1.5px] border-ink mb-2">
                <span className="font-sans text-[0.5625rem] tracking-[0.14em] uppercase text-red">
                  {String(i + 1).padStart(2, '0')} · {section.title}
                </span>
                <p className="mt-2 text-sm text-ink-3">{section.intro}</p>
              </div>

              <ul>
                {section.links.map((l) => (
                  <li key={l.href} className="border-b border-paper-3">
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-6 py-4 items-baseline"
                    >
                      <span className="md:col-span-5 font-bold text-ink group-hover:text-red transition-colors duration-150">
                        {l.label} <span aria-hidden="true">↗</span>
                      </span>
                      <span className="md:col-span-7 text-sm text-ink-3">{l.note}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Resources
