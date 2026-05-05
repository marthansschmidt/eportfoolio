import Nav from './components/Nav'
import Hero from './components/Hero'
import { Suspense, lazy, useEffect, useRef, useState } from 'react'

const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))

function App() {
  const containerRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [loadedPages, setLoadedPages] = useState(() => new Set([0]))

  const pages = ['hero', 'about', 'projects', 'contact']

  const handleNavigation = (page) => {
    const pageIndex = pages.indexOf(page)
    if (pageIndex !== -1) {
      setCurrentPage(pageIndex)
      setLoadedPages((prev) => new Set(prev).add(pageIndex))
      if (!isMobile && containerRef.current) {
        containerRef.current.scrollTo({
          left: pageIndex * window.innerWidth,
          behavior: 'smooth',
        })
      }
    }
  }

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container || isMobile) return undefined

    let frameId = 0
    const handleScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        const pageIndex = Math.round(container.scrollLeft / window.innerWidth)
        if (pageIndex >= 0 && pageIndex < pages.length) {
          setCurrentPage(pageIndex)
          setLoadedPages((prev) => new Set(prev).add(pageIndex))
        }
      })
    }

    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frameId)
      container.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile, pages.length])

  const renderPage = (index, Component) => {
    if (!loadedPages.has(index)) return null

    return (
      <Suspense fallback={null}>
        <Component />
      </Suspense>
    )
  }

  return (
    <div className="bg-black min-h-screen w-screen overflow-hidden relative text-white">
      <style>{`
        /* Lukusta body ja html scrollimist */
        html, body {
          overflow: hidden;
          height: 100%;
          width: 100%;
        }

        /* KONTEINER */
        .scroll-container {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        /* LIIKUMISE LOOGIKA */
        main {
          display: flex;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          will-change: transform;
        }

        /* IGA SEKTSION */
        section {
          width: 100vw;
          height: 100vh;
          flex-shrink: 0; 
          overflow-y: auto; 
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          padding-top: 80px; 
          display: flex;
          flex-direction: column;
          align-items: center;
          scroll-behavior: smooth;
        }

        /* Peida scrollbar mobiilis */
        section::-webkit-scrollbar {
          display: none;
        }

        @supports (scrollbar-width: none) {
          section {
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
            overflow: auto;
          }

          .scroll-container { 
            overflow-x: auto;
            position: static;
          }
          
          main { transform: none !important; }
          section { 
            padding-top: 0; 
            justify-content: center;
            overflow-y: visible;
          }

          section::-webkit-scrollbar {
            display: auto;
          }
        }
      `}</style>

      {/* TAUST - FIXED (püsib paigal sisu kerimisel) */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        <video
          src={`${import.meta.env.BASE_URL}banner.mp4`}
          autoPlay muted loop playsInline
          className="w-full h-full object-cover opacity-40 blur-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-90" />
      </div>

      <Nav onNavigate={handleNavigation} currentPage={currentPage} />
      
      <div ref={containerRef} className="scroll-container">
        <main style={{ 
          transform: isMobile ? `translateX(-${currentPage * 100}vw)` : 'none'
        }}>
          <section id="hero" className="full-bleed-section">
            <div className="inner-content full-bleed-content">
              <Hero />
            </div>
          </section>
          
          <section id="about" className="full-bleed-section">
            <div className="inner-content full-bleed-content">
              {renderPage(1, About)}
            </div>
          </section>
          
          <section id="projects" className="full-bleed-section">
            <div className="inner-content full-bleed-content">
              {renderPage(2, Projects)}
            </div>
          </section>
          
          <section id="contact" className="full-bleed-section">
            <div className="inner-content full-bleed-content">
              {renderPage(3, Contact)}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
