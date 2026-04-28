import { useEffect, useRef, useState } from 'react'
import Dither from './Dither'

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

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-screen h-screen bg-dark-900 flex flex-col items-center pt-16 flex-shrink-0 overflow-hidden transition-all duration-1000"
      style={{
        opacity: isVisible ? 1 : 0.7,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
      }}
    >
      {/* Title Box */}
      <div className="relative w-[85vw] max-w-[1000px] h-[140px] rounded-none overflow-visible border border-[#7c3aed]/50 mx-auto flex-shrink-0" style={{
        boxShadow: `0 0 40px rgba(169, 85, 247, 0.4),
                    0 0 80px rgba(169, 85, 247, 0.25),
                    0 0 120px rgba(124, 58, 237, 0.15),
                    inset 0 0 60px rgba(169, 85, 247, 0.1)`
      }}>
        <div className="absolute inset-0 z-0">
          <Dither
            waveSpeed={0.05}
            waveFrequency={3}
            waveAmplitude={0.3}
            waveColor={[0.3, 0.3, 0.4]}
            colorNum={4}
            pixelSize={2}
            enableMouseInteraction={false}
            mouseRadius={1}
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-[#05030a]/38" />
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.10),rgba(59,130,246,0.06))]" />
        <div
          className="absolute inset-0 z-[3] rounded-none pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 22.5px rgba(0,0,0,0.18), inset 0 0 52.5px rgba(0,0,0,0.22), inset 0 0 82.5px rgba(0,0,0,0.16)',
            backdropFilter: 'blur(1.1px)',
            WebkitBackdropFilter: 'blur(1.1px)',
          }}
        />
        <div
          className="absolute inset-0 z-[4] rounded-none pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0) 48%, rgba(0,0,0,0.10) 72%, rgba(0,0,0,0.22) 100%)',
          }}
        />
        <div
          className="absolute inset-0 z-[5] rounded-none pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(168,85,247,0.14), inset 0 0 0 2px rgba(255,255,255,0.02)',
          }}
        />
        <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
          <h2 className="text-5xl md:text-6xl font-extrabold italic tracking-tight" style={{ color: '#ffffff' }}>
            Projects
          </h2>
        </div>
      </div>

      {/* Center Content */}
      <div className="flex-grow w-full flex items-center justify-center">
        <div className="flex flex-col items-center text-center px-6 max-w-3xl z-20">
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            puudub
          </h3>
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="w-full h-[140px] flex-shrink-0" />
    </section>
  )
}

export default Projects