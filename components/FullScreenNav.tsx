import React, { useState, useEffect } from 'react';
import type { Theme } from '../App';
import { CloseIcon } from './icons/CloseIcon';

interface FullScreenNavProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

const FullScreenNav: React.FC<FullScreenNavProps> = ({ isOpen, onClose, theme: _theme }) => {
  const [navStyle, setNavStyle] = useState<'columns' | 'imagegrid'>('columns');
  const imagePaths = ['/images/fullnav/1.jpg','/images/fullnav/2.jpg','/images/fullnav/3.jpg','/images/fullnav/4.jpg','/images/fullnav/maecia.jpg','/images/fullnav/eau.jpg'];
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    imagePaths.forEach(p => {
      const img = new Image();
      img.src = p;
      img.onload = () => setImagesLoaded(prev => ({ ...prev, [p]: true }));
      img.onerror = () => setImagesLoaded(prev => ({ ...prev, [p]: false }));
    });
  }, []);

  const hasAnyImage = Object.values(imagesLoaded).some(Boolean);

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-start justify-center">
      <div className="w-full h-full relative max-w-screen-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/5">
          <CloseIcon className="w-5 h-5 text-white" />
        </button>

        <div className="p-8 h-full flex flex-col">
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-3xl font-black text-white">Navigation</h2>
            {/* Nav button above separator */}
            <button className="w-full py-2 px-4 bg-indigo-700 text-white font-black rounded-lg mb-2">Main Nav</button>
            <div className="theme-chooser flex gap-2 bg-white/3 rounded-lg overflow-hidden">
              {/* Use uploaded images as theme choices */}
              <button onClick={() => setNavStyle('columns')} className={`theme-choice flex-1 px-0 py-0 ${navStyle === 'columns' ? 'bg-white/6' : ''}`} style={{backgroundImage: `url('/images/fullnav/columns.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="font-black bg-black/60 p-2 rounded">Columns</div>
              </button>
              <div className="vertical-sep" />
              <button onClick={() => setNavStyle('imagegrid')} className={`theme-choice flex-1 px-0 py-0 ${navStyle === 'imagegrid' ? 'bg-white/6' : ''}`} style={{backgroundImage: `url('/images/fullnav/imagegrid.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="font-black bg-black/60 p-2 rounded">Image Grid</div>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            {navStyle === 'columns' ? (
              <div className="grid grid-cols-4 gap-6 h-full">
                <div className="bg-gray-900 rounded-2xl p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-black text-white">Studio</h3>
                  <p className="text-gray-400 mt-2">Our principles, services, clients, accolades and team members.</p>
                </div>
                <div className="bg-gradient-to-b from-indigo-700 to-pink-600 rounded-2xl p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-black text-white">Work</h3>
                  <p className="text-gray-200 mt-2">A handful of case studies for our favorite projects.</p>
                </div>
                <div className="bg-gray-900 rounded-2xl p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-black text-white">News</h3>
                  <p className="text-gray-400 mt-2">Thoughts and opinions on industry topics and company updates.</p>
                </div>
                <div className="bg-gray-900 rounded-2xl p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-black text-white">Contact</h3>
                  <p className="text-gray-400 mt-2">Our studio locations and career opportunities.</p>
                </div>
              </div>
            ) : (
              (hasAnyImage ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 h-full fullnav-image-grid">
                  {imagePaths.filter(p => imagesLoaded[p]).map((p, i) => (
                    <div key={p} className="tile" style={{ backgroundImage: `url('${p}')` }}>
                      {i === Math.floor((imagePaths.filter(p => imagesLoaded[p]).length - 1) / 2) && (
                        <div className="center-badge">CLIPSPACE</div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-300">No images found — switch to "Columns" or upload images to /images/fullnav/</div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenNav;
