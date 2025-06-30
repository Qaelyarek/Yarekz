import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '../../utils';
import VAPIService from '../../ai-services/vapi-official';

interface ProfessionalCallInterfaceProps {
  isActive?: boolean;
  isConnecting?: boolean;
  onAccept?: () => void;
  onEnd?: () => void;
  disabled?: boolean;
  statusText?: string;
  className?: string;
}

interface DisconnectState {
  isTerminating: boolean;
  showConfirmation: boolean;
  confirmationMessage: string;
}

const ProfessionalCallInterface: React.FC<ProfessionalCallInterfaceProps> = ({
  isActive = false,
  isConnecting = false,
  onAccept,
  onEnd,
  disabled = false,
  statusText,
  className
}) => {
  const [showEndButton, setShowEndButton] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disconnectState, setDisconnectState] = useState<DisconnectState>({
    isTerminating: false,
    showConfirmation: false,
    confirmationMessage: ''
  });

  // Show end button when call is active or connecting
  useEffect(() => {
    if (isActive || isConnecting) {
      const timer = setTimeout(() => setShowEndButton(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowEndButton(false);
    }
  }, [isActive, isConnecting]);

  // Clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Auto-hide confirmation after 3 seconds
  useEffect(() => {
    if (disconnectState.showConfirmation) {
      const timer = setTimeout(() => {
        setDisconnectState(prev => ({
          ...prev,
          showConfirmation: false,
          confirmationMessage: ''
        }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [disconnectState.showConfirmation]);

  const handleAccept = async () => {
    if (disabled || isConnecting || isActive || isProcessing) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      await onAccept?.();
    } catch (err) {
      setError('Failed to start call');
      console.error('Call start error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDisconnect = async () => {
    if (disabled || (!isConnecting && !isActive) || disconnectState.isTerminating) return;

    // Set terminating state immediately
    setDisconnectState(prev => ({ ...prev, isTerminating: true }));
    
    // Visual feedback - press animation
    setIsPressed(true);
    setIsProcessing(true);
    setError(null);

    // Haptic feedback if supported
    if ('vibrate' in navigator) {
      navigator.vibrate([50]); // Single vibration pulse
    }

    try {
      console.log('🔴 DISCONNECT: Initiating call termination...');
      
      // Step 1: Immediately terminate the VAPI agent connection
      const result = await VAPIService.endCall();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to terminate call');
      }

      console.log('✅ DISCONNECT: VAPI agent connection terminated successfully');
      
      // Step 2: Execute additional cleanup through callback
      if (onEnd) {
        await onEnd();
        console.log('✅ DISCONNECT: Additional cleanup completed');
      }

      // Step 3: Show immediate confirmation
      setDisconnectState({
        isTerminating: false,
        showConfirmation: true,
        confirmationMessage: 'Call ended'
      });

      console.log('✅ DISCONNECT: All termination steps completed successfully');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to end call';
      setError(errorMessage);
      console.error('❌ DISCONNECT: Call termination failed:', err);
      
      // Show error state in disconnect confirmation
      setDisconnectState({
        isTerminating: false,
        showConfirmation: true,
        confirmationMessage: 'Disconnection failed - Please try again'
      });
    } finally {
      // Reset visual states
      setTimeout(() => {
        setIsPressed(false);
        setIsProcessing(false);
        setDisconnectState(prev => ({ ...prev, isTerminating: false }));
      }, 300);
    }
  };

  const getStatusText = () => {
    if (disconnectState.showConfirmation) return disconnectState.confirmationMessage;
    if (disconnectState.isTerminating) return 'Ending call...';
    if (error) return error;
    if (statusText) return statusText;
    if (isProcessing && isActive) return 'Processing...';
    if (isProcessing && !isActive) return 'Connecting...';
    if (isConnecting) return 'Connecting to AI agent...';
    if (isActive) return `Call in progress (${VAPIService.formatCallDuration()})`;
    return 'Talk to our AI agent now';
  };

  const getStatusColor = () => {
    if (disconnectState.showConfirmation) {
      return disconnectState.confirmationMessage.includes('failed') ? 'text-red-600' : 'text-green-600';
    }
    if (disconnectState.isTerminating) return 'text-yellow-600';
    if (error) return 'text-red-600';
    if (isProcessing) return 'text-yellow-600';
    if (isConnecting) return 'text-gray-600';
    if (isActive) return 'text-green-700';
    return 'text-gray-700';
  };

  const getStatusIcon = () => {
    if (disconnectState.showConfirmation) {
      return disconnectState.confirmationMessage.includes('failed') ? 
        <AlertCircle className="w-4 h-4 text-red-600" /> : 
        <CheckCircle className="w-4 h-4 text-green-600" />;
    }
    if (error) return <AlertCircle className="w-4 h-4 text-red-600" />;
    return null;
  };

  return (
    <div className={cn("flex flex-col items-center space-y-6", className)}>
      {/* Button Container */}
      <div className="relative flex items-center justify-center">
        {/* Accept/Start Call Button */}
        <div
          className={cn(
            "relative transition-all duration-500 ease-in-out",
            (isActive || isConnecting || showEndButton) ? "opacity-0 scale-0 pointer-events-none" : "opacity-100 scale-100"
          )}
        >
          <button
            onClick={handleAccept}
            disabled={disabled || isConnecting || isActive || isProcessing}
            className={cn(
              "relative w-20 h-20 rounded-full bg-white border-3 border-black",
              "flex items-center justify-center",
              "transition-all duration-300 ease-in-out",
              "hover:bg-black hover:text-white hover:scale-110",
              "focus:outline-none focus:ring-4 focus:ring-gray-300",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
              "shadow-lg hover:shadow-xl",
              "group professional-call-button accepting",
              isProcessing && "opacity-75"
            )}
            aria-label="Start call with AI agent"
          >
            <div className="absolute inset-0 rounded-full border-2 border-black opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
            <Phone className={cn(
              "w-8 h-8 transition-transform duration-300 group-hover:scale-110",
              isProcessing && "animate-pulse"
            )} />
          </button>
        </div>

        {/* PROMINENT DISCONNECT BUTTON - Enhanced for immediate termination */}
        <div
          className={cn(
            "absolute transition-all duration-500 ease-in-out",
            showEndButton ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"
          )}
        >
          <button
            onClick={handleDisconnect}
            disabled={disabled || (!isConnecting && !isActive) || disconnectState.isTerminating}
            className={cn(
              // Enhanced prominence and visibility
              "relative w-24 h-24 rounded-full", // Larger size for prominence
              "flex items-center justify-center text-white",
              "transition-all duration-200 ease-in-out",
              "focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
              "shadow-xl hover:shadow-2xl", // Enhanced shadows
              "group professional-call-button ending",
              "transform hover:scale-110", // More prominent hover effect
              
              // Enhanced color states for immediate feedback
              disconnectState.isTerminating ? "bg-red-800 border-red-800 scale-95" :
              isPressed ? "bg-red-700 border-red-700 scale-95" :
              "bg-red-600 border-red-600 hover:bg-red-700",
              
              // Enhanced border for visibility
              "border-4 border-red-600 hover:border-red-700",
              
              // Error state enhancement
              error && "ring-4 ring-red-500 ring-opacity-50"
            )}
            aria-label="Disconnect call immediately"
          >
            {/* Enhanced pulsing effects for active call */}
            {isActive && !isPressed && !disconnectState.isTerminating && (
              <>
                <div className="absolute -inset-3 rounded-full border-3 border-red-400 animate-ping opacity-75" />
                <div className="absolute -inset-6 rounded-full border-2 border-red-300 animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
                <div className="absolute -inset-9 rounded-full border-1 border-red-200 animate-ping opacity-25" style={{ animationDelay: '1s' }} />
              </>
            )}
            
            {/* Terminating state animation */}
            {disconnectState.isTerminating && (
              <div className="absolute inset-0 rounded-full bg-yellow-500 opacity-30 animate-pulse" />
            )}
            
            <PhoneOff className={cn(
              "w-10 h-10 transition-transform duration-200", // Larger icon
              isPressed && "scale-90",
              disconnectState.isTerminating ? "animate-pulse" : "group-hover:scale-110"
            )} />
          </button>
        </div>
      </div>

      {/* Enhanced Status Display with Confirmation */}
      <div className="text-center space-y-3 min-h-[80px] flex flex-col justify-center">
        {/* Main Status Text */}
        <div className="flex items-center justify-center space-x-2">
          {getStatusIcon()}
          <p className={cn(
            "text-lg font-medium transition-all duration-300",
            getStatusColor()
          )}>
            {getStatusText()}
          </p>
        </div>
        
        {/* Connection/Termination Indicator */}
        {(isConnecting || isActive || disconnectState.isTerminating || disconnectState.showConfirmation) && (
          <div className="flex items-center justify-center space-x-2">
            <div className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              disconnectState.showConfirmation ? (
                disconnectState.confirmationMessage.includes('failed') ? 
                "bg-red-500" : "bg-green-500"
              ) :
              disconnectState.isTerminating ? "bg-red-500 animate-pulse" :
              isActive ? "bg-green-500 animate-pulse" :
              "bg-yellow-500 animate-pulse"
            )} />
            <span className="text-sm font-medium text-gray-700">
              {disconnectState.showConfirmation ? (
                disconnectState.confirmationMessage.includes('failed') ? 
                "Disconnection failed" : "Successfully disconnected"
              ) :
              disconnectState.isTerminating ? "Terminating connection..." :
              isActive ? "Connected and active" :
              "Establishing connection..."}
            </span>
          </div>
        )}

        {/* Enhanced Error Display */}
        {error && !disconnectState.showConfirmation && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 max-w-sm">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Disconnect Instructions (when call is active) */}
        {isActive && !disconnectState.isTerminating && !disconnectState.showConfirmation && (
          <div className="text-xs text-gray-500 max-w-xs">
            Click the red button to immediately end the call
          </div>
        )}
      </div>

      {/* Enhanced Visual Separator */}
      <div className={cn(
        "w-16 h-px transition-all duration-500",
        disconnectState.showConfirmation ? (
          disconnectState.confirmationMessage.includes('failed') ? 
          "bg-red-300" : "bg-green-300"
        ) :
        error ? "bg-red-300" :
        isActive ? "bg-green-300" :
        "bg-gray-300"
      )} />
    </div>
  );
};

export default ProfessionalCallInterface;