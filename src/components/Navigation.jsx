import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { categories, getProjectsByCategory, projects } from '../data/projects'
import { services } from '../data/siteContent'

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const dropdownRef = useRef(null)
  const closeTimeoutRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const useLightNav = isHome && !scrolled
  const idleTextClass = useLightNav
    ? 'text-warm-white hover:text-burgundy'
    : 'text-charcoal hover:text-burgundy'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setServicesDropdownOpen(false)
    setActiveCategory(null)
  }, [location])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false)
        setActiveCategory(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const scheduleServicesClose = () => {
    clearCloseTimeout()
    closeTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false)
    }, 250)
  }

  const navLinks = [
    { name: 'Services', href: '/services', dropdown: 'services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-warm-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">

          {/* Logo / Name */}
          <Link
            to="/"
            className={`font-display text-base font-medium tracking-wide transition-colors duration-300 ${
              useLightNav ? 'text-warm-white hover:text-light-gray' : 'text-charcoal hover:text-burgundy'
            }`}
          >
            Michael De Luna, AIA
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12" ref={dropdownRef}>
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseLeave={() => {
                  if (link.dropdown === 'services') {
                    scheduleServicesClose()
                  }
                }}
              >
                {link.dropdown === 'services' ? (
                  <button
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                      location.pathname.startsWith('/services') || location.pathname.startsWith('/projects')
                        ? 'text-burgundy'
                        : idleTextClass
                    }`}
                    onClick={() => {
                      clearCloseTimeout()
                      setServicesDropdownOpen(!servicesDropdownOpen)
                      setActiveCategory(null)
                    }}
                    onMouseEnter={() => {
                      clearCloseTimeout()
                      setServicesDropdownOpen(true)
                      setActiveCategory(null)
                    }}
                  >
                    {link.name}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        servicesDropdownOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      location.pathname === link.href
                        ? 'text-burgundy'
                        : idleTextClass
                    }`}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Services Dropdown */}
                <AnimatePresence>
                  {link.dropdown === 'services' && servicesDropdownOpen && (
                    <motion.div
                      className="absolute top-full right-0 mt-4 bg-warm-white/85 backdrop-blur-md shadow-xl border border-light-gray/60"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={clearCloseTimeout}
                      onMouseLeave={scheduleServicesClose}
                    >
                      <div className="flex">
                        {/* Architecture with Projects */}
                        <div className="border-r border-light-gray">
                          <Link
                            to="/projects"
                            className="block px-6 py-3 text-sm font-medium text-charcoal hover:text-burgundy hover:bg-light-gray/30 transition-colors duration-200 border-b border-light-gray"
                          >
                            Architecture
                          </Link>
                          <div className="flex">
                            <div className="w-48 py-4">
                              <Link
                                to="/projects"
                                className={`block px-6 py-2 text-sm font-medium transition-colors duration-200 ${
                                  !activeCategory ? 'text-burgundy bg-light-gray/30' : 'text-charcoal hover:text-burgundy hover:bg-light-gray/30'
                                }`}
                                onMouseEnter={() => setActiveCategory(null)}
                              >
                                All Projects
                              </Link>
                              {categories.map((cat) => (
                                <button
                                  key={cat.id}
                                  className={`w-full text-left px-6 py-2 text-sm transition-colors duration-200 ${
                                    activeCategory === cat.id
                                      ? 'text-burgundy bg-light-gray/30'
                                      : 'text-charcoal hover:text-burgundy hover:bg-light-gray/30'
                                  }`}
                                  onMouseEnter={() => setActiveCategory(cat.id)}
                                >
                                  {cat.name}
                                </button>
                              ))}
                            </div>
                            <div className="w-64 py-4 max-h-80 overflow-y-auto">
                              {(activeCategory ? getProjectsByCategory(activeCategory) : projects).map((project) => (
                                <Link
                                  key={project.id}
                                  to={`/projects/${project.id}`}
                                  className="block px-6 py-2 text-sm text-mid-gray hover:text-burgundy transition-colors duration-200"
                                >
                                  {project.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Expediting Services */}
                        <div className="w-64 py-4">
                          <Link
                            to="/services"
                            className="block px-6 py-3 text-sm font-medium text-charcoal hover:text-burgundy hover:bg-light-gray/30 transition-colors duration-200 border-b border-light-gray"
                          >
                            Expediting & Filing
                          </Link>
                          {services.map((service) => (
                            <Link
                              key={service.id}
                              to={`/services#${service.id}`}
                              className="block px-6 py-2 text-sm text-mid-gray hover:text-burgundy hover:bg-light-gray/30 transition-colors duration-200"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 relative z-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 ${useLightNav ? 'text-warm-white' : 'text-charcoal'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 top-20 bg-warm-white z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="px-6 py-8 space-y-6">
              <Link
                to="/services"
                className="block text-2xl font-light text-charcoal hover:text-burgundy transition-colors"
              >
                Services
              </Link>
              <div className="pl-4 space-y-3 border-l-2 border-light-gray">
                <div>
                  <Link
                    to="/projects"
                    className="text-sm font-medium text-charcoal hover:text-burgundy transition-colors"
                  >
                    Architecture
                  </Link>
                  <div className="mt-2 space-y-2 pl-4">
                    {categories.map((cat) => (
                      <div key={cat.id}>
                        <span className="text-xs font-medium text-mid-gray">{cat.name}</span>
                        <div className="mt-1 space-y-1">
                          {getProjectsByCategory(cat.id).map((project) => (
                            <Link
                              key={project.id}
                              to={`/projects/${project.id}`}
                              className="block text-sm text-mid-gray hover:text-burgundy transition-colors"
                            >
                              {project.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Link
                    to="/services"
                    className="text-sm font-medium text-charcoal hover:text-burgundy transition-colors"
                  >
                    Expediting & Filing
                  </Link>
                  <div className="mt-2 space-y-2 pl-4">
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        to={`/services#${service.id}`}
                        className="block text-sm text-mid-gray hover:text-burgundy transition-colors"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link
                to="/about"
                className="block text-2xl font-light text-charcoal hover:text-burgundy transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block text-2xl font-light text-charcoal hover:text-burgundy transition-colors"
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navigation

