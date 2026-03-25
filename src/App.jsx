import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const containerRef = useRef(null)
  const scrollTimeoutRef = useRef(null)
  const isLoading = false

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e) => {
      // Check if the event is from the main scrollable container
      if (container.contains(e.target)) {
        e.preventDefault()
        const deltaY = e.deltaY
        // Convert vertical scroll to horizontal with increased speed (2.5x)
        // Negative deltaY (scroll up) moves left, positive deltaY (scroll down) moves right
        const newScrollLeft = container.scrollLeft + deltaY * 2.5
        container.scrollLeft = newScrollLeft

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }

        // Set new timeout for snap behavior with direction info
        scrollTimeoutRef.current = setTimeout(() => {
          snapToNearestSection(container, deltaY)
        }, 150)
      }
    }

    const snapToNearestSection = (container, deltaY) => {
      const sectionWidth = window.innerWidth
      const currentScroll = container.scrollLeft
      const scrollCenter = currentScroll + window.innerWidth / 2

      let nearestSection
      if (deltaY > 0) {
        // Scrolling forward (down), snap to next section
        nearestSection = Math.ceil(scrollCenter / sectionWidth)
      } else if (deltaY < 0) {
        // Scrolling backward (up), snap to previous section with 50% threshold
        // This makes backward snapping much more responsive
        const adjustedCenter = scrollCenter - (sectionWidth * 0.5)
        nearestSection = Math.floor(adjustedCenter / sectionWidth)
      } else {
        // No scroll direction, snap to nearest
        nearestSection = Math.round(scrollCenter / sectionWidth)
      }

      const targetScroll = Math.max(0, nearestSection * sectionWidth)

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      })
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', handleWheel)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="bg-dark-900 h-screen w-screen overflow-hidden">
      {/* Banner video with soft/blurred edges */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <video
          src={`${import.meta.env.BASE_URL}banner.mp4`}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover filter brightness-90 blur-2xl"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%)',
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
          }}
        />
      </div>
      <motion.div
        initial={{ scale: 1.15, opacity: 0, filter: 'blur(10px)' }}
        animate={isLoading
          ? { scale: 1.15, opacity: 0, filter: 'blur(10px)' }
          : { scale: 1, opacity: 1, filter: 'blur(0px)' }
        }
        transition={{
          duration: 1.8,
          ease: [0.25, 0.1, 0.25, 1],
          opacity: { duration: 1.2, ease: 'easeOut' },
          filter: { duration: 1.5, ease: 'easeOut' }
        }}
        className="h-full w-full"
      >
        <Nav />
        <div
          ref={containerRef}
          className="h-screen overflow-x-auto overflow-y-hidden"
          style={{ scrollBehavior: 'smooth' }}
        >
          <main className="flex flex-row h-screen" style={{ perspective: '1200px' }}>
            <Hero />
            <About />
            <Projects />
            <Contact />
          </main>
        </div>
      </motion.div>
    </div>
  )
}

export default App
