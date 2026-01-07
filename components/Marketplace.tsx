
import React, { useState, useMemo } from 'react';
import type { View, Theme } from '../App';
import { MOCK_MARKETPLACE_LISTINGS, MOCK_MARKETPLACE_ACTIVITY, MOCK_CLIP_BUNDLES } from '../constants';
import MarketplaceCard from './MarketplaceCard';
import { WalletIcon } from './icons/WalletIcon';
import { UploadIcon } from './icons/UploadIcon';
import { ConvertIcon } from './icons/ConvertIcon';
import { ScaleIcon } from './icons/ScaleIcon';
import { AtSymbolIcon } from './icons/AtSymbolIcon';
import { EyeIcon } from './icons/EyeIcon';
import { ThumbsUpIcon } from './icons/ThumbsUpIcon';
import { MessageIcon } from './icons/MessageIcon';
import { ShareIcon } from './icons/ShareIcon';
import CheckoutModal from './CheckoutModal';
import type { VideoClip } from '../types';

type FilterType = 'all' | 'sell' | 'gig' | 'buy';

interface MarketplaceListing extends VideoClip {
    type: 'sell' | 'buy' | 'gig';
}

interface MarketplaceProps {
  theme: Theme;
  setCurrentView: (view: View) => void;
}

const UploadToMarketplace: React.FC = () => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700/50">
            <h3 className="text-lg font-bold text-white mb-3">Upload to Marketplace</h3>
            <div className="flex justify-center px-6 py-8 border-2 border-gray-600 border-dashed rounded-md text-center">
                <div className="space-y-1">
                    <UploadIcon className="mx-auto h-10 w-10 text-gray-500"/>
                    <p className="text-sm text-gray-400">Drag & drop or click to upload</p>
                    <p className="text-xs text-gray-500">List a clip for sale or create a gig</p>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-sm font-semibold text-gray-400 mb-2">Tools</p>
                <div className="flex justify-around bg-gray-700/50 p-2 rounded-lg">
                    <button onClick={() => console.log("Convert tool clicked")} className="flex flex-col items-center text-gray-300 hover:text-indigo-400 transition-colors text-xs space-y-1">
                        <ConvertIcon className="w-6 h-6"/>
                        <span>Convert</span>
                    </button>
                    <button onClick={() => console.log("Scale tool clicked")} className="flex flex-col items-center text-gray-300 hover:text-indigo-400 transition-colors text-xs space-y-1">
                        <ScaleIcon className="w-6 h-6"/>
                        <span>Scale</span>
                    </button>
                    <button onClick={() => console.log("Mention tool clicked")} className="flex flex-col items-center text-gray-300 hover:text-indigo-400 transition-colors text-xs space-y-1">
                        <AtSymbolIcon className="w-6 h-6"/>
                        <span>Mention</span>
                    </button>
                </div>
            </div>
             <button onClick={() => console.log("Create Listing clicked")} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors">
                Create Listing
            </button>
        </div>
    );
};

