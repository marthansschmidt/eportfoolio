import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'
import { useEffect, useRef, useState } from 'react'

function Contact() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const headerAnim = useScrollAnimation()
  const infoAnim = useScrollAnimation({ threshold: 0.2 })
  const formAnim = useScrollAnimation({ threshold: 0.2 })
  const { containerRef: linksRef, visibleItems } = useStaggerAnimation(3, 120)

  const socialLinks = [
    {
      name: 'hello@example.com',
      href: 'mailto:hello@example.com',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      ),
      fill: false,
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      ),
      fill: true,
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      ),
      fill: true,
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-screen h-screen py-32 bg-dark-800 flex flex-col justify-center flex-shrink-0 transition-all duration-1000"
      style={{
        opacity: isVisible ? 1 : 0.7,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          ref={headerAnim.ref}
          className={`mb-16 transition-all duration-1000 ease-out ${
            headerAnim.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            04 — Contact
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 tracking-tight">
            Get in Touch
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div
            ref={infoAnim.ref}
            className={`transition-all duration-1000 delay-200 ease-out ${
              infoAnim.isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-10'
            }`}
          >
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Interested in working together or have any questions?
              Drop me a message and let's talk!
            </p>

            <div ref={linksRef} className="space-y-6">
              {socialLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-4 text-gray-400 hover:text-accent
                           transition-all duration-500 group
                           ${visibleItems.includes(index)
                             ? 'opacity-100 translate-x-0'
                             : 'opacity-0 -translate-x-8'
                           }`}
                  style={{
                    transitionDelay: visibleItems.includes(index) ? '0ms' : `${index * 120}ms`
                  }}
                >
                  <div className="w-12 h-12 bg-dark-600 rounded-full flex items-center justify-center
                                group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <svg
                      className="w-5 h-5"
                      fill={link.fill ? 'currentColor' : 'none'}
                      stroke={link.fill ? 'none' : 'currentColor'}
                      viewBox="0 0 24 24"
                    >
                      {link.icon}
                    </svg>
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formAnim.ref}
            className={`space-y-6 transition-all duration-1000 delay-300 ease-out ${
              formAnim.isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="group">
              <label htmlFor="name" className="block text-sm text-gray-400 mb-2 group-focus-within:text-accent transition-colors duration-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 bg-dark-600 border border-dark-600 rounded-lg
                         text-white placeholder-gray-500 focus:border-accent focus:outline-none
                         focus:shadow-lg focus:shadow-accent/10 transition-all duration-300"
                placeholder="Your name"
              />
            </div>

            <div className="group">
              <label htmlFor="email" className="block text-sm text-gray-400 mb-2 group-focus-within:text-accent transition-colors duration-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 bg-dark-600 border border-dark-600 rounded-lg
                         text-white placeholder-gray-500 focus:border-accent focus:outline-none
                         focus:shadow-lg focus:shadow-accent/10 transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>

            <div className="group">
              <label htmlFor="message" className="block text-sm text-gray-400 mb-2 group-focus-within:text-accent transition-colors duration-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-3 bg-dark-600 border border-dark-600 rounded-lg
                         text-white placeholder-gray-500 focus:border-accent focus:outline-none
                         focus:shadow-lg focus:shadow-accent/10 transition-all duration-300 resize-none"
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-accent text-white font-medium rounded-lg
                       hover:bg-accent/80 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20
                       active:scale-[0.98] transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
