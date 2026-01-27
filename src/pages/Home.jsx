import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { siteInfo, services } from '../data/siteContent'

function Home() {
  const heroImages = [
    '/petrossian1.png',
    '/petrossian2.png',
    '/pizza1.png',
    '/jewishacademy1.png',
  ]
  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    if (!heroImages.length) return
    heroImages.forEach((src) => {
      const image = new Image()
      image.src = src
    })
  }, [heroImages])

  useEffect(() => {
    if (heroImages.length <= 1) return
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [heroImages])

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-24 pb-12 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroImages[heroIndex]}
              className="absolute inset-0 bg-center bg-cover blur-sm scale-105"
              style={{ backgroundImage: `url(${heroImages[heroIndex]})` }}
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
            <p className="mt-4 text-xl md:text-2xl text-light-gray font-light">
              {siteInfo.title}
            </p>
          </motion.div>

          <motion.p
            className="mt-8 lg:mt-12 text-lg md:text-xl text-light-gray max-w-2xl leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {siteInfo.tagline}
          </motion.p>

          {/* Service Indicators */}
          <motion.div
            className="mt-12 lg:mt-16 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {services.map((service, index) => (
              <Link
                key={service.id}
                to={`/services#${service.id}`}
                className="group flex items-center gap-3 pr-6"
              >
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-burgundy transition-transform duration-300 group-hover:scale-110"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1, type: 'spring' }}
                >
                  <span className="text-warm-white font-medium text-sm">
                    {service.letter}
                  </span>
                </motion.div>
              </Link>
            ))}
          </motion.div>

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

    </>
  )
}

export default Home

