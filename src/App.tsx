import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { DollarSign, TrendingUp, Target, Star, Clock, Shield, Users } from 'lucide-react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import VAPIDemo from './components/VAPIDemo';
import AIPhoneHero from './components/hero/AIPhoneHero';
import EnhancedAIPhoneHero from './components/hero/EnhancedAIPhoneHero';
import VAPIPhoneInterface from './components/ai/VAPIPhoneInterface';
import FeaturesPage from './pages/FeaturesPage';
import AISolutionsPage from './pages/AISolutionsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import { validateRequiredEnvVars, isDevelopment } from './config/environment';

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
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header 
            onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
            isMenuOpen={isMenuOpen}
          />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/ai-solutions" element={<AISolutionsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/vapi-demo" element={<VAPIDemo />} />
              <Route path="/hero-demo" element={<AIPhoneHero />} />
              <Route path="/enhanced-hero" element={<EnhancedAIPhoneHero />} />
              <Route path="/interface-demo" element={<InterfaceDemo />} />
              
              {/* Legal Pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

// Interface Demo Page
const InterfaceDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            VAPI Interface Demo
          </h1>
          <p className="text-xl text-gray-600">
            Test the official VAPI Web SDK integration
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <VAPIPhoneInterface
            showTranscript={true}
            allowTextInput={true}
            debugMode={isDevelopment}
            onCallStart={() => console.log('Interface demo call started')}
            onCallEnd={() => console.log('Interface demo call ended')}
          />
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="text-lg font-semibold mb-4">Features Demonstrated:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Official VAPI Web SDK integration</li>
                <li>✅ Real-time voice conversations</li>
                <li>✅ Live transcript display</li>
                <li>✅ Voice visualization</li>
                <li>✅ Mute/unmute controls</li>
                <li>✅ Text message support</li>
                <li>✅ Error handling</li>
                <li>✅ Debug information</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border">
              <h3 className="text-lg font-semibold mb-4">SDK Benefits:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>🚀 Latest VAPI Web SDK features</li>
                <li>🔧 TypeScript support</li>
                <li>📱 Mobile-responsive design</li>
                <li>🎯 Production-ready code</li>
                <li>🔒 Secure credential handling</li>
                <li>📊 Comprehensive event handling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Homepage Component
const HomePage: React.FC = () => {
  return (
    <>
      {/* Enhanced Hero Section with Official VAPI Integration */}
      <EnhancedAIPhoneHero />
      
      {/* Original CEO Funnel Content */}
      <MinimalistCEOFunnel />
    </>
  );
};

// Minimalist CEO-Focused Funnel Page (keeping existing functionality)
const MinimalistCEOFunnel: React.FC = () => {
  const handleAIConnect = () => {
    console.log('✅ AI Phone Caller connection initiated');
  };

  const handleAIDisconnect = () => {
    console.log('📞 AI Phone Caller disconnected');
  };

  return (
    <div className="bg-white">
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

      {/* CTA Section with VAPI Interface */}
      <section className="bg-white text-black py-20 lg:py-32 border-t-4 border-black">
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to 10X Your Appointments?
          </h2>
          <div className="w-32 h-1 bg-black mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Join 500+ CEOs who've automated their appointment setting with AI.
          </p>
          
          <div className="mb-12 max-w-md mx-auto">
            <VAPIPhoneInterface
              showTranscript={false}
              allowTextInput={false}
              debugMode={false}
              onCallStart={handleAIConnect}
              onCallEnd={handleAIDisconnect}
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