import { Suspense, lazy, useState } from 'react'
import DeferredDither from './DeferredDither'
import BorderGlow from './BorderGlow'
import ElectricBorder from './ElectricBorder'

const AudioVisualizer = lazy(() => import('./AudioVisualizer'))

function Nav({ onNavigate, currentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [showAudioVisualizer, setShowAudioVisualizer] = useState(false)

  const navLinks = [
    { name: 'Home', href: '#hero', page: 'hero' },
    { name: 'About', href: '#about', page: 'about' },
    { name: 'Projects', href: '#projects', page: 'projects' },
    { name: 'Contact', href: '#contact', page: 'contact' },
  ]

  const handleNavClick = (e, page) => {
    e.preventDefault()
    const isMobile = window.innerWidth < 768
    
    if (onNavigate) {
      onNavigate(page)
      setIsMenuOpen(false)
    } else {
      const element = document.querySelector('#' + page)
      if (element) {
        const scrollContainer = element.parentElement?.parentElement
        if (scrollContainer) {
          const targetPosition = element.offsetLeft
          scrollContainer.scrollTo({
            left: targetPosition,
            behavior: 'smooth',
          })
        }
      }
    }
  }

  return (
    <>
      {/* Desktop Left Sidebar */}
      <nav className="hidden md:flex fixed top-0 left-0 h-screen z-50 bg-black border-r border-white/10 flex-col items-center justify-between py-8 px-6 overflow-hidden">
        {/* Dither Background - z-0, no mouse interaction */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-y-0 left-1/2 w-[125%] -translate-x-1/2">
            <DeferredDither
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
        </div>

        {/* Dark tint */}
        <div className="absolute inset-0 z-[1] bg-[#05030a]/40" />

        {/* Slight purple/blue tint */}
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.10),rgba(59,130,246,0.06))]" />

        {/* Edge blur / fade */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            boxShadow:
              'inset 0 0 22.5px rgba(0,0,0,0.18), inset 0 0 52.5px rgba(0,0,0,0.22), inset 0 0 82.5px rgba(0,0,0,0.16)',
            backdropFilter: 'blur(1.1px)',
            WebkitBackdropFilter: 'blur(1.1px)',
          }}
        />

        {/* Extra edge vignette */}
        <div
          className="absolute inset-0 z-[4] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(0,0,0,0) 48%, rgba(0,0,0,0.10) 72%, rgba(0,0,0,0.22) 100%)',
          }}
        />

        {/* Inner border glow */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            boxShadow:
              'inset 0 0 0 1px rgba(168,85,247,0.14), inset 0 0 0 2px rgba(255,255,255,0.02)',
          }}
        />

        {/* Logo and Audio Visualizer Top */}
        <div className="relative z-20 flex flex-col items-center gap-6">
          {/* Logo Top with BorderGlow */}
          <BorderGlow
            className="w-32 h-24"
            borderRadius={9}
            glowRadius={18}
            glowColor="260 80 70"
            backgroundColor="#000000"
            colors={['#8b5cf6', '#a855f7', '#6366f1']}
          >
            <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="block p-1 flex items-center justify-center h-24 w-32">
              <img src={`${import.meta.env.BASE_URL}mhx_logo_nav.png`} alt="MHX" width="128" height="96" decoding="async" className="h-full w-auto object-contain transform scale-150 origin-center brightness-0 invert" />
            </a>
          </BorderGlow>

          {/* Audio Visualizer Below Logo */}
          <ElectricBorder borderRadius="rounded-xl" color="cyan" isActive={isAudioPlaying}>
            {showAudioVisualizer ? (
              <Suspense fallback={<div className="w-32 h-16" />}>
                <AudioVisualizer onPlayStateChange={setIsAudioPlaying} />
              </Suspense>
            ) : (
              <button
                type="button"
                onClick={() => setShowAudioVisualizer(true)}
                className="w-32 h-16 flex flex-col items-center justify-center gap-1 pt-14 text-sm font-bold uppercase tracking-[0.18em] text-white/75 hover:text-white transition-colors"
                aria-label="Load audio player"
              >
                <span>Play</span>
                <span>Audio</span>
              </button>
            )}
          </ElectricBorder>
        </div>

        {/* Vertical Navigation Links with BorderGlow */}
        <div className="relative z-20 flex flex-col items-center gap-12">
          {navLinks.map((link) => (
            <BorderGlow
              key={link.name}
              className="w-32"
              borderRadius={8}
              glowRadius={12}
              glowColor="260 80 70"
              backgroundColor="#000000"
              colors={['#8b5cf6', '#a855f7', '#6366f1']}
            >
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.page)}
                aria-current={currentPage === navLinks.indexOf(link) ? 'page' : undefined}
                className="w-full block py-6 text-lg font-bold text-gray-400 hover:text-white transition-colors duration-300 flex items-center justify-center text-center"
              >
                {link.name}
              </a>
            </BorderGlow>
          ))}
        </div>

        {/* Spacer */}
        <div className="relative z-20 h-16" />
      </nav>

      {/* Mobile Top Bar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black border-b border-[#7c3aed]/50 overflow-hidden" style={{
        boxShadow: 'inset 0 -1px 0 rgba(168,85,247,0.14)'
      }}>
        {/* Dither Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-y-0 left-1/2 w-[125%] -translate-x-1/2">
            <DeferredDither
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
        </div>

        {/* Dark tint */}
        <div className="absolute inset-0 z-[1] bg-[#05030a]/40" />

        {/* Slight purple/blue tint */}
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.10),rgba(59,130,246,0.06))]" />

        {/* Edge blur / fade */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            boxShadow:
              'inset 0 0 22.5px rgba(0,0,0,0.18), inset 0 0 52.5px rgba(0,0,0,0.22), inset 0 0 82.5px rgba(0,0,0,0.16)',
            backdropFilter: 'blur(1.1px)',
            WebkitBackdropFilter: 'blur(1.1px)',
          }}
        />

        {/* Extra edge vignette */}
        <div
          className="absolute inset-0 z-[4] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(0,0,0,0) 48%, rgba(0,0,0,0.10) 72%, rgba(0,0,0,0.22) 100%)',
          }}
        />

        {/* Inner border glow */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            boxShadow:
              'inset 0 0 0 1px rgba(168,85,247,0.14), inset 0 0 0 2px rgba(255,255,255,0.02)',
          }}
        />
        
          <div className="px-4 py-5 relative z-10">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <BorderGlow
                className="w-28 h-16"
                borderRadius={8}
                glowRadius={14}
                glowColor="260 80 70"
                backgroundColor="#000000"
                colors={['#8b5cf6', '#a855f7', '#6366f1']}
              >
                <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="block h-16 w-28 p-1 flex items-center justify-center overflow-hidden hover:opacity-80 transition-opacity duration-300">
                  <img src={`${import.meta.env.BASE_URL}mhx_logo_nav.png`} alt="MHX" width="112" height="64" decoding="async" className="h-full max-w-full w-auto object-contain transform scale-150 origin-center brightness-0 invert" />
                </a>
              </BorderGlow>

            {/* Mobile Menu Button */}
            <button
              className="text-white transition-transform duration-300 ease-out"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation-menu"
              style={{
                transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            id="mobile-navigation-menu"
            className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{
              maxHeight: isMenuOpen ? '320px' : '0px',
              opacity: isMenuOpen ? 1 : 0,
            }}
            {...(!isMenuOpen ? { inert: '' } : {})}
          >
            <div
              className="mt-4 pb-4 border-t border-purple-500/20 pt-4 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
              }}
            >
                <div className="flex flex-col items-start gap-4">
                  {navLinks.map((link) => (
                    <BorderGlow
                      key={link.name}
                      className="w-36"
                      borderRadius={8}
                      glowRadius={12}
                      glowColor="260 80 70"
                      backgroundColor="#000000"
                      colors={['#8b5cf6', '#a855f7', '#6366f1']}
                    >
                      <a
                        href={link.href}
                        aria-current={currentPage === navLinks.indexOf(link) ? 'page' : undefined}
                        className={`w-full block py-4 text-base font-bold transition-colors duration-300 flex items-center justify-center text-center ${
                          currentPage === navLinks.indexOf(link) ? 'text-white' : 'text-gray-400 hover:text-white'
                        }`}
                        onClick={(e) => handleNavClick(e, link.page)}
                        tabIndex={isMenuOpen ? 0 : -1}
                      >
                        {link.name}
                      </a>
                    </BorderGlow>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav
