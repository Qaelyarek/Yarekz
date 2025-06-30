import React, { useState, useEffect, useCallback } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Loader2, MessageSquare, Send, AlertCircle } from 'lucide-react';
import VAPIService from '../../ai-services/vapi-official';
import VoiceWaveform from './VoiceWaveform';
import { setAssistant } from '../../ai-services/vapiService';
import type { VAPIMessage, VAPIMetrics } from '../../ai-services/vapi-official';

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
  // Call state
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
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

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  // Event handlers
  const handleCallStart = useCallback(() => {
    setIsConnected(true);
    setIsConnecting(false);
    setError(null);
    setTranscript([]);
    onCallStart?.();
  }, [onCallStart]);

  const handleCallEnd = useCallback(() => {
    setIsConnected(false);
    setIsConnecting(false);
    setIsMuted(false);
    setMetrics({});
    onCallEnd?.();
  }, [onCallEnd]);

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

  const handleError = useCallback((error: any) => {
    setError(`Connection error: ${error.message || 'Unknown error'}`);
    setIsConnecting(false);
  }, []);

  // Set up VAPI event listeners
  useEffect(() => {
    VAPIService.on('call-start', handleCallStart);
    VAPIService.on('call-end', handleCallEnd);
    VAPIService.on('message', handleMessage);
    VAPIService.on('volume-level', handleVolumeLevel);
    VAPIService.on('speech-start', handleSpeechStart);
    VAPIService.on('speech-end', handleSpeechEnd);
    VAPIService.on('error', handleError);

    return () => {
      VAPIService.off('call-start', handleCallStart);
      VAPIService.off('call-end', handleCallEnd);
      VAPIService.off('message', handleMessage);
      VAPIService.off('volume-level', handleVolumeLevel);
      VAPIService.off('speech-start', handleSpeechStart);
      VAPIService.off('speech-end', handleSpeechEnd);
      VAPIService.off('error', handleError);
    };
  }, [handleCallStart, handleCallEnd, handleMessage, handleVolumeLevel, handleSpeechStart, handleSpeechEnd, handleError]);

  // Call management with new vapi service
  const startCall = async () => {
    if (isConnecting || !vapiStatus.initialized) return;

    setIsConnecting(true);
    setError(null);

    try {
      // Use the new vapi service to start call with 'max' agent
      setAssistant('max');
    } catch (error) {
      console.error('Failed to start call:', error);
      setError('Failed to connect. Please try again.');
      setIsConnecting(false);
    }
  };

  const endCall = async () => {
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

  const sendTextMessage = async () => {
    if (!textMessage.trim() || !isConnected) return;

    try {
      await VAPIService.sendMessage(textMessage);
      
      // Add to transcript
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

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isAISpeaking = transcript.length > 0 && transcript[transcript.length - 1]?.role === 'assistant';

  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-green-500 animate-pulse' : 
              isConnecting ? 'bg-yellow-500 animate-pulse' : 
              'bg-gray-400'
            }`}></div>
            <h3 className="text-lg font-semibold text-gray-900">
              AI Assistant
            </h3>
            {isConnected && (
              <span className="text-sm text-gray-500">
                {formatDuration(callDuration)}
              </span>
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
            isActive={isConnected}
            isAISpeaking={isAISpeaking}
            intensity={metrics.audioLevel || 0}
            className="h-16 text-blue-600"
          />
          <div className="mt-2 text-sm text-gray-600">
            {isConnected ? (
              isAISpeaking ? 'AI is speaking...' : 
              metrics.isUserSpeaking ? 'You are speaking...' : 'Listening...'
            ) : (
              'Ready to connect'
            )}
          </div>
        </div>

        {/* Call Controls */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={isConnected ? endCall : startCall}
            disabled={isConnecting || !vapiStatus.initialized}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              isConnected
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isConnecting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isConnected ? (
              <PhoneOff className="w-5 h-5" />
            ) : (
              <Phone className="w-5 h-5" />
            )}
            <span>
              {isConnecting ? 'Connecting...' : isConnected ? 'End Call' : 'Start Call'}
            </span>
          </button>

          {isConnected && (
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
        {allowTextInput && isConnected && (
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
              <div>Connected: {isConnected ? 'Yes' : 'No'}</div>
              <div>Audio Level: {(metrics.audioLevel || 0).toFixed(2)}</div>
            </div>
            <div>
              <div>Muted: {isMuted ? 'Yes' : 'No'}</div>
              <div>Speaking: {metrics.isUserSpeaking ? 'Yes' : 'No'}</div>
              <div>Messages: {transcript.length}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VAPIPhoneInterface;