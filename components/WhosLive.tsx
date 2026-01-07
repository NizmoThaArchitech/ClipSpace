
import React, { useRef, useState, useEffect } from 'react';
import type { User } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface WhosLiveProps {
    creators: User[];
}

const LiveCreatorCard: React.FC<{ creator: User }> = ({ creator }) => {
    return (
        <div className="relative group flex-shrink-0 w-40 cursor-pointer">
            <div className="aspect-[3/4] bg-gray-700 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <img src={creator.avatarUrl} alt={creator.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
             <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                LIVE
            </div>
            <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white font-bold text-sm truncate">{creator.name}</p>
                <p className="text-gray-300 text-xs truncate">{creator.handle}</p>
            </div>
        </div>
    );
};

const WhosLive: React.FC<WhosLiveProps> = ({ creators }) => {
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
  }, [creators]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = direction === 'left' ? -el.clientWidth * 0.8 : el.clientWidth * 0.8;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section>
        <h2 className="text-2xl font-bold text-white mb-4">Who's Live</h2>
        <div className="relative group fade-scroll-container">
            <div ref={scrollContainerRef} className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar px-4">
                {creators.map(creator => <LiveCreatorCard key={creator.id} creator={creator} />)}
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

export default WhosLive;
