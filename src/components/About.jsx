import MagicBento from './MagicBento'
import Cubes from './Cubes'
import ShapeGrid from './ShapeGrid'
import Dither from './Dither'

function About() {
  const aboutItems = [
    {
      title: 'Developer',
      description: 'Currently studying at Tartu Vocational College. Passionate about understanding how digital systems solve complex real-world problems.',
      color: '#120F17',
    },
    {
      title: 'Excellence',
      description: 'Graduated high school with a silver medal in Information Technology.',
      color: '#120F17',
    },
    {
      title: 'Perspective',
      description: 'Leveraging a strong background in technical sales from Klick, Elisa and Telo24, I bring a unique, results-oriented perspective to software development and problem-solving.',
      color: '#120F17',
    },
    {
      description: (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <Cubes
            interactive={true}
            color='#6366f1'
            size={300}
            speed={0.5}
          />
        </div>
      ),
      color: '#120F17',
    },
    {
      title: 'Expertise',
      description: 'Completed the Apple Excellence program, mastering consumer hardware ecosystems.',
      color: '#120F17',
    },
    {
      title: 'Stack',
      description: 'Skilled in JS, HTML, CSS. Fluent in Estonian and English (C1).',
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
            align-items: center;
            padding-top: 2rem;
            position: relative;
            overflow: hidden;
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

          #about .card__header {
            width: 100%;
            text-align: center;
            margin-bottom: auto;
            order: -1;
            z-index: 10;
          }
          
          #about .card__content {
            margin-top: 0;
            width: 100%;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex: 1;
            z-index: 5;
          }
          
          #about .card__description {
            font-size: 1.125rem;
            line-height: 1.6;
          }
        `}
      </style>
      <section
      id="about"
      className="relative w-screen h-screen bg-[#0f0b1a] flex flex-col justify-start items-center py-16 px-6 overflow-hidden flex-shrink-0"
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
          squareSize={55}
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
      <div className="relative z-10 flex flex-col items-center w-full h-full">
        
        {/* Title Box - Same style as Hero MHX */}
        <div className="relative w-[85vw] max-w-[1000px] h-[140px] rounded-none overflow-visible border border-[#7c3aed]/50 mb-12" style={{
          boxShadow: `0 0 40px rgba(169, 85, 247, 0.4),
                      0 0 80px rgba(169, 85, 247, 0.25),
                      0 0 120px rgba(124, 58, 237, 0.15),
                      inset 0 0 60px rgba(169, 85, 247, 0.1)`
        }}>
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
            <h2 className="text-5xl md:text-6xl font-extrabold italic tracking-tight" style={{ 
              color: '#ffffff'
            }}>
              About Me
            </h2>
          </div>
        </div>

        {/* Alumine osa: Bento ja Pilt */}
        <div className="w-full max-w-[1400px] flex-1 flex flex-col lg:flex-row gap-8">
          <div className="flex-[2]">
            <MagicBento
              items={aboutItems}
              spotlightRadius={300}
              className="grid-cols-1 md:grid-cols-2 gap-5"
            />
          </div>
          
          {/* Pildi osa - lg:mt-10 nihutab pilti allapoole */}
          <div className="flex-1 flex justify-end lg:mt-10">
            <div className="relative w-full max-w-[480px] h-[600px] overflow-hidden border border-purple-500/10 rounded-[40px] shadow-2xl">
              <img
                src={`${import.meta.env.BASE_URL}mjaaartyeees.png`}
                alt="Märt"
                className="w-full h-full object-cover hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default About;