
import React from 'react';
import type { Theme } from '../App';
import { MOCK_USERS } from '../constants';
import type { SplitContract } from '../types';
import { HandshakeIcon } from './icons/HandshakeIcon';
import { PlusIcon } from './icons/PlusIcon';

const MOCK_SPLIT_CONTRACTS: SplitContract[] = [
    {
        id: 'sc1',
        name: 'Short Film "Neon Sunset"',
        totalEarnings: 1250.75,
        status: 'Active',
        participants: [
            { user: MOCK_USERS.jane_creator, share: 50 },
            { user: MOCK_USERS.pixelperfect, share: 30 },
            { user: MOCK_USERS.aerovisions, share: 20 },
        ]
    },
    {
        id: 'sc2',
        name: 'Coffee Shop Ad Campaign',
        totalEarnings: 4800.00,
        status: 'Active',
        participants: [
            { user: MOCK_USERS.jane_creator, share: 60 },
            { user: MOCK_USERS.cafecreations, share: 40 },
        ]
    },
     {
        id: 'sc3',
        name: 'Documentary "Urban Jungle"',
        totalEarnings: 890.50,
        status: 'Completed',
        participants: [
            { user: MOCK_USERS.urbanflow, share: 70 },
            { user: MOCK_USERS.storyweaver, share: 30 },
        ]
    }
];


const SplitsHub: React.FC<{ theme: Theme }> = ({ theme: _theme }) => {
    
    const getStatusChip = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-500/20 text-green-300';
            case 'Completed': return 'bg-gray-500/20 text-gray-300';
            default: return 'bg-yellow-500/20 text-yellow-300';
        }
    };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-white">AI Splits Hub</h1>
            <p className="text-gray-400 mt-1">Automate revenue sharing for your collaborative projects.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2">
            <PlusIcon className="w-5 h-5"/>
            Create New Split
        </button>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg border border-indigo-500/30">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-3"><HandshakeIcon className="w-6 h-6 text-indigo-400" /> What are Split Contracts?</h2>
        <p className="text-gray-300 text-sm">A Split Contract is a smart agreement that automatically divides the earnings from a clip sale among all collaborators. When a clip linked to a contract is sold, we handle the math and instantly distribute the funds to each participant's wallet according to their agreed-upon share. No more spreadsheets, no more manual payouts—just create, sell, and earn together.</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">My Split Contracts</h2>
        <div className="space-y-4">
            {MOCK_SPLIT_CONTRACTS.map(contract => (
                <div key={contract.id} className="bg-gray-800 p-5 rounded-lg border border-gray-700/50">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                        <div>
                            <h3 className="text-lg font-bold text-white">{contract.name}</h3>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block ${getStatusChip(contract.status)}`}>{contract.status}</span>
                        </div>
                         <div className="mt-4 sm:mt-0 text-left sm:text-right">
                            <p className="text-sm text-gray-400">Total Earnings</p>
                            <p className="text-2xl font-bold text-green-400">${contract.totalEarnings.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                        <h4 className="text-sm font-semibold text-gray-400 mb-3">Participants & Shares</h4>
                        <div className="flex items-center gap-4">
                            {contract.participants.map(p => (
                                <div key={p.user.id} className="flex items-center gap-3 bg-gray-700/50 p-2 rounded-lg">
                                    <img src={p.user.avatarUrl} alt={p.user.name} className="w-8 h-8 rounded-full" />
                                    <div>
                                        <p className="text-sm font-bold text-white">{p.user.name}</p>
                                        <p className="text-lg font-black text-indigo-400">{p.share}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SplitsHub;
