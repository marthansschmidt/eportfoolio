import ProfileCard from './ProfileCard'
import { useEffect, useRef, useState } from 'react'

function Hero() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
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
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-screen md:h-screen h-screen flex items-center justify-start md:justify-center flex-shrink-0 md:flex-shrink-0 py-0 md:py-0"
      style={{
        opacity: isMobile || isVisible ? 1 : 0,
        transform: isMobile || isVisible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(18px)',
        filter: isMobile || isVisible ? 'blur(0px)' : 'blur(4.5px)',
        transition: isMobile ? 'none' : 'all 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
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

      <style>{`
        @media (max-width: 767px) {
          #hero .hero-content-frame {
            padding-top: 5rem;
            padding-bottom: 0;
            justify-content: flex-start;
          }

          #hero .hero-inner {
            min-height: calc(100svh - 5rem);
            justify-content: center;
          }
        }

        @media (min-width: 768px) and (max-height: 850px) {
          #hero .hero-content-frame {
            padding-top: 2rem;
            padding-bottom: 2rem;
          }

          #hero .hero-profile-wrap {
            margin-top: 0;
          }
        }

        @media (min-width: 1024px) and (max-height: 780px) {
          #hero .hero-content-frame {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
          }

          #hero .hero-profile-wrap {
            margin-top: 0;
          }
        }
      `}</style>

      <div className="hero-content-frame relative z-10 w-full md:w-[calc(100vw-176px)] md:ml-[176px] h-full flex flex-col items-center justify-start md:justify-center px-4 sm:px-6 pt-32 pb-8 md:py-12">
        <div className="hero-inner relative w-full flex flex-col items-center justify-start md:justify-center mt-0 md:mt-0">
          <div className="hero-profile-wrap mt-0 flex items-center justify-center px-4 w-full h-auto">
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

      <a
        href="https://www.pinterest.com/pin/107734616086938455/"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:block absolute top-3 right-3 z-30 text-[10px] uppercase tracking-[0.18em] text-white/30 hover:text-white/70 transition-colors"
      >
        Background
      </a>
    </section>
  )
}

export default Hero
