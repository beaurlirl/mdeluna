import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categories } from '../data/projects'

const ease = [0.2, 0.6, 0.2, 1]

function ProjectCard({ project, index = 0 }) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const category = categories.find((c) => c.id === project.category)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.18, delay: index * 0.04, ease }}
    >
      <Link to={`/projects/${project.id}`} className="flex items-center gap-6 lg:gap-10 py-5 group">

        {/* Thumbnail */}
        <div className="w-20 h-16 lg:w-28 lg:h-20 flex-shrink-0 bg-paper-2 overflow-hidden">
          {!imageError ? (
            <img
              src={project.coverImage}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-cover transition-[opacity,transform] duration-200 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-6 h-6 text-ink-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="square" strokeLinejoin="miter">
                <path strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="flex-grow min-w-0">
          <p className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4 mb-1">
            {category?.name} · {project.location} · {project.year}
          </p>
          <h3 className="font-sans text-xl lg:text-2xl text-ink group-hover:text-red transition-colors duration-150 truncate">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-ink-3 line-clamp-1 hidden md:block">{project.description}</p>
        </div>

        {/* Type pill + arrow */}
        <div className="flex-shrink-0 flex items-center gap-4 hidden sm:flex">
          <span className="font-sans text-[0.5rem] tracking-[0.14em] uppercase border border-paper-3 text-ink-4 px-3 py-1 rounded-full">
            {category?.name}
          </span>
          <svg
            className="w-4 h-4 text-ink-4 group-hover:text-red transition-colors duration-150"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
            strokeLinecap="square" strokeLinejoin="miter"
          >
            <path strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>

      </Link>
    </motion.div>
  )
}

export default ProjectCard
