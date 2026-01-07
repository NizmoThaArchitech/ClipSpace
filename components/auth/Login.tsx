

import React, { useState, useEffect, useRef } from 'react';
import type { AuthView } from '../../AuthApp';
import { ClipspaceLogo } from '../icons/ClipspaceLogo';
import AuthFooter from './AuthFooter';

interface LoginProps {
  setAuthView: (view: AuthView) => void;
  onLoginSuccess: () => void;
}

// Visual Node Components - Pure White Thinner Outlines
const LaptopIcon = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x - 12}, ${y - 12})`} className="opacity-30">
    <rect x="3" y="6" width="18" height="11" rx="0.5" fill="none" stroke="white" strokeWidth="0.8" />
    <path d="M1 18h22c0-0.5-0.5-1-1-1H2c-0.5 0-1 0.5-1 1z" fill="white" opacity="0.8" />
    <rect x="10" y="8" width="4" height="3" fill="white" opacity="0.1" />
  </g>
);

const ServerIcon = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x - 12}, ${y - 12})`} className="opacity-30">
    <rect x="5" y="3" width="14" height="18" rx="0.5" fill="none" stroke="white" strokeWidth="0.8" />
    <line x1="5" y1="9" x2="19" y2="9" stroke="white" strokeWidth="0.5" />
    <line x1="5" y1="15" x2="19" y2="15" stroke="white" strokeWidth="0.5" />
    <circle cx="8" cy="6" r="0.4" fill="white" />
    <circle cx="8" cy="12" r="0.4" fill="white" />
    <circle cx="8" cy="18" r="0.4" fill="white" />
  </g>
);

const PCIcon = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x - 12}, ${y - 12})`} className="opacity-30">
    <rect x="4" y="4" width="16" height="12" rx="0.5" fill="none" stroke="white" strokeWidth="0.8" />
    <path d="M8 20h8M12 16v4" stroke="white" strokeWidth="0.8" />
    <rect x="7" y="7" width="10" height="6" fill="white" opacity="0.1" />
  </g>
);

const GlobeWireframe = ({ x, y, size = 40 }: { x: number; y: number; size?: number }) => (
  <g transform={`translate(${x}, ${y})`} className="animate-globe-spin opacity-20">
    <circle cx="0" cy="0" r={size} fill="none" stroke="white" strokeWidth="0.3" />
    <ellipse cx="0" cy="0" rx={size} ry={size / 2.5} fill="none" stroke="white" strokeWidth="0.3" />
    <ellipse cx="0" cy="0" rx={size / 2.5} ry={size} fill="none" stroke="white" strokeWidth="0.3" />
    <line x1={-size} y1="0" x2={size} y2="0" stroke="white" strokeWidth="0.2" opacity="0.5" />
    <line x1="0" y1={-size} x2="0" y2={size} stroke="white" strokeWidth="0.2" opacity="0.5" />
  </g>
);

interface Node {
  id: number;
  x: number;
  y: number;
  type: 'laptop' | 'server' | 'pc' | 'globe';
}

interface Spark {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const VideoBackground: React.FC = () => {
  // Look for an uploaded video URL in localStorage (key: 'authBgVideo')
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    try {
      const u = localStorage.getItem('authBgVideo');
      if (u) setSrc(u);
    } catch (e) {
      // ignore localStorage access errors
    }

    const onChanged = (e: Event) => {
      const url = (e as CustomEvent).detail as string | null;
      setFailed(false);
      setSrc(url ?? null);
    };

    window.addEventListener('authBgVideoChanged', onChanged as EventListener);
    return () => window.removeEventListener('authBgVideoChanged', onChanged as EventListener);
  }, []);

  // Parallax: listen to mouse move (disabled if prefers-reduced-motion)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return; // respect user preference

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const nx = (e.clientX - w / 2) / (w / 2); // -1 .. 1
      const ny = (e.clientY - h / 2) / (h / 2); // -1 .. 1
      const maxX = 6; // px
      const maxY = 4; // px
      const tx = `${nx * maxX}px`;
      const ty = `${ny * maxY}px`;
      if (wrapperRef.current) {
        wrapperRef.current.style.setProperty('--tx', tx);
        wrapperRef.current.style.setProperty('--ty', ty);
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // default fallbacks - use a public sample if no local upload exists
  const primary = src ?? 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4';
  const fallbackImage = '/images/bg-FbW.jpg';

  // Visual tuning
  const blur = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? '0px' : '6px';
  const tintOpacity = 0.55;
  const scale = 1.04;

  // Flow overlay component — prefer AI-upscaled overlay, then Pillow 4x, then the original
  const FlowOverlay: React.FC = () => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Prefer the AI-upscaled overlay by default for immediate preview
    const [overlaySrc, setOverlaySrc] = useState<string>('/images/flow-overlay-4k-realesrgan.jpg');

    useEffect(() => {
      let mounted = true;
      const candidates = [
        '/images/flow-overlay-4k-realesrgan.jpg',
        '/images/flow-overlay-4k.jpg',
        '/images/flow-overlay.jpg',
      ];

      (async () => {
        for (const p of candidates) {
          try {
            // Prefer a cheap HEAD request first
            const res = await fetch(p, { method: 'HEAD' });
            if (res && res.ok) {
              if (!mounted) return;
              setOverlaySrc(p);
              return;
            }
            // Some hosts may not support HEAD; try GET as a final attempt
            const res2 = await fetch(p, { method: 'GET' });
            if (res2 && res2.ok) {
              if (!mounted) return;
              setOverlaySrc(p);
              return;
            }
          } catch (err) {
            // ignore and try next candidate
          }
        }
      })();

      return () => {
        mounted = false;
      };
    }, []);

    return (
      <div aria-hidden className="absolute inset-0 z-[5] pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
          <defs>
            <filter id="flowFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="2" seed="3" result="turb" />
              {!prefersReduced && <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="2" seed="5">
                <animate attributeName="baseFrequency" dur="18s" values="0.01 0.02;0.02 0.01;0.01 0.02" repeatCount="indefinite" />
              </feTurbulence>}
              <feDisplacementMap in="SourceGraphic" in2="turb" scale="30" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          <image href={overlaySrc} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" filter="url(#flowFilter)" opacity="0.5" />
        </svg>
      </div>
    );
  };

  return (
    <div ref={wrapperRef as any} className="absolute inset-0 -z-10 overflow-hidden" style={{ willChange: 'transform', ['--tx' as any]: '0px', ['--ty' as any]: '0px' }}>
      <div className="absolute inset-0 transform-gpu" style={{ transform: 'translate3d(var(--tx, 0px), var(--ty, 0px), 0) scale(1.04)', transition: 'transform 800ms cubic-bezier(.2,.8,.2,1)' }}>
        <video
          ref={videoRef as any}
          aria-hidden
          className="w-full h-full object-cover pointer-events-none"
          playsInline
          autoPlay
          muted
          loop
          preload="auto"
          style={{ filter: `blur(${blur})`, transform: `scale(${scale})` }}
          onError={() => {
            console.warn('[VideoBackground] video failed to load', primary);
            setFailed(true);
          }}
          onCanPlay={() => setFailed(false)}
        >
          {primary && <source src={primary} type="video/mp4" />}
        </video>
      </div>

      {/* Flow overlay (subtle animated displacement) */}
      <FlowOverlay />

      {/* dark tint to keep foreground legible; small backdrop blur for depth */}
      <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${tintOpacity})`, backdropFilter: 'blur(2px)' }} aria-hidden />

      {/* fallback background image for platforms that can't play the video */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${fallbackImage}')`, filter: `blur(${blur})`, opacity: failed ? 1 : 0 }} />

      {/* If everything failed, show subtle gradient so area isn't blank */}
      {failed && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" aria-hidden />
      )}
    </div>
  );
};

