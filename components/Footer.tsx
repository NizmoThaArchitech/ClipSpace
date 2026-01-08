
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
          <div className="flex items-center gap-x-6 gap-y-1">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
                <button onClick={() => setCurrentView('terms')} className="hover:text-gray-300 transition-colors">Terms</button>
                <button onClick={() => setCurrentView('privacy')} className="hover:text-gray-300 transition-colors">Privacy</button>
                <button onClick={() => setCurrentView('pricing')} className="hover:text-gray-300 transition-colors">Pricing</button>
                <button onClick={() => setCurrentView('disclaimer')} className="hover:text-gray-300 transition-colors">Disclaimer</button>
                <button onClick={() => setCurrentView('agreement')} className="hover:text-gray-300 transition-colors">Agreement</button>
              </div>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Back to top" className="ml-2 bg-gray-700 hover:bg-gray-600 text-gray-200 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L11 6.414V17a1 1 0 11-2 0V6.414L5.707 9.707A1 1 0 114.293 8.293l5-5A1 1 0 0110 3z" clipRule="evenodd" />
                </svg>
              </button>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
