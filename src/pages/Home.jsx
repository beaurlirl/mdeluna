import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import SEO from '../components/SEO'
import SubscribeForm from '../components/SubscribeForm'
import { INTRO_DELAY } from '../lib/intro'

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
      img.decode?.().catch(() => {})
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
          className="absolute inset-0 w-full h-full object-cover grayscale transform-gpu will-change-[opacity]"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 1, transition: { duration: HERO_FADE / 1000 } }}
          transition={{
            opacity: {
              duration: isFirstRender.current ? HERO_INTRO / 1000 : HERO_FADE / 1000,
              delay: isFirstRender.current ? INTRO_DELAY * 0.6 : 0,
              ease,
            },
            // slow push-in that runs for the whole slide so the image never sits dead still
            scale: { duration: (HERO_HOLD + HERO_FADE * 2) / 1000, ease: 'linear' },
          }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-ink/35" />
      <motion.div
        key={`progress-${index}`}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-paper/70 origin-left z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: HERO_HOLD / 1000, ease: 'linear' }}
      />
    </div>
  )
}

function Home() {
  return (
    <section className="relative bg-ink overflow-hidden min-h-viewport-header lg:h-[calc(100dvh-var(--header-height,9rem))] flex flex-col">
      <SEO path="/" />

      {/* Image stage */}
      <div className="relative flex-1 min-h-[22rem]">
        <HeroSlideshow />

        <div className="absolute inset-x-0 bottom-0 px-6 lg:px-12 pb-8 lg:pb-14">
          <h1 className="font-bold text-paper leading-[1.05] text-[clamp(1.75rem,4.4vw,4.5rem)]">
            <span className="sr-only">NYC Architect and DOB Expediter: </span>
            {['Michael De Luna, AIA ', '| ', 'Architecture, Zoning & Expediting'].map((part, i) => (
              <motion.span
                key={part}
                className={`inline-block whitespace-pre ${i === 1 ? 'text-red' : ''}`}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: INTRO_DELAY + 0.3 + i * 0.2, ease }}
              >
                {part}
              </motion.span>
            ))}
          </h1>
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        className="bg-red text-paper px-6 lg:px-12 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: INTRO_DELAY + 0.9, ease }}
      >
        <p className="font-sans text-xs">
          &copy; {new Date().getFullYear()} Michael De Luna, AIA, Architect
          <span className="mx-2 text-ink">+</span>
          <a href="tel:9174057186" className="hover:text-ink transition-colors duration-150">917.405.7186</a>
        </p>
        <SubscribeForm tone="dark" compact />
      </motion.div>
    </section>
  )
}

export default Home
