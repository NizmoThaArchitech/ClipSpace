
import React, { useState } from 'react';
import type { Theme } from '../App';
import { MOCK_VIDEO_CLIPS, MOCK_USERS } from '../constants';
import { GavelIcon } from './icons/GavelIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { PlusIcon } from './icons/PlusIcon';

const RightsHub: React.FC<{ theme: Theme }> = ({ theme }) => {
    const [activeTab, setActiveTab] = useState('ip');
    
    const renderContent = () => {
        switch (activeTab) {
            case 'ip':
                return (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-400">
                            <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Clip</th>
                                    <th scope="col" className="px-6 py-3">Ownership</th>
                                    <th scope="col" className="px-6 py-3">Creation Date</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_VIDEO_CLIPS.map(clip => (
                                    <tr key={clip.id} className="bg-gray-800 border-b border-gray-700/50 hover:bg-gray-700/60">
                                        <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                            <img src={clip.thumbnailUrl} alt={clip.title} className="w-16 h-9 object-cover rounded"/>
                                            {clip.title}
                                        </td>
                                        <td className="px-6 py-4">100% You</td>
                                        <td className="px-6 py-4">2024-07-15</td>
                                        <td className="px-6 py-4"><span className="text-green-400">Registered</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'licenses':
                 return (
                    <div>
                        <div className="flex justify-end mb-4">
                            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg">
                                <PlusIcon className="w-5 h-5"/> Create Template
                            </button>
                        </div>
                        <div className="space-y-4">
                             <div className="bg-gray-700/50 p-4 rounded-lg">
                                <h3 className="font-bold text-white">Standard Web License</h3>
                                <p className="text-sm text-gray-400 mt-1">For web, social media, and presentations. Max 500,000 views.</p>
                             </div>
                              <div className="bg-gray-700/50 p-4 rounded-lg">
                                <h3 className="font-bold text-white">Extended Broadcast License</h3>
                                <p className="text-sm text-gray-400 mt-1">For TV, film, and online advertising. Unlimited views.</p>
                             </div>
                        </div>
                    </div>
                 );
            case 'provenance':
                const selectedClip = MOCK_VIDEO_CLIPS[0];
                return (
                     <div>
                        <h3 className="font-bold text-lg mb-4">Provenance for: <span className="text-indigo-400">{selectedClip.title}</span></h3>
                        <div className="border-l-2 border-indigo-500/50 ml-2 pl-6 space-y-8">
                            <div className="relative">
                                <div className="absolute -left-[30px] top-1 w-4 h-4 bg-indigo-500 rounded-full border-2 border-gray-800"></div>
                                <p className="font-semibold text-white">Clip Created</p>
                                <p className="text-sm text-gray-400">by {selectedClip.creator.name} on 2024-07-01</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[30px] top-1 w-4 h-4 bg-indigo-500 rounded-full border-2 border-gray-800"></div>
                                <p className="font-semibold text-white">Color Grade Edit</p>
                                <p className="text-sm text-gray-400">by {MOCK_USERS.pixelperfect.name} on 2024-07-05</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[30px] top-1 w-4 h-4 bg-indigo-500 rounded-full border-2 border-gray-800"></div>
                                <p className="font-semibold text-white">Standard License Issued</p>
                                <p className="text-sm text-gray-400">to 'Tech Startup Inc.' on 2024-07-21</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Rights & Licensing Hub</h1>
        <p className="text-gray-400 mt-1">Manage your intellectual property, create licenses, and track content provenance.</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700/50">
        <div className="border-b border-gray-700 mb-6">
            <nav className="-mb-px flex space-x-6">
                <button onClick={() => setActiveTab('ip')} className={`capitalize whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'ip' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-white'}`}>My IP</button>
                <button onClick={() => setActiveTab('licenses')} className={`capitalize whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'licenses' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-white'}`}>License Templates</button>
                <button onClick={() => setActiveTab('provenance')} className={`capitalize whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'provenance' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-white'}`}>Provenance Explorer</button>
            </nav>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default RightsHub;
