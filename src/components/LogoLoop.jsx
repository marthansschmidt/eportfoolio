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
        {[...Array(4)].map((_, setIndex) => (
          <div key={setIndex} className="logo-loop-set">
            {logos.map((logo, index) => (
              <div
                key={`${setIndex}-${index}`}
                className="logo-loop-item"
                style={{ height: `${logoHeight}px` }}
              >
                {typeof logo === 'string' ? (
                  <img
                    src={logo}
                    alt={`Logo ${index + 1}`}
                    style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
                  />
                ) : (
                  logo
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
