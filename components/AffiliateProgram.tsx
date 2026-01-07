
import React from 'react';
import type { Theme } from '../App';
import { CopyIcon } from './icons/CopyIcon';
import { LinkIcon } from './icons/LinkIcon';
import { MOCK_USERS } from '../constants';
import { DollarIcon } from './icons/DollarIcon';
import { CursorClickIcon } from './icons/CursorClickIcon';
import { UsersIcon } from './icons/UsersIcon';

const AffiliateProgram: React.FC<{ theme: Theme }> = ({ theme }) => {
    const isDark = theme === 'dark';
    
    const affiliateLink = "https://clipspace.io/join?ref=jane_creator";
    
    const copyLink = () => {
        navigator.clipboard.writeText(affiliateLink);
        // Add a toast notification here in a real app
        alert('Link copied to clipboard!');
    };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Affiliate Program</h1>
        <p className="text-gray-400 mt-1">Earn a 15% commission on sales from creators you refer!</p>
      </div>

      {/* Your Referral Link */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2"><LinkIcon className="w-5 h-5"/> Your Referral Link</h2>
          <p className="text-sm text-gray-400 mt-2">Share this link with other creators. When they sign up and make sales, you earn!</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <input type="text" readOnly value={affiliateLink} className="flex-grow w-full bg-gray-700 text-gray-300 rounded-lg px-4 py-2 border border-gray-600 focus:outline-none" />
            <button onClick={copyLink} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                <CopyIcon className="w-5 h-5" />
                Copy Link
            </button>
          </div>
      </div>

       {/* Performance Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700/50">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-500/20 rounded-lg"><DollarIcon className="w-6 h-6 text-green-400"/></div>
                    <div>
                        <p className="text-sm text-gray-400">Total Earnings</p>
                        <p className="text-2xl font-bold text-white">$428.19</p>
                    </div>
                </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700/50">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-sky-500/20 rounded-lg"><CursorClickIcon className="w-6 h-6 text-sky-400"/></div>
                    <div>
                        <p className="text-sm text-gray-400">Link Clicks</p>
                        <p className="text-2xl font-bold text-white">1,582</p>
                    </div>
                </div>
            </div>
             <div className="bg-gray-800 p-6 rounded-lg border border-gray-700/50">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-cyan-500/20 rounded-lg"><UsersIcon className="w-6 h-6 text-cyan-400"/></div>
                    <div>
                        <p className="text-sm text-gray-400">Referred Users</p>
                        <p className="text-2xl font-bold text-white">38</p>
                    </div>
                </div>
            </div>
        </div>
      
      {/* Referred Users Table */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Your Referred Creators</h2>
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700/50">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3">Creator</th>
                  <th scope="col" className="px-6 py-3">Date Joined</th>
                  <th scope="col" className="px-6 py-3">Total Sales</th>
                  <th scope="col" className="px-6 py-3 text-right">Your Earnings</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(MOCK_USERS).slice(1, 6).map((user, index) => (
                  <tr key={user.id} className="bg-gray-800 border-b border-gray-700/50 hover:bg-gray-700/60">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                            <div>
                                <p className="font-bold text-white">{user.name}</p>
                                <p className="text-xs">{user.handle}</p>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4">2024-0{8 - index}-1{index}</td>
                    <td className="px-6 py-4 font-medium text-gray-200">${(user.clipsSold || 0) * 25.5}</td>
                    <td className="px-6 py-4 font-bold text-right text-green-400">
                      ${((user.clipsSold || 0) * 25.5 * 0.15).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProgram;
