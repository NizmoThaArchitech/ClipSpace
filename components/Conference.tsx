
import React, { useEffect, useRef, useState } from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { MicIcon } from './icons/MicIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { ShareScreenIcon } from './icons/ShareScreenIcon';
import { MicOffIcon } from './icons/MicOffIcon';
import { CameraOffIcon } from './icons/CameraOffIcon';
import type { Theme } from '../App';
import type { User } from '../types';
import { MOCK_USERS } from '../constants';

const MOCK_PARTICIPANTS: User[] = [
    { ...MOCK_USERS.jane_creator, role: 'Producer', isHost: true },
    { ...MOCK_USERS.aerovisions, role: 'Editor' },
    { ...MOCK_USERS.pixelperfect, role: 'Performer' },
    { ...MOCK_USERS.storyweaver, role: 'Viewer' },
    { ...MOCK_USERS.urbanflow, role: 'Viewer' },
];

const ParticipantVideo: React.FC<{ participant: User, isCameraOff: boolean, isMicMuted: boolean, stream?: MediaStream | null }> = ({ participant, isCameraOff, isMicMuted, stream }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
      <div className={`relative w-full h-full rounded-lg overflow-hidden shadow-lg bg-gray-700`}>
        {isCameraOff || !stream ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <div className="text-center text-gray-400">
                  <CameraOffIcon className="w-8 h-8 mx-auto"/>
                  <img src={participant.avatarUrl} alt={participant.name} className="w-16 h-16 rounded-full opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
              </div>
          </div>
        ) : (
          <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted={participant.isHost}></video>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-center gap-2">
                {isMicMuted && <MicOffIcon className="w-4 h-4 text-red-400" />}
                <span className="text-white text-sm font-semibold truncate">{participant.name}</span>
            </div>
        </div>
      </div>
    );
};

const Conference: React.FC<{ theme: Theme }> = ({ theme }) => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [hasMicrophone, setHasMicrophone] = useState(false);

  const localUser = MOCK_PARTICIPANTS.find(p => p.isHost);
  const remoteUsers = MOCK_PARTICIPANTS.filter(p => !p.isHost);
  
  useEffect(() => {
      let stream: MediaStream | null = null;
      const getMedia = async () => {
          try {
              const devices = await navigator.mediaDevices.enumerateDevices();
              const hasVideo = devices.some(device => device.kind === 'videoinput');
              const hasAudio = devices.some(device => device.kind === 'audioinput');
              setHasCamera(hasVideo);
              setHasMicrophone(hasAudio);
              if (!hasVideo && !hasAudio) {
                  setIsCameraOff(true);
                  setIsMicMuted(true);
                  return;
              }
              const constraints = { video: hasVideo, audio: hasAudio };
              const s = await navigator.mediaDevices.getUserMedia(constraints);
              stream = s;
              setLocalStream(s);
              if (!hasVideo) setIsCameraOff(true);
              if (!hasAudio) setIsMicMuted(true);
          } catch (err) {
              console.error("Error accessing media devices.", err);
              setIsCameraOff(true);
              setIsMicMuted(true);
          }
      };
      getMedia();
      return () => {
          stream?.getTracks().forEach(track => track.stop());
      };
  }, []);

  const toggleMic = () => {
      if (localStream && hasMicrophone) {
          localStream.getAudioTracks().forEach(track => { track.enabled = !track.enabled; });
          setIsMicMuted(prev => !prev);
      }
  };

  const toggleCamera = () => {
      if (localStream && hasCamera) {
          localStream.getVideoTracks().forEach(track => { track.enabled = !track.enabled; });
          setIsCameraOff(prev => !prev);
      }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Main View */}
      <div className="flex-1 p-4 flex flex-col gap-4 min-h-0">
        <div className="flex-1 rounded-lg overflow-hidden bg-black">
          {localUser && (
            <ParticipantVideo 
              participant={localUser} 
              stream={localStream} 
              isCameraOff={isCameraOff} 
              isMicMuted={isMicMuted}
            />
          )}
        </div>
        <div className="flex-shrink-0 h-32 md:h-40">
          <div className="flex h-full gap-4 overflow-x-auto no-scrollbar pb-2">
            {remoteUsers.map(p => (
              <div key={p.id} className="h-full aspect-video flex-shrink-0">
                <ParticipantVideo participant={p} isCameraOff={true} isMicMuted={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Controller */}
      <div className="flex-shrink-0 bg-gray-800 p-3 flex items-center justify-center border-t border-gray-700/50">
        <div className="flex items-center gap-4">
            <button 
                onClick={toggleMic} 
                disabled={!hasMicrophone}
                className={`p-3 rounded-full text-white transition-colors ${isMicMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'} disabled:bg-gray-900 disabled:text-gray-500 disabled:cursor-not-allowed`}
                title={hasMicrophone ? (isMicMuted ? 'Unmute' : 'Mute') : 'Microphone not available'}
            >
                {isMicMuted ? <MicOffIcon className="w-6 h-6"/> : <MicIcon className="w-6 h-6"/>}
            </button>
            <button 
                onClick={toggleCamera} 
                disabled={!hasCamera}
                className={`p-3 rounded-full text-white transition-colors ${isCameraOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'} disabled:bg-gray-900 disabled:text-gray-500 disabled:cursor-not-allowed`}
                title={hasCamera ? (isCameraOff ? 'Start camera' : 'Stop camera') : 'Camera not available'}
            >
                {isCameraOff ? <CameraOffIcon className="w-6 h-6"/> : <CameraIcon className="w-6 h-6"/>}
            </button>
            <div className="w-px h-8 bg-gray-600 mx-2"></div>
            <button className="p-3 rounded-full text-white bg-gray-700 hover:bg-gray-600"><ShareScreenIcon className="w-6 h-6"/></button>
            <button className="p-3 rounded-full text-white bg-gray-700 hover:bg-gray-600"><SettingsIcon className="w-6 h-6"/></button>
             <div className="w-px h-8 bg-gray-600 mx-2"></div>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
                <PhoneIcon className="w-5 h-5"/>End Call
            </button>
        </div>
      </div>
    </div>
  );
};

export default Conference;
