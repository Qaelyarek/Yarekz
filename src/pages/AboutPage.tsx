import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Target, Award, Heart, Lightbulb, Zap, Shield, Globe, ArrowRight, Quote } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We push the boundaries of AI technology to create solutions that were previously impossible."
    },
    {
      icon: Heart,
      title: "Customer Success",
      description: "Your success is our success. We measure our impact by the growth we help you achieve."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We build secure, reliable solutions that you can trust with your most important business processes."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "AI should be accessible to businesses of all sizes. We make enterprise-grade technology affordable."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former AI researcher at Google with 15+ years experience in machine learning and business automation.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      name: "Michael Chen",
      role: "CTO", 
      bio: "Ex-Microsoft engineer specializing in conversational AI and natural language processing systems.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Customer Success",
      bio: "Business automation expert with 12+ years helping companies optimize operations and scale efficiently.",
      image: "https://images.pexels.com/photos/3783376/pexels-photo-3783376.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      name: "David Park",
      role: "Lead AI Engineer",
      bio: "PhD in Computer Science with expertise in voice AI, real-time processing, and conversational interfaces.",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "Company Founded",
      description: "Started with a mission to make AI accessible to every business"
    },
    {
      year: "2023",
      title: "First AI Platform Launch",
      description: "Released our voice AI platform, serving our first 100 customers"
    },
    {
      year: "2024",
      title: "Series A Funding",
      description: "Raised $10M to accelerate AI research and platform development"
    },
    {
      year: "2025",
      title: "Enterprise Expansion",
      description: "Serving 1000+ businesses with industry-specific AI solutions"
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - AI Innovation Leaders | Ask Why? Growth</title>
        <meta name="description" content="Learn about Ask Why? Growth's mission to democratize AI technology. Meet our team of AI experts and discover our journey in transforming business automation." />
        <meta name="keywords" content="about us, AI company, team, mission, AI innovation, business automation experts" />
        <meta property="og:title" content="About Ask Why? Growth - AI Innovation Leaders" />
        <meta property="og:description" content="Discover our mission to make AI accessible to every business and meet the team behind the technology." />
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
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
                  Transforming Business Through AI Innovation
                </h1>
                <div className="w-24 h-1 bg-black mb-6"></div>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  At Ask Why? Growth, we believe artificial intelligence should empower every business, 
                  not just tech giants. We're on a mission to democratize AI technology and make it 
                  accessible, practical, and profitable for businesses of all sizes.
                </p>
                
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="text-3xl font-bold text-black mb-2">1000+</div>
                    <div className="text-gray-600">Businesses Served</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-black mb-2">300%</div>
                    <div className="text-gray-600">Average ROI</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-black mb-2">24/7</div>
                    <div className="text-gray-600">AI Availability</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-black mb-2">95%</div>
                    <div className="text-gray-600">Customer Satisfaction</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="AI Innovation Team"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-lg rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-gray-900">AI Solutions Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <Quote className="w-16 h-16 text-blue-600 mx-auto mb-8" />
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-8">
              Our Mission
            </h2>
            <p className="text-2xl text-gray-700 leading-relaxed mb-8">
              "To empower every business with intelligent automation that drives growth, 
              improves customer experiences, and creates sustainable competitive advantages 
              through accessible AI technology."
            </p>
            <div className="text-lg text-gray-600">
              — Ask Why? Growth Team
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
                Our Core Values
              </h2>
              <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide everything we do, from product development to customer relationships.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 lg:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
                Meet Our Team
              </h2>
              <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our diverse team of AI experts, engineers, and business strategists is passionate about 
                creating technology that makes a real difference.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-bold text-black mb-2 text-center">{member.name}</h3>
                  <div className="text-blue-600 font-semibold mb-4 text-center">{member.role}</div>
                  <p className="text-gray-600 text-sm leading-relaxed text-center">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
                Our Journey
              </h2>
              <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From a small startup to an AI innovation leader, here's how we've grown and evolved.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-black mb-3">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Culture & Benefits */}
        <section className="py-20 lg:py-32 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Building the Future of AI
                </h2>
                <div className="w-24 h-1 bg-white mb-6"></div>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  We're always looking for passionate individuals who want to shape the future of 
                  artificial intelligence and help businesses around the world succeed.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Remote-first culture with global opportunities",
                    "Cutting-edge AI research and development projects",
                    "Competitive compensation and equity packages",
                    "Professional development and conference attendance",
                    "Health, dental, and vision insurance",
                    "Unlimited PTO and flexible working hours"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
                >
                  Join Our Team
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                  <Zap className="w-8 h-8 text-white mb-4" />
                  <h3 className="font-bold text-white mb-2">Innovation</h3>
                  <p className="text-gray-400 text-sm">Work on cutting-edge AI projects that push boundaries</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                  <Users className="w-8 h-8 text-white mb-4" />
                  <h3 className="font-bold text-white mb-2">Collaboration</h3>
                  <p className="text-gray-400 text-sm">Join a diverse team of experts from around the world</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                  <Target className="w-8 h-8 text-white mb-4" />
                  <h3 className="font-bold text-white mb-2">Impact</h3>
                  <p className="text-gray-400 text-sm">Create solutions that transform businesses globally</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                  <Award className="w-8 h-8 text-white mb-4" />
                  <h3 className="font-bold text-white mb-2">Growth</h3>
                  <p className="text-gray-400 text-sm">Accelerate your career in the fastest-growing field</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join the AI revolution and discover how our technology can drive your business forward. 
              Let's build the future together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                <Users className="w-5 h-5 mr-2" />
                Start Your Journey
              </Link>
              
              <Link
                to="/features"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                <Lightbulb className="w-5 h-5 mr-2" />
                Explore Technology
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;