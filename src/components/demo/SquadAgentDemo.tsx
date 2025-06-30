import React, { useState } from 'react';
import { Users, Settings, Phone, Shield } from 'lucide-react';
import SquadAgentButton from '../ui/SquadAgentButton';
import { validateSquadAgentConfig } from '../../config/environment';

/**
 * Demo component showcasing the SquadAgentButton in different configurations
 */
const SquadAgentDemo: React.FC = () => {
  const [events, setEvents] = useState<string[]>([]);
  const [showDebug, setShowDebug] = useState(false);

  const logEvent = (event: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEvents(prev => [`[${timestamp}] ${event}`, ...prev.slice(0, 9)]);
  };

  const handleCallStart = () => {
    logEvent('Squad agent call started');
  };

  const handleCallEnd = () => {
    logEvent('Squad agent call ended');
  };

  const handleError = (error: string) => {
    logEvent(`Error: ${error}`);
  };

  const isConfigured = validateSquadAgentConfig();

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Squad Agent Demo</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore different configurations of the SquadAgentButton component with team-based AI capabilities.
          </p>
          
          {/* Configuration Status */}
          <div className={`inline-flex items-center mt-6 px-4 py-2 rounded-full ${
            isConfigured ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <Shield className="w-4 h-4 mr-2" />
            {isConfigured ? 'Squad Agent Configured' : 'Squad Agent Not Configured'}
          </div>
        </div>

        {/* Demo Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Primary Large */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Primary Large
            </h3>
            <div className="flex justify-center">
              <SquadAgentButton
                size="lg"
                variant="primary"
                onCallStart={handleCallStart}
                onCallEnd={handleCallEnd}
                onError={handleError}
                debug={showDebug}
              />
            </div>
          </div>

          {/* Secondary Medium */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Secondary Medium</h3>
            <div className="flex justify-center">
              <SquadAgentButton
                size="md"
                variant="secondary"
                onCallStart={handleCallStart}
                onCallEnd={handleCallEnd}
                onError={handleError}
              />
            </div>
          </div>

          {/* Minimal Small */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Minimal Small</h3>
            <div className="flex justify-center">
              <SquadAgentButton
                size="sm"
                variant="minimal"
                onCallStart={handleCallStart}
                onCallEnd={handleCallEnd}
                onError={handleError}
              />
            </div>
          </div>

          {/* Custom Status Text */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Custom Status</h3>
            <div className="flex justify-center">
              <SquadAgentButton
                size="md"
                variant="primary"
                statusText="Connect to Team Squad"
                onCallStart={handleCallStart}
                onCallEnd={handleCallEnd}
                onError={handleError}
              />
            </div>
          </div>

          {/* No Status Text */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">No Status Text</h3>
            <div className="flex justify-center">
              <SquadAgentButton
                size="md"
                variant="primary"
                showStatus={false}
                onCallStart={handleCallStart}
                onCallEnd={handleCallEnd}
                onError={handleError}
              />
            </div>
          </div>

          {/* Disabled State */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Disabled State</h3>
            <div className="flex justify-center">
              <SquadAgentButton
                size="md"
                variant="primary"
                disabled={true}
                statusText="Currently Unavailable"
                onCallStart={handleCallStart}
                onCallEnd={handleCallEnd}
                onError={handleError}
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Demo Controls
            </h3>
            <button
              onClick={() => setShowDebug(!showDebug)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                showDebug 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {showDebug ? 'Hide Debug' : 'Show Debug'}
            </button>
          </div>
        </div>

        {/* Event Log */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Event Log</h3>
          <div className="bg-gray-50 rounded-lg p-4 h-48 overflow-y-auto">
            {events.length === 0 ? (
              <p className="text-gray-500">No events yet. Try interacting with the buttons above.</p>
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
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear Log
            </button>
          )}
        </div>

        {/* Usage Examples */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-6">Usage Examples</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">Basic Usage</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<SquadAgentButton 
  onCallStart={() => console.log('Call started')}
  onCallEnd={() => console.log('Call ended')}
/>`}
              </pre>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Advanced Configuration</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<SquadAgentButton
  size="lg"
  variant="primary"
  showStatus={true}
  statusText="Connect to Squad Team"
  onCallStart={() => trackEvent('squad_call_started')}
  onCallEnd={() => trackEvent('squad_call_ended')}
  onError={(error) => logError('Squad error:', error)}
  debug={isDevelopment}
/>`}
              </pre>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">With Error Handling</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`const [callError, setCallError] = useState(null);

<SquadAgentButton
  onError={(error) => {
    setCallError(error);
    showNotification('Call failed', 'error');
  }}
  onCallStart={() => setCallError(null)}
/>`}
              </pre>
            </div>
          </div>
        </div>

        {/* Configuration Requirements */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Configuration Requirements</h3>
          <div className="text-blue-800 space-y-2">
            <p>To use the SquadAgentButton, ensure the following environment variable is set:</p>
            <code className="block bg-blue-100 px-3 py-2 rounded mt-2">
              VITE_AGENT_SQUAD=your_squad_agent_id_here
            </code>
            <p className="text-sm">
              The component will automatically detect missing configuration and display appropriate error messages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquadAgentDemo;