
import React, { useState } from 'react';
import type { Theme } from '../App';

interface MusicConnectProps {
  platform: 'Spotify' | 'Amazon Music' | 'Apple Music';
  theme: Theme;
}

const MusicConnect: React.FC<MusicConnectProps> = ({ platform, theme }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const colors = {
    'Spotify': 'bg-[#1DB954] hover:bg-[#1ed760]',
    'Amazon Music': 'bg-[#00A8E1] hover:bg-[#33b8e7]',
    'Apple Music': 'bg-[#fb233b] hover:bg-[#fc4f62]',
  };

  const logos = {
    'Spotify': 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
    'Amazon Music': 'https://upload.wikimedia.org/wikipedia/commons/d/df/Amazon_Music_logo.svg',
    'Apple Music': 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Apple_Music_logo.svg',
  };

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 2000);
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn">
      <div className="bg-gray-800 p-12 rounded-3xl border border-gray-700 shadow-2xl text-center max-w-md w-full">
        <img src={logos[platform]} alt={platform} className="w-20 h-20 mx-auto mb-8" />
        <h1 className="text-3xl font-black text-white mb-4">Connect {platform}</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Sync your playlists and listen to your favorite tracks directly while you create in ClipSpace.
        </p>

        {!isConnected ? (
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className={`w-full py-4 rounded-2xl font-black text-white transition-all transform active:scale-95 flex items-center justify-center gap-3 ${colors[platform]}`}
          >
            {isConnecting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                AUTHORIZING...
              </>
            ) : (
              `LOG IN TO ${platform.toUpperCase()}`
            )}
          </button>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-500/10 text-green-400 p-4 rounded-2xl border border-green-500/20 font-bold">
              Successfully Connected!
            </div>
            <button className="text-gray-500 hover:text-white text-sm font-bold transition-colors">
              Manage Connection Settings
            </button>
          </div>
        )}
        
        <p className="mt-8 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
          Secure OAuth 2.0 Integration
        </p>
      </div>
    </div>
  );
};

export default MusicConnect;
