import Lenis from 'lenis'

let lenis = null

// Eased wheel/touch scrolling site-wide. Skipped for reduced-motion users.
export function startSmoothScroll() {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 })
  let raf
  const loop = (t) => {
    lenis.raf(t)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
  return () => {
    cancelAnimationFrame(raf)
    lenis.destroy()
    lenis = null
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}

export function scrollToElement(el) {
  const offset = -(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 144) - 16
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.2 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
