import { Suspense, lazy, useEffect, useState } from 'react'

const Dither = lazy(() => import('./Dither'))

function DeferredDither(props) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const schedule = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 1))
    const cancel = window.cancelIdleCallback || window.clearTimeout
    let idleHandle
    const timeoutHandle = window.setTimeout(() => {
      idleHandle = schedule(() => setShouldRender(true), { timeout: 2500 })
    }, 6500)

    return () => {
      window.clearTimeout(timeoutHandle)
      if (idleHandle) {
        cancel(idleHandle)
      }
    }
  }, [])

  if (!shouldRender) {
    return (
      <div className="w-full h-full bg-[#05030a]" />
    )
  }

  return (
    <Suspense fallback={null}>
      <div className="w-full h-full animate-[ditherFadeIn_900ms_ease-out_both]">
        <style>{`
          @keyframes ditherFadeIn {
            from {
              opacity: 0;
              filter: blur(10px);
            }

            to {
              opacity: 1;
              filter: blur(0);
            }
          }
        `}</style>
        <Dither {...props} />
      </div>
    </Suspense>
  )
}

export default DeferredDither
