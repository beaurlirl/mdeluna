import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { siteInfo } from '../data/siteContent'

const EXPEDITING_PROJECTS = [
  { src: '/petrossian1.png', label: 'Petrossian Boutique', location: 'Manhattan, NY' },
  { src: '/petrossian2.png', label: 'Petrossian Boutique', location: 'Manhattan, NY' },
  { src: '/pizza1.png', label: 'Shelter Pizza', location: 'Brooklyn, NY' },
  { src: '/jewishacademy1.png', label: 'BK Heights Jewish Academy', location: 'Brooklyn, NY' },
]

const HERO_IMAGES = EXPEDITING_PROJECTS.map((p) => p.src)

function Home() {
  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    if (!HERO_IMAGES.length) return
    HERO_IMAGES.forEach((src) => {
      const image = new Image()
      image.src = src
    })
  }, [])

  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-24 pb-12 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal">
          <AnimatePresence mode="wait">
            <motion.div
              key={HERO_IMAGES[heroIndex]}
              className="absolute inset-0 bg-center bg-cover blur-sm scale-105"
              style={{ backgroundImage: `url(${HERO_IMAGES[heroIndex]})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-navy/35" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-warm-white leading-[0.95] tracking-tight">
              {siteInfo.name}
            </h1>
          </motion.div>

          <motion.p
            className="mt-8 lg:mt-12 text-lg md:text-xl text-light-gray max-w-2xl leading-relaxed font-light tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {siteInfo.tagline}
          </motion.p>

          <motion.div
            className="mt-12 lg:mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/contact"
              className="inline-block bg-warm-white text-charcoal font-medium text-sm tracking-wide px-8 py-4 rounded-full shadow-sm transition-all duration-300 hover:bg-burgundy hover:text-warm-white hover:-translate-y-0.5 hover:shadow-md"
            >
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Ready to Start Your Project — Expediting Portfolio */}
      <section className="bg-warm-white py-20 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 lg:mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal">
              Selected Work
            </h2>
            <p className="mt-4 text-mid-gray text-lg max-w-xl">
              From architecture and design to DOB filings and expediting — we handle every step.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPEDITING_PROJECTS.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <div className="aspect-[4/5] overflow-hidden bg-light-gray rounded-sm">
                  <img
                    src={project.src}
                    alt={project.label}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-charcoal font-medium text-sm">{project.label}</p>
                  <p className="text-mid-gray text-xs mt-0.5">{project.location}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <Link
              to="/contact"
              className="inline-block bg-charcoal text-warm-white font-medium text-sm tracking-wide px-8 py-4 rounded-full shadow-sm transition-all duration-300 hover:bg-burgundy hover:-translate-y-0.5 hover:shadow-md"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home

