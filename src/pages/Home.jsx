import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getFeaturedProjects } from '../data/projects'
import { siteInfo, services } from '../data/siteContent'
import ProjectCard from '../components/ProjectCard'

function Home() {
  const featuredProjects = getFeaturedProjects()

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[85vh] flex items-center pt-24 pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-charcoal leading-[0.95] tracking-tight">
              {siteInfo.name}
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-mid-gray font-light">
              {siteInfo.title}
            </p>
          </motion.div>

          <motion.p
            className="mt-8 lg:mt-12 text-lg md:text-xl text-mid-gray max-w-2xl leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {siteInfo.tagline}
          </motion.p>

          {/* Service Indicators */}
          <motion.div
            className="mt-12 lg:mt-16 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {services.map((service, index) => (
              <Link
                key={service.id}
                to={`/services#${service.id}`}
                className="group flex items-center gap-3 pr-6"
              >
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-burgundy transition-transform duration-300 group-hover:scale-110"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1, type: 'spring' }}
                >
                  <span className="text-warm-white font-medium text-sm">
                    {service.letter}
                  </span>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          <motion.div
            className="mt-12 lg:mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/contact"
              className="inline-block bg-charcoal text-warm-white font-medium text-sm tracking-wide px-8 py-4 rounded-full shadow-sm transition-all duration-300 hover:bg-burgundy hover:-translate-y-0.5 hover:shadow-md"
            >
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 border-t border-light-gray">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-end justify-between mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-charcoal">
                Selected Work
              </h2>
              <p className="mt-3 text-mid-gray text-lg">
                Featured projects from our portfolio
              </p>
            </div>
            <Link
              to="/projects"
              className="hidden md:block text-charcoal font-medium text-sm border-b border-charcoal pb-1 hover:text-burgundy hover:border-burgundy transition-colors duration-300"
            >
              View All Projects
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {featuredProjects.slice(0, 4).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <motion.div
            className="mt-12 text-center md:hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/projects"
              className="inline-block text-charcoal font-medium text-sm border-b border-charcoal pb-1"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Brief About */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-warm-white leading-tight">
              Full-service architecture firm integrating design, code compliance, and expediting.
            </h2>
            <p className="mt-8 text-light-gray text-lg leading-relaxed">
              {siteInfo.description}
            </p>
            <Link
              to="/about"
              className="inline-block mt-8 text-warm-white font-medium text-sm border-b border-warm-white pb-1 hover:text-burgundy hover:border-burgundy transition-colors duration-300"
            >
              Learn More About Us
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home

