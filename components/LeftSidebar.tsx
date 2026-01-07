
import React from 'react';
import type { View, Theme } from '../App';
import { HomeIcon } from './icons/HomeIcon';
import { UploadIcon } from './icons/UploadIcon';
import { DashboardIcon } from './icons/DashboardIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { MarketplaceIcon } from './icons/MarketplaceIcon';
import { WalletIcon } from './icons/WalletIcon';
import { CommunityIcon } from './icons/CommunityIcon';
import { User } from './icons/UserIcon';
import { AnalyticsIcon } from './icons/AnalyticsIcon';
import { MentorshipIcon } from './icons/MentorshipIcon';
import { ProjectsIcon } from './icons/ProjectsIcon';
import { CollabIcon } from './icons/CollabIcon';
import { KanbanIcon } from './icons/KanbanIcon';
import { GavelIcon } from './icons/GavelIcon';
import { ShareIcon } from './icons/ShareIcon';
import { LiveIcon } from './icons/LiveIcon';
import { PriceTagIcon } from './icons/PriceTagIcon';
import { AffiliateIcon } from './icons/AffiliateIcon';
import { ChevronDoubleLeftIcon } from './icons/ChevronDoubleLeftIcon';
import { HandshakeIcon } from './icons/HandshakeIcon';
import { CubeTransparentIcon } from './icons/CubeTransparentIcon';
import { MusicalNoteIcon } from './icons/MusicalNoteIcon';

interface LeftSidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  theme: Theme;
  setIsVisible: (isVisible: boolean) => void;
}

interface NavItem {
  view: View;
  text: string;
  icon: React.ReactNode;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ currentView, setCurrentView, theme, setIsVisible }) => {
    
  const navSections: { title: string; items: NavItem[] }[] = [
    {
      title: 'Main',
      items: [
        { view: 'feed', text: 'Home', icon: <HomeIcon className="w-5 h-5" /> },
        { view: 'marketplace', text: 'Marketplace', icon: <MarketplaceIcon className="w-5 h-5" /> },
        { view: 'pricing', text: 'Pricing', icon: <PriceTagIcon className="w-5 h-5" /> },
        { view: 'upload', text: 'Upload', icon: <UploadIcon className="w-5 h-5" /> },
      ]
    },
    {
      title: 'Creator Studio',
      items: [
        { view: 'dashboard', text: 'Dashboard', icon: <DashboardIcon className="w-5 h-5" /> },
        { view: 'analytics', text: 'Analytics', icon: <AnalyticsIcon className="w-5 h-5" /> },
        { view: 'wallet', text: 'Wallet & Splits', icon: <WalletIcon className="w-5 h-5" /> },
        { view: 'clipgen', text: 'CSpace Video Suite', icon: <CubeTransparentIcon className="w-5 h-5" /> },
        { view: 'my-projects', text: 'Production Queue', icon: <KanbanIcon className="w-5 h-5" /> },
        { view: 'rights-hub', text: 'Rights Hub', icon: <GavelIcon className="w-5 h-5" /> },
        { view: 'syndication', text: 'Syndication', icon: <ShareIcon className="w-5 h-5" /> },
        { view: 'live-co-create', text: 'Live Co-Create', icon: <LiveIcon className="w-5 h-5" /> },
      ]
    },
    {
      title: 'Connect',
      items: [
        { view: 'community', text: 'Community', icon: <CommunityIcon className="w-5 h-5" /> },
        { view: 'projects', text: 'Shot Requests', icon: <ProjectsIcon className="w-5 h-5" /> },
        { view: 'collabs', text: 'Collab Hub', icon: <CollabIcon className="w-5 h-5" /> },
        { view: 'mentorship', text: 'Mentorship', icon: <MentorshipIcon className="w-5 h-5" /> },
        { view: 'affiliate', text: 'Affiliate Program', icon: <AffiliateIcon className="w-5 h-5" /> },
        { view: 'spotify', text: 'Spotify', icon: <MusicalNoteIcon className="w-5 h-5 text-green-500" /> },
        { view: 'amazon-music', text: 'Amazon Music', icon: <MusicalNoteIcon className="w-5 h-5 text-yellow-500" /> },
        { view: 'apple-music', text: 'Apple Music', icon: <MusicalNoteIcon className="w-5 h-5 text-pink-500" /> },
      ]
    }
  ]

  return (
    <aside className={`hidden md:flex flex-col h-full p-3 border-r overflow-y-auto no-scrollbar ${theme === 'dark' ? 'bg-gray-800 border-gray-700/50' : 'bg-gray-100 border-gray-200'}`}>
        <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Menu</h2>
            <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-white" title="Hide Sidebar">
                <ChevronDoubleLeftIcon className="w-5 h-5" />
            </button>
        </div>
        <nav className="flex-1">
            {navSections.map((section, index) => (
                <div key={section.title} className={index > 0 ? `pt-4 mt-4 border-t ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'}` : ''}>
                    <h3 className={`px-4 mb-2 text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{section.title}</h3>
                    <div className="space-y-1">
                        {section.items.map(item => (
                             <button
                                key={item.view}
                                onClick={() => setCurrentView(item.view)}
                                className={`flex items-center w-full space-x-3 rounded-md text-sm font-medium transition-colors duration-200 pl-4 pr-2 py-2.5 ${currentView === item.view ? (theme === 'dark' ? 'bg-indigo-600 text-white shadow-md' : 'bg-red-500 text-white shadow-md') : (theme === 'dark' ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-black')}`}
                            >
                                {item.icon}
                                <span>{item.text}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </nav>
        <div className={`mt-auto pt-4 space-y-1 ${theme === 'dark' ? 'border-t border-gray-700/50' : 'border-t border-gray-200'}`}>
            <button onClick={() => setCurrentView('profile')} className={`flex items-center w-full space-x-3 rounded-md text-sm font-medium transition-colors duration-200 pl-4 pr-2 py-2.5 ${currentView === 'profile' ? (theme === 'dark' ? 'bg-indigo-600 text-white shadow-md' : 'bg-red-500 text-white shadow-md') : (theme === 'dark' ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-black')}`}><User className="w-5 h-5" /><span>My Profile</span></button>
            <button onClick={() => setCurrentView('settings')} className={`flex items-center w-full space-x-3 rounded-md text-sm font-medium transition-colors duration-200 pl-4 pr-2 py-2.5 ${currentView === 'settings' ? (theme === 'dark' ? 'bg-indigo-600 text-white shadow-md' : 'bg-red-500 text-white shadow-md') : (theme === 'dark' ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-black')}`}><SettingsIcon className="w-5 h-5" /><span>Settings</span></button>
            <button className={`flex items-center w-full space-x-3 pl-4 pr-2 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-black'}`}>
                <LogoutIcon className="w-5 h-5" />
                <span>Logout</span>
            </button>
        </div>
    </aside>
  );
};

export default LeftSidebar;
