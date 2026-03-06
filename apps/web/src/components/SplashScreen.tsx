import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplashScreenProps {
  onComplete: () => void;
}

const P_PATH =
  'M20.3792 0.125C7.69689 0.125 0.125 8.07213 0.125 21.3833V37.5816C0.125 43.2477 4.71834 47.841 10.3844 47.841V39.8627C10.3844 37.5473 12.2616 35.6701 14.577 35.6701H26.1815C28.4968 35.6701 30.3741 37.5473 30.3741 39.8627V47.841C36.0729 47.841 40.6922 43.2212 40.6922 37.5229V21.3839C40.6922 8.07213 33.0985 0.125 20.3792 0.125Z';

const DOT_PATH =
  'M49.0499 12.0974C52.4567 12.0974 55.125 9.42913 55.125 6.02233C55.125 2.77041 52.4001 0.125 49.0499 0.125C45.7008 0.125 42.9754 2.79691 42.9754 6.08158C42.9759 9.39847 45.7008 12.0974 49.0499 12.0974Z';

const STEM_PATH =
  'M43.9207 47.8405C49.554 47.8405 54.1204 43.2737 54.1204 37.6409V14.9538C48.487 14.9538 43.9207 19.5207 43.9207 25.1534V47.8405Z';

const GLITCH_CHARS = '!<>-_\/[]{}=+*^?#_ABCDEFXYZ01';

