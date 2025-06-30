import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Loader2, AlertCircle } from 'lucide-react';
import VAPIService from '../../ai-services/vapi-official';
import type { VAPICallState } from '../../ai-services/vapi-official';

interface VAPICallButtonsProps {
  className?: string;
  showStatus?: boolean;
}

const VAPICallButtons: React.FC<VAPICallButtonsProps> = ({
  className = "",
  showStatus = true
}) => {
  const [callState, setCallState] = useState<VAPICallState>({
    inCall: false,
    isConnecting: false,
    callDuration: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('Ready to connect');

  // VAPI event listeners for call status tracking
  useEffect(() => {
    const handleCallStart = () => {
      console.log('📞 Call started event received');
      setStatusMessage('Call started successfully');
      setError(null);
    };

    const handleCallEnd = () => {
      console.log('📞 Call ended event received');
      setStatusMessage('Call ended');
      setError(null);
    };

    const handleCallStateChanged = (newCallState: VAPICallState) => {
      console.log('📱 Call state changed:', newCallState);
      setCallState(newCallState);
      
      if (newCallState.isConnecting) {
        setStatusMessage('Connecting to AI assistant...');
      } else if (newCallState.inCall) {
        setStatusMessage(`Call active (${VAPIService.formatCallDuration()})`);
      } else {
        setStatusMessage('Ready to connect');
      }
    };

    const handleError = (error: any) => {
      console.error('❌ VAPI error:', error);
      setError(`Error: ${error.message || 'Unknown error'}`);
      setStatusMessage('Connection failed');
    };

    // Set up VAPI event listeners
    VAPIService.on('call-start', handleCallStart);
    VAPIService.on('call-end', handleCallEnd);
    VAPIService.on('call-state-changed', handleCallStateChanged);
    VAPIService.on('error', handleError);

    // Initialize call state
    setCallState(VAPIService.getCallState());

    return () => {
      // Clean up event listeners
      VAPIService.off('call-start', handleCallStart);
      VAPIService.off('call-end', handleCallEnd);
      VAPIService.off('call-state-changed', handleCallStateChanged);
      VAPIService.off('error', handleError);
    };
  }, []);

  // Start Call function using VAPI.start() with assistant ID
  const handleStartCall = async () => {
    if (callState.isConnecting || callState.inCall) return;

    try {
      console.log('🚀 Starting VAPI call...');
      setError(null);
      setStatusMessage('Initiating call...');

      const result = await VAPIService.startCall();
      
      if (!result.success) {
        throw new Error(result.message);
      }

      console.log('✅ Call start initiated successfully');
      
    } catch (error) {
      console.error('❌ Failed to start call:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to start call';
      setError(errorMessage);
      setStatusMessage('Failed to connect');
    }
  };

  // Stop Call function using VAPI.stop()
  const handleStopCall = async () => {
    if (!callState.inCall && !callState.isConnecting) return;

    try {
      console.log('🛑 Stopping VAPI call...');
      setError(null);
      setStatusMessage('Ending call...');

      const result = await VAPIService.endCall();
      
      if (!result.success) {
        throw new Error(result.message);
      }

      console.log('✅ Call ended successfully');
      
    } catch (error) {
      console.error('❌ Failed to end call:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to end call';
      setError(errorMessage);
      setStatusMessage('Failed to end call');
    }
  };

  const getStatusColor = () => {
    if (error) return 'text-red-600';
    if (callState.isConnecting) return 'text-yellow-600';
    if (callState.inCall) return 'text-green-600';
    return 'text-gray-600';
  };

  return (
    <div className={`flex flex-col items-center space-y-6 ${className}`}>
      {/* Call Control Buttons */}
      <div className="flex items-center space-x-4">
        {/* Start Call Button */}
        <button
          id="start-call"
          onClick={handleStartCall}
          disabled={callState.isConnecting || callState.inCall}
          className={`
            flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold
            transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
            ${callState.inCall || callState.isConnecting
              ? 'bg-gray-300 text-gray-500'
              : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
            }
            focus:outline-none focus:ring-4 focus:ring-blue-300
          `}
          aria-label="Start call with VAPI assistant"
        >
          {callState.isConnecting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Phone className="w-5 h-5" />
              <span>Start Call</span>
            </>
          )}
        </button>

        {/* Stop Call Button */}
        <button
          id="stop-call"
          onClick={handleStopCall}
          disabled={!callState.inCall && !callState.isConnecting}
          className={`
            flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold
            transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
            ${callState.inCall || callState.isConnecting
              ? 'bg-red-600 hover:bg-red-700 text-white hover:scale-105'
              : 'bg-gray-300 text-gray-500'
            }
            focus:outline-none focus:ring-4 focus:ring-red-300
          `}
          aria-label="Stop current VAPI call"
        >
          <PhoneOff className="w-5 h-5" />
          <span>Stop Call</span>
        </button>
      </div>

      {/* Status Display */}
      {showStatus && (
        <div className="text-center space-y-2">
          {/* Call Status */}
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              callState.inCall ? 'bg-green-500 animate-pulse' :
              callState.isConnecting ? 'bg-yellow-500 animate-pulse' :
              'bg-gray-400'
            }`} />
            <span className={`font-medium ${getStatusColor()}`}>
              {statusMessage}
            </span>
          </div>

          {/* Call Duration */}
          {callState.inCall && (
            <div className="text-sm text-gray-600">
              Duration: {VAPIService.formatCallDuration()}
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Configuration Status */}
          <div className="text-xs text-gray-500">
            Assistant ID: {VAPIService.getStatus().assistantId.substring(0, 8)}...
          </div>
        </div>
      )}

      {/* Debug Information */}
      <div className="text-xs text-gray-400 text-center space-y-1">
        <div>VAPI SDK: {VAPIService.getStatus().initialized ? 'Initialized' : 'Not Ready'}</div>
        <div>Call State: {callState.inCall ? 'Active' : callState.isConnecting ? 'Connecting' : 'Idle'}</div>
      </div>
    </div>
  );
};

export default VAPICallButtons;