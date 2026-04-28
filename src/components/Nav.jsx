import { useState } from 'react'
import Dither from './Dither'
import BorderGlow from './BorderGlow'
import AudioVisualizer from './AudioVisualizer'
import ElectricBorder from './ElectricBorder'

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      // Get the main scroll container (parent of main, which is parent of sections)
      const scrollContainer = element.parentElement?.parentElement
      if (scrollContainer) {
        const targetPosition = element.offsetLeft
        scrollContainer.scrollTo({
          left: targetPosition,
          behavior: 'smooth',
        })
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Left Sidebar */}
      <nav className="hidden md:flex fixed top-0 left-0 h-screen z-50 bg-black border-r border-white/10 flex-col items-center justify-between py-8 px-6 overflow-hidden">
        {/* Dither Background - z-0, no mouse interaction */}
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

        {/* Dark tint */}
        <div className="absolute inset-0 z-[1] bg-[#05030a]/38" />

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
            <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="block p-1 flex items-center justify-center h-24 w-32">
              <img src={`${import.meta.env.BASE_URL}mhx_logo.png`} alt="MHX" className="h-full w-auto object-contain transform scale-150 origin-center brightness-0 invert" />
            </a>
          </BorderGlow>

          {/* Audio Visualizer Below Logo */}
          <ElectricBorder borderRadius="rounded-xl" color="cyan" isActive={isAudioPlaying}>
            <AudioVisualizer onPlayStateChange={setIsAudioPlaying} />
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
                onClick={(e) => handleNavClick(e, link.href)}
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
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10 overflow-hidden">
        {/* Dither Background */}
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

        {/* Dark tint */}
        <div className="absolute inset-0 z-[1] bg-[#05030a]/38" />

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
        
        <div className="px-6 py-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="hover:opacity-80 transition-opacity duration-300">
              <img src={`${import.meta.env.BASE_URL}mhx_logo.png`} alt="MHX" className="h-16 w-auto brightness-0 invert" />
            </a>

            {/* Mobile Menu Button */}
            <button
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
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
          {isMenuOpen && (
            <div className="mt-4 pb-4 border-t border-dark-600/50 pt-4">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Nav
