
import React, { useRef, useState, useEffect } from 'react';
import type { User } from '../types';
import type { View } from '../App';
import { UserPlusIcon } from './icons/UserPlusIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';


interface CreatorShowcaseProps {
    creators: User[];
    setCurrentView: (view: View) => void;
}

const CreatorCard: React.FC<{ creator: User; onClick: () => void }> = ({ creator, onClick }) => {
    return (
        <button onClick={onClick} className="bg-gray-700/50 rounded-lg p-4 text-center min-w-[180px] flex-shrink-0 flex flex-col items-center hover:bg-gray-700 transition-colors">
            <img src={creator.avatarUrl} alt={creator.name} className="w-20 h-20 rounded-full border-2 border-gray-600" />
            <h4 className="font-bold text-white mt-3 truncate w-full">{creator.name}</h4>
            <p className="text-xs text-gray-400 truncate w-full">{creator.handle}</p>
            <div className="flex justify-around w-full mt-3 text-xs">
                <div>
                    <p className="font-bold text-white">{((creator.followers || 0) / 1000).toFixed(1)}k</p>
                    <p className="text-gray-500">Followers</p>
                </div>
                 <div>
                    <p className="font-bold text-white">{creator.clipsSold || 0}</p>
                    <p className="text-gray-500">Sold</p>
                </div>
            </div>
            <div className="mt-4 w-full flex items-center justify-center bg-indigo-600 group-hover:bg-indigo-700 text-white font-semibold text-sm py-2 px-3 rounded-lg transition-colors">
                <UserPlusIcon className="w-4 h-4 mr-1.5" />
                Follow
            </div>
        </button>
    )
}

const CreatorShowcase: React.FC<CreatorShowcaseProps> = ({ creators, setCurrentView }) => {
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
        <h2 className="text-2xl font-bold text-white mb-4">Explore Content Creators</h2>
        <div className="relative group fade-scroll-container">
            <div ref={scrollContainerRef} className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar px-4">
                {creators.map(creator => <CreatorCard key={creator.id} creator={creator} onClick={() => setCurrentView('profile')} />)}
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

export default CreatorShowcase;
