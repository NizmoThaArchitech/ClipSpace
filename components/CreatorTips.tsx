
import React, { useRef, useState, useEffect } from 'react';
import type { VideoClip } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface CreatorTipsProps {
    clips: VideoClip[];
}

const TutorialCard: React.FC<{ clip: VideoClip }> = ({ clip }) => {
    return (
        <div className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col transition-shadow duration-300 hover:shadow-2xl hover:shadow-indigo-500/30">
            <div className="relative aspect-video">
                <img src={clip.thumbnailUrl} alt={clip.title} className="object-cover w-full h-full" />
                 <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white opacity-0 group-hover:opacity-80 transform group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                </div>
                 <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
                    TUTORIAL
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors duration-200 truncate">{clip.title}</h3>
                <div className="flex items-center mt-2">
                    <img src={clip.creator.avatarUrl} alt={clip.creator.name} className="w-6 h-6 rounded-full mr-2" />
                    <span className="text-sm font-medium text-gray-300">{clip.creator.name}</span>
                </div>
            </div>
        </div>
    );
}

const CreatorTips: React.FC<CreatorTipsProps> = ({ clips }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollability();
    const el = scrollContainerRef.current;
    el?.addEventListener('scroll', checkScrollability);
    window.addEventListener('resize', checkScrollability);
    return () => {
      el?.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [clips]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = direction === 'left' ? -el.clientWidth * 0.8 : el.clientWidth * 0.8;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section>
        <h2 className="text-2xl font-bold text-white mb-4">Creator 101: Tip Videos</h2>
        <div className="relative group fade-scroll-container">
            <div ref={scrollContainerRef} className="grid grid-flow-col auto-cols-[80%] sm:auto-cols-[45%] md:auto-cols-[35%] lg:auto-cols-[30%] xl:auto-cols-[23%] gap-4 overflow-x-auto pb-4 no-scrollbar px-4">
                {clips.map(clip => <TutorialCard key={clip.id} clip={clip} />)}
            </div>
            {canScrollLeft && (
                <button onClick={() => scroll('left')} className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-gray-700">
                    <ChevronLeftIcon className="w-6 h-6 text-white"/>
                </button>
            )}
            {canScrollRight && (
                <button onClick={() => scroll('right')} className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-gray-700">
                    <ChevronRightIcon className="w-6 h-6 text-white"/>
                </button>
            )}
        </div>
    </section>
  );
};

export default CreatorTips;