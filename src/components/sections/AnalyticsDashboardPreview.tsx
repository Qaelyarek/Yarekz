import React, { useState } from 'react';
import { Play, BarChart3, TrendingUp, Users, Target, ArrowRight } from 'lucide-react';

const AnalyticsDashboardPreview: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);

  const stats = [
    { label: 'Total Leads', value: '1,247', change: '+23%', color: 'text-blue-600' },
    { label: 'Conversion Rate', value: '34.2%', change: '+8.1%', color: 'text-green-600' },
    { label: 'AI Interactions', value: '8,932', change: '+156%', color: 'text-purple-600' },
    { label: 'Revenue Impact', value: '$89K', change: '+41%', color: 'text-orange-600' },
  ];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-800 text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics Dashboard
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Real-Time Intelligence at Your Fingertips
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Get comprehensive insights into your customer behavior, AI performance, 
              and business metrics with our advanced analytics dashboard. Make data-driven 
              decisions that drive growth.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {[
                'Real-time customer journey tracking',
                'AI performance optimization insights',
                'Predictive analytics and forecasting',
                'Custom KPI monitoring and alerts',
                'Advanced segmentation and targeting'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowDemo(true)}
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Interactive Demo
              </button>
              
              <button className="inline-flex items-center px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            {/* Main Dashboard Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold">Analytics Overview</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Live</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">{stat.label}</span>
                      <span className={`text-sm font-medium ${stat.color}`}>
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-white text-2xl font-bold">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Chart Placeholder */}
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium">Conversion Funnel</span>
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                </div>
                <div className="space-y-2">
                  {[85, 68, 42, 34].map((width, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-16 text-gray-400 text-sm">
                        {['Visits', 'Leads', 'Qualified', 'Converted'][index]}
                      </div>
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${width}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm w-8">{width}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-blue-400 font-medium">AI Insight</span>
                </div>
                <p className="text-blue-100 text-sm">
                  Peak engagement detected at 2-3 PM. Consider scheduling campaigns during this window for 23% higher conversion rates.
                </p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-green-500 rounded-full p-3 shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-purple-500 rounded-full p-3 shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Demo Modal Placeholder */}
        {showDemo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Demo</h3>
                <p className="text-gray-600 mb-6">
                  Experience our analytics dashboard in action. See how real-time data 
                  drives better business decisions.
                </p>
                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-gray-500">Demo Video Placeholder</span>
                </div>
                <button
                  onClick={() => setShowDemo(false)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Close Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnalyticsDashboardPreview;