import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { codeServices } from '../../data/siteContent'

const ease = [0.2, 0.6, 0.2, 1]

function CodeIndex() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const timer = setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      const headerHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height')
      ) || 144
      window.scrollTo({ top: el.offsetTop - headerHeight - 24, behavior: 'smooth' })
    }, 120)
    return () => clearTimeout(timer)
  }, [location.hash])

  return (
    <div>

      {/* Page header */}
      <div className="border-b border-paper-3">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease }}
          >
            <p className="font-sans text-[0.5625rem] tracking-[0.14em] uppercase text-red mb-3">
              Code / Approval Information
            </p>
            <h1 className="font-sans text-3xl lg:text-5xl font-bold text-ink leading-tight">
              Code Compliance &<br />Approval Services
            </h1>
            <p className="mt-5 font-sans text-base lg:text-lg text-ink-2 max-w-2xl leading-relaxed">
              Thirty years navigating the New York City Building Code, Zoning Resolution, and the agencies that enforce them. The following outlines the approvals and code-compliance services this office provides.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Service sections */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12 lg:py-20 space-y-16 lg:space-y-24">
        {codeServices.map((section, i) => (
          <motion.div
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.3, delay: 0.05, ease }}
          >
            {/* Section header */}
            <div className="flex items-baseline justify-between pb-4 border-b-[1.5px] border-ink mb-6">
              <span className="font-sans text-[0.5625rem] tracking-[0.14em] uppercase text-red">
                {String(i + 1).padStart(2, '0')} · {section.title}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

              {/* Left — title + description */}
              <div className="lg:col-span-4">
                <h2 className="font-sans text-xl lg:text-2xl font-bold text-ink leading-snug mb-4">
                  {section.title}
                </h2>
                <p className="font-sans text-sm text-ink-3 leading-relaxed">
                  {section.description}
                </p>
              </div>

              {/* Right — item list */}
              <div className="lg:col-span-8">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0">
                  {section.items.map((item, j) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: j * 0.03, ease }}
                      className="flex items-start gap-3 py-2.5 border-b border-paper-3 last:border-b-0"
                    >
                      <span className="text-red flex-shrink-0 font-bold mt-0.5">·</span>
                      <span className="font-sans text-sm text-ink-2 leading-snug">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="border-t border-paper-3 bg-paper-2">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="font-sans text-[0.5625rem] tracking-[0.14em] uppercase text-ink-4 mb-3">
                Next Step
              </p>
              <h3 className="font-sans text-xl lg:text-2xl font-bold text-ink leading-tight">
                Questions about your project?
              </h3>
              <p className="mt-2 font-sans text-sm text-ink-3 max-w-prose">
                Every project is different. Contact us to discuss the approval path for yours.
              </p>
            </div>
            <div className="flex gap-4 flex-shrink-0">
              <Link
                to="/contact"
                className="bg-ink text-paper text-sm font-sans px-6 py-3 hover:bg-ink-2 transition-colors duration-150"
              >
                Contact Us
              </Link>
              <Link
                to="/filing"
                className="border border-ink text-ink text-sm font-sans px-6 py-3 hover:bg-paper-3 transition-colors duration-150"
              >
                Expediting Services
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CodeIndex
