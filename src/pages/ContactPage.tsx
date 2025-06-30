import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle, Calendar, Users, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import VAPIPhoneInterface from '../components/ai/VAPIPhoneInterface';
import { isDevelopment } from '../config/environment';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    industry: '',
    message: '',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: MessageSquare,
      title: "Live AI Chat",
      description: "Talk to our AI assistant instantly",
      action: "Start conversation now",
      available: "24/7 Available"
    },
    {
      icon: Phone,
      title: "Schedule Call",
      description: "Book a personalized demo",
      action: "Choose your time",
      available: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed responses",
      action: "hello@askwhygrowth.com",
      available: "Response within 4 hours"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        industry: '',
        message: '',
        urgency: 'normal'
      });
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Get Started with AI Solutions | Ask Why? Growth</title>
        <meta name="description" content="Contact Ask Why? Growth to learn how AI can transform your business. Schedule a demo, start a conversation, or get personalized recommendations." />
        <meta name="keywords" content="contact us, AI demo, business consultation, AI solutions, schedule call, customer support" />
        <meta property="og:title" content="Contact Ask Why? Growth - AI Business Solutions" />
        <meta property="og:description" content="Get in touch to discover how AI can transform your business operations and drive growth." />
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
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
                Let's Transform Your Business Together
              </h1>
              <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Ready to see how AI can revolutionize your operations? Choose how you'd like to connect 
                with our team and let's start building your custom solution.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <div className="text-blue-600 font-semibold mb-2">{method.action}</div>
                  <div className="text-sm text-gray-500">{method.available}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Contact Section */}
        <section className="py-20 lg:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                  Get Your Custom AI Strategy
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Tell us about your business and we'll create a personalized AI implementation plan 
                  that drives real results for your specific industry and goals.
                </p>

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-800 mb-4">Message Sent Successfully!</h3>
                    <p className="text-green-700">
                      Thank you for reaching out. Our team will contact you within 24 hours with your 
                      personalized AI strategy recommendations.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Your company"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                          Industry *
                        </label>
                        <select
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select your industry</option>
                          <option value="business-funding">Business Funding & Tax Strategy</option>
                          <option value="ecommerce">Ecommerce</option>
                          <option value="business-coaching">Business Coaching</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="real-estate">Real Estate</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                          Project Urgency
                        </label>
                        <select
                          id="urgency"
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="normal">Normal (1-2 weeks)</option>
                          <option value="urgent">Urgent (This week)</option>
                          <option value="asap">ASAP (24-48 hours)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Tell Us About Your Goals *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        placeholder="What challenges are you facing? What results are you hoping to achieve with AI? The more details you provide, the better we can customize our recommendations."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message & Get Strategy
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* AI Assistant */}
              <div className="lg:sticky lg:top-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-black mb-4">
                    Talk to Our AI Assistant
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Get instant answers about our AI solutions, pricing, and implementation process.
                  </p>
                  
                  <VAPIPhoneInterface
                    showTranscript={true}
                    allowTextInput={true}
                    debugMode={isDevelopment}
                    className="w-full mb-6"
                  />

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-semibold text-black mb-3">Quick Questions?</h4>
                    <div className="space-y-2">
                      {[
                        "How much does AI implementation cost?",
                        "How long does setup take?",
                        "What ROI can I expect?",
                        "Do you offer training and support?"
                      ].map((question, index) => (
                        <button
                          key={index}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 lg:py-32 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
              {/* Office Location */}
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Headquarters</h3>
                <p className="text-gray-300 leading-relaxed">
                  123 AI Innovation Drive<br />
                  Tech City, TC 12345<br />
                  United States
                </p>
              </div>

              {/* Direct Contact */}
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Direct Line</h3>
                <p className="text-gray-300 leading-relaxed">
                  Phone: +1 (555) 123-4567<br />
                  Email: hello@askwhygrowth.com<br />
                  Support: support@askwhygrowth.com
                </p>
              </div>

              {/* Business Hours */}
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <p className="text-gray-300 leading-relaxed">
                  Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                  Saturday: 10:00 AM - 2:00 PM EST<br />
                  Sunday: Closed<br />
                  <span className="text-green-400">AI Support: 24/7</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Quick Access */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Get quick answers to common questions about our AI solutions.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "How quickly can we implement AI in our business?",
                  answer: "Most businesses see their AI solution live within 2-4 weeks. We handle all technical setup and provide comprehensive training for your team."
                },
                {
                  question: "What's the typical ROI for AI implementation?",
                  answer: "Our clients typically see 200-400% ROI within the first year through increased efficiency, better lead conversion, and reduced operational costs."
                },
                {
                  question: "Do you provide ongoing support and maintenance?",
                  answer: "Yes, we include 24/7 technical support, regular performance optimization, and continuous updates to ensure your AI solution evolves with your business."
                },
                {
                  question: "Can AI integrate with our existing systems?",
                  answer: "Absolutely. Our AI solutions integrate seamlessly with popular CRM, email marketing, and business management platforms you're already using."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-black mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Still have questions? Our AI assistant can provide instant answers.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="inline-flex items-center px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat with AI
                </button>
                <button className="inline-flex items-center px-6 py-3 border-2 border-black text-black rounded-xl font-semibold hover:bg-black hover:text-white transition-all duration-300">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Call
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;