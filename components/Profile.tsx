
import React, { useState } from 'react';
import type { View, Theme } from '../App';
import { MOCK_USERS, MOCK_VIDEO_CLIPS, MOCK_COMMUNITY_NETWORKS } from '../constants';
import EndorsementLevelIcon from './icons/EndorsementLevelIcon';
import { CameraIcon } from './icons/CameraIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { WebsiteIcon } from './icons/WebsiteIcon';
import VideoCard from './VideoCard';
import { DollarIcon } from './icons/DollarIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import NetworkActivityFeed from './NetworkActivityFeed';
// FIX: Imported StarIcon to resolve reference errors.
import { StarIcon } from './icons/StarIcon';

interface ProfileProps {
  theme: Theme;
  setCurrentView: (view: View) => void;
}

const Profile: React.FC<ProfileProps> = ({ theme, setCurrentView }) => {
    const user = MOCK_USERS.jane_creator;
    const [activeTab, setActiveTab] = useState('clips');
    const isDark = theme === 'dark';
    const accentColor = isDark ? 'indigo' : 'red';
    
    const tabs = ['clips', 'membership', 'about', 'activity', 'networks'];

    const renderContent = () => {
        switch(activeTab) {
            case 'clips':
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MOCK_VIDEO_CLIPS.slice(0,5).map(clip => <VideoCard key={clip.id} clip={{...clip, creator: user}} setCurrentView={setCurrentView} />)}
                    </div>
                );
            case 'membership':
                return (
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700/50 text-center">
                        <h3 className="text-2xl font-bold text-white">Join Jane's Membership!</h3>
                        <p className="text-gray-400 mt-2 max-w-lg mx-auto">Get access to exclusive clips, behind-the-scenes content, and early access to tutorials for just ${user.subscriptionPrice}/month.</p>
                        <div className="my-6">
                            <span className="text-5xl font-extrabold text-white">${user.subscriptionPrice}</span>
                            <span className="text-gray-400">/month</span>
                        </div>
                        <ul className="text-left max-w-xs mx-auto space-y-2 text-gray-300">
                            <li className="flex items-center gap-3"><StarIcon className="w-5 h-5 text-indigo-400"/>Exclusive monthly clip pack</li>
                            <li className="flex items-center gap-3"><StarIcon className="w-5 h-5 text-indigo-400"/>Behind-the-scenes videos</li>
                            <li className="flex items-center gap-3"><StarIcon className="w-5 h-5 text-indigo-400"/>Member-only tutorials</li>
                        </ul>
                        <button className={`mt-8 w-full max-w-xs mx-auto bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors`}>
                            Become a Member
                        </button>
                    </div>
                );
            case 'about':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 bg-gray-800 p-6 rounded-lg border border-gray-700/50">
                            <h3 className="text-xl font-bold mb-4">About Me</h3>
                            <p className="text-gray-300 leading-relaxed">{user.bio}</p>
                        </div>
                        <div className="space-y-6">
                           <div className="bg-gray-800 p-6 rounded-lg border border-gray-700/50">
                                <h3 className="text-xl font-bold mb-4">My Gear</h3>
                                <ul className="space-y-2">
                                    {user.gear?.map(item => <li key={item} className="text-gray-300 before:content-['•'] before:mr-2 before:text-indigo-400">{item}</li>)}
                                </ul>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700/50">
                                <h3 className="text-xl font-bold mb-4">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {user.skills?.map(skill => <span key={skill} className="bg-gray-700 text-gray-200 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                );
             case 'activity':
                return <NetworkActivityFeed />;
             case 'networks':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {MOCK_COMMUNITY_NETWORKS.map(network => (
                            <div key={network.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700/50">
                                <img src={network.bannerUrl} alt={`${network.name} banner`} className="h-24 w-full object-cover"/>
                                <div className="p-4">
                                    <h3 className="font-bold text-white text-lg">{network.name}</h3>
                                    <p className="text-sm text-gray-400">{network.members} members</p>
                                    <button onClick={() => setCurrentView('community')} className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition-colors text-sm">View Network</button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            default: return null;
        }
    }

    return (
        <div className={`min-h-full ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            {/* Header Section */}
            <div className="relative h-48 md:h-64 bg-gray-700">
                <img src="https://picsum.photos/seed/profilebanner/1600/400" alt="Banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                <div className="absolute top-2 right-2 flex gap-2">
                    <button className="bg-gray-800/70 hover:bg-gray-800 text-white font-semibold py-1.5 px-3 rounded-lg flex items-center gap-2 text-sm backdrop-blur-sm">
                        <SparklesIcon className="w-4 h-4 text-teal-400" /> AI Sizzle Reel
                    </button>
                     <button className="bg-gray-800/70 hover:bg-gray-800 text-white font-semibold py-1.5 px-3 rounded-lg flex items-center gap-2 text-sm backdrop-blur-sm">
                        Press Kit
                    </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
                         <div className="relative flex-shrink-0">
                            <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-gray-800" />
                            <button className="absolute bottom-1 right-1 bg-indigo-600 p-1.5 rounded-full hover:bg-indigo-700">
                                <CameraIcon className="w-4 h-4 text-white" />
                            </button>
                        </div>
                        <div className="flex-1 text-center sm:text-left mb-2">
                            <h1 className="text-3xl font-bold">{user.name}</h1>
                            <p className="text-indigo-400">{user.handle}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className={`bg-gray-700 hover:bg-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 text-sm`}>
                                <DollarIcon className="w-4 h-4" /> Request a Clip
                            </button>
                            <button onClick={() => setCurrentView('settings')} className={`bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white font-semibold py-2 px-4 rounded-lg text-sm`}>Follow</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-[1fr_18rem] gap-8 items-start">
                <div className="space-y-8">
                    {/* Tabs */}
                    <div className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <nav className="-mb-px flex space-x-6 overflow-x-auto no-scrollbar">
                            {tabs.map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={`capitalize whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab ? `border-${accentColor}-500 text-${accentColor}-400` : `border-transparent text-gray-400 hover:text-white hover:border-gray-500`}`}>
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>
                    {/* Tab Content */}
                    <div>{renderContent()}</div>
                </div>

                {/* Right Sidebar */}
                <aside className="space-y-6 sticky top-6">
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700/50">
                        <h3 className="font-bold mb-3">Stats</h3>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="text-xl font-bold">{user.followers}</p>
                                <p className="text-xs text-gray-400">Followers</p>
                            </div>
                             <div>
                                <p className="text-xl font-bold">1.2k</p>
                                <p className="text-xs text-gray-400">Following</p>
                            </div>
                             <div>
                                <p className="text-xl font-bold">{user.clipsSold}</p>
                                <p className="text-xs text-gray-400">Clips Sold</p>
                            </div>
                             <div>
                                <div className="flex items-center justify-center gap-1">
                                    <EndorsementLevelIcon endorsements={user.endorsements || 0} size={20}/>
                                    <p className="text-xl font-bold">{(user.endorsements || 0).toLocaleString()}</p>
                                </div>
                                <p className="text-xs text-gray-400">Endorsements</p>
                            </div>
                        </div>
                    </div>

                     <div className="bg-gray-800 p-4 rounded-lg border border-gray-700/50">
                        <h3 className="font-bold mb-3">Find me on</h3>
                        <div className="flex justify-around">
                            <a href={user.socials?.twitter} className="text-gray-400 hover:text-white"><TwitterIcon className="w-6 h-6" /></a>
                            <a href={user.socials?.youtube} className="text-gray-400 hover:text-white"><YouTubeIcon className="w-6 h-6" /></a>
                            <a href={user.socials?.website} className="text-gray-400 hover:text-white"><WebsiteIcon className="w-6 h-6" /></a>
                        </div>
                    </div>
                     <div className="bg-gray-800 p-4 rounded-lg border border-gray-700/50">
                        <h3 className="font-bold mb-3">Featured Clip</h3>
                        <VideoCard clip={{...MOCK_VIDEO_CLIPS[1], creator: user}} setCurrentView={setCurrentView} />
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Profile;
