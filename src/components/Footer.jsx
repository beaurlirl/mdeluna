import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { contact, siteInfo } from '../data/siteContent'

function Footer() {
  return (
    <footer className="bg-charcoal text-warm-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block text-warm-white text-lg font-medium tracking-wide">
              {siteInfo.name}
            </Link>
            <p className="mt-6 text-light-gray max-w-sm leading-relaxed">
              {siteInfo.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wide mb-6">
              Navigation
            </h4>
            <nav className="space-y-3">
              <Link
                to="/projects"
                className="block text-light-gray hover:text-warm-white transition-colors duration-300"
              >
                Our Work
              </Link>
              <Link
                to="/services"
                className="block text-light-gray hover:text-warm-white transition-colors duration-300"
              >
                Services
              </Link>
              <Link
                to="/about"
                className="block text-light-gray hover:text-warm-white transition-colors duration-300"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block text-light-gray hover:text-warm-white transition-colors duration-300"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wide mb-6">
              Contact
            </h4>
            <address className="not-italic space-y-3 text-light-gray">
              <p>{contact.address.street}</p>
              <p>{contact.address.city}, {contact.address.state} {contact.address.zip}</p>
              <p className="pt-2">
                <a
                  href={`tel:${contact.phone.replace(/\./g, '')}`}
                  className="hover:text-warm-white transition-colors duration-300"
                >
                  {contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-warm-white transition-colors duration-300"
                >
                  {contact.email}
                </a>
              </p>
            </address>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          className="mt-16 pt-8 border-t border-mid-gray/30 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-sm text-mid-gray">
            © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href={contact.social.instagram}
              className="text-mid-gray hover:text-warm-white transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth={1.5} />
                <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
                <circle cx="18" cy="6" r="1" fill="currentColor" />
              </svg>
            </a>
            <a
              href={contact.social.linkedin}
              className="text-mid-gray hover:text-warm-white transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" strokeWidth={1.5} />
                <circle cx="4" cy="4" r="2" strokeWidth={1.5} />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
