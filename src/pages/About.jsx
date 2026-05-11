import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { about, siteInfo } from '../data/siteContent'

const ease = [0.2, 0.6, 0.2, 1]

function About() {
  return (
    <div className="pt-[100px]">

      {/* Page header */}
      <div className="bg-paper border-b border-paper-3">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease }}
          >
            <p className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-red mb-4">About</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ink leading-tight">
              {about.headline}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-paper">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">

            {/* Main text */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease }}
            >
              <p className="font-serif italic text-xl lg:text-2xl text-ink-2 leading-relaxed">
                {about.intro}
              </p>

              <div className="mt-8 space-y-5">
                {about.paragraphs.map((p, i) => (
                  <p key={i} className="text-base text-ink-2 leading-relaxed">{p}</p>
                ))}
              </div>

              {/* Credentials */}
              <div className="mt-12 pt-8 border-t border-paper-3">
                <h3 className="font-mono text-[0.5625rem] tracking-[0.16em] uppercase text-ink-4 mb-5">
                  Credentials
                </h3>
                <ul className="space-y-2">
                  {about.credentials.map((c, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-ink-2">
                      <span className="text-red">·</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <Link
                  to="/contact"
                  className="inline-block bg-red text-paper text-sm font-sans font-medium px-6 py-3 rounded-sm hover:bg-red-deep transition-colors duration-150"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>

            {/* Portrait */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.22, delay: 0.1, ease }}
            >
              <div className="sticky top-28">
                <img
                  src="/mikelucidcartoon.png"
                  alt={siteInfo.name}
                  className="w-full h-auto object-contain"
                  style={{ filter: 'sepia(20%) saturate(0.7) brightness(0.97)' }}
                />
                <div className="mt-5 border-t border-paper-3 pt-4">
                  <p className="font-mono text-[0.5rem] tracking-[0.14em] uppercase text-ink-4">
                    Michael De Luna, AIA, Architect<br />
                    NYS Lic. № 024891 · Est. 1994
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
