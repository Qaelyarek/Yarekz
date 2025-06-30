import React, { useState, useEffect, useCallback } from 'react';
import { PhoneOff, Users, AlertTriangle, Loader2 } from 'lucide-react';
import { cn } from '../../utils';
import { setAssistant } from '../../ai-services/vapiService';
import VAPIService from '../../ai-services/vapi-official';
import { env } from '../../config/environment';
import type { VAPICallState } from '../../ai-services/vapi-official';

/**
 * Props interface for the SquadAgentButton component
 */
interface SquadAgentButtonProps {
  /** Optional callback fired when call starts */
  onCallStart?: () => void;
  /** Optional callback fired when call ends */
  onCallEnd?: () => void;
  /** Optional callback fired when an error occurs */
  onError?: (error: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Button size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Button style variant */
  variant?: 'primary' | 'secondary' | 'minimal';
  /** Whether to show status text below button */
  showStatus?: boolean;
  /** Custom status text override */
  statusText?: string;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Show debug information */
  debug?: boolean;
}

/**
 * SquadAgentButton - A reusable button component for connecting to the Squad AI agent
 * 
 * This component provides a seamless interface for starting and ending calls with the
 * Squad agent type using the VAPI service. It includes proper error handling for
 * missing environment variables and follows the existing design system.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <SquadAgentButton onCallStart={() => console.log('Squad call started')} />
 * 
 * // With custom styling and callbacks
 * <SquadAgentButton
 *   size="lg"
 *   variant="primary"
 *   showStatus={true}
 *   onCallStart={() => trackEvent('squad_call_started')}
 *   onCallEnd={() => trackEvent('squad_call_ended')}
 *   onError={(error) => logError('Squad call error:', error)}
 * />
 * ```
 */
const SquadAgentButton: React.FC<SquadAgentButtonProps> = ({
  onCallStart,
  onCallEnd,
  onError,
  className,
  size = 'md',
  variant = 'primary',
  showStatus = true,
  statusText,
  disabled = false,
  debug = false,
}) => {
  // Component state
  const [callState, setCallState] = useState<VAPICallState>({
    inCall: false,
    isConnecting: false,
    callDuration: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Environment variable validation
  const squadAgentId = env.vapiAgentSquad;
  const hasValidConfig = Boolean(squadAgentId && squadAgentId !== 'your_squad_agent_id_here');

  /**
   * Initialize the component and validate configuration
   */
  useEffect(() => {
    const initializeComponent = async () => {
      // Validate Squad agent environment variable
      if (!hasValidConfig) {
        const errorMsg = 'Squad agent ID not configured. Please set VITE_AGENT_SQUAD in your environment variables.';
        setError(errorMsg);
        onError?.(errorMsg);
        return;
      }

      // Validate VAPI service configuration
      const vapiStatus = VAPIService.getStatus();
      if (!vapiStatus.initialized || !vapiStatus.configValid) {
        const errorMsg = 'VAPI service not properly configured. Please check your VAPI credentials.';
        setError(errorMsg);
        onError?.(errorMsg);
        return;
      }

      setIsInitialized(true);
      setError(null);

      if (debug) {
        console.log('SquadAgentButton initialized:', {
          squadAgentId: squadAgentId?.substring(0, 8) + '...',
          vapiStatus,
        });
      }
    };

    initializeComponent();
  }, [hasValidConfig, squadAgentId, onError, debug]);

  /**
   * Handle call state changes from VAPI service
   */
  const handleCallStateChanged = useCallback((newCallState: VAPICallState) => {
    setCallState(newCallState);

    // Trigger callbacks based on state changes
    if (newCallState.inCall && !callState.inCall) {
      onCallStart?.();
      if (debug) console.log('Squad call started');
    } else if (!newCallState.inCall && callState.inCall) {
      onCallEnd?.();
      if (debug) console.log('Squad call ended');
    }
  }, [callState.inCall, onCallStart, onCallEnd, debug]);

  /**
   * Handle VAPI errors
   */
  const handleVAPIError = useCallback((vapiError: any) => {
    const errorMsg = `Squad call error: ${vapiError.message || 'Unknown error'}`;
    setError(errorMsg);
    onError?.(errorMsg);
    
    if (debug) console.error('Squad VAPI error:', vapiError);
  }, [onError, debug]);

  // Set up VAPI event listeners
  useEffect(() => {
    VAPIService.on('call-state-changed', handleCallStateChanged);
    VAPIService.on('error', handleVAPIError);

    // Initialize call state
    setCallState(VAPIService.getCallState());

    return () => {
      VAPIService.off('call-state-changed', handleCallStateChanged);
      VAPIService.off('error', handleVAPIError);
    };
  }, [handleCallStateChanged, handleVAPIError]);

  /**
   * Start a call with the Squad agent
   */
  const handleStartCall = async () => {
    if (!isInitialized || !hasValidConfig || callState.isConnecting || disabled) {
      return;
    }

    try {
      setError(null);
      
      if (debug) console.log('Starting Squad agent call...');
      
      // Use the Squad agent specifically
      setAssistant('squad');
      
    } catch (error) {
      const errorMsg = `Failed to start Squad call: ${error instanceof Error ? error.message : 'Unknown error'}`;
      setError(errorMsg);
      onError?.(errorMsg);
      
      if (debug) console.error('Squad call start error:', error);
    }
  };

  /**
   * End the current call
   */
  const handleEndCall = async () => {
    if (!callState.inCall && !callState.isConnecting) return;

    try {
      if (debug) console.log('Ending Squad call...');
      
      await VAPIService.endCall();
      
    } catch (error) {
      const errorMsg = `Failed to end Squad call: ${error instanceof Error ? error.message : 'Unknown error'}`;
      setError(errorMsg);
      onError?.(errorMsg);
      
      if (debug) console.error('Squad call end error:', error);
    }
  };

  /**
   * Toggle call state (start or end)
   */
  const handleToggleCall = () => {
    if (callState.inCall || callState.isConnecting) {
      handleEndCall();
    } else {
      handleStartCall();
    }
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      button: 'w-12 h-12',
      icon: 'w-4 h-4',
      text: 'text-sm',
    },
    md: {
      button: 'w-16 h-16',
      icon: 'w-6 h-6',
      text: 'text-base',
    },
    lg: {
      button: 'w-20 h-20',
      icon: 'w-8 h-8',
      text: 'text-lg',
    },
  };

  // Variant configurations
  const variantConfig = {
    primary: {
      base: 'bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      active: 'bg-red-600 border-red-600 hover:bg-red-700 focus:ring-red-500',
      connecting: 'bg-yellow-500 border-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500',
    },
    secondary: {
      base: 'bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
      active: 'bg-red-600 border-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      connecting: 'bg-yellow-100 border-yellow-500 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-500',
    },
    minimal: {
      base: 'bg-transparent text-gray-700 border-2 border-gray-300 hover:bg-gray-100 focus:ring-gray-500',
      active: 'bg-red-600 border-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      connecting: 'bg-yellow-50 border-yellow-400 text-yellow-800 hover:bg-yellow-100 focus:ring-yellow-500',
    },
  };

  /**
   * Get button classes based on current state
   */
  const getButtonClasses = () => {
    const config = sizeConfig[size];
    const variants = variantConfig[variant];
    
    let stateClasses = variants.base;
    if (callState.isConnecting) {
      stateClasses = variants.connecting;
    } else if (callState.inCall) {
      stateClasses = variants.active;
    }

    return cn(
      // Base classes
      'relative rounded-full flex items-center justify-center',
      'transition-all duration-300 ease-in-out',
      'hover:scale-110 active:scale-95',
      'focus:outline-none focus:ring-4 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
      'shadow-lg hover:shadow-xl',
      'vapi-call-button group',
      
      // Size classes
      config.button,
      
      // State classes
      stateClasses,
      
      // Error state
      error && !hasValidConfig && 'border-red-500 bg-red-50 text-red-700',
      
      className
    );
  };

  /**
   * Get status text based on current state
   */
  const getStatusText = () => {
    if (statusText) return statusText;
    if (error) return 'Configuration Error';
    if (callState.isConnecting) return 'Connecting to Squad...';
    if (callState.inCall) return `Squad Call Active (${VAPIService.formatCallDuration()})`;
    return 'Talk to Squad Agent';
  };

  /**
   * Get status text color based on current state
   */
  const getStatusColor = () => {
    if (error) return 'text-red-600';
    if (callState.isConnecting) return 'text-yellow-600';
    if (callState.inCall) return 'text-green-600';
    return 'text-gray-700';
  };

  /**
   * Get appropriate icon based on current state
   */
  const getIcon = () => {
    const iconClass = sizeConfig[size].icon;
    
    if (callState.isConnecting) {
      return <Loader2 className={cn(iconClass, 'animate-spin')} />;
    }
    
    if (callState.inCall) {
      return <PhoneOff className={iconClass} />;
    }
    
    // Show Users icon for Squad agent to indicate team/group functionality
    return <Users className={iconClass} />;
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Main Button */}
      <button
        onClick={handleToggleCall}
        disabled={disabled || !hasValidConfig || !isInitialized}
        className={getButtonClasses()}
        data-vapi-call="true"
        aria-label={
          callState.inCall 
            ? 'End Squad agent call' 
            : callState.isConnecting 
            ? 'Connecting to Squad agent...' 
            : 'Start Squad agent call'
        }
      >
        {/* Pulsing animation for active call */}
        {callState.inCall && (
          <>
            <div className="absolute -inset-2 rounded-full border-2 border-red-400 animate-ping opacity-75" />
            <div className="absolute -inset-4 rounded-full border-2 border-red-300 animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
          </>
        )}
        
        {/* Connecting animation */}
        {callState.isConnecting && (
          <div className="absolute -inset-2 rounded-full border-2 border-yellow-400 animate-ping opacity-75" />
        )}
        
        {/* Icon */}
        <div className="relative z-10">
          {getIcon()}
        </div>
        
        {/* Error indicator */}
        {error && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-2 h-2 text-white" />
          </div>
        )}
      </button>

      {/* Status Text */}
      {showStatus && (
        <div className="text-center space-y-1">
          <p className={cn(
            'font-medium transition-colors duration-300',
            sizeConfig[size].text,
            getStatusColor()
          )}>
            {getStatusText()}
          </p>
          
          {/* Error message */}
          {error && (
            <p className="text-xs text-red-600 max-w-xs">
              {error}
            </p>
          )}
          
          {/* Debug info */}
          {debug && isInitialized && (
            <div className="text-xs text-gray-500 space-y-1">
              <div>Agent: Squad ({squadAgentId?.substring(0, 8)}...)</div>
              <div>State: {callState.inCall ? 'Active' : callState.isConnecting ? 'Connecting' : 'Idle'}</div>
              <div>Config Valid: {hasValidConfig ? '✅' : '❌'}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SquadAgentButton;