const LiveMarketplaceActivity: React.FC = () => {
    const getActivityIcon = (type: string) => {
        switch(type) {
            case 'view': return <EyeIcon className="w-4 h-4 text-sky-400"/>;
            case 'interest': return <ThumbsUpIcon className="w-4 h-4 text-green-400"/>;
            case 'contact': return <MessageIcon className="w-4 h-4 text-indigo-400"/>;
            case 'share': return <ShareIcon className="w-4 h-4 text-yellow-400"/>;
            default: return null;
        }
    }
    return (
         <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700/50">
            <h3 className="text-lg font-bold text-white mb-3">Live Activity</h3>
            <ul className="space-y-3">
                {MOCK_MARKETPLACE_ACTIVITY.map(activity => (
                    <li key={activity.id} className="flex items-start space-x-3">
                        <img src={activity.user.avatarUrl} alt={activity.user.name} className="w-8 h-8 rounded-full flex-shrink-0" />
                        <div className="text-sm">
                            <p className="text-gray-300">
                                <span className="font-bold text-white">{activity.user.name}</span> is interested in <span className="font-semibold text-indigo-400">{activity.listingTitle}</span>
                            </p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                         <div className="flex-shrink-0">{getActivityIcon(activity.type)}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Marketplace: React.FC<MarketplaceProps> = ({ setCurrentView, theme }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortOrder, setSortOrder] = useState('recent');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);

  const handleBuyNow = (listing: MarketplaceListing) => {
    setSelectedListing(listing);
    setIsCheckoutOpen(true);
  };
  
  const sortedAndFilteredListings = useMemo(() => {
    let listings = MOCK_MARKETPLACE_LISTINGS as MarketplaceListing[];

    if (activeFilter !== 'all') {
      listings = listings.filter(item => item.type === activeFilter);
    }

    switch (sortOrder) {
      case 'popular':
        return [...listings].sort((a, b) => (b.creator.endorsements || 0) - (a.creator.endorsements || 0));
      case 'price_asc':
        return [...listings].sort((a, b) => a.price - b.price);
      case 'price_desc':
        return [...listings].sort((a, b) => b.price - a.price);
      case 'recent':
      default:
        return listings;
    }
  }, [activeFilter, sortOrder]);

  const FilterButton: React.FC<{ filterType: FilterType, text: string }> = ({ filterType, text }) => (
    <button
      onClick={() => setActiveFilter(filterType)}
      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${activeFilter === filterType ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
    >
      {text}
    </button>
  );

  return (
    <>
      {isCheckoutOpen && selectedListing && (
        <CheckoutModal 
          listing={selectedListing} 
          onClose={() => setIsCheckoutOpen(false)}
          theme={theme}
        />
      )}
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-gray-900">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">ClipSpace Marketplace</h1>
            <p className="text-gray-400 mt-1">Buy, sell, or commission B-roll clips.</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg border border-gray-700/50">
              <WalletIcon className="w-5 h-5 text-green-400"/>
              <span className="text-sm text-gray-400">Balance:</span>
              <span className="font-bold text-white text-lg">$1,284.50</span>
          </div>
        </div>

        {/* Featured Bundles Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Featured Clip Bundles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_CLIP_BUNDLES.map(bundle => (
              <div key={bundle.id} className="bg-gray-800 rounded-lg shadow-lg flex items-center gap-4 p-4 border border-gray-700/50 hover:bg-gray-700/50 transition-colors">
                <img src={bundle.thumbnailUrl} alt={bundle.title} className="w-24 h-24 rounded-md object-cover flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white">{bundle.title}</h3>
                  <p className="text-sm text-gray-400">{bundle.clipCount} clips by {bundle.creator.name}</p>
                  <div className="flex items-baseline gap-4 mt-2">
                    <p className="text-2xl font-bold text-green-400">${bundle.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 line-through">${bundle.originalPrice.toFixed(2)}</p>
                  </div>
                </div>
                <button onClick={() => console.log('View bundle clicked')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg self-end">View Bundle</button>
              </div>
            ))}
          </div>
        </section>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-gray-800 p-1.5 rounded-lg">
            <FilterButton filterType="all" text="All" />
            <FilterButton filterType="sell" text="For Sale" />
            <FilterButton filterType="gig" text="Gigs" />
            <FilterButton filterType="buy" text="Seeking" />
          </div>
          <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
              <option value="recent">Sort by: Recent</option>
              <option value="popular">Sort by: Popular</option>
              <option value="price_desc">Sort by: Price High-Low</option>
              <option value="price_asc">Sort by: Price Low-High</option>
          </select>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_22rem] gap-8 items-start">
          {/* Listings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedAndFilteredListings.map(listing => (
              <MarketplaceCard key={listing.id} listing={listing} setCurrentView={setCurrentView} onBuyNow={handleBuyNow} />
            ))}
          </div>
          
          {/* Right Sidebar */}
          <div className="hidden lg:flex flex-col gap-8 sticky top-4">
              <UploadToMarketplace />
              <LiveMarketplaceActivity />
          </div>
        </div>
      </div>
    </>
  );
};

export default Marketplace;
