import Nav from './components/Nav'
import Hero from './components/Hero'
import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'

const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))

function App() {
  const containerRef = useRef(null)
  const currentPageRef = useRef(0)
  const programmaticScrollRef = useRef(false)
  const programmaticScrollTimerRef = useRef(null)
  const wheelLockRef = useRef(false)
  const wheelDeltaRef = useRef(0)
  const wheelReleaseTimerRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [canLoadBelowFold, setCanLoadBelowFold] = useState(() => window.innerWidth >= 768)

  const pages = ['hero', 'about', 'projects', 'contact']

  const goToPage = useCallback((pageIndex) => {
    if (pageIndex < 0 || pageIndex >= pages.length) return

    programmaticScrollRef.current = true
    if (programmaticScrollTimerRef.current) {
      clearTimeout(programmaticScrollTimerRef.current)
    }

    currentPageRef.current = pageIndex
    setCurrentPage(pageIndex)

    programmaticScrollTimerRef.current = setTimeout(() => {
      programmaticScrollRef.current = false
      currentPageRef.current = pageIndex
      setCurrentPage(pageIndex)
    }, 950)

    if (isMobile) {
      document.getElementById(pages[pageIndex])?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      return
    }

    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: pageIndex * window.innerWidth,
        behavior: 'smooth',
      })
    }
  }, [isMobile, pages.length])

  const handleNavigation = (page) => {
    const pageIndex = pages.indexOf(page)
    goToPage(pageIndex)
  }

  useEffect(() => {
    currentPageRef.current = currentPage
  }, [currentPage])

  useEffect(() => {
    return () => {
      if (programmaticScrollTimerRef.current) {
        clearTimeout(programmaticScrollTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setCanLoadBelowFold(true)
      return undefined
    }

    const loadBelowFold = () => setCanLoadBelowFold(true)
    const timeoutId = window.setTimeout(loadBelowFold, 5000)

    window.addEventListener('scroll', loadBelowFold, { passive: true, once: true })
    window.addEventListener('touchstart', loadBelowFold, { passive: true, once: true })

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener('scroll', loadBelowFold)
      window.removeEventListener('touchstart', loadBelowFold)
    }
  }, [isMobile])

  useEffect(() => {
    if (!isMobile) return undefined

    let frameId = 0
    const handleScroll = () => {
      if (programmaticScrollRef.current) return

      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        const pageIndex = pages.reduce((closestIndex, page, index) => {
          const section = document.getElementById(page)
          const closestSection = document.getElementById(pages[closestIndex])
          if (!section || !closestSection) return closestIndex

          return Math.abs(section.getBoundingClientRect().top) < Math.abs(closestSection.getBoundingClientRect().top)
            ? index
            : closestIndex
        }, 0)

        currentPageRef.current = pageIndex
        setCurrentPage(pageIndex)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile, pages.length])

  useEffect(() => {
    const container = containerRef.current
    if (!container || isMobile) return undefined

    let frameId = 0
    const handleScroll = () => {
      if (programmaticScrollRef.current) return

      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        const pageIndex = Math.round(container.scrollLeft / window.innerWidth)
        if (pageIndex >= 0 && pageIndex < pages.length) {
          currentPageRef.current = pageIndex
          setCurrentPage(pageIndex)
        }
      })
    }

    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frameId)
      container.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile, pages.length])

  useEffect(() => {
    const container = containerRef.current
    if (!container || isMobile) return undefined

    const releaseWheelLock = () => {
      wheelLockRef.current = false
      wheelDeltaRef.current = 0
    }

    const handleWheel = (event) => {
      if (wheelLockRef.current) return

      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX
      const activeSection = event.target.closest?.('.scroll-page')

      if (activeSection && Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
        const overflowY = window.getComputedStyle(activeSection).overflowY
        const canScrollVertically = overflowY === 'auto' || overflowY === 'scroll'
        const canScrollDown = canScrollVertically && event.deltaY > 0 && activeSection.scrollTop + activeSection.clientHeight < activeSection.scrollHeight - 2
        const canScrollUp = canScrollVertically && event.deltaY < 0 && activeSection.scrollTop > 2

        if (canScrollDown || canScrollUp) {
          return
        }
      }

      event.preventDefault()
      wheelDeltaRef.current += delta

      if (Math.abs(wheelDeltaRef.current) < 45) return

      const direction = wheelDeltaRef.current > 0 ? 1 : -1
      const nextPage = Math.max(0, Math.min(pages.length - 1, currentPageRef.current + direction))
      wheelDeltaRef.current = 0

      if (nextPage === currentPageRef.current) return

      wheelLockRef.current = true
      goToPage(nextPage)

      if (wheelReleaseTimerRef.current) {
        clearTimeout(wheelReleaseTimerRef.current)
      }

      wheelReleaseTimerRef.current = setTimeout(releaseWheelLock, 850)
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      if (wheelReleaseTimerRef.current) {
        clearTimeout(wheelReleaseTimerRef.current)
      }
      releaseWheelLock()
    }
  }, [goToPage, isMobile, pages.length])

  useEffect(() => {
    if (!isMobile) return undefined

    const sections = Array.from(document.querySelectorAll('.scroll-page'))
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-mobile-visible', entry.isIntersecting)
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -42% 0px',
      }
    )

    sections.forEach((section, index) => {
      if (index === 0) {
        section.classList.add('is-mobile-visible')
      }
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
      sections.forEach((section) => section.classList.remove('is-mobile-visible'))
    }
  }, [isMobile, canLoadBelowFold])

  return (
    <div className="bg-black min-h-screen w-screen relative text-white">
      <style>{`
        html, body {
          overflow-x: hidden;
          overflow-y: auto;
          min-height: 100%;
          width: 100%;
        }

        .scroll-container {
          width: 100vw;
          min-height: 100vh;
          overflow: visible;
          position: static;
        }

        main {
          display: flex;
          flex-direction: column;
          min-height: 100%;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          will-change: transform;
        }

        .scroll-page {
          width: 100vw;
          min-height: 100vh;
          position: relative;
          flex-shrink: 0; 
          overflow-y: visible; 
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          padding-top: 0; 
          display: flex;
          flex-direction: column;
          align-items: center;
          scroll-behavior: smooth;
        }

        /* Peida scrollbar mobiilis */
        .scroll-page::-webkit-scrollbar {
          display: none;
        }

        @supports (scrollbar-width: none) {
          .scroll-page {
            scrollbar-width: none;
          }
        }

        /* SISU WRAPPER */
        .inner-content {
          width: 100%;
          max-width: 1200px;
          padding: 0 20px 100px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }

        .full-bleed-content {
          max-width: none;
          min-height: 100%;
          padding: 0;
          align-items: stretch;
        }

        .full-bleed-section {
          padding-top: 0;
        }

        @media (max-width: 767px) {
          .scroll-page .inner-content {
            opacity: 0;
            transform: translateY(34px) scale(0.975);
            transition:
              opacity 620ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 680ms cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
          }

          .scroll-page.is-mobile-visible .inner-content {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 767px) and (prefers-reduced-motion: reduce) {
          .scroll-page .inner-content {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        /* ÜHTLUSTATUD PEALKIRJA KASTID (About & Contact) */
        /* Lisa see klass oma About.jsx ja Contact.jsx pealkirja div-idele, 
           või kasuta seda globaalset stiili siin: */
        .header-box {
          width: 100%;
          max-width: 500px;
          min-height: 120px; /* Tagab, et About ja Contact on sama kõrged */
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(168, 85, 247, 0.4);
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          margin-bottom: 2rem;
          flex-shrink: 0 !important; /* Keelab lömastamise */
        }

        @media (min-width: 768px) {
          html, body {
            overflow: hidden;
            height: 100%;
          }

          .scroll-container { 
            height: 100vh;
            overflow: hidden;
            overflow-x: auto;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
          
          main {
            flex-direction: row;
            height: 100%;
            min-height: 0;
            transform: none !important;
          }

          .scroll-page { 
            height: 100vh;
            min-height: 0;
            padding-top: 0; 
            justify-content: center;
            overflow-y: hidden;
            overscroll-behavior: contain;
          }

          .scroll-page::-webkit-scrollbar {
            display: auto;
          }
        }
      `}</style>

      {/* TAUST - FIXED (püsib paigal sisu kerimisel) */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        {!isMobile && (
          <video
            src={`${import.meta.env.BASE_URL}banner.mp4`}
            autoPlay muted loop playsInline
            className="w-full h-full object-cover opacity-40 blur-3xl"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-90" />
      </div>

      <Nav onNavigate={handleNavigation} currentPage={currentPage} />
      
      <div ref={containerRef} className="scroll-container">
        <main style={{ 
          transform: 'none'
        }}>
          <section id="hero" className="scroll-page full-bleed-section">
            <div className="inner-content full-bleed-content">
              <Hero />
            </div>
          </section>
          
          <section id="about" className="scroll-page full-bleed-section">
            <div className="inner-content full-bleed-content">
              {canLoadBelowFold && (
                <Suspense fallback={<div className="min-h-screen bg-[#0f0b1a]" />}>
                  <About />
                </Suspense>
              )}
            </div>
          </section>
          
          <section id="projects" className="scroll-page full-bleed-section">
            <div className="inner-content full-bleed-content">
              {canLoadBelowFold && (
                <Suspense fallback={<div className="min-h-screen bg-[#0f0b1a]" />}>
                  <Projects />
                </Suspense>
              )}
            </div>
          </section>
          
          <section id="contact" className="scroll-page full-bleed-section">
            <div className="inner-content full-bleed-content">
              {canLoadBelowFold && (
                <Suspense fallback={<div className="min-h-screen bg-[#05030a]" />}>
                  <Contact />
                </Suspense>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
