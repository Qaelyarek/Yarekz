import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Briefcase, ShoppingCart, GraduationCap, TrendingUp, Users, DollarSign, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import VAPIPhoneInterface from '../components/ai/VAPIPhoneInterface';
import { isDevelopment } from '../config/environment';

const AISolutionsPage: React.FC = () => {
  const solutions = [
    {
      icon: Briefcase,
      title: "Business Funding & Tax Strategy",
      description: "AI-powered lead qualification and appointment setting for financial services, tax consultants, and business funding specialists.",
      features: [
        "Automated client intake and qualification",
        "Smart appointment scheduling",
        "Financial document analysis",
        "Compliance monitoring and alerts",
        "ROI tracking and reporting"
      ],
      results: "300% increase in qualified appointments",
      caseStudy: "FundingPro increased their conversion rate by 240% while reducing manual qualification time by 80%."
    },
    {
      icon: ShoppingCart,
      title: "Ecommerce Automation",
      description: "Comprehensive AI solutions for online retailers to automate customer service, inventory management, and sales optimization.",
      features: [
        "24/7 customer support automation",
        "Personalized product recommendations",
        "Inventory optimization",
        "Price monitoring and adjustment",
        "Customer retention campaigns"
      ],
      results: "60% reduction in support costs",
      caseStudy: "ShopSmart reduced customer service costs by 65% while improving response times from hours to seconds."
    },
    {
      icon: GraduationCap,
      title: "Business Coaching",
      description: "Intelligent coaching platforms that scale your expertise and provide personalized guidance to more clients simultaneously.",
      features: [
        "Automated client assessment",
        "Personalized action plans",
        "Progress tracking and analytics",
        "Resource recommendation engine",
        "Group coaching facilitation"
      ],
      results: "400% more coaching sessions",
      caseStudy: "CoachMaster scaled from 20 to 200 clients without adding staff, maintaining 95% satisfaction rates."
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Increased Revenue",
      description: "AI solutions typically generate 25-40% revenue increases within the first quarter.",
      stat: "35% average revenue boost"
    },
    {
      icon: Clock,
      title: "Time Savings",
      description: "Automate routine tasks and free your team to focus on high-value activities.",
      stat: "20+ hours saved weekly"
    },
    {
      icon: Users,
      title: "Better Customer Experience",
      description: "Provide instant, accurate responses and personalized interactions at scale.",
      stat: "95% customer satisfaction"
    },
    {
      icon: DollarSign,
      title: "Cost Efficiency",
      description: "Reduce operational costs while improving service quality and availability.",
      stat: "50% cost reduction"
    }
  ];

  return (
    <>
      <Helmet>
        <title>AI Solutions - Industry-Specific Automation | Ask Why? Growth</title>
        <meta name="description" content="Discover tailored AI solutions for business funding, ecommerce, and coaching. Automate operations, increase revenue, and scale your business intelligently." />
        <meta name="keywords" content="AI solutions, business automation, ecommerce AI, coaching AI, business funding AI, industry solutions" />
        <meta property="og:title" content="Industry-Specific AI Solutions for Business Growth" />
        <meta property="og:description" content="Tailored AI automation solutions that drive results for your specific industry." />
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
        <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 to-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                AI Solutions Tailored for Your Industry
              </h1>
              <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From business funding to ecommerce and coaching, our AI solutions are specifically 
                designed to address the unique challenges and opportunities in your industry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{benefit.description}</p>
                  <div className="text-2xl font-bold text-blue-400">{benefit.stat}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
                Industry-Specific AI Solutions
              </h2>
              <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the AI solution that fits your industry's unique needs and start seeing results immediately.
              </p>
            </div>

            <div className="space-y-16">
              {solutions.map((solution, index) => (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6">
                      <solution.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-black mb-4">
                      {solution.title}
                    </h3>
                    
                    <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                      {solution.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-black mb-4">Key Features:</h4>
                      <ul className="space-y-3">
                        {solution.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="text-blue-800 font-semibold mb-2">Success Story:</div>
                      <p className="text-blue-700 text-sm">{solution.caseStudy}</p>
                    </div>

                    <div className="text-2xl font-bold text-green-600 mb-6">
                      {solution.results}
                    </div>
                  </div>

                  <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                      <VAPIPhoneInterface
                        showTranscript={false}
                        allowTextInput={false}
                        debugMode={isDevelopment}
                        className="w-full"
                      />
                    </div>
                    <div className="mt-6 text-center">
                      <p className="text-gray-600 text-sm">
                        Try our AI assistant tailored for {solution.title.toLowerCase()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Process */}
        <section className="py-20 lg:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
                Simple Implementation Process
              </h2>
              <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get up and running with AI in your business within 30 days with our proven implementation process.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery & Strategy",
                  description: "We analyze your business needs and design a custom AI solution that fits your specific industry requirements.",
                  duration: "Week 1-2"
                },
                {
                  step: "02", 
                  title: "Setup & Integration",
                  description: "Our team handles the technical implementation and integrates the AI solution with your existing systems.",
                  duration: "Week 2-3"
                },
                {
                  step: "03",
                  title: "Training & Launch",
                  description: "We train your team and launch the solution with ongoing support to ensure optimal performance.",
                  duration: "Week 3-4"
                }
              ].map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">{phase.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">{phase.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{phase.description}</p>
                  <div className="text-sm font-semibold text-blue-600">{phase.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Scale Your Business with AI?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Choose your industry-specific AI solution and start seeing results within 30 days. 
              Join hundreds of businesses already transforming their operations with our AI technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                <Brain className="w-5 h-5 mr-2" />
                Get Custom Quote
              </Link>
              
              <Link
                to="/features"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Explore Features
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AISolutionsPage;