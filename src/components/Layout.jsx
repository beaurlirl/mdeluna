import { useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navigation from './Navigation'
import Footer from './Footer'
import { projects } from '../data/projects'

function Layout({ children }) {
  const location = useLocation()
  const pathSegments = useMemo(() => location.pathname.split('/').filter(Boolean), [location.pathname])
  const projectId = pathSegments[1]
  const isHome = location.pathname === '/'
  const project = useMemo(
    () => (location.pathname.startsWith('/projects/') ? projects.find((item) => item.id === projectId) : null),
    [location.pathname, projectId]
  )
  const breadcrumbs = useMemo(() => {
    if (location.pathname === '/') return []
    const items = [{ name: 'Home', href: '/' }]
    if (location.pathname.startsWith('/projects')) {
      items.push({ name: 'Projects', href: '/projects' })
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
  }, [location.pathname, pathSegments, project])

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
          <div className="pt-20 lg:pt-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <nav className="flex flex-wrap items-center gap-2 text-[0.7rem] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-mid-gray">
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
      {!isHome && <Footer />}
    </div>
  )
}

export default Layout

