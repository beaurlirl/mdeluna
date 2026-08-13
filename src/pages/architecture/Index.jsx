import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, categories } from '../../data/projects'
import { consultingProjects } from '../../data/siteContent'

const ease = [0.2, 0.6, 0.2, 1]
const EXPEDITING_ID = 'expediting'

// Expediting jobs live in siteContent.js with a different shape than projects.js —
// normalize to what the list/gallery UI expects (gallery array, no detail page).
const toExpeditingItem = (p) => ({
  id: `expediting-${p.id}`,
  title: p.title,
  year: '',
  location: p.borough,
  category: EXPEDITING_ID,
  gallery: p.image ? [p.image] : [],
  isExpediting: true,
})

const getListForCategory = (cat) => {
  if (cat === EXPEDITING_ID) return consultingProjects.map(toExpeditingItem)
  return cat ? projects.filter((p) => p.category === cat) : projects
}

function GalleryImage({ src, alt, fallbackLabel, delay }) {
  const [errored, setErrored] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (errored) {
    return (
      <div
        className="w-full bg-paper-2 border border-paper-3 flex items-center justify-center"
        style={{ aspectRatio: '4/3' }}
      >
        <span className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4">
          {fallbackLabel}
        </span>
      </div>
    )
  }

  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-full object-cover"
      style={{ aspectRatio: '4/3' }}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: loaded ? 1 : 0, y: 0 }}
      transition={{ duration: 0.25, delay, ease }}
      onLoad={() => setLoaded(true)}
      onError={() => setErrored(true)}
    />
  )
}

function ArchitectureIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')

  const [activeCategory, setActiveCategory] = useState(categoryParam || null)
  const [selectedProject, setSelectedProject] = useState(() => {
    const list = getListForCategory(categoryParam || null)
    return list[0] || null
  })

  // Sync active category when URL param changes (e.g. clicking a different dropdown item while already on the page),
  // and default the gallery to that category's first project so images show without a click.
  useEffect(() => {
    const cat = categoryParam || null
    setActiveCategory(cat)
    const list = getListForCategory(cat)
    setSelectedProject(list[0] || null)
  }, [categoryParam])

  const filtered = getListForCategory(activeCategory)

  const visibleImages = selectedProject ? selectedProject.gallery : []

  const handleCategoryClick = (catId) => {
    setSearchParams(catId === null ? {} : { category: catId })
  }

  return (
    <div>
      {/* Split layout — locked left, scrollable right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease }}
        className="flex flex-col lg:flex-row lg:h-[calc(100vh-var(--header-height,9rem))]"
      >

        {/* Left panel — locked on desktop, flows on mobile, fades in on entry */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="w-full lg:w-[38%] flex flex-col border-r border-paper-3 lg:overflow-hidden"
        >

          {/* Category filter */}
          <div className="flex items-center gap-4 px-6 lg:px-10 pt-3 pb-2 border-b border-paper-3 flex-shrink-0 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`text-[0.6875rem] whitespace-nowrap transition-colors duration-150 ${
                !activeCategory ? 'text-ink border-b border-ink pb-0.5' : 'text-ink-3 hover:text-ink'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`text-[0.6875rem] whitespace-nowrap transition-colors duration-150 ${
                  activeCategory === cat.id
                    ? 'text-ink border-b border-ink pb-0.5'
                    : 'text-ink-3 hover:text-ink'
                }`}
              >
                {cat.name}
              </button>
            ))}
            <button
              onClick={() => handleCategoryClick(EXPEDITING_ID)}
              className={`text-[0.6875rem] whitespace-nowrap transition-colors duration-150 ${
                activeCategory === EXPEDITING_ID
                  ? 'text-red border-b border-red pb-0.5'
                  : 'text-ink-3 hover:text-red'
              }`}
            >
              Expediting
            </button>
          </div>

          {/* Project list — capped height on mobile so it's a locked, scrollable box rather than
              pushing the preview panel far down the page; desktop keeps its own independent scroll. */}
          <div className="max-h-[176px] overflow-y-auto lg:max-h-none lg:flex-1 lg:overflow-y-auto px-6 lg:px-10 py-2">
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

            {selectedProject && !selectedProject.isExpediting && (
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
        </motion.div>

        {/* Right panel — scrollable. Sits directly below the (now height-capped) list on mobile, so the selected job's photo is visible without scrolling past the whole list. */}
        <div className="w-full lg:flex-1 lg:overflow-y-auto p-6 lg:p-8 flex flex-col gap-4">
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
                    <GalleryImage
                      key={img}
                      src={img}
                      alt={`${selectedProject.title} — ${i + 1}`}
                      fallbackLabel={selectedProject.title}
                      delay={i * 0.08}
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
    </div>
  )
}

export default ArchitectureIndex
