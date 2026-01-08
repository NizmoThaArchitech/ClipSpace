
import React, { useState, useEffect } from 'react';
import type { View, Theme } from '../App';
import SearchBar from './SearchBar';
import { ClipspaceLogo } from './icons/ClipspaceLogo';
import { NotificationIcon } from './icons/NotificationIcon';

import EndorsementLevelIcon from './icons/EndorsementLevelIcon';
import ThemeToggle from './ThemeToggle';
import MusicPlayerWidget from './MusicPlayerWidget';

const EndorsementLever: React.FC<{ theme: Theme }> = ({ theme }) => {
    const currentUserEndorsements = 2845;
    return (
        <div className="hidden lg:flex items-center space-x-2 cursor-pointer">
            <EndorsementLevelIcon endorsements={currentUserEndorsements} size={28} />
            <span className={`text-sm font-bold ${theme === 'dark' || theme === 'light' ? 'text-white' : 'text-black'}`}>{currentUserEndorsements.toLocaleString()}</span>
        </div>
    );
};


const LiveStatus: React.FC<{ theme: Theme }> = ({ theme }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = time.toLocaleDateString([], { month: 'short', day: 'numeric' });

    return (
        <div className={`hidden lg:flex items-center space-x-3 px-3 py-1.5 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-700'}`}>
            <div className="flex items-center space-x-2">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <span className="text-sm font-semibold text-red-400">LIVE</span>
            </div>
            <span className="text-sm text-gray-400">{formattedTime}</span>
            <span className="text-sm text-gray-400">{formattedDate}</span>
        </div>
    );
};


interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  setCurrentView: (view: View) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen, setCurrentView, theme, setTheme }) => {
  const [notificationStatus] = useState<'new' | 'old' | 'todo' | 'none'>('new');

  const statusColor = {
    new: 'bg-green-400',
    old: 'bg-yellow-400',
    todo: 'bg-red-400',
  };
  
  const headerBg = theme === 'dark' ? 'bg-gray-800/80' : 'bg-black';
  const iconColor = theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-white';
  const iconBg = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-600';
  const notificationRing = theme === 'dark' ? 'ring-gray-800' : 'ring-black';

  return (
    <header className={`${headerBg} backdrop-blur-sm shadow-lg sticky top-0 z-40`}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo */}
          <div className="flex items-center space-x-4">
            <div 
              className="flex-shrink-0 flex items-center space-x-2 cursor-pointer" 
              onClick={() => setCurrentView('feed')}
            >
              <ClipspaceLogo className="h-10 w-10" theme={theme} />
              <span className={`text-xl font-bold tracking-wider hidden sm:inline ${theme === 'dark' || theme === 'light' ? 'text-white' : 'text-black'}`}>
                Clip<span className={theme === 'dark' ? 'text-indigo-400' : 'text-red-500'}>Space</span>
              </span>
            </div>
          </div>
          
          {/* Middle Section: Search Bar */}
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-center">
            <SearchBar theme={theme} />
          </div>

          {/* Right Section: Actions & Mobile Menu */}
          <div className="flex items-center ml-4 space-x-4">
            <MusicPlayerWidget theme={theme} />
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <EndorsementLever theme={theme} />
            <LiveStatus theme={theme} />
            <button className={`relative p-2 rounded-full ${iconColor} ${iconBg} focus:outline-none focus:ring-2 focus:ring-white`}>
              <NotificationIcon className={`h-6 w-6 ${theme === 'light' ? 'text-yellow-400' : ''}`}/>
               {notificationStatus !== 'none' && (
                <span className={`absolute top-2 right-2 block h-2 w-2 rounded-full ring-2 ${notificationRing} ${statusColor[notificationStatus]}`}></span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className={`relative w-8 h-8 flex items-center justify-center text-white focus:outline-none z-50`}
                aria-label="Toggle menu"
              >
                  <div className="flex flex-col items-center justify-center">
                    <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}></span>
                    <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`}></span>
                    <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
