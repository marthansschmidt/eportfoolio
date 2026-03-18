import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'
import { useEffect, useRef, useState } from 'react'

function About() {
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

  const skills = [
    'React',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Tailwind CSS',
    'Figma',
    'Git',
    'UI/UX',
  ]

  const headerAnim = useScrollAnimation()
  const bioAnim = useScrollAnimation({ threshold: 0.2 })
  const { containerRef: skillsRef, visibleItems } = useStaggerAnimation(skills.length, 80)

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-screen h-screen py-32 bg-dark-800 flex flex-col justify-center flex-shrink-0 transition-all duration-1000"
      style={{
        opacity: isVisible ? 1 : 0.7,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
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
            01 — About
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 tracking-tight">
            Who I am
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Bio */}
          <div
            ref={bioAnim.ref}
            className={`transition-all duration-1000 delay-200 ease-out ${
              bioAnim.isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-10'
            }`}
          >
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              I'm a creative developer and designer who loves building modern
              web solutions. I focus on details and user experience.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              My goal is to create solutions that not only look great
              but also work exceptionally well.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              When I'm not coding, you can find me exploring new technologies
              and seeking inspiration.
            </p>
          </div>

          {/* Skills */}
          <div>
            <h3
              className={`text-xl font-semibold mb-6 text-white transition-all duration-700 ${
                bioAnim.isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
            >
              Skills & Tools
            </h3>
            <div ref={skillsRef} className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={skill}
                  className={`px-4 py-2 bg-dark-600 text-gray-300 rounded-full text-sm
                           hover:bg-accent hover:text-white hover:scale-110
                           transition-all duration-300 cursor-default
                           ${visibleItems.includes(index)
                             ? 'opacity-100 translate-y-0 scale-100'
                             : 'opacity-0 translate-y-4 scale-95'
                           }`}
                  style={{
                    transitionDelay: visibleItems.includes(index) ? '0ms' : `${index * 80}ms`
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
