import { Suspense, lazy, useEffect, useState } from 'react'

const DarkVeil = lazy(() => import('./DarkVeil'))

function DeferredDarkVeil(props) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return (
      <div
        className="w-full h-full"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(124, 58, 237, 0.24), transparent 42%), linear-gradient(180deg, #0f0b1a 0%, #05030a 100%)',
        }}
      />
    )
  }

  return (
    <Suspense fallback={<div className="w-full h-full bg-[#0f0b1a]" />}>
      <DarkVeil {...props} />
    </Suspense>
  )
}

export default DeferredDarkVeil
