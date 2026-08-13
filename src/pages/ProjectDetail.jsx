import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProjectById, projects, categories } from '../data/projects'
import { useEffect, useState, useMemo } from 'react'

const ease = [0.2, 0.6, 0.2, 1]

// Puffy, pill-shaped prev/next control — bigger tap target than a bare icon
function NavArrow({ to, state, direction, label, title }) {
  return (
    <Link
      to={to}
      state={state}
      aria-label={label}
      title={title}
      className="w-9 h-9 rounded-full bg-paper-2 border border-paper-3 flex items-center justify-center text-ink-3 hover:bg-red hover:border-red hover:text-paper transition-colors duration-150"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path strokeWidth={2} d={direction === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
      </svg>
    </Link>
  )
}

function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const project = getProjectById(id)
  const [imageError, setImageError] = useState({})
  const [imageLoaded, setImageLoaded] = useState({})

  // Direction of travel (1 = next, -1 = prev, 0 = direct link/refresh) drives the slide-in
  const slideDir = location.state?.dir ?? 0

  useEffect(() => {
    if (!project) navigate('/projects')
  }, [project, navigate])

  const handleImageError = (key) => {
    setImageError((prev) => ({ ...prev, [key]: true }))
  }

  const handleImageLoad = (key) => {
    setImageLoaded((prev) => ({ ...prev, [key]: true }))
  }

  const { category, nextProject, prevProject, galleryImages } = useMemo(() => {
    if (!project) return { category: null, nextProject: null, prevProject: null, galleryImages: [] }
    const cat = categories.find((c) => c.id === project.category)
    const idx = projects.findIndex((p) => p.id === id)
    return {
      category: cat,
      nextProject: projects[(idx + 1) % projects.length],
      prevProject: projects[(idx - 1 + projects.length) % projects.length],
      galleryImages: project.gallery.filter((img) => img !== project.coverImage),
    }
  }, [project, id])

  if (!project) return null

  const goPrev = () => navigate(`/projects/${prevProject.id}`, { state: { dir: -1 } })
  const goNext = () => navigate(`/projects/${nextProject.id}`, { state: { dir: 1 } })

  const handleDragEnd = (_e, info) => {
    const SWIPE_THRESHOLD = 90
    if (info.offset.x <= -SWIPE_THRESHOLD) goNext()
    else if (info.offset.x >= SWIPE_THRESHOLD) goPrev()
  }

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, x: slideDir * 48 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      onDragEnd={handleDragEnd}
    >

      {/* Header */}
      <div className="bg-paper border-b border-paper-3">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-8 lg:py-10">
          <motion.div
            initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease }}
          >
            <div className="flex items-center justify-between mb-8">
              <Link
                to={`/architecture?category=${project.category}`}
                className="inline-flex items-center gap-2 font-sans text-[0.5625rem] tracking-[0.14em] uppercase text-ink-3 hover:text-red transition-colors duration-150"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="square" strokeLinejoin="miter">
                  <path strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                All Projects
              </Link>

              <div className="flex items-center gap-3">
                <NavArrow
                  to={`/projects/${prevProject.id}`}
                  state={{ dir: -1 }}
                  direction="prev"
                  label={`Previous project: ${prevProject.title}`}
                  title={prevProject.title}
                />
                <NavArrow
                  to={`/projects/${nextProject.id}`}
                  state={{ dir: 1 }}
                  direction="next"
                  label={`Next project: ${nextProject.title}`}
                  title={nextProject.title}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <span className="font-sans text-[0.5625rem] tracking-[0.16em] uppercase text-red">
                  {category?.name}
                </span>
                <h1 className="mt-2 font-sans text-3xl md:text-4xl lg:text-5xl text-ink leading-tight">
                  {project.title}
                </h1>
              </div>
              <div className="text-right font-sans text-[0.5625rem] tracking-[0.14em] uppercase text-ink-4 space-y-1">
                <p>{project.location}</p>
                <p>{project.year}</p>
              </div>
            </div>

            <p className="mt-8 font-sans italic text-lg text-ink-2 max-w-prose leading-relaxed">
              {project.description}
            </p>

            {project.team?.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-x-10 gap-y-2">
                {project.team.map(({ role, name }) => (
                  <div key={role}>
                    <p className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4">{role}</p>
                    <p className="font-sans text-sm text-ink-2">{name}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Cover image */}
      <motion.div
        className="bg-paper-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.22, delay: 0.1, ease }}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-10 lg:py-14">
          <div className="aspect-[16/10] bg-paper-3 overflow-hidden">
            {!imageError['cover'] ? (
              <img
                src={project.coverImage}
                alt={project.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded['cover'] ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                decoding="async"
                onLoad={() => handleImageLoad('cover')}
                onError={() => handleImageError('cover')}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-ink-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="square" strokeLinejoin="miter">
                  <path strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="font-sans text-[0.5625rem] tracking-[0.14em] uppercase">/public/projects/{project.id}/cover.jpg</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <div className="bg-paper-2">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pb-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  className="aspect-[4/3] bg-paper-3 overflow-hidden"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.18, delay: i * 0.04, ease }}
                >
                  {!imageError[`g${i}`] ? (
                    <img
                      src={img}
                      alt={`${project.title} — ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        imageLoaded[`g${i}`] ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(`g${i}`)}
                      onError={() => handleImageError(`g${i}`)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="font-sans text-[0.5625rem] tracking-[0.14em] uppercase text-ink-4">{i + 1}.jpg</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Project navigation */}
      <div className="bg-paper border-t border-paper-3">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 divide-x divide-paper-3">
            <Link to={`/projects/${prevProject.id}`} state={{ dir: -1 }} className="group py-10 pr-8">
              <p className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4 mb-2">Previous</p>
              <p className="font-sans text-xl lg:text-2xl text-ink group-hover:text-red transition-colors duration-150">
                {prevProject.title}
              </p>
            </Link>
            <Link to={`/projects/${nextProject.id}`} state={{ dir: 1 }} className="group py-10 pl-8 text-right">
              <p className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4 mb-2">Next</p>
              <p className="font-sans text-xl lg:text-2xl text-ink group-hover:text-red transition-colors duration-150">
                {nextProject.title}
              </p>
            </Link>
          </div>
        </div>
      </div>

    </motion.div>
  )
}

export default ProjectDetail
