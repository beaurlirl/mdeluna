import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, categories } from '../../data/projects'

const ease = [0.2, 0.6, 0.2, 1]

const flashImages = [
  '/petrossian1.png',
  '/pizza1.png',
  '/jewishacademy1.png',
  '/petrossian2.png',
]

const FLASH_HOLD = 480
const FLASH_FADE = 220

const knownImages = new Set([
  '/petrossian1.png', '/petrossian2.png', '/pizza1.png', '/jewishacademy1.png',
])

function ArchitectureIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')

  // Skip flash if arriving via a category link
  const [imageIndex, setImageIndex] = useState(0)
  const [phase, setPhase] = useState(categoryParam ? 'list' : 'flashing')
  const [activeCategory, setActiveCategory] = useState(categoryParam || null)
  const [selectedProject, setSelectedProject] = useState(null)

  // Sync active category when URL param changes (e.g. clicking a different dropdown item while already on the page)
  useEffect(() => {
    setActiveCategory(categoryParam || null)
    setSelectedProject(null)
    if (categoryParam) setPhase('list')
  }, [categoryParam])

  useEffect(() => {
    if (phase !== 'flashing') return
    const isLast = imageIndex >= flashImages.length - 1
    const t = setTimeout(() => {
      if (isLast) setPhase('list')
      else setImageIndex((i) => i + 1)
    }, FLASH_HOLD)
    return () => clearTimeout(t)
  }, [imageIndex, phase])

  const filtered = activeCategory
    ? projects.filter((p) => p.category === activeCategory)
    : projects

  const visibleImages = selectedProject
    ? selectedProject.gallery.filter((img) => knownImages.has(img))
    : []

  const handleCategoryClick = (catId) => {
    setSelectedProject(null)
    if (catId === null) {
      setSearchParams({})
      setActiveCategory(null)
    } else {
      setSearchParams({ category: catId })
      setActiveCategory(catId)
    }
  }

  return (
    <div>
      {/* Flash sequence */}
      <AnimatePresence>
        {phase === 'flashing' && (
          <motion.div
            className="flex items-center justify-center"
            style={{ minHeight: 'calc(100vh - var(--header-height, 9rem))' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <motion.div
              className="relative overflow-hidden"
              style={{ width: '260px', aspectRatio: '4/3' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease }}
            >
              <AnimatePresence mode="sync">
                <motion.img
                  key={imageIndex}
                  src={flashImages[imageIndex]}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: FLASH_FADE / 1000, ease }}
                />
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Split layout — locked left, scrollable right */}
      <AnimatePresence>
        {phase === 'list' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease }}
            className="flex"
            style={{ height: 'calc(100vh - var(--header-height, 9rem))' }}
          >

            {/* Left panel — locked */}
            <div className="w-2/5 lg:w-[38%] flex flex-col border-r border-paper-3 overflow-hidden">

              {/* Category filter */}
              <div className="flex items-center gap-6 px-6 lg:px-10 pt-5 pb-3 border-b border-paper-3 flex-shrink-0">
                <button
                  onClick={() => handleCategoryClick(null)}
                  className={`text-sm transition-colors duration-150 ${
                    !activeCategory ? 'text-ink border-b border-ink pb-0.5' : 'text-ink-3 hover:text-ink'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`text-sm transition-colors duration-150 ${
                      activeCategory === cat.id
                        ? 'text-ink border-b border-ink pb-0.5'
                        : 'text-ink-3 hover:text-ink'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Project list */}
              <div className="flex-1 overflow-y-auto px-6 lg:px-10 py-2">
                {filtered.length > 0 ? (
                  filtered.map((project, i) => (
                    <motion.button
                      key={project.id}
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06, ease }}
                      onClick={() => setSelectedProject(
                        selectedProject?.id === project.id ? null : project
                      )}
                      className={`w-full text-left flex items-baseline gap-4 border-b border-paper-3 py-2 px-2 -mx-2 transition-colors duration-150 group ${
                        selectedProject?.id === project.id ? 'bg-paper-2' : 'hover:bg-paper-2'
                      }`}
                    >
                      <span className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4 w-10 flex-shrink-0">
                        {project.year}
                      </span>
                      <span className={`font-sans text-sm lg:text-base flex-grow transition-colors duration-150 ${
                        selectedProject?.id === project.id ? 'text-red' : 'text-ink group-hover:text-red'
                      }`}>
                        {project.title}
                      </span>
                      <span className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4 flex-shrink-0 hidden sm:block">
                        {project.location}
                      </span>
                    </motion.button>
                  ))
                ) : (
                  <p className="text-sm text-ink-4 py-6">No projects in this category yet.</p>
                )}

                {selectedProject && (
                  <div className="mt-4 pt-1">
                    <Link
                      to={`/projects/${selectedProject.id}`}
                      className="text-sm text-ink-3 hover:text-ink transition-colors duration-150"
                    >
                      View full project →
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right panel — scrollable */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-4">
              <AnimatePresence mode="wait">
                {selectedProject ? (
                  <motion.div
                    key={selectedProject.id}
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    {visibleImages.length > 0 ? (
                      visibleImages.map((img, i) => (
                        <motion.img
                          key={img}
                          src={img}
                          alt={`${selectedProject.title} — ${i + 1}`}
                          className="w-full object-cover"
                          style={{ aspectRatio: '4/3' }}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: i * 0.08, ease }}
                        />
                      ))
                    ) : (
                      <div
                        className="w-full bg-paper-2 border border-paper-3 flex items-center justify-center"
                        style={{ aspectRatio: '4/3' }}
                      >
                        <span className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4">
                          {selectedProject.title}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    className="w-full bg-paper-2 border border-paper-3 flex items-center justify-center"
                    style={{ aspectRatio: '4/3' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease }}
                  >
                    <span className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4">
                      Select a project
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ArchitectureIndex
