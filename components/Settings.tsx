
import React, { useState } from 'react';
import type { User as UserType } from '../types';
import { User, BellAlertIcon } from './icons/UserIcon';
import { CreditCardIcon } from './icons/CreditCardIcon';
import { ConferenceIcon } from './icons/ConferenceIcon';
import { CloseIcon } from './icons/CloseIcon';
import type { Theme } from '../App';
import { MOCK_USERS } from '../constants';
import { UploadIcon } from './icons/UploadIcon';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { WebsiteIcon } from './icons/WebsiteIcon';
import { MusicalNoteIcon } from './icons/MusicalNoteIcon';
import { CheckIcon } from './icons/CheckIcon';


interface SettingsProps {
  theme: Theme;
}

type SettingsTab = 'Profile' | 'Account' | 'Notifications' | 'Billing' | 'Host' | 'Auth Connect';

const Settings: React.FC<SettingsProps> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('Profile');
  const [profileData, setProfileData] = useState<UserType>(MOCK_USERS.jane_creator);

  // Sub-component for tag-based input
  const TagInput: React.FC<{
    label: string;
    tags: string[];
    setTags: (tags: string[]) => void;
  }> = ({ label, tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputValue.trim() !== '') {
        e.preventDefault();
        if (!tags.includes(inputValue.trim())) {
          setTags([...tags, inputValue.trim()]);
        }
        setInputValue('');
      }
    };

    const removeTag = (tagToRemove: string) => {
      setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <div className="flex flex-wrap gap-2 items-center bg-gray-700 border-gray-600 rounded-md p-2">
          {tags.map(tag => (
            <span key={tag} className="flex items-center gap-2 bg-indigo-500/50 text-indigo-200 text-sm font-medium px-3 py-1 rounded-full">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="text-indigo-100 hover:text-white">
                <CloseIcon className="w-3 h-3" />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent focus:outline-none text-white"
            placeholder="Type and press Enter..."
          />
        </div>
      </div>
    );
  };
  
  // Sub-component for image uploading
  const ImageUploader: React.FC<{
    label: string;
    imageUrl: string;
    isAvatar?: boolean;
    onImageChange: (newUrl: string) => void;
  }> = ({ label, imageUrl, isAvatar = false, onImageChange }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    onImageChange(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    }
    
    return (
       <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <div className={`relative group overflow-hidden ${isAvatar ? 'w-32 h-32 rounded-full' : 'w-full aspect-video rounded-lg'}`}>
            <img src={imageUrl} alt={label} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button type="button" onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center text-white">
                    <UploadIcon className="w-8 h-8" />
                    <span className="text-sm mt-1">Change</span>
                </button>
                 <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*"/>
            </div>
        </div>
       </div>
    )
  }

  const handleFieldChange = (field: keyof UserType, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const tabs: { name: SettingsTab, icon: React.ReactNode }[] = [
    { name: 'Profile', icon: <User className="w-5 h-5 mr-2" /> },
    { name: 'Account', icon: <User className="w-5 h-5 mr-2" /> },
    { name: 'Notifications', icon: <BellAlertIcon className="w-5 h-5 mr-2" /> },
    { name: 'Billing', icon: <CreditCardIcon className="w-5 h-5 mr-2" /> },
    { name: 'Host', icon: <ConferenceIcon className="w-5 h-5 mr-2" /> },
    { name: 'Auth Connect', icon: <MusicalNoteIcon className="w-5 h-5 mr-2" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        const accentColors = ['indigo', 'red', 'green', 'yellow'];
        return (
          <div className="space-y-8 divide-y divide-gray-700/50">
            {/* Visual Identity Section */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-4">Visual Identity</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <ImageUploader label="Profile Picture" imageUrl={profileData.avatarUrl} onImageChange={(url) => handleFieldChange('avatarUrl', url)} isAvatar />
                  <ImageUploader label="Profile Banner" imageUrl="https://picsum.photos/seed/profilebanner/1600/400" onImageChange={() => {}} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Profile Accent Color</label>
                  <div className="flex gap-3">
                    {accentColors.map(color => (
                      <button key={color} type="button" onClick={() => handleFieldChange('profileThemeColor', color)} className={`w-10 h-10 rounded-full bg-${color}-500 transition-transform hover:scale-110 ${profileData.profileThemeColor === color ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white' : ''}`}></button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Core Information Section */}
            <section className="pt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Core Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                  <input type="text" id="name" value={profileData.name} onChange={e => handleFieldChange('name', e.target.value)} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                </div>
                <div>
                  <label htmlFor="handle" className="block text-sm font-medium text-gray-300">Username</label>
                  <input type="text" id="handle" value={profileData.handle} onChange={e => handleFieldChange('handle', e.target.value)} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-300">Bio</label>
                  <textarea id="bio" rows={4} value={profileData.bio} onChange={e => handleFieldChange('bio', e.target.value)} maxLength={300} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white"></textarea>
                  <p className="text-xs text-gray-400 mt-1 text-right">{profileData.bio?.length || 0} / 300</p>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-300">Location</label>
                  <input type="text" id="location" value={profileData.location} onChange={e => handleFieldChange('location', e.target.value)} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                </div>
              </div>
            </section>
            
             {/* Social Links Section */}
            <section className="pt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Social & Web Links</h3>
                <div className="space-y-4">
                    <div className="relative">
                        <TwitterIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                        <input type="text" placeholder="Twitter Handle" className="pl-10 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                    </div>
                    <div className="relative">
                        <YouTubeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                        <input type="text" placeholder="YouTube Channel URL" className="pl-10 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                    </div>
                     <div className="relative">
                        <WebsiteIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                        <input type="text" placeholder="Personal Website URL" className="pl-10 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                    </div>
                </div>
            </section>

            {/* Professional Details Section */}
            <section className="pt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Professional Details</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                    <div>
                        <p className="font-medium text-white">Available for Work</p>
                        <p className="text-sm text-gray-400">Let others know you're open to freelance opportunities.</p>
                    </div>
                    <input type="checkbox" className="toggle-checkbox" checked={profileData.availableForWork} onChange={e => handleFieldChange('availableForWork', e.target.checked)} />
                </div>
                <TagInput label="Skills" tags={profileData.skills || []} setTags={tags => handleFieldChange('skills', tags)} />
                <TagInput label="My Gear" tags={profileData.gear || []} setTags={tags => handleFieldChange('gear', tags)} />
              </div>
            </section>
          </div>
        );
      case 'Account':
        return (
             <div className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                    <input type="email" id="email" defaultValue="jane@example.com" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                </div>
                 <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">New Password</label>
                    <input type="password" id="password" placeholder="••••••••" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                </div>
            </div>
        )
      case 'Notifications':
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                    <div>
                        <p className="font-medium text-white">New Follower</p>
                        <p className="text-sm text-gray-400">Get notified when someone follows you.</p>
                    </div>
                    <input type="checkbox" className="toggle-checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                    <div>
                        <p className="font-medium text-white">Clip Sold</p>
                        <p className="text-sm text-gray-400">Get notified every time you make a sale.</p>
                    </div>
                    <input type="checkbox" className="toggle-checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                    <div>
                        <p className="font-medium text-white">Community Updates</p>
                        <p className="text-sm text-gray-400">Receive weekly digests and platform news.</p>
                    </div>
                    <input type="checkbox" className="toggle-checkbox" />
                </div>
            </div>
        )
       case 'Host':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg">
                <div>
                    <p className="font-medium text-white">Enable Conference Hosting</p>
                    <p className="text-sm text-gray-400">Allow your account to create and host conference rooms.</p>
                </div>
                <input type="checkbox" className="toggle-checkbox" defaultChecked />
            </div>
            <div>
                <label htmlFor="room-name" className="block text-sm font-medium text-gray-300">Default Room Name</label>
                <input type="text" id="room-name" defaultValue="Jane's Creator Room" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white" />
            </div>
             <div>
                <label htmlFor="welcome-message" className="block text-sm font-medium text-gray-300">Default Welcome Message</label>
                <textarea id="welcome-message" rows={3} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white" defaultValue="Welcome to my creative space! Let's collaborate."></textarea>
            </div>
          </div>
        );
      case 'Auth Connect':
        return (
          <div className="space-y-6">
            <p className="text-gray-400 text-sm italic">Manage third-party authentication and data sync.</p>
            <div className="space-y-4">
              {[
                { name: 'Spotify', icon: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg', connected: true },
                { name: 'Amazon Music', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Amazon_Music_logo.svg', connected: false },
                { name: 'Apple Music', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Apple_Music_logo.svg', connected: false }
              ].map(platform => (
                <div key={platform.name} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-2xl border border-gray-600/30">
                  <div className="flex items-center gap-4">
                    <img src={platform.icon} className="w-8 h-8" alt={platform.name} />
                    <span className="font-bold text-white">{platform.name}</span>
                  </div>
                  {platform.connected ? (
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-green-400 font-bold uppercase flex items-center gap-1">
                        <CheckIcon className="w-4 h-4"/> Syncing
                      </span>
                      <button className="text-xs text-red-400 hover:underline font-bold uppercase">Disconnect</button>
                    </div>
                  ) : (
                    <button className="text-xs text-indigo-400 hover:text-indigo-300 font-black uppercase tracking-widest bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20">Connect Account</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div>Content not found.</div>;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex flex-row md:flex-col gap-1 bg-gray-800 p-2 rounded-lg">
            {tabs.map(tab => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.name ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">{activeTab} Settings</h2>
            {renderContent()}
             <div className="mt-8 pt-6 border-t border-gray-700/50 flex justify-end">
                <button onClick={() => alert('Profile settings saved!')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
       <style>{`
        .toggle-checkbox {
          appearance: none;
          width: 40px;
          height: 20px;
          background-color: #4b5563;
          border-radius: 9999px;
          position: relative;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
        }
        .toggle-checkbox::before {
          content: '';
          width: 16px;
          height: 16px;
          background-color: white;
          border-radius: 9999px;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: transform 0.2s ease-in-out;
        }
        .toggle-checkbox:checked {
          background-color: #4f46e5;
        }
        .toggle-checkbox:checked::before {
          transform: translateX(20px);
        }
       `}</style>
    </div>
  );
};

export default Settings;
