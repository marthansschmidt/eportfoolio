import { useEffect, useState } from 'react'
import MagicBento from './MagicBento'
import ShapeGrid from './ShapeGrid'
import Dither from './Dither'
import Cubes from './Cubes'

function About() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const aboutItems = [
    {
      title: 'Developer',
      description: 'Junior developer studying software development at Tartu Vocational College, focused on building clear and practical web solutions.',
      color: '#120F17',
    },
    {
      title: 'Learning Mindset',
      description: 'Curious, consistent and quick to learn. I enjoy turning new concepts into working features through hands-on practice.',
      color: '#120F17',
    },
    {
      title: 'Technical Foundation',
      description: 'Built on an IT-focused education, a silver medal graduation and the Apple Excellence program.',
      color: '#120F17',
    },
    {
      description: (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <div className="about-cubes-wrap flex items-center justify-center">
            <Cubes
              radius={1}
              gridSize={5}
              cellGap={6}
              autoAnimate={false}
            />
          </div>
        </div>
      ),
      color: '#120F17',
    },
    {
      title: 'Customer Perspective',
      description: 'Experience in technical sales at Klick, Elisa and Telo24 helps me understand user needs, communicate clearly and solve real problems.',
      color: '#120F17',
    },
    {
      title: 'Tools & Stack',
      description: (
        <ul className="about-stack-list">
          <li>JavaScript, HTML, CSS</li>
          <li>React and Tailwind</li>
          <li>Estonian and English (C1)</li>
        </ul>
      ),
      color: '#120F17',
    }
  ];

  return (
    <>
      <style>
        {`
          #about .card {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 2rem 2.25rem;
            position: relative;
            overflow: hidden;
            flex-shrink: 0;
          }
          
          /* Creative kasti (4. element) eriseadistus, et Cubes täidaks kasti ja pealkiri jääks peale */
          #about .card:nth-child(4) .card__content {
             position: absolute;
             inset: 0;
             width: 100%;
             height: 100%;
             padding: 0;
             margin: 0;
             display: flex;
             align-items: center;
             justify-content: center;
          }

          #about .about-cubes-wrap {
            width: min(58%, calc(100% - 4rem));
            max-width: 230px;
            aspect-ratio: 1 / 1;
          }

          #about .about-cubes-wrap .default-animation {
            width: 100%;
          }

          #about .card__header {
            width: 100%;
            text-align: left;
            margin-bottom: 1.35rem;
            order: -1;
            z-index: 10;
          }
          
          #about .card__content {
            margin-top: 0;
            width: 100%;
            text-align: left;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            flex: 1;
            z-index: 5;
          }
          
          #about .card__description {
            font-size: 1.35rem;
            line-height: 1.55;
          }

          #about .about-stack-list {
            list-style: disc;
            list-style-position: outside;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.55rem;
            margin: 0;
            padding-left: 1.2rem;
            font-size: 1.35rem;
            line-height: 1.45;
          }

          #about .bento-section {
            padding: 0;
            max-width: 100%;
            width: 100%;
            z-index: 20;
          }

          #about .card-responsive {
            width: 100%;
            padding: 0;
            grid-template-columns: repeat(${isMobile ? 1 : 2}, minmax(0, 1fr));
          }

          @media (min-width: 768px) {
            #about .about-content {
              width: calc(100vw - 176px);
              max-width: none;
              margin-left: 176px;
              padding: 0 24px;
            }

            #about .about-main {
              max-width: 1400px;
            }
          }

          @media (min-width: 1024px) {
            #about .about-content {
              height: 100%;
              min-height: 0;
            }

            #about .about-main {
              min-height: 0;
            }

            #about .about-bento-wrap,
            #about .bento-section,
            #about .card-responsive {
              height: 100%;
              min-height: 0;
            }

            #about .card-responsive {
              grid-template-rows: repeat(3, minmax(0, 1fr));
              gap: 1.25rem;
            }

            #about .card {
              min-height: 0;
              padding: 1.75rem 2.1rem;
            }

            #about .about-cubes-wrap {
              width: auto;
              height: min(calc(100% - 3rem), 190px);
              max-width: 190px;
            }

            #about .card__title {
              font-size: 2rem;
            }

            #about .card__description {
              font-size: 1.18rem;
              line-height: 1.5;
            }

            #about .about-stack-list {
              font-size: 1.18rem;
              gap: 0.45rem;
            }
          }

          @media (min-width: 1280px) {
            #about .card {
              padding: 1.9rem 2.25rem;
            }
          }

          @media (max-width: 767px) {
            #about .card-responsive {
              gap: 1.1rem;
            }

            #about .card {
              min-height: 170px;
              padding: 1.25rem;
            }

            #about .about-cubes-wrap {
              width: auto;
              height: min(calc(100% - 3rem), 132px);
              max-width: 132px;
            }

            #about .card__description {
              font-size: 1rem;
              line-height: 1.5;
            }

            #about .about-stack-list {
              font-size: 1rem;
              gap: 0.35rem;
            }
          }
        `}
      </style>
      <div
      id="about"
      className="relative w-full min-h-screen lg:h-screen bg-[#0f0b1a] flex flex-col justify-start items-center pt-32 pb-8 sm:pt-36 sm:pb-12 lg:pt-16 lg:pb-12 xl:pb-14 px-4 sm:px-6 md:px-0 flex-shrink-0 overflow-hidden"
    >
      {/* 1. Põhja gradient */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          background: `radial-gradient(circle at 20% 50%, rgba(159, 128, 215, 0.15) 0%, transparent 60%),
                       radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 60%)`
        }}
      />

      {/* 2. ShapeGrid */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ opacity: 0.5 }}>
        <ShapeGrid
          direction="up"
          speed={0.25}
          borderColor="#a490c9"
          squareSize={isMobile ? 38 : 55}
          hoverFillColor="#7c3aed"
          shape="hexagon"
          hoverTrailAmount={0}
        />
      </div>

      {/* 3. Dünaamiline Blur - Ainult äärtes */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          maskImage: 'radial-gradient(circle, transparent 30%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 30%, black 100%)',
        }}
      />

      {/* 4. Vinjett */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          boxShadow: 'inset 0 0 250px rgba(0,0,0,0.9)',
        }}
      />

      {/* 5. SISU KONTEINER */}
      <div className="about-content relative z-10 flex flex-col items-center w-full max-w-[1400px] min-h-screen lg:min-h-0 lg:h-full">
        
        {/* Title Box - Same style as Hero MHX */}
        <div className="relative w-full max-w-[1100px] h-[112px] sm:h-[140px] rounded-none overflow-visible border border-[#7c3aed]/50 mx-auto flex-shrink-0" style={{
          boxShadow: `0 0 40px rgba(169, 85, 247, 0.4),
                      0 0 80px rgba(169, 85, 247, 0.25),
                      0 0 120px rgba(124, 58, 237, 0.15),
                      inset 0 0 60px rgba(169, 85, 247, 0.1)`
        }}>
          {/* Dither background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-y-0 left-1/2 w-[125%] -translate-x-1/2">
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
          </div>

          {/* Dark tint */}
          <div className="absolute inset-0 z-[1] bg-[#05030a]/40" />

          {/* Slight purple/blue tint */}
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

          {/* Extra edge vignette */}
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

          {/* Title Text */}
          <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold italic tracking-tight text-center" style={{ 
              color: '#ffffff'
            }}>
              About Me
            </h2>
          </div>
        </div>

        {/* Alumine osa: Bento ja Pilt */}
        <div className="about-main w-full flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch mt-8 lg:mt-9 xl:mt-10">
          <div className="w-full lg:flex-[2] min-w-0 order-1">
            <div className="about-bento-wrap w-full max-w-[420px] sm:max-w-[500px] md:max-w-[900px] lg:max-w-none mx-auto">
              <MagicBento
                items={aboutItems}
                spotlightRadius={300}
                className="grid-cols-1 md:grid-cols-2 gap-5"
              />
            </div>
          </div>
          
          {/* Pildi osa - lg:mt-10 nihutab pilti allapoole */}
          <div className="w-full lg:flex-1 flex justify-center lg:justify-end order-2 min-w-0">
            <div className="relative w-full max-w-[480px] h-[360px] sm:h-[460px] lg:h-full lg:max-h-full overflow-hidden border border-purple-500/10 rounded-[28px] sm:rounded-[40px] shadow-2xl flex-shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}mjaaartyeees_640.jpg`}
                alt="Märt"
                width="480"
                height="640"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[center_18%] hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default About;
