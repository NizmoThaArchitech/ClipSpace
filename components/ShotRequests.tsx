
import React from 'react';
import type { Theme } from '../App';
import { MOCK_PROJECT_REQUESTS } from '../constants';
import { GavelIcon } from './icons/GavelIcon';
import { DollarIcon } from './icons/DollarIcon';
import { CalendarIcon } from './icons/CalendarIcon';

const ShotRequests: React.FC<{ theme: Theme }> = ({ theme: _theme }) => {

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Shot Requests</h1>
          <p className="text-gray-400 mt-1">Find and bid on custom B-roll projects from clients.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors whitespace-nowrap">Post a New Request</button>
      </div>

       {/* Project Board */}
      <div className="space-y-6">
        {MOCK_PROJECT_REQUESTS.map(request => (
            <div key={request.id} className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700/50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Request Details */}
                    <div className="md:col-span-3">
                        <h3 className="text-xl font-bold text-white hover:text-indigo-400 cursor-pointer">{request.title}</h3>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                            <span>Posted by</span>
                            <img src={request.client.avatarUrl} alt={request.client.name} className="w-6 h-6 rounded-full"/>
                            <span className="font-semibold text-gray-300">{request.client.name}</span>
                        </div>
                        <p className="text-gray-300 mt-4 text-sm">{request.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {request.tags.map(tag => (
                                <span key={tag} className="bg-gray-700 text-gray-300 text-xs font-medium px-2 py-1 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>
                    {/* Budget & Bidding */}
                    <div className="md:col-span-1 flex flex-col justify-between items-start md:items-end">
                        <div className="text-left md:text-right">
                            <div className="flex items-center gap-2 text-gray-400"><DollarIcon className="w-5 h-5"/><span>Budget</span></div>
                            <p className="text-3xl font-bold text-green-400">${request.budget.toLocaleString()}</p>
                            <div className="flex items-center gap-2 text-gray-400 mt-2"><CalendarIcon className="w-5 h-5"/><span>Deadline</span></div>
                            <p className="font-semibold text-white">{request.deadline}</p>
                        </div>
                         <button className="w-full md:w-auto mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg flex items-center justify-center gap-2">
                            <GavelIcon className="w-5 h-5"/>
                            Place Bid ({request.bidsCount})
                        </button>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ShotRequests;
