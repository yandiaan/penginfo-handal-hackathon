import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const RainEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dropCount = 100;

    for (let i = 0; i < dropCount; i++) {
      const drop = document.createElement('div');

      Object.assign(drop.style, {
        position: 'absolute',
        width: '3px',
        height: '20px',
        background: 'linear-gradient(transparent, rgba(255, 255, 255, 0.4))',
        top: '-20px',
        left: Math.random() * 100 + '%',
        opacity: Math.random() * 0.5,
      });

      container.appendChild(drop);

      gsap.to(drop, {
        y: window.innerHeight,
        duration: Math.random() * 0.5 + 0.5,
        repeat: -1,
        ease: 'none',
        delay: Math.random() * 2,
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0" />
  );
};
