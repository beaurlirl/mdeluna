import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Architecture = lazy(() => import('./pages/architecture/Index'))
const Filing = lazy(() => import('./pages/filing/Index'))
const Code = lazy(() => import('./pages/code/Index'))

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-paper">
            <span className="font-sans text-[0.625rem] tracking-[0.16em] uppercase text-ink-4">Loading…</span>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/filing" element={<Filing />} />
            {/* Zoning content isn't built yet — show the Filing page for now */}
            <Route path="/zoning" element={<Filing />} />
            <Route path="/code" element={<Code />} />
            <Route path="/services" element={<Navigate to="/filing" replace />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default App
