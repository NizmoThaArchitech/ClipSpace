
import React, { useRef, useState, useEffect } from 'react';
import { MOCK_ACTIVITIES, MOCK_USERS } from '../constants';
import { UploadIcon } from './icons/UploadIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { HeartIcon } from './icons/HeartIcon';
import { UserPlusIcon } from './icons/UserPlusIcon';
import { MessageIcon } from './icons/MessageIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

const ActivityFeed: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth -1); // -1 for precision issues
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
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = direction === 'left' ? -el.clientWidth * 0.75 : el.clientWidth * 0.75;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold text-white mb-3 px-4 pt-4">Recent Activity</h2>
      <div className="relative group fade-scroll-container">
        <div ref={scrollContainerRef} className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar px-4">
            {MOCK_ACTIVITIES.map(activity => {
                const user = MOCK_USERS[activity.user.toLowerCase().replace(/\s/g, '') as keyof typeof MOCK_USERS];
                return (
                    <div key={activity.id} className="flex items-center bg-gray-700/50 rounded-lg p-3 min-w-[280px] flex-shrink-0">
                        <div className="flex-shrink-0 mr-3">
                            {user && <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-300 truncate">
                                <span className="font-bold text-white">{activity.user}</span> {activity.description}
                            </p>
                             <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                    </div>
                );
            })}
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
    </div>
  );
};

export default ActivityFeed;