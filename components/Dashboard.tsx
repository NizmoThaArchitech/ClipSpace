
import React, { useState } from 'react';
import type { View, Theme } from '../App';
import { MOCK_VIDEO_CLIPS, MOCK_ACTIVITIES, MOCK_USERS, MOCK_GOALS, MOCK_DASHBOARD_MESSAGES } from '../constants';
import { DollarIcon } from './icons/DollarIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { UsersIcon } from './icons/UsersIcon';
import { UploadIcon } from './icons/UploadIcon';
import EndorsementLevelIcon from './icons/EndorsementLevelIcon';
import { CameraIcon } from './icons/CameraIcon';
import { StarIcon } from './icons/StarIcon';
import { MessageIcon } from './icons/MessageIcon';
import { HeartIcon } from './icons/HeartIcon';
import { MapIcon } from './icons/MapIcon';
import { FlagIcon } from './icons/FlagIcon';

interface DashboardProps {
  theme: Theme;
  setCurrentView: (view: View) => void;
}

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, change: string }> = ({ icon, label, value, change }) => (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700/50">
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-400">{label}</p>
            {icon}
        </div>
        <div className="mt-2">
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className={`text-sm font-semibold ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{change}</p>
        </div>
    </div>
);

const ChartPlaceholder: React.FC<{ data: number[], theme: Theme }> = ({ data, theme }) => {
    const maxVal = Math.max(...data, 1);
    const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d / maxVal) * 90}`).join(' ');
    const isDark = theme === 'dark';
    const gradientColor = isDark ? '#4f46e5' : '#ef4444';
    const lineColor = isDark ? '#818cf8' : '#f87171';

    return (
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={gradientColor} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={gradientColor} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polyline fill="url(#chartGradient)" stroke="none" points={`0,100 ${points} 100,100`} />
            <polyline fill="none" stroke={lineColor} strokeWidth="1" points={points} />
        </svg>
    );
};

const GoalsWidget: React.FC = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700/50">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><FlagIcon className="w-5 h-5 text-indigo-400" /> My Goals</h3>
        <ul className="space-y-4">
            {MOCK_GOALS.map(goal => {
                const progress = Math.min(100, (goal.currentValue / goal.targetValue) * 100);
                return (
                    <li key={goal.id}>
                        <div className="flex justify-between items-baseline mb-1">
                            <p className="text-sm font-semibold text-gray-300">{goal.title}</p>
                            <p className="text-xs text-gray-400">{goal.currentValue.toLocaleString()} / {goal.targetValue.toLocaleString()}</p>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-indigo-600 h-2 rounded-full" style={{width: `${progress}%`}}></div>
                        </div>
                    </li>
                )
            })}
        </ul>
    </div>
);

const AudienceMapWidget: React.FC = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700/50">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><MapIcon className="w-5 h-5 text-sky-400" /> Audience Growth</h3>
        <div className="aspect-video bg-gray-900/50 rounded-lg p-4 flex items-center justify-center">
            <p className="text-gray-600">World map visualization placeholder</p>
        </div>
    </div>
);

const MessagesSnippetWidget: React.FC = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700/50">
      <h3 className="text-lg font-bold mb-4">Recent Messages</h3>
      <ul className="space-y-3">
        {MOCK_DASHBOARD_MESSAGES.map(msg => (
            <li key={msg.id} className="flex items-center gap-3 hover:bg-gray-700/50 p-2 -m-2 rounded-md transition-colors cursor-pointer">
                <div className="relative">
                    <img src={msg.user.avatarUrl} alt={msg.user.name} className="w-10 h-10 rounded-full"/>
                    {msg.unread && <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-gray-800 bg-indigo-500"></span>}
                </div>
                <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${msg.unread ? 'text-white' : 'text-gray-300'}`}>{msg.user.name}</p>
                    <p className={`text-xs truncate ${msg.unread ? 'text-gray-300' : 'text-gray-400'}`}>{msg.text}</p>
                </div>
                <span className="text-xs text-gray-500 ml-auto flex-shrink-0">{msg.time}</span>
            </li>
        ))}
      </ul>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ theme, setCurrentView }) => {
  const [chartTab, setChartTab] = useState<'Revenue' | 'Views' | 'Sales'>('Revenue');
  const [chartPeriod, setChartPeriod] = useState('30d');
  
  const chartData = {
    Revenue: [30, 40, 25, 50, 49, 60, 70, 91, 125, 100, 140, 130],
    Views: [1200, 1500, 1100, 1800, 1700, 2200, 2500, 3000, 2800, 3200, 3100, 3500],
    Sales: [5, 7, 4, 9, 8, 11, 13, 15, 12, 18, 16, 20],
  };

  const activityIcons = {
    sale: <DollarIcon className="w-5 h-5 text-green-400"/>,
    upload: <CameraIcon className="w-5 h-5 text-sky-400"/>,
    like: <HeartIcon className="w-5 h-5 text-pink-400"/>,
    milestone: <StarIcon className="w-5 h-5 text-yellow-400"/>,
    comment: <MessageIcon className="w-5 h-5 text-indigo-400"/>,
    follow: <UsersIcon className="w-5 h-5 text-cyan-400"/>,
  };
  
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-900 text-white min-h-full">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Jane!</h1>
            <p className="text-gray-400 mt-1">Here's your performance summary for this month.</p>
          </div>
          <button 
            onClick={() => setCurrentView('upload')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <UploadIcon className="w-5 h-5" />
            Upload New Clip
          </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<DollarIcon className="w-6 h-6 text-green-400"/>} label="Monthly Earnings" value="$849.50" change="+5.2%"/>
        <StatCard icon={<TrendingUpIcon className="w-6 h-6 text-sky-400"/>} label="Total Views" value="48.7k" change="+12.8%"/>
        <StatCard icon={<UsersIcon className="w-6 h-6 text-cyan-400"/>} label="New Followers" value="+82" change="+22%"/>
        <StatCard icon={<CameraIcon className="w-6 h-6 text-pink-400"/>} label="Clip Sales" value="42" change="+8%"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700/50">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Performance Overview</h2>
              <p className="text-sm text-gray-400">Track your growth over time.</p>
            </div>
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
                {['Revenue', 'Views', 'Sales'].map((tab) => (
                    <button key={tab} onClick={() => setChartTab(tab as any)} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${chartTab === tab ? 'bg-indigo-600 text-white' : 'bg-gray-700/50 hover:bg-gray-700'}`}>
                        {tab}
                    </button>
                ))}
            </div>
          </div>
          <div className="h-80 relative">
             <ChartPlaceholder data={chartData[chartTab]} theme={theme as 'dark' | 'light'} />
             <div className="absolute top-0 right-0">
                <select value={chartPeriod} onChange={(e) => setChartPeriod(e.target.value)} className="bg-gray-700/50 text-white border-none rounded-md px-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                </select>
             </div>
          </div>
        </div>

        <div className="space-y-8">
            <GoalsWidget />
            <MessagesSnippetWidget />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <AudienceMapWidget />
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700/50">
          <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            {MOCK_ACTIVITIES.slice(0,4).map(act => (
                <li key={act.id} className="flex items-center gap-3">
                    <div className="flex-shrink-0">{activityIcons[act.type as keyof typeof activityIcons]}</div>
                    <p className="text-sm text-gray-300"><span className="font-bold text-white">{act.user}</span> {act.description}</p>
                    <span className="text-xs text-gray-500 ml-auto flex-shrink-0">{act.time}</span>
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
