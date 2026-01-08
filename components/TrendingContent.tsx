
import React, { useRef, useState, useEffect } from 'react';
import type { VideoClip } from '../types';
import type { View } from '../App';
import VideoCard from './VideoCard';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface TrendingContentProps {
    clips: VideoClip[];
    setCurrentView: (view: View) => void;
}

const TrendingContent: React.FC<TrendingContentProps> = ({ clips, setCurrentView }) => {
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
        <h2 className="text-xl font-bold text-white mb-4">Explore Trending Content</h2>
        <div className="relative group fade-scroll-container">
            <div ref={scrollContainerRef} className="grid grid-flow-col auto-cols-[90%] sm:auto-cols-[45%] md:auto-cols-[40%] lg:auto-cols-[30%] xl:auto-cols-[23%] gap-4 overflow-x-auto pb-4 no-scrollbar px-4">
                {clips.map(clip => <VideoCard key={clip.id} clip={clip} setCurrentView={setCurrentView} />)}
            </div>
            {canScrollLeft && (
                <button onClick={() => scroll('left')} className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 w-10 h-10 bg-gray-800/80 hover:bg-gray-800 ui-rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-gray-700">
                    <ChevronLeftIcon className="w-5 h-5 text-white"/>
                </button>
            )}
            {canScrollRight && (
                <button onClick={() => scroll('right')} className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-10 h-10 bg-gray-800/80 hover:bg-gray-800 ui-rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-gray-700">
                    <ChevronRightIcon className="w-5 h-5 text-white"/>
                </button>
            )}
        </div>
    </section>
  );
};

export default TrendingContent;
