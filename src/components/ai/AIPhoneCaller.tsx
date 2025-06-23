import React, { useState, useEffect } from 'react';
import { Phone, PhoneCall, Mic, MicOff, PhoneOff } from 'lucide-react';
import VoiceAnimator from './VoiceAnimator';
import VAPIService from '../../ai-services/vapi';

interface AIPhoneCallerProps {
  onConnect?: () => void;
  className?: string;
  showPhoneInput?: boolean;
}

const AIPhoneCaller: React.FC<AIPhoneCallerProps> = ({ 
  onConnect, 
  className = "", 
  showPhoneInput = false 
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

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
    // Check if VAPI is ready
    const checkVapiReady = () => {
      if (!VAPIService.isReady() && typeof window !== 'undefined' && window.Vapi) {
        // VAPI SDK loaded but service not initialized, try again
        setTimeout(() => {
          if (!VAPIService.isReady()) {
            setError('VAPI service initialization failed');
          }
        }, 1000);
      }
    };

    checkVapiReady();
  }, []);

  const handleConnect = async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    setError(null);

    try {
      const result = await VAPIService.startCall(phoneNumber || undefined);
      
      if (result.success) {
        setIsConnected(true);
        setCallDuration(0);
        onConnect?.();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to connect to AI agent');
      console.error('Connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await VAPIService.endCall();
      setIsConnected(false);
      setCallDuration(0);
      setError(null);
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  };

  const toggleMute = () => {
    VAPIService.toggleMute();
    setIsMuted(VAPIService.isMuted());
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isConnected) {
    return (
      <div className={`${className}`}>
        {showPhoneInput && (
          <div className="mb-4">
            <input
              type="tel"
              placeholder="Enter phone number (optional)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Leave empty to use your device's microphone
            </p>
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className={`group relative bg-black text-white border-2 border-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:bg-white hover:text-black transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
          <div className="flex items-center justify-center space-x-4">
            <Phone className={`w-8 h-8 ${isConnecting ? 'animate-pulse' : 'group-hover:animate-pulse'}`} />
            <span>
              {isConnecting ? 'Connecting...' : 'Talk to Our AI Agent'}
            </span>
          </div>
          
          {/* Subtle tech animation */}
          <div className="absolute inset-0 rounded-2xl border-2 border-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        </button>

        <div className="mt-4 text-center text-sm text-gray-500">
          Agent ID: {VAPIService.getAssistantId()}
        </div>
      </div>
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
          
          {/* Always show some activity when connected */}
          <div className="absolute inset-0 border-2 border-white rounded-full animate-ping opacity-75"></div>
          <div className="absolute inset-0 border-4 border-gray-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>

      {/* Voice Visualizer */}
      <div className="flex justify-center mb-6">
        <VoiceAnimator isActive={true} className="h-16" />
      </div>

      {/* AI Status */}
      <div className="text-center mb-6">
        <div className="text-white text-sm font-medium">
          AI Agent is active and listening...
        </div>
        <div className="text-gray-400 text-xs mt-1">
          Speak naturally - the AI will respond
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
          <PhoneOff className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-4 text-center text-xs text-gray-400">
        Using VAPI Agent: {VAPIService.getAssistantId()}
      </div>
    </div>
  );
};

export default AIPhoneCaller;