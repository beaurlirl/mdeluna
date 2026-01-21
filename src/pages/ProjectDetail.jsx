import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProjectById, projects, categories } from '../data/projects'
import { useEffect, useState } from 'react'

function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = getProjectById(id)
  const [imageError, setImageError] = useState({})

  useEffect(() => {
    if (!project) {
      navigate('/projects')
    }
  }, [project, navigate])

  if (!project) return null

  const category = categories.find(c => c.id === project.category)
  const projectIndex = projects.findIndex(p => p.id === id)
  const nextProject = projects[(projectIndex + 1) % projects.length]
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length]

  const handleImageError = (imageKey) => {
    setImageError(prev => ({ ...prev, [imageKey]: true }))
  }

  return (
    <div className="pt-20 lg:pt-28 pb-20 lg:pb-32">
      {/* Header */}
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-mid-gray hover:text-charcoal transition-colors duration-300 mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <span className="text-burgundy text-sm font-medium uppercase tracking-wide">
                {category?.name}
              </span>
              <h1 className="mt-2 font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal">
                {project.title}
              </h1>
            </div>
            <div className="text-right">
              <p className="text-mid-gray">{project.location}</p>
              <p className="text-mid-gray">{project.year}</p>
            </div>
          </div>

          <p className="mt-8 text-lg text-mid-gray max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </motion.div>
      </div>

      {/* Cover Image */}
      <motion.div
        className="mt-12 lg:mt-16 px-6 lg:px-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="aspect-[16/10] bg-light-gray overflow-hidden">
            {!imageError['cover'] ? (
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={() => handleImageError('cover')}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-mid-gray">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">Add cover.jpg to:</p>
                  <p className="text-xs mt-1 font-mono">/public/projects/{project.id}/</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Gallery */}
      <div className="mt-8 lg:mt-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {project.gallery.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-[4/3] bg-light-gray overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {!imageError[`gallery-${index}`] ? (
                  <img
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(`gallery-${index}`)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-mid-gray">
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs font-mono">{index + 1}.jpg</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Navigation */}
      <div className="mt-20 lg:mt-32 border-t border-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 gap-6">
            <Link
              to={`/projects/${prevProject.id}`}
              className="group py-8 lg:py-12"
            >
              <span className="text-sm text-mid-gray">Previous</span>
              <p className="mt-2 font-display text-xl lg:text-2xl text-charcoal group-hover:text-burgundy transition-colors duration-300">
                {prevProject.title}
              </p>
            </Link>
            <Link
              to={`/projects/${nextProject.id}`}
              className="group py-8 lg:py-12 text-right"
            >
              <span className="text-sm text-mid-gray">Next</span>
              <p className="mt-2 font-display text-xl lg:text-2xl text-charcoal group-hover:text-burgundy transition-colors duration-300">
                {nextProject.title}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail

