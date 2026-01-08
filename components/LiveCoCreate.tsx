
import React, { useEffect, useRef, useState } from 'react';
import { CameraIcon } from './icons/CameraIcon'; 

import type { Theme, ShowReminder } from '../App';
import type { User } from '../types';
import { MOCK_USERS, MOCK_VIDEO_CLIPS } from '../constants';
import { LayoutSpeakerIcon } from './icons/LayoutSpeakerIcon';
import { VolumeIcon } from './icons/VolumeIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { TeleprompterIcon } from './icons/TeleprompterIcon';
import { MicOffIcon } from './icons/MicOffIcon';
import { BellAlertIcon } from './icons/UserIcon';

import { MediaPlayerIcon } from './icons/MediaPlayerIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { UserSwitchIcon } from './icons/UserSwitchIcon';
import { WaveformIcon } from './icons/WaveformIcon';
import { PlusIcon } from './icons/PlusIcon';
import { GlobeAltIcon } from './icons/GlobeAltIcon';
import { SearchIcon } from './icons/SearchIcon';
import { MusicalNoteIcon } from './icons/MusicalNoteIcon';
import { EyeIcon } from './icons/EyeIcon';
import { UsersIcon } from './icons/UsersIcon';

const MOCK_PARTICIPANTS: User[] = [
    { ...MOCK_USERS.jane_creator, role: 'Host', isHost: true },
    { ...MOCK_USERS.pixelperfect, role: 'Director', isHost: false },
    { ...MOCK_USERS.aerovisions, role: 'Producer' },
    { ...MOCK_USERS.storyweaver, role: 'Editor' },
    { ...MOCK_USERS.urbanflow, role: 'Broadcast Engineer' },
    { ...MOCK_USERS.techtrends, role: 'Assistant' },
    { ...MOCK_USERS.naturelens, role: 'Guest' },
];

const MOCK_PODCAST_CHANNELS = [
    { 
        id: 'pc1', 
        name: 'Tech Aloud', 
        creator: MOCK_USERS.techtrends, 
        isLive: true, 
        thumbnailUrl: 'https://picsum.photos/seed/pc1/400/300',
        segments: [
            { title: 'Morning Roast', start: '08:00 AM', date: 'Oct 24', viewers: '12K', listeners: '4.2K', duration: '60m' },
            { title: 'AI Deep Dive', start: '09:00 AM', date: 'Oct 24', viewers: '45K', listeners: '18K', duration: '90m' },
            { title: 'Gadget Lab', start: '10:30 AM', date: 'Oct 24', viewers: '8K', listeners: '2K', duration: '45m' }
        ]
    },
    { 
        id: 'pc2', 
        name: 'Drone Downlow', 
        creator: MOCK_USERS.aerovisions, 
        isLive: false, 
        thumbnailUrl: 'https://picsum.photos/seed/pc2/400/300',
        segments: [
            { title: 'FPV Racing', start: '08:00 AM', date: 'Oct 24', viewers: '15K', listeners: '3K', duration: '120m' },
            { title: 'Gimbal Tech', start: '10:00 AM', date: 'Oct 24', viewers: '5K', listeners: '1K', duration: '30m' }
        ]
    },
    { 
        id: 'pc3', 
        name: 'Color Theory', 
        creator: MOCK_USERS.pixelperfect, 
        isLive: false, 
        thumbnailUrl: 'https://picsum.photos/seed/pc3/400/300',
        segments: [
            { title: 'LUT Creation', start: '08:00 AM', date: 'Oct 24', viewers: '22K', listeners: '9K', duration: '180m' }
        ]
    },
];

const PROMPTER_TEXT = [
    "Welcome to the Global Creator Summit Live broadcast.",
    "Tonight we're discussing the future of AI-driven cinematic B-roll.",
    "Transitioning to Guest feed in T-minus 10 seconds...",
    "Remember to thank our sponsors: ClipSpace Pro and AeroVisions.",
    "Host: Keep an eye on the chat for trending questions.",
    "Director: Audio levels on Mic 2 peaking, please adjust.",
    "Coming up next: The Instant B-Roll Exchange deep dive.",
];

