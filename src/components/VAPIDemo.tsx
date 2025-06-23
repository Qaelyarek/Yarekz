import React from 'react';
import VAPIVoiceAssistant from './VAPIVoiceAssistant';

const VAPIDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Voice AI Assistant
          </h1>
          <p className="text-gray-600">
            Click the button below to start talking with our AI assistant
          </p>
        </div>

        <VAPIVoiceAssistant />

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Make sure to allow microphone access when prompted.
            The AI will respond naturally to your voice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VAPIDemo;