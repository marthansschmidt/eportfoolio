import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { useEffect, useRef } from 'react'

function App() {
  const containerRef = useRef(null)
  const scrollTimeoutRef = useRef(null)

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
    <div ref={containerRef} className="h-screen bg-dark-900 overflow-x-auto overflow-y-hidden" style={{ scrollBehavior: 'smooth' }}>
      <Nav />
      <main className="flex flex-row h-screen">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default App
