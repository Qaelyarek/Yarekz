import React, { useState, useEffect } from 'react';
import { Phone, PhoneCall, Mic, MicOff, PhoneOff, AlertTriangle, CheckCircle, Settings } from 'lucide-react';
import VoiceAnimator from './VoiceAnimator';
import VAPIService from '../../ai-services/vapi';
import VAPIStatusIndicator from '../debug/VAPIStatusIndicator';
import { vapiDebugger } from '../../utils/debug';
import type { VAPICallResult } from '../../ai-services/vapi';

interface AIPhoneCallerProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
  className?: string;
  showPhoneInput?: boolean;
  debugMode?: boolean;
}

const AIPhoneCaller: React.FC<AIPhoneCallerProps> = ({ 
  onConnect, 
  onDisconnect,
  className = "", 
  showPhoneInput = false,
  debugMode = false
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [vapiStatus, setVapiStatus] = useState(VAPIService.getStatus());
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);

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

  // VAPI event listeners
  useEffect(() => {
    const handleCallStart = () => {
      setIsConnected(true);
      setIsConnecting(false);
      setCallDuration(0);
      setError(null);
      onConnect?.();
    };

    const handleCallEnd = () => {
      setIsConnected(false);
      setIsConnecting(false);
      setIsAISpeaking(false);
      setCallDuration(0);
      onDisconnect?.();
    };

    const handleSpeechStart = () => {
      setIsAISpeaking(true);
    };

    const handleSpeechEnd = () => {
      setIsAISpeaking(false);
    };

    const handleError = (error: any) => {
      console.error('VAPI Error:', error);
      setError(`Connection error: ${error.message || 'Unknown error'}`);
      setIsConnecting(false);
    };

    // Set up event listeners
    VAPIService.on('call-start', handleCallStart);
    VAPIService.on('call-end', handleCallEnd);
    VAPIService.on('speech-start', handleSpeechStart);
    VAPIService.on('speech-end', handleSpeechEnd);
    VAPIService.on('error', handleError);

    return () => {
      // Clean up event listeners
      VAPIService.off('call-start', handleCallStart);
      VAPIService.off('call-end', handleCallEnd);
      VAPIService.off('speech-start', handleSpeechStart);
      VAPIService.off('speech-end', handleSpeechEnd);
      VAPIService.off('error', handleError);
    };
  }, [onConnect, onDisconnect]);

  // Check VAPI status periodically
  useEffect(() => {
    const checkStatus = () => {
      setVapiStatus(VAPIService.getStatus());
    };

    checkStatus();
    const interval = setInterval(checkStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleConnect = async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    setError(null);

    try {
      console.log('🔍 Testing VAPI configuration before connecting...');
      const testResult = await VAPIService.testConfiguration();
      
      if (!testResult.success) {
        setError(testResult.message);
        setIsConnecting(false);
        return;
      }

      console.log('📞 Attempting to start VAPI call...');
      const result: VAPICallResult = await VAPIService.startCall(phoneNumber || undefined);
      
      if (!result.success) {
        setError(result.message);
        setIsConnecting(false);
      }
      // Success will be handled by the call-start event
    } catch (error) {
      console.error('Connection error:', error);
      setError('Failed to connect to AI agent');
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      const result = await VAPIService.endCall();
      if (!result.success) {
        console.error('Disconnect error:', result.message);
      }
      // Success will be handled by the call-end event
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

  const getStatusIndicator = () => {
    if (!vapiStatus.sdkLoaded) {
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
    if (!vapiStatus.configValid) {
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    }
    if (vapiStatus.initialized) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <AlertTriangle className="w-4 h-4 text-gray-500" />;
  };

  const runDiagnostics = () => {
    vapiDebugger.runDiagnostics();
    setShowDebugPanel(true);
  };

  if (!isConnected) {
    return (
      <div className={`${className}`}>
        {debugMode && (
          <div className="mb-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIndicator()}
                <span className="font-medium text-sm">VAPI Status</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={runDiagnostics}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Run Diagnostics
                </button>
                <button
                  onClick={() => setShowDebugPanel(!showDebugPanel)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Settings className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
            
            {showDebugPanel && (
              <VAPIStatusIndicator />
            )}

            <div className="grid grid-cols-2 gap-4 p-3 bg-gray-100 rounded-lg text-xs text-gray-600">
              <div>
                <div>SDK Loaded: {vapiStatus.sdkLoaded ? '✅' : '❌'}</div>
                <div>Config Valid: {vapiStatus.configValid ? '✅' : '❌'}</div>
              </div>
              <div>
                <div>Initialized: {vapiStatus.initialized ? '✅' : '❌'}</div>
                <div>Assistant ID: {vapiStatus.assistantId.substring(0, 8)}...</div>
              </div>
            </div>
          </div>
        )}

        {showPhoneInput && (
          <div className="mb-4">
            <input
              type="tel"
              placeholder="Enter phone number (optional)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-blue-500"
              disabled={isConnecting}
            />
            <p className="text-xs text-gray-400 mt-1">
              Leave empty to use your device's microphone
            </p>
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium">Connection Error</div>
                <div>{error}</div>
                {debugMode && (
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => VAPIService.testConfiguration()}
                      className="text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                      Test Configuration
                    </button>
                    <button
                      onClick={runDiagnostics}
                      className="text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                      Run Full Diagnostics
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleConnect}
          disabled={isConnecting || !vapiStatus.initialized}
          className={`group relative bg-black text-white border-2 border-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:bg-white hover:text-black transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${className}`}
        >
          <div className="flex items-center justify-center space-x-4">
            <Phone className={`w-8 h-8 ${isConnecting ? 'animate-pulse' : 'group-hover:animate-pulse'}`} />
            <span>
              {isConnecting ? 'Connecting...' : 'Talk to Our AI Agent'}
            </span>
          </div>
          
          {/* Tech animation */}
          <div className="absolute inset-0 rounded-2xl border-2 border-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        </button>

        {debugMode && (
          <div className="mt-4 text-center text-xs text-gray-500">
            <div>Agent: {vapiStatus.assistantId}</div>
            <div>Key: {vapiStatus.publicKeyHash}</div>
            <div className="mt-2">
              <button
                onClick={() => (window as any).testVAPI?.()}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Quick Test
              </button>
              {' | '}
              <button
                onClick={() => console.log('VAPI Status:', vapiStatus)}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Log Status
              </button>
            </div>
          </div>
        )}
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
          
          {/* Dynamic animation based on AI speaking state */}
          <div className={`absolute inset-0 border-2 border-white rounded-full ${isAISpeaking ? 'animate-ping' : 'animate-pulse'} opacity-75`}></div>
          <div className={`absolute inset-0 border-4 border-gray-400 rounded-full ${isAISpeaking ? 'animate-pulse' : 'animate-ping'} opacity-50`} style={{ animationDelay: '0.5s' }}></div>
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

      {debugMode && (
        <div className="mt-4 text-center text-xs text-gray-400">
          <div>Status: {isAISpeaking ? 'Speaking' : 'Listening'}</div>
          <div>Muted: {isMuted ? 'Yes' : 'No'}</div>
          <div>Agent: {vapiStatus.assistantId}</div>
          <div>Duration: {formatDuration(callDuration)}</div>
        </div>
      )}
    </div>
  );
};

export default AIPhoneCaller;