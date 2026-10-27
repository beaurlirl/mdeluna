import { useLocation } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'

function Layout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isSplitPage = location.pathname === '/architecture' || location.pathname === '/filing'
  const isLocked = isHome || isSplitPage

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navigation />
      <main className={`flex-grow site-header-offset ${isHome ? 'lg:overflow-hidden' : ''}`}>
        {children}
      </main>
      {!isHome && (isSplitPage ? <div className="lg:hidden"><Footer /></div> : <Footer />)}
    </div>
  )
}

export default Layout
