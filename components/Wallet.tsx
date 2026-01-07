
import React, { useState } from 'react';
import { MOCK_TRANSACTIONS, MOCK_SPLIT_CONTRACTS, MOCK_USERS } from '../constants';
import { DownloadIcon } from './icons/DownloadIcon';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { CreditCardIcon } from './icons/CreditCardIcon';
import { HandshakeIcon } from './icons/HandshakeIcon';
import { PlusIcon } from './icons/PlusIcon';
import { CloseIcon } from './icons/CloseIcon';
import type { Theme } from '../App';
import type { SplitContract } from '../types';

interface WalletProps {
    theme: Theme;
}

const SplitContractModal: React.FC<{ contract: SplitContract; onClose: () => void }> = ({ contract, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-fadeIn">
                <div className="p-8 border-b border-gray-800 flex justify-between items-center bg-gray-800/30">
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight">{contract.name}</h2>
                        <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mt-1">Full Allocation Ledger</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-gray-800 rounded-xl hover:text-red-500 transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-end border-b border-gray-800 pb-6">
                        <div>
                            <p className="text-gray-500 text-xs font-black uppercase">Gross Protocol Revenue</p>
                            <p className="text-4xl font-black text-white mt-1">${contract.totalEarnings.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500 text-xs font-black uppercase">Settlement Status</p>
                            <p className="text-green-400 font-bold mt-1">Active distribution</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest">Stakeholder Distribution</h4>
                        {contract.participants.map(p => (
                            <div key={p.user.id} className="flex items-center justify-between p-4 bg-gray-800/40 rounded-2xl border border-gray-700/50">
                                <div className="flex items-center gap-4">
                                    <img src={p.user.avatarUrl} alt={p.user.name} className="w-12 h-12 rounded-full border-2 border-indigo-500/30" />
                                    <div>
                                        <p className="font-bold text-white text-lg">{p.user.name}</p>
                                        <p className="text-xs text-gray-500 font-mono">STAKE: {p.share}%</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-indigo-400">${(contract.totalEarnings * (p.share / 100)).toLocaleString()}</p>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">Net Allocation</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-8 bg-gray-800/30">
                    <button onClick={onClose} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/20">ACKNOWLEDGE LEDGER</button>
                </div>
            </div>
        </div>
    );
};

const Wallet: React.FC<WalletProps> = ({ theme }) => {
  const [activeView, setActiveView] = useState<'balance' | 'splits'>('balance');
  const [selectedContract, setSelectedContract] = useState<SplitContract | null>(null);

  const getStatusChip = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return <span className="px-2 py-1 text-xs font-medium text-green-300 bg-green-500/20 rounded-full">Completed</span>;
      case 'active': return <span className="px-2 py-1 text-xs font-medium text-indigo-300 bg-indigo-500/20 rounded-full">Active</span>;
      case 'pending': return <span className="px-2 py-1 text-xs font-medium text-yellow-300 bg-yellow-500/20 rounded-full">Pending</span>;
      default: return <span className="px-2 py-1 text-xs font-medium text-gray-300 bg-gray-500/20 rounded-full">{status}</span>;
    }
  };
  
  const getTransactionIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'sale': return <div className="p-2 bg-green-500/20 rounded-full"><CreditCardIcon className="w-5 h-5 text-green-400" /></div>
      case 'purchase': return <div className="p-2 bg-red-500/20 rounded-full"><ShoppingCartIcon className="w-5 h-5 text-red-400" /></div>
      case 'withdrawal': return <div className="p-2 bg-sky-500/20 rounded-full"><DownloadIcon className="w-5 h-5 text-sky-400" /></div>
      default: return null;
    }
  }

  // Helper to find "Your" share (Jane Creator is u0)
  const getUserShare = (contract: SplitContract) => {
      return contract.participants.find(p => p.user.id === 'u0')?.share || 0;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 min-h-full bg-gray-700">
      {selectedContract && <SplitContractModal contract={selectedContract} onClose={() => setSelectedContract(null)} />}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
            <h1 className="text-4xl font-black text-white tracking-tighter">FINANCIAL <span className="text-indigo-500">OPERATIONS</span></h1>
            <p className="text-gray-300 mt-1 font-bold uppercase tracking-widest text-xs">Liquidity Management & Revenue Protocols</p>
        </div>
        <div className="flex bg-gray-800/50 p-1 rounded-2xl border border-gray-600/30 backdrop-blur-sm">
            <button 
                onClick={() => setActiveView('balance')}
                className={`px-6 py-2.5 text-sm font-black rounded-xl transition-all ${activeView === 'balance' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-gray-400 hover:text-white'}`}
            >
                PROTOCOL BALANCE
            </button>
            <button 
                onClick={() => setActiveView('splits')}
                className={`px-6 py-2.5 text-sm font-black rounded-xl transition-all ${activeView === 'splits' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-gray-400 hover:text-white'}`}
            >
                REVENUE PROTOCOLS
            </button>
        </div>
      </div>

      {activeView === 'balance' ? (
        <div className="space-y-8 animate-fadeIn">
            {/* Balance & Payouts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-gray-900 p-8 rounded-3xl shadow-2xl flex flex-col justify-between border border-gray-800 relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                <div>
                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Institutional Liquidity</p>
                    <p className="text-7xl font-black text-white mt-2 tabular-nums tracking-tighter">$1,284.50</p>
                    <div className="flex items-center gap-2 mt-4 text-green-400 text-xs font-black bg-green-400/10 w-fit px-4 py-1.5 rounded-full border border-green-400/20">
                        <PlusIcon className="w-4 h-4"/> +$124.00 WEEKLY DELTA
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-10">
                    <button className="flex-1 bg-white text-black hover:bg-indigo-500 hover:text-white font-black py-4 px-6 rounded-2xl transition-all active:scale-95 shadow-lg uppercase text-sm">Transfer to Settlement</button>
                    <button className="flex-1 bg-gray-800 text-white hover:bg-gray-700 font-black py-4 px-6 rounded-2xl transition-all active:scale-95 border border-gray-700 uppercase text-sm">Add Collateral</button>
                </div>
                </div>
                <div className="bg-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-800">
                <h2 className="text-xl font-black text-white tracking-tight uppercase">Settlement Gateways</h2>
                <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-widest">Active Channels</p>
                <div className="mt-8 space-y-4">
                    <div className="bg-gray-800/50 p-5 rounded-2xl flex items-center justify-between border border-gray-700/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white text-xl">S</div>
                            <div>
                                <p className="font-black text-white">STRIPE PROTOCOL</p>
                                <p className="text-[10px] text-green-400 font-black uppercase tracking-widest">Primary Settlement</p>
                            </div>
                        </div>
                        <button className="text-xs text-indigo-400 hover:text-indigo-300 font-black uppercase tracking-tighter underline">Edit</button>
                    </div>
                    <button className="w-full py-5 border-2 border-dashed border-gray-800 rounded-2xl text-xs text-gray-500 hover:border-indigo-500 hover:text-indigo-400 transition-all font-black uppercase tracking-widest">Provision New Gateway</button>
                </div>
                </div>
            </div>
            
            {/* Transaction History */}
            <div>
                <h2 className="text-2xl font-black text-white mb-6 tracking-tight uppercase">Protocol Ledger</h2>
                <div className="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-[10px] text-gray-500 uppercase bg-gray-800/30 font-black tracking-widest">
                        <tr>
                        <th scope="col" className="px-10 py-6">Timestamp</th>
                        <th scope="col" className="px-10 py-6">Operation Type</th>
                        <th scope="col" className="px-10 py-6 hidden md:table-cell">Metadata</th>
                        <th scope="col" className="px-10 py-6 text-right">Value Delta</th>
                        <th scope="col" className="px-10 py-6 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {MOCK_TRANSACTIONS.map(tx => (
                        <tr key={tx.id} className="hover:bg-gray-800/40 transition-colors">
                            <td className="px-10 py-6 whitespace-nowrap font-bold text-gray-300">{tx.date}</td>
                            <td className="px-10 py-6">
                                <div className="flex items-center gap-3">
                                    {getTransactionIcon(tx.type)}
                                    <span className="capitalize font-black text-gray-200 tracking-tight">{tx.type}</span>
                                </div>
                            </td>
                            <td className="px-10 py-6 text-gray-500 font-medium hidden md:table-cell">{tx.description}</td>
                            <td className={`px-10 py-6 font-black text-right text-xl tracking-tighter ${tx.amount > 0 ? 'text-green-400' : 'text-white'}`}>
                            {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                            </td>
                            <td className="px-10 py-6 text-center">{getStatusChip(tx.status)}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fadeIn">
             <div className="bg-gradient-to-br from-indigo-900/40 to-black p-10 rounded-3xl border border-indigo-500/30 relative overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="max-w-2xl relative z-10">
                        <h2 className="text-4xl font-black text-white flex items-center gap-4 tracking-tighter">
                            <HandshakeIcon className="w-12 h-12 text-indigo-400" />
                            INSTITUTIONAL REVENUE ALLOCATION PROTOCOL
                        </h2>
                        <p className="text-gray-400 mt-4 text-lg font-medium leading-relaxed">
                            Enterprise-grade equity distribution for professional media syndication. Our smart settlement engine executes precise fractional payouts at the instant of transaction.
                        </p>
                        <button className="mt-10 bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 px-12 rounded-2xl transition-all shadow-2xl shadow-indigo-500/30 active:scale-95 flex items-center gap-3 uppercase text-sm tracking-widest">
                             <PlusIcon className="w-6 h-6"/> Execute New Allocation
                        </button>
                    </div>
                    <div className="hidden lg:block w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px] absolute -bottom-20 -right-20"></div>
                </div>
            </div>

            <div className="space-y-6">
                {MOCK_SPLIT_CONTRACTS.map(contract => {
                    const mySharePercent = getUserShare(contract);
                    const myEarningsAmount = contract.totalEarnings * (mySharePercent / 100);
                    
                    return (
                    <div key={contract.id} className="bg-gray-900 rounded-3xl border border-gray-800 hover:border-indigo-500/50 transition-all group overflow-hidden flex">
                        {/* 80% Left Section */}
                        <div className="flex-[4] p-8 flex flex-col">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-3xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tight">{contract.name}</h3>
                                    <div className="mt-3">{getStatusChip(contract.status)}</div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Project Gross</p>
                                    <p className="text-2xl font-black text-white mt-1">${contract.totalEarnings.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="mt-12">
                                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Entity Allocation Structure</h4>
                                <div className="flex flex-wrap gap-4">
                                    {contract.participants.map(p => (
                                        <div key={p.user.id} className="flex items-center gap-3 p-3 bg-gray-800/40 rounded-2xl border border-gray-700/50">
                                            <img src={p.user.avatarUrl} alt={p.user.name} className="w-8 h-8 rounded-full border border-gray-700" />
                                            <div>
                                                <p className="font-black text-white text-xs leading-none">{p.user.name}</p>
                                                <p className="text-[10px] text-indigo-400 font-bold mt-1 uppercase tracking-tighter">{p.share}% Equity</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Separator Line (Vertical) */}
                        <div className="w-[1px] bg-gray-800 group-hover:bg-indigo-500/30 my-8 transition-colors"></div>

                        {/* 20% Right Section */}
                        <div className="flex-1 p-8 bg-gray-800/10 flex flex-col justify-between min-w-[220px]">
                            <div className="text-center">
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Net Personal Yield</p>
                                <p className="text-4xl font-black text-green-400 tracking-tighter">${myEarningsAmount.toLocaleString()}</p>
                                <div className="mt-4 pt-4 border-t border-gray-800/50 text-[10px] font-bold text-gray-500 leading-relaxed uppercase tracking-tighter">
                                    Breakdown: <span className="text-gray-300">{mySharePercent}% OF ${contract.totalEarnings.toLocaleString()}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedContract(contract)}
                                className="w-full mt-8 py-4 bg-gray-800 hover:bg-indigo-600 text-white font-black rounded-2xl transition-all border border-gray-700 hover:border-indigo-500 uppercase text-[10px] tracking-widest"
                            >
                                View Allocation Ledger
                            </button>
                        </div>
                    </div>
                )})}
            </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
