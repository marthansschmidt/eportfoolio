import TextPressure from './TextPressure'
import Dither from './Dither'
import RoleRotator from './RoleRotator'
import ProfileCard from './ProfileCard'
import { useEffect, useRef, useState } from 'react'

function Hero() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [textReady, setTextReady] = useState(false)
  const [textKey, setTextKey] = useState(0)

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setTextReady(true)
      setTextKey((prev) => prev + 1)
    }, 80)

    const handleResize = () => {
      setTextKey((prev) => prev + 1)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-screen h-screen flex items-center justify-center overflow-hidden flex-shrink-0"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(18px)',
        filter: isVisible ? 'blur(0px)' : 'blur(4.5px)',
        transition: 'all 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale">
          <source src={`${import.meta.env.BASE_URL}banner.mp4`} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/60" />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.22) 62%, rgba(0,0,0,0.52) 80%, rgba(0,0,0,0.88) 100%),
              linear-gradient(to top, rgba(0,0,0,0.76), transparent 24%, transparent 76%, rgba(0,0,0,0.64)),
              linear-gradient(to right, rgba(0,0,0,0.68), transparent 16%, transparent 84%, rgba(0,0,0,0.68))
            `,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 105px rgba(0,0,0,0.92)',
          }}
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-12">
        <div className="relative w-full flex flex-col items-center justify-center">
          {/* MHX box */}
          <div className="relative flex items-center justify-center w-full">
            <div className="relative w-[80vw] max-w-[1200px] h-[20vh] max-h-[180px] min-h-[120px] rounded-none overflow-hidden border border-[#7c3aed]/30 shadow-[0_0_60px_rgba(76,29,149,0.18)]">
              {/* Dither background */}
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

              {/* Slight purple/blue tint tied to navbar */}
              <div className="absolute inset-0 z-[2] bg-[linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.10),rgba(59,130,246,0.06))]" />

              {/* Edge blur / fade inside box */}
              <div
                className="absolute inset-0 z-[3] rounded-none pointer-events-none"
                style={{
                  boxShadow:
                    'inset 0 0 22.5px rgba(0,0,0,0.18), inset 0 0 52.5px rgba(0,0,0,0.22), inset 0 0 82.5px rgba(0,0,0,0.16)',
                  backdropFilter: 'blur(1.1px)',
                  WebkitBackdropFilter: 'blur(1.1px)',
                }}
              />

              {/* Extra edge vignette so center stays clearer */}
              <div
                className="absolute inset-0 z-[4] rounded-none pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(0,0,0,0) 48%, rgba(0,0,0,0.10) 72%, rgba(0,0,0,0.22) 100%)',
                }}
              />

              {/* Inner border glow */}
              <div
                className="absolute inset-0 z-[5] rounded-none pointer-events-none"
                style={{
                  boxShadow:
                    'inset 0 0 0 1px rgba(168,85,247,0.14), inset 0 0 0 2px rgba(255,255,255,0.02)',
                }}
              />

              {/* MHX */}
              <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
                <div className="w-[90%] h-[85%] px-[1%] flex items-center justify-center overflow-hidden">
                  {textReady && (
                    <TextPressure
                      key={textKey}
                      text="MHX"
                      flex={true}
                      alpha={false}
                      stroke={false}
                      width={false}
                      weight={true}
                      italic={true}
                      textColor="#a955f77c"
                      strokeColor="#a955f77c"
                      minFontSize={100}
                      scale={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ProfileCard */}
          <div className="mt-12 md:mt-20 flex items-center justify-center px-4 w-full h-auto">
            <div style={{ width: '100%', maxWidth: '720px', minHeight: '550px' }}>
              <ProfileCard
                avatarUrl={`${import.meta.env.BASE_URL}Märt_Hans.png`}
                miniAvatarUrl={`${import.meta.env.BASE_URL}Märt_Hans.png`}
                name="Märt Hansschmidt"
                title="Junior Developer"
                handle="mhx"
                status="Available"
                contactText="Contact"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                behindGlowEnabled={true}
                behindGlowColor="rgba(125, 190, 255, 0.67)"
                innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero