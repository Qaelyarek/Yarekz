import React, { useState, useEffect } from 'react';
import { Phone, Mic, Volume2, Shield, Zap, Clock } from 'lucide-react';
import StarBorder from '../ui/star-border';
import VAPIPhoneInterface from '../ai/VAPIPhoneInterface';
import { validateVAPIConfig, isDevelopment } from '../../config/environment';

interface EnhancedAIPhoneHeroProps {
  className?: string;
}

const EnhancedAIPhoneHero: React.FC<EnhancedAIPhoneHeroProps> = ({ 
  className = "" 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showInterface, setShowInterface] = useState(false);
  const [isConfigValid, setIsConfigValid] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setIsConfigValid(validateVAPIConfig());
  }, []);

  const handleStartDemo = () => {
    setShowInterface(true);
  };

  const stats = [
    { label: "Response Time", value: "<2s", icon: Zap },
    { label: "Availability", value: "24/7", icon: Clock },
    { label: "Accuracy", value: "98%", icon: Shield },
  ];

  const features = [
    {
      icon: Phone,
      title: "Instant Connection",
      description: "Connect with our AI assistant in seconds. No downloads, no setup.",
    },
    {
      icon: Mic,
      title: "Natural Speech",
      description: "Speak naturally and get intelligent responses in real-time.",
    },
    {
      icon: Volume2,
      title: "Crystal Clear Audio",
      description: "High-quality audio processing for perfect conversations.",
    },
  ];

  return (
    <section className={`relative min-h-screen bg-white overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left Content */}
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-black text-white rounded-full text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Live AI Assistant
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
              Talk to the
              <br />
              <span className="relative">
                Future of AI
                <div className="absolute bottom-0 left-0 w-full h-2 bg-black" />
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              Experience our advanced AI assistant with natural voice conversations. 
              No apps, no downloads - just speak and get intelligent responses instantly.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-black">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mb-8">
              {!isConfigValid ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="text-yellow-800 font-medium mb-1">Configuration Required</div>
                  <div className="text-yellow-700 text-sm">
                    Please set your VAPI credentials in the environment variables to enable the demo.
                  </div>
                  {isDevelopment && (
                    <div className="text-yellow-600 text-xs mt-2">
                      Add VITE_VAPI_ASSISTANT_ID and VITE_VAPI_PUBLIC_KEY to your .env file
                    </div>
                  )}
                </div>
              ) : (
                <StarBorder
                  onClick={handleStartDemo}
                  speed="medium"
                  className="text-xl hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <Phone className="w-6 h-6" />
                    <span>Start Voice Demo</span>
                  </div>
                </StarBorder>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Real-time Processing</span>
              </div>
            </div>
          </div>

          {/* Right Interface */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            {showInterface ? (
              <VAPIPhoneInterface
                showTranscript={true}
                allowTextInput={false}
                debugMode={isDevelopment}
                className="w-full max-w-md mx-auto"
                onCallStart={() => console.log('Demo call started')}
                onCallEnd={() => console.log('Demo call ended')}
              />
            ) : (
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 text-white">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Ready to Experience AI?</h3>
                  <p className="text-gray-300">
                    Click the button below to start your voice conversation with our AI assistant.
                  </p>
                </div>

                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{feature.title}</div>
                        <div className="text-sm text-gray-300">{feature.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-white/10 rounded-lg">
                  <div className="text-sm text-gray-300">
                    <div className="font-medium text-white mb-1">What to expect:</div>
                    <ul className="space-y-1">
                      <li>• Allow microphone access when prompted</li>
                      <li>• Speak naturally - the AI understands context</li>
                      <li>• Real-time responses with natural voice</li>
                      <li>• End the call anytime you want</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-black rounded-full animate-pulse opacity-30" />
      <div className="absolute top-40 right-32 w-1 h-1 bg-gray-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-black rounded-full animate-pulse opacity-20" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gray-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: '0.5s' }} />
    </section>
  );
};

export default EnhancedAIPhoneHero;