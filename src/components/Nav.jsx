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
      const scrollContainer = element.parentElement
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
      {/* Desktop Right Sidebar */}
      <nav className="hidden md:flex fixed top-0 right-0 h-screen z-50 bg-black border-l border-white/10 flex-col items-center justify-between py-8 px-4 overflow-hidden">
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

        {/* Logo and Audio Visualizer Top */}
        <div className="relative z-20 flex flex-col items-center gap-4">
          {/* Logo Top with BorderGlow */}
          <BorderGlow
            className="block"
            borderRadius={12}
            glowRadius={24}
            glowColor="260 80 70"
            backgroundColor="#000000"
            colors={['#8b5cf6', '#a855f7', '#6366f1']}
          >
            <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="block p-1 flex items-center justify-center h-24 w-32">
              <img src="/logo 2.png" alt="MHX" className="h-full w-full object-contain" />
            </a>
          </BorderGlow>

          {/* Audio Visualizer Below Logo */}
          <ElectricBorder borderRadius="rounded-xl" color="cyan" isActive={isAudioPlaying}>
            <AudioVisualizer onPlayStateChange={setIsAudioPlaying} />
          </ElectricBorder>
        </div>

        {/* Vertical Navigation Links with BorderGlow */}
        <div className="relative z-20 flex flex-col items-center gap-2">
          {navLinks.map((link) => (
            <BorderGlow
              key={link.name}
              borderRadius={8}
              glowRadius={15}
              glowColor="260 80 70"
              backgroundColor="#000000"
              colors={['#8b5cf6', '#a855f7', '#6366f1']}
            >
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-5 py-4 text-sm text-gray-400 hover:text-white transition-colors duration-300 [writing-mode:vertical-rl] rotate-180"
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
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#hero" className="hover:opacity-80 transition-opacity duration-300">
              <img src="/mhx_logo_nav.png" alt="MHX" className="h-12 w-auto brightness-0 invert" />
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
