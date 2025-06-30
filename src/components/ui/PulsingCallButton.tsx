import React from 'react';
import { Phone, PhoneOff } from 'lucide-react';
import { cn } from '../../utils';

interface PulsingCallButtonProps {
  isActive?: boolean;
  isConnecting?: boolean;
  onToggle?: () => void;
  disabled?: boolean;
  statusText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const PulsingCallButton: React.FC<PulsingCallButtonProps> = ({
  isActive = false,
  isConnecting = false,
  onToggle,
  disabled = false,
  statusText,
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16', 
    lg: 'w-20 h-20'
  };

  const iconSizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const getButtonClasses = () => {
    const baseClasses = `
      relative rounded-full flex items-center justify-center
      transition-all duration-300 ease-in-out
      focus:outline-none focus:ring-4 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      transform hover:scale-105 active:scale-95
      vapi-call-button
    `;

    let stateClasses = '';
    let ringClasses = '';

    if (isConnecting) {
      stateClasses = 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg connecting';
      ringClasses = 'focus:ring-yellow-500';
    } else if (isActive) {
      stateClasses = 'bg-red-600 hover:bg-red-700 text-white shadow-lg active';
      ringClasses = 'focus:ring-red-500';
    } else {
      stateClasses = 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg';
      ringClasses = 'focus:ring-blue-500';
    }

    return cn(
      baseClasses,
      sizeClasses[size],
      stateClasses,
      ringClasses,
      className
    );
  };

  const getRippleClasses = () => {
    if (!isActive && !isConnecting) return 'opacity-0';
    
    const baseRipple = 'absolute inset-0 rounded-full border-4 animate-ping';
    
    if (isConnecting) {
      return cn(baseRipple, 'border-yellow-400 opacity-75');
    }
    
    return cn(baseRipple, 'border-red-400 opacity-75');
  };

  const getSecondaryRippleClasses = () => {
    if (!isActive) return 'opacity-0';
    
    return cn(
      'absolute inset-0 rounded-full border-2 border-red-300 animate-ping opacity-50',
      'animation-delay-500'
    );
  };

  const getStatusTextColor = () => {
    if (isConnecting) return 'text-yellow-600';
    if (isActive) return 'text-red-600';
    return 'text-blue-600';
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <button
        onClick={onToggle}
        disabled={disabled}
        className={getButtonClasses()}
        data-vapi-call="true"
        aria-label={isActive ? 'End call' : isConnecting ? 'Connecting...' : 'Start call'}
      >
        {/* Primary ripple effect */}
        <div className={getRippleClasses()} />
        
        {/* Secondary ripple effect for active calls */}
        <div className={getSecondaryRippleClasses()} />
        
        {/* Glow effect for active calls */}
        {isActive && (
          <div className="absolute inset-0 rounded-full bg-red-600 opacity-20 animate-pulse" />
        )}
        
        {/* Icon */}
        <div className="relative z-10">
          {isActive ? (
            <PhoneOff className={iconSizeClasses[size]} />
          ) : (
            <Phone className={cn(
              iconSizeClasses[size],
              isConnecting && 'animate-pulse'
            )} />
          )}
        </div>
      </button>

      {/* Status text */}
      {statusText && (
        <div className={cn(
          'text-sm font-medium transition-colors duration-300',
          getStatusTextColor()
        )}>
          {statusText}
        </div>
      )}
      
      {/* Default status indicators */}
      {!statusText && (
        <div className={cn(
          'text-sm font-medium transition-colors duration-300',
          getStatusTextColor()
        )}>
          {isConnecting ? 'Connecting...' : isActive ? 'Call in progress' : 'Ready to call'}
        </div>
      )}
    </div>
  );
};

export default PulsingCallButton;