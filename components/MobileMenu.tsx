
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
  const ringVars = React.useMemo(() => {
    return {
      '--ring-dur': `${(2 + Math.random() * 1.4).toFixed(2)}s`,
      '--ring-delay': `${(Math.random() * 0.6).toFixed(2)}s`,
      '--ring-dur-2': `${(1.6 + Math.random() * 1.4).toFixed(2)}s`,
      '--ring-delay-2': `${(Math.random() * 0.8).toFixed(2)}s`,
    } as React.CSSProperties;
  }, []);

  const handleNavigation = (view: View) => {
    setCurrentView(view);
    closeMenu();
  };
  


  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-500 md:hidden ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={closeMenu}
    >
      <div
        className={`absolute inset-y-0 left-0 w-4/5 max-w-sm h-full bg-transparent shadow-2xl transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full">
          {/* Left: Curved brand panel */}
          <div className="mobile-menu-left">
              <div className="brand-vertical-true">
                <span>C</span><span>L</span><span>I</span><span>P</span><span>S</span><span>P</span><span>A</span><span>C</span><span>E</span>
              </div>
                <div className="flex flex-col items-center z-10 clipspace-avatar-section">
                  {/* Reference image removed. Layout matches reference UI. */}
                  <div className="avatar-wrapper pulse" style={ringVars}>
                    <img src={user.avatarUrl} alt={user.name} className="menu-avatar" />
                  </div>
                  <div className="menu-name">{user.name}</div>
                </div>
          </div>

          {/* Right: Vertical menu */}
          <div className="mobile-menu-right arc-contour">
              {navSections.flatMap(section => [
                <div key={`s-${section.title}`}>
                  <h3 className="px-4 mt-2 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">{section.title}</h3>
                  <div className="flex flex-col arc-contour-list">
                    {section.items.map(item => (
                      <button key={item.view} onClick={() => handleNavigation(item.view)} className="mobile-menu-item-large arc-contour-btn" style={{animationDelay: '0ms'}}>
                        <div style={{width:32,display:'flex',alignItems:'center',justifyContent:'center'}}>{item.icon}</div>
                        <span>{item.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ])}

              <div className="mobile-menu-footer">
                <button onClick={() => handleNavigation('profile')} className="mobile-menu-item-large">
                  <User className="w-6 h-6" />
                  <span>Account</span>
                </button>
                <div className="flex items-center justify-between px-1">
                  <button onClick={() => handleNavigation('settings')} className="mobile-menu-item-large">
                    <SettingsIcon className="w-6 h-6" />
                    <span>Settings</span>
                  </button>
                  <button onClick={() => console.log('Logout clicked')} className="mobile-menu-item-large">
                    <LogoutIcon className="w-6 h-6" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
