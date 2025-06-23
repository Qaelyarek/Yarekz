import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import LeadCapture from './components/forms/LeadCapture';
import Footer from './components/layout/Footer';
import { 
  MessageCircle, 
  Phone, 
  Calendar, 
  TrendingUp, 
  Users, 
  Target, 
  ChevronRight,
  Star,
  CheckCircle,
  BarChart3,
  Clock,
  DollarSign,
  Shield,
  PlayCircle
} from 'lucide-react';
import type { Lead } from './types/index';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLeadSubmission = async (leadData: Partial<Lead>) => {
    console.log('New lead captured:', leadData);
    // Here you would typically send the lead data to your backend/CRM
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header 
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
        />
        
        <main>
          <Routes>
            <Route path="/" element={<CEOFunnelPage onLeadSubmit={handleLeadSubmission} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

// CEO-Focused Funnel Page
const CEOFunnelPage: React.FC<{ onLeadSubmit: (lead: Partial<Lead>) => void }> = ({ onLeadSubmit }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div>
      {/* Hero Section with AI Animation */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-20 lg:py-32 overflow-hidden">
        {/* AI-Themed Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-200"></div>
          <div className="absolute bottom-20 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-400"></div>
          
          {/* AI Circuit Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent transform rotate-45 animate-pulse"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 rounded-full text-blue-200 text-sm font-medium mb-6 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                AI-Powered Appointment Setting
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Supercharge Your Growth with AI-Driven Solutions
              </h1>
              
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                Automate Your Appointments, Boost Conversions, and Let AI Do the Work for You. 
                Purpose-built for Business Funding, Ecommerce, and Coaching professionals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="group bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  <span className="flex items-center justify-center">
                    <MessageCircle className="mr-3 w-6 h-6" />
                    Speak with Our AI Agent
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button className="group border-2 border-blue-400 text-blue-200 hover:bg-blue-400 hover:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                  <span className="flex items-center justify-center">
                    <PlayCircle className="mr-2 w-5 h-5" />
                    Watch 2-Min Demo
                  </span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-blue-200">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-pink-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="ml-3 text-sm">500+ CEOs already using our AI</span>
                </div>
              </div>
            </div>

            <div className={`lg:justify-self-end transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <LeadCapture 
                onSubmit={onLeadSubmit}
                title="Get Your AI Demo"
                subtitle="See how AI can 10x your appointments in 30 days"
                className="max-w-md backdrop-blur-lg bg-white/10 border border-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why CEOs Choose AI for Appointment Setting
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Stop losing qualified prospects to manual follow-ups and booking friction. 
              Our AI handles everything from first contact to calendar booking - 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {industryBenefits.map((benefit, index) => (
              <div key={index} className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.industry}</h3>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                <div className="text-2xl font-bold text-blue-600">{benefit.result}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Snapshot - AI Chat & Voice */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              AI That Works 24/7 to Fill Your Calendar
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* AI Chat Support */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Intelligent Chat Agent</h3>
                </div>
                <ul className="space-y-3">
                  {chatFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Voice Integration</h3>
                </div>
                <ul className="space-y-3">
                  {voiceFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Demo Video Placeholder */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl">
                <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center mb-6">
                  <PlayCircle className="w-16 h-16 text-white opacity-80" />
                </div>
                <h4 className="text-white font-semibold text-lg mb-2">Watch AI in Action</h4>
                <p className="text-gray-300 mb-4">See how our AI qualifies leads and books appointments automatically</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Play Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results & Analytics */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Results That CEOs Love
            </h2>
            <p className="text-xl text-gray-600">Real metrics from businesses using our AI appointment system</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {results.map((result, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                <div className="text-4xl font-bold text-blue-600 mb-2">{result.value}</div>
                <div className="text-gray-700 font-medium">{result.metric}</div>
                <div className="text-sm text-gray-500 mt-2">{result.timeframe}</div>
              </div>
            ))}
          </div>

          {/* Conversion Funnel Visualization */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Your AI-Powered Conversion Funnel</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {funnelSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                  <div className="text-2xl font-bold text-green-600">{step.rate}</div>
                  {index < funnelSteps.length - 1 && (
                    <ChevronRight className="w-6 h-6 text-gray-400 mx-auto mt-4 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Success Stories */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              CEOs Getting Results with AI
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.title}</div>
                    <div className="text-blue-600 font-medium">{testimonial.company}</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="text-green-800 font-semibold text-sm">{testimonial.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Single CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to 10X Your Appointments?
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            Join 500+ CEOs who've automated their appointment setting with AI. 
            Book your strategy call now and see how we can fill your calendar in 30 days.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <Calendar className="inline mr-3 w-6 h-6" />
              Book Your Strategy Call Now
            </button>
          </div>

          {/* Urgency & Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-200" />
              <div className="text-lg font-semibold">30-Day Results</div>
              <div className="text-blue-200">Or money back</div>
            </div>
            <div>
              <Shield className="w-8 h-8 mx-auto mb-2 text-blue-200" />
              <div className="text-lg font-semibold">No Long-Term Contract</div>
              <div className="text-blue-200">Cancel anytime</div>
            </div>
            <div>
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-200" />
              <div className="text-lg font-semibold">Limited Spots</div>
              <div className="text-blue-200">Only 50 CEOs per month</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Data for the funnel
const industryBenefits = [
  {
    icon: DollarSign,
    industry: "Business Funding & Tax Strategy",
    description: "Convert more high-value consultations with AI that understands complex financial needs",
    result: "40% more qualified leads"
  },
  {
    icon: TrendingUp,
    industry: "Ecommerce",
    description: "Scale customer support and sales conversations without hiring more staff",
    result: "60% cost reduction"
  },
  {
    icon: Target,
    industry: "Business Coaching",
    description: "Nurture prospects through your sales process while you focus on delivery",
    result: "3x more bookings"
  }
];

const chatFeatures = [
  "Qualifies leads with industry-specific questions",
  "Handles objections like a trained sales rep",
  "Books appointments directly to your calendar",
  "Follows up automatically until they respond",
  "Works 24/7 across all time zones"
];

const voiceFeatures = [
  "Natural conversation flow",
  "Multilingual support",
  "Real-time appointment booking",
  "Integrates with your existing phone system",
  "Handles complex scheduling scenarios"
];

const results = [
  { value: "300%", metric: "More Qualified Appointments", timeframe: "In first 30 days" },
  { value: "85%", metric: "Reduction in No-Shows", timeframe: "Average across clients" },
  { value: "24/7", metric: "Lead Response Time", timeframe: "Never miss an opportunity" },
  { value: "$50K+", metric: "Additional Revenue", timeframe: "Per CEO per month" }
];

const funnelSteps = [
  { title: "AI Engages", description: "Visitor starts conversation", rate: "95%" },
  { title: "AI Qualifies", description: "Determines if they're a fit", rate: "70%" },
  { title: "AI Books", description: "Schedules consultation", rate: "60%" },
  { title: "You Close", description: "Convert to client", rate: "45%" }
];

const testimonials = [
  {
    name: "Michael Chen",
    title: "CEO",
    company: "Growth Capital Partners",
    quote: "Our AI books 3x more qualified consultations than our old system. ROI was immediate.",
    result: "300% increase in qualified appointments",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    name: "Sarah Williams",
    title: "Founder",
    company: "EcomScale Solutions",
    quote: "AI handles our customer inquiries 24/7. We've cut support costs by 60% while improving response times.",
    result: "60% reduction in support costs",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    name: "David Rodriguez",
    title: "Business Coach",
    company: "Executive Breakthrough",
    quote: "I was skeptical about AI, but it books better prospects than my VA ever did. Game changer.",
    result: "400% more strategy calls booked",
    avatar: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  }
];

export default App;