import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Loader2 } from 'lucide-react';
import { vapi, setAssistant } from '../../ai-services/vapiService';
import VoiceWaveform from './VoiceWaveform';

interface AIPhoneInterfaceProps {
  onCallStart?: () => void;
  onCallEnd?: () => void;
  className?: string;
  showControls?: boolean;
  debugMode?: boolean;
}

const AIPhoneInterface: React.FC<AIPhoneInterfaceProps> = ({
  onCallStart,
  onCallEnd,
  className = "",
  showControls = true,
  debugMode = false,
}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isAISpeaking, setIsAISpeaking] = useState(false);

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCalling) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [isCalling]);

  // VAPI event listeners
  useEffect(() => {
    const handleCallStarted = () => {
      console.log('📞 Call started - updating state');
      setIsCalling(true);
      setIsConnecting(false);
      setError(null);
      setCallDuration(0);
      onCallStart?.();
    };

    const handleCallEnded = () => {
      console.log('📞 Call ended - updating state');
      setIsCalling(false);
      setIsConnecting(false);
      setIsAISpeaking(false);
      setIsMuted(false);
      setCallDuration(0);
      onCallEnd?.();
    };

    const handleSpeechStart = () => {
      console.log('🎤 AI started speaking');
      setIsAISpeaking(true);
    };

    const handleSpeechEnd = () => {
      console.log('🎤 AI stopped speaking');
      setIsAISpeaking(false);
    };

    const handleError = (error: any) => {
      console.error('VAPI Error:', error);
      setError(`Connection error: ${error.message || 'Unknown error'}`);
      setIsConnecting(false);
      setIsCalling(false);
    };

    // Set up event listeners - cast to any to avoid TypeScript errors
    vapi.on('callStarted' as any, handleCallStarted);
    vapi.on('callEnded' as any, handleCallEnded);
    vapi.on('call-start' as any, handleCallStarted); // Fallback for different event names
    vapi.on('call-end' as any, handleCallEnded);
    vapi.on('speech-start' as any, handleSpeechStart);
    vapi.on('speech-end' as any, handleSpeechEnd);
    vapi.on('error' as any, handleError);

    return () => {
      // Clean up event listeners
      vapi.off('callStarted' as any, handleCallStarted);
      vapi.off('callEnded' as any, handleCallEnded);
      vapi.off('call-start' as any, handleCallStarted);
      vapi.off('call-end' as any, handleCallEnded);
      vapi.off('speech-start' as any, handleSpeechStart);
      vapi.off('speech-end' as any, handleSpeechEnd);
      vapi.off('error' as any, handleError);
    };
  }, [onCallStart, onCallEnd]);

  const handleToggleCall = async () => {
    if (isCalling) {
      // End call
      try {
        await vapi.stop();
        console.log('📞 Call ended successfully');
      } catch (error) {
        console.error('Failed to end call:', error);
        setError('Failed to end call');
      }
    } else {
      // Start call
      if (isConnecting) return;
      
      setIsConnecting(true);
      setError(null);

      try {
        console.log('🚀 Starting call with Max agent...');
        setAssistant('max');
        // The state will be updated by the event listeners
      } catch (error) {
        console.error('Failed to start call:', error);
        setError('Failed to connect. Please try again.');
        setIsConnecting(false);
      }
    }
  };

  const toggleMute = () => {
    try {
      if (isMuted) {
        vapi.unmute();
        setIsMuted(false);
        console.log('🔊 Unmuted');
      } else {
        vapi.mute();
        setIsMuted(true);
        console.log('🔇 Muted');
      }
    } catch (error) {
      console.error('Failed to toggle mute:', error);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getButtonText = () => {
    if (isConnecting) return 'Connecting...';
    if (isCalling) return 'End Call';
    return 'Start Call';
  };

  const getStatusText = () => {
    if (isConnecting) return 'Connecting to AI...';
    if (isCalling && isAISpeaking) return 'AI is speaking...';
    if (isCalling) return 'Listening...';
    return 'Ready to connect';
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${
            isCalling ? 'bg-green-500 animate-pulse' : 
            isConnecting ? 'bg-yellow-500 animate-pulse' : 
            'bg-gray-400'
          }`}></div>
          <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
        </div>
        
        <p className="text-sm text-gray-600">{getStatusText()}</p>
        
        {isCalling && (
          <div className="text-xs text-gray-500 mt-1">
            Duration: {formatDuration(callDuration)}
          </div>
        )}
      </div>

      {/* Voice Visualization */}
      <div className="mb-6">
        <VoiceWaveform
          isActive={isCalling || isConnecting}
          isAISpeaking={isAISpeaking}
          intensity={isAISpeaking ? 0.8 : 0.3}
          className="h-16 text-blue-600"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Main Toggle Button */}
      <div className="text-center mb-6">
        <button
          onClick={handleToggleCall}
          disabled={isConnecting}
          className={`
            relative inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg
            transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            ${isCalling 
              ? 'bg-red-600 hover:bg-red-700 text-white border-2 border-red-600 animate-pulse' 
              : isConnecting
              ? 'bg-yellow-500 text-white border-2 border-yellow-500'
              : 'bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-600'
            }
            ${isCalling ? 'shadow-lg shadow-red-500/25' : 'shadow-lg shadow-blue-500/25'}
          `}
        >
          {/* Glowing outline animation for active call */}
          {isCalling && (
            <div className="absolute inset-0 rounded-xl border-2 border-red-400 animate-ping opacity-75"></div>
          )}
          
          <div className="flex items-center space-x-3 relative z-10">
            {isConnecting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : isCalling ? (
              <PhoneOff className="w-6 h-6" />
            ) : (
              <Phone className="w-6 h-6" />
            )}
            <span>{getButtonText()}</span>
          </div>
        </button>
      </div>

      {/* Call Controls */}
      {showControls && isCalling && (
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleMute}
            className={`
              p-3 rounded-lg border transition-all duration-300
              ${isMuted
                ? 'bg-red-100 border-red-300 text-red-700 hover:bg-red-200'
                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
              }
            `}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>
      )}

      {/* Debug Info */}
      {debugMode && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div>Status: {isCalling ? 'In Call' : isConnecting ? 'Connecting' : 'Idle'}</div>
              <div>AI Speaking: {isAISpeaking ? 'Yes' : 'No'}</div>
              <div>Muted: {isMuted ? 'Yes' : 'No'}</div>
            </div>
            <div>
              <div>Duration: {formatDuration(callDuration)}</div>
              <div>Agent: Max</div>
              <div>SDK: VAPI v2.3.8</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPhoneInterface;