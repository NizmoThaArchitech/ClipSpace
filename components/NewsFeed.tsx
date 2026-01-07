
import React, { useState } from 'react';
import { NEWS_ITEMS, MOCK_ANALYTICS_DATA, MOCK_LIVE_OFFERS } from '../constants';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { HeartIcon } from './icons/HeartIcon';
import { UsersIcon } from './icons/UsersIcon';
import { DollarIcon } from './icons/DollarIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { StarIcon } from './icons/StarIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { NudgeIcon } from './icons/NudgeIcon';
import { ShareIcon } from './icons/ShareIcon';

const LiveOfferFeed: React.FC = () => {
    return (
        <div>
            <h2 className="text-lg font-bold text-white mb-3">Live B-Roll Offers</h2>
            <div className="space-y-2">
                {MOCK_LIVE_OFFERS.map(offer => (
                    <div key={offer.id} className="bg-gray-700/50 p-3 rounded-lg">
                        <p className="text-sm text-gray-300"><span className="font-bold text-white">{offer.requestor}</span> needs:</p>
                        <p className="text-sm text-white my-1">{offer.description}</p>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-sm font-bold text-green-400">Budget: ${offer.budget}</span>
                            <button className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 font-semibold">
                                <NudgeIcon className="w-4 h-4" /> Nudge
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const NewsSlide: React.FC = () => {
    const bgColors = ['bg-indigo-500', 'bg-cyan-600', 'bg-emerald-600'];
    const iconMap = {
        'Sparkles': <SparklesIcon className="w-6 h-6 text-indigo-100"/>,
        'Star': <StarIcon className="w-6 h-6 text-cyan-100"/>,
        'Calendar': <CalendarIcon className="w-6 h-6 text-emerald-100"/>,
    };

    return (
    <div className="w-full flex-shrink-0 flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-1/2">
            <h2 className="text-lg font-bold text-white mb-3">What's Happening</h2>
            <div className="flex flex-col items-start gap-2">
                {NEWS_ITEMS.map((item, index) => (
                    <div key={item.id} className={`group w-full flex items-center justify-between p-3 rounded-lg ${bgColors[index % bgColors.length]}`}>
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                {iconMap[item.icon as keyof typeof iconMap]}
                            </div>
                            <div>
                                <p className="text-white text-sm font-medium">{item.text}</p>
                                <p className="text-gray-200/70 text-xs mt-0.5">{item.timestamp}</p>
                            </div>
                        </div>
                        <button className="p-2 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-opacity">
                            <ShareIcon className="w-4 h-4 text-white" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
        <div className="hidden md:flex justify-center self-stretch my-4">
             <div className="w-px bg-gray-700/50"></div>
        </div>
        <div className="w-full md:w-1/2">
             <LiveOfferFeed />
        </div>
    </div>
    );
};

const AnalyticsSlide: React.FC = () => {
    const getIcon = (iconName: string) => {
        switch(iconName) {
            case 'TrendingUp': return <TrendingUpIcon className="w-8 h-8 text-indigo-400"/>;
            case 'Heart': return <HeartIcon className="w-8 h-8 text-pink-400"/>;
            case 'Users': return <UsersIcon className="w-8 h-8 text-cyan-400"/>;
            case 'Dollar': return <DollarIcon className="w-8 h-8 text-green-400"/>;
            default: return null;
        }
    }
    return (
    <div className="w-full flex-shrink-0">
        <h2 className="text-lg font-bold text-white mb-2">Your Weekly Insights</h2>
        <div className="grid grid-cols-2 gap-4">
            {MOCK_ANALYTICS_DATA.map(stat => (
                <div key={stat.id} className="bg-gray-700/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">{stat.label}</p>
                        {getIcon(stat.icon)}
                    </div>
                    <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                    <p className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{stat.change}</p>
                </div>
            ))}
        </div>
    </div>
    )
};


const NewsFeed: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = [<NewsSlide key="news" />, <AnalyticsSlide key="analytics" />];
    const totalSlides = slides.length;

    const prevSlide = () => {
        setCurrentIndex(current => (current === 0 ? totalSlides - 1 : current - 1));
    }
    const nextSlide = () => {
        setCurrentIndex(current => (current === totalSlides - 1 ? 0 : current + 1));
    }

  return (
    <div className="relative group fade-scroll-container">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)`}}>
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 p-4 box-border">{slide}</div>
            ))}
        </div>
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-gray-700">
          <ChevronLeftIcon className="w-6 h-6 text-white"/>
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-gray-700">
          <ChevronRightIcon className="w-6 h-6 text-white"/>
      </button>
    </div>
  );
};

export default NewsFeed;
