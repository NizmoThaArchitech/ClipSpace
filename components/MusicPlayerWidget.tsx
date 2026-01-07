
import React, { useState, useEffect } from 'react';
import { MusicalNoteIcon } from './icons/MusicalNoteIcon';
import { VolumeIcon } from './icons/VolumeIcon';

const MusicPlayerWidget: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState({
        title: "Ambient Echoes",
        artist: "CSpace Records",
        art: "https://picsum.photos/seed/music/100/100"
    });

    useEffect(() => {
        const handleShowAudio = (e: any) => {
            setCurrentTrack(e.detail);
            setIsPlaying(true);
            setIsExpanded(true);
        };
        window.addEventListener('play-show-audio', handleShowAudio);
        return () => window.removeEventListener('play-show-audio', handleShowAudio);
    }, []);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="relative flex items-center h-full">
            {/* Collapsed Pill with Controls */}
            <div 
                onClick={() => setIsExpanded(!isExpanded)}
                className={`flex items-center gap-1 p-1 bg-gray-800 border border-gray-700 rounded-full transition-all duration-500 cursor-pointer shadow-lg hover:border-indigo-500/50 ${isExpanded ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}
            >
                <div className="flex items-center bg-gray-900/80 rounded-full pr-3">
                    <button onClick={(e) => { e.stopPropagation(); }} className="p-2 text-gray-500 hover:text-white transition-colors"><PrevIcon className="w-3 h-3"/></button>
                    <button 
                        onClick={togglePlay}
                        className="w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-500 transition-all active:scale-90"
                    >
                        {isPlaying ? <PauseIcon className="w-3 h-3"/> : <PlayIcon className="w-3 h-3 pl-0.5"/>}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); }} className="p-2 text-gray-500 hover:text-white transition-colors"><NextIcon className="w-3 h-3"/></button>
                    <div className="w-1 h-4 bg-gray-700 mx-1 rounded-full"></div>
                    <MusicalNoteIcon className={`w-4 h-4 ml-2 ${isPlaying ? 'animate-pulse text-indigo-400' : 'text-gray-500'}`} />
                </div>
            </div>

            {/* Expanded Detailed View */}
            {isExpanded && (
                <div className="absolute top-0 right-0 w-72 bg-gray-900 border border-gray-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 z-50 animate-fadeIn origin-top-right">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">CSpace Media Node</span>
                        <button onClick={() => setIsExpanded(false)} className="text-gray-500 hover:text-white">&times;</button>
                    </div>
                    <div className="flex gap-4">
                        <img src={currentTrack.art} className="w-20 h-20 rounded-2xl shadow-2xl object-cover border border-gray-800" />
                        <div className="flex-1 min-w-0">
                            <h4 className="font-black text-white text-sm truncate tracking-tight">{currentTrack.title}</h4>
                            <p className="text-xs text-gray-400 truncate font-bold">{currentTrack.artist}</p>
                            <div className="flex items-center gap-2 mt-3">
                                <AudioWave isPlaying={isPlaying} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-8">
                        <button className="text-gray-500 hover:text-white transition-colors"><PrevIcon className="w-5 h-5"/></button>
                        <button 
                            onClick={togglePlay}
                            className="w-14 h-14 bg-indigo-600 text-white rounded-3xl flex items-center justify-center shadow-xl hover:bg-indigo-500 transition-all active:scale-95 group"
                        >
                            {isPlaying ? <PauseIcon className="w-6 h-6"/> : <PlayIcon className="w-6 h-6 pl-1"/>}
                        </button>
                        <button className="text-gray-500 hover:text-white transition-colors"><NextIcon className="w-5 h-5"/></button>
                    </div>
                    <div className="mt-6 space-y-2">
                        <div className="flex justify-between text-[9px] font-black text-gray-500 uppercase tracking-tighter">
                            <span>02:45</span>
                            <span>04:12</span>
                        </div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="w-2/3 h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                        <VolumeIcon className="w-4 h-4 text-gray-500" />
                        <div className="flex-1 h-1 bg-gray-800 rounded-full">
                            <div className="w-3/4 h-full bg-gray-600 rounded-full"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AudioWave: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => (
    <div className="flex items-end gap-0.5 h-4">
        {Array.from({length: 12}).map((_, i) => (
            <div 
                key={i} 
                className="w-0.5 bg-indigo-500 rounded-full transition-all duration-300"
                style={{ height: isPlaying ? `${Math.random() * 100}%` : '15%' }}
            ></div>
        ))}
    </div>
);

const PlayIcon = (props: any) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>;
const PauseIcon = (props: any) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
const PrevIcon = (props: any) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6L19 18V6z"/></svg>;
const NextIcon = (props: any) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>;

export default MusicPlayerWidget;
