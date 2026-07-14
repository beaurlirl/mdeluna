import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ease = [0.2, 0.6, 0.2, 1]

function Home() {
  return (
    <section className="relative bg-paper overflow-hidden h-viewport-header">

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

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15, ease }}
        >
          <Link
            to="/filing"
            className="bg-[#6B1629] text-paper text-base lg:text-lg font-sans font-medium px-7 py-4 min-h-11 inline-flex items-center hover:bg-ink transition-colors duration-150"
          >
            View Services →
          </Link>
          <Link
            to="/contact"
            className="border border-[#6B1629] text-[#6B1629] text-base lg:text-lg font-sans font-medium px-7 py-4 min-h-11 inline-flex items-center hover:bg-[#6B1629] hover:text-paper transition-colors duration-150"
          >
            Start a Project →
          </Link>
        </motion.div>

      </div>


    </section>
  )
}

export default Home
