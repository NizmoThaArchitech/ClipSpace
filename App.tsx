
import React, { useState } from 'react';
import Header from './components/Header';
import Upload from './components/Upload';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import MobileMenu from './components/MobileMenu';
import LiveCoCreate from './components/LiveCoCreate';
import MainFeed from './components/MainFeed';
import Dashboard from './components/Dashboard';
import Wallet from './components/Wallet';
import Community from './components/Community';
import Settings from './components/Settings';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import Analytics from './components/Analytics';
import AffiliateProgram from './components/AffiliateProgram';
import MentorshipHub from './components/MentorshipHub';
import ShotRequests from './components/ShotRequests';
import CollabHub from './components/CollabHub';
import MyProjects from './components/MyProjects';
import RightsHub from './components/RightsHub';
import Syndication from './components/Syndication';
import CSpaceVideoSuite from './components/ClipGenStudio';
import Footer from './components/Footer';
import PricingPage from './components/PricingPage';
import MusicConnect from './components/MusicConnect';
import { ChevronDoubleRightIcon } from './components/icons/ChevronDoubleRightIcon';
import { ChevronDoubleLeftIcon } from './components/icons/ChevronDoubleLeftIcon';
import { CloseIcon } from './components/icons/CloseIcon';

export type View = 'feed' | 'dashboard' | 'upload' | 'live-co-create' | 'marketplace' | 'wallet' | 'community' | 'settings' | 'profile' | 'analytics' | 'affiliate' | 'mentorship' | 'projects' | 'collabs' | 'my-projects' | 'rights-hub' | 'syndication' | 'clipgen' | 'pricing' | 'terms' | 'privacy' | 'acknowledgments' | 'agreement' | 'disclaimer' | 'spotify' | 'amazon-music' | 'apple-music';
export type Theme = 'light' | 'dark';

