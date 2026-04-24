import './LogoLoop.css'

export default function LogoLoop({
  logos = [],
  speed = 50,
  logoHeight = 80,
  gap = 70,
  direction = 'right',
  className = ''
}) {
  const animationDuration = `${100 / (speed / 10)}s`
  const animationDirection = direction === 'right' ? 'normal' : 'reverse'

  return (
    <div className={`logo-loop-container ${className}`}>
      <div
        className="logo-loop-track"
        style={{
          '--animation-duration': animationDuration,
          '--animation-direction': animationDirection,
          '--gap': `${gap}px`
        }}
      >
        {[...Array(20)].map((_, setIndex) => (
          <div key={setIndex} className="logo-loop-set">
            {logos.map((logoItem, index) => {
              const logo = typeof logoItem === 'string' ? logoItem : logoItem.src
              const link = typeof logoItem === 'string' ? null : logoItem.link
              
              const logoContent = (
                <>
                  {typeof logo === 'string' ? (
                    <img
                      src={logo}
                      alt={`Logo ${index + 1}`}
                      style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
                    />
                  ) : (
                    logo
                  )}
                </>
              )

              return (
                <div
                  key={`${setIndex}-${index}`}
                  className="logo-loop-item"
                  style={{ height: `${logoHeight}px` }}
                >
                  {link ? (
                    <a 
                      href={link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}
                    >
                      {logoContent}
                    </a>
                  ) : (
                    logoContent
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
