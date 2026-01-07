
import React from 'react';
import type { View } from '../App';

interface FooterProps {
  setCurrentView: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  return (
    <footer className="w-full py-4 px-4 border-t bg-gray-800 border-gray-700/50 text-center z-30">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-y-2 gap-x-8 text-[10px] sm:text-xs text-gray-500 uppercase font-black tracking-widest">
          <span>&copy; {new Date().getFullYear()} ClipSpace, Inc.</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
              <button onClick={() => setCurrentView('terms')} className="hover:text-gray-300 transition-colors">Terms</button>
              <button onClick={() => setCurrentView('privacy')} className="hover:text-gray-300 transition-colors">Privacy</button>
              <button onClick={() => setCurrentView('pricing')} className="hover:text-gray-300 transition-colors">Pricing</button>
              <button onClick={() => setCurrentView('disclaimer')} className="hover:text-gray-300 transition-colors">Disclaimer</button>
              <button onClick={() => setCurrentView('agreement')} className="hover:text-gray-300 transition-colors">Agreement</button>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
