
import React, { useState, useRef, useEffect } from 'react';
import type { VideoClip } from '../types';
import type { View } from '../App';
import EndorsementLevelIcon from './icons/EndorsementLevelIcon';
import { ThumbsUpIcon } from './icons/ThumbsUpIcon';
import { ThumbsDownIcon } from './icons/ThumbsDownIcon';
import { MessageIcon } from './icons/MessageIcon';
import { ShareIcon } from './icons/ShareIcon';
import { DollarIcon } from './icons/DollarIcon';

interface MarketplaceListing extends VideoClip {
    type: 'sell' | 'buy' | 'gig';
}

interface MarketplaceCardProps {
  listing: MarketplaceListing;
  setCurrentView: (view: View) => void;
  onBuyNow: (listing: MarketplaceListing) => void;
}

const MarketplaceCard: React.FC<MarketplaceCardProps> = ({ listing, setCurrentView, onBuyNow }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const hoverTimeoutRef = useRef<number | null>(null);
    const flipBackTimeoutRef = useRef<number | null>(null);

    const clearTimeouts = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        if (flipBackTimeoutRef.current) clearTimeout(flipBackTimeoutRef.current);
    };

    useEffect(() => {
        // Cleanup timeouts on component unmount
        return () => clearTimeouts();
    }, []);

    useEffect(() => {
        if (isFlipped && !isLocked) {
            flipBackTimeoutRef.current = window.setTimeout(() => {
                setIsFlipped(false);
            }, 7500); // 7.5-second flip back delay
        }
        return () => {
            if (flipBackTimeoutRef.current) clearTimeout(flipBackTimeoutRef.current);
        };
    }, [isFlipped, isLocked]);

    const handleMouseEnter = () => {
        clearTimeouts();
        if (!isLocked && !isFlipped) {
            hoverTimeoutRef.current = window.setTimeout(() => {
                setIsFlipped(true);
            }, 5000); // 5-second hover delay
        }
    };

    const handleMouseLeave = () => {
        clearTimeouts();
        if (!isLocked) {
            setIsFlipped(false);
        }
    };

    const handleClick = () => {
        if (isFlipped || isLocked) {
            const newLockState = !isLocked;
            setIsLocked(newLockState);
            if (newLockState && flipBackTimeoutRef.current) {
                clearTimeout(flipBackTimeoutRef.current);
            }
        } else {
            console.log("Front card clicked. Play video action.");
        }
    };

    const handleButtonClick = (e: React.MouseEvent, action?: () => void) => {
        e.stopPropagation();
        if (action) {
            action();
        } else {
            console.log("Button clicked on back of card");
        }
    }

    const typeStyles = {
        sell: { text: 'FOR SALE', bg: 'bg-green-600', text_color: 'text-green-400' },
        gig: { text: 'GIG', bg: 'bg-indigo-600', text_color: 'text-indigo-400' },
        buy: { text: 'SEEKING', bg: 'bg-yellow-600', text_color: 'text-yellow-400' }
    };
    const { text, bg, text_color } = typeStyles[listing.type];
    const priceLabel = listing.type === 'buy' ? 'Budget' : (listing.type === 'gig' ? 'Starts at' : 'Price');

    return (
        <div 
            className={`flip-card aspect-[3/4.2] ${(isFlipped || isLocked) ? 'is-flipped' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div className="flip-card-inner">
                {/* FRONT SIDE */}
                <div className="flip-card-front bg-gray-800 flex flex-col shadow-lg">
                    <div className="relative aspect-video">
                        <img src={listing.thumbnailUrl} alt={listing.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className={`absolute top-2 left-2 ${bg} text-white text-xs font-bold px-2 py-1 rounded`}>{text}</div>
                        <div className="absolute top-2 right-2">
                             <EndorsementLevelIcon endorsements={listing.creator.endorsements || 0} size={32} />
                        </div>
                    </div>
                    <div className="p-3 flex flex-col flex-grow">
                        <div>
                            <h3 className="font-bold text-white text-base leading-tight truncate">{listing.title}</h3>
                            <button onClick={(e) => handleButtonClick(e, () => setCurrentView('profile'))} className="flex items-center my-2 text-xs text-left">
                                <img src={listing.creator.avatarUrl} alt={listing.creator.name} className="w-5 h-5 rounded-full mr-2" />
                                <span className="text-gray-400">by</span>
                                <span className="text-gray-300 font-semibold ml-1 hover:underline">{listing.creator.name}</span>
                            </button>
                            <p className="text-sm text-gray-400 line-clamp-4">{listing.description}</p>
                        </div>
                        <div className="mt-auto pt-3 flex justify-between items-end">
                            <div className="flex flex-wrap gap-1">
                                {listing.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="bg-gray-700 text-gray-300 text-xs font-medium px-2 py-1 rounded">{tag}</span>
                                ))}
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="text-xs text-gray-400">{priceLabel}</p>
                                <p className={`text-lg font-bold ${text_color}`}>${listing.price.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BACK SIDE */}
                <div className="flip-card-back bg-gray-700 flex flex-col items-center justify-center p-4 text-center">
                    <button onClick={(e) => handleButtonClick(e, () => setCurrentView('profile'))}>
                        <img src={listing.creator.avatarUrl} alt={listing.creator.name} className="w-24 h-24 rounded-full border-4 border-indigo-500" />
                        <h4 className="text-xl font-bold text-white mt-3 hover:underline">{listing.creator.name}</h4>
                    </button>
                    <p className="text-sm text-indigo-400 font-medium">{listing.creator.handle}</p>
                    <div className="flex justify-around w-full my-4 text-sm">
                        <div>
                            <p className="font-bold text-white">{((listing.creator.followers || 0) / 1000).toFixed(1)}k</p>
                            <p className="text-xs text-gray-400">Followers</p>
                        </div>
                        <div>
                            <p className="font-bold text-white">{listing.creator.clipsSold || 0}</p>
                            <p className="text-xs text-gray-400">Clips Sold</p>
                        </div>
                    </div>
                    {listing.type === 'sell' && (
                        <button onClick={(e) => handleButtonClick(e, () => onBuyNow(listing))} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 mb-2">
                           <DollarIcon className="w-5 h-5" /> Buy Now
                        </button>
                    )}
                    <button onClick={(e) => handleButtonClick(e)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 mb-2">
                        <MessageIcon className="w-5 h-5"/> Contact
                    </button>
                    <div className="flex gap-2 w-full">
                        <button onClick={(e) => handleButtonClick(e)} className="flex-1 bg-green-500/20 hover:bg-green-500/40 text-green-300 font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5"><ThumbsUpIcon className="w-5 h-5"/> Interested</button>
                        <button onClick={(e) => handleButtonClick(e)} className="flex-1 bg-red-500/20 hover:bg-red-500/40 text-red-300 font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5"><ThumbsDownIcon className="w-5 h-5"/> Not Interested</button>
                    </div>
                     <button onClick={(e) => handleButtonClick(e)} className="text-gray-400 hover:text-white mt-4 flex items-center gap-2 text-sm"><ShareIcon className="w-4 h-4"/> Share Profile</button>
                </div>
            </div>
        </div>
    );
};

export default MarketplaceCard;
