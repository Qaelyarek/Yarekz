import React, { useState, useEffect } from 'react';
import { PhoneOff, Settings, Play } from 'lucide-react';
import CallTerminationButton from '../ui/CallTerminationButton';
import VAPIService from '../../ai-services/vapi-official';
import type { VAPICallState } from '../../ai-services/vapi-official';

/**
 * Demo page showcasing the CallTerminationButton component
 */
const CallTerminationDemo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showToast, setShowToast] = useState(true);
  const [position, setPosition] = useState<'center-bottom' | 'custom'>('center-bottom');
  const [events, setEvents] = useState<string[]>([]);
  const [callState, setCallState] = useState<VAPICallState>({
    inCall: false,
    isConnecting: false,
    callDuration: 0,
  });

  // Monitor VAPI call state
  useEffect(() => {
    const handleCallStateChanged = (newCallState: VAPICallState) => {
      setCallState(newCallState);
      
      const timestamp = new Date().toLocaleTimeString();
      if (newCallState.inCall && !callState.inCall) {
        setEvents(prev => [`[${timestamp}] Call started`, ...prev.slice(0, 9)]);
      } else if (!newCallState.inCall && callState.inCall) {
        setEvents(prev => [`[${timestamp}] Call ended via VAPI`, ...prev.slice(0, 9)]);
      }
    };

    VAPIService.on('call-state-changed', handleCallStateChanged);
    setCallState(VAPIService.getCallState());

    return () => {
      VAPIService.off('call-state-changed', handleCallStateChanged);
    };
  }, [callState.inCall]);

  const handleEndCall = () => {
    const timestamp = new Date().toLocaleTimeString();
    setEvents(prev => [`[${timestamp}] Call termination button pressed`, ...prev.slice(0, 9)]);
    
    // End the call if one is active
    if (callState.inCall) {
      VAPIService.endCall();
    }
  };

  const startMockCall = async () => {
    if (!callState.inCall && !callState.isConnecting) {
      const timestamp = new Date().toLocaleTimeString();
      setEvents(prev => [`[${timestamp}] Starting demo call...`, ...prev.slice(0, 9)]);
      
      try {
        await VAPIService.startCall();
      } catch (error) {
        setEvents(prev => [`[${timestamp}] Failed to start call: ${error}`, ...prev.slice(0, 9)]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <PhoneOff className="w-12 h-12 text-red-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Call Termination Button Demo</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A prominent, accessible call termination button with exact specifications for UI, interactions, 
            and functionality.
          </p>
        </div>

        {/* Live Demo Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Live Demo</h2>
            <div className="flex items-center space-x-4">
              {/* Start Demo Call Button */}
              <button
                onClick={startMockCall}
                disabled={callState.inCall || callState.isConnecting}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <Play className="w-4 h-4 mr-2" />
                {callState.isConnecting ? 'Connecting...' : callState.inCall ? 'Call Active' : 'Start Demo Call'}
              </button>
              
              {/* Call Status */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                callState.inCall 
                  ? 'bg-red-100 text-red-800' 
                  : callState.isConnecting 
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  callState.inCall 
                    ? 'bg-red-500 animate-pulse' 
                    : callState.isConnecting 
                    ? 'bg-yellow-500 animate-pulse'
                    : 'bg-gray-400'
                }`} />
                {callState.inCall 
                  ? `Call Active (${VAPIService.formatCallDuration()})` 
                  : callState.isConnecting 
                  ? 'Connecting...'
                  : 'No Active Call'
                }
              </div>
            </div>
          </div>

          {/* Demo Area */}
          <div className="relative h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-gray-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-medium text-gray-700 mb-2">Demo Area</div>
                <div className="text-sm text-gray-500">
                  {callState.inCall 
                    ? 'Call in progress - The red button should appear at the bottom center' 
                    : 'Start a demo call to see the call termination button'}
                </div>
              </div>
            </div>

            {/* Call Termination Button - Only show during active call */}
            {callState.inCall && (
              <CallTerminationButton
                visible={isVisible && callState.inCall}
                onEndCall={handleEndCall}
                showToast={showToast}
                position={position}
              />
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Demo Controls */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Demo Controls
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Button Visibility</label>
                <button
                  onClick={() => setIsVisible(!isVisible)}
                  className={`px-3 py-1 rounded ${
                    isVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {isVisible ? 'Visible' : 'Hidden'}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Toast Notifications</label>
                <button
                  onClick={() => setShowToast(!showToast)}
                  className={`px-3 py-1 rounded ${
                    showToast ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {showToast ? 'Enabled' : 'Disabled'}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Position</label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value as 'center-bottom' | 'custom')}
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="center-bottom">Center Bottom (Fixed)</option>
                  <option value="custom">Custom (Relative)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Event Log */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Event Log</h3>
            <div className="bg-gray-50 rounded-lg p-4 h-48 overflow-y-auto">
              {events.length === 0 ? (
                <p className="text-gray-500 text-sm">No events yet. Try interacting with the demo.</p>
              ) : (
                <div className="space-y-1">
                  {events.map((event, index) => (
                    <div key={index} className="text-sm font-mono text-gray-700">
                      {event}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {events.length > 0 && (
              <button
                onClick={() => setEvents([])}
                className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                Clear Log
              </button>
            )}
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6">Technical Specifications</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">UI Elements</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Circular shape: 64px diameter</li>
                <li>• Background: #FF3B30 (bright red)</li>
                <li>• Icon: Phone with diagonal line</li>
                <li>• Drop shadow: 0px 2px 4px rgba(0,0,0,0.2)</li>
                <li>• Text label: "End Call"</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Interactions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Press: Scale to 0.95x</li>
                <li>• Opacity: 1.0 → 0.8</li>
                <li>• Haptic feedback support</li>
                <li>• Single tap trigger</li>
                <li>• 200ms transition duration</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Functionality</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Disconnect active call</li>
                <li>• Clear call state</li>
                <li>• Smooth transitions</li>
                <li>• Toast: "Call ended" (2s)</li>
                <li>• State management</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Accessibility</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• aria-label support</li>
                <li>• High contrast mode</li>
                <li>• Min touch target: 44x44px</li>
                <li>• Keyboard navigation</li>
                <li>• Screen reader support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6">Usage Examples</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">Basic Usage</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<CallTerminationButton
  visible={isCallActive}
  onEndCall={handleEndCall}
/>`}
              </pre>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Advanced Configuration</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<CallTerminationButton
  visible={callState.inCall}
  onEndCall={() => {
    VAPIService.endCall();
    trackEvent('call_terminated_by_user');
    showNotification('Call ended', 'success');
  }}
  showToast={true}
  position="center-bottom"
  className="custom-styles"
/>`}
              </pre>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">With VAPI Integration</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`const [callState, setCallState] = useState(VAPIService.getCallState());

useEffect(() => {
  const handleCallStateChanged = (newState) => {
    setCallState(newState);
  };
  
  VAPIService.on('call-state-changed', handleCallStateChanged);
  return () => VAPIService.off('call-state-changed', handleCallStateChanged);
}, []);

return (
  <CallTerminationButton
    visible={callState.inCall}
    onEndCall={() => VAPIService.endCall()}
  />
);`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallTerminationDemo;