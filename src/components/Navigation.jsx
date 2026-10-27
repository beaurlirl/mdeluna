import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const ease = [0.2, 0.6, 0.2, 1]

const Chevron = () => (
  <svg className="w-2.5 h-2.5 ml-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="square" strokeLinejoin="miter">
    <path strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const dropdownItems = {
  about: [
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  portfolio: [
    { label: 'Residential', to: '/architecture?category=residential' },
    { label: 'Commercial', to: '/architecture?category=commercial' },
    { label: 'Hospitality', to: '/architecture?category=hospitality' },
  ],
  expediting: [
    { label: 'All Expediting Services', to: '/filing' },
    { label: 'Approvals & Building Dept', to: '/filing#approvals' },
    { label: 'Work Permits', to: '/filing#work-permits' },
    { label: 'LPC Services', to: '/filing#landmarks' },
    { label: 'Certificates of Occupancy (Filing)', to: '/filing#occupancy-fire' },
    { label: 'OTCR & DOT Permits', to: '/filing#otcr-dot' },
  ],
  resources: [
    { label: 'All Resources & References', to: '/resources' },
    { label: 'DOB Forms & Applications', to: '/resources#dob-forms' },
    { label: 'DOB NOW & Online Systems', to: '/resources#online-systems' },
    { label: 'Codes, Bulletins & Notices', to: '/resources#codes-bulletins' },
    { label: 'Violations & Enforcement', to: '/resources#violations' },
    { label: 'Zoning, Landmarks & Other Agencies', to: '/resources#agencies' },
  ],
  code: [
    { label: 'All Code/Approval Information', to: '/code' },
    { label: 'Special Inspections', to: '/code#special-inspections' },
    { label: 'Apartment Approvals', to: '/code#apartment-approvals' },
    { label: 'Equipment Use Permits', to: '/code#equipment-permits' },
    { label: 'Restaurant Approvals', to: '/code#restaurant-approvals' },
    { label: 'Certificates of Occupancy (Code)', to: '/code#certificates-occupancy' },
  ],
}

function DropdownMenu({ items, align = 'left' }) {
  return (
    <motion.div
      className={`absolute top-full mt-0 bg-paper border border-paper-3 z-50 min-w-[180px] ${align === 'right' ? 'right-0' : 'left-0'}`}
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 3 }}
      transition={{ duration: 0.22, ease }}
    >
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="block px-4 py-2 text-sm text-ink-3 hover:text-ink hover:bg-paper-2 transition-colors duration-150 whitespace-nowrap"
        >
          {item.label}
        </Link>
      ))}
    </motion.div>
  )
}

