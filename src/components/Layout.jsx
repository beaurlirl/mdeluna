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
    () => (location.pathname.startsWith('/projects/') ? projects.find((p) => p.id === projectId) : null),
    [location.pathname, projectId]
  )

  const breadcrumbs = useMemo(() => {
    if (location.pathname === '/') return []
    const items = [{ name: 'Home', href: '/' }]
    if (location.pathname.startsWith('/projects')) {
      items.push({ name: 'Projects', href: '/projects' })
      if (project) items.push({ name: project.title, href: location.pathname })
      return items
    }
    if (location.pathname.startsWith('/services')) return [...items, { name: 'Services', href: '/services' }]
    if (location.pathname.startsWith('/about'))    return [...items, { name: 'About', href: '/about' }]
    if (location.pathname.startsWith('/contact'))  return [...items, { name: 'Contact', href: '/contact' }]
    if (pathSegments.length) items.push({ name: pathSegments[0].replace(/-/g, ' '), href: location.pathname })
    return items
  }, [location.pathname, pathSegments, project])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navigation />
      <motion.main
        className="flex-grow"
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18, ease: [0.2, 0.6, 0.2, 1] }}
      >
        {breadcrumbs.length > 1 && (
          <div className="pt-[100px] border-b border-paper-3">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
              <nav className="flex items-center gap-2 py-3 font-mono text-[0.5625rem] tracking-[0.14em] uppercase text-ink-4">
                {breadcrumbs.map((crumb, i) => {
                  const isLast = i === breadcrumbs.length - 1
                  return (
                    <div key={`${crumb.name}-${crumb.href}`} className="flex items-center gap-2">
                      {isLast ? (
                        <span className="text-ink-2">{crumb.name}</span>
                      ) : (
                        <Link to={crumb.href} className="hover:text-red transition-colors duration-150">{crumb.name}</Link>
                      )}
                      {!isLast && <span>·</span>}
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
