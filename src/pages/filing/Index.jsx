import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { services, consultingProjects } from '../../data/siteContent'

const ease = [0.2, 0.6, 0.2, 1]

function FilingIndex() {
  const [selectedService, setSelectedService] = useState(null)
  const [jobsOpen, setJobsOpen]               = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const jobsRowRef  = useRef(null)
  const scrollerRef = useRef(null)

  const handleServiceClick = (i) => {
    setSelectedProject(null)
    setSelectedService(selectedService === i ? null : i)
  }

  const handleJobsToggle = () => {
    const opening = !jobsOpen
    setJobsOpen(opening)
    if (opening) {
      setTimeout(() => {
        const el = jobsRowRef.current
        const container = scrollerRef.current
        if (!el || !container) return
        const elTop = el.getBoundingClientRect().top
        if (container.scrollHeight > container.clientHeight + 4) {
          const containerTop = container.getBoundingClientRect().top
          const target = container.scrollTop + (elTop - containerTop) - 16
          container.scrollTo({ top: target, behavior: 'smooth' })
        } else {
          window.scrollTo({ top: window.scrollY + elTop - 16, behavior: 'smooth' })
        }
      }, 60)
    }
  }

  const handleProjectClick = (proj) => {
    setSelectedService(null)
    setSelectedProject(selectedProject?.id === proj.id ? null : proj)
  }

  return (
    <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-var(--header-height,9rem))]">

      {/* ── Left panel — locked on desktop, flows on mobile ── */}
      <div className="w-full lg:w-[38%] flex flex-col border-r border-paper-3 lg:overflow-hidden">

        <div className="px-6 lg:px-10 pt-5 pb-4 border-b border-paper-3 flex-shrink-0">
          <p className="font-sans text-[0.5625rem] tracking-[0.14em] uppercase text-red mb-1">Expediting & Filing</p>
          <h1 className="font-sans text-xl font-bold text-ink leading-tight">NYC DOB Services</h1>
        </div>

        <div ref={scrollerRef} className="lg:flex-1 lg:overflow-y-auto px-6 lg:px-10 py-2">

          {/* ── Selected Expediting Jobs — same weight as service rows ── */}
          <div ref={jobsRowRef}>
            <button
              onClick={handleJobsToggle}
              className={`w-full text-left flex items-center justify-between gap-4 border-b border-paper-3 py-3 px-2 -mx-2 transition-colors duration-150 group ${
                jobsOpen ? 'bg-paper-2' : 'hover:bg-paper-2'
              }`}
            >
              <span className={`font-sans text-sm lg:text-base transition-colors duration-150 ${
                jobsOpen ? 'text-ink' : 'text-ink group-hover:text-red'
              }`}>
                Selected Expediting Jobs
              </span>
              <motion.svg
                animate={{ rotate: jobsOpen ? 180 : 0 }}
                transition={{ duration: 0.2, ease }}
                className="w-3.5 h-3.5 text-ink-4 flex-shrink-0"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                strokeLinecap="square" strokeLinejoin="miter"
              >
                <path strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>

            <AnimatePresence initial={false}>
              {jobsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease }}
                  className="overflow-hidden"
                >
                  {consultingProjects.map((proj, i) => (
                    <motion.button
                      key={proj.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15, delay: i * 0.025, ease }}
                      onClick={() => handleProjectClick(proj)}
                      className={`w-full text-left flex items-baseline justify-between gap-3 pl-5 pr-2 py-2.5 border-b border-paper-3 last:border-b-0 transition-colors duration-150 group ${
                        selectedProject?.id === proj.id ? 'bg-paper-2' : 'hover:bg-paper-2'
                      }`}
                    >
                      <span className={`font-sans text-sm leading-snug transition-colors duration-150 ${
                        selectedProject?.id === proj.id ? 'text-red' : 'text-ink group-hover:text-red'
                      }`}>
                        {proj.title}
                      </span>
                      <span className="font-sans text-[0.45rem] tracking-[0.12em] uppercase text-ink-4 flex-shrink-0 hidden sm:block">
                        {proj.borough}
                      </span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Service categories — same visual treatment as jobs row */}
          {services.map((s, i) => (
            <button
              key={s.id}
              onClick={() => handleServiceClick(i)}
              className={`w-full text-left flex items-start gap-4 border-b border-paper-3 py-3 px-2 -mx-2 transition-colors duration-150 group ${
                selectedService === i ? 'bg-paper-2' : 'hover:bg-paper-2'
              }`}
            >
              <span className={`font-sans font-bold text-xl leading-none mt-0.5 w-6 flex-shrink-0 transition-colors duration-150 ${
                selectedService === i ? 'text-red' : 'text-ink-4 group-hover:text-red'
              }`}>
                {s.letter}
              </span>
              <span className={`font-sans text-sm lg:text-base leading-snug transition-colors duration-150 ${
                selectedService === i ? 'text-red' : 'text-ink group-hover:text-red'
              }`}>
                {s.title}
              </span>
            </button>
          ))}

        </div>

        <div className="border-t border-paper-3 px-6 lg:px-10 py-3 flex-shrink-0">
          <p className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4">1,800+ projects · All five boroughs</p>
        </div>
      </div>

      {/* ── Right panel — scrollable ── */}
      <div className="w-full lg:flex-1 lg:overflow-y-auto">
        <AnimatePresence mode="wait">

          {selectedService !== null && (
            <motion.div
              key={`svc-${services[selectedService].id}`}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease }}
              className="px-8 lg:px-14 pt-8 pb-16"
            >
              <p className="font-sans text-[0.5625rem] tracking-[0.14em] uppercase text-red mb-3">Services</p>
              <h2 className="font-sans text-2xl lg:text-3xl font-bold text-ink leading-tight mb-8 pb-5 border-b border-paper-3">
                {services[selectedService].title}
              </h2>
              <ul>
                {services[selectedService].details.map((detail, i) => (
                  <motion.li
                    key={detail}
                    initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04, ease }}
                    className="flex items-start gap-4 py-3 border-b border-paper-3 last:border-b-0"
                  >
                    <span className="text-red flex-shrink-0 font-bold mt-0.5">·</span>
                    <span className="font-sans text-base lg:text-lg text-ink-2 leading-snug">{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {selectedProject && selectedService === null && (
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease }}
              className="p-8 flex flex-col gap-3"
            >
              <p className="font-sans text-[0.5625rem] tracking-[0.14em] uppercase text-red">Expediting Job</p>
              <h2 className="font-sans text-xl lg:text-2xl font-bold text-ink leading-tight">{selectedProject.title}</h2>
              <p className="font-sans text-sm text-ink-4 mb-2">{selectedProject.address} · {selectedProject.borough}</p>
              <div
                className="w-full bg-paper-2 border border-paper-3 flex items-center justify-center"
                style={{ aspectRatio: '4/3' }}
              >
                <span className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4">{selectedProject.title}</span>
              </div>
            </motion.div>
          )}

          {selectedService === null && !selectedProject && (
            <motion.div
              key="empty"
              className="h-full flex items-center justify-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease }}
            >
              <p className="font-sans text-[0.5rem] tracking-[0.14em] uppercase text-ink-4">Select a service or job</p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  )
}

export default FilingIndex
