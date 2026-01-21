import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categories } from '../data/projects'

function ProjectCard({ project, index = 0 }) {
  const [imageError, setImageError] = useState(false)
  const category = categories.find(c => c.id === project.category)

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="group block transition-transform duration-300 hover:-translate-y-1"
      >
        {/* Image */}
        <div className="aspect-[4/3] bg-light-gray overflow-hidden relative rounded-lg shadow-sm">
          {!imageError ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-mid-gray">
              <div className="text-center p-6">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs font-mono">/public/projects/{project.id}/cover.jpg</p>
              </div>
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
        </div>

        {/* Content */}
        <div className="mt-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-xl lg:text-2xl text-charcoal group-hover:text-burgundy transition-colors duration-300">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-mid-gray">
                {category?.name} · {project.location}
              </p>
            </div>
            <span className="text-sm text-mid-gray flex-shrink-0">
              {project.year}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default ProjectCard

