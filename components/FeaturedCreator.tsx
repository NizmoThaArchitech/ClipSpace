
import React from 'react';
import type { User } from '../types';
import type { View } from '../App';
import EndorsementLevelIcon from './icons/EndorsementLevelIcon';

interface FeaturedCreatorProps {
    creator: User;
    setCurrentView: (view: View) => void;
}

const FeaturedCreator: React.FC<FeaturedCreatorProps> = ({ creator, setCurrentView }) => {
    return (
        <section>
            <h2 className="text-2xl font-bold text-white mb-4">Top Content Creator</h2>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6 border border-indigo-500/30">
                <img src={creator.avatarUrl} alt={creator.name} className="w-24 h-24 rounded-full border-4 border-indigo-500 flex-shrink-0" />
                <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-white">{creator.name}</h3>
                    <p className="text-indigo-400 font-medium">{creator.handle}</p>
                    <p className="text-gray-400 mt-2 text-sm max-w-lg">
                        A master of cinematic drone shots and breathtaking landscapes. {creator.name} has consistently delivered top-quality 4K footage that creators love.
                    </p>
                </div>
                <div className="flex flex-row sm:flex-col gap-6 text-center">
                     <div>
                        <p className="text-2xl font-bold text-white">{((creator.followers || 0) / 1000).toFixed(1)}k</p>
                        <p className="text-sm text-gray-500">Followers</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2">
                           <EndorsementLevelIcon endorsements={creator.endorsements || 0} size={32} />
                            <p className="text-2xl font-bold text-white">{(creator.endorsements || 0).toLocaleString()}</p>
                        </div>
                        <p className="text-sm text-gray-500">Endorsements</p>
                    </div>
                </div>
                 <button onClick={() => setCurrentView('profile')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors w-full sm:w-auto">
                    View Profile
                </button>
            </div>
        </section>
    );
};

export default FeaturedCreator;
