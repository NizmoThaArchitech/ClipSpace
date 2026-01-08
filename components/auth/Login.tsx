

import React, { useState, useEffect, useRef } from 'react';
import type { AuthView } from '../../AuthApp';
import { ClipspaceLogo } from '../icons/ClipspaceLogo';
import AuthFooter from './AuthFooter';

interface LoginProps {
  setAuthView: (view: AuthView) => void;
  onLoginSuccess: () => void;
}

// Decorative SVG icon components and internal Node/Spark types were removed to reduce lint noise
// and keep this file focused on rendering the login UI. Restore when needed.

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

  // default fallbacks - prefer the project's original background video if no local upload exists
  const primary = src ?? '/uploads/bg-medium-flow.mp4';
  const fallbackImage = '/images/bg-FbW.jpg';

  // Visual tuning
  const blur = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? '0px' : '6px';
  // 75% dark tint requested
  const tintOpacity = 0.75;
  const scale = 1.04;

  // Overlay removed per request — show only uploaded/default video (tint remains)

  const wrapperStyle: React.CSSProperties & Record<string, string> = { willChange: 'transform' } as React.CSSProperties & Record<string, string>;
  wrapperStyle['--tx'] = '0px';
  wrapperStyle['--ty'] = '0px';

  return (
    <div ref={wrapperRef} className="absolute inset-0 z-0 overflow-hidden" style={wrapperStyle}>
      <div className="absolute inset-0 transform-gpu" style={{ transform: 'translate3d(var(--tx, 0px), var(--ty, 0px), 0) scale(1.04)', transition: 'transform 800ms cubic-bezier(.2,.8,.2,1)' }}>
        <video
          ref={videoRef}
          aria-hidden
          className="w-full h-full object-cover pointer-events-none"
          playsInline
          autoPlay
          muted
          loop
          preload="auto"
          style={{ filter: `blur(${blur})`, transform: `scale(${scale})`, opacity: 1 }}
          onError={() => {
            console.warn('[VideoBackground] video failed to load', primary);
            setFailed(true);
          }}
          onCanPlay={() => setFailed(false)}
        >
          {primary && <source src={primary} type="video/mp4" />}
        </video>
      </div>

      {/* Overlay removed — only video + tint will render */}

      {/* dark tint to keep foreground legible; small backdrop blur for depth */}
      <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${tintOpacity})`, backdropFilter: 'blur(2px)' }} aria-hidden />

      {/* Blended overlay image (user-provided) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('/images/flow-overlay.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.95,
          mixBlendMode: 'screen',
          backgroundBlendMode: 'multiply',
        }}
      />

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
      {/* Video Background (use the VideoBackground component so overlay renders) */}
      <VideoBackground />
      
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
