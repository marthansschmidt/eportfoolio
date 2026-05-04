import { useEffect, useRef, useState } from 'react'
import LogoLoop from './LogoLoop'
import Dither from './Dither'

function Contact() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ firstName: '', lastName: '', email: '', message: '' })
    setTimeout(() => {
      setSubmitted(false)
      setShowPopup(true)
    }, 2000)
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  const techLogos = [
    { src: `${import.meta.env.BASE_URL}vite.svg`, link: 'mailto:mart.hansschmidt@voco.ee' },
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

      {/* --- CONTACT FORM SECTION --- */}
      <div className="flex-1 flex items-center justify-center w-full px-6 z-20">
        <style>{`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .loading-spinner {
            display: inline-block;
            animation: spin 1s linear infinite;
          }
        `}</style>
        <div className="w-full max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-white mb-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  First Name <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Your first name"
                  className="w-full px-4 py-3 bg-[#0f0b1a] border border-[#7c3aed]/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-white mb-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  Last Name <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Your last name"
                  className="w-full px-4 py-3 bg-[#0f0b1a] border border-[#7c3aed]/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg font-semibold text-white mb-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                Email <span className="text-purple-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 bg-[#0f0b1a] border border-[#7c3aed]/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-lg font-semibold text-white mb-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                Message <span className="text-purple-400">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message here..."
                rows="5"
                className="w-full px-4 py-3 bg-[#0f0b1a] border border-[#7c3aed]/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all resize-none"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-8 py-5 text-lg font-bold rounded-lg transition-all duration-300 uppercase tracking-wider mb-8 flex items-center justify-center gap-3 bg-purple-900 hover:bg-purple-950 cursor-pointer text-white"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {submitted ? (
                <>
                  <span className="loading-spinner">⟳</span>
                  Submitted!
                </>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* --- LOGO LOOP SECTION --- */}
      <div className="w-full overflow-hidden opacity-60 hover:opacity-100 transition-opacity duration-500 py-8 z-20">
        <LogoLoop
          logos={techLogos}
          speed={15}
          logoHeight={50}
          gap={60}
          direction="right"
        />
      </div>

      {/* --- SUCCESS POPUP --- */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backdropFilter: 'blur(4px)' }}>
          <div 
            className="bg-[#0f0b1a] border-2 border-purple-600 rounded-xl p-8 max-w-md mx-4 shadow-2xl animate-fadeIn"
            style={{
              animation: 'fadeInScale 0.4s ease-out',
              boxShadow: '0 0 60px rgba(168, 85, 247, 0.5)'
            }}
          >
            <style>{`
              @keyframes fadeInScale {
                from {
                  opacity: 0;
                  transform: scale(0.9);
                }
                to {
                  opacity: 1;
                  transform: scale(1);
                }
              }
            `}</style>
            
            <h3 className="text-2xl font-bold text-white text-center mb-6" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Message Sent!
            </h3>
            <button
              onClick={closePopup}
              className="w-full px-6 py-2 bg-purple-900 hover:bg-purple-950 text-white font-bold rounded-lg transition-all duration-300"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Contact