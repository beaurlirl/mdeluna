import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Wordmark from './Wordmark'
import { introAlreadyPlayed, markIntroPlayed } from '../lib/intro'

const ease = [0.6, 0, 0.2, 1]
// Beats: fade in (0-0.5s) > hold > glide into the header (0.9-2.0s) > settle > fold down to MD/AIA
const GLIDE = 2.0
const COLLAPSE_AT = 2400 // ms: starts only after the full name has locked into place
const DONE_AT = 3300

// Red curtain; the full name fades in at centre and glides up-left into the header while
// the curtain dissolves. Once it has settled, it folds down to "MD/AIA". First visit per session only.
function Intro() {
  const [show, setShow] = useState(!introAlreadyPlayed)
  const [head, setHead] = useState(null) // header wordmark box + type
  const [geom, setGeom] = useState(null) // start transform, once the full-width text is measured
  const [expanded, setExpanded] = useState(true)
  const textRef = useRef(null)

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
      setHead({ left: r.left, top: r.top, h: r.height, fontSize: cs.fontSize, lineHeight: cs.lineHeight })
    })
    const fallback = setTimeout(finish, 5000)
    return () => {
      cancelled = true
      clearTimeout(fallback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Measure the full-width name (unscaled) to centre it and fit it to the screen
  useLayoutEffect(() => {
    if (!head || !textRef.current) return
    const w = textRef.current.offsetWidth
    const h = textRef.current.offsetHeight
    const vw = window.innerWidth
    const vh = window.innerHeight
    const scale = Math.min(2.2, (vw * 0.86) / w)
    setGeom({
      scale,
      dx: vw / 2 - (w * scale) / 2 - head.left,
      dy: vh / 2 - (head.top + h / 2),
    })
  }, [head])

  // Fold down to MD/AIA on arrival, unless the header itself is showing the full name (touch)
  useEffect(() => {
    if (!geom) return
    const stayFull = window.matchMedia('(hover: none)').matches
    const t1 = setTimeout(() => { if (!stayFull) setExpanded(false) }, COLLAPSE_AT)
    const t2 = setTimeout(finish, DONE_AT)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geom])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-red"
        initial={{ opacity: 1 }}
        animate={{ opacity: geom ? 0 : 1 }}
        transition={{ duration: 1.1, delay: geom ? 0.9 : 0, ease: [0.4, 0, 0.2, 1] }}
      />
      {head && (
        <motion.p
          ref={textRef}
          className="absolute font-bold text-paper whitespace-nowrap"
          style={{
            left: head.left,
            top: head.top,
            fontSize: head.fontSize,
            lineHeight: head.lineHeight,
            transformOrigin: 'left center',
            opacity: 0,
          }}
          initial={false}
          animate={
            geom
              ? {
                  opacity: [0, 1, 1, 1],
                  x: [geom.dx, geom.dx, geom.dx, 0],
                  y: [geom.dy + 14, geom.dy, geom.dy, 0],
                  scale: [geom.scale, geom.scale, geom.scale, 1],
                }
              : { opacity: 0 }
          }
          transition={{ duration: GLIDE, times: [0, 0.22, 0.45, 1], ease }}
        >
          <Wordmark expanded={expanded} />
        </motion.p>
      )}
    </div>
  )
}

export default Intro
