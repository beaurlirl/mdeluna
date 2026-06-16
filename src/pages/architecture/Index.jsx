import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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

function ArchitectureIndex() {
  const [imageIndex, setImageIndex] = useState(0)
  const [phase, setPhase] = useState('flashing')
  const [activeCategory, setActiveCategory] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

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

  const selectedImages = selectedProject
    ? selectedProject.gallery.filter((img) => {
        // Only show images we know exist (avoid broken img tags)
        return flashImages.includes(img) || img.startsWith('/petrossian') || img.startsWith('/pizza') || img.startsWith('/jewishacademy')
      })
    : []

  return (
    <div>

      {/* Flash — small centered window */}
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

      {/* Main content */}
      <AnimatePresence>
        {phase === 'list' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="max-w-screen-xl mx-auto px-6 lg:px-12 pt-5 pb-10"
          >

            {/* Micro category filter */}
            <div className="flex items-center gap-8 mb-5 pb-3 border-b border-paper-3">
              <button
                onClick={() => { setActiveCategory(null); setSelectedProject(null) }}
                className={`text-sm transition-colors duration-150 ${
                  !activeCategory ? 'text-ink border-b border-ink pb-0.5' : 'text-ink-3 hover:text-ink'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setSelectedProject(null) }}
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

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

              {/* Left — project list */}
              <div className="lg:col-span-5">
                {filtered.map((project, i) => (
                  <motion.button
                    key={project.id}
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease }}
                    onClick={() => setSelectedProject(
                      selectedProject?.id === project.id ? null : project
                    )}
                    className={`w-full text-left flex items-baseline gap-5 border-b border-paper-3 py-2.5 px-2 -mx-2 transition-colors duration-150 group ${
                      selectedProject?.id === project.id
                        ? 'bg-paper-2'
                        : 'hover:bg-paper-2'
                    }`}
                  >
                    <span className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4 w-10 flex-shrink-0">
                      {project.year}
                    </span>
                    <span className={`font-sans text-base lg:text-lg flex-grow transition-colors duration-150 ${
                      selectedProject?.id === project.id
                        ? 'text-red'
                        : 'text-ink group-hover:text-red'
                    }`}>
                      {project.title}
                    </span>
                    <span className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4 flex-shrink-0 hidden sm:block">
                      {project.location}
                    </span>
                  </motion.button>
                ))}

                {selectedProject && (
                  <div className="mt-5 pt-1">
                    <Link
                      to={`/projects/${selectedProject.id}`}
                      className="text-sm text-ink-3 hover:text-ink transition-colors duration-150"
                    >
                      View full project →
                    </Link>
                  </div>
                )}
              </div>

              {/* Right — images for selected project */}
              <div className="lg:col-span-7 flex flex-col items-end gap-3">
                <AnimatePresence mode="wait">
                  {selectedProject ? (
                    <motion.div
                      key={selectedProject.id}
                      className="w-full flex flex-col items-end gap-3"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      {selectedImages.length > 0 ? (
                        selectedImages.map((img, i) => (
                          <motion.img
                            key={img}
                            src={img}
                            alt={`${selectedProject.title} — ${i + 1}`}
                            className="w-full max-w-md lg:max-w-lg object-cover"
                            style={{ aspectRatio: '4/3' }}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: i * 0.08, ease }}
                          />
                        ))
                      ) : (
                        <div className="w-full max-w-md lg:max-w-lg bg-paper-2 border border-paper-3 flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
                          <span className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4">
                            {selectedProject.title}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      className="w-full max-w-md lg:max-w-lg bg-paper-2 border border-paper-3 flex items-center justify-center"
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

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default ArchitectureIndex
