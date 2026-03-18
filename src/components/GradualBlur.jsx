import { useRef, useEffect, useState } from 'react'
import './GradualBlur.css'

function GradualBlur({
  direction = 'bottom',
  blurLayers = 4,
  maxBlur = 8,
  className = ''
}) {
  const layers = Array.from({ length: blurLayers }, (_, i) => {
    const blur = ((i + 1) / blurLayers) * maxBlur
    const clipStart = (i / blurLayers) * 100
    const clipEnd = ((i + 1) / blurLayers) * 100

    const clipPath = direction === 'bottom'
      ? `inset(${clipStart}% 0 ${100 - clipEnd}% 0)`
      : direction === 'top'
      ? `inset(${100 - clipEnd}% 0 ${clipStart}% 0)`
      : direction === 'left'
      ? `inset(0 ${100 - clipEnd}% 0 ${clipStart}%)`
      : `inset(0 ${clipStart}% 0 ${100 - clipEnd}%)`

    return (
      <div
        key={i}
        className="gradual-blur-layer"
        style={{
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          clipPath,
        }}
      />
    )
  })

  return (
    <div className={`gradual-blur-container ${className}`}>
      {layers}
    </div>
  )
}

export default GradualBlur
