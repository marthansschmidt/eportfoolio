import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

const dist = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance, maxDist, minVal, maxVal) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const TextPressure = ({
  text = 'Compressa',
  fontFamily = 'Compressa VF',
  // This font is just an example, you should not use it in commercial projects.
  fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',

  width = true,
  weight = true,
  invertWeightOnHover = false,
  italic = true,
  alpha = false,

  flex = true,
  stroke = false,
  scale = false,

  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  strokeWidth = 2,
  className = '',

  minFontSize = 24,
  maxFontSize
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const hasInteractedRef = useRef(false);

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);
  const [fontLoaded, setFontLoaded] = useState(false);

  const chars = text.split('');
  const isInteractive = width || weight || alpha || invertWeightOnHover;

  // Font loading detection
  useEffect(() => {
    if (!fontUrl) {
      setFontLoaded(true);
      return;
    }

    const checkFont = async () => {
      try {
        await document.fonts.load(`1em "${fontFamily}"`);
        setFontLoaded(true);
      } catch (e) {
        console.error("Font loading failed:", e);
        // Fallback to true after a timeout to at least show something
        setTimeout(() => setFontLoaded(true), 2000);
      }
    };

    checkFont();
  }, [fontFamily, fontUrl]);

  useEffect(() => {
    if (!isInteractive) return undefined;

    const handleMouseMove = e => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = e => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const container = containerRef.current;
    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      hasInteractedRef.current = true;
    };
    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        cursorRef.current.x = left + width / 2;
        cursorRef.current.y = top + height / 2;
      }
    };

    container?.addEventListener('mouseenter', handleMouseEnter);
    container?.addEventListener('mouseleave', handleMouseLeave);

    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      container?.removeEventListener('mouseenter', handleMouseEnter);
      container?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isInteractive]);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current || !fontLoaded) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();
    if (containerW <= 0 || containerH <= 0) return;

    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);
    if (maxFontSize) {
      newFontSize = Math.min(newFontSize, maxFontSize);
    }

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, maxFontSize, scale, fontLoaded]);

  useEffect(() => {
    const debouncedSetSize = debounce(setSize, 100);
    debouncedSetSize();
    window.addEventListener('resize', debouncedSetSize);
    return () => window.removeEventListener('resize', debouncedSetSize);
  }, [setSize]);

  useEffect(() => {
    if (!fontLoaded) return;

    if (!isInteractive) {
      spansRef.current.forEach(span => {
        if (!span) return;
        const staticFontVariationSettings = `'wght' 1000, 'wdth' 100, 'ital' ${italic ? 1 : 0}`;
        if (span.style.fontVariationSettings !== staticFontVariationSettings) {
          span.style.fontVariationSettings = staticFontVariationSettings;
        }
      });
      return;
    }

    let rafId;
    const animate = () => {
      const ease = isHoveringRef.current ? 18 : 42;
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / ease;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / ease;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        if (maxDist <= 0) {
          rafId = requestAnimationFrame(animate);
          return;
        }

        spansRef.current.forEach(span => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
          };

          const d = dist(mouseRef.current, charCenter);

          const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
          const rawWeight = Math.floor(getAttr(d, maxDist, 100, 900));
          const wght = weight
            ? invertWeightOnHover
              ? isHoveringRef.current
                ? Math.max(100, 1000 - rawWeight)
                : hasInteractedRef.current
                  ? Math.min(900, rawWeight)
                  : 900
              : rawWeight
            : 1000;
          const italVal = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : 0;
          const alphaVal = alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : 1;

          const newFontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;

          if (span.style.fontVariationSettings !== newFontVariationSettings) {
            span.style.fontVariationSettings = newFontVariationSettings;
          }
          if (alpha && span.style.opacity !== alphaVal) {
            span.style.opacity = alphaVal;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, invertWeightOnHover, italic, alpha, fontLoaded, isInteractive]);

  const styleElement = useMemo(() => {
    return (
      <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-style: normal;
          font-display: swap;
        }
        .stroke span {
          position: relative;
          color: ${textColor};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: ${strokeWidth}px;
          -webkit-text-stroke-color: ${strokeColor};
        }
        .text-pressure-title span {
          transition: font-variation-settings 420ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease;
        }
      `}</style>
    );
  }, [fontFamily, fontUrl, textColor, strokeColor, strokeWidth]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-transparent flex items-center justify-center">
      {styleElement}
      <h1
        ref={titleRef}
        className={`text-pressure-title ${flex ? 'flex justify-between' : ''
          } ${stroke ? 'stroke' : ''} ${className} uppercase text-center transition-opacity duration-300 ${fontLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          fontFamily,
          fontSize: fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center center',
          margin: 0,
          fontWeight: 100,
          color: stroke ? undefined : textColor,
          fontVariationSettings: weight ? undefined : "'wght' 2000, 'wdth' 100, 'ital' 1"
        }}
      >
        {chars.map((char, i) => (
          <span key={i} ref={el => (spansRef.current[i] = el)} data-char={char} className="inline-block">
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
