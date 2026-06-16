import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navigation from './Navigation'
import Footer from './Footer'

function Layout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isLocked = isHome || location.pathname === '/architecture' || location.pathname === '/filing'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navigation />
      <motion.main
        className={`flex-grow site-header-offset ${isHome ? 'lg:overflow-hidden' : ''}`}
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.2, 0.6, 0.2, 1] }}
      >
        {children}
      </motion.main>
      {!isLocked && <Footer />}
    </div>
  )
}

export default Layout
