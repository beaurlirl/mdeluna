import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ease = [0.2, 0.6, 0.2, 1]

function Home() {
  return (
    <section className="relative bg-paper overflow-hidden min-h-[640px] lg:h-[calc(100vh-6.75rem)]">

      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/petrossian1.png"
          alt="Petrossian Boutique — Manhattan, NY"
          className="w-full h-full object-cover scale-110 blur-sm"
          loading="eager"
        />
        <div className="absolute inset-0 bg-paper/60" />
      </div>

      {/* Content */}
      <div className="relative lg:h-full max-w-screen-xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center gap-6 lg:gap-8 py-16">

        <motion.p
          className="font-sans text-[0.625rem] tracking-[0.16em] uppercase text-ink-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease }}
        >
          Licensed Architect · New York City · Est. 1994
        </motion.p>

        <motion.h1
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-ink leading-tight tracking-tight"
          initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease }}
        >
          <span className="whitespace-nowrap">Architecture</span>
          <span className="whitespace-nowrap"><span aria-hidden="true" className="text-accent mr-2">·</span>Coding</span>
          <span className="whitespace-nowrap"><span aria-hidden="true" className="text-accent mr-2">·</span>Zoning</span>
          <span className="whitespace-nowrap"><span aria-hidden="true" className="text-accent mr-2">·</span>Filing</span>
        </motion.h1>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15, ease }}
        >
          <Link
            to="/services"
            className="bg-[#C1272D] text-paper text-sm font-sans font-medium px-6 py-3.5 min-h-11 inline-flex items-center hover:bg-ink transition-colors duration-150"
          >
            View Services →
          </Link>
          <Link
            to="/contact"
            className="border border-[#C1272D] text-[#C1272D] text-sm font-sans font-medium px-6 py-3.5 min-h-11 inline-flex items-center hover:bg-[#C1272D] hover:text-paper transition-colors duration-150"
          >
            Start a Project →
          </Link>
        </motion.div>

        <motion.div
          className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease }}
        >
          Manhattan · Brooklyn · Queens · Bronx · Staten Is.
        </motion.div>

      </div>

      {/* Caption */}
      <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6">
        <span className="font-sans text-[0.5rem] tracking-[0.16em] uppercase text-ink-2">
          Petrossian Boutique · Manhattan
        </span>
      </div>

    </section>
  )
}

export default Home
