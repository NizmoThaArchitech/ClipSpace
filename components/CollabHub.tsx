
import React, { useState, useMemo } from 'react';
import type { Theme } from '../App';
import { MOCK_COLLABORATIONS } from '../constants';
import { HandshakeIcon } from './icons/HandshakeIcon';
import { UsersIcon } from './icons/UsersIcon';
import { SearchIcon } from './icons/SearchIcon';

const CollabHub: React.FC<{ theme: Theme }> = ({ theme }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [compFilter, setCompFilter] = useState('All');

    const allRoles = useMemo(() => ['All', ...Array.from(new Set(MOCK_COLLABORATIONS.flatMap(c => c.rolesNeeded)))], []);
    const allComps = ['All', 'Paid', 'Revenue Share', 'For Credit'];
    
    const filteredCollabs = useMemo(() => {
        return MOCK_COLLABORATIONS.slice(1).filter(collab => {
            const matchesSearch = collab.title.toLowerCase().includes(searchTerm.toLowerCase()) || collab.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = roleFilter === 'All' || collab.rolesNeeded.includes(roleFilter);
            const matchesComp = compFilter === 'All' || collab.compensation === compFilter;
            return matchesSearch && matchesRole && matchesComp;
        });
    }, [searchTerm, roleFilter, compFilter]);

    const featuredCollab = MOCK_COLLABORATIONS[0];

    const getCompensationChip = (compensation: string) => {
        switch (compensation) {
            case 'Paid': return <span className="text-xs font-medium bg-green-500/20 text-green-300 px-2 py-1 rounded-full">{compensation}</span>;
            case 'Revenue Share': return <span className="text-xs font-medium bg-sky-500/20 text-sky-300 px-2 py-1 rounded-full">{compensation}</span>;
            case 'For Credit': return <span className="text-xs font-medium bg-gray-500/20 text-gray-300 px-2 py-1 rounded-full">{compensation}</span>;
            default: return null;
        }
    }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
       <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Collaboration Hub</h1>
          <p className="text-gray-400 mt-1">Find other creators to work with on your next big project.</p>
        </div>
        <button onClick={() => console.log('Post collaboration clicked')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2">
            <HandshakeIcon className="w-5 h-5" />
            Post a Collaboration
        </button>
      </div>

      {/* Featured Collaboration */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">Featured Opportunity</h2>
        <div className="bg-gradient-to-r from-indigo-900/50 to-gray-800 p-6 rounded-lg shadow-lg border border-indigo-500/30">
            <div className="flex justify-between items-start">
                <div>
                     <h3 className="text-2xl font-bold text-white">{featuredCollab.title}</h3>
                     <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                        <span>by</span>
                        <img src={featuredCollab.creator.avatarUrl} alt={featuredCollab.creator.name} className="w-6 h-6 rounded-full"/>
                        <span className="font-semibold text-gray-300">{featuredCollab.creator.name}</span>
                    </div>
                </div>
                {getCompensationChip(featuredCollab.compensation)}
            </div>
            <p className="text-sm text-gray-300 mt-4 max-w-2xl">{featuredCollab.description}</p>
            <div className="mt-4 pt-4 border-t border-gray-700/50 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2"><UsersIcon className="w-4 h-4" /> Roles Needed</h4>
                    <div className="flex flex-wrap gap-2">
                        {featuredCollab.rolesNeeded.map(role => (
                            <span key={role} className="bg-gray-700 text-gray-200 text-sm font-medium px-3 py-1 rounded-full">{role}</span>
                        ))}
                    </div>
                </div>
                <button onClick={() => console.log('Express interest clicked')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    Express Interest
                </button>
            </div>
        </div>
      </section>
      
      {/* Filters */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700/50 flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:flex-1">
            <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
            <input 
                type="text" 
                placeholder="Search collaborations..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
        <div className="flex items-center gap-4">
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="bg-gray-700 text-white border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                {allRoles.map(role => <option key={role} value={role}>{role === 'All' ? 'All Roles' : role}</option>)}
            </select>
             <select value={compFilter} onChange={e => setCompFilter(e.target.value)} className="bg-gray-700 text-white border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                {allComps.map(comp => <option key={comp} value={comp}>{comp === 'All' ? 'All Compensation' : comp}</option>)}
            </select>
        </div>
      </div>

      {/* Collaboration Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCollabs.map(collab => (
            <div key={collab.id} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700/50">
                <div className="flex justify-between items-start">
                    <div>
                         <h3 className="text-xl font-bold text-white">{collab.title}</h3>
                         <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                            <span>by</span>
                            <img src={collab.creator.avatarUrl} alt={collab.creator.name} className="w-6 h-6 rounded-full"/>
                            <span className="font-semibold text-gray-300">{collab.creator.name}</span>
                        </div>
                    </div>
                    {getCompensationChip(collab.compensation)}
                </div>
                <p className="text-sm text-gray-300 mt-4">{collab.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2"><UsersIcon className="w-4 h-4" /> Roles Needed</h4>
                    <div className="flex flex-wrap gap-2">
                        {collab.rolesNeeded.map(role => (
                            <span key={role} className="bg-gray-700 text-gray-200 text-sm font-medium px-3 py-1 rounded-full">{role}</span>
                        ))}
                    </div>
                </div>
                 <button onClick={() => console.log('Express interest clicked')} className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition-colors">
                    Express Interest
                </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default CollabHub;
