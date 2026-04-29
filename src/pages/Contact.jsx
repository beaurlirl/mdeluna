import { useState } from 'react'
import { motion } from 'framer-motion'
import { contact, siteInfo } from '../data/siteContent'

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="pt-20 lg:pt-28 pb-20 lg:pb-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal">
              Contact
            </h1>
            <p className="mt-6 text-lg text-mid-gray leading-relaxed max-w-md">
              Ready to discuss your project? Get in touch and let's explore how we can work together.
            </p>

            <div className="mt-12 space-y-8">
              {/* Address */}
              <div>
                <h3 className="text-sm font-medium text-charcoal uppercase tracking-wide mb-3">
                  Office
                </h3>
                <address className="not-italic text-mid-gray leading-relaxed">
                  <p>{contact.address.street}</p>
                  <p>{contact.address.city}, {contact.address.state} {contact.address.zip}</p>
                </address>
              </div>

              {/* Phone */}
              <div>
                <h3 className="text-sm font-medium text-charcoal uppercase tracking-wide mb-3">
                  Phone
                </h3>
                <a
                  href={`tel:${contact.phone.replace(/\./g, '')}`}
                  className="text-mid-gray hover:text-burgundy transition-colors duration-300"
                >
                  {contact.phone}
                </a>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-sm font-medium text-charcoal uppercase tracking-wide mb-3">
                  Email
                </h3>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-mid-gray hover:text-burgundy transition-colors duration-300"
                >
                  {contact.email}
                </a>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-sm font-medium text-charcoal uppercase tracking-wide mb-3">
                  Follow
                </h3>
                <div className="flex gap-4">
                  <a
                    href={contact.social.instagram}
                    className="text-mid-gray hover:text-burgundy transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                  <span className="text-light-gray">·</span>
                  <a
                    href={contact.social.linkedin}
                    className="text-mid-gray hover:text-burgundy transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                className="flex flex-col justify-center h-full min-h-[400px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-warm-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-light text-charcoal">Message sent.</h3>
                <p className="mt-3 text-mid-gray">Thank you for reaching out. We'll be in touch shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-sm text-mid-gray hover:text-burgundy transition-colors duration-300 text-left"
                >
                  Send another message →
                </button>
              </motion.div>
            ) : (
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-transparent border border-light-gray rounded-lg focus:border-charcoal focus:ring-1 focus:ring-charcoal/40 outline-none transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-transparent border border-light-gray rounded-lg focus:border-charcoal focus:ring-1 focus:ring-charcoal/40 outline-none transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                  Phone <span className="text-mid-gray font-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 bg-transparent border border-light-gray rounded-lg focus:border-charcoal focus:ring-1 focus:ring-charcoal/40 outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label htmlFor="project-type" className="block text-sm font-medium text-charcoal mb-2">
                  Project Type
                </label>
                <select
                  id="project-type"
                  name="project-type"
                  className="w-full px-4 py-3 bg-transparent border border-light-gray rounded-lg focus:border-charcoal focus:ring-1 focus:ring-charcoal/40 outline-none transition-colors duration-300"
                >
                  <option value="">Select a type...</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="filing">DOB Filing / Expediting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-transparent border border-light-gray rounded-lg focus:border-charcoal focus:ring-1 focus:ring-charcoal/40 outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-charcoal text-warm-white font-medium text-sm tracking-wide py-4 rounded-full shadow-sm transition-all duration-300 hover:bg-burgundy hover:-translate-y-0.5 hover:shadow-md"
              >
                Send Message
              </button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact

