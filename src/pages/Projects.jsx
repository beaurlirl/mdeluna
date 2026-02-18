import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, categories } from '../data/projects'
import ProjectCard from '../components/ProjectCard'

function Projects() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = useMemo(
    () => (activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory)),
    [activeCategory]
  )

  return (
    <div className="pt-20 lg:pt-28 pb-20 lg:pb-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal">
            Projects
          </h1>
          <p className="mt-4 text-mid-gray text-lg max-w-2xl">
            A selection of residential, commercial, and hospitality projects across New York City.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="mt-10 lg:mt-14 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-charcoal text-warm-white shadow-sm'
                : 'bg-transparent text-charcoal border border-light-gray hover:border-charcoal'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-charcoal text-warm-white shadow-sm'
                  : 'bg-transparent text-charcoal border border-light-gray hover:border-charcoal'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="mt-12 lg:mt-16"
          layout
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="mt-20 text-center text-mid-gray"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>No projects in this category yet.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Projects

