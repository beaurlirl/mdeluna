import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { consultingWork, services } from '../data/siteContent'

function Services() {
  const location = useLocation()
  const scrollTimeoutRef = useRef(null)

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1))
      if (element) {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        scrollTimeoutRef.current = setTimeout(() => {
          const header = document.querySelector('header')
          const headerOffset = header ? header.offsetHeight + 16 : 120
          const elementTop = element.getBoundingClientRect().top + window.scrollY
          window.scrollTo({
            top: Math.max(elementTop - headerOffset, 0),
            behavior: 'smooth',
          })
        }, 100)
      }
    }
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
        scrollTimeoutRef.current = null
      }
    }
  }, [location])

  return (
    <div className="pt-20 lg:pt-28 pb-20 lg:pb-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal">
            Services
          </h1>
          <p className="mt-6 text-lg text-mid-gray leading-relaxed">
            Expediting support and consulting expertise to guide approvals, permits, and filings from start to finish.
          </p>
        </motion.div>

        {/* Expediting Services */}
        <div className="mt-16 lg:mt-24">
          <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal">
            Expediting Services We Offer
          </h2>
          <div className="mt-12 space-y-16 lg:space-y-24">
            {services.map((service, index) => (
            <motion.div
                key={service.id}
                id={service.id}
              className={`scroll-mt-32 ${index > 0 ? 'pt-12 lg:pt-16 border-t border-light-gray' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                  {/* Letter Badge */}
                  <div className="lg:col-span-2">
                    <div
                      className="w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: service.color }}
                    >
                      <span className="text-warm-white font-semibold text-2xl lg:text-3xl">
                        {service.letter}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-4">
                    <h3 className="font-display text-2xl lg:text-3xl font-light text-charcoal">
                      {service.title}
                    </h3>
                  </div>

                  {/* Details */}
                  <div className="lg:col-span-6">
                    <ul className="space-y-3">
                      {service.details.map((detail, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-charcoal"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: service.color }}
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {index < services.length - 1 && (
                  <div className="mt-12 lg:mt-16" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Consulting Work */}
        <div className="mt-20 lg:mt-32">
          <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal">
            Consulting Work
          </h2>
          <div className="mt-10 space-y-12 lg:space-y-16">
            {consultingWork.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold tracking-wide text-charcoal uppercase">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-2 text-mid-gray">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-burgundy flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 lg:mt-32 p-8 lg:p-12 bg-charcoal rounded-2xl shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-2xl">
            <h3 className="font-display text-2xl lg:text-3xl font-light text-warm-white">
              Ready to start your project?
            </h3>
            <p className="mt-4 text-light-gray">
              Contact us for a consultation. We'll discuss your project goals and how our services can help bring your vision to life.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-8 bg-warm-white text-charcoal font-medium text-sm tracking-wide px-8 py-4 rounded-full shadow-sm transition-all duration-300 hover:bg-burgundy hover:text-warm-white hover:-translate-y-0.5 hover:shadow-md"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Services

