
import React, { useState, useEffect, useRef } from 'react';
import type { Theme } from '../App.tsx';
import { MOCK_VIDEO_CLIPS, MOCK_USERS, STYLE_PRESETS } from '../constants.ts';
import { SparklesIcon } from './icons/SparklesIcon.tsx';
import { CubeTransparentIcon } from './icons/CubeTransparentIcon.tsx';
import { FilmIcon } from './icons/FilmIcon.tsx';
import { PaintBrushIcon } from './icons/PaintBrushIcon.tsx';
import { MusicalNoteIcon } from './icons/MusicalNoteIcon.tsx';
import { GripVerticalIcon } from './icons/GripVerticalIcon.tsx';
import { UploadIcon } from './icons/UploadIcon.tsx';
import { ClapperboardIcon } from './icons/ClapperboardIcon.tsx';
import { HeatmapIcon } from './icons/HeatmapIcon.tsx';
import { MetronomeIcon } from './icons/MetronomeIcon.tsx';
import { ChevronDoubleLeftIcon } from './icons/ChevronDoubleLeftIcon.tsx';
import { ChevronDoubleRightIcon } from './icons/ChevronDoubleRightIcon.tsx';
import { SettingsIcon } from './icons/SettingsIcon.tsx';
import { VideoCameraIcon } from './icons/VideoCameraIcon.tsx';
import { PlusIcon } from './icons/PlusIcon.tsx';

const loadingStates = [
    { state: 'parsing_prompt', message: 'Analyzing prompt for key elements...' },
    { state: 'generating_storyboard', message: 'Creating initial shot composition...' },
    { state: 'rendering_frames', message: 'Rendering frames with diffusion model...' },
    { state: 'interpolating_motion', message: 'Applying motion vectors...' },
];