const Login: React.FC<LoginProps> = ({ setAuthView, onLoginSuccess }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden min-h-screen pb-32">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          src="/uploads/bg-medium-flow.mp4"
          poster="/images/bg-FbW.jpg"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* Auth Card - Strictly NO shadows as requested */}
      <div className="w-full max-w-[440px] mx-auto py-12 px-16 relative z-10 bg-[#161d2f]/90 backdrop-blur-[80px] border border-white/10 rounded-[4rem] shadow-none">
        <div className="text-center mb-10">
          <div className="bg-white/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-none">
             <ClipspaceLogo className="h-14 w-14" theme="dark" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white leading-none">
            Clip<span className="text-white/60">Space</span>
          </h1>
          <p className="text-gray-400 mt-4 font-black uppercase text-[10px] tracking-[0.7em] italic">Multi-Node Production Mesh</p>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-white text-lg font-black uppercase tracking-widest mb-2 italic">Signal Bridge Active</h2>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed opacity-70">
                Network authentication verified. Press the terminal initialization button to enter the global production hub.
            </p>
          </div>
          
          <button 
            onClick={onLoginSuccess}
            className="w-full flex justify-center py-8 px-4 border border-white/20 rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.5em] text-white bg-white/5 hover:bg-white/10 transition-all active:scale-95 group overflow-hidden relative shadow-none"
          >
            <span className="relative z-10">Initialize Terminal</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>

        <div className="mt-14 flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-white/10"></div>
            <p className="text-center text-[9px] font-black text-gray-500 uppercase tracking-[0.4em]">Node Protocol V4.2.1-GOLD</p>
            <div className="h-[1px] w-12 bg-white/10"></div>
        </div>
      </div>

      {/* Footer anchored to the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <AuthFooter setAuthView={setAuthView} />
      </div>
    </div>
  );
};

export default Login;
