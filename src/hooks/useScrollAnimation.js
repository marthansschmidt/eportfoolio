import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [options.threshold, options.rootMargin])

  return { ref, isVisible }
}

export function useStaggerAnimation(itemCount, baseDelay = 100) {
  const [visibleItems, setVisibleItems] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, i])
            }, i * baseDelay)
          }
          observer.unobserve(container)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(container)

    return () => {
      observer.unobserve(container)
    }
  }, [itemCount, baseDelay])

  return { containerRef, visibleItems }
}
