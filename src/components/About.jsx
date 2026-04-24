import MagicBento from './MagicBento'

function About() {

  return (
    <section 
      id="about"
      className="w-screen h-screen bg-dark-800 flex flex-col justify-center items-center flex-shrink-0 px-6"
    >
      <MagicBento
        spotlightRadius={200}
        enableStars={false}
        clickEffect={false}
        enableTilt={true}
        enableSpotlight={true}
        enableBorderGlow={true}
      />
    </section>
  )
}

export default About
