import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, Loader2 } from 'lucide-react';
import StarBorder from '../ui/star-border';
import VoiceWaveform from '../ai/VoiceWaveform';
import VAPIService from '../../ai-services/vapi';
import { validateVAPIConfig } from '../../config/environment';

interface AIPhoneHeroProps {
  className?: string;
}

const AIPhoneHero: React.FC<AIPhoneHeroProps> = ({ className = "" }) => {
  // Call state management
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  // AI state management
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [vapiReady, setVapiReady] = useState(false);

  // Initialize VAPI and check readiness
  useEffect(() => {
    const checkVAPIReadiness = async () => {
      const status = VAPIService.getStatus();
      setVapiReady(status.initialized && status.configValid);
      
      if (!status.configValid) {
        setError('VAPI configuration incomplete. Please check your environment variables.');
      }
    };

    checkVAPIReadiness();
    const interval = setInterval(checkVAPIReadiness, 2000);
    return () => clearInterval(interval);
  }, []);

  // Set up VAPI event listeners
  useEffect(() => {
    const handleCallStart = () => {
      setIsConnected(true);
      setIsConnecting(false);
      setCallDuration(0);
      setError(null);
    };

    const handleCallEnd = () => {
      setIsConnected(false);
      setIsConnecting(false);
      setIsAISpeaking(false);
      setCallDuration(0);
      setAudioLevel(0);
    };

    const handleSpeechStart = () => {
      setIsAISpeaking(true);
    };

    const handleSpeechEnd = () => {
      setIsAISpeaking(false);
    };

    const handleVolumeLevel = (volume: number) => {
      setAudioLevel(volume);
    };

    const handleError = (error: any) => {
      console.error('VAPI Error:', error);
      setError(`Call failed: ${error.message || 'Connection error'}`);
      setIsConnecting(false);
      setIsConnected(false);
    };

    // Register event listeners
    VAPIService.on('call-start', handleCallStart);
    VAPIService.on('call-end', handleCallEnd);
    VAPIService.on('speech-start', handleSpeechStart);
    VAPIService.on('speech-end', handleSpeechEnd);
    VAPIService.on('volume-level', handleVolumeLevel);
    VAPIService.on('error', handleError);

    return () => {
      // Clean up event listeners
      VAPIService.off('call-start', handleCallStart);
      VAPIService.off('call-end', handleCallEnd);
      VAPIService.off('speech-start', handleSpeechStart);
      VAPIService.off('speech-end', handleSpeechEnd);
      VAPIService.off('volume-level', handleVolumeLevel);
      VAPIService.off('error', handleError);
    };
  }, []);

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const handleStartCall = async () => {
    if (isConnecting || !vapiReady) return;
    
    setIsConnecting(true);
    setError(null);

    try {
      const result = await VAPIService.startCall();
      if (!result.success) {
        setError(result.message);
        setIsConnecting(false);
      }
    } catch (error) {
      console.error('Failed to start call:', error);
      setError('Failed to connect. Please try again.');
      setIsConnecting(false);
    }
  };

  const handleEndCall = async () => {
    try {
      await VAPIService.endCall();
    } catch (error) {
      console.error('Failed to end call:', error);
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

  const getCallStatusText = () => {
    if (isConnecting) return 'Connecting to AI...';
    if (isConnected && isAISpeaking) return 'AI is speaking...';
    if (isConnected) return 'Listening...';
    return 'Ready to connect';
  };

  const getButtonText = () => {
    if (isConnecting) return 'Connecting...';
    if (isConnected) return 'End Call';
    return 'Talk to AI Assistant';
  };

  return (
    <section className={`relative min-h-screen bg-white flex items-center justify-center overflow-hidden ${className}`}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
            Experience the Future of
            <br />
            <span className="relative">
              AI Communication
              <div className="absolute bottom-0 left-0 w-full h-1 bg-black"></div>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Connect instantly with our advanced AI assistant. Natural conversations, 
            intelligent responses, available 24/7.
          </p>
        </div>

        {/* Call Interface */}
        <div className="mb-12">
          {/* Status Display */}
          <div className="mb-8">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isConnected 
                ? 'bg-green-100 text-green-800' 
                : isConnecting 
                ? 'bg-yellow-100 text-yellow-800'
                : vapiReady
                ? 'bg-gray-100 text-gray-700'
                : 'bg-red-100 text-red-800'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isConnected 
                  ? 'bg-green-500 animate-pulse' 
                  : isConnecting
                  ? 'bg-yellow-500 animate-pulse'
                  : vapiReady
                  ? 'bg-gray-400'
                  : 'bg-red-500'
              }`}></div>
              <span>{getCallStatusText()}</span>
              {isConnected && (
                <span className="ml-2 text-xs bg-white px-2 py-1 rounded">
                  {formatDuration(callDuration)}
                </span>
              )}
            </div>
          </div>

          {/* Voice Waveform */}
          <div className="mb-8 h-16 flex items-center justify-center">
            <VoiceWaveform 
              isActive={isConnected || isConnecting}
              isAISpeaking={isAISpeaking}
              intensity={audioLevel}
              className="text-black w-64 h-12"
            />
          </div>

          {/* Main Call Button */}
          <div className="mb-8">
            <StarBorder
              onClick={isConnected ? handleEndCall : handleStartCall}
              disabled={!vapiReady || isConnecting}
              speed="medium"
              className={`text-xl transition-all duration-300 ${
                !vapiReady || isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              aria-label={isConnected ? 'End call with AI assistant' : 'Start call with AI assistant'}
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center space-x-3">
                {isConnecting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : isConnected ? (
                  <PhoneOff className="w-6 h-6" />
                ) : (
                  <Phone className="w-6 h-6" />
                )}
                <span>{getButtonText()}</span>
              </div>
            </StarBorder>
          </div>

          {/* Call Controls */}
          {isConnected && (
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={toggleMute}
                className={`p-3 rounded-full border-2 transition-all duration-300 ${
                  isMuted 
                    ? 'bg-red-600 border-red-600 text-white hover:bg-red-700' 
                    : 'bg-white border-black text-black hover:bg-black hover:text-white'
                }`}
                aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              <button
                className="p-3 rounded-full bg-white border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Volume control"
              >
                {audioLevel > 0.5 ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 max-w-md mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <div className="font-medium mb-1">Connection Error</div>
              <div className="text-sm">{error}</div>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="text-center">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-black mb-2">Instant Connection</h3>
            <p className="text-gray-600 text-sm">Connect with our AI assistant in seconds. No downloads or setup required.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-black mb-2">Natural Speech</h3>
            <p className="text-gray-600 text-sm">Speak naturally and get intelligent responses in real-time conversations.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-black mb-2">Crystal Clear Audio</h3>
            <p className="text-gray-600 text-sm">High-quality audio processing ensures every word is heard clearly.</p>
          </div>
        </div>

        {/* Technical Requirements */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Requires microphone access • Works in Chrome, Firefox, Safari, and Edge
          </p>
          <p className="mt-1">
            By using this service, you agree to our privacy policy and terms of use
          </p>
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-black rounded-full animate-pulse opacity-30"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-gray-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-black rounded-full animate-pulse opacity-20" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gray-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: '0.5s' }}></div>
    </section>
  );
};

export default AIPhoneHero;