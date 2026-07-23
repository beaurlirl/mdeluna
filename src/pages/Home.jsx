import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const ease = [0.2, 0.6, 0.2, 1]

const heroImages = [
  { src: '/petrossian1.png', alt: 'Petrossian Boutique — Manhattan, NY' },
  { src: '/pizza1.png', alt: 'Shelter Pizza' },
  { src: '/jewishacademy1.png', alt: 'BK Heights Jewish Academy' },
  { src: '/petrossian2.png', alt: 'Petrossian Boutique — Manhattan, NY' },
]

const HERO_HOLD = 4200
const HERO_FADE = 1400

function HeroSlideshow() {
  const [index, setIndex] = useState(0)

  // Preload so the crossfade never shows a gap on a slow connection
  useEffect(() => {
    heroImages.forEach(({ src }) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % heroImages.length)
    }, HERO_HOLD)
    return () => clearTimeout(t)
  }, [index])

  return (
    <div className="absolute inset-0">
      <AnimatePresence>
        <motion.img
          key={index}
          src={heroImages[index].src}
          alt={heroImages[index].alt}
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: HERO_FADE / 1000, ease }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-paper/60" />
    </div>
  )
}

function Home() {
  return (
    <section className="relative bg-paper overflow-hidden h-viewport-header">

      {/* Background image */}
      <HeroSlideshow />

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
