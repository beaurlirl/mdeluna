import { useState } from 'react'
import { motion } from 'framer-motion'
import { contact } from '../data/siteContent'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

const ease = [0.2, 0.6, 0.2, 1]

const inputClass = 'w-full px-4 py-3 bg-vellum border border-paper-3 rounded focus:border-ink focus:outline-none transition-colors duration-150 text-sm text-ink placeholder:text-ink-4'
const labelClass = 'block font-sans text-[0.5625rem] tracking-[0.16em] uppercase text-ink-3 mb-2'

function Contact() {
  const [formState, setFormState] = useState('idle')

  return (
    <div>

      {/* Page header */}
      <div className="bg-paper border-b border-paper-3">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease }}
          >
            <p className="font-sans text-[0.625rem] tracking-[0.16em] uppercase text-red mb-4">Contact</p>
            <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl text-ink leading-tight">
              Start Your Project
            </h1>
            <p className="mt-5 font-sans italic text-lg lg:text-xl text-ink-2 max-w-prose leading-relaxed">
              Ready to discuss your project? Get in touch and we'll outline the path forward.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-paper">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">

            {/* Contact info */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease }}
            >
              <div className="space-y-8">
                <div>
                  <h3 className="font-sans text-[0.5625rem] tracking-[0.16em] uppercase text-ink-4 mb-3">Office</h3>
                  <address className="not-italic text-base text-ink-2 leading-relaxed">
                    <p>{contact.address.street}</p>
                    <p>{contact.address.city}, {contact.address.state} {contact.address.zip}</p>
                  </address>
                </div>

                <div>
                  <h3 className="font-sans text-[0.5625rem] tracking-[0.16em] uppercase text-ink-4 mb-3">Phone</h3>
                  <div className="space-y-1.5 text-base text-ink-2">
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-[0.5rem] tracking-[0.12em] uppercase text-ink-4 w-8">Work</span>
                      <a href={`tel:${contact.phone.replace(/\./g, '')}`} className="hover:text-red transition-colors duration-150">{contact.phone}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-[0.5rem] tracking-[0.12em] uppercase text-ink-4 w-8">Cell</span>
                      <a href={`tel:${contact.cell.replace(/\./g, '')}`} className="hover:text-red transition-colors duration-150">{contact.cell}</a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-sans text-[0.5625rem] tracking-[0.16em] uppercase text-ink-4 mb-3">Email</h3>
                  <a href={`mailto:${contact.email}`} className="text-base text-ink-2 hover:text-red transition-colors duration-150">
                    {contact.email}
                  </a>
                </div>

                <div className="pt-6 border-t border-paper-3">
                  <p className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4 leading-relaxed">
                    NYS Lic. № 024891<br />
                    SIA № 008232<br />
                    AIA<br />
                    Est. 1994
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.08, ease }}
            >
              <div className="bg-vellum border border-paper-3 p-8 lg:p-10">
                {formState === 'success' ? (
                  <motion.div
                    className="min-h-[360px] flex flex-col justify-center"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, ease }}
                  >
                    <span className="stamp text-approved self-start mb-6">Received</span>
                    <h3 className="font-sans text-2xl text-ink">Message sent.</h3>
                    <p className="mt-3 text-sm text-ink-3">Thank you for reaching out. We'll be in touch shortly.</p>
                    <button
                      onClick={() => setFormState('idle')}
                      className="mt-8 font-sans text-[0.5625rem] tracking-[0.16em] uppercase text-ink-3 hover:text-red transition-colors duration-150 text-left"
                    >
                      Send another →
                    </button>
                  </motion.div>
                ) : (
                  <form
                    className="space-y-6"
                    onSubmit={async (e) => {
                      e.preventDefault()
                      setFormState('loading')
                      try {
                        const res = await fetch(FORMSPREE_ENDPOINT, {
                          method: 'POST',
                          body: new FormData(e.target),
                          headers: { Accept: 'application/json' },
                        })
                        if (res.ok) { setFormState('success'); e.target.reset() }
                        else setFormState('error')
                      } catch { setFormState('error') }
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className={labelClass}>Name</label>
                        <input type="text" id="name" name="name" className={inputClass} required />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass}>Email</label>
                        <input type="email" id="email" name="email" className={inputClass} required />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone <span className="text-ink-4 normal-case font-sans tracking-normal text-[0.625rem]">(optional)</span>
                      </label>
                      <input type="tel" id="phone" name="phone" className={inputClass} />
                    </div>

                    <div>
                      <label htmlFor="project-type" className={labelClass}>Project Type</label>
                      <select id="project-type" name="project-type" className={inputClass}>
                        <option value="">Select</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="hospitality">Hospitality</option>
                        <option value="filing">DOB Filing / Expediting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className={labelClass}>Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className={`${inputClass} resize-none`}
                        placeholder="Describe your project — address, scope, timeline…"
                        required
                      />
                    </div>

                    {formState === 'error' && (
                      <p className="text-sm text-red">
                        Something went wrong. Email us directly at{' '}
                        <a href={`mailto:${contact.email}`} className="underline">{contact.email}</a>.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={formState === 'loading'}
                      className="w-full bg-red text-paper text-sm font-sans font-medium py-3.5 rounded-sm hover:bg-red-deep transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {formState === 'loading' ? 'Sending…' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
