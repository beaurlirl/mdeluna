import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, categories } from '../data/projects'
import ProjectCard from '../components/ProjectCard'

const ease = [0.2, 0.6, 0.2, 1]

function Projects() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = useMemo(
    () => (activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory)),
    [activeCategory]
  )

  return (
    <div>

      {/* Page header */}
      <div className="bg-paper border-b border-paper-3">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease }}
          >
            <p className="font-sans text-[0.625rem] tracking-[0.16em] uppercase text-red mb-4">Projects</p>
            <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl text-ink leading-tight">
              Architecture
            </h1>
            <p className="mt-4 font-sans italic text-lg text-ink-2 max-w-prose">
              Residential, commercial, and hospitality projects across New York City.
            </p>
          </motion.div>

          {/* Category filters */}
          <motion.div
            className="mt-10 flex flex-wrap gap-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.08, ease }}
          >
            <button
              onClick={() => setActiveCategory('all')}
              className={`font-sans text-[0.5625rem] tracking-[0.14em] uppercase px-4 py-2 rounded-full border transition-colors duration-150 ${
                activeCategory === 'all'
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-transparent text-ink-3 border-paper-3 hover:border-ink-3 hover:text-ink-2'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`font-sans text-[0.5625rem] tracking-[0.14em] uppercase px-4 py-2 rounded-full border transition-colors duration-150 ${
                  activeCategory === cat.id
                    ? 'bg-ink text-paper border-ink'
                    : 'bg-transparent text-ink-3 border-paper-3 hover:border-ink-3 hover:text-ink-2'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Project list */}
      <div className="bg-paper">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-10 lg:py-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease }}
            >
              {filtered.length > 0 ? (
                <div className="divide-y divide-paper-3 border-y border-paper-3">
                  {filtered.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                  ))}
                </div>
              ) : (
                <p className="py-20 text-center font-sans text-[0.625rem] tracking-[0.16em] uppercase text-ink-4">
                  No projects in this category yet.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Projects
