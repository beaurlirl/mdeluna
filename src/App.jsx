import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import Intro from './components/Intro'
import { startSmoothScroll, scrollToTop } from './lib/smoothScroll'

// lazy() plus a preload() handle so chunks can be fetched ahead of navigation
function lazyWithPreload(factory) {
  const Component = lazy(factory)
  Component.preload = factory
  return Component
}

const Home = lazyWithPreload(() => import('./pages/Home'))
const Projects = lazyWithPreload(() => import('./pages/Projects'))
const ProjectDetail = lazyWithPreload(() => import('./pages/ProjectDetail'))
const About = lazyWithPreload(() => import('./pages/About'))
const Contact = lazyWithPreload(() => import('./pages/Contact'))
const Architecture = lazyWithPreload(() => import('./pages/architecture/Index'))
const Filing = lazyWithPreload(() => import('./pages/filing/Index'))
const Code = lazyWithPreload(() => import('./pages/code/Index'))
const Resources = lazyWithPreload(() => import('./pages/Resources'))
const Zoning = lazyWithPreload(() => import('./pages/zoning/Index'))

const pageEase = [0.4, 0, 0.2, 1]

// Old page fades out fully, then the new one eases in: no blank gap, no jump.
function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" onExitComplete={scrollToTop}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: pageEase } }}
        exit={{ opacity: 0, transition: { duration: 0.28, ease: pageEase } }}
      >
        <Suspense fallback={<div className="min-h-screen bg-paper" />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/filing" element={<Filing />} />
            <Route path="/zoning" element={<Zoning />} />
            <Route path="/code" element={<Code />} />
            <Route path="/services" element={<Navigate to="/filing" replace />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

// Warm every route chunk once the first page is idle so navigation never waits on the network.
const preloadRoutes = () => {
  ;[Projects, ProjectDetail, About, Contact, Resources, Architecture, Filing, Code, Zoning].forEach((c) => c.preload?.())
}

function App() {
  useEffect(() => startSmoothScroll(), [])

  useEffect(() => {
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1500))
    idle(preloadRoutes)
  }, [])

  return (
    <Router>
      <Intro />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  )
}

export default App
