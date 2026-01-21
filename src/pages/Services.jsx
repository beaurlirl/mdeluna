import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { services } from '../data/siteContent'

function Services() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
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
            We offer comprehensive architecture and expediting services, guiding projects 
            from initial concept through final Department of Buildings approval.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="mt-16 lg:mt-24 space-y-20 lg:space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              className="scroll-mt-32"
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
                <div className="lg:col-span-5">
                  <h2 className="font-display text-2xl lg:text-3xl font-light text-charcoal">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-mid-gray leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Details */}
                <div className="lg:col-span-5">
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
                <div className="mt-16 lg:mt-24 border-b border-light-gray" />
              )}
            </motion.div>
          ))}
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

