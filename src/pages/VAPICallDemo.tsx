import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Settings } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import VAPICallButtons from '../components/demo/VAPICallButtons';

const VAPICallDemo: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>VAPI Call Demo - Start & Stop Call Buttons</title>
        <meta name="description" content="Test VAPI call functionality with dedicated start and stop call buttons." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Navigation Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-600 hover:text-black transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Header */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">VAPI Call Demo</h1>
            <p className="text-lg text-gray-600 mb-6">
              Test the VAPI call functionality with dedicated Start Call and Stop Call buttons.
            </p>
            <div className="text-sm text-gray-500">
              Features call status tracking, error handling, and real-time feedback.
            </div>
          </div>
        </section>

        {/* Main Demo Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  VAPI Call Controls
                </h2>
                <p className="text-gray-600">
                  Use the buttons below to start and stop calls with the VAPI assistant.
                </p>
              </div>

              {/* VAPI Call Buttons Component */}
              <VAPICallButtons 
                className="mx-auto"
                showStatus={true}
              />
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-2" />
                How to Use
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                  <div>
                    <strong>Click "Start Call"</strong> to initiate a connection with the VAPI assistant. 
                    The button will show "Connecting..." while establishing the connection.
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                  <div>
                    <strong>Allow microphone access</strong> when prompted by your browser. 
                    This is required for voice communication with the AI assistant.
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                  <div>
                    <strong>Speak naturally</strong> once connected. The AI assistant will respond 
                    to your voice and engage in conversation.
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">4</div>
                  <div>
                    <strong>Click "Stop Call"</strong> to immediately terminate the connection 
                    and end the conversation with the assistant.
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Settings className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-blue-800">
                    <strong>Technical Details:</strong>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Start Call uses <code>VAPI.start()</code> with the configured assistant ID</li>
                      <li>• Stop Call uses <code>VAPI.stop()</code> to terminate the connection</li>
                      <li>• Event listeners track 'call-start' and 'call-end' events for status updates</li>
                      <li>• Real-time call duration tracking and error handling included</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Implementation Code</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Start Call Function</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`const handleStartCall = async () => {
  try {
    console.log('🚀 Starting VAPI call...');
    const result = await VAPIService.startCall();
    
    if (!result.success) {
      throw new Error(result.message);
    }
    
    console.log('✅ Call started successfully');
  } catch (error) {
    console.error('❌ Failed to start call:', error);
    setError(error.message);
  }
};`}
                  </pre>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Stop Call Function</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`const handleStopCall = async () => {
  try {
    console.log('🛑 Stopping VAPI call...');
    const result = await VAPIService.endCall();
    
    if (!result.success) {
      throw new Error(result.message);
    }
    
    console.log('✅ Call ended successfully');
  } catch (error) {
    console.error('❌ Failed to end call:', error);
    setError(error.message);
  }
};`}
                  </pre>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Event Listeners</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`useEffect(() => {
  const handleCallStart = () => {
    console.log('📞 Call started event received');
    setStatusMessage('Call started successfully');
  };

  const handleCallEnd = () => {
    console.log('📞 Call ended event received');
    setStatusMessage('Call ended');
  };

  // Set up VAPI event listeners
  VAPIService.on('call-start', handleCallStart);
  VAPIService.on('call-end', handleCallEnd);

  return () => {
    VAPIService.off('call-start', handleCallStart);
    VAPIService.off('call-end', handleCallEnd);
  };
}, []);`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default VAPICallDemo;