import { useEffect, useRef, useState } from 'react'
import LogoLoop from './LogoLoop'

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
    { src: `${import.meta.env.BASE_URL}LinkedIn_logo_initials.png.webp`, link: null },
    { src: `${import.meta.env.BASE_URL}Spotify_logo_without_text.svg.png`, link: 'https://open.spotify.com/playlist/5Vn7Rk6XjJ8uoWHywlQUGr?si=64a9b813a79041af' },
    { src: `${import.meta.env.BASE_URL}github.png`, link: 'https://github.com/marthansschmidt' },
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-screen h-screen bg-dark-800 flex flex-col justify-end flex-shrink-0"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.92)',
        filter: isVisible ? 'blur(0px)' : 'blur(6px)',
        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <div className="pb-16">
        <LogoLoop
          logos={techLogos}
          speed={12}
          logoHeight={60}
          gap={40}
          direction="right"
        />
      </div>
    </section>
  )
}

export default Contact
