import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { introAlreadyPlayed, markIntroPlayed } from '../lib/intro'

// Brand-red curtain with the wordmark; lifts away to reveal the page. First visit per session only.
function Intro() {
  const [show, setShow] = useState(!introAlreadyPlayed)

  useEffect(() => {
    if (!show) return
    markIntroPlayed()
    const t = setTimeout(() => setShow(false), 1100)
    return () => clearTimeout(t)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-red flex items-center justify-center pointer-events-none"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.p
            className="font-bold text-paper text-[clamp(1.5rem,4vw,3.5rem)] text-center px-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.7, ease: [0.2, 0.6, 0.2, 1] }}
          >
            Michael De Luna, AIA, <span className="text-ink">Architect</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Intro
