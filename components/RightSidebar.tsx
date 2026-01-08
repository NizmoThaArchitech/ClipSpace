
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MessageIcon } from './icons/MessageIcon';
import { ResizeHandleIcon } from './icons/ResizeHandleIcon';
import { DetachIcon } from './icons/DetachIcon';
import type { Theme } from '../App';
import { ChevronDoubleRightIcon } from './icons/ChevronDoubleRightIcon';

interface RightSidebarProps {
  theme: Theme;
  setIsVisible: (isVisible: boolean) => void;
}

const ChatWindow: React.FC<{isFloating?: boolean, onAttach?: () => void, theme: Theme}> = ({ isFloating = false, onAttach, theme }) => {
    const mockMessages = [
        { id: 1, sender: 'AeroVisions', text: 'Hey! Loved that last clip you uploaded.', type: 'received' },
        { id: 2, sender: 'You', text: 'Thanks! I appreciate that. I was really happy with how it turned out.', type: 'sent' },
        { id: 3, sender: 'AeroVisions', text: 'Are you planning on shooting more in that area?', type: 'received' },
        { id: 4, sender: 'You', text: 'Definitely. Heading back there next week to catch the sunrise.', type: 'sent' },
        { id: 5, sender: 'AeroVisions', text: 'Awesome! Can\'t wait to see it.', type: 'received' },
    ];
    
    const isDark = theme === 'dark';

    return (
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} flex flex-col h-full overflow-hidden rounded-b-lg`}>
             {/* Header */}
             <div className={`flex items-center justify-between p-2 flex-shrink-0 ${isDark ? 'border-b border-gray-700/50 bg-gray-900/50' : 'border-b border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center">
                    <img src="https://i.pravatar.cc/150?u=aerovisions" className="w-8 h-8 rounded-full mr-2" alt="avatar" />
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>AeroVisions</span>
                </div>
                {isFloating && <button onClick={onAttach} className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'} text-2xl leading-none`}>&times;</button>}
            </div>
            {/* Message Window */}
            <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-4">
                {mockMessages.slice(-10).map(msg => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.type === 'sent' ? 'justify-end' : ''}`}>
                        {msg.type === 'received' && <img src="https://i.pravatar.cc/150?u=aerovisions" className="w-6 h-6 rounded-full self-start" alt="avatar" />}
                        <div className={`max-w-xs lg:max-w-sm text-sm p-3 rounded-2xl ${msg.type === 'sent' ? (isDark ? 'bg-indigo-600 text-white' : 'bg-red-500 text-white') + ' rounded-br-none' : (isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800') + ' rounded-bl-none'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Input Section */}
            <div className={`${isDark ? 'bg-gray-800 border-t border-gray-700/50' : 'bg-white border-t border-gray-200'} p-2 flex-shrink-0`}>
                <div className="relative">
                <input 
                    type="text"
                    placeholder="Type a message..."
                    className={`w-full rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-700 text-white focus:ring-indigo-500' : 'bg-gray-100 text-black focus:ring-red-500'}`}
                />
                <button className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 ${isDark ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-500 hover:text-red-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086L2.279 16.76a.75.75 0 00.95.826l16-5.333a.75.75 0 000-1.418l-16-5.333z" /></svg>
                </button>
                </div>
            </div>
        </div>
    );
};


const RightSidebar: React.FC<RightSidebarProps> = ({ theme, setIsVisible }) => {
  const [isChatFloating, setIsChatFloating] = useState(false);
  const [chatHeight, setChatHeight] = useState(300); // Initial height in pixels
  const isResizing = useRef(false);

  const stats = [
    { label: 'Profile Views', value: '1.2k' },
    { label: 'Likes', value: '3.4k' },
    { label: 'Followers', value: '876' },
    { label: 'Clips Sold', value: '42' },
  ];
  
  const contacts = [
    { name: 'AeroVisions', avatar: 'https://i.pravatar.cc/150?u=aerovisions', online: true},
    { name: 'CafeCreations', avatar: 'https://i.pravatar.cc/150?u=cafecreations', online: false},
    { name: 'CodeReel', avatar: 'https://i.pravatar.cc/150?u=codereel', online: true},
    { name: 'UrbanFlow', avatar: 'https://i.pravatar.cc/150?u=urbanflow', online: true},
    { name: 'CoastalClips', avatar: 'https://i.pravatar.cc/150?u=coastalclips', online: false },
    { name: 'CozyMoments', avatar: 'https://i.pravatar.cc/150?u=cozymoments', online: true },
  ];

  const handleMouseDown = (_e: React.MouseEvent) => {
    isResizing.current = true;
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  };

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing.current) {
      const newHeight = window.innerHeight - e.clientY;
      if (newHeight > 200 && newHeight < window.innerHeight * 0.8) { // Height constraints
        setChatHeight(newHeight);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const isDark = theme === 'dark';

  return (
    <>
    <aside className={`hidden lg:flex flex-col h-full ${isDark ? 'bg-gray-800 border-l border-gray-700/50' : 'bg-gray-100 border-l border-gray-200'}`}>
      {/* Profile Section - Stationary */}
      <div className="p-4 flex-shrink-0">
        <div className={`${isDark ? 'bg-gray-700/50' : 'bg-white border border-gray-200'} rounded-lg p-4 text-center relative`}>
          <button onClick={() => setIsVisible(false)} className="absolute top-2 left-2 text-gray-500 hover:text-white" title="Hide Sidebar">
             <ChevronDoubleRightIcon className="w-5 h-5" />
          </button>
          <img src="https://i.pravatar.cc/150?u=currentuser" alt="User Profile" className={`w-20 h-20 rounded-full mx-auto border-4 ${isDark ? 'border-indigo-500' : 'border-red-500'}`} />
          <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-black'}`}>Jane Creator</h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>@jane_creator</p>
          <div className="mt-2 text-xs inline-flex items-center bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></span>
              Online
          </div>
        </div>
      </div>

      {/* Scrollable middle section */}
      <div className="flex-1 px-4 overflow-y-auto no-scrollbar">
        {/* Stats Section */}
        <div>
          <h4 className={`text-sm font-semibold uppercase tracking-wider mb-3 px-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Statistics</h4>
          <div className="grid grid-cols-2 gap-4">
              {stats.map(stat => (
                <div key={stat.label} className={`${isDark ? 'bg-gray-700/50' : 'bg-white border border-gray-200'} rounded-lg p-3 text-center`}>
                  <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>{stat.value}</p>
                  <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                </div>
              ))}
          </div>
        </div>
      
        {/* Messages Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3 px-1">
              <h4 className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Messages</h4>
              <MessageIcon className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}/>
          </div>
          <div className={`${isDark ? 'bg-gray-700/50' : 'bg-white border border-gray-200'} rounded-lg p-3 space-y-3`}>
              {contacts.map(contact => (
                  <div key={contact.name} className={`flex items-center space-x-3 cursor-pointer p-1 rounded-md ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                      <div className="relative">
                          <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full"/>
                          {contact.online && <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 rounded-full ${isDark ? 'border-gray-800' : 'border-white'}`}></span>}
                      </div>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>{contact.name}</span>
                  </div>
              ))}
          </div>
        </div>
      </div>
      
       {!isChatFloating && (
        <div 
          className="flex flex-col flex-shrink-0"
          style={{ height: `${chatHeight}px` }}
        >
          <div 
            onMouseDown={handleMouseDown}
            className={`flex items-center justify-center py-1 cursor-ns-resize group ${isDark ? 'bg-gray-900/50 border-y border-gray-700/50' : 'bg-gray-200 border-y border-gray-300'}`}
          >
            <ResizeHandleIcon className={`w-8 h-8 ${isDark ? 'text-gray-600 group-hover:text-gray-400' : 'text-gray-400 group-hover:text-gray-600'} transition-colors`} />
             <button 
                onClick={(e) => { e.stopPropagation(); setIsChatFloating(true); }}
                className={`absolute right-4 p-1 ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`} 
                title="Detach Chat"
             >
                <DetachIcon className="w-5 h-5" />
            </button>
          </div>
          <ChatWindow theme={theme} />
        </div>
      )}
    </aside>
    {isChatFloating && (
        <div className={`floating-chat ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
            <ChatWindow isFloating={true} onAttach={() => setIsChatFloating(false)} theme={theme} />
        </div>
    )}
    </>
  );
};

export default RightSidebar;
