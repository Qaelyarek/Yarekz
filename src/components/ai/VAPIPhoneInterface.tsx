import React, { useState, useEffect, useCallback } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Loader2, MessageSquare, Send, AlertCircle, Clock } from 'lucide-react';
import VAPIService from '../../ai-services/vapi-official';
import VoiceWaveform from './VoiceWaveform';
import type { VAPIMessage, VAPIMetrics, VAPICallState } from '../../ai-services/vapi-official';

interface VAPIPhoneInterfaceProps {
  onCallStart?: () => void;
  onCallEnd?: () => void;
  className?: string;
  showTranscript?: boolean;
  allowTextInput?: boolean;
  debugMode?: boolean;
}

interface TranscriptEntry {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const VAPIPhoneInterface: React.FC<VAPIPhoneInterfaceProps> = ({
  onCallStart,
  onCallEnd,
  className = "",
  showTranscript = true,
  allowTextInput = false,
  debugMode = false,
}) => {
  // Call state from VAPI service
  const [callState, setCallState] = useState<VAPICallState>({
    inCall: false,
    isConnecting: false,
    callDuration: 0,
  });
  
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Audio and interaction state
  const [metrics, setMetrics] = useState<VAPIMetrics>({});
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [textMessage, setTextMessage] = useState('');

  // VAPI status
  const [vapiStatus, setVapiStatus] = useState(VAPIService.getStatus());

  // Update VAPI status periodically
  useEffect(() => {
    const updateStatus = () => setVapiStatus(VAPIService.getStatus());
    updateStatus();
    const interval = setInterval(updateStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  // Event handlers
  const handleCallStateChanged = useCallback((newCallState: VAPICallState) => {
    console.log('📱 Call state changed:', newCallState);
    setCallState(newCallState);
    
    if (newCallState.inCall && !callState.inCall) {
      setError(null);
      setTranscript([]);
      onCallStart?.();
    } else if (!newCallState.inCall && callState.inCall) {
      onCallEnd?.();
    }
  }, [callState.inCall, onCallStart, onCallEnd]);

  const handleMessage = useCallback((message: VAPIMessage) => {
    if (message.type === 'transcript' && message.transcript) {
      const entry: TranscriptEntry = {
        id: `${Date.now()}-${Math.random()}`,
        role: (message.role === 'system' ? 'assistant' : message.role) as 'assistant' | 'user',
        content: message.transcript,
        timestamp: new Date(),
      };
      setTranscript(prev => [...prev, entry]);
    }
  }, []);

  const handleVolumeLevel = useCallback((volume: number) => {
    setMetrics(prev => ({ ...prev, audioLevel: volume }));
  }, []);

  const handleSpeechStart = useCallback(() => {
    setMetrics(prev => ({ ...prev, isUserSpeaking: true }));
  }, []);

  const handleSpeechEnd = useCallback(() => {
    setMetrics(prev => ({ ...prev, isUserSpeaking: false }));
  }, []);

  const handleCallDurationUpdate = useCallback((duration: number) => {
    setCallState(prev => ({ ...prev, callDuration: duration }));
  }, []);

  const handleError = useCallback((error: any) => {
    setError(`Connection error: ${error.message || 'Unknown error'}`);
  }, []);

  // Set up VAPI event listeners
  useEffect(() => {
    VAPIService.on('call-state-changed', handleCallStateChanged);
    VAPIService.on('message', handleMessage);
    VAPIService.on('volume-level', handleVolumeLevel);
    VAPIService.on('speech-start', handleSpeechStart);
    VAPIService.on('speech-end', handleSpeechEnd);
    VAPIService.on('call-duration-updated', handleCallDurationUpdate);
    VAPIService.on('error', handleError);

    // Initialize call state from service
    setCallState(VAPIService.getCallState());

    return () => {
      VAPIService.off('call-state-changed', handleCallStateChanged);
      VAPIService.off('message', handleMessage);
      VAPIService.off('volume-level', handleVolumeLevel);
      VAPIService.off('speech-start', handleSpeechStart);
      VAPIService.off('speech-end', handleSpeechEnd);
      VAPIService.off('call-duration-updated', handleCallDurationUpdate);
      VAPIService.off('error', handleError);
    };
  }, [handleCallStateChanged, handleMessage, handleVolumeLevel, handleSpeechStart, handleSpeechEnd, handleCallDurationUpdate, handleError]);

  // IMMEDIATE CALL TERMINATION - NO DELAYS
  const endCall = async () => {
    try {
      console.log('🔴 IMMEDIATE: Terminating call NOW...');
      const result = await VAPIService.endCall();
      if (result.success) {
        console.log('✅ IMMEDIATE: Call terminated successfully');
      } else {
        console.error('❌ IMMEDIATE: Call termination failed:', result.message);
        setError('Failed to end call');
      }
    } catch (error) {
      console.error('❌ IMMEDIATE: Exception during call termination:', error);
      setError('Failed to end call');
    }
  };

  const startCall = async () => {
    if (callState.isConnecting || !vapiStatus.initialized) return;

    setError(null);

    try {
      await VAPIService.startCall();
    } catch (error) {
      console.error('Failed to start call:', error);
      setError('Failed to connect. Please try again.');
    }
  };

  const toggleMute = () => {
    VAPIService.toggleMute();
    setIsMuted(VAPIService.isMuted());
  };

  const sendTextMessage = async () => {
    if (!textMessage.trim() || !callState.inCall) return;

    try {
      await VAPIService.sendMessage(textMessage);
      
      const entry: TranscriptEntry = {
        id: `${Date.now()}-${Math.random()}`,
        role: 'user',
        content: textMessage,
        timestamp: new Date(),
      };
      setTranscript(prev => [...prev, entry]);
      setTextMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const getCallStateDisplay = () => {
    if (callState.isConnecting) return 'Connecting...';
    if (callState.inCall) return 'Connected';
    return 'Ready';
  };

  const getCallStateColor = () => {
    if (callState.isConnecting) return 'bg-yellow-500';
    if (callState.inCall) return 'bg-green-500';
    return 'bg-gray-400';
  };

  const getButtonClasses = () => {
    let baseClasses = "flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed vapi-call-button";
    
    if (callState.isConnecting) {
      baseClasses += " connecting bg-yellow-500 text-white";
    } else if (callState.inCall) {
      baseClasses += " active bg-red-600 hover:bg-red-700 text-white";
    } else {
      baseClasses += " bg-blue-600 hover:bg-blue-700 text-white";
    }
    
    return baseClasses;
  };

  const isAISpeaking = transcript.length > 0 && 
    transcript[transcript.length - 1]?.role === 'assistant';

  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full animate-pulse ${getCallStateColor()}`}></div>
            <h3 className="text-lg font-semibold text-gray-900">
              AI Assistant
            </h3>
            <span className="text-sm text-gray-500">
              {getCallStateDisplay()}
            </span>
            {callState.inCall && (
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{VAPIService.formatCallDuration()}</span>
              </div>
            )}
          </div>

          {debugMode && (
            <div className="text-xs text-gray-500">
              Status: {vapiStatus.initialized ? '✅' : '❌'} | 
              Config: {vapiStatus.configValid ? '✅' : '❌'}
            </div>
          )}
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-700">{error}</div>
            </div>
          </div>
        )}
      </div>

      {/* Voice Interface */}
      <div className="p-6">
        {/* Voice Visualization */}
        <div className="text-center mb-6">
          <VoiceWaveform
            isActive={callState.inCall}
            isAISpeaking={isAISpeaking}
            intensity={metrics.audioLevel || 0}
            className="h-16 text-blue-600"
          />
          <div className="mt-2 text-sm text-gray-600">
            {callState.inCall ? (
              isAISpeaking ? 'AI is speaking...' : 
              metrics.isUserSpeaking ? 'You are speaking...' : 'Listening...'
            ) : callState.isConnecting ? (
              'Connecting to AI...'
            ) : (
              'Ready to connect'
            )}
          </div>
        </div>

        {/* WORKING CALL CONTROLS */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={callState.inCall ? endCall : startCall}
            disabled={callState.isConnecting || !vapiStatus.initialized}
            className={getButtonClasses()}
            data-vapi-call="true"
          >
            {callState.isConnecting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : callState.inCall ? (
              <PhoneOff className="w-5 h-5" />
            ) : (
              <Phone className="w-5 h-5" />
            )}
            <span>
              {callState.isConnecting ? 'Connecting...' : 
               callState.inCall ? 'End Call' : 'Start Call'}
            </span>
          </button>

          {callState.inCall && (
            <button
              onClick={toggleMute}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                isMuted
                  ? 'bg-red-100 border-red-300 text-red-700 hover:bg-red-200'
                  : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          )}
        </div>

        {/* Transcript */}
        {showTranscript && transcript.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <MessageSquare className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Conversation</span>
            </div>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {transcript.map((entry) => (
                <div
                  key={entry.id}
                  className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      entry.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {entry.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Text Input */}
        {allowTextInput && callState.inCall && (
          <div className="flex space-x-2">
            <input
              type="text"
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendTextMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={sendTextMessage}
              disabled={!textMessage.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Debug Info */}
      {debugMode && (
        <div className="border-t border-gray-200 p-4 bg-gray-50 text-xs text-gray-600">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div>Assistant: {vapiStatus.assistantId.substring(0, 12)}...</div>
              <div>In Call: {callState.inCall ? 'Yes' : 'No'}</div>
              <div>Connecting: {callState.isConnecting ? 'Yes' : 'No'}</div>
            </div>
            <div>
              <div>Muted: {isMuted ? 'Yes' : 'No'}</div>
              <div>Duration: {VAPIService.formatCallDuration()}</div>
              <div>Messages: {transcript.length}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VAPIPhoneInterface;