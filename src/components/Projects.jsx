import { useEffect, useRef, useState } from 'react'
import Dither from './Dither'
import DarkVeil from '../component/DarkVeil'

function Projects() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

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
      id: 'makeup',
      title: 'MakeUpByKristiKliimann',
      description: 'Professional makeup artist portfolio featuring gallery, services, client reviews, and online booking system',
      github: 'https://github.com/111markus/MakeUpByKristiKliimann.git',
      liveUrl: 'https://kristikliimannbeauty.onrender.com',
      type: 'website',
      image: `${import.meta.env.BASE_URL}projects/makeup-kristi.png`,
      
    },
    {
      id: 'h2katon',
      title: 'Suumadin',
      description: 'Interactive multiplayer party game where players give creative answers and vote on the best responses with real-time multiplayer support',
      github: 'https://github.com/marthansschmidt/H2katon.git',
      liveUrl: 'https://suumadin.onrender.com',
      type: 'project',
      image: `${import.meta.env.BASE_URL}projects/suumadin.png`,
      
    },
    {
      id: 'mangu',
      title: 'AimTrainer 3D',
      description: 'Precision training game with 3D interactive environment for improving accuracy and reaction time, featuring leaderboards and customizable settings',
      github: 'https://github.com/111markus/ManguProjekt.git',
      liveUrl: 'https://reactaim3d.onrender.com',
      type: 'game',
      image: `${import.meta.env.BASE_URL}projects/react-aim-3d.png`,
      
    },
    {
      id: 'hobileht',
      title: 'Carmelé Studios',
      description: 'Professional studio portfolio website with responsive design showcasing creative services and projects',
      github: 'https://github.com/marthansschmidt/hobileht_HMTL_CSS',
      liveUrl: 'https://carmelestudios.onrender.com',
      type: 'website',
      image: `${import.meta.env.BASE_URL}projects/hobileht.png`,
    
    }
  ]

  const projectsPerPage = 2
  const maxIndex = Math.ceil(projects.length / projectsPerPage) - 1

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const visibleProjects = projects.slice(
    currentIndex * projectsPerPage,
    (currentIndex + 1) * projectsPerPage
  )

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-screen min-h-screen bg-[#0f0b1a] flex flex-col items-center pt-16 pb-20 flex-shrink-0 overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0.7,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
      }}
    >
      {/* DarkVeil Background - Full width */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <DarkVeil
          hueShift={359}
          scanlineFrequency={0.5}
          scanlineIntensity={1}
          speed={0}
          noiseIntensity={0}
          warpAmount={0}
          resolutionScale={1}
        />
      </div>
      <style>
        {`
          .project-card {
            background: rgba(17, 12, 34, 0.6);
            border: 1px solid rgba(124, 58, 237, 0.3);
            border-radius: 12px;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
            display: flex;
            flex-direction: column;
            height: 100%;
            font-family: 'Inter', system-ui, sans-serif;
          }

          .project-card:hover {
            border-color: rgba(168, 85, 247, 0.6);
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.3),
                        0 0 60px rgba(124, 58, 237, 0.2),
                        inset 0 0 40px rgba(168, 85, 247, 0.05);
            transform: translateY(-8px) scale(1.01);
          }

          .project-preview {
            position: relative;
            width: 100%;
            height: 240px;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          @media (min-width: 768px) {
            .project-preview {
              height: 380px;
            }
          }

          .project-preview iframe {
            width: 100%;
            height: 100%;
            border: none;
            display: block;
          }



          .project-content {
            padding: 24px;
            flex: 1;
            display: flex;
            flex-direction: column;
            text-align: center;
          }

          .project-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
            font-family: 'Inter', system-ui, sans-serif;
          }

          @media (min-width: 768px) {
            .project-title {
              font-size: 1.5rem;
            }
          }

          .project-description {
            font-size: 0.95rem;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 16px;
            flex: 1;
            font-family: 'Inter', system-ui, sans-serif;
          }

          .project-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
          }

          .project-tag {
            font-size: 0.75rem;
            padding: 4px 12px;
            background: rgba(124, 58, 237, 0.2);
            border: 1px solid rgba(124, 58, 237, 0.4);
            border-radius: 20px;
            color: rgba(168, 85, 247, 0.9);
            transition: all 0.3s ease;
            font-family: 'Inter', system-ui, sans-serif;
          }

          .project-card:hover .project-tag {
            background: rgba(124, 58, 237, 0.3);
            border-color: rgba(168, 85, 247, 0.6);
            color: rgba(200, 130, 255, 1);
          }

          .project-links {
            display: flex;
            gap: 12px;
            padding-top: 16px;
            border-top: 1px solid rgba(124, 58, 237, 0.2);
            justify-content: center;
          }

          .project-link {
            flex: 1;
            padding: 10px 16px;
            background: rgba(124, 58, 237, 0.15);
            border: 1px solid rgba(124, 58, 237, 0.3);
            border-radius: 6px;
            color: rgba(168, 85, 247, 0.9);
            text-decoration: none;
            text-align: center;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all 0.3s ease;
            cursor: pointer;
            font-family: 'Inter', system-ui, sans-serif;
          }

          .project-link:hover {
            background: rgba(124, 58, 237, 0.3);
            border-color: rgba(168, 85, 247, 0.6);
            color: rgba(200, 130, 255, 1);
          }

          .projects-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
            width: 100%;
            max-width: 1400px;
            padding: 0 16px;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }

          @media (min-width: 640px) {
            .projects-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 28px;
              padding: 0 20px;
            }
          }

          @media (min-width: 1024px) {
            .projects-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 32px;
            }
          }
        `}
      </style>

      {/* Title Box */}
      <div className="relative w-[95vw] max-w-[1100px] h-[140px] rounded-none overflow-visible border border-[#7c3aed]/50 mx-auto flex-shrink-0 mb-24 z-20" style={{
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
          <h2 className="text-5xl md:text-6xl font-extrabold italic tracking-tight" style={{ color: '#ffffff', fontFamily: "'Inter', system-ui, sans-serif" }}>
            Projects
          </h2>
        </div>
      </div>

      {/* Projects Grid with Horizontal Navigation */}
      <div 
        className="flex items-center justify-center gap-8 z-20 mt-6 w-full select-none"
      >
        {/* Back Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 font-bold text-2xl flex-shrink-0 z-50"
          style={{
            background: currentIndex === 0 ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.4)',
            border: currentIndex === 0 ? '1px solid rgba(124, 58, 237, 0.2)' : '1px solid rgba(168, 85, 247, 0.6)',
            color: currentIndex === 0 ? 'rgba(168, 85, 247, 0.4)' : 'rgba(200, 130, 255, 1)',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) => {
            if (currentIndex > 0) {
              e.currentTarget.style.background = 'rgba(168, 85, 247, 0.6)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.5)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = currentIndex === 0 ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.4)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          ←
        </button>
        {/* Projects Grid */}
        <div className="projects-grid">
          {visibleProjects.map((project) => (
            <div key={project.id} className="project-card">
              {/* Preview Section */}
              <div 
                className="project-preview cursor-pointer"
                onClick={() => project.liveUrl && window.open(project.liveUrl, '_blank')}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-300 hover:scale-110"
                    style={{
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      opacity: 0.7,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.7'
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ color: '#ffffff' }}>
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Navigation Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
          className="flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 font-bold text-2xl flex-shrink-0"
          style={{
            background: currentIndex === maxIndex ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.4)',
            border: currentIndex === maxIndex ? '1px solid rgba(124, 58, 237, 0.2)' : '1px solid rgba(168, 85, 247, 0.6)',
            color: currentIndex === maxIndex ? 'rgba(168, 85, 247, 0.4)' : 'rgba(200, 130, 255, 1)',
            cursor: currentIndex === maxIndex ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) => {
            if (currentIndex < maxIndex) {
              e.target.style.background = 'rgba(168, 85, 247, 0.6)'
              e.target.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.5)'
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.background = currentIndex === maxIndex ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.4)'
            e.target.style.boxShadow = 'none'
          }}
        >
          →
        </button>
      </div>

    </section>
  )
}

export default Projects