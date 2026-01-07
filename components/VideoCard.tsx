
import React from 'react';
import type { VideoClip } from '../types';
import type { View } from '../App';
import EndorsementLevelIcon from './icons/EndorsementLevelIcon';

interface VideoCardProps {
  clip: VideoClip;
  setCurrentView: (view: View) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ clip, setCurrentView }) => {
  return (
    <div className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col transition-shadow duration-300 hover:shadow-2xl hover:shadow-indigo-500/30">
      {/* Media container */}
      <div className="relative aspect-video">
        <img
          src={clip.thumbnailUrl}
          alt={clip.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
           <svg className="w-16 h-16 text-white opacity-0 group-hover:opacity-80 transform group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
        </div>
        <div className="absolute top-2 left-2">
            <EndorsementLevelIcon endorsements={clip.creator.endorsements || 0} size={32} />
        </div>
        <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
            <div className="bg-gray-900 bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded">
              {clip.resolution}
            </div>
            {clip.licenseTiers && clip.licenseTiers.length > 1 && (
                <div className="bg-cyan-600 bg-opacity-90 text-white text-xs font-bold px-2 py-1 rounded">
                    LICENSES
                </div>
            )}
        </div>
        <div className="absolute bottom-2 left-2 bg-gray-900 bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {Math.floor(clip.duration / 60)}:{String(clip.duration % 60).padStart(2, '0')}
        </div>
      </div>
      
      {/* Content container */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors duration-200">
          {clip.title}
        </h3>
        {/* Creator Info */}
        <button onClick={() => setCurrentView('profile')} className="flex items-center mt-2 text-left">
          <img
            src={clip.creator.avatarUrl}
            alt={clip.creator.name}
            className="w-6 h-6 rounded-full mr-2"
          />
          <div>
            <span className="text-sm font-medium text-gray-300">{clip.creator.name}</span>
            <span className="text-xs text-gray-500 ml-1">{clip.creator.handle}</span>
          </div>
        </button>
        
        <p className="text-sm text-gray-400 mt-3 flex-grow">
            {clip.description}
        </p>

        {/* Tags and Price Section */}
        <div className="flex justify-between items-end mt-4">
            <div className="flex flex-wrap gap-1">
                 {clip.tags.map(tag => (
                  <span key={tag} className="bg-gray-700 text-gray-300 text-xs font-medium px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
            </div>
            <p className="text-lg font-bold text-green-400">${clip.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
