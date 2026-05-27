import { useEffect, useRef, useState } from 'react'
import LogoLoop from './LogoLoop'
import DeferredDither from './DeferredDither'
import Iridescence from './Iridescence'

const IRIDESCENCE_COLOR = [0.4980392156862745, 0.3058823529411765, 0.8549019607843137]

function Contact() {
  const sectionRef = useRef(null)
  const copyTimersRef = useRef({})
  const [isVisible, setIsVisible] = useState(false)
  const [copiedContact, setCopiedContact] = useState({})

  const email = 'mart.hansschmidt@voco.ee'
  const githubUrl = 'https://github.com/marthansschmidt'

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
    return () => {
      Object.values(copyTimersRef.current).forEach((timerId) => {
        window.clearTimeout(timerId)
      })
    }
  }, [])

  const copyToClipboard = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedContact((previous) => ({ ...previous, [label]: true }))
      window.clearTimeout(copyTimersRef.current[label])
      copyTimersRef.current[label] = window.setTimeout(() => {
        setCopiedContact((previous) => ({ ...previous, [label]: false }))
      }, 1200)
    } catch {
      setCopiedContact((previous) => ({ ...previous, [label]: false }))
    }
  }

  const techLogos = [
    { src: `${import.meta.env.BASE_URL}vite.svg`, link: `mailto:${email}` },
    { src: `${import.meta.env.BASE_URL}projects/kristi_logo.png`, link: 'https://kristikliimannbeauty.onrender.com' },
    { src: `${import.meta.env.BASE_URL}projects/suumadin_logo.png`, link: 'https://suumadin.onrender.com' },
    { src: `${import.meta.env.BASE_URL}projects/react_aim_logo.png`, link: 'https://reactaim3d.onrender.com' },
    { src: `${import.meta.env.BASE_URL}projects/carmele_logo.png`, link: 'https://carmelestudios.onrender.com' },
    { src: `${import.meta.env.BASE_URL}github.png`, link: githubUrl, className: 'invert brightness-200 contrast-125' },
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen bg-[#05030a] flex flex-col justify-between items-center pt-32 sm:pt-36 lg:pt-16 pb-12 px-4 sm:px-6 md:px-0 flex-shrink-0 overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.92)',
        filter: isVisible ? 'blur(0px)' : 'blur(6px)',
        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <div className="hidden md:block absolute inset-0 z-0 overflow-hidden">
        <video
          src={`${import.meta.env.BASE_URL}contact.mp4`}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.22) 62%, rgba(0,0,0,0.52) 80%, rgba(0,0,0,0.88) 100%),
              linear-gradient(to top, rgba(0,0,0,0.76), transparent 24%, transparent 76%, rgba(0,0,0,0.64)),
              linear-gradient(to right, rgba(0,0,0,0.68), transparent 16%, transparent 84%, rgba(0,0,0,0.68))
            `,
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
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
        @media (min-width: 768px) {
          #contact {
            height: 100vh;
            min-height: 0;
            padding-top: 0;
            padding-bottom: 0;
          }

          #contact .contact-content-frame {
            width: calc(100vw - 176px);
            max-width: none;
            margin-left: 176px;
            padding: 0 24px;
            height: 100%;
            min-height: 0;
            padding-top: 4rem;
            padding-bottom: 2.5rem;
            justify-content: flex-start;
          }

          #contact .contact-form-wrap {
            flex: 1 1 auto;
            min-height: 0;
          }

          #contact .contact-logo-loop {
            margin-top: auto;
            flex-shrink: 0;
          }
        }

        #contact .contact-card {
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
          gap: 0;
          width: 100%;
          max-width: 920px;
          align-items: stretch;
          border: 1px solid rgba(124, 58, 237, 0.42);
          background: rgba(15, 11, 26, 0.72);
          box-shadow:
            0 0 36px rgba(124, 58, 237, 0.2),
            inset 0 0 50px rgba(168, 85, 247, 0.04);
          backdrop-filter: blur(12px);
          font-family: inherit;
        }

        #contact .contact-panel {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.6rem;
          padding: 2.45rem;
          min-width: 0;
        }

        #contact .contact-effect-panel {
          position: relative;
          min-height: 360px;
          overflow: hidden;
          border-left: 1px solid rgba(124, 58, 237, 0.28);
          background:
            radial-gradient(circle at 50% 45%, rgba(124, 58, 237, 0.18), transparent 50%),
            #0f0b1a;
        }

        #contact .contact-iridescence {
          position: absolute;
          inset: 0;
          opacity: 0.82;
        }

        #contact .contact-effect-panel::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background:
            radial-gradient(circle at center, rgba(5, 3, 10, 0.08), rgba(5, 3, 10, 0.42) 72%, rgba(5, 3, 10, 0.72) 100%),
            linear-gradient(135deg, rgba(5, 3, 10, 0.18), rgba(92, 48, 158, 0.2));
        }

        #contact .contact-mhx-logo {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 3;
          width: clamp(280px, 34vw, 440px);
          height: auto;
          opacity: 0.92;
          filter: drop-shadow(0 0 22px rgba(168, 85, 247, 0.62));
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        #contact .contact-copy {
          color: rgba(255, 255, 255, 0.78);
          font-size: 1.4rem;
          line-height: 1.55;
          font-weight: 400;
          text-align: justify;
          text-wrap: pretty;
        }

        #contact .contact-links {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        #contact .contact-link-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 0.75rem;
          align-items: center;
          min-width: 0;
          padding: 1.18rem;
          border: 1px solid rgba(168, 85, 247, 0.34);
          background: rgba(124, 58, 237, 0.13);
          transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
        }

        #contact .contact-link-label {
          display: block;
          margin-bottom: 0.2rem;
          color: rgba(216, 180, 254, 0.94);
          font-size: 0.92rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        #contact .contact-link-value {
          display: block;
          color: rgba(255, 255, 255, 0.92);
          font-size: 1.22rem;
          font-weight: 700;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        #contact .contact-copy-button,
        #contact .contact-action {
          border: 1px solid rgba(168, 85, 247, 0.44);
          background: rgba(124, 58, 237, 0.24);
          color: rgba(255, 255, 255, 0.94);
          font-weight: 800;
          transition: all 180ms ease;
        }

        #contact .contact-copy-button {
          min-width: 6.4rem;
          padding: 0.9rem 1.05rem;
          font-size: 1.05rem;
          position: relative;
          overflow: hidden;
        }

        #contact .contact-copy-button.is-copied {
          background: rgba(216, 180, 254, 0.2);
          border-color: rgba(255, 255, 255, 0.68);
          color: #ffffff;
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.08),
            inset 0 0 18px rgba(255, 255, 255, 0.12);
          transform: translateY(1px) scale(0.98);
        }

        #contact .contact-copy-button.is-copied::after {
          content: '';
          position: absolute;
          inset: -40%;
          background: linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.42) 50%, transparent 65%);
          animation: contactCopySweep 820ms ease-out forwards;
          transform: translateX(120%);
        }

        @keyframes contactCopySweep {
          from {
            transform: translateX(-120%);
          }

          to {
            transform: translateX(120%);
          }
        }

        #contact .contact-copy-button:hover,
        #contact .contact-action:hover {
          background: rgba(168, 85, 247, 0.36);
          border-color: rgba(216, 180, 254, 0.68);
        }

        #contact .contact-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        #contact .contact-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.4rem;
          padding: 0.58rem 0.85rem;
          text-decoration: none;
        }

        @media (min-width: 768px) and (max-height: 850px) {
          #contact .contact-content-frame {
            padding-top: 4rem;
            padding-bottom: 1.5rem;
          }

          #contact .contact-heading {
            height: 112px;
          }

          #contact .contact-form-wrap {
            margin-top: 1.25rem;
          }

          #contact .contact-card {
            max-width: 820px;
          }

          #contact .contact-effect-panel {
            min-height: 260px;
          }

          #contact .contact-panel {
            gap: 0.85rem;
            padding: 1.25rem;
          }

          #contact .contact-copy {
            font-size: 0.98rem;
            line-height: 1.36;
          }

          #contact .contact-link-label {
            font-size: 0.68rem;
          }

          #contact .contact-link-value {
            font-size: 1rem;
          }

          #contact .contact-link-row {
            padding: 0.72rem;
          }

          #contact .contact-copy-button {
            font-size: 0.82rem;
          }

          #contact .contact-copy-button {
            padding: 0.62rem 0.78rem;
            min-width: 5.2rem;
          }

          #contact .contact-mhx-logo {
            width: clamp(220px, 30vw, 340px);
          }

          #contact .contact-logo-loop {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
        }

        @media (min-width: 768px) and (max-height: 780px) {
          #contact .contact-content-frame {
            padding-top: 4rem;
            padding-bottom: 0.75rem;
          }

          #contact .contact-heading {
            height: 96px;
          }

          #contact .contact-form-wrap {
            margin-top: 0.9rem;
          }

          #contact .contact-card {
            max-width: 760px;
          }

          #contact .contact-effect-panel {
            min-height: 250px;
          }

          #contact .contact-panel {
            gap: 0.72rem;
            padding: 1rem;
          }

          #contact .contact-copy {
            font-size: 0.9rem;
            line-height: 1.34;
          }

          #contact .contact-link-row {
            padding: 0.62rem;
          }

          #contact .contact-link-label {
            font-size: 0.62rem;
          }

          #contact .contact-link-value {
            font-size: 0.86rem;
          }

          #contact .contact-copy-button {
            min-width: 4.6rem;
            padding: 0.48rem 0.6rem;
            font-size: 0.76rem;
          }

          #contact .contact-mhx-logo {
            width: clamp(190px, 26vw, 300px);
          }

          #contact .contact-logo-loop {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
        }

        @media (max-width: 900px) {
          #contact .contact-card {
            grid-template-columns: 1fr;
            max-width: 620px;
          }

          #contact .contact-effect-panel {
            min-height: 220px;
            border-left: 0;
            border-top: 1px solid rgba(124, 58, 237, 0.28);
          }

          #contact .contact-panel {
            padding: 1.35rem;
          }

          #contact .contact-copy {
            font-size: 1.02rem;
          }
        }

        @media (max-width: 520px) {
          #contact .contact-link-row {
            grid-template-columns: 1fr;
          }

          #contact .contact-copy-button {
            width: 100%;
          }
        }
      `}</style>

      <div className="contact-content-frame relative z-10 w-full flex flex-1 flex-col justify-between items-center min-h-screen lg:min-h-0 lg:h-full">
        <div className="contact-heading relative w-full max-w-[1100px] h-[112px] sm:h-[140px] rounded-none overflow-visible border border-[#7c3aed]/50 mx-auto flex-shrink-0" style={{
          boxShadow: `0 0 40px rgba(169, 85, 247, 0.4),
                      0 0 80px rgba(169, 85, 247, 0.25),
                      0 0 120px rgba(124, 58, 237, 0.15),
                      inset 0 0 60px rgba(169, 85, 247, 0.1)`
        }}>
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
          <div
            className="absolute inset-0 z-[4] rounded-none pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(0,0,0,0) 48%, rgba(0,0,0,0.10) 72%, rgba(0,0,0,0.22) 100%)',
            }}
          />
          <div
            className="absolute inset-0 z-[5] rounded-none pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 0 1px rgba(168,85,247,0.14), inset 0 0 0 2px rgba(255,255,255,0.02)',
            }}
          />

          <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold italic tracking-tight text-center" style={{ color: '#ffffff' }}>
              Contact Me
            </h2>
          </div>
        </div>

        <div className="contact-form-wrap flex-1 flex items-center justify-center w-full px-6 z-20 mt-8 sm:mt-10 lg:mt-8">
          <div className="contact-card">
            <div className="contact-panel">
              <div>
                <p className="contact-copy">
                  Got a project, idea or practical web problem that needs a clear technical solution?
                  Reach out directly and I will get back to you as soon as I can.
                </p>
              </div>

              <div className="contact-links">
                <div className="contact-link-row">
                  <div>
                    <span className="contact-link-label">Email</span>
                    <a className="contact-link-value" href={`mailto:${email}`}>
                      {email}
                    </a>
                  </div>
                  <button
                    type="button"
                    className={`contact-copy-button ${copiedContact.email ? 'is-copied' : ''}`}
                    onClick={() => copyToClipboard('email', email)}
                  >
                    {copiedContact.email ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="contact-link-row">
                  <div>
                    <span className="contact-link-label">GitHub</span>
                    <a className="contact-link-value" href={githubUrl} target="_blank" rel="noopener noreferrer">
                      {githubUrl}
                    </a>
                  </div>
                  <button
                    type="button"
                    className={`contact-copy-button ${copiedContact.github ? 'is-copied' : ''}`}
                    onClick={() => copyToClipboard('github', githubUrl)}
                  >
                    {copiedContact.github ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

            </div>

            <div className="contact-effect-panel">
              <Iridescence
                className="contact-iridescence"
                color={IRIDESCENCE_COLOR}
                mouseReact={false}
                speed={0.5}
                amplitude={0.1}
              />
              <img
                className="contact-mhx-logo"
                src={`${import.meta.env.BASE_URL}mhx_logo.png`}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <div className="contact-logo-loop relative w-[calc(100%+2rem)] -mx-4 sm:w-[calc(100%+3rem)] sm:-mx-6 md:w-screen md:mx-0 md:-ml-[176px] overflow-hidden opacity-90 hover:opacity-100 transition-opacity duration-500 pt-14 pb-8 sm:pt-16 lg:py-8 z-20">
          <div className="absolute inset-0 bg-black/88 backdrop-blur-sm border-y border-purple-500/10 pointer-events-none" />
          <LogoLoop
            logos={techLogos}
            speed={15}
            logoHeight={50}
            gap={60}
            direction="right"
          />
        </div>
      </div>
    </section>
  )
}

export default Contact