const AudioVisualizer: React.FC<{ isPlaying: boolean, color?: string }> = ({ isPlaying, color = 'bg-indigo-500' }) => {
    const [heights, setHeights] = useState(Array(8).fill(10));
    useEffect(() => {
        let int: number;
        if (isPlaying) {
            int = window.setInterval(() => setHeights(prev => prev.map(() => Math.random() * 80 + 20)), 80);
        } else {
            setHeights(Array(8).fill(10));
        }
        return () => window.clearInterval(int);
    }, [isPlaying]);

    return (
        <div className="flex items-end gap-0.5 h-3 w-10 overflow-hidden">
            {heights.map((h, i) => (
                <div key={i} className={`w-0.5 ${color} rounded-full transition-all duration-75`} style={{ height: `${h}%` }}></div>
            ))}
        </div>
    );
};

const SourceMonitor: React.FC<{ user: User; label: string; active?: boolean; preview?: boolean }> = ({ user, label, active, preview }) => (
    <div className={`relative aspect-video bg-black rounded-lg overflow-hidden border-2 ${active ? 'border-red-600 ring-2 ring-red-600/20' : preview ? 'border-green-500' : 'border-gray-800'}`}>
        <img src={`https://picsum.photos/seed/${user.id}_uhd/1920/1080`} className={`w-full h-full object-cover transition-all duration-500 ${active ? 'brightness-110' : 'brightness-[0.3] grayscale'}`} />
        <div className="absolute top-2 left-2 flex items-center gap-1.5">
            <div className={`text-[8px] font-black px-2 py-0.5 rounded uppercase text-white ${active ? 'bg-red-600' : preview ? 'bg-green-500' : 'bg-gray-800/80'}`}>
                {label} <span className="ml-1 opacity-50 tracking-widest text-[7px]">UHD</span>
            </div>
        </div>
    </div>
);

const AITeleprompter: React.FC = () => {
    const [lineIndex, setLineIndex] = useState(0);
    const [isAutoScroll, setIsAutoScroll] = useState(true);

    useEffect(() => {
        let interval: number;
        if (isAutoScroll) {
            interval = window.setInterval(() => {
                setLineIndex(prev => (prev + 1) % PROMPTER_TEXT.length);
            }, 4000);
        }
        return () => window.clearInterval(interval);
    }, [isAutoScroll]);

    return (
        <div className="w-full bg-[#08080c] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group border-b-indigo-500/20">
            <div className="absolute top-4 left-6 flex items-center gap-3">
                <TeleprompterIcon className="w-5 h-5 text-indigo-500 animate-pulse" />
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">AI Prompter Node // Live Scripting</span>
            </div>
            <div className="absolute top-4 right-6 flex items-center gap-4">
                <button onClick={() => setIsAutoScroll(!isAutoScroll)} className={`text-[9px] font-black px-3 py-1 rounded-full border transition-all ${isAutoScroll ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30' : 'text-gray-600 border-gray-800'}`}>
                    {isAutoScroll ? 'AUTO-PROMPT' : 'MANUAL'}
                </button>
            </div>
            
            <div className="mt-8 flex flex-col items-center justify-center min-h-[140px] text-center">
                <p className="text-gray-600 text-sm font-bold uppercase tracking-widest opacity-20 transition-all duration-1000 transform translate-y-2">
                    {PROMPTER_TEXT[(lineIndex - 1 + PROMPTER_TEXT.length) % PROMPTER_TEXT.length]}
                </p>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic my-6 leading-none transition-all duration-700 transform scale-105 shadow-indigo-500/10 text-shadow-glow">
                    "{PROMPTER_TEXT[lineIndex]}"
                </h3>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest opacity-30 transition-all duration-1000 transform -translate-y-2">
                    {PROMPTER_TEXT[(lineIndex + 1) % PROMPTER_TEXT.length]}
                </p>
            </div>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-indigo-500/5 -translate-y-1/2"></div>
        </div>
    );
};

