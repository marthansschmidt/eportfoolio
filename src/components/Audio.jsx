import { useScrollAnimation } from '../hooks/useScrollAnimation'
import AudioVisualizer from './AudioVisualizer'

function Audio() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section
      id="audio"
      ref={ref}
      className="relative min-h-screen py-24 bg-dark-900"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-purple-400 text-sm font-medium tracking-wider uppercase mb-4">
            04 — Audio
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            3D Audio Visualizer
          </h2>
          <p className="text-gray-400 max-w-xl">
            Interactive audio visualization. Upload an MP3 file and watch the sphere react to the music frequencies.
          </p>
        </div>

        {/* Visualizer Container */}
        <div
          className={`relative h-[600px] rounded-2xl overflow-hidden bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <AudioVisualizer />
        </div>
      </div>
    </section>
  )
}

export default Audio
