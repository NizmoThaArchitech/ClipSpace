
import React from 'react';
import type { AuthView } from '../../AuthApp';

interface AuthFooterProps {
  setAuthView: (view: AuthView) => void;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ setAuthView }) => {
  return (
    <footer className="w-full py-4 px-6 bg-gray-700 text-center z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center gap-y-2 gap-x-6 text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
          <span className="opacity-40 italic tracking-tighter text-center w-full md:w-auto">&copy; {new Date().getFullYear()} ClipSpace Protocol. Tier 1 Network Node.</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <button onClick={() => setAuthView('terms')} className="hover:text-indigo-400 transition-colors bg-transparent border-none cursor-pointer uppercase font-black tracking-widest text-gray-300">Terms</button>
              <button onClick={() => setAuthView('privacy')} className="hover:text-indigo-400 transition-colors bg-transparent border-none cursor-pointer uppercase font-black tracking-widest text-gray-300">Privacy</button>
              <button onClick={() => setAuthView('pricing')} className="hover:text-indigo-400 transition-colors bg-transparent border-none cursor-pointer uppercase font-black tracking-widest text-gray-300">Tiers</button>
              <button onClick={() => setAuthView('disclaimer')} className="hover:text-indigo-400 transition-colors bg-transparent border-none cursor-pointer uppercase font-black tracking-widest text-gray-300">Disclaimers</button>
              <button onClick={() => setAuthView('agreement')} className="hover:text-indigo-400 transition-colors bg-transparent border-none cursor-pointer uppercase font-black tracking-widest text-gray-300">Node Agreement</button>
          </div>
      </div>
    </footer>
  );
};

export default AuthFooter;
