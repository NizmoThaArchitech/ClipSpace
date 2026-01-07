
import React, { useState, useRef, useEffect } from 'react';
import { PhotoIcon } from './icons/PhotoIcon';
import { VideoCameraIcon } from './icons/VideoCameraIcon';
import { AtSymbolIcon } from './icons/AtSymbolIcon';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

const CreatePost: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [privacy, setPrivacy] = useState('Public');
  const [isPrivacyMenuOpen, setIsPrivacyMenuOpen] = useState(false);
  const privacyMenuRef = useRef<HTMLDivElement>(null);
  
  const privacyOptions = ['Public', 'Friends Only', 'Only Me'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (privacyMenuRef.current && !privacyMenuRef.current.contains(event.target as Node)) {
        setIsPrivacyMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="flex space-x-4">
            <img src="https://i.pravatar.cc/150?u=currentuser" alt="User" className="w-12 h-12 rounded-full" />
            <div className="flex-1">
                <div 
                    className="relative" 
                    onFocus={() => setIsFocused(true)} 
                >
                    <textarea 
                        rows={isFocused ? 3 : 1}
                        className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 border-2 border-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300 resize-none"
                        placeholder="Share an update or a new clip..."
                    />
                    <div className={`transition-all duration-300 ease-in-out ${isFocused ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                        <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
                            <div className="flex space-x-2 sm:space-x-4">
                                <button className="flex items-center space-x-1 text-gray-400 hover:text-indigo-400 transition-colors p-1 rounded-md">
                                    <VideoCameraIcon className="w-6 h-6"/>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-400 hover:text-indigo-400 transition-colors p-1 rounded-md">
                                    <PhotoIcon className="w-6 h-6"/>
                                </button>
                                 <button className="flex items-center space-x-1 text-gray-400 hover:text-indigo-400 transition-colors p-1 rounded-md">
                                    <AtSymbolIcon className="w-6 h-6"/>
                                </button>
                                 <button className="flex items-center space-x-1 text-gray-400 hover:text-indigo-400 transition-colors p-1 rounded-md">
                                    <PaperAirplaneIcon className="w-6 h-6"/>
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative" ref={privacyMenuRef}>
                                    <button 
                                        onClick={() => setIsPrivacyMenuOpen(!isPrivacyMenuOpen)}
                                        className="flex items-center gap-1.5 text-sm font-medium text-gray-300 bg-gray-700/60 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
                                    >
                                        <LockClosedIcon className="w-4 h-4"/>
                                        {privacy}
                                        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isPrivacyMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isPrivacyMenuOpen && (
                                        <div className="absolute bottom-full right-0 mb-2 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-10">
                                            {privacyOptions.map(option => (
                                                <button 
                                                    key={option}
                                                    onClick={() => { setPrivacy(option); setIsPrivacyMenuOpen(false); }}
                                                    className="w-full text-left px-3 py-2 text-sm text-white hover:bg-indigo-600"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                                    Publish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CreatePost;