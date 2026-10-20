import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import SEO from '../components/SEO'

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
const HERO_INTRO = 1600 // first image eases in from white instead of popping

function HeroSlideshow() {
  const [index, setIndex] = useState(0)
  const isFirstRender = useRef(true)

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
    isFirstRender.current = false
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
          fetchpriority={index === 0 ? 'high' : undefined}
          className="absolute inset-0 w-full h-full object-cover scale-105 blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isFirstRender.current ? HERO_INTRO / 1000 : HERO_FADE / 1000, ease }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-paper/30" />
    </div>
  )
}

function Home() {
  return (
    <section className="relative bg-paper overflow-hidden h-viewport-header">
      <SEO path="/" />

      {/* Background image */}
      <HeroSlideshow />

      {/* Content */}
      <div className="relative h-full max-w-screen-xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center gap-6 lg:gap-8 py-16">

        <motion.div
          className="max-w-3xl bg-paper/85 px-6 py-8 lg:px-10 lg:py-10"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
        >
          <h1 className="font-sans font-bold text-ink text-3xl md:text-4xl lg:text-5xl leading-tight">
            NYC Architect and DOB Expediter
          </h1>
          <p className="mt-4 text-base lg:text-lg text-ink-2 leading-relaxed">
            Stuck on a permit, violation or filing? Michael De Luna, AIA has designed, filed and
            expedited projects with the NYC Department of Buildings since 1994: building permits,
            zoning analysis, code compliance, LPC approvals and certificates of occupancy in all five boroughs.
          </p>
          <p className="mt-4 font-sans text-sm text-ink-3">
            <a href="tel:9174057186" className="text-ink hover:text-red transition-colors duration-150">917.405.7186</a>
            <span className="mx-2 text-ink-4">·</span>
            <a href="mailto:michael@mdeluna.com" className="text-ink hover:text-red transition-colors duration-150">michael@mdeluna.com</a>
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease }}
        >
          <Link
            to="/filing"
            className="bg-red text-paper text-base lg:text-lg font-sans font-medium px-7 py-4 min-h-11 inline-flex items-center hover:bg-ink transition-colors duration-150"
          >
            Filing &amp; Expediting →
          </Link>
          <Link
            to="/contact"
            className="border border-red text-red text-base lg:text-lg font-sans font-medium px-7 py-4 min-h-11 inline-flex items-center hover:bg-red hover:text-paper transition-colors duration-150"
          >
            Get a Free Project Review →
          </Link>
        </motion.div>

      </div>


    </section>
  )
}

export default Home
