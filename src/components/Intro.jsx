import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { introAlreadyPlayed, markIntroPlayed } from '../lib/intro'

const ease = [0.65, 0, 0.35, 1]

// Red curtain; the wordmark fades in at centre, then glides up-left and locks onto the
// header wordmark while the curtain dissolves. First visit per session only.
function Intro() {
  const [show, setShow] = useState(!introAlreadyPlayed)
  const [m, setM] = useState(null)

  const finish = () => {
    document.documentElement.classList.remove('intro-active')
    setShow(false)
  }

  useEffect(() => {
    if (!show) return
    markIntroPlayed()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish()
      return
    }
    let cancelled = false
    document.fonts.ready.then(() => {
      if (cancelled) return
      const el = document.querySelector('[data-wordmark]')
      if (!el) return finish()
      const r = el.getBoundingClientRect()
      const cs = getComputedStyle(el)
      const vw = window.innerWidth
      const vh = window.innerHeight
      setM({
        left: r.left,
        top: r.top,
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        dx: vw / 2 - (r.left + r.width / 2),
        dy: vh / 2 - (r.top + r.height / 2),
        scale: Math.min(2.2, (vw * 0.86) / r.width),
      })
    })
    const fallback = setTimeout(finish, 4000)
    return () => {
      cancelled = true
      clearTimeout(fallback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-red"
        initial={{ opacity: 1 }}
        animate={{ opacity: m ? 0 : 1 }}
        transition={{ duration: 0.9, delay: m ? 1.0 : 0, ease: [0.4, 0, 0.2, 1] }}
      />
      {m && (
        <motion.p
          className="absolute font-bold text-paper whitespace-nowrap"
          style={{ left: m.left, top: m.top, fontSize: m.fontSize, lineHeight: m.lineHeight }}
          initial={{ opacity: 0, x: m.dx, y: m.dy + 14, scale: m.scale }}
          animate={{
            opacity: [0, 1, 1, 1],
            x: [m.dx, m.dx, m.dx, 0],
            y: [m.dy + 14, m.dy, m.dy, 0],
            scale: [m.scale, m.scale, m.scale, 1],
          }}
          transition={{ duration: 2.0, times: [0, 0.25, 0.5, 1], ease }}
          onAnimationComplete={finish}
        >
          Michael De Luna, AIA, <span className="text-ink">Architect</span>
        </motion.p>
      )}
    </div>
  )
}

export default Intro
