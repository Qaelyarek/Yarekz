import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Brain, MessageSquare, BarChart3, Shield, Clock, Users, Target, CheckCircle, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import VAPIPhoneInterface from '../components/ai/VAPIPhoneInterface';
import { isDevelopment } from '../config/environment';

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Conversations",
      description: "Natural language processing that understands context and intent, providing human-like interactions with your customers.",
      benefits: [
        "24/7 availability for customer inquiries",
        "Contextual understanding of complex requests",
        "Multi-language support",
        "Continuous learning and improvement"
      ]
    },
    {
      icon: MessageSquare,
      title: "Voice & Chat Integration",
      description: "Seamless voice and text communication channels that provide consistent experiences across all touchpoints.",
      benefits: [
        "Real-time voice conversations",
        "Instant text responses",
        "Cross-platform synchronization",
        "Rich media support"
      ]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive insights into customer behavior, conversation patterns, and business performance metrics.",
      benefits: [
        "Real-time performance dashboards",
        "Customer journey mapping",
        "Conversion tracking",
        "Predictive analytics"
      ]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security protocols to protect your data and ensure compliance with industry standards.",
      benefits: [
        "End-to-end encryption",
        "GDPR & CCPA compliance",
        "SOC 2 certified infrastructure",
        "Regular security audits"
      ]
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description: "Intelligent automation that streamlines processes and reduces manual work for your team.",
      benefits: [
        "Lead qualification automation",
        "Follow-up scheduling",
        "Task assignment",
        "Integration with CRM systems"
      ]
    },
    {
      icon: Target,
      title: "Smart Lead Scoring",
      description: "AI-driven lead scoring that helps you prioritize prospects and focus on high-value opportunities.",
      benefits: [
        "Behavioral analysis",
        "Engagement scoring",
        "Conversion probability",
        "Automated segmentation"
      ]
    }
  ];

  const stats = [
    { number: "300%", label: "Increase in qualified leads" },
    { number: "85%", label: "Reduction in response time" },
    { number: "40%", label: "Cost savings on support" },
    { number: "95%", label: "Customer satisfaction rate" }
  ];

  return (
    <>
      <Helmet>
        <title>Features - AI-Powered Business Solutions | Ask Why? Growth</title>
        <meta name="description" content="Discover powerful AI features that transform your business: voice conversations, advanced analytics, workflow automation, and enterprise security." />
        <meta name="keywords" content="AI features, voice AI, business automation, analytics, enterprise security, lead scoring" />
        <meta property="og:title" content="Advanced AI Features for Business Growth" />
        <meta property="og:description" content="Transform your business with AI-powered conversations, analytics, and automation tools." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Navigation Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-600 hover:text-black transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
                Powerful AI Features for Modern Business
              </h1>
              <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover how our advanced AI technology transforms customer interactions, 
                streamlines operations, and drives unprecedented business growth.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-black mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-black mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="py-20 lg:py-32 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Experience AI in Action
                </h2>
                <div className="w-24 h-1 bg-white mb-6"></div>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Don't just read about our features - experience them firsthand. 
                  Start a conversation with our AI assistant and see the technology in action.
                </p>
                
                <div className="space-y-4 mb-8">
                  {[
                    "Natural conversation flow",
                    "Real-time response generation",
                    "Context-aware interactions",
                    "Multi-intent understanding"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                <VAPIPhoneInterface
                  showTranscript={true}
                  allowTextInput={false}
                  debugMode={isDevelopment}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of businesses already using our AI solutions to drive growth and improve customer satisfaction.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                <Users className="w-5 h-5 mr-2" />
                Schedule Demo
              </Link>
              
              <Link
                to="/ai-solutions"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                <Brain className="w-5 h-5 mr-2" />
                Explore Solutions
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FeaturesPage;