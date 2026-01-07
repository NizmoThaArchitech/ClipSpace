
import React from 'react';
import type { Theme } from '../App';
import { MOCK_ANALYTICS_CHARTS } from '../constants';
import { UsersIcon } from './icons/UsersIcon';
import { GlobeAltIcon } from './icons/GlobeAltIcon';
import { ChartPieIcon } from './icons/ChartPieIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { DollarIcon } from './icons/DollarIcon';
import { EyeIcon } from './icons/EyeIcon';

const Analytics: React.FC<{ theme: Theme }> = ({ theme }) => {
    const isDark = theme === 'dark';
    const accentColor = isDark ? 'indigo' : 'red';
    
    const ChartPlaceholder: React.FC<{ data: number[], color: string }> = ({ data, color }) => {
        const maxVal = Math.max(...data, 1);
        const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d / maxVal) * 90}`).join(' ');
        const gradientId = `grad-${color}`;

        return (
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <polyline fill={`url(#${gradientId})`} stroke="none" points={`0,100 ${points} 100,100`} />
                <polyline fill="none" stroke={color} strokeWidth="1" points={points} />
            </svg>
        );
    };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Advanced Analytics</h1>
        <p className="text-gray-400 mt-1">Deep dive into your content performance and audience.</p>
      </div>

      {/* Audience Demographics */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><UsersIcon className="w-6 h-6"/> Audience Demographics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700/50">
                <h3 className="font-bold text-lg flex items-center gap-2"><GlobeAltIcon className="w-5 h-5 text-sky-400"/> Top Locations</h3>
                <ul className="mt-4 space-y-2 text-sm">
                    {MOCK_ANALYTICS_CHARTS.locations.map(loc => (
                         <li key={loc.name} className="flex justify-between items-center text-gray-300">
                            <span>{loc.name}</span>
                            <span className="font-semibold text-white">{loc.value}%</span>
                        </li>
                    ))}
                </ul>
            </div>
             <div className="bg-gray-800 p-6 rounded-lg border border-gray-700/50">
                <h3 className="font-bold text-lg flex items-center gap-2"><ChartPieIcon className="w-5 h-5 text-teal-400"/> Age Distribution</h3>
                <div className="h-48 mt-4 flex items-center justify-center text-gray-500">
                    Pie chart placeholder
                </div>
            </div>
             <div className="bg-gray-800 p-6 rounded-lg border border-gray-700/50">
                <h3 className="font-bold text-lg flex items-center gap-2"><TrendingUpIcon className="w-5 h-5 text-green-400"/> Follower Growth</h3>
                <div className="h-48 mt-4">
                     <ChartPlaceholder data={MOCK_ANALYTICS_CHARTS.followerGrowth} color="#34d399" />
                </div>
            </div>
        </div>
      </section>

      {/* Content Performance */}
       <section>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><EyeIcon className="w-6 h-6"/> Content Performance</h2>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700/50">
            <div className="h-64">
                <ChartPlaceholder data={MOCK_ANALYTICS_CHARTS.clipViews} color="#818cf8" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-center">
                <div><p className="text-2xl font-bold">1.2M</p><p className="text-sm text-gray-400">Total Views</p></div>
                <div><p className="text-2xl font-bold">78k</p><p className="text-sm text-gray-400">Total Likes</p></div>
                <div><p className="text-2xl font-bold">12k</p><p className="text-sm text-gray-400">Total Shares</p></div>
                <div><p className="text-2xl font-bold">8.2%</p><p className="text-sm text-gray-400">Engagement Rate</p></div>
            </div>
        </div>
      </section>

        {/* Revenue Analytics */}
        <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><DollarIcon className="w-6 h-6"/> Revenue Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700/50">
                     <h3 className="font-bold text-lg">Monthly Earnings</h3>
                     <div className="h-64 mt-4">
                        <ChartPlaceholder data={MOCK_ANALYTICS_CHARTS.revenue} color="#f472b6" />
                     </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700/50">
                     <h3 className="font-bold text-lg">Revenue by Source</h3>
                      <ul className="mt-4 space-y-4">
                        {MOCK_ANALYTICS_CHARTS.revenueSources.map(source => (
                            <li key={source.name}>
                                <div className="flex justify-between items-center text-sm mb-1">
                                    <span className="text-gray-300">{source.name}</span>
                                    <span className="font-semibold text-white">${source.value.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-pink-500 h-2.5 rounded-full" style={{width: `${source.percent}%`}}></div>
                                </div>
                            </li>
                        ))}
                     </ul>
                </div>
            </div>
        </section>
    </div>
  );
};

export default Analytics;
