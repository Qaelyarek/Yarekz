import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Mic, MicOff } from 'lucide-react';

// VAPI Configuration - Replace with your actual credentials
const VAPI_CONFIG = {
  publicKey: 'YOUR_PUBLIC_KEY',
  assistantId: 'YOUR_AGENT_ID'
};

declare global {
  interface Window {
    Vapi: any;
  }
}

interface VAPIVoiceAssistantProps {
  className?: string;
}

const VAPIVoiceAssistant: React.FC<VAPIVoiceAssistantProps> = ({ className = "" }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const vapiRef = useRef<any>(null);
  const initializationRef = useRef<boolean>(false);

  // Initialize VAPI once when component mounts
  useEffect(() => {
    // Prevent multiple initializations
    if (initializationRef.current) return;
    initializationRef.current = true;

    const initializeVAPI = () => {
      // Check if VAPI SDK is loaded
      if (!window.Vapi) {
        console.log('⏳ Waiting for VAPI SDK to load...');
        setTimeout(initializeVAPI, 100);
        return;
      }

      try {
        console.log('🚀 Initializing VAPI...');
        
        // Create VAPI instance
        vapiRef.current = new window.Vapi(VAPI_CONFIG.publicKey);
        
        // Set up event listeners
        setupEventListeners();
        
        setIsLoading(false);
        console.log('✅ VAPI initialized successfully');
        
      } catch (err) {
        console.error('❌ Failed to initialize VAPI:', err);
        setError('Failed to initialize voice assistant');
        setIsLoading(false);
      }
    };

    initializeVAPI();

    // Cleanup on unmount
    return () => {
      if (vapiRef.current) {
        try {
          vapiRef.current.stop();
        } catch (err) {
          console.error('Error during cleanup:', err);
        }
      }
    };
  }, []);

  const setupEventListeners = () => {
    if (!vapiRef.current) return;

    // Call start event
    vapiRef.current.on('call-start', () => {
      console.log('📞 Call started');
      setIsConnected(true);
      setIsConnecting(false);
      setError(null);
    });

    // Call end event
    vapiRef.current.on('call-end', () => {
      console.log('📞 Call ended');
      setIsConnected(false);
      setIsConnecting(false);
      setIsMuted(false);
    });

    // Error handling
    vapiRef.current.on('error', (error: any) => {
      console.error('❌ VAPI error:', error);
      setError('Connection failed. Please try again.');
      setIsConnecting(false);
      setIsConnected(false);
    });

    // Speech events
    vapiRef.current.on('speech-start', () => {
      console.log('🎤 Speech started');
    });

    vapiRef.current.on('speech-end', () => {
      console.log('🎤 Speech ended');
    });

    // Message events
    vapiRef.current.on('message', (message: any) => {
      console.log('💬 Message:', message);
    });
  };

  const handleStartCall = async () => {
    if (!vapiRef.current || isConnecting) return;

    setIsConnecting(true);
    setError(null);

    try {
      console.log('📞 Starting call with assistant:', VAPI_CONFIG.assistantId);
      
      await vapiRef.current.start(VAPI_CONFIG.assistantId);
      
    } catch (err) {
      console.error('❌ Failed to start call:', err);
      setError('Failed to start call. Please check your microphone permissions.');
      setIsConnecting(false);
    }
  };

  const handleEndCall = async () => {
    if (!vapiRef.current) return;

    try {
      console.log('📞 Ending call...');
      await vapiRef.current.stop();
      
    } catch (err) {
      console.error('❌ Failed to end call:', err);
    }
  };

  const handleToggleMute = () => {
    if (!vapiRef.current || !isConnected) return;

    try {
      if (isMuted) {
        vapiRef.current.unmute();
        setIsMuted(false);
        console.log('🔊 Unmuted');
      } else {
        vapiRef.current.mute();
        setIsMuted(true);
        console.log('🔇 Muted');
      }
    } catch (err) {
      console.error('❌ Failed to toggle mute:', err);
    }
  };

  const isReady = !isLoading && !error && vapiRef.current;

  return (
    <div className={`vapi-voice-assistant ${className}`}>
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <div className="font-medium">Error</div>
          <div>{error}</div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center text-gray-600 mb-4">
          <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          Loading voice assistant...
        </div>
      )}

      {/* Main Button */}
      <button
        id="talk-btn"
        onClick={isConnected ? handleEndCall : handleStartCall}
        disabled={!isReady || isConnecting}
        className={`
          group relative w-full px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 
          transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          ${isConnected 
            ? 'bg-red-600 hover:bg-red-700 text-white' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
          }
        `}
      >
        <div className="flex items-center justify-center space-x-3">
          {isConnecting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Connecting...</span>
            </>
          ) : isConnected ? (
            <>
              <PhoneOff className="w-5 h-5" />
              <span>End Call</span>
            </>
          ) : (
            <>
              <Phone className="w-5 h-5 group-hover:animate-pulse" />
              <span>Talk to AI Assistant</span>
            </>
          )}
        </div>
      </button>

      {/* Call Controls */}
      {isConnected && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleToggleMute}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-300
              ${isMuted 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <div className="flex items-center space-x-2">
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isMuted ? 'Unmute' : 'Mute'}</span>
            </div>
          </button>
        </div>
      )}

      {/* Status Indicator */}
      {isConnected && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-green-100 rounded-full text-green-700 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Connected to AI Assistant</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VAPIVoiceAssistant;