import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'
import { useEffect, useRef, useState } from 'react'

function Projects() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      id: 1,
      title: 'Project 1',
      description: 'Web application development and design',
      tags: ['React', 'Node.js', 'MongoDB'],
      image: null,
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'E-commerce platform',
      tags: ['Next.js', 'Stripe', 'Tailwind'],
      image: null,
    },
    {
      id: 3,
      title: 'Project 3',
      description: 'Mobile application',
      tags: ['React Native', 'Firebase'],
      image: null,
    },
    {
      id: 4,
      title: 'Project 4',
      description: 'Design system and UI kit',
      tags: ['Figma', 'Design System'],
      image: null,
    },
  ]

  const headerAnim = useScrollAnimation()
  const { containerRef: gridRef, visibleItems } = useStaggerAnimation(projects.length, 150)

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-screen h-screen py-32 bg-dark-900 flex flex-col justify-center flex-shrink-0 transition-all duration-1000"
      style={{
        opacity: isVisible ? 1 : 0.7,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:pr-40">
        {/* Section Header */}
        <div
          ref={headerAnim.ref}
          className={`mb-16 transition-all duration-1000 ease-out ${
            headerAnim.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            02 — Projects
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 tracking-tight">
            Selected Works
          </h2>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`group bg-dark-800 rounded-2xl overflow-hidden
                       hover:bg-dark-700 transition-all duration-500 cursor-pointer
                       hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/10
                       ${visibleItems.includes(index)
                         ? 'opacity-100 translate-y-0'
                         : 'opacity-0 translate-y-16'
                       }`}
              style={{
                transitionDuration: '700ms',
                transitionDelay: visibleItems.includes(index) ? '0ms' : `${index * 150}ms`
              }}
            >
              {/* Project Image Placeholder */}
              <div className="aspect-video bg-dark-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold text-dark-700 group-hover:text-dark-600
                                 group-hover:scale-110 transition-all duration-500">
                    {String(project.id).padStart(2, '0')}
                  </span>
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
                              -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2
                             group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-dark-600 text-gray-400 rounded-full
                               group-hover:bg-dark-500 group-hover:text-gray-300
                               transition-all duration-300"
                      style={{ transitionDelay: `${tagIndex * 50}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-500 ${
            visibleItems.length === projects.length
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-5'
          }`}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-accent hover:text-white
                     transition-colors duration-300 group"
          >
            <span>View all projects</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