const lerpHex = (a: string, b: string, t: number): string => {
  const p = (h: string) => [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
  const [r1, g1, b1] = p(a);
  const [r2, g2, b2] = p(b);
  const r = (v: number) => Math.round(v).toString(16).padStart(2, '0');
  return `#${r(r1 + (r2 - r1) * t)}${r(g1 + (g2 - g1) * t)}${r(b1 + (b2 - b1) * t)}`;
};

const ASSETS_TO_PRELOAD = [
  '/logo.svg',
  '/about-ilustration.svg',
  '/background-about.jpg',
  '/line-white.svg',
  '/line-white-2.svg',
  '/screenshot-1.png',
];

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRectRef = useRef<SVGRectElement>(null);
  const scanlineRectRef = useRef<SVGRectElement>(null);
  const glitchRedRef = useRef<SVGGElement>(null);
  const glitchCyanRef = useRef<SVGGElement>(null);
  const logoWrapperRef = useRef<SVGGElement>(null);
  const progressNumRef = useRef<HTMLSpanElement>(null);
  const progressSegmentsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const gradStop1Ref = useRef<SVGStopElement>(null);
  const gradStop2Ref = useRef<SVGStopElement>(null);
  const gradStop3Ref = useRef<SVGStopElement>(null);
  const ghostGroupRef = useRef<SVGGElement>(null);
  const outlineGroupRef = useRef<SVGGElement>(null);
  const logoGlowRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(fillRectRef.current, { attr: { y: 48, height: 0 } });
      gsap.set(scanlineRectRef.current, { attr: { y: 48, height: 0 } });
      gsap.set(glitchRedRef.current, { x: 0, y: 0, opacity: 0 });
      gsap.set(glitchCyanRef.current, { x: 0, y: 0, opacity: 0 });

      // ── Periodic glitch burst
      const scheduleGlitch = () => {
        const delay = 0.6 + Math.random() * 2.2;
        gsap.delayedCall(delay, () => {
          const offsetR = 1.2 + Math.random() * 1.8;
          const offsetC = -(1.2 + Math.random() * 1.8);
          const tl = gsap.timeline({ onComplete: scheduleGlitch });
          tl.to(
            glitchRedRef.current,
            {
              x: offsetR,
              y: Math.random() * 0.6 - 0.3,
              opacity: 0.55,
              duration: 0.04,
              ease: 'none',
            },
            0,
          )
            .to(
              glitchCyanRef.current,
              {
                x: offsetC,
                y: Math.random() * 0.6 - 0.3,
                opacity: 0.45,
                duration: 0.04,
                ease: 'none',
              },
              0,
            )
            .to(
              logoWrapperRef.current,
              {
                x: Math.random() * 1.5 - 0.75,
                skewX: Math.random() * 2 - 1,
                duration: 0.05,
                ease: 'none',
              },
              0.04,
            )
            .to(
              glitchRedRef.current,
              { x: -offsetR * 0.5, opacity: 0.3, duration: 0.04, ease: 'none' },
              0.09,
            )
            .to(
              glitchCyanRef.current,
              { x: offsetC * 0.5, opacity: 0.25, duration: 0.04, ease: 'none' },
              0.09,
            )
            .to(
              [glitchRedRef.current, glitchCyanRef.current],
              { x: 0, y: 0, opacity: 0, duration: 0.05, ease: 'none' },
              0.13,
            )
            .to(logoWrapperRef.current, { x: 0, skewX: 0, duration: 0.05, ease: 'none' }, 0.13);
        });
      };
      scheduleGlitch();

      let labelRaf = 0;
      const scrambleThen = (final: string, duration: number) => {
        cancelAnimationFrame(labelRaf);
        let start: number | null = null;
        const el = labelRef.current;
        if (!el) return;
        const step = (ts: number) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / (duration * 1000), 1);
          el.textContent = final
            .split('')
            .map((c, i) =>
              i < Math.floor(progress * final.length)
                ? c
                : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
            )
            .join('');
          if (progress < 1) labelRaf = requestAnimationFrame(step);
          else el.textContent = final;
        };
        labelRaf = requestAnimationFrame(step);
      };

      const labelCycles = ['LOADING RESOURCES...', 'LOADING ASSETS...', 'INITIALIZING...', 'COM'];
      let lcIdx = 0;
      const runLabelCycle = () => scrambleThen(labelCycles[lcIdx++ % labelCycles.length], 0.4);
      runLabelCycle();
      const labelTimer = setInterval(runLabelCycle, 1400);

      let loaded = 0;
      const total = ASSETS_TO_PRELOAD.length;
      const counter = { pct: 0 };
      let allLoaded = false;

      const handleAssetLoad = () => {
        loaded++;
        const targetPct = Math.round((loaded / total) * 100);
        if (loaded >= total) allLoaded = true;

        gsap.to(counter, {
          pct: targetPct,
          duration: 0.45,
          ease: 'power1.out',
          onUpdate() {
            const pct = Math.round(counter.pct);

            if (progressNumRef.current) {
              progressNumRef.current.textContent = String(pct).padStart(3, '0');
            }

            // t: 0 when pct<=50, eases to 1 at pct=100
            const t = Math.max(0, (pct - 50) / 50);
            const accentCol = lerpHex('#ffffff', '#fe733a', t);
            const acR = parseInt(accentCol.slice(1, 3), 16);
            const acG = parseInt(accentCol.slice(3, 5), 16);
            const acB = parseInt(accentCol.slice(5, 7), 16);
            const rgba = (a: number) => `rgba(${acR},${acG},${acB},${a.toFixed(2)})`;

            // Logo fill — set directly on the rect (gradient stop updates don't repaint reliably)
            if (fillRectRef.current) fillRectRef.current.setAttribute('fill', accentCol);

            // Outline strokes on logo
            if (outlineGroupRef.current) {
              outlineGroupRef.current.querySelectorAll('path').forEach((p) => {
                p.setAttribute('stroke', accentCol);
              });
            }

            // Ghost skeleton tint
            if (ghostGroupRef.current) {
              ghostGroupRef.current.querySelectorAll('path').forEach((p) => {
                p.setAttribute('fill', rgba(0.04));
                p.setAttribute('stroke', rgba(0.18));
              });
            }

            // Drop-shadow glow
            if (logoGlowRef.current) {
              logoGlowRef.current.style.filter = `drop-shadow(0 0 10px ${accentCol}99)`;
            }

            // Glitch channel fills: white → their target colors
            if (glitchRedRef.current) {
              const redCol = lerpHex('#ffffff', '#ff2200', t);
              glitchRedRef.current.querySelectorAll('path').forEach((p) => {
                p.setAttribute('fill', redCol);
              });
            }
            if (glitchCyanRef.current) {
              const orangeCol = lerpHex('#ffffff', '#fe733a', t);
              glitchCyanRef.current.querySelectorAll('path').forEach((p) => {
                p.setAttribute('fill', orangeCol);
              });
            }

            // Label text
            if (labelRef.current) {
              labelRef.current.style.color = rgba(0.65 - 0.1 * t);
            }

            // Percentage number
            if (progressNumRef.current) {
              progressNumRef.current.style.color = accentCol;
              progressNumRef.current.style.textShadow = `0 0 12px ${accentCol}, 0 0 28px ${accentCol}55`;
            }

            // % symbol
            if (percentRef.current) {
              percentRef.current.style.color = rgba(0.5 - 0.15 * t);
            }

            // Progress segments
            if (progressSegmentsRef.current) {
              const segs = progressSegmentsRef.current.children;
              const litCount = Math.round((pct / 100) * segs.length);
              for (let i = 0; i < segs.length; i++) {
                const seg = segs[i] as HTMLElement;
                if (i < litCount) {
                  seg.style.background = accentCol;
                  seg.style.boxShadow = `0 0 4px ${accentCol}, 0 0 10px ${accentCol}88`;
                } else {
                  seg.style.background = rgba(0.07);
                  seg.style.boxShadow = 'none';
                }
              }
            }

            const fillH = 48 * (counter.pct / 100);
            const fillY = 48 - fillH;
            if (fillRectRef.current) {
              fillRectRef.current.setAttribute('y', String(fillY));
              fillRectRef.current.setAttribute('height', String(fillH));
            }
            if (scanlineRectRef.current) {
              scanlineRectRef.current.setAttribute('y', String(fillY));
              scanlineRectRef.current.setAttribute('height', String(fillH));
            }
          },
          onComplete() {
            if (!allLoaded) return;
            clearInterval(labelTimer);
            cancelAnimationFrame(labelRaf);
            scrambleThen('[ COMPLETE ]', 0.5);

            // Glitch dissolve exit — no slide
            gsap.delayedCall(0.9, () => {
              const exitTl = gsap.timeline({ onComplete: onComplete });
              exitTl
                .to(containerRef.current, {
                  x: 10,
                  skewX: 3,
                  filter: 'blur(1px) brightness(2)',
                  duration: 0.05,
                  ease: 'none',
                })
                .to(containerRef.current, {
                  x: -14,
                  skewX: -5,
                  filter: 'blur(3px) brightness(0.4)',
                  duration: 0.05,
                  ease: 'none',
                })
                .to(containerRef.current, {
                  x: 7,
                  skewX: 2,
                  filter: 'blur(1px) brightness(2.5)',
                  duration: 0.04,
                  ease: 'none',
                })
                .to(containerRef.current, {
                  x: -5,
                  skewX: -2,
                  filter: 'blur(2px) brightness(0.3)',
                  duration: 0.04,
                  ease: 'none',
                })
                .to(containerRef.current, {
                  x: 0,
                  skewX: 0,
                  filter: 'blur(0px) brightness(1)',
                  duration: 0.03,
                  ease: 'none',
                })
                .to(
                  containerRef.current,
                  {
                    filter: 'blur(18px) brightness(4)',
                    opacity: 0,
                    duration: 0.35,
                    ease: 'power2.in',
                  },
                  '+=0.15',
                );
            });
          },
        });
      };

      const assetTimers: ReturnType<typeof setTimeout>[] = [];
      ASSETS_TO_PRELOAD.forEach((src) => {
        let settled = false;
        const finish = () => {
          if (settled) return;
          settled = true;
          handleAssetLoad();
        };
        const assetTimer = setTimeout(finish, 8000);
        assetTimers.push(assetTimer);
        const img = new Image();
        img.onload = finish;
        img.onerror = finish;
        img.src = src;
      });

      return () => {
        clearInterval(labelTimer);
        cancelAnimationFrame(labelRaf);
        assetTimers.forEach(clearTimeout);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const segments = Array.from({ length: 20 });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: '#0d0805',
        backgroundImage:
          'linear-gradient(rgba(254,115,58,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(254,115,58,0.04) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        willChange: 'transform',
      }}
    >
      {/* CRT scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)',
          zIndex: 1,
        }}
      />

      {/* Corner brackets */}
      <div className="pointer-events-none absolute inset-6" style={{ zIndex: 2 }}>
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-400/40" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-400/40" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-400/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-400/40" />
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center" style={{ zIndex: 3 }}>
        {/* SVG Logo */}
        <div ref={logoGlowRef} style={{ filter: 'drop-shadow(0 0 10px #ffffff99)' }}>
          <svg
            width="150"
            height="128"
            viewBox="0 0 56 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            overflow="visible"
          >
            <defs>
              <clipPath id="cyberLogoClip">
                <path d={P_PATH} />
                <path d={DOT_PATH} />
                <path d={STEM_PATH} />
              </clipPath>

              <filter id="cyberGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="0.7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <pattern
                id="scanPattern"
                x="0"
                y="0"
                width="60"
                height="3"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="60" height="1.2" fill="rgba(0,0,0,0.3)" />
              </pattern>

              <linearGradient
                id="cyberFillGrad"
                x1="0"
                y1="1"
                x2="0"
                y2="0"
                gradientUnits="objectBoundingBox"
              >
                <stop ref={gradStop1Ref} offset="0%" stopColor="#ffffff" />
                <stop ref={gradStop2Ref} offset="50%" stopColor="#ffffff" />
                <stop ref={gradStop3Ref} offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>

            {/* Ghost skeleton */}
            <g ref={ghostGroupRef}>
              <path
                d={P_PATH}
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="0.3"
              />
              <path
                d={DOT_PATH}
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="0.3"
              />
              <path
                d={STEM_PATH}
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="0.3"
              />
            </g>

            {/* Chromatic aberration — dark red channel (glitch only) */}
            <g ref={glitchRedRef} clipPath="url(#cyberLogoClip)">
              <path d={P_PATH} fill="#ffffff" />
              <path d={DOT_PATH} fill="#ffffff" />
              <path d={STEM_PATH} fill="#ffffff" />
            </g>

            {/* Chromatic aberration — orange channel (glitch only) */}
            <g ref={glitchCyanRef} clipPath="url(#cyberLogoClip)">
              <path d={P_PATH} fill="#ffffff" />
              <path d={DOT_PATH} fill="#ffffff" />
              <path d={STEM_PATH} fill="#ffffff" />
            </g>

            {/* Main jitterable group */}
            <g ref={logoWrapperRef}>
              <g clipPath="url(#cyberLogoClip)">
                <rect ref={fillRectRef} x="-2" y="48" width="62" height="0" fill="#ffffff" />
                <rect
                  ref={scanlineRectRef}
                  x="-2"
                  y="48"
                  width="62"
                  height="0"
                  fill="url(#scanPattern)"
                />
              </g>
              <g ref={outlineGroupRef}>
                <path
                  d={P_PATH}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.55"
                  filter="url(#cyberGlow)"
                />
                <path
                  d={DOT_PATH}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.55"
                  filter="url(#cyberGlow)"
                />
                <path
                  d={STEM_PATH}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.55"
                  filter="url(#cyberGlow)"
                />
              </g>
            </g>
          </svg>
        </div>

        {/* Scrambling label */}
        <div
          ref={labelRef}
          className="mt-5 font-mono text-xs tracking-[0.25em] uppercase select-none"
          style={{ color: 'rgba(255,255,255,0.65)', minWidth: '18ch', textAlign: 'center' }}
        >
          LOADING RESOURCES...
        </div>

        {/* Percentage */}
        <div className="mt-6 flex items-baseline gap-1 font-mono tabular-nums select-none">
          <span
            ref={progressNumRef}
            className="text-6xl font-bold leading-none"
            style={{ color: '#ffffff', textShadow: '0 0 12px #ffffff, 0 0 28px #ffffff55' }}
          >
            000
          </span>
          <span
            ref={percentRef}
            className="text-lg font-light"
            style={{ color: 'rgba(255,255,255,0.50)' }}
          >
            %
          </span>
        </div>

        {/* Segmented neon progress bar */}
        <div ref={progressSegmentsRef} className="mt-4 flex gap-0.75">
          {segments.map((_, i) => (
            <div
              key={i}
              style={{
                width: '9px',
                height: '3px',
                background: 'rgba(255,255,255,0.07)',
                borderRadius: '1px',
                transition: 'background 0.15s, box-shadow 0.15s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
