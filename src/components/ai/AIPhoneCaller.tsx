import React, { useState, useEffect } from 'react';
import { Phone, PhoneCall, Mic, MicOff } from 'lucide-react';
import VoiceAnimator from './VoiceAnimator';

interface AIPhoneCallerProps {
  onConnect?: () => void;
  className?: string;
}

const AIPhoneCaller: React.FC<AIPhoneCallerProps> = ({ onConnect, className = "" }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  useEffect(() => {
    if (isConnected) {
      // Simulate AI speaking patterns
      const aiSpeakingInterval = setInterval(() => {
        setIsAISpeaking(prev => !prev);
      }, Math.random() * 3000 + 2000);

      return () => clearInterval(aiSpeakingInterval);
    }
  }, [isConnected]);

  const handleConnect = () => {
    setIsConnected(true);
    setCallDuration(0);
    onConnect?.();
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setIsAISpeaking(false);
    setCallDuration(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        className={`group relative bg-black text-white border-2 border-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:bg-white hover:text-black transform hover:scale-105 ${className}`}
      >
        <div className="flex items-center justify-center space-x-4">
          <Phone className="w-8 h-8 group-hover:animate-pulse" />
          <span>Talk to Our AI Agent</span>
        </div>
        
        {/* Subtle tech animation */}
        <div className="absolute inset-0 rounded-2xl border-2 border-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
      </button>
    );
  }

  return (
    <div className={`bg-black border-2 border-white rounded-2xl p-8 ${className}`}>
      {/* Call Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 text-white mb-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Connected to AI Agent</span>
        </div>
        <div className="text-gray-400 text-sm">{formatDuration(callDuration)}</div>
      </div>

      {/* AI Speaking Animation */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <PhoneCall className="w-12 h-12 text-black" />
          </div>
          
          {/* Pulsing rings when AI is speaking */}
          {isAISpeaking && (
            <>
              <div className="absolute inset-0 border-2 border-white rounded-full animate-ping opacity-75"></div>
              <div className="absolute inset-0 border-4 border-gray-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}></div>
            </>
          )}
        </div>
      </div>

      {/* Voice Visualizer */}
      <div className="flex justify-center mb-6">
        <VoiceAnimator isActive={isAISpeaking} className="h-16" />
      </div>

      {/* AI Status */}
      <div className="text-center mb-6">
        <div className={`text-sm font-medium transition-colors duration-300 ${
          isAISpeaking ? 'text-white' : 'text-gray-400'
        }`}>
          {isAISpeaking ? 'AI is speaking...' : 'Listening...'}
        </div>
      </div>

      {/* Call Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleMute}
          className={`p-3 rounded-full border-2 transition-all duration-300 ${
            isMuted 
              ? 'bg-red-600 border-red-600 text-white' 
              : 'bg-transparent border-white text-white hover:bg-white hover:text-black'
          }`}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
        
        <button
          onClick={handleDisconnect}
          className="p-3 rounded-full bg-red-600 border-2 border-red-600 text-white hover:bg-red-700 transition-all duration-300"
        >
          <Phone className="w-5 h-5 transform rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default AIPhoneCaller;