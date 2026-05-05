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
  const repeatedLogos = Array.from({ length: 8 }, () => logos).flat()

  const renderLogo = (logoItem, index, groupIndex) => {
    const logo = typeof logoItem === 'string' ? logoItem : logoItem.src
    const link = typeof logoItem === 'string' ? null : logoItem.link
    const imgClassName = typeof logoItem === 'string' ? '' : logoItem.className || ''
    const itemClassName = typeof logoItem === 'string' ? '' : logoItem.itemClassName || ''
    
    const logoContent = (
      <>
        {typeof logo === 'string' ? (
          <img
            src={logo}
            alt={`Logo ${(index % logos.length) + 1}`}
            width={logoHeight}
            height={logoHeight}
            loading="lazy"
            decoding="async"
            className={imgClassName}
            style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
          />
        ) : (
          logo
        )}
      </>
    )

    return (
      <div
        key={`${groupIndex}-${index}`}
        className={`logo-loop-item ${itemClassName}`}
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
  }

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
        <div className="logo-loop-set">
          {repeatedLogos.map((logoItem, index) => renderLogo(logoItem, index, 0))}
        </div>
        <div className="logo-loop-set" aria-hidden="true">
          {repeatedLogos.map((logoItem, index) => renderLogo(logoItem, index, 1))}
        </div>
      </div>
    </div>
  )
}