const LiveCoCreate: React.FC<{ theme: Theme, setReminder: (reminder: ShowReminder) => void }> = ({ theme: _theme, setReminder: _setReminder }) => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [activeCamera, setActiveCamera] = useState(0);
  const [previewCamera, setPreviewCamera] = useState(1);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showStreamSettings, setShowStreamSettings] = useState(true);
  const [showViewingSettings, setShowViewingSettings] = useState(true);
  const [activeStudioTool, setActiveStudioTool] = useState<'switcher' | 'soundboard' | 'meeting'>('switcher');

  const startSession = async () => {
    setIsConnecting(true);
    setTimeout(() => {
        setIsSessionActive(true);
        setIsConnecting(false);
    }, 1200);
  };

  useEffect(() => {
      let interval: number;
      if (isAutoScrolling && scrollRef.current) {
          interval = window.setInterval(() => {
              if (scrollRef.current) {
                  scrollRef.current.scrollLeft += 0.8;
                  if (scrollRef.current.scrollLeft >= (scrollRef.current.scrollWidth / 2)) scrollRef.current.scrollLeft = 0;
              }
          }, 40);
      }
      return () => window.clearInterval(interval);
  }, [isAutoScrolling]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-12 bg-[#050508] min-h-full relative overflow-x-hidden select-none">
      
      {/* Dynamic Style for Grid Scrollbars */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0c0c14; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #312e81; border-radius: 10px; border: 2px solid #0c0c14; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4338ca; }
        .text-shadow-glow { text-shadow: 0 0 20px rgba(99, 102, 241, 0.4); }
        .vertical-text { writing-mode: vertical-lr; transform: rotate(180deg); }
      `}</style>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/5 pb-8">
        <div className="space-y-1">
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-600/30">
                    <LayoutSpeakerIcon className="w-8 h-8 text-white"/>
                </div>
                Studio <span className="text-indigo-500">Master</span> Terminal
            </h1>
            <div className="flex items-center gap-4 pl-16">
                <span className="flex h-2 w-2"><span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                <p className="text-gray-600 font-black uppercase tracking-[0.4em] text-[9px]">Node 729-ALPHA // Production Mesh V8</p>
            </div>
        </div>
        {!isSessionActive ? (
            <button onClick={startSession} disabled={isConnecting} className="bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 px-12 rounded-2xl transition-all shadow-[0_0_40px_rgba(79,70,229,0.3)] flex items-center gap-4 uppercase text-xs tracking-[0.3em] active:scale-95 border border-white/10">
                {isConnecting ? "Authenticating..." : "Initialize Stage"}
            </button>
        ) : (
            <button onClick={() => setIsSessionActive(false)} className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white font-black px-8 py-3 rounded-2xl shadow-xl uppercase text-[10px] tracking-widest transition-all">Emergency Termination</button>
        )}
      </div>

      {isSessionActive && (
          <div className="animate-fadeIn space-y-12">
              
              {/* TOP ROW: MONITORING */}
              <div className="grid grid-cols-12 gap-8 items-start">
                  <div className="col-span-3 space-y-4 h-[600px] overflow-y-auto custom-scrollbar pr-3">
                       <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] pl-1 italic border-l-2 border-indigo-600 mb-6">Source Matrix</h3>
                       {MOCK_PARTICIPANTS.map((p, i) => (
                           <div key={i} className="group relative">
                               <SourceMonitor user={p} label={`CAM ${i+1}`} active={activeCamera === i} preview={previewCamera === i} />
                               <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                    <button onClick={() => setActiveCamera(i)} className="p-1.5 bg-red-600 text-white rounded text-[8px] font-black uppercase">Cut</button>
                                    <button onClick={() => setPreviewCamera(i)} className="p-1.5 bg-green-600 text-white rounded text-[8px] font-black uppercase">PVW</button>
                               </div>
                           </div>
                       ))}
                       <button className="w-full aspect-video bg-gray-900/40 rounded-lg border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-gray-700 hover:text-indigo-400 transition-colors">
                           <PlusIcon className="w-8 h-8" />
                           <span className="text-[8px] font-black mt-2 tracking-widest">REMOTE LINK</span>
                       </button>
                  </div>

                  <div className="col-span-6">
                      <div className="bg-black rounded-[3rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group h-[600px]">
                           <img src={`https://picsum.photos/seed/${MOCK_PARTICIPANTS[activeCamera].id}_pgm_uhd/1920/1080`} className="w-full h-full object-cover brightness-110" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                           <div className="absolute top-10 left-10 flex flex-col gap-2">
                                <div className="bg-red-600 text-white font-black px-6 py-2 rounded-xl text-xs animate-pulse tracking-[0.3em] uppercase shadow-2xl">On Air</div>
                                <div className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1 italic">Master PGM Output</div>
                           </div>
                           <div className="absolute top-10 right-10 w-48 aspect-video bg-[#050505] border-2 border-green-500/50 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-110 transition-transform duration-700">
                                <img src={`https://picsum.photos/seed/${MOCK_PARTICIPANTS[previewCamera].id}_pvw_uhd/1920/1080`} className="w-full h-full object-cover grayscale opacity-60" />
                                <div className="absolute top-2 left-2 bg-green-600 text-white text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest">PREVIEW</div>
                           </div>
                           <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                                <div>
                                    <h4 className="text-3xl font-black text-white uppercase tracking-tighter italic">CSpace Syndication Alpha</h4>
                                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Resolution: 3840x2160 @ 60FPS // Bitrate: 45 Mbps</p>
                                </div>
                                <div className="flex gap-1 items-end h-16">
                                     {Array.from({length: 20}).map((_, i) => <div key={i} className="w-[2px] bg-red-600/40 rounded-full" style={{ height: `${Math.random() * 80 + 20}%` }}></div>)}
                                </div>
                           </div>
                      </div>
                  </div>

                  <div className="col-span-3 space-y-6 flex flex-col h-[600px]">
                      <div className="bg-[#0c0c14] border border-white/5 rounded-[2.5rem] p-6 shadow-2xl flex-1 flex flex-col border-b-indigo-500/10">
                           <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-6 italic flex items-center gap-3"><VolumeIcon className="w-4 h-4" /> Audio Console</h3>
                           <div className="flex-1 flex gap-4 overflow-x-auto no-scrollbar pb-2 px-2">
                               {['Mic 1', 'Host', 'Ambience', 'SFX'].map(ch => (
                                   <div key={ch} className="flex-1 flex flex-col items-center gap-4">
                                       <div className="flex-1 w-2.5 bg-black rounded-full relative flex items-end border border-white/5">
                                            <div className="w-full rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ height: `${Math.random() * 80 + 10}%` }}></div>
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-5 h-8 bg-gray-800 rounded-md border border-white/10 cursor-ns-resize shadow-xl"></div>
                                       </div>
                                       <span className="text-[8px] font-black text-gray-600 uppercase vertical-text h-12 tracking-widest">{ch}</span>
                                   </div>
                               ))}
                           </div>
                      </div>
                      <div className="bg-gray-900/60 border border-white/5 rounded-[2.5rem] p-6 backdrop-blur-3xl shadow-2xl flex-1 flex flex-col">
                           <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] italic mb-6">Staff Connectivity</h3>
                           <div className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pr-2">
                               {MOCK_PARTICIPANTS.slice(1, 5).map(p => (
                                   <div key={p.id} className="flex items-center justify-between group p-2 hover:bg-white/[0.03] rounded-xl transition-all">
                                       <div className="flex items-center gap-3">
                                            <img src={p.avatarUrl} className="w-10 h-10 rounded-xl border border-white/10 grayscale group-hover:grayscale-0" />
                                            <div><p className="text-[11px] font-black text-white uppercase">{p.name}</p><p className="text-[8px] text-indigo-500/60 font-bold">{p.role}</p></div>
                                       </div>
                                       <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                   </div>
                               ))}
                           </div>
                      </div>
                  </div>
              </div>

              {/* SEPARATOR */}
              <div className="relative h-px w-full bg-white/[0.05]">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 bg-[#050508] text-gray-800 text-[8px] font-black uppercase tracking-[1em]">Production Protocol Barrier Alpha-2</div>
              </div>

              {/* CENTER PRODUCTION TOOLS: TELEPROMPTER & BUS SELECTOR */}
              <div className="space-y-8">
                  <AITeleprompter />
                  
                  {/* FEATURE DOTS */}
                  <div className="flex justify-center gap-6 mb-2">
                      {['switcher', 'soundboard', 'meeting'].map((tool) => (
                        <button 
                            key={tool}
                            onClick={() => setActiveStudioTool(tool as 'switcher' | 'soundboard' | 'meeting')}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${activeStudioTool === tool ? 'bg-indigo-500 ring-4 ring-indigo-500/20 scale-125' : 'bg-gray-800 hover:bg-gray-700'}`}
                        />
                      ))}
                  </div>

                  <div className="flex gap-4 items-stretch h-[260px]">
                       {/* WING: STREAMING */}
                       <div className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${showStreamSettings ? 'w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
                            <div className="h-full bg-[#0c0c14] border border-white/5 rounded-[2.5rem] p-6 flex flex-col justify-between shadow-2xl">
                                 <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Streaming Node</p>
                                 <div className="space-y-4">
                                      <div className="bg-black/60 p-3 rounded-2xl border border-white/5 flex justify-between items-center"><p className="text-[8px] text-gray-500 font-black">BITRATE</p><p className="text-xs text-white font-black">48 MBPS</p></div>
                                      <div className="bg-black/60 p-3 rounded-2xl border border-white/5 flex justify-between items-center"><p className="text-[8px] text-gray-500 font-black">LATENCY</p><p className="text-xs text-green-400 font-black">24 MS</p></div>
                                 </div>
                                 <button className="w-full py-4 bg-red-600 text-white text-[10px] font-black uppercase rounded-2xl animate-pulse shadow-lg tracking-widest mt-6">COMMENCE STREAM</button>
                            </div>
                       </div>

                       {/* THINNER BUS SELECTOR */}
                       <div className="flex-1 bg-[#0c0c14] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative flex flex-col justify-center border-t-indigo-500/20">
                            <div className="flex justify-between items-center mb-8">
                                <button onClick={() => setShowStreamSettings(!showStreamSettings)} className={`p-2.5 rounded-2xl border transition-all ${showStreamSettings ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-gray-800 border-gray-700 text-gray-500'}`}><WaveformIcon className="w-5 h-5" /></button>
                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.6em] italic">{activeStudioTool.toUpperCase()} // MASTER INTERFACE</span>
                                <button onClick={() => setShowViewingSettings(!showViewingSettings)} className={`p-2.5 rounded-2xl border transition-all ${showViewingSettings ? 'bg-green-600 border-green-400 text-white' : 'bg-gray-800 border-gray-700 text-gray-500'}`}><MediaPlayerIcon className="w-5 h-5" /></button>
                            </div>

                            {activeStudioTool === 'switcher' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 items-center">
                                        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">PGM</span>
                                        <div className="grid grid-cols-7 gap-3">{MOCK_PARTICIPANTS.map((_, i) => <button key={i} onClick={() => setActiveCamera(i)} className={`h-12 rounded-xl border-2 font-black transition-all ${activeCamera === i ? 'bg-red-600 border-red-400 text-white shadow-xl scale-95' : 'bg-gray-950 border-gray-800 text-gray-600'}`}>{i+1}</button>)}</div>
                                        <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">PVW</span>
                                        <div className="grid grid-cols-7 gap-3">{MOCK_PARTICIPANTS.map((_, i) => <button key={i} onClick={() => setPreviewCamera(i)} className={`h-10 rounded-xl border-2 font-black transition-all ${previewCamera === i ? 'bg-green-600 border-green-400 text-white shadow-xl' : 'bg-gray-950 border-gray-900 text-gray-700'}`}>{i+1}</button>)}</div>
                                    </div>
                                    <div className="flex gap-4 pt-6 border-t border-white/5"><button onClick={() => { const oldP = activeCamera; setActiveCamera(previewCamera); setPreviewCamera(oldP); }} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs shadow-2xl tracking-[0.2em] transition-all active:scale-95">Auto Dissolve (1.0s)</button><button className="flex-1 py-4 bg-black border border-gray-800 text-gray-700 rounded-2xl font-black uppercase text-xs">Fade to Black</button></div>
                                </div>
                            )}

                            {activeStudioTool === 'soundboard' && (
                                <div className="grid grid-cols-4 gap-4 animate-fadeIn">
                                    {['Applause', 'Laughter', 'Air Horn', 'Buzzer', 'Transition', 'Silence', 'Epic Brass', 'Drumroll'].map(s => (
                                        <button key={s} className="bg-gray-800/40 border border-gray-700 hover:border-indigo-500 p-5 rounded-2xl transition-all group flex flex-col items-center">
                                            <MusicalNoteIcon className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform mb-2" />
                                            <span className="text-[9px] font-black text-white uppercase tracking-tighter">{s}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {activeStudioTool === 'meeting' && (
                                <div className="grid grid-cols-3 gap-6 animate-fadeIn">
                                    {[
                                        {title: 'Force Mute', icon: <MicOffIcon className="w-6 h-6"/>},
                                        {title: 'Poll Station', icon: <SparklesIcon className="w-6 h-6"/>},
                                        {title: 'Hand Stack', icon: <UserSwitchIcon className="w-6 h-6"/>},
                                        {title: 'Asset Deck', icon: <DocumentTextIcon className="w-6 h-6"/>},
                                        {title: 'Attendance', icon: <GlobeAltIcon className="w-6 h-6"/>},
                                        {title: 'Breakout', icon: <LayoutSpeakerIcon className="w-6 h-6"/>}
                                    ].map(tool => (
                                        <button key={tool.title} className="bg-gray-800 p-6 rounded-3xl border border-gray-700 hover:border-green-500 transition-all flex items-center gap-4">
                                            <div className="p-3 bg-gray-900 rounded-2xl text-gray-500">{tool.icon}</div>
                                            <span className="text-xs font-black text-white uppercase text-left">{tool.title}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                       </div>

                       {/* WING: CONSUMPTION */}
                       <div className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${showViewingSettings ? 'w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
                            <div className="h-full bg-[#0c0c14] border border-white/5 rounded-[2.5rem] p-6 flex flex-col justify-between shadow-2xl">
                                 <p className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-4">Audience Node</p>
                                 <div className="space-y-4">
                                      <div className="bg-black/60 p-3 rounded-2xl border border-white/5 flex justify-between items-center"><p className="text-[8px] text-gray-500 font-black">WATCHING</p><p className="text-xs text-white font-black">1.4K NET</p></div>
                                      <div className="bg-black/60 p-3 rounded-2xl border border-white/5 flex justify-between items-center"><p className="text-[8px] text-gray-500 font-black">ENGAGEMENT</p><p className="text-xs text-indigo-400 font-black">82%</p></div>
                                 </div>
                                 <button className="w-full py-4 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-2xl shadow-lg tracking-widest mt-6">WATCH TERMINAL</button>
                            </div>
                       </div>
                  </div>
              </div>

              {/* GLOBAL DISTRIBUTION MATRIX (SWAPPED TO TOP, VISIBLE SCROLLBARS) */}
              <section className="overflow-hidden bg-[#0c0c14] border border-white/5 rounded-[3rem] shadow-2xl relative">
                    <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.01] backdrop-blur-3xl">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic flex items-center gap-4"><WaveformIcon className="w-6 h-6 text-indigo-500" /> Global Syndication Grid</h2>
                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.5em] italic ml-10">Multi-Region Multi-Node Asset Deployment</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3 bg-black/60 px-5 py-2.5 rounded-2xl border border-white/5 shadow-xl">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Grid Auto-Scroll</span>
                                <button onClick={() => setIsAutoScrolling(!isAutoScrolling)} className={`w-12 h-6 rounded-full relative transition-all shadow-inner ${isAutoScrolling ? 'bg-indigo-600' : 'bg-gray-800'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-lg ${isAutoScrolling ? 'left-7' : 'left-1'}`}></div>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* VISIBLE SCROLLBARS AS REQUESTED */}
                    <div ref={scrollRef} className="overflow-auto custom-scrollbar relative max-h-[500px]">
                        <div className="min-w-[1800px]">
                            <div className="flex bg-black/60 border-b border-white/5 text-[9px] font-black text-gray-500 uppercase tracking-[0.6em] sticky top-0 z-20 backdrop-blur-md">
                                <div className="w-[340px] flex-shrink-0 p-6 border-r border-white/10 bg-black/20">Station Identity</div>
                                <div className="flex-1 grid grid-cols-4 divide-x divide-white/5">
                                    <div className="p-6 text-center">EARLY CYCLE (08:00 AM)</div>
                                    <div className="p-6 text-center">MID CYCLE (12:00 PM)</div>
                                    <div className="p-6 text-center">PEAK CYCLE (04:00 PM)</div>
                                    <div className="p-6 text-center">NIGHT CYCLE (08:00 PM)</div>
                                </div>
                            </div>

                            <div className="divide-y divide-white/5 bg-[#0a0a0f]">
                                {MOCK_PODCAST_CHANNELS.map(ch => (
                                    <div key={ch.id} className="flex group hover:bg-indigo-500/[0.04] transition-all h-32 items-stretch">
                                        {/* Station Column with Visualizer next to name */}
                                        <div className="w-[340px] flex-shrink-0 p-8 border-r border-white/10 flex items-center gap-6 bg-white/[0.01]">
                                            <img src={ch.thumbnailUrl} className="w-16 h-16 rounded-2xl object-cover border border-white/10 shadow-2xl group-hover:scale-105 transition-transform" />
                                            <div className="min-w-0 flex-1 space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <p className="font-black text-white text-base tracking-tighter uppercase truncate">{ch.name}</p>
                                                    <AudioVisualizer isPlaying={true} color="bg-indigo-400" />
                                                </div>
                                                <p className="text-[10px] text-indigo-500/60 font-bold uppercase tracking-widest truncate">Node ID: {ch.id}-NET</p>
                                            </div>
                                        </div>

                                        {/* SEGMENTS COLUMN */}
                                        <div className="flex-1 flex overflow-x-auto no-scrollbar gap-4 p-6">
                                            {ch.segments.map((seg, idx) => (
                                                <div key={idx} className="min-w-[320px] bg-black/40 border border-white/5 rounded-3xl p-5 flex flex-col justify-between hover:border-indigo-500/40 transition-all group/seg relative overflow-hidden">
                                                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600/10 group-hover/seg:bg-indigo-600 transition-colors"></div>
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="text-white font-black text-sm uppercase tracking-tight">{seg.title}</p>
                                                            <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase">{seg.start} • {seg.date}</p>
                                                        </div>
                                                        <div className="bg-indigo-600/10 p-2 rounded-xl group-hover/seg:bg-indigo-600 transition-colors">
                                                            <BellAlertIcon className="w-3.5 h-3.5 text-indigo-400 group-hover/seg:text-white" />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5">
                                                        <div className="flex items-center gap-1.5">
                                                            <EyeIcon className="w-3 h-3 text-green-400" />
                                                            <span className="text-[10px] text-gray-400 font-black">{seg.viewers}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <UsersIcon className="w-3 h-3 text-indigo-400" />
                                                            <span className="text-[10px] text-gray-400 font-black">{seg.listeners}</span>
                                                        </div>
                                                        <div className="ml-auto text-[10px] text-gray-500 font-black uppercase tracking-widest">{seg.duration}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
              </section>

              {/* ASSET HUB (SWAPPED TO BOTTOM) */}
              <section className="pt-12 border-t border-white/5">
                   <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-8">
                       <div>
                           <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic flex items-center gap-5">Asset <span className="text-indigo-500">Injection</span> Vault</h2>
                           <p className="text-gray-600 text-[11px] font-black uppercase tracking-[0.5em] mt-4 ml-1 opacity-60">Provision Multi-Node Media Assets</p>
                       </div>
                       
                       <div className="flex items-center gap-4 bg-[#0c0c14] border border-white/5 p-4 rounded-[2rem] w-full md:w-auto shadow-2xl">
                            <div className="relative flex-1 md:w-80">
                                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input type="text" placeholder="Search B-Roll Vault..." className="w-full bg-black/40 border border-gray-800 text-white rounded-2xl py-3 pl-12 pr-4 text-xs font-bold focus:outline-none focus:border-indigo-500" />
                            </div>
                            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-8 py-3 rounded-2xl text-[10px] uppercase tracking-widest transition-all shadow-xl active:scale-95">Filter Library</button>
                       </div>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                       {MOCK_VIDEO_CLIPS.slice(0, 4).map(clip => (
                           <div key={clip.id} className="space-y-4 group cursor-pointer relative">
                               <div className="relative aspect-[3/4] rounded-[3.5rem] overflow-hidden border-2 border-white/5 shadow-2xl transition-all duration-700 group-hover:border-indigo-500/50 scale-[0.98] group-hover:scale-100 bg-gray-900">
                                   <img src={`https://picsum.photos/seed/${clip.id}_asset_uhd/1200/1600`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-75 group-hover:brightness-100" />
                                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-10 flex flex-col justify-end">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden"><img src={clip.creator.avatarUrl} className="w-full h-full object-cover" /></div>
                                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{clip.creator.name}</span>
                                        </div>
                                       <p className="text-[18px] font-black text-white leading-tight uppercase tracking-tighter group-hover:text-indigo-400 transition-colors">{clip.title}</p>
                                   </div>
                                   <div className="absolute inset-0 bg-indigo-600/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-md">
                                        <div className="text-center space-y-6 px-10">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:animate-bounce"><MediaPlayerIcon className="w-8 h-8 text-indigo-600" /></div>
                                            <button className="bg-black text-white font-black py-4 px-10 rounded-2xl w-full text-[10px] uppercase tracking-widest">Inject into Feed</button>
                                        </div>
                                   </div>
                               </div>
                           </div>
                       ))}
                   </div>
              </section>
          </div>
      )}

      {/* Entry Stage (Simplified) */}
      {!isSessionActive && !isConnecting && (
          <div className="bg-gradient-to-b from-indigo-900/10 to-transparent p-40 rounded-[5rem] border border-white/5 text-center space-y-16 backdrop-blur-3xl relative overflow-hidden group animate-fadeIn">
             <div className="w-56 h-56 bg-indigo-600/10 rounded-[4rem] flex items-center justify-center mx-auto border-2 border-indigo-500/20 shadow-[0_0_100px_rgba(79,70,229,0.2)]">
                 <CameraIcon className="w-24 h-24 text-indigo-400" />
             </div>
             <div className="max-w-4xl mx-auto relative z-10">
                 <h2 className="text-7xl font-black text-white uppercase tracking-tighter italic leading-none">Authentication <span className="text-indigo-500">Pending</span></h2>
                 <p className="text-gray-500 mt-12 leading-loose font-bold uppercase text-[15px] tracking-[0.5em] px-20 italic">Awaiting secure node handshake for multi-region distribution.</p>
             </div>
             <button onClick={startSession} className="bg-white text-black font-black py-10 px-32 rounded-[5rem] hover:bg-indigo-600 hover:text-white transition-all shadow-[0_50px_100px_rgba(255,255,255,0.1)] uppercase tracking-[0.6em] text-[16px]">Initialize Master Node</button>
          </div>
      )}
    </div>
  );
};

export default LiveCoCreate;
