import './ElectricBorder.css'

export default function ElectricBorder({ children, borderRadius = 'rounded-xl', color = 'cyan', width = 'w-32', height = 'h-32', isActive = true }) {
  return (
    <div className={`electric-border-container ${borderRadius} ${width} ${height}`}>
      <div className={`electric-border-wrapper ${color} ${!isActive ? 'inactive' : ''}`}>
        <div className="electric-border-shine" />
        <div className="electric-border-glow" />
        {children}
      </div>
    </div>
  )
}
