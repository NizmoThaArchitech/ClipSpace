
import React from 'react';
import { MOCK_NETWORK_ACTIVITIES } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';
import { StarIcon } from './icons/StarIcon';
import { UserPlusIcon } from './icons/UserPlusIcon';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';

const NetworkActivityFeed: React.FC = () => {

  const getActivityIcon = (type: string) => {
    const iconClass = "w-5 h-5";
    switch(type) {
      case 'create': return <div className="bg-indigo-500/20 rounded-full p-2"><SparklesIcon className={`${iconClass} text-indigo-400`} /></div>;
      case 'milestone': return <div className="bg-yellow-500/20 rounded-full p-2"><StarIcon className={`${iconClass} text-yellow-400`} /></div>;
      case 'join': return <div className="bg-green-500/20 rounded-full p-2"><UserPlusIcon className={`${iconClass} text-green-400`} /></div>;
      case 'post': return <div className="bg-sky-500/20 rounded-full p-2"><ChatBubbleIcon className={`${iconClass} text-sky-400`} /></div>;
      default: return null;
    }
  };

  return (
    <section>
        <h2 className="text-2xl font-bold text-white mb-4">Recent Network Activity</h2>
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-700/50">
            <ul className="space-y-4">
                {MOCK_NETWORK_ACTIVITIES.map(activity => (
                    <li key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-700/50 rounded-lg">
                        {getActivityIcon(activity.activityType)}
                        <img src={activity.user.avatarUrl} alt={activity.user.name} className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-300">
                                <span className="font-bold text-white">{activity.user.name}</span> {activity.description}
                            </p>
                             <p className="text-xs text-indigo-400 font-semibold">{activity.networkName}</p>
                        </div>
                        <span className="text-xs text-gray-500 flex-shrink-0">{activity.timestamp}</span>
                    </li>
                ))}
            </ul>
        </div>
    </section>
  );
};

export default NetworkActivityFeed;