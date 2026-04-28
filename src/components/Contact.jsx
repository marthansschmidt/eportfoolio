import { useEffect, useRef, useState } from 'react'
import LogoLoop from './LogoLoop'
import Dither from './Dither'

function Contact() {
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

  const techLogos = [
    { src: `${import.meta.env.BASE_URL}vite.svg`, link: null },
    { src: `${import.meta.env.BASE_URL}linkedin.webp`, link: 'https://linkedin.com' },
    { src: `${import.meta.env.BASE_URL}spotify.png`, link: 'https://open.spotify.com/playlist/5Vn7Rk6XjJ8uoWHywlQUGr?si=64a9b813a79041af' },
    { src: `${import.meta.env.BASE_URL}github.png`, link: 'https://github.com/marthansschmidt' },
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-screen h-screen bg-[#05030a] flex flex-col justify-between items-center pt-16 pb-12 flex-shrink-0 overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.92)',
        filter: isVisible ? 'blur(0px)' : 'blur(6px)',
        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* --- TITLE BOX SECTION --- */}
      <div className="relative w-[85vw] max-w-[1000px] h-[140px] rounded-none overflow-visible border border-[#7c3aed]/50 mx-auto" style={{
        boxShadow: `0 0 40px rgba(169, 85, 247, 0.4),
                    0 0 80px rgba(169, 85, 247, 0.25),
                    0 0 120px rgba(124, 58, 237, 0.15),
                    inset 0 0 60px rgba(169, 85, 247, 0.1)`
      }}>
        {/* Dither background layer */}
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

        {/* Overlays for depth */}
        <div className="absolute inset-0 z-[1] bg-[#05030a]/40" />
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.10),rgba(59,130,246,0.06))]" />
        
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 22.5px rgba(0,0,0,0.18), inset 0 0 52.5px rgba(0,0,0,0.22), inset 0 0 82.5px rgba(0,0,0,0.16)',
            backdropFilter: 'blur(1.1px)',
            WebkitBackdropFilter: 'blur(1.1px)',
          }}
        />

        {/* Title Content */}
         <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
            <h2 className="text-5xl md:text-6xl font-extrabold italic tracking-tight" style={{ 
              color: '#ffffff'
            }}>
            Contact
          </h2>
        </div>
      </div>

      {/* --- TEKST JA CTA (See osa oli puudu) --- */}
      <div className="flex flex-col items-center text-center px-6 max-w-3xl z-20">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
          puudub
        </h3>
      </div>

      {/* --- LOGO LOOP SECTION --- */}
      <div className="w-full overflow-hidden opacity-60 hover:opacity-100 transition-opacity duration-500 py-8">
        <LogoLoop
          logos={techLogos}
          speed={15}
          logoHeight={50}
          gap={60}
          direction="right"
        />
      </div>
    </section>
  )
}

export default Contact