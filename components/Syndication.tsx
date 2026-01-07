
import React, { useState, useEffect } from 'react';
import type { Theme } from '../App';
import { MOCK_VIDEO_CLIPS } from '../constants';
import { ShareIcon } from './icons/ShareIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { GlobeAltIcon } from './icons/GlobeAltIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';

const Syndication: React.FC<{ theme: Theme }> = ({ theme }) => {
    const [selectedClip, setSelectedClip] = useState<any | null>(null);
    const [isSyndicating, setIsSyndicating] = useState(false);
    const [tickerItems, setTickerItems] = useState([
        "New York Node: Assets transmitted successfully (99.8% quality)",
        "London Node: Ready for localized distribution",
        "Tokyo Node: AI Reframe processing (Aspect Ratio 9:16)",
        "Sydney Node: Optimizing bitrate for regional delivery"
    ]);

    const platforms = [
        { name: 'YouTube', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png', color: 'bg-red-600' },
        { name: 'TikTok', icon: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg', color: 'bg-black' },
        { name: 'Instagram', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg', color: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600' },
        { name: 'Twitter', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png', color: 'bg-gray-900' },
    ];

    const handleSyndicate = () => {
        setIsSyndicating(true);
        setTimeout(() => setIsSyndicating(false), 4000);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-gray-900 min-h-full">
            {/* Immersive Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Syndication <span className="text-indigo-500">Command</span></h1>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">V 4.0.1 Stable</span>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Multi-Channel Asset Deployment Gateway</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="bg-gray-800/40 backdrop-blur-md p-4 rounded-2xl border border-gray-700/50 flex items-center gap-4 shadow-xl">
                        <div className="text-right">
                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">Global Bandwidth</p>
                            <p className="text-xl font-black text-green-400 tracking-tighter">1.2 Gbps</p>
                        </div>
                        <GlobeAltIcon className="w-8 h-8 text-indigo-500 opacity-50 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Distribution Map Ticker */}
            <div className="bg-gray-950 border-y border-gray-800 py-2 overflow-hidden whitespace-nowrap relative">
                <div className="flex gap-12 animate-marquee text-[10px] font-black uppercase text-indigo-400/60">
                    {tickerItems.map((item, i) => <span key={i}>{item} •</span>)}
                    {tickerItems.map((item, i) => <span key={i + 10}>{item} •</span>)}
                </div>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* 1. Source Content (Left 3 columns) */}
                <div className="xl:col-span-3 space-y-6">
                    <div className="bg-gray-800/40 p-6 rounded-3xl border border-gray-700/50 shadow-2xl backdrop-blur-sm">
                        <h2 className="text-xs font-black text-gray-500 mb-6 uppercase tracking-widest border-b border-gray-700/50 pb-4">01 // SELECT SOURCE ASSET</h2>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto no-scrollbar pr-2">
                            {MOCK_VIDEO_CLIPS.map(clip => (
                                <button 
                                    key={clip.id} 
                                    onClick={() => setSelectedClip(clip)} 
                                    className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl border-2 transition-all group ${selectedClip?.id === clip.id ? 'bg-indigo-500/10 border-indigo-500 shadow-xl' : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'}`}
                                >
                                    <div className="relative w-20 h-12 rounded-xl overflow-hidden flex-shrink-0">
                                        <img src={clip.thumbnailUrl} alt={clip.title} className="w-full h-full object-cover"/>
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-all"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-black text-white truncate text-[11px] uppercase tracking-tighter">{clip.title}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[8px] bg-gray-800 text-gray-500 px-1 py-0.5 rounded font-black uppercase">{clip.resolution}</span>
                                            <span className="text-[8px] text-indigo-400 font-black uppercase">{clip.duration}S</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Visual Terminal (Middle 6 columns) */}
                <div className="xl:col-span-6 space-y-8">
                    <div className="bg-gray-950 rounded-[2.5rem] border border-gray-800 shadow-2xl overflow-hidden relative min-h-[400px] flex items-center justify-center">
                        {/* Futuristic Grid Background */}
                        <div className="absolute inset-0 bg-[radial-gradient(#1e1e2e_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
                        
                        <div className="relative z-10 w-full h-full p-8 flex flex-col">
                             <div className="flex justify-between items-center mb-8">
                                 <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Neural Visualization Protocol</h2>
                                 <div className="flex gap-2">
                                     <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                     <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse delay-75"></div>
                                     <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse delay-150"></div>
                                 </div>
                             </div>

                             {selectedClip ? (
                                 <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                                     {/* Map Graphic with Pings */}
                                     <div className="relative w-full max-w-lg aspect-[2/1] opacity-50">
                                         <svg viewBox="0 0 1000 500" className="w-full h-full fill-indigo-500/20">
                                             <path d="M100,200 Q300,100 500,200 T900,200" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" className="text-indigo-500/30" />
                                             <circle cx="200" cy="150" r="4" className="fill-indigo-500 animate-ping" />
                                             <circle cx="500" cy="250" r="4" className="fill-indigo-500 animate-ping delay-500" />
                                             <circle cx="800" cy="180" r="4" className="fill-indigo-500 animate-ping delay-1000" />
                                         </svg>
                                     </div>
                                     <div className="text-center">
                                         <p className="text-2xl font-black text-white tracking-tighter uppercase">Distribution Mesh Active</p>
                                         <p className="text-indigo-400 text-xs font-bold uppercase mt-2">Ready to transmit: {selectedClip.title}</p>
                                     </div>
                                 </div>
                             ) : (
                                 <div className="flex-1 flex flex-col items-center justify-center text-center">
                                     <GlobeAltIcon className="w-20 h-20 text-gray-800 mb-6" />
                                     <p className="text-gray-600 font-black uppercase text-sm tracking-widest">Awaiting Source Input</p>
                                     <p className="text-gray-700 text-[10px] mt-2 uppercase font-bold">Select a content asset from the source library</p>
                                 </div>
                             )}
                        </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className={`transition-all duration-700 ${selectedClip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                        <button 
                            onClick={handleSyndicate}
                            disabled={isSyndicating}
                            className="w-full py-8 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-3xl transition-all shadow-[0_20px_50px_rgba(79,70,229,0.3)] flex items-center justify-center gap-6 uppercase tracking-[0.2em] text-sm group"
                        >
                            {isSyndicating ? (
                                <>
                                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                    TRANSMITTING DATA PACKETS...
                                </>
                            ) : (
                                <>
                                    <ShareIcon className="w-6 h-6 group-hover:scale-125 transition-transform"/>
                                    EXECUTE GLOBAL SYNDICATION
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* 3. Deployment Config (Right 3 columns) */}
                <div className="xl:col-span-3 space-y-6">
                    <div className="bg-gray-800/40 p-6 rounded-3xl border border-gray-700/50 shadow-2xl backdrop-blur-sm">
                        <h2 className="text-xs font-black text-gray-500 mb-6 uppercase tracking-widest border-b border-gray-700/50 pb-4">02 // DEPLOYMENT CONFIG</h2>
                        
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Target Platforms</h3>
                                <div className="space-y-2">
                                    {platforms.map(p => (
                                        <div key={p.name} className="flex items-center gap-3 p-3 bg-gray-900/60 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-all cursor-pointer">
                                            <div className={`w-6 h-6 rounded-md ${p.color} p-1 flex items-center justify-center overflow-hidden`}>
                                                <img src={p.icon} alt={p.name} className="w-full h-full object-contain brightness-0 invert" />
                                            </div>
                                            <span className="text-[11px] font-black text-gray-300 uppercase tracking-tight">{p.name}</span>
                                            <input type="checkbox" defaultChecked className="ml-auto rounded-full bg-gray-800 border-gray-700 text-indigo-500 focus:ring-0" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-700/30">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Neural Transformation</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center justify-between p-4 bg-gray-950 rounded-xl border border-gray-800 cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <SparklesIcon className="w-4 h-4 text-indigo-500" />
                                            <p className="text-[10px] font-black text-white uppercase tracking-tighter">Smart Reframe 9:16</p>
                                        </div>
                                        <input type="checkbox" defaultChecked className="toggle-checkbox" />
                                    </label>
                                    <label className="flex items-center justify-between p-4 bg-gray-950 rounded-xl border border-gray-800 cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <TrendingUpIcon className="w-4 h-4 text-green-500" />
                                            <p className="text-[10px] font-black text-white uppercase tracking-tighter">SEO Optimization</p>
                                        </div>
                                        <input type="checkbox" className="toggle-checkbox" />
                                    </label>
                                </div>
                            </div>

                            <div className="bg-indigo-950/20 p-6 rounded-2xl border border-indigo-500/20">
                                <div className="flex justify-between items-end mb-4">
                                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Reach Predictor</p>
                                    <span className="text-xl font-black text-white tracking-tighter">842K+</span>
                                </div>
                                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-[78%] animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
             <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .toggle-checkbox {
                    appearance: none;
                    width: 36px;
                    height: 20px;
                    background-color: #1f2937;
                    border-radius: 9999px;
                    position: relative;
                    cursor: pointer;
                    transition: background-color 0.2s ease-in-out;
                    border: 1px solid #374151;
                }
                .toggle-checkbox::before {
                    content: '';
                    width: 14px;
                    height: 14px;
                    background-color: #9ca3af;
                    border-radius: 9999px;
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    transition: all 0.2s ease-in-out;
                }
                .toggle-checkbox:checked {
                    background-color: #4f46e5;
                    border-color: #818cf8;
                }
                .toggle-checkbox:checked::before {
                    transform: translateX(16px);
                    background-color: white;
                }
            `}</style>
        </div>
    );
};

export default Syndication;
