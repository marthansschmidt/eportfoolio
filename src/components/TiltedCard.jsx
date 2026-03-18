import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './TiltedCard.css';

const springConfig = { damping: 30, stiffness: 150, mass: 0.5 };

export default function TiltedCard({
  children,
  containerHeight = '300px',
  containerWidth = '100%',
  rotateAmplitude = 14,
  scaleOnHover = 1.1,
  showTooltip = true,
  tooltipText = 'MHX',
  displayOverlayContent = true,
  overlayContent = null,
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);
  const scale = useSpring(1, springConfig);

  const tooltipX = useMotionValue(0);
  const tooltipY = useMotionValue(0);
  const tooltipOpacity = useSpring(0, springConfig);
  const tooltipRotate = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);

    x.set(offsetX);
    y.set(offsetY);

    tooltipX.set(e.clientX - rect.left);
    tooltipY.set(e.clientY - rect.top);

    const velocityX = offsetX - x.getPrevious();
    tooltipRotate.set(velocityX * 0.5);
  };

  const handleMouseEnter = () => {
    scale.set(scaleOnHover);
    tooltipOpacity.set(1);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    tooltipOpacity.set(0);
    tooltipRotate.set(0);
  };

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="tilted-card-inner"
        style={{
          width: '100%',
          height: '100%',
          rotateX,
          rotateY,
          scale,
        }}
      >
        {children}

        {displayOverlayContent && overlayContent && (
          <motion.div className="tilted-card-overlay">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.span
          className="tilted-card-caption"
          style={{
            x: tooltipX,
            y: tooltipY,
            opacity: tooltipOpacity,
            rotate: tooltipRotate,
          }}
        >
          {tooltipText}
        </motion.span>
      )}
    </figure>
  );
}
