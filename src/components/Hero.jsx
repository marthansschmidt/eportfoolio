import TextPressure from './TextPressure'
import DeferredDither from './DeferredDither'
import ProfileCard from './ProfileCard'
import { useEffect, useRef, useState } from 'react'

function Hero() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [textReady, setTextReady] = useState(false)
  const [textKey, setTextKey] = useState(0)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

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
      setIsMobile(window.innerWidth < 768)
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
      className="relative w-screen md:h-screen h-screen flex items-center justify-start md:justify-center flex-shrink-0 md:flex-shrink-0 py-0 md:py-0"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(18px)',
        filter: isVisible ? 'blur(0px)' : 'blur(4.5px)',
        transition: 'all 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* RippleGrid Background */}
      <div className="absolute inset-0 z-1 overflow-hidden">
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

      <div className="relative z-10 w-full md:w-[calc(100vw-176px)] md:ml-[176px] h-full flex flex-col items-center justify-start md:justify-center px-4 sm:px-6 pt-32 pb-8 md:py-12">
        <div className="relative w-full flex flex-col items-center justify-start md:justify-center mt-0 md:mt-0">
          {/* MHX box */}
          <div className="relative flex items-center justify-center w-full">
            <div className="relative w-full max-w-[1100px] h-[112px] sm:h-[140px] rounded-none overflow-visible border border-[#7c3aed]/50 mx-auto flex-shrink-0" style={{
              boxShadow: `0 0 40px rgba(169, 85, 247, 0.4),
                          0 0 80px rgba(169, 85, 247, 0.25),
                          0 0 120px rgba(124, 58, 237, 0.15),
                          inset 0 0 60px rgba(169, 85, 247, 0.1)`
            }}>
              {/* Dither background */}
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
                <div className="w-full h-[68%] flex items-center justify-center overflow-hidden px-8 sm:px-10 md:px-[6%]">
                  {textReady && (
                    <TextPressure
                      key={textKey}
                      text="MHX"
                      flex={false}
                      alpha={false}
                      stroke={false}
                      width={false}
                      weight={false}
                      italic={true}
                      textColor="#8b5cf6e8"
                      strokeColor="#8b5cf6e8"
                      minFontSize={80}
                      maxFontSize={isMobile ? 108 : 150}
                      scale={true}
                      className="flex w-full h-full items-center justify-center gap-[clamp(1.6rem,5.2vw,4.2rem)]"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

            <div className="mt-16 md:mt-20 lg:mt-24 flex items-center justify-center px-4 w-full h-auto">
            <div className="w-full max-w-[340px] sm:max-w-[360px] lg:max-w-[620px] xl:max-w-[660px] min-h-[340px] sm:min-h-[360px] flex items-center justify-center mx-auto">
              <ProfileCard
                avatarUrl={`${import.meta.env.BASE_URL}Mart_Hans_660.jpg`}
                miniAvatarUrl={`${import.meta.env.BASE_URL}Mart_Hans_660.jpg`}
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
