import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navigation from './Navigation'
import Footer from './Footer'
import { projects } from '../data/projects'

function Layout({ children }) {
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean)
  const projectId = pathSegments[1]
  const project = location.pathname.startsWith('/projects/') 
    ? projects.find((item) => item.id === projectId)
    : null
  const breadcrumbs = (() => {
    if (location.pathname === '/') return []
    const items = [{ name: 'Home', href: '/' }]
    if (location.pathname.startsWith('/projects')) {
      items.push({ name: 'Portfolio', href: '/projects' })
      if (project) {
        items.push({ name: project.title, href: location.pathname })
      }
      return items
    }
    if (location.pathname.startsWith('/services')) {
      items.push({ name: 'Services', href: '/services' })
      return items
    }
    if (location.pathname.startsWith('/about')) {
      items.push({ name: 'About', href: '/about' })
      return items
    }
    if (location.pathname.startsWith('/contact')) {
      items.push({ name: 'Contact', href: '/contact' })
      return items
    }
    if (pathSegments.length) {
      items.push({ name: pathSegments[0].replace(/-/g, ' '), href: location.pathname })
    }
    return items
  })()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-warm-white flex flex-col">
      <Navigation />
      <motion.main
        className="flex-grow"
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {breadcrumbs.length > 1 && (
          <div className="pt-24 lg:pt-28">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <nav className="flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-mid-gray">
                {breadcrumbs.map((crumb, index) => {
                  const isLast = index === breadcrumbs.length - 1
                  return (
                    <div key={`${crumb.name}-${crumb.href}`} className="flex items-center gap-2">
                      {isLast ? (
                        <span className="text-charcoal">{crumb.name}</span>
                      ) : (
                        <Link to={crumb.href} className="hover:text-burgundy transition-colors">
                          {crumb.name}
                        </Link>
                      )}
                      {!isLast && <span className="text-light-gray">/</span>}
                    </div>
                  )
                })}
              </nav>
            </div>
          </div>
        )}
        {children}
      </motion.main>
      <Footer />
    </div>
  )
}

export default Layout

