import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import VAPIDemo from './components/VAPIDemo';
import AIPhoneCaller from './components/ai/AIPhoneCaller';
import { validateRequiredEnvVars, isDevelopment } from './config/environment';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Star,
  CheckCircle,
  Clock,
  DollarSign,
  Shield,
  Zap,
  Bot
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Validate environment variables on app startup
    try {
      validateRequiredEnvVars();
    } catch (error) {
      console.error('Environment validation failed:', error);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header 
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
        />
        
        <main>
          <Routes>
            <Route path="/" element={<MinimalistCEOFunnel />} />
            <Route path="/vapi-demo" element={<VAPIDemo />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

// Minimalist CEO-Focused Funnel Page
const MinimalistCEOFunnel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAIConnect = () => {
    console.log('✅ AI Phone Caller connection initiated');
  };

  const handleAIDisconnect = () => {
    console.log('📞 AI Phone Caller disconnected');
  };

  return (
    <div className="bg-white">
      {/* Hero Section - Minimalist Black & White */}
      <section className="relative bg-black text-white min-h-screen flex items-center overflow-hidden">
        {/* Subtle Tech Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {[...Array(144)].map((_, i) => (
              <div key={i} className="border border-white"></div>
            ))}
          </div>
        </div>

        {/* Floating Tech Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-full text-gray-300 text-sm font-medium mb-8">
                <Bot className="w-4 h-4 mr-2" />
                AI-Powered Phone System
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Supercharge Your Growth with{' '}
                <span className="relative">
                  AI-Driven
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white"></div>
                </span>{' '}
                Solutions
              </h1>
              
              <p className="text-xl lg:text-2xl mb-12 text-gray-300 leading-relaxed max-w-2xl">
                Automate Your Appointments, Boost Conversions, and Let AI Do the Work for You. 
                Purpose-built for Business Funding, Ecommerce, and Coaching professionals.
              </p>
              
              <div className="mb-12">
                <AIPhoneCaller 
                  onConnect={handleAIConnect}
                  onDisconnect={handleAIDisconnect}
                  debugMode={isDevelopment}
                />
              </div>

              {/* Trust Indicators - Minimalist */}
              <div className="flex items-center space-x-8 text-gray-400">
                <div className="flex items-center">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 bg-white rounded-full border border-black"></div>
                    <div className="w-6 h-6 bg-gray-600 rounded-full border border-black"></div>
                    <div className="w-6 h-6 bg-gray-400 rounded-full border border-black"></div>
                  </div>
                  <span className="ml-3 text-sm">500+ CEOs trust our AI</span>
                </div>
                <div className="flex items-center text-sm">
                  <Zap className="w-4 h-4 mr-2" />
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>

            {/* Right Side - Stats Display */}
            <div className={`lg:justify-self-end transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="bg-white text-black border-2 border-black rounded-2xl p-8 max-w-md">
                <h3 className="text-2xl font-bold mb-6 text-center">Real Results</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "300%", label: "More Appointments" },
                    { value: "85%", label: "Reduction in No-Shows" },
                    { value: "24/7", label: "AI Availability" },
                    { value: "$50K+", label: "Additional Revenue" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Average results in 30 days
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Minimalist */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
              Why CEOs Choose AI Phone Systems
            </h2>
            <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Stop losing qualified prospects to manual follow-ups and booking friction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: DollarSign,
                title: "Business Funding & Tax Strategy",
                desc: "Convert more high-value consultations",
                result: "40% more qualified leads"
              },
              {
                icon: TrendingUp,
                title: "Ecommerce",
                desc: "Scale without hiring more staff",
                result: "60% cost reduction"
              },
              {
                icon: Target,
                title: "Business Coaching",
                desc: "Focus on delivery, not booking",
                result: "3x more bookings"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-8 bg-white border-2 border-gray-200 rounded-2xl hover:border-black transition-all duration-300">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">{benefit.title}</h3>
                <p className="text-gray-600 mb-4">{benefit.desc}</p>
                <div className="text-2xl font-bold text-black">{benefit.result}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Minimalist */}
      <section className="py-20 lg:py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              CEOs Getting Results
            </h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Michael Chen",
                title: "CEO, Growth Capital Partners",
                quote: "Our AI books 3x more qualified consultations than our old system.",
                result: "300% increase in appointments"
              },
              {
                name: "Sarah Williams",
                title: "Founder, EcomScale Solutions",
                quote: "AI handles our inquiries 24/7. Cut support costs by 60%.",
                result: "60% cost reduction"
              },
              {
                name: "David Rodriguez",
                title: "Business Coach",
                quote: "It books better prospects than my VA ever did.",
                result: "400% more strategy calls"
              }
            ].map((testimonial, index) => (
              <div key={index} className="border-2 border-gray-600 rounded-2xl p-8 hover:border-white transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-white fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-gray-600 pt-4">
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.title}</div>
                  <div className="mt-2 text-white font-medium text-sm">{testimonial.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Minimalist */}
      <section className="bg-white text-black py-20 lg:py-32 border-t-4 border-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to 10X Your Appointments?
          </h2>
          <div className="w-32 h-1 bg-black mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Join 500+ CEOs who've automated their appointment setting with AI.
          </p>
          
          <div className="mb-12">
            <AIPhoneCaller 
              onConnect={handleAIConnect}
              onDisconnect={handleAIDisconnect}
              showPhoneInput={true}
              debugMode={isDevelopment}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Clock, title: "30-Day Results", desc: "Or money back" },
              { icon: Shield, title: "No Contract", desc: "Cancel anytime" },
              { icon: Users, title: "Limited Spots", desc: "50 CEOs per month" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <item.icon className="w-8 h-8 mb-2" />
                <div className="font-semibold">{item.title}</div>
                <div className="text-gray-600 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;