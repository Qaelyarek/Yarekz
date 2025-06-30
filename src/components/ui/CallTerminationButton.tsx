import React, { useState, useEffect } from 'react';
import { PhoneOff } from 'lucide-react';
import { cn } from '../../utils';

interface CallTerminationButtonProps {
  /** Whether the button is visible */
  visible?: boolean;
  /** Callback fired when call termination is requested */
  onEndCall?: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show toast message after ending call */
  showToast?: boolean;
  /** Custom position (overrides default center-bottom) */
  position?: 'center-bottom' | 'custom';
}

interface ToastState {
  visible: boolean;
  message: string;
}

/**
 * CallTerminationButton - A prominent red button for ending active calls
 * 
 * Features:
 * - Circular 64px diameter with bright red background (#FF3B30)
 * - Material Icons call_end icon
 * - Press animations (scale + opacity)
 * - Haptic feedback support
 * - Toast notifications
 * - Full accessibility support
 * - High contrast mode compatibility
 */
const CallTerminationButton: React.FC<CallTerminationButtonProps> = ({
  visible = true,
  onEndCall,
  disabled = false,
  className,
  showToast = true,
  position = 'center-bottom',
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [toast, setToast] = useState<ToastState>({ visible: false, message: '' });

  /**
   * Trigger haptic feedback if supported
   */
  const triggerHapticFeedback = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // Short vibration
    }
    
    // For devices that support the Haptic API (experimental)
    if ('vibrate' in navigator && (navigator as any).vibrate) {
      try {
        (navigator as any).vibrate([50]);
      } catch (error) {
        // Fallback - silent fail
      }
    }
  };

  /**
   * Show toast notification
   */
  const showToastMessage = (message: string) => {
    setToast({ visible: true, message });
    
    // Auto-hide after 2 seconds
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 2000);
  };

  /**
   * Handle button press with full interaction sequence
   */
  const handlePress = () => {
    if (disabled) return;

    // Trigger haptic feedback
    triggerHapticFeedback();

    // Set pressed state for visual feedback
    setIsPressed(true);
    
    // Reset pressed state after animation
    setTimeout(() => setIsPressed(false), 150);

    // Execute callback
    onEndCall?.();

    // Show toast if enabled
    if (showToast) {
      setTimeout(() => {
        showToastMessage('Call ended');
      }, 100);
    }
  };

  /**
   * Handle keyboard interactions for accessibility
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePress();
    }
  };

  /**
   * Get button classes based on state and accessibility
   */
  const getButtonClasses = () => {
    return cn(
      // Base button styles - exact 64px diameter
      'relative w-16 h-16 rounded-full',
      'flex items-center justify-center',
      'cursor-pointer select-none',
      
      // Background color - exact #FF3B30
      'bg-[#FF3B30]',
      
      // Text and icon color
      'text-white',
      
      // Drop shadow - exact specification
      'shadow-[0px_2px_4px_rgba(0,0,0,0.2)]',
      
      // Transitions for smooth interactions
      'transition-all duration-200 ease-in-out',
      
      // Hover state (subtle enhancement)
      'hover:bg-[#FF2D1F] hover:shadow-[0px_4px_8px_rgba(0,0,0,0.25)]',
      
      // Focus state for accessibility - high contrast friendly
      'focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2',
      
      // Press state transformations
      isPressed && 'scale-95 opacity-80',
      
      // Disabled state
      disabled && 'opacity-50 cursor-not-allowed hover:bg-[#FF3B30] hover:shadow-[0px_2px_4px_rgba(0,0,0,0.2)]',
      
      // High contrast mode support
      'contrast-more:border-2 contrast-more:border-white',
      
      // Ensure minimum 44x44px touch target (already met with 64px)
      'min-w-[44px] min-h-[44px]',
      
      className
    );
  };

  /**
   * Get container positioning classes
   */
  const getContainerClasses = () => {
    if (position === 'custom') return '';
    
    return cn(
      // Fixed positioning for center-bottom
      'fixed left-1/2 transform -translate-x-1/2',
      'bottom-8', // 32px margin from bottom
      'z-[9999]', // Highest priority z-index
      
      // Ensure visibility
      'pointer-events-auto'
    );
  };

  /**
   * Get visibility classes with smooth transitions
   */
  const getVisibilityClasses = () => {
    return cn(
      'transition-all duration-300 ease-in-out',
      visible 
        ? 'opacity-100 scale-100 translate-y-0' 
        : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
    );
  };

  if (!visible) return null;

  return (
    <>
      {/* Main Button Container */}
      <div className={cn(getContainerClasses(), getVisibilityClasses())}>
        <div className="flex flex-col items-center space-y-2">
          {/* Call Termination Button */}
          <button
            onClick={handlePress}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className={getButtonClasses()}
            aria-label="End current call"
            role="button"
            tabIndex={0}
            type="button"
          >
            {/* Phone icon with diagonal line (call_end equivalent) */}
            <PhoneOff 
              className="w-6 h-6" 
              strokeWidth={2.5}
              aria-hidden="true"
            />
            
            {/* Pulse animation ring for active state */}
            <div className="absolute inset-0 rounded-full border-2 border-red-300 animate-ping opacity-0 group-hover:opacity-75" />
          </button>
          
          {/* Text Label */}
          <span className="text-sm font-medium text-gray-900 select-none">
            End Call
          </span>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[10000]">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-down">
            <div className="flex items-center space-x-2">
              <PhoneOff className="w-4 h-4" />
              <span className="font-medium">{toast.message}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CallTerminationButton;