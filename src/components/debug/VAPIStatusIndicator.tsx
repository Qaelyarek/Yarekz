import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, RefreshCw, Info } from 'lucide-react';
import { vapiDebugger } from '../../utils/debug';
import type { DebugInfo } from '../../utils/debug';

interface VAPIStatusIndicatorProps {
  className?: string;
}

const VAPIStatusIndicator: React.FC<VAPIStatusIndicatorProps> = ({ className = "" }) => {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const refreshStatus = async () => {
    setIsRefreshing(true);
    try {
      const info = await vapiDebugger.generateReport();
      setDebugInfo(info);
      vapiDebugger.logReport(info);
    } catch (error) {
      console.error('Failed to refresh VAPI status:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    refreshStatus();
  }, []);

  if (!debugInfo) {
    return (
      <div className={`flex items-center space-x-2 text-gray-500 ${className}`}>
        <RefreshCw className="w-4 h-4 animate-spin" />
        <span>Loading VAPI status...</span>
      </div>
    );
  }

  const getOverallStatus = () => {
    if (!debugInfo.environment.isConfigured) return 'error';
    if (!debugInfo.sdk.isLoaded) return 'error';
    if (!debugInfo.browser.hasWebRTC || !debugInfo.browser.hasMicrophone) return 'warning';
    return 'success';
  };

  const status = getOverallStatus();
  const StatusIcon = status === 'success' ? CheckCircle : AlertTriangle;
  const statusColor = status === 'success' ? 'text-green-600' : status === 'warning' ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className={`bg-white border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <StatusIcon className={`w-5 h-5 ${statusColor}`} />
          <span className="font-medium">VAPI Status</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Info className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={refreshStatus}
            disabled={isRefreshing}
            className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Configuration:</span>
            <span className={debugInfo.environment.isConfigured ? 'text-green-600' : 'text-red-600'}>
              {debugInfo.environment.isConfigured ? '✅' : '❌'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>SDK Loaded:</span>
            <span className={debugInfo.sdk.isLoaded ? 'text-green-600' : 'text-red-600'}>
              {debugInfo.sdk.isLoaded ? '✅' : '❌'}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>WebRTC:</span>
            <span className={debugInfo.browser.hasWebRTC ? 'text-green-600' : 'text-red-600'}>
              {debugInfo.browser.hasWebRTC ? '✅' : '❌'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Microphone:</span>
            <span className={debugInfo.browser.hasMicrophone ? 'text-green-600' : 'text-red-600'}>
              {debugInfo.browser.hasMicrophone ? '✅' : '❌'}
            </span>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="space-y-3 text-xs text-gray-600">
            <div>
              <div className="font-medium mb-1">Environment:</div>
              <div>Assistant ID: {debugInfo.environment.vapiAssistantId}</div>
              <div>Public Key: {debugInfo.environment.vapiPublicKey}</div>
            </div>
            <div>
              <div className="font-medium mb-1">SDK:</div>
              <div>Version: {debugInfo.sdk.version || 'Unknown'}</div>
              <div>Load Time: {debugInfo.sdk.loadTime}ms</div>
            </div>
            <div>
              <div className="font-medium mb-1">Network:</div>
              <div>Online: {debugInfo.network.isOnline ? 'Yes' : 'No'}</div>
              <div>Connection: {debugInfo.network.effectiveType}</div>
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          <div className="font-medium mb-1">Action Required:</div>
          {!debugInfo.environment.isConfigured && (
            <div>• Set VITE_VAPI_ASSISTANT_ID and VITE_VAPI_PUBLIC_KEY in your .env file</div>
          )}
          {!debugInfo.sdk.isLoaded && (
            <div>• Check VAPI SDK script loading in index.html</div>
          )}
          {!debugInfo.browser.hasWebRTC && (
            <div>• Use a WebRTC-compatible browser (Chrome, Firefox, Safari, Edge)</div>
          )}
        </div>
      )}
    </div>
  );
};

export default VAPIStatusIndicator;