export interface ShowReminder {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  time: string;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('feed');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLeftSidebarVisible, setIsLeftSidebarVisible] = useState(true);
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(true);
  const [reminder, setReminder] = useState<ShowReminder | null>(null);

  const handleJustListen = () => {
    if (!reminder) return;
    // Dispatch a global custom event that MusicPlayerWidget listens to
    const event = new CustomEvent('play-show-audio', { 
      detail: { 
        title: reminder.title, 
        artist: "Live Broadcast", 
        art: reminder.thumbnail 
      } 
    });
    window.dispatchEvent(event);
    setReminder(null);
  };

  const getGridColsClass = () => {
    if (isLeftSidebarVisible && isRightSidebarVisible) {
      return 'md:grid-cols-[16rem_1fr] lg:grid-cols-[16rem_1fr_20rem]';
    }
    if (!isLeftSidebarVisible && isRightSidebarVisible) {
      return 'md:grid-cols-[1fr] lg:grid-cols-[1fr_20rem]';
    }
    if (isLeftSidebarVisible && !isRightSidebarVisible) {
      return 'md:grid-cols-[16rem_1fr] lg:grid-cols-[16rem_1fr]';
    }
    return 'md:grid-cols-[1fr]';
  };

  const renderContent = () => {
    switch (currentView) {
      case 'feed': return <MainFeed theme={theme} setCurrentView={setCurrentView} />;
      case 'marketplace': return <Marketplace theme={theme} setCurrentView={setCurrentView} />;
      case 'dashboard': return <Dashboard theme={theme} setCurrentView={setCurrentView} />;
      case 'upload': return <Upload theme={theme} />;
      case 'live-co-create': return <LiveCoCreate theme={theme} setReminder={setReminder} />;
      case 'wallet': return <Wallet theme={theme} />;
      case 'community': return <Community theme={theme} setCurrentView={setCurrentView} />;
      case 'settings': return <Settings theme={theme} />;
      case 'profile': return <Profile theme={theme} setCurrentView={setCurrentView} />;
      case 'analytics': return <Analytics theme={theme} />;
      case 'affiliate': return <AffiliateProgram theme={theme} />;
      case 'mentorship': return <MentorshipHub theme={theme} />;
      case 'projects': return <ShotRequests theme={theme} />;
      case 'collabs': return <CollabHub theme={theme} />;
      case 'my-projects': return <MyProjects theme={theme} />;
      case 'rights-hub': return <RightsHub theme={theme} />;
      case 'syndication': return <Syndication theme={theme} />;
      case 'clipgen': return <CSpaceVideoSuite theme={theme} />;
      case 'spotify': return <MusicConnect platform="Spotify" theme={theme} />;
      case 'amazon-music': return <MusicConnect platform="Amazon Music" theme={theme} />;
      case 'apple-music': return <MusicConnect platform="Apple Music" theme={theme} />;
      case 'pricing': return <PricingPage setCurrentView={setCurrentView} />;
      default: return <MainFeed theme={theme} setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className={`h-screen font-sans flex flex-col ${theme === 'dark' ? 'bg-black text-gray-100' : 'bg-white text-black'}`}>
      <MobileMenu isOpen={isMenuOpen} setCurrentView={setCurrentView} closeMenu={() => setIsMenuOpen(false)} theme={theme} />
      <div id="app-container" className={`h-full flex flex-col transition-transform duration-500 ease-in-out ${isMenuOpen ? 'menu-open' : ''}`}>
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} setCurrentView={setCurrentView} theme={theme} setTheme={setTheme} />
        
        <div className={`flex-1 w-full grid grid-cols-1 min-h-0 ${getGridColsClass()}`}>
          {isLeftSidebarVisible ? (
             <LeftSidebar currentView={currentView} setCurrentView={setCurrentView} theme={theme} setIsVisible={setIsLeftSidebarVisible} />
          ) : (
            <button onClick={() => setIsLeftSidebarVisible(true)} className="hidden md:block fixed top-1/2 -translate-y-1/2 left-0 z-30 bg-gray-800/80 hover:bg-indigo-600 p-2 rounded-r-lg" title="Show Sidebar"><ChevronDoubleRightIcon className="w-5 h-5 text-white"/></button>
          )}
          
          <main className={`flex-1 min-w-0 overflow-y-auto pb-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
            {renderContent()}
          </main>

          {isRightSidebarVisible ? (
            <RightSidebar theme={theme} setIsVisible={setIsRightSidebarVisible} />
          ) : (
             <button onClick={() => setIsRightSidebarVisible(true)} className="hidden lg:block fixed top-1/2 -translate-y-1/2 right-0 z-30 bg-gray-800/80 hover:bg-indigo-600 p-2 rounded-l-lg" title="Show Sidebar"><ChevronDoubleLeftIcon className="w-5 h-5 text-white"/></button>
          )}
        </div>

        <Footer setCurrentView={setCurrentView} />
      </div>

      {/* Show Reminder Notification - Immersive glassmorphic design */}
      {reminder && (
        <div className="fixed bottom-24 right-8 z-[100] w-80 bg-gray-900/80 backdrop-blur-xl border border-indigo-500/50 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fadeIn slide-up">
          <div className="flex justify-between items-start mb-4">
             <div className="bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] animate-pulse">Live Soon</div>
             <button onClick={() => setReminder(null)} className="text-gray-500 hover:text-white bg-gray-800 p-1 rounded-full transition-colors"><CloseIcon className="w-4 h-4"/></button>
          </div>
          <div className="flex gap-4">
             <img src={reminder.thumbnail} alt={reminder.title} className="w-20 h-20 rounded-2xl object-cover border border-gray-700 shadow-xl" />
             <div className="flex-1 min-w-0">
                <h4 className="font-black text-white text-sm truncate tracking-tight">{reminder.title}</h4>
                <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mt-1">{reminder.time} BROADCAST</p>
                <p className="text-[11px] text-gray-400 line-clamp-2 mt-2 leading-relaxed">{reminder.description}</p>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
             <button onClick={() => { setCurrentView('live-co-create'); setReminder(null); }} className="bg-indigo-600 hover:bg-indigo-500 text-white font-black py-2.5 rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">Enter Stage</button>
             <button onClick={handleJustListen} className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-black py-2.5 rounded-xl text-[10px] uppercase tracking-widest border border-gray-700 active:scale-95 transition-all">Just Listen</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
