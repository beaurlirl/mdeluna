import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

const ease = [0.2, 0.6, 0.2, 1]

// One cover photo per project, capped at 10 so the homepage doesn't get image-heavy.
// Featured projects lead; the rest fill in behind them.
const GALLERY_PROJECT_IDS = [
  'petrossian-boutique',
  'east-81st-street',
  'shelter-pizza',
  'grey-bar-restaurant',
  'west-186th-street',
  'bk-heights-jewish-academy',
  'gulluoglu',
  'chickie-pigs',
  'petite-abeille',
  't-poutine',
]

const heroImages = GALLERY_PROJECT_IDS
  .map((id) => projects.find((p) => p.id === id))
  .filter(Boolean)
  .map((p) => ({ src: p.coverImage, alt: p.title }))

const HERO_HOLD = 5600
const HERO_FADE = 2200

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
