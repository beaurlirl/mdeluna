import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navigation from './Navigation'
import Footer from './Footer'

function Layout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isSplitPage = location.pathname === '/architecture' || location.pathname === '/filing'
  const isLocked = isHome || isSplitPage

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
      {!isHome && (isSplitPage ? <div className="lg:hidden"><Footer /></div> : <Footer />)}
    </div>
  )
}

export default Layout
