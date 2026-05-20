import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { consultingWork, services } from '../data/siteContent'

const ease = [0.2, 0.6, 0.2, 1]

function SectionHead({ number, label, tag }) {
  return (
    <div className="flex items-baseline justify-between pb-4 border-b-[1.5px] border-ink">
      <span className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-red">{number} · {label}</span>
      {tag && <span className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-ink-4">{tag}</span>}
    </div>
  )
}

function Services() {
  const location = useLocation()
  const timerRef = useRef(null)

  useEffect(() => {
    if (!location.hash) return
    const el = document.getElementById(location.hash.slice(1))
    if (!el) return
    timerRef.current = setTimeout(() => {
      const header = document.querySelector('header')
      const offset = header ? header.offsetHeight + 24 : 116
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' })
    }, 100)
    return () => clearTimeout(timerRef.current)
  }, [location])

  return (
    <div className="pt-[100px]">

      {/* Page header */}
      <div className="border-b border-paper-3 bg-paper">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease }}
          >
            <p className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-red mb-4">Services</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-tight">
              Expediting &<br />Filing Services
            </h1>
            <p className="mt-6 font-serif italic text-lg lg:text-xl text-ink-2 max-w-prose leading-relaxed">
              From DOB application to certificate of occupancy — consulting expertise that guides approvals, permits, and filings start to finish.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Expediting services */}
      <div className="bg-paper">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.2, ease }}
            className="mb-12"
          >
            <SectionHead number="№ 01" label="Expediting" tag="DOB · LPC · FDNY · DOT" />
            <h2 className="font-serif text-2xl lg:text-3xl text-ink mt-5">Services We Offer</h2>
          </motion.div>

          <div className="space-y-0 border border-paper-3">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                id={s.id}
                className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 border-b border-paper-3 last:border-b-0"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: i * 0.04, ease }}
              >
                {/* Number + title */}
                <div className="lg:col-span-4 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-paper-3">
                  <p className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-red mb-3">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-serif text-xl lg:text-2xl text-ink leading-snug">{s.title}</h3>
                </div>

                {/* Details */}
                <div className="lg:col-span-8 p-6 lg:p-8">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {s.details.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm text-ink-2">
                        <span className="text-red flex-shrink-0 mt-0.5">·</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Consulting work */}
      <div className="bg-paper-2 border-t border-paper-3">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.2, ease }}
            className="mb-12"
          >
            <SectionHead number="№ 02" label="Consulting" tag="Selected Projects" />
            <h2 className="font-serif text-2xl lg:text-3xl text-ink mt-5">Consulting Work</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {consultingWork.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: i * 0.05, ease }}
              >
                <h3 className="font-mono text-[0.5625rem] tracking-[0.16em] uppercase text-ink-3 pb-3 border-b border-paper-3 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-ink-2">
                      <span className="text-red flex-shrink-0 mt-0.5">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-ink border-t border-ink-2">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-ink-4 mb-4">Next Step</p>
            <h3 className="font-serif text-2xl lg:text-3xl text-paper leading-tight">
              Ready to start your project?
            </h3>
            <p className="mt-4 font-serif italic text-ink-3 text-lg">
              Contact us for a consultation. We'll review your project and outline the approval path.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-8 bg-red text-paper text-sm font-sans font-medium px-6 py-3 rounded-sm hover:bg-red-deep transition-colors duration-150"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Services
