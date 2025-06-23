import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@components/layout/Header';
import LeadCapture from '@components/forms/LeadCapture';
import type { Lead } from '@types/index';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLeadSubmission = async (leadData: Partial<Lead>) => {
    console.log('New lead captured:', leadData);
    // Here you would typically send the lead data to your backend/CRM
    // For now, we'll just log it
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header 
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
        />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage onLeadSubmit={handleLeadSubmission} />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Home Page Component
const HomePage: React.FC<{ onLeadSubmit: (lead: Partial<Lead>) => void }> = ({ onLeadSubmit }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                AI-Powered Business Solutions
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Transform your business with cutting-edge AI technology. 
                Automate lead capture, enhance customer engagement, and boost conversions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                  Watch Demo
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <LeadCapture 
                onSubmit={onLeadSubmit}
                title="Start Your AI Journey"
                subtitle="Get personalized recommendations"
                className="max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful AI Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive AI platform provides everything you need to automate 
              and optimize your business processes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of businesses already using AI to drive growth and efficiency.
          </p>
          <button className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

// Placeholder components for other pages
const ServicesPage = () => (
  <div className="max-w-7xl mx-auto px-4 py-20">
    <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Services</h1>
    <p className="text-xl text-gray-600">Services page coming soon...</p>
  </div>
);

const AboutPage = () => (
  <div className="max-w-7xl mx-auto px-4 py-20">
    <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
    <p className="text-xl text-gray-600">About page coming soon...</p>
  </div>
);

const ContactPage = () => (
  <div className="max-w-7xl mx-auto px-4 py-20">
    <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
    <p className="text-xl text-gray-600">Contact page coming soon...</p>
  </div>
);

// Feature data
const features = [
  {
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'AI Chat Support',
    description: 'Intelligent chatbots that provide 24/7 customer support and lead qualification.',
  },
  {
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    title: 'Voice Integration',
    description: 'Natural voice interactions that convert visitors into qualified leads.',
  },
  {
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Analytics Dashboard',
    description: 'Comprehensive insights into lead behavior, conversion rates, and ROI.',
  },
  {
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 011 1v1a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Content Automation',
    description: 'AI-generated content for blogs, emails, and social media campaigns.',
  },
  {
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Lead Scoring',
    description: 'Intelligent lead scoring and prioritization based on behavior and engagement.',
  },
  {
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
      </svg>
    ),
    title: 'Workflow Automation',
    description: 'Automated follow-ups, nurturing sequences, and conversion optimization.',
  },
];

export default App;