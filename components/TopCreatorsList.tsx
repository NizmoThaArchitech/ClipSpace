
import React from 'react';
import type { User } from '../types';
import type { View } from '../App';
import EndorsementLevelIcon from './icons/EndorsementLevelIcon';

interface TopCreatorsListProps {
    creators: User[];
    setCurrentView: (view: View) => void;
}

const TopCreatorsList: React.FC<TopCreatorsListProps> = ({ creators, setCurrentView }) => {
    const sortedCreators = [...creators].sort((a, b) => (b.endorsements || 0) - (a.endorsements || 0)).slice(0, 10);

    const rankColor = (rank: number) => {
        if (rank === 0) return 'text-yellow-400 border-yellow-400';
        if (rank === 1) return 'text-gray-300 border-gray-400';
        if (rank === 2) return 'text-yellow-600 border-yellow-700';
        return 'text-gray-500 border-gray-600';
    }

    return (
        <section>
            <h2 className="text-2xl font-bold text-white mb-4">Top 10 Creators - By Endorsement</h2>
            <div className="bg-gray-800 rounded-lg shadow-lg p-4">
                <ul className="space-y-3">
                    {sortedCreators.map((creator, index) => (
                        <li key={creator.id}>
                            <button onClick={() => setCurrentView('profile')} className="w-full flex items-center bg-gray-700/50 p-3 rounded-lg hover:bg-gray-700 transition-colors text-left">
                                <div className={`w-8 h-8 mr-4 flex items-center justify-center text-sm font-bold border-2 rounded-full ${rankColor(index)} flex-shrink-0`}>
                                    {index + 1}
                                </div>
                                <img src={creator.avatarUrl} alt={creator.name} className="w-10 h-10 rounded-full mr-3"/>
                                <EndorsementLevelIcon endorsements={creator.endorsements || 0} size={40} />
                                <div className="flex-1 ml-3">
                                    <p className="font-bold text-white">{creator.name}</p>
                                    <p className="text-xs text-gray-400">{creator.handle}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-white">{(creator.endorsements || 0).toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">Endorsements</p>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default TopCreatorsList;
