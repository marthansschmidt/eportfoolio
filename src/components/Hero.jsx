import GradualBlur from './GradualBlur'
import Iridescence from './Iridescence'
import TiltedCard from './TiltedCard'
import { useEffect, useRef, useState } from 'react'

function Hero() {
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

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-screen h-screen flex items-center justify-center overflow-hidden flex-shrink-0 transition-all duration-1000"
      style={{
        opacity: isVisible ? 1 : 0.7,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
      }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/banner.mp4" type="video/mp4" />
        </video>
        {/* Blur + Dark Overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-dark-900/70" />
      </div>

      {/* Gradual Blur at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 z-[5]">
        <GradualBlur direction="bottom" blurLayers={8} maxBlur={40} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-900" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Main Logo with TiltedCard + Iridescence */}
        <div className="mb-8 inline-block">
          <TiltedCard
            rotateAmplitude={20}
            scaleOnHover={1.15}
            showTooltip={false}
            displayOverlayContent={false}
            containerHeight="auto"
            containerWidth="auto"
          >
            <div className="p-4 md:p-8 lg:p-12 rounded-2xl overflow-hidden relative">
              {/* Iridescence Background */}
              <div className="absolute inset-0">
                <Iridescence
                  color={[0.3, 0.2, 0.4]}
                  speed={1.0}
                  amplitude={0.1}
                  mouseReact={true}
                  colorCycle={true}
                  cycleSpeed={0.05}
                />
              </div>
              {/* Overlay for better logo visibility */}
              <div className="absolute inset-0 bg-dark-900/30 backdrop-blur-sm" />
              {/* Logo */}
              <img
                src="/mhx_logo.png"
                alt="MHX"
                className="h-48 md:h-64 lg:h-96 w-auto mx-auto relative z-10"
              />
            </div>
          </TiltedCard>
        </div>

        {/* Role/Title */}
        <div className="mb-12">
          <p className="text-xl md:text-2xl text-gray-400 font-light">
           Rasmus pls help
          </p>
        </div>

        {/* Tagline */}
        <div className="max-w-2xl mx-auto mb-16">
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
            I create digital solutions that are both beautiful and functional.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce">
          <a href="#about" className="inline-block">
            <svg
              className="w-8 h-8 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
