import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff } from 'lucide-react';
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

  const handleEnd = async () => {
    if (disabled || (!isConnecting && !isActive) || isProcessing) return;

    // Visual feedback - press animation
    setIsPressed(true);
    setIsProcessing(true);
    setError(null);

    // Haptic feedback if supported
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }

    try {
      // Execute call termination immediately
      await VAPIService.endCall();
      
      // Additional cleanup through callback
      await onEnd?.();
      
      // Reset press state after animation
      setTimeout(() => setIsPressed(false), 200);
      
    } catch (err) {
      setError('Failed to end call');
      console.error('Call end error:', err);
      setIsPressed(false);
    } finally {
      setTimeout(() => setIsProcessing(false), 300);
    }
  };

  const getStatusText = () => {
    if (error) return error;
    if (statusText) return statusText;
    if (isProcessing && isActive) return 'Ending call...';
    if (isProcessing && !isActive) return 'Connecting...';
    if (isConnecting) return 'Connecting to AI agent...';
    if (isActive) return `Call in progress (${VAPIService.formatCallDuration()})`;
    return 'Talk to our AI agent now';
  };

  const getStatusColor = () => {
    if (error) return 'text-red-600';
    if (isProcessing) return 'text-yellow-600';
    if (isConnecting) return 'text-gray-600';
    if (isActive) return 'text-green-700';
    return 'text-gray-700';
  };

  return (
    <div className={cn("flex flex-col items-center space-y-6", className)}>
      {/* Button Container */}
      <div className="relative flex items-center justify-center">
        {/* Accept/Start Call Button - PRESERVE ALL EXISTING STYLES */}
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
              // EXACT EXISTING CLASSES - DO NOT MODIFY
              "relative w-20 h-20 rounded-full bg-white border-3 border-black",
              "flex items-center justify-center",
              "transition-all duration-300 ease-in-out",
              "hover:bg-black hover:text-white hover:scale-110",
              "focus:outline-none focus:ring-4 focus:ring-gray-300",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
              "shadow-lg hover:shadow-xl",
              "group professional-call-button accepting",
              // Additional states for enhanced functionality
              isProcessing && "opacity-75"
            )}
            aria-label="Start call with AI agent"
          >
            {/* PRESERVE EXISTING PULSE ANIMATION */}
            <div className="absolute inset-0 rounded-full border-2 border-black opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
            
            <Phone className={cn(
              "w-8 h-8 transition-transform duration-300 group-hover:scale-110",
              isProcessing && "animate-pulse"
            )} />
          </button>
        </div>

        {/* End Call Button - ENHANCED WITH PROPER TERMINATION */}
        <div
          className={cn(
            "absolute transition-all duration-500 ease-in-out",
            showEndButton ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"
          )}
        >
          <button
            onClick={handleEnd}
            disabled={disabled || (!isConnecting && !isActive) || isProcessing}
            className={cn(
              // PRESERVE EXISTING STYLES WITH ENHANCEMENTS
              "relative w-20 h-20 rounded-full bg-black border-3 border-black",
              "flex items-center justify-center text-white",
              "transition-all duration-300 ease-in-out",
              "hover:bg-red-600 hover:border-red-600 hover:scale-110",
              "focus:outline-none focus:ring-4 focus:ring-red-300",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
              "shadow-lg hover:shadow-xl",
              "group professional-call-button ending",
              // Enhanced press states
              isPressed && "scale-95 bg-red-700 border-red-700",
              isProcessing && "opacity-75",
              // Error state
              error && "ring-2 ring-red-500"
            )}
            aria-label="End call"
          >
            {/* PRESERVE EXISTING PULSING EFFECTS FOR ACTIVE CALL */}
            {isActive && !isPressed && (
              <>
                <div className="absolute -inset-2 rounded-full border-2 border-red-500 animate-ping opacity-75" />
                <div className="absolute -inset-4 rounded-full border-2 border-red-400 animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
              </>
            )}
            
            {/* PRESERVE CONNECTING PULSE */}
            {isConnecting && !isPressed && (
              <div className="absolute -inset-2 rounded-full border-2 border-gray-400 animate-ping opacity-75" />
            )}
            
            {/* Processing state overlay */}
            {isProcessing && (
              <div className="absolute inset-0 rounded-full bg-yellow-500 opacity-20 animate-pulse" />
            )}
            
            <PhoneOff className={cn(
              "w-8 h-8 transition-transform duration-300 group-hover:scale-110",
              isPressed && "scale-90",
              isProcessing && "animate-pulse"
            )} />
          </button>
        </div>
      </div>

      {/* Status Text with Enhanced States */}
      <div className="text-center space-y-2">
        <p className={cn(
          "text-lg font-medium transition-all duration-300",
          getStatusColor()
        )}>
          {getStatusText()}
        </p>
        
        {/* Connection indicator with enhanced states */}
        {(isConnecting || isActive || isProcessing) && (
          <div className="flex items-center justify-center space-x-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              isProcessing ? "bg-yellow-500 animate-pulse" :
              isConnecting ? "bg-gray-500 animate-pulse" : 
              "bg-green-500 animate-pulse"
            )} />
            <span className="text-sm text-gray-600">
              {isProcessing && isActive ? "Ending call..." :
               isProcessing ? "Processing..." :
               isConnecting ? "Establishing connection..." : 
               "Connected"}
            </span>
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full">
            {error}
          </div>
        )}
      </div>

      {/* PRESERVE EXISTING MINIMALIST LINE DECORATION */}
      <div className={cn(
        "w-12 h-px bg-gray-300 transition-all duration-500",
        error && "bg-red-300"
      )} />
    </div>
  );
};

export default ProfessionalCallInterface;