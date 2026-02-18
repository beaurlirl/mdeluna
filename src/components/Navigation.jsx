import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { categories, getProjectsByCategory } from '../data/projects'

const servicesNavItems = [
  { name: 'Architecture', href: '/projects' },
  { name: 'Code', href: '/services' },
  { name: 'Zoning', href: '/services' },
  { name: 'Filing', href: '/services' },
]

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false)
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
    setProjectsDropdownOpen(false)
    setServicesDropdownOpen(false)
    setActiveCategory(null)
  }, [location])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProjectsDropdownOpen(false)
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

  const scheduleProjectsClose = () => {
    clearCloseTimeout()
    closeTimeoutRef.current = setTimeout(() => {
      setProjectsDropdownOpen(false)
      setActiveCategory(null)
    }, 250)
  }

  const scheduleServicesClose = () => {
    clearCloseTimeout()
    closeTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false)
    }, 250)
  }

  const navLinks = [
    { name: 'Our Work', href: '/projects', dropdown: 'projects' },
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
        <div className="flex items-center justify-between h-20 lg:h-24 lg:justify-center">

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12" ref={dropdownRef}>
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseLeave={() => {
                  if (link.dropdown === 'projects') {
                    scheduleProjectsClose()
                  }
                  if (link.dropdown === 'services') {
                    scheduleServicesClose()
                  }
                }}
              >
                {link.dropdown === 'projects' ? (
                  <button
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                      location.pathname.startsWith('/projects')
                        ? 'text-burgundy'
                        : idleTextClass
                    }`}
                    onClick={() => {
                      clearCloseTimeout()
                      setProjectsDropdownOpen(!projectsDropdownOpen)
                      setServicesDropdownOpen(false)
                    }}
                    onMouseEnter={() => {
                      clearCloseTimeout()
                      setProjectsDropdownOpen(true)
                      setServicesDropdownOpen(false)
                    }}
                  >
                    {link.name}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        projectsDropdownOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : link.dropdown === 'services' ? (
                  <button
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                      location.pathname.startsWith('/services')
                        ? 'text-burgundy'
                        : idleTextClass
                    }`}
                    onClick={() => {
                      clearCloseTimeout()
                      setServicesDropdownOpen(!servicesDropdownOpen)
                      setProjectsDropdownOpen(false)
                      setActiveCategory(null)
                    }}
                    onMouseEnter={() => {
                      clearCloseTimeout()
                      setServicesDropdownOpen(true)
                      setProjectsDropdownOpen(false)
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

                {/* Mega Dropdown */}
                <AnimatePresence>
                  {link.dropdown === 'projects' && projectsDropdownOpen && (
                    <motion.div
                      className="absolute top-full left-0 mt-4 bg-warm-white shadow-xl border border-light-gray"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={clearCloseTimeout}
                      onMouseLeave={scheduleProjectsClose}
                    >
                      <div className="flex">
                        {/* Categories */}
                        <div className="w-48 py-4 border-r border-light-gray">
                          <Link
                            to="/projects"
                            className="block px-6 py-2 text-sm font-medium text-charcoal hover:text-burgundy hover:bg-light-gray/30 transition-colors duration-200"
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

                        {/* Projects List */}
                        <div className="w-64 py-4">
                          {activeCategory ? (
                            getProjectsByCategory(activeCategory).map((project) => (
                              <Link
                                key={project.id}
                                to={`/projects/${project.id}`}
                                className="block px-6 py-2 text-sm text-mid-gray hover:text-burgundy transition-colors duration-200"
                              >
                                {project.title}
                              </Link>
                            ))
                          ) : (
                            <div className="px-6 py-2 text-sm text-mid-gray">
                              Hover over a category
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Services Dropdown */}
                <AnimatePresence>
                  {link.dropdown === 'services' && servicesDropdownOpen && (
                    <motion.div
                      className="absolute top-full left-0 mt-4 bg-warm-white shadow-xl border border-light-gray w-56"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={clearCloseTimeout}
                      onMouseLeave={scheduleServicesClose}
                    >
                      <div className="py-3">
                        {servicesNavItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block px-6 py-2 text-sm text-charcoal hover:text-burgundy hover:bg-light-gray/30 transition-colors duration-200"
                          >
                            {item.name}
                          </Link>
                        ))}
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
                to="/projects"
                className="block text-2xl font-light text-charcoal hover:text-burgundy transition-colors"
              >
                Our Work
              </Link>
              <div className="pl-4 space-y-3 border-l-2 border-light-gray">
                {categories.map((cat) => (
                  <div key={cat.id}>
                    <span className="text-sm font-medium text-charcoal">{cat.name}</span>
                    <div className="mt-2 space-y-2">
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
              <Link
                to="/services"
                className="block text-2xl font-light text-charcoal hover:text-burgundy transition-colors"
              >
                Services
              </Link>
              <div className="pl-4 space-y-2 border-l-2 border-light-gray">
                {servicesNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block text-sm text-mid-gray hover:text-burgundy transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
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

