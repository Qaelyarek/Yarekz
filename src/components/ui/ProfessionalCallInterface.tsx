import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff } from 'lucide-react';
import { cn } from '../../utils';

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

  // Show end button when call is active or connecting
  useEffect(() => {
    if (isActive || isConnecting) {
      const timer = setTimeout(() => setShowEndButton(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowEndButton(false);
    }
  }, [isActive, isConnecting]);

  const handleAccept = () => {
    if (!disabled && !isConnecting && !isActive) {
      onAccept?.();
    }
  };

  const handleEnd = () => {
    if (!disabled && (isConnecting || isActive)) {
      onEnd?.();
    }
  };

  const getStatusText = () => {
    if (statusText) return statusText;
    if (isConnecting) return 'Connecting to AI agent...';
    if (isActive) return 'Call in progress';
    return 'Talk to our AI agent now';
  };

  const getStatusColor = () => {
    if (isConnecting) return 'text-gray-600';
    if (isActive) return 'text-gray-800';
    return 'text-gray-700';
  };

  return (
    <div className={cn("flex flex-col items-center space-y-6", className)}>
      {/* Button Container */}
      <div className="relative flex items-center justify-center">
        {/* Accept/Start Call Button */}
        <div
          className={cn(
            "relative transition-all duration-500 ease-in-out",
            isActive || isConnecting ? "opacity-0 scale-0 pointer-events-none" : "opacity-100 scale-100"
          )}
        >
          <button
            onClick={handleAccept}
            disabled={disabled || isConnecting || isActive}
            className={cn(
              "relative w-20 h-20 rounded-full bg-white border-3 border-black",
              "flex items-center justify-center",
              "transition-all duration-300 ease-in-out",
              "hover:bg-black hover:text-white hover:scale-110",
              "focus:outline-none focus:ring-4 focus:ring-gray-300",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
              "shadow-lg hover:shadow-xl",
              "group"
            )}
            aria-label="Start call with AI agent"
          >
            {/* Subtle pulse animation on hover */}
            <div className="absolute inset-0 rounded-full border-2 border-black opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
            
            <Phone className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
          </button>
        </div>

        {/* End Call Button */}
        <div
          className={cn(
            "absolute transition-all duration-500 ease-in-out",
            showEndButton ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"
          )}
        >
          <button
            onClick={handleEnd}
            disabled={disabled || (!isConnecting && !isActive)}
            className={cn(
              "relative w-20 h-20 rounded-full bg-black border-3 border-black",
              "flex items-center justify-center text-white",
              "transition-all duration-300 ease-in-out",
              "hover:bg-red-600 hover:border-red-600 hover:scale-110",
              "focus:outline-none focus:ring-4 focus:ring-red-300",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
              "shadow-lg hover:shadow-xl",
              "group"
            )}
            aria-label="End call"
          >
            {/* Pulsing effect for active call */}
            {isActive && (
              <>
                <div className="absolute -inset-2 rounded-full border-2 border-red-500 animate-ping opacity-75" />
                <div className="absolute -inset-4 rounded-full border-2 border-red-400 animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
              </>
            )}
            
            {/* Connecting pulse */}
            {isConnecting && (
              <div className="absolute -inset-2 rounded-full border-2 border-gray-400 animate-ping opacity-75" />
            )}
            
            <PhoneOff className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
          </button>
        </div>
      </div>

      {/* Status Text */}
      <div className="text-center space-y-2">
        <p className={cn(
          "text-lg font-medium transition-all duration-300",
          getStatusColor()
        )}>
          {getStatusText()}
        </p>
        
        {/* Connection indicator */}
        {(isConnecting || isActive) && (
          <div className="flex items-center justify-center space-x-2">
            <div className={cn(
              "w-2 h-2 rounded-full animate-pulse",
              isConnecting ? "bg-gray-500" : "bg-green-500"
            )} />
            <span className="text-sm text-gray-600">
              {isConnecting ? "Establishing connection..." : "Connected"}
            </span>
          </div>
        )}
      </div>

      {/* Minimalist line decoration */}
      <div className="w-12 h-px bg-gray-300 transition-all duration-500" />
    </div>
  );
};

export default ProfessionalCallInterface;