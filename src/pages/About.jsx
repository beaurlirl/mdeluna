import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { about, siteInfo } from '../data/siteContent'

function About() {
  return (
    <div className="pt-20 lg:pt-28 pb-20 lg:pb-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              {about.headline}
            </h1>

            <div className="mt-10 space-y-6">
              <p className="text-lg text-charcoal leading-relaxed">
                {about.intro}
              </p>
              {about.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-mid-gray leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Credentials */}
            <div className="mt-12 pt-8 border-t border-light-gray">
              <h3 className="text-sm font-medium text-charcoal uppercase tracking-wide mb-4">
                Credentials
              </h3>
              <ul className="space-y-2">
                {about.credentials.map((credential, index) => (
                  <li key={index} className="text-mid-gray flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-burgundy rounded-full" />
                    {credential}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <Link
                to="/contact"
                className="inline-block bg-charcoal text-warm-white font-medium text-sm tracking-wide px-8 py-4 rounded-full shadow-sm transition-all duration-300 hover:bg-burgundy hover:-translate-y-0.5 hover:shadow-md"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>

          {/* Image / Portrait Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="sticky top-32">
              <img
                src="/mikelucidcartoon.png"
                alt={siteInfo.name}
                className="w-full h-auto object-contain"
                style={{ filter: 'sepia(30%) saturate(0.6) brightness(0.95)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default About

