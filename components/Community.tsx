
import React from 'react';
/* Added Theme to the import from App to match props passed in App.tsx */
import type { View, Theme } from '../App';
import { MOCK_FORUM_CATEGORIES, MOCK_CREATOR_OF_THE_WEEK, MOCK_COMMUNITY_NETWORKS, MOCK_CREATOR_PODS } from '../constants';
import { CameraIcon } from './icons/CameraIcon';
import { CodeBracketIcon } from './icons/CodeBracketIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { MegaphoneIcon } from './icons/MegaphoneIcon';
import { QuestionMarkCircleIcon } from './icons/QuestionMarkCircleIcon';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';
import NetworkActivityFeed from './NetworkActivityFeed';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { PodIcon } from './icons/PodIcon';


interface CommunityProps {
  /* Added theme property to fix TypeScript error in App.tsx line 88 */
  theme: Theme;
  setCurrentView: (view: View) => void;
}

/* Updated component to accept theme and setCurrentView props */
const Community: React.FC<CommunityProps> = ({ theme, setCurrentView }) => {

  const getIcon = (iconName: string) => {
    const iconClass = "w-8 h-8 text-indigo-400";
    switch(iconName) {
      case 'Camera': return <CameraIcon className={iconClass} />;
      case 'CodeBracket': return <CodeBracketIcon className={iconClass} />;
      case 'LightBulb': return <LightBulbIcon className={iconClass} />;
      case 'Megaphone': return <MegaphoneIcon className={iconClass} />;
      case 'QuestionMarkCircle': return <QuestionMarkCircleIcon className={iconClass} />;
      case 'ChatBubble': return <ChatBubbleIcon className={iconClass} />;
      default: return null;
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Community Hub</h1>
          <p className="text-gray-400 mt-1">Connect, learn, and collaborate with other creators.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors whitespace-nowrap">Start New Discussion</button>
      </div>

      {/* Creator of the Week */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Creator of the Week</h2>
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6 border border-yellow-500/30">
            <img src={MOCK_CREATOR_OF_THE_WEEK.avatarUrl} alt={MOCK_CREATOR_OF_THE_WEEK.name} className="w-24 h-24 rounded-full border-4 border-yellow-400 flex-shrink-0" />
            <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl font-bold text-white">{MOCK_CREATOR_OF_THE_WEEK.name}</h3>
                <p className="text-yellow-400 font-medium">{MOCK_CREATOR_OF_THE_WEEK.handle}</p>
                <p className="text-gray-400 mt-2 text-sm max-w-lg">
                    Famous for their stunning nature videography, {MOCK_CREATOR_OF_THE_WEEK.name} captures the wild like no other. Check out their profile for some of the best landscape B-roll on the platform!
                </p>
            </div>
            <button onClick={() => setCurrentView('profile')} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-6 rounded-lg transition-colors w-full sm:w-auto">
                View Profile
            </button>
        </div>
      </section>

       {/* Creator Pods */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">My Creator Pods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_CREATOR_PODS.map(pod => (
            <div key={pod.id} className="bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-300 border border-gray-700/50">
                <div className="flex items-start gap-4">
                    <div className="bg-gray-700/50 p-3 rounded-lg"><PodIcon className="w-8 h-8 text-indigo-400" /></div>
                    <div>
                        <div className="flex items-center gap-2">
                            <LockClosedIcon className="w-4 h-4 text-gray-500" />
                            <h3 className="text-lg font-bold text-white">{pod.name}</h3>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{pod.description}</p>
                    </div>
                </div>
                 <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
                    <div className="flex -space-x-2 overflow-hidden">
                        {pod.members.slice(0, 4).map(member => (
                            <img key={member.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-800" src={member.avatarUrl} alt={member.name} />
                        ))}
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-1.5 px-3 rounded-lg">Enter Pod</button>
                </div>
            </div>
          ))}
        </div>
      </section>

       {/* Community Networks */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Community Network Center</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_COMMUNITY_NETWORKS.map(network => (
            <div key={network.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700/50">
              <img src={network.bannerUrl} alt={`${network.name} banner`} className="h-24 w-full object-cover"/>
              <div className="p-4">
                <h3 className="font-bold text-white text-lg">{network.name}</h3>
                <p className="text-sm text-gray-400">{network.members} members</p>
                <button className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition-colors text-sm">View Network</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Network Activity */}
      <NetworkActivityFeed />

      {/* Forum Categories */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Forums</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_FORUM_CATEGORIES.map(category => (
            <div key={category.id} className="bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-300 border border-gray-700/50">
              <div className="flex items-start gap-4">
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  {getIcon(category.icon)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{category.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{category.description}</p>
                </div>
              </div>
              <div className="flex justify-end gap-6 mt-4 pt-4 border-t border-gray-700/50 text-center">
                 <div>
                    <p className="font-bold text-white">{category.threads}</p>
                    <p className="text-xs text-gray-500">Threads</p>
                </div>
                 <div>
                    <p className="font-bold text-white">{category.posts}</p>
                    <p className="text-xs text-gray-500">Posts</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Community;
