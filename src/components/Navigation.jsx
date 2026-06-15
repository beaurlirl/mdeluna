import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { categories, getProjectsByCategory, projects } from '../data/projects'
import { services } from '../data/siteContent'

const ease = [0.2, 0.6, 0.2, 1]

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const dropdownRef = useRef(null)
  const closeTimerRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setServicesOpen(false)
    setActiveCategory(null)
  }, [location])

  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false)
        setActiveCategory(null)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  const clearClose = () => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null }
  }

  const scheduleClose = () => {
    clearClose()
    closeTimerRef.current = setTimeout(() => setServicesOpen(false), 220)
  }

  const isActive = (href) =>
    href === '/services'
      ? location.pathname.startsWith('/services') || location.pathname.startsWith('/projects')
      : location.pathname === href

  const navLinkClass = (href) =>
    `relative font-sans text-sm font-medium transition-colors duration-150 pb-0.5 ${
      isActive(href)
        ? 'text-red border-b-2 border-red'
        : 'text-ink-2 hover:text-ink border-b-2 border-transparent'
    }`

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Filing strip */}
      <div
        className={`bg-ink overflow-hidden transition-all duration-200`}
        style={{ height: scrolled ? 0 : undefined }}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-2 flex justify-center lg:justify-between items-center">
          <span className="font-sans text-[0.5625rem] tracking-[0.16em] uppercase text-ink-4">
            EST. 1994 · NEW YORK CITY · AIA · NCARB · NYS LIC. 024891
          </span>
          <span className="hidden lg:block font-sans text-[0.5625rem] tracking-[0.16em] uppercase text-ink-4">
            220 Congress St., Brooklyn
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div className={`bg-paper border-b transition-colors duration-200 ${scrolled ? 'border-paper-3' : 'border-paper-2'}`}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">

            <Link
              to="/"
              className="font-sans text-lg text-ink hover:text-red transition-colors duration-150 leading-tight"
            >
              Michael De Luna, AIA, Architect
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-10" ref={dropdownRef}>
              <div
                className="relative"
                onMouseLeave={scheduleClose}
              >
                <button
                  className={`relative font-sans text-sm font-medium transition-colors duration-150 pb-0.5 ${
                    isActive('/services')
                      ? 'text-red border-b-2 border-red'
                      : 'text-ink-2 hover:text-ink border-b-2 border-transparent'
                  }`}
                  onClick={() => { clearClose(); setServicesOpen(!servicesOpen); setActiveCategory(null) }}
                  onMouseEnter={() => { clearClose(); setServicesOpen(true); setActiveCategory(null) }}
                >
                  Services
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      className="absolute top-full right-0 mt-3 bg-paper border border-paper-3 shadow-[0_4px_12px_rgba(20,17,15,0.06)]"
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 2 }}
                      transition={{ duration: 0.15, ease }}
                      onMouseEnter={clearClose}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="flex">
                        {/* Architecture column */}
                        <div className="border-r border-paper-3">
                          <Link
                            to="/projects"
                            className="block px-5 py-2.5 font-sans text-[0.5625rem] tracking-[0.14em] uppercase text-ink-3 hover:text-red border-b border-paper-3 transition-colors duration-150"
                          >
                            Architecture
                          </Link>
                          <div className="flex">
                            <div className="w-44 py-3">
                              <Link
                                to="/projects"
                                className={`block px-5 py-1.5 text-sm transition-colors duration-150 ${
                                  !activeCategory ? 'text-red' : 'text-ink-2 hover:text-ink'
                                }`}
                                onMouseEnter={() => setActiveCategory(null)}
                              >
                                All Projects
                              </Link>
                              {categories.map((cat) => (
                                <button
                                  key={cat.id}
                                  className={`w-full text-left px-5 py-1.5 text-sm transition-colors duration-150 ${
                                    activeCategory === cat.id ? 'text-red' : 'text-ink-2 hover:text-ink'
                                  }`}
                                  onMouseEnter={() => setActiveCategory(cat.id)}
                                >
                                  {cat.name}
                                </button>
                              ))}
                            </div>
                            <div className="w-56 py-3 max-h-72 overflow-y-auto border-l border-paper-3">
                              {(activeCategory ? getProjectsByCategory(activeCategory) : projects).map((p) => (
                                <Link
                                  key={p.id}
                                  to={`/projects/${p.id}`}
                                  className="block px-5 py-1.5 text-sm text-ink-3 hover:text-ink transition-colors duration-150"
                                >
                                  {p.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Expediting column */}
                        <div className="w-60 py-3">
                          <Link
                            to="/services"
                            className="block px-5 py-2.5 font-sans text-[0.5625rem] tracking-[0.14em] uppercase text-ink-3 hover:text-red border-b border-paper-3 transition-colors duration-150 mb-1"
                          >
                            Expediting & Filing
                          </Link>
                          {services.map((s) => (
                            <Link
                              key={s.id}
                              to={`/services#${s.id}`}
                              className="block px-5 py-1.5 text-sm text-ink-3 hover:text-ink transition-colors duration-150"
                            >
                              {s.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/about"   className={navLinkClass('/about')}>About</Link>
              <Link to="/contact" className={navLinkClass('/contact')}>Contact</Link>
            </nav>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-ink"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="square" strokeLinejoin="miter">
                {mobileMenuOpen
                  ? <path strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-paper border-b border-paper-3"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease }}
          >
            <nav className="max-w-screen-xl mx-auto px-6 py-6 space-y-5">
              <Link to="/services" className="block text-xl font-sans text-ink hover:text-red transition-colors">Services</Link>
              <div className="pl-4 border-l border-paper-3 space-y-3">
                <Link to="/projects" className="block text-sm font-sans text-ink-2 hover:text-red transition-colors">Architecture — All Projects</Link>
                {categories.map((cat) => (
                  <div key={cat.id}>
                    <span className="font-sans text-[0.5625rem] tracking-[0.14em] uppercase text-ink-4">{cat.name}</span>
                    <div className="mt-1.5 space-y-1">
                      {getProjectsByCategory(cat.id).map((p) => (
                        <Link key={p.id} to={`/projects/${p.id}`} className="block text-sm text-ink-3 hover:text-ink transition-colors">{p.title}</Link>
                      ))}
                    </div>
                  </div>
                ))}
                <Link to="/services" className="block text-sm font-sans text-ink-2 hover:text-red transition-colors">Expediting & Filing</Link>
              </div>
              <Link to="/about"   className="block text-xl font-sans text-ink hover:text-red transition-colors">About</Link>
              <Link to="/contact" className="block text-xl font-sans text-ink hover:text-red transition-colors">Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navigation
