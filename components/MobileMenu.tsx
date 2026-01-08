
import React from 'react';
import type { View, Theme } from '../App';
import { MOCK_USERS } from '../constants';
import { HomeIcon } from './icons/HomeIcon';
import { UploadIcon } from './icons/UploadIcon';
import { DashboardIcon } from './icons/DashboardIcon';
import { MarketplaceIcon } from './icons/MarketplaceIcon';
import { WalletIcon } from './icons/WalletIcon';
import { CommunityIcon } from './icons/CommunityIcon';
import { User } from './icons/UserIcon';
import { AnalyticsIcon } from './icons/AnalyticsIcon';
import { MentorshipIcon } from './icons/MentorshipIcon';
import { ProjectsIcon } from './icons/ProjectsIcon';
import { CollabIcon } from './icons/CollabIcon';
import { KanbanIcon } from './icons/KanbanIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { GavelIcon } from './icons/GavelIcon';
import { ShareIcon } from './icons/ShareIcon';
import { LiveIcon } from './icons/LiveIcon';
import { CubeTransparentIcon } from './icons/CubeTransparentIcon';

import { AffiliateIcon } from './icons/AffiliateIcon';

interface MobileMenuProps {
  isOpen: boolean;
  setCurrentView: (view: View) => void;
  closeMenu: () => void;
  theme: Theme;
}

interface NavItem {
  view: View;
  text: string;
  icon: React.ReactNode;
}

const navSections: { title: string; items: NavItem[] }[] = [
    {
      title: 'Main',
      items: [
        { view: 'feed', text: 'Home', icon: <HomeIcon className="w-6 h-6" /> },
        { view: 'marketplace', text: 'Marketplace', icon: <MarketplaceIcon className="w-6 h-6" /> },
        { view: 'upload', text: 'Upload', icon: <UploadIcon className="w-6 h-6" /> },
      ]
    },
    {
      title: 'Creator Studio',
      items: [
        { view: 'dashboard', text: 'Dashboard', icon: <DashboardIcon className="w-6 h-6" /> },
        { view: 'analytics', text: 'Analytics', icon: <AnalyticsIcon className="w-6 h-6" /> },
        { view: 'wallet', text: 'Wallet & Splits', icon: <WalletIcon className="w-6 h-6" /> },
        { view: 'clipgen', text: 'ClipGen Studio', icon: <CubeTransparentIcon className="w-6 h-6" /> },
        { view: 'my-projects', text: 'Projects', icon: <KanbanIcon className="w-6 h-6" /> },
        { view: 'rights-hub', text: 'Rights Hub', icon: <GavelIcon className="w-6 h-6" /> },
        { view: 'syndication', text: 'Syndication', icon: <ShareIcon className="w-6 h-6" /> },
        { view: 'live-co-create', text: 'Live Co-Create', icon: <LiveIcon className="w-6 h-6" /> },
      ]
    },
    {
      title: 'Connect',
      items: [
        { view: 'community', text: 'Community', icon: <CommunityIcon className="w-6 h-6" /> },
        { view: 'projects', text: 'Shot Requests', icon: <ProjectsIcon className="w-6 h-6" /> },
        { view: 'collabs', text: 'Collab Hub', icon: <CollabIcon className="w-6 h-6" /> },
        { view: 'mentorship', text: 'Mentorship', icon: <MentorshipIcon className="w-6 h-6" /> },
        { view: 'affiliate', text: 'Affiliate Program', icon: <AffiliateIcon className="w-6 h-6" /> },
      ]
    },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setCurrentView, closeMenu, theme: _theme }) => {
  const user = MOCK_USERS.jane_creator;

  const handleNavigation = (view: View) => {
    setCurrentView(view);
    closeMenu();
  };
  
  const NavButton: React.FC<{ item: NavItem, index: number }> = ({ item, index }) => (
     <button
        onClick={() => handleNavigation(item.view)}
        className="mobile-menu-item flex items-center w-full space-x-4 px-4 py-3 text-lg font-medium text-gray-200 rounded-lg active:bg-indigo-500/30 active:scale-95 transition-transform"
        style={{ animationDelay: `${50 + index * 30}ms` }}
    >
        {item.icon}
        <span>{item.text}</span>
    </button>
  )

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-500 md:hidden ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={closeMenu}
    >
      <div
        className={`absolute inset-y-0 left-0 w-4/5 max-w-sm h-full bg-gray-900 shadow-2xl transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
                <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full border-2 border-indigo-500" />
                <div>
                    <h3 className="font-bold text-white">{user.name}</h3>
                    <p className="text-sm text-gray-400">{user.handle}</p>
                </div>
            </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
            {navSections.map((section, sectionIndex) => (
                <div key={section.title}>
                    <h3 className="px-4 mt-2 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">{section.title}</h3>
                    <div className="space-y-1">
                        {section.items.map((item, itemIndex) => (
                             <NavButton key={item.view} item={item} index={sectionIndex * 5 + itemIndex} />
                        ))}
                    </div>
                </div>
            ))}
        </nav>
        
        <div className="p-4 border-t border-gray-700/50 space-y-1">
             <NavButton item={{ view: 'profile', text: 'My Profile', icon: <User className="w-6 h-6" /> }} index={99} />
             <NavButton item={{ view: 'settings', text: 'Settings', icon: <SettingsIcon className="w-6 h-6" /> }} index={100} />
             <button
                onClick={() => console.log("Logout clicked")}
                className="mobile-menu-item flex items-center w-full space-x-4 px-4 py-3 text-lg font-medium text-gray-200 rounded-lg active:bg-red-500/30 active:scale-95 transition-transform"
                style={{ animationDelay: `150ms` }}
            >
                <LogoutIcon className="w-6 h-6" />
                <span>Logout</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