const CSpaceVideoSuite: React.FC<{ theme: Theme }> = ({ theme }) => {
    const [uploadedClip, setUploadedClip] = useState<any | null>(null);
    const [prompt, setPrompt] = useState('');
    const [soundDesignPrompt, setSoundDesignPrompt] = useState('');
    const [generationState, setGenerationState] = useState('idle');
    const [generatedClip, setGeneratedClip] = useState<any | null>(null);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [activeTab, setActiveTab] = useState<'edit' | 'style' | 'audio' | 'generate'>('edit');
    const [timelineClips, setTimelineClips] = useState<any[]>([]);
    const [generatedWaveform, setGeneratedWaveform] = useState(false);
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [showExportSettings, setShowExportSettings] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingStyle, setRecordingStyle] = useState<'Cinematic' | 'Vintage' | 'Abstract' | null>(null);

    useEffect(() => {
        if (uploadedClip && timelineClips.length === 0) {
            setTimelineClips([uploadedClip]);
        }
    }, [uploadedClip]);
    
    useEffect(() => {
        let interval: number;
        if (generationState !== 'idle' && generationState !== 'success') {
            let stateIndex = loadingStates.findIndex(s => s.state === generationState);
            interval = window.setInterval(() => {
                stateIndex++;
                if (stateIndex < loadingStates.length) {
                    setGenerationState(loadingStates[stateIndex].state);
                    setLoadingMessage(loadingStates[stateIndex].message);
                } else {
                    clearInterval(interval);
                    const clip = { ...MOCK_VIDEO_CLIPS[Math.floor(Math.random() * MOCK_VIDEO_CLIPS.length)], creator: MOCK_USERS.jane_creator, title: `AI: ${prompt.substring(0, 30)}...`};
                    setGeneratedClip(clip);
                    setTimelineClips(prev => [...prev, clip]);
                    setGenerationState('success');
                }
            }, 1500);
        }
        return () => clearInterval(interval);
    }, [generationState, prompt]);

    const handleGenerate = () => {
        if (!prompt.trim()) return;
        setGeneratedClip(null);
        setGenerationState('parsing_prompt');
        setLoadingMessage(loadingStates[0].message);
    };

    const handleUpload = () => {
        const clip = MOCK_VIDEO_CLIPS[2];
        setUploadedClip(clip);
    }

    const startRecording = () => {
        setIsRecording(true);
    }

    const stopRecording = () => {
        setIsRecording(false);
        setRecordingStyle(null);
        handleUpload(); // Simulate finishing recording and adding to project
    }

    const SidebarTab: React.FC<{ id: typeof activeTab, icon: React.ReactNode, label: string }> = ({ id, icon, label }) => (
        <button 
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center p-3 rounded-lg transition-all ${activeTab === id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'} ${!isSidebarExpanded ? 'justify-center' : 'gap-3'}`}
            title={!isSidebarExpanded ? label : ''}
        >
            <div className="flex-shrink-0">{icon}</div>
            {isSidebarExpanded && <span className="text-sm font-bold truncate">{label}</span>}
        </button>
    );

    const DirectorToolButton: React.FC<{ icon: React.ReactNode, title: string, description: string, onToggle?: (active: boolean) => void }> = ({ icon, title, description, onToggle }) => {
        const [isActive, setIsActive] = useState(false);
        const handleClick = () => {
            const newActiveState = !isActive;
            setIsActive(newActiveState);
            if(onToggle) onToggle(newActiveState);
        }
        return (
             <button onClick={handleClick} className={`w-full text-left p-4 rounded-xl flex items-start gap-4 transition-all duration-300 border ${isActive ? 'bg-indigo-500/10 border-indigo-500 shadow-inner' : 'bg-gray-800/40 border-gray-700/50 hover:border-gray-600'}`}>
                <div className={`p-2 rounded-lg ${isActive ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400'}`}>{icon}</div>
                <div>
                    <h5 className="font-bold text-white text-sm">{title}</h5>
                    <p className="text-xs text-gray-400 leading-tight mt-1">{description}</p>
                </div>
            </button>
        )
    };

    return (
        <div className="flex h-full bg-gray-700">
            {/* Vertical Collapsible Sidebar */}
            <div className={`h-full bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300 ${isSidebarExpanded ? 'w-64' : 'w-16'}`}>
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                    {isSidebarExpanded && <span className="font-black text-indigo-400 text-lg tracking-tighter">TOOLKIT</span>}
                    <button onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} className="text-gray-500 hover:text-white p-1">
                        {isSidebarExpanded ? <ChevronDoubleLeftIcon className="w-5 h-5"/> : <ChevronDoubleRightIcon className="w-5 h-5"/>}
                    </button>
                </div>
                <div className="flex-1 p-2 space-y-2 pt-4">
                    <SidebarTab id="edit" icon={<ClapperboardIcon className="w-6 h-6"/>} label="Director's Cut" />
                    <SidebarTab id="style" icon={<PaintBrushIcon className="w-6 h-6"/>} label="Visual Styles" />
                    <SidebarTab id="audio" icon={<MusicalNoteIcon className="w-6 h-6"/>} label="AI Sound" />
                    <SidebarTab id="generate" icon={<SparklesIcon className="w-6 h-6"/>} label="Magic Generator" />
                </div>
                <div className="p-4 border-t border-gray-800 space-y-3">
                     <button onClick={() => setShowExportSettings(!showExportSettings)} className={`w-full flex items-center gap-3 text-gray-400 hover:text-white transition-all ${!isSidebarExpanded && 'justify-center'}`}>
                        <SettingsIcon className="w-6 h-6"/>
                        {isSidebarExpanded && <span className="text-sm font-bold">Export Config</span>}
                     </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="p-6 pb-2 flex-shrink-0 flex justify-between items-center bg-gray-900/50 backdrop-blur-sm">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tighter">CSpace <span className="text-indigo-500">Video Suite</span></h1>
                        <p className="text-gray-300 text-sm font-medium mt-1 uppercase tracking-widest">Professional production grade studio AI.</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleUpload} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2.5 px-6 rounded-xl border border-gray-700 transition-all active:scale-95 flex items-center gap-2">
                             <UploadIcon className="w-5 h-5"/> Upload RAW
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-black py-2.5 px-8 rounded-xl transition-all shadow-lg shadow-green-500/20 active:scale-95" onClick={() => setShowExportSettings(true)}>EXPORT PROJECT</button>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_22rem] gap-6 p-6 min-h-0">
                    {/* Main Canvas & Recording UI */}
                    <div className="flex flex-col gap-6 min-h-0">
                        <div id="canvas" className="flex-1 bg-black rounded-2xl shadow-inner border border-gray-800 flex items-center justify-center relative overflow-hidden group">
                            {isRecording ? (
                                <div className="w-full h-full bg-gray-950 flex items-center justify-center">
                                    <div className="absolute top-6 left-6 flex items-center gap-3 bg-red-600/90 text-white px-4 py-2 rounded-full font-black animate-pulse z-20">
                                        <div className="w-3 h-3 bg-white rounded-full"></div> REC 00:04:12
                                    </div>
                                    <video src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" className={`w-full h-full object-cover grayscale opacity-40`} autoPlay muted loop />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10 bg-black/40">
                                         <h3 className="text-2xl font-black text-white uppercase tracking-widest">AI Generating Live B-Roll</h3>
                                         <div className="flex gap-4">
                                             {['Cinematic', 'Vintage', 'Abstract'].map(style => (
                                                 <button 
                                                    key={style}
                                                    onClick={() => setRecordingStyle(style as any)}
                                                    className={`px-8 py-4 rounded-2xl font-black border-4 transition-all ${recordingStyle === style ? 'bg-indigo-600 border-white text-white scale-110 shadow-2xl' : 'bg-black/60 border-indigo-500/40 text-indigo-400 hover:border-indigo-400'}`}
                                                 >
                                                     {style}
                                                 </button>
                                             ))}
                                         </div>
                                         <button onClick={stopRecording} className="mt-12 bg-white text-black font-black py-4 px-12 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-2xl">STOP & ASSEMBLE</button>
                                    </div>
                                </div>
                            ) : uploadedClip ? (
                                <video src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" className="w-full h-full object-contain" autoPlay muted loop controls />
                            ) : (
                                <div className="text-center space-y-6">
                                    <CubeTransparentIcon className="w-24 h-24 mx-auto text-indigo-500/20 group-hover:text-indigo-500/40 transition-colors duration-700"/>
                                    <div className="space-y-2">
                                        <p className="text-white text-xl font-black tracking-tight">CSpace Preview Canvas</p>
                                        <p className="text-gray-500 text-sm font-medium">Drop footage or record live to start the AI Producer.</p>
                                    </div>
                                    <button onClick={startRecording} className="inline-flex items-center gap-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white font-bold py-3 px-8 rounded-xl border border-red-500/50 transition-all">
                                        <VideoCameraIcon className="w-6 h-6"/> Record Live Video
                                    </button>
                                </div>
                            )}
                            {showHeatmap && <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/30 via-red-500/30 to-transparent mix-blend-color-dodge pointer-events-none z-10"></div>}
                        </div>
                        
                        {/* Timeline */}
                        <div id="timeline-panel" className="h-48 bg-gray-900 rounded-2xl border border-gray-800 p-4 flex flex-col gap-3 relative">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Active Sequence Timeline</h3>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase">Syncing...</span>
                                </div>
                            </div>
                            <div className="flex-1 bg-black/40 rounded-xl flex items-center gap-3 overflow-x-auto no-scrollbar p-3 border border-gray-800/50">
                                {timelineClips.length > 0 ? timelineClips.map((clip, idx) => (
                                    <div key={idx} className="flex-shrink-0 w-48 h-full bg-gray-800 rounded-lg border border-gray-700 flex flex-col p-1.5 relative group cursor-grab active:cursor-grabbing shadow-lg">
                                        <img src={clip.thumbnailUrl} className="w-full h-20 object-cover rounded-md" />
                                        <p className="text-[10px] font-bold text-gray-300 mt-1.5 truncate">{clip.title}</p>
                                        <div className="absolute -left-1 top-0 bottom-0 flex items-center opacity-0 group-hover:opacity-100"><GripVerticalIcon className="w-3 text-gray-600"/></div>
                                    </div>
                                )) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-700 font-black text-sm uppercase tracking-widest italic opacity-50">Empty Timeline</div>
                                )}
                            </div>
                             {generatedWaveform && (<div className="h-8 flex items-center gap-px bg-teal-500/5 rounded-lg px-2 border border-teal-500/10">{Array.from({length: 200}).map((_,i) => <div key={i} className="w-full bg-teal-500/40 rounded-full" style={{height: `${Math.random() * 80 + 10}%`}}></div>)}</div>)}
                        </div>
                    </div>

                    {/* Active Tool Panel */}
                    <div className="bg-gray-900 rounded-2xl border border-gray-800 flex flex-col shadow-2xl overflow-hidden">
                        <div className="p-5 border-b border-gray-800 bg-gray-800/20">
                             <h3 className="font-black text-white tracking-tighter uppercase text-sm">Suite Tools</h3>
                        </div>
                        <div className="p-5 flex-1 space-y-6 overflow-y-auto no-scrollbar">
                            {activeTab === 'edit' && (
                                <div className="space-y-4">
                                    <DirectorToolButton icon={<SparklesIcon className="w-6 h-6"/>} title="Smart Clip Discovery" description="AI scans hours of footage to find the viral moments." />
                                    <DirectorToolButton icon={<MetronomeIcon className="w-6 h-6"/>} title="Rhythm & Pacing" description="Auto-adjust clips to match a custom beat or tempo." />
                                    <DirectorToolButton icon={<HeatmapIcon className="w-6 h-6"/>} title="Attention Mapper" description="Heatmap overlay showing predicted eye tracking." onToggle={setShowHeatmap} />
                                </div>
                            )}
                            {activeTab === 'style' && (
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-xs font-black text-gray-500 uppercase mb-3">One-Click Graded Styles</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {STYLE_PRESETS.map(s => (
                                                <button key={s.name} className="group relative aspect-video rounded-xl overflow-hidden border border-gray-800 hover:border-indigo-500 transition-all shadow-lg">
                                                    <img src={s.thumbnailUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{s.name}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-gray-800">
                                         <p className="text-xs font-black text-gray-500 uppercase mb-3">Magic Edit (In-painting)</p>
                                         <input type="text" placeholder="Describe object to replace..." className="w-full bg-black/50 text-white rounded-xl p-3 border border-gray-800 focus:border-indigo-500 focus:outline-none text-sm" />
                                         <button className="w-full mt-3 bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white font-bold py-3 rounded-xl transition-all border border-indigo-500/20">Analyze & Mask</button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'audio' && (
                                <div className="space-y-6">
                                    <div className="p-5 rounded-2xl bg-teal-500/5 border border-teal-500/10">
                                        <p className="text-xs font-black text-teal-400 uppercase tracking-widest mb-4">Neural Sound Engine</p>
                                        <textarea 
                                            value={soundDesignPrompt} onChange={e => setSoundDesignPrompt(e.target.value)}
                                            placeholder="e.g. Gritty industrial techno with heavy synth swells..."
                                            className="w-full bg-black/40 text-white border-none focus:ring-0 text-sm resize-none rounded-xl p-3 h-24"
                                        />
                                        <button onClick={() => setGeneratedWaveform(true)} className="w-full mt-4 bg-teal-600 hover:bg-teal-500 text-white font-black py-4 rounded-xl shadow-lg shadow-teal-500/20 transition-all active:scale-95 uppercase tracking-tighter text-sm">Generate Soundscape</button>
                                    </div>
                                </div>
                            )}
                             {activeTab === 'generate' && (
                                <div className="space-y-6">
                                    <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                                        <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Text to B-Roll</p>
                                        <textarea 
                                            value={prompt} onChange={e => setPrompt(e.target.value)}
                                            placeholder="A cinematic shot of a neon wolf..."
                                            className="w-full bg-black/40 text-white border-none focus:ring-0 text-sm resize-none rounded-xl p-3 h-24"
                                        />
                                        <button onClick={handleGenerate} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 uppercase tracking-tighter text-sm">Generate Clip</button>
                                    </div>
                                     <button onClick={startRecording} className="w-full py-4 bg-red-600/10 text-red-500 border border-red-500/20 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all">
                                         <div className="w-2 h-2 bg-current rounded-full animate-ping"></div> RECORD LIVE AI
                                     </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Advanced Export Modal */}
            {showExportSettings && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[60] flex items-center justify-center p-6 animate-fadeIn">
                    <div className="bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden">
                        <div className="p-8 border-b border-gray-800 flex justify-between items-center bg-gray-800/30">
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tighter">Advanced Export</h2>
                                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-1">Render Configuration</p>
                            </div>
                            <button onClick={() => setShowExportSettings(false)} className="p-2 bg-gray-800 rounded-xl hover:text-red-500 transition-colors">
                                <PlusIcon className="w-8 h-8 rotate-45" />
                            </button>
                        </div>
                        <div className="p-8 grid grid-cols-2 gap-8">
                             <div className="space-y-4">
                                 <label className="block text-xs font-black text-gray-500 uppercase">Output Resolution</label>
                                 <div className="grid grid-cols-2 gap-2">
                                     <button className="py-3 px-4 bg-indigo-600 text-white rounded-xl font-bold border border-white/20 shadow-lg">4K (Native)</button>
                                     <button className="py-3 px-4 bg-gray-800 text-gray-400 rounded-xl font-bold hover:border-gray-600">1080p</button>
                                 </div>
                             </div>
                             <div className="space-y-4">
                                 <label className="block text-xs font-black text-gray-500 uppercase">Video Encoding</label>
                                 <select className="w-full bg-gray-800 border-gray-700 text-white rounded-xl py-3 px-4 font-bold">
                                     <option>H.264 High Performance</option>
                                     <option>HEVC (H.265)</option>
                                     <option>ProRes 422 HQ</option>
                                 </select>
                             </div>
                             <div className="space-y-4">
                                 <label className="block text-xs font-black text-gray-500 uppercase">Bitrate (Mbps)</label>
                                 <input type="range" className="w-full accent-indigo-500" min="10" max="100" />
                                 <div className="flex justify-between text-[10px] text-gray-500 font-black"><span>10Mbps</span><span>50Mbps</span><span>100Mbps</span></div>
                             </div>
                             <div className="space-y-4">
                                 <label className="block text-xs font-black text-gray-500 uppercase">Post-Processing</label>
                                 <div className="space-y-2">
                                     <label className="flex items-center gap-3 text-sm text-gray-300 font-bold"><input type="checkbox" defaultChecked className="rounded border-gray-700 bg-gray-800 text-indigo-600"/> AI Frame Smoothing</label>
                                     <label className="flex items-center gap-3 text-sm text-gray-300 font-bold"><input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-indigo-600"/> Add Film Grain (5%)</label>
                                 </div>
                             </div>
                        </div>
                        <div className="p-8 bg-gray-800/30 flex gap-4">
                             <button onClick={() => setShowExportSettings(false)} className="flex-1 py-4 bg-gray-800 hover:bg-gray-700 text-white font-black rounded-2xl transition-all">CANCEL</button>
                             <button className="flex-[2] py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/20">START PRODUCTION RENDER</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CSpaceVideoSuite;