function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const headerRef = useRef(null)
  const location = useLocation()

  // Track header height → CSS custom property for .site-header-offset
  useEffect(() => {
    if (!headerRef.current) return
    const update = () => {
      document.documentElement.style.setProperty(
        '--header-height',
        headerRef.current.offsetHeight + 'px'
      )
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(headerRef.current)
    return () => ro.disconnect()
  }, [])

  // Close on route change
  useEffect(() => {
    setActiveDropdown(null)
    setMobileOpen(false)
    setMobileExpanded(null)
  }, [location])

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('mobile-nav-open', mobileOpen)
    return () => document.body.classList.remove('mobile-nav-open')
  }, [mobileOpen])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const path = location.pathname
  // The Architecture page's "Expediting" tab shows filing/expediting work in-place —
  // while it's selected the header should read as Filing, not Architecture.
  const onExpeditingTab = path === '/architecture' && new URLSearchParams(location.search).get('category') === 'expediting'
  const isArchitecture = path.startsWith('/architecture') && !onExpeditingTab
  const isCode = path.startsWith('/code')
  const isFiling = path.startsWith('/filing') || onExpeditingTab

  // Row 3 active state per section
  const row3Active = (key) => {
    if (key === 'portfolio') return isArchitecture
    if (key === 'expediting') return isFiling
    if (key === 'code') return isCode
    if (key === 'resources') return path === '/resources'
    if (key === 'about') return path === '/about' || path === '/contact'
    return false
  }

  const toggleDropdown = (key) =>
    setActiveDropdown((prev) => (prev === key ? null : key))

  const row3Btn = (key, label, align = 'left') => (
    <div className="relative" key={key}>
      <button
        onClick={() => toggleDropdown(key)}
        className={`flex items-center gap-1.5 text-base font-medium transition-colors duration-150 ${
          row3Active(key) || activeDropdown === key
            ? 'text-red'
            : 'text-ink hover:text-red'
        }`}
      >
        {label}
        <Chevron />
      </button>
      <AnimatePresence>
        {activeDropdown === key && (
          <DropdownMenu items={dropdownItems[key]} align={align} />
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-paper">

      {/* Top bar — wordmark */}
      <div className="bg-red text-paper px-6 lg:px-12 py-3 lg:py-5">
        <Link to="/" className="flex flex-wrap items-center gap-x-5 gap-y-1 leading-none">
          <span data-wordmark className="font-bold whitespace-nowrap text-[clamp(1.25rem,2.6vw,2.5rem)] leading-[1.05]">
            Michael De Luna, AIA, <span className="text-ink">Architect</span>
          </span>
          <span className="hidden sm:block self-stretch w-px bg-paper/80" aria-hidden="true" />
          <span className="hidden sm:block font-medium text-[clamp(0.8rem,1.3vw,1.25rem)]">
            Architecture <span className="text-ink">+</span> Zoning <span className="text-ink">+</span> Expediting
          </span>
        </Link>
      </div>

      {/* Nav row */}
      <div className="px-6 lg:px-12 border-b border-paper-3">

        {/* Desktop */}
        <div className="hidden lg:flex items-center justify-between h-14 max-w-screen-xl mx-auto">
          <Link
            to="/"
            className={`text-base font-medium transition-colors duration-150 ${path === '/' ? 'text-red' : 'text-ink hover:text-red'}`}
          >
            Home
          </Link>
          {row3Btn('about', 'About Us')}
          {row3Btn('portfolio', 'Our Work')}
          {row3Btn('expediting', 'Expediting')}
          {row3Btn('code', 'Code/Approval Information')}
          {row3Btn('resources', 'Resources')}
          <Link
            to="/contact"
            className="bg-ink text-paper text-base px-5 py-1.5 hover:bg-red transition-colors duration-150"
          >
            Contact
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center justify-end h-10">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1 text-ink"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="square" strokeLinejoin="miter">
              {mobileOpen
                ? <path strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            data-lenis-prevent className="lg:hidden bg-paper border-t border-paper-3 overflow-y-auto max-h-[70vh]"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease }}
          >
            <div className="px-6 py-5 space-y-1">
              <Link to="/" className="block py-2 text-sm text-ink-3 hover:text-ink border-b border-paper-3">
                Home
              </Link>

              {[
                { key: 'about',      label: 'About Us' },
                { key: 'portfolio',  label: 'Our Work' },
                { key: 'expediting', label: 'Expediting' },
                { key: 'code',       label: 'Code/Approval Information' },
                { key: 'resources',  label: 'Resources' },
              ].map(({ key, label }) => (
                <div key={key} className="border-b border-paper-3">
                  <button
                    onClick={() => setMobileExpanded((p) => (p === key ? null : key))}
                    className="w-full flex items-center justify-between py-2 text-sm text-ink-3 hover:text-ink"
                  >
                    {label}
                    <svg
                      className={`w-3 h-3 transition-transform duration-150 ${mobileExpanded === key ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="square" strokeLinejoin="miter"
                    >
                      <path strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15, ease }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pb-3 space-y-2 border-l border-paper-3 ml-1">
                          {dropdownItems[key].map((item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              className="block text-sm text-ink-3 hover:text-ink transition-colors py-0.5"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <Link to="/contact" className="inline-block mt-3 bg-ink text-paper text-sm px-5 py-2">
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  )
}

export default Navigation
