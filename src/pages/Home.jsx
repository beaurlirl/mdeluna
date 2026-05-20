import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { services, contact } from '../data/siteContent'
import { projects } from '../data/projects'

const ease = [0.2, 0.6, 0.2, 1]

const FEATURED = projects.filter((p) => p.featured && p.coverImage && !p.coverImage.includes('/projects/'))

function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-[100px] bg-paper border-b border-paper-3 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[calc(100vh-100px)]">

            {/* Text column */}
            <div className="py-16 lg:py-24 lg:pr-16 flex flex-col justify-center">
              <motion.p
                className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-ink-3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.2, ease }}
              >
                Licensed Architect · New York City · Est. 1994
              </motion.p>

              <motion.h1
                className="mt-5 font-serif text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-ink leading-[1.0] tracking-tight"
                initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: 0.05, ease }}
              >
                Architecture.<br />
                Zoning.<br />
                <em className="not-italic text-red">Expediting.</em>
              </motion.h1>

              <motion.p
                className="mt-10 font-serif italic text-lg lg:text-xl text-ink-2 leading-relaxed max-w-prose"
                initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: 0.1, ease }}
              >
                Michael De Luna, AIA has guided DOB filings, code compliance, and architectural
                design across New York City since 1994 — from brownstone renovations to ground-up
                commercial buildings.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-wrap gap-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.15, ease }}
              >
                <Link
                  to="/services"
                  className="bg-red text-paper text-sm font-sans font-medium px-6 py-3 rounded-sm hover:bg-red-deep transition-colors duration-150"
                >
                  View Services
                </Link>
                <Link
                  to="/contact"
                  className="border border-ink text-ink text-sm font-sans font-medium px-6 py-3 rounded-sm hover:border-red hover:text-red transition-colors duration-150"
                >
                  Start a Project →
                </Link>
              </motion.div>

              <motion.div
                className="mt-12 font-mono text-[0.5rem] tracking-[0.14em] uppercase text-ink-4 space-y-1.5"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.2, ease }}
              >
                <p>Manhattan · Brooklyn · Queens · Bronx · Staten Is.</p>
              </motion.div>
            </div>

            {/* Photo column */}
            <motion.div
              className="hidden lg:block relative -mr-12"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1, ease }}
            >
              <img
                src="/petrossian1.png"
                alt="Petrossian Boutique — Manhattan, NY"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6">
                <span className="font-mono text-[0.5rem] tracking-[0.14em] uppercase text-paper/70">
                  Petrossian Boutique · Manhattan, NY
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Services overview ── */}
      <section className="bg-paper border-b border-paper-3">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16 lg:py-24">

          {/* Section head */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease }}
          >
            <div className="flex items-baseline justify-between pb-4 border-b-[1.5px] border-ink">
              <span className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-red">№ 01 · Services</span>
              <span className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-ink-4">Overview</span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl text-ink mt-5">Expediting & Filing</h2>
          </motion.div>

          <div className="mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-paper-3">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                className="p-6 lg:p-8 border-b border-r border-paper-3"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: i * 0.04, ease }}
              >
                <p className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-red mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-serif text-xl text-ink leading-snug">{s.title}</h3>
                <ul className="mt-4 space-y-1.5">
                  {s.details.slice(0, 4).map((d) => (
                    <li key={d} className="text-sm text-ink-3 flex items-start gap-2">
                      <span className="text-red mt-1 flex-shrink-0">·</span>{d}
                    </li>
                  ))}
                  {s.details.length > 4 && (
                    <li className="text-sm text-ink-4">+{s.details.length - 4} more</li>
                  )}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              to="/services"
              className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-ink-2 hover:text-red transition-colors duration-150"
            >
              Full Services List →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Selected work ── */}
      {FEATURED.length > 0 && (
        <section className="bg-paper-2 border-b border-paper-3">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16 lg:py-24">

            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease }}
            >
              <div className="flex items-baseline justify-between pb-4 border-b-[1.5px] border-ink">
                <span className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-red">№ 02 · Work</span>
                <span className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-ink-4">Selected Projects</span>
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl text-ink mt-5">Selected Work</h2>
            </motion.div>

            <div className="mt-10 divide-y divide-paper-3">
              {FEATURED.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.04, ease }}
                >
                  <Link
                    to={`/projects/${p.id}`}
                    className="flex items-center gap-6 lg:gap-10 py-5 group"
                  >
                    <div className="w-20 h-16 lg:w-24 lg:h-18 flex-shrink-0 bg-paper-3 overflow-hidden">
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-mono text-[0.5rem] tracking-[0.14em] uppercase text-ink-4 mb-1">
                        {p.category} · {p.location} · {p.year}
                      </p>
                      <h3 className="font-serif text-xl lg:text-2xl text-ink group-hover:text-red transition-colors duration-150 truncate">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink-3 line-clamp-1">{p.description}</p>
                    </div>
                    <span className="font-mono text-[0.625rem] tracking-[0.14em] uppercase text-ink-4 group-hover:text-red transition-colors duration-150 flex-shrink-0 hidden md:block">
                      View →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/projects"
                className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-ink-2 hover:text-red transition-colors duration-150"
              >
                All Projects →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Contact strip ── */}
      <section className="bg-ink">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-ink-4 mb-4">
                Contact
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl text-paper leading-tight">
                Start your project.
              </h2>
              <p className="mt-5 font-serif italic text-ink-3 text-lg max-w-prose">
                From the first zoning analysis to the certificate of occupancy — we manage the full process.
              </p>
              <Link
                to="/contact"
                className="inline-block mt-8 bg-red text-paper text-sm font-sans font-medium px-6 py-3 rounded-sm hover:bg-red-deep transition-colors duration-150"
              >
                Get in Touch
              </Link>
            </div>
            <div className="font-mono text-[0.5625rem] tracking-[0.14em] uppercase text-ink-3 space-y-2 lg:text-right">
              <p>{contact.address.street}</p>
              <p>{contact.address.city}, {contact.address.state} {contact.address.zip}</p>
              <p className="pt-2">
                <a href={`tel:${contact.phone.replace(/\./g, '')}`} className="hover:text-paper transition-colors duration-150">{contact.phone}</a>
              </p>
              <p>
                <a href={`mailto:${contact.email}`} className="hover:text-paper transition-colors duration-150">{contact.email}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
