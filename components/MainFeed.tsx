
import React, { useState, useMemo } from 'react';
import { MOCK_VIDEO_CLIPS, MOCK_USERS, MOCK_TRENDING_CLIPS, MOCK_Tutorial_CLIPS, MOCK_LIVE_CREATORS } from '../constants';
import type { View, Theme } from '../App';
import VideoCard from './VideoCard';
import NewsFeed from './NewsFeed';
import CreatePost from './CreatePost';
import ActivityFeed from './ActivityFeed';
import CreatorShowcase from './CreatorShowcase';
import FeaturedCreator from './FeaturedCreator';
import TopCreatorsList from './TopCreatorsList';
import TrendingContent from './TrendingContent';
import CreatorTips from './CreatorTips';
import WhosLive from './WhosLive';

interface MainFeedProps {
  theme: Theme;
  setCurrentView: (view: View) => void;
}

const MainFeed: React.FC<MainFeedProps> = ({ setCurrentView, theme: _theme }) => {
  const [sortOrder, setSortOrder] = useState('newest');
  const creators = Object.values(MOCK_USERS);
  const topCreator = [...creators].sort((a, b) => (b.endorsements || 0) - (a.endorsements || 0))[0];

  const sortedClips = useMemo(() => {
    const sorted = [...MOCK_VIDEO_CLIPS];
    switch (sortOrder) {
      case 'popular':
        // A simple popularity sort for demonstration (e.g., by endorsements)
        return sorted.sort((a, b) => (b.creator.endorsements || 0) - (a.creator.endorsements || 0));
      case 'price_asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
      default:
        return MOCK_VIDEO_CLIPS; // Original order is newest
    }
  }, [sortOrder]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* SOCIAL POST CREATION */}
      <CreatePost />

      {/* WHO'S LIVE SECTION */}
      <WhosLive creators={MOCK_LIVE_CREATORS} />
      
      {/* NEWS FEED */}
      <NewsFeed />
      
      {/* ACTIVITY FEED */}
      <ActivityFeed />

      {/* EXPLORE CREATORS SECTION */}
      <CreatorShowcase creators={creators} setCurrentView={setCurrentView} />

      {/* MARKETPLACE SECTION */}
      <section id="marketplace-section" className="pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-white">Explore Clips</h1>
          <select 
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto">
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedClips.map((clip) => (
            <VideoCard key={clip.id} clip={clip} setCurrentView={setCurrentView} />
          ))}
        </div>
      </section>

      {/* TRENDING CONTENT SECTION */}
      <TrendingContent clips={MOCK_TRENDING_CLIPS} setCurrentView={setCurrentView} />

      {/* TOP/FEATURED CREATOR SECTION */}
      <FeaturedCreator creator={topCreator} setCurrentView={setCurrentView} />
      
      {/* TOP 10 CREATORS LIST */}
      <TopCreatorsList creators={creators} setCurrentView={setCurrentView} />

      {/* CREATOR 101 TIPS */}
      <CreatorTips clips={MOCK_Tutorial_CLIPS} />

    </div>
  );
};

export default MainFeed;
