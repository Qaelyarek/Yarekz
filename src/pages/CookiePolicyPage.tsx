import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie, Settings, BarChart3, Shield, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const CookiePolicyPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Ask Why? Growth</title>
        <meta name="description" content="Cookie Policy for Ask Why? Growth - Learn how we use cookies and tracking technologies on our website." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Navigation Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-600 hover:text-black transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Header */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Cookie className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
              <p className="text-lg text-gray-600 mb-6">
                This policy explains how we use cookies and similar tracking technologies on our website.
              </p>
              <div className="text-sm text-gray-500">
                Last updated: January 27, 2025 | Effective Date: January 27, 2025
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              {/* What Are Cookies */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-blue-800">
                      <strong>Quick Summary:</strong> Cookies help us provide you with a better website experience by remembering your preferences, analyzing site usage, and personalizing content.
                    </div>
                  </div>
                </div>
              </div>

              {/* How We Use Cookies */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
                <p className="text-gray-700 mb-6">
                  Ask Why? Growth uses cookies for various purposes to enhance your experience and improve our services. Below are the main categories of cookies we use:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Shield className="w-6 h-6 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Essential Cookies</h3>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">
                      These cookies are necessary for the website to function properly and cannot be disabled.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                      <li>User authentication and security</li>
                      <li>Shopping cart and session management</li>
                      <li>Load balancing and performance</li>
                      <li>Security and fraud prevention</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Analytics Cookies</h3>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">
                      These cookies help us understand how visitors interact with our website.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                      <li>Page views and user behavior</li>
                      <li>Traffic sources and referrals</li>
                      <li>Site performance monitoring</li>
                      <li>Error tracking and debugging</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Settings className="w-6 h-6 text-purple-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Functional Cookies</h3>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">
                      These cookies enable enhanced functionality and personalization.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                      <li>Language and region preferences</li>
                      <li>Theme and display settings</li>
                      <li>Form data and user inputs</li>
                      <li>Accessibility preferences</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Cookie className="w-6 h-6 text-orange-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Marketing Cookies</h3>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">
                      These cookies track your activity to provide relevant advertisements.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                      <li>Advertising campaign tracking</li>
                      <li>Conversion measurement</li>
                      <li>Retargeting and remarketing</li>
                      <li>Social media integration</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Types of Cookies */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Session vs. Persistent Cookies</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Duration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Session Cookies</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Until browser is closed</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Maintain user state during browsing session</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Persistent Cookies</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Up to 2 years</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Remember preferences and settings</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 First-Party vs. Third-Party Cookies</h3>
                <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
                  <li><strong>First-Party Cookies:</strong> Set directly by Ask Why? Growth to provide core functionality and analyze site usage</li>
                  <li><strong>Third-Party Cookies:</strong> Set by our partners and service providers for analytics, advertising, and social media features</li>
                </ul>
              </div>

              {/* Specific Cookies */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Specific Cookies We Use</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Essential Cookies</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Cookie Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Provider</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Purpose</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                      <tr>
                        <td className="px-4 py-3 font-mono text-gray-900">session_id</td>
                        <td className="px-4 py-3 text-gray-700">Ask Why? Growth</td>
                        <td className="px-4 py-3 text-gray-700">User session management</td>
                        <td className="px-4 py-3 text-gray-700">Session</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-gray-900">auth_token</td>
                        <td className="px-4 py-3 text-gray-700">Ask Why? Growth</td>
                        <td className="px-4 py-3 text-gray-700">User authentication</td>
                        <td className="px-4 py-3 text-gray-700">7 days</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-gray-900">csrf_token</td>
                        <td className="px-4 py-3 text-gray-700">Ask Why? Growth</td>
                        <td className="px-4 py-3 text-gray-700">Security protection</td>
                        <td className="px-4 py-3 text-gray-700">Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Analytics Cookies</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Cookie Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Provider</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Purpose</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                      <tr>
                        <td className="px-4 py-3 font-mono text-gray-900">_ga</td>
                        <td className="px-4 py-3 text-gray-700">Google Analytics</td>
                        <td className="px-4 py-3 text-gray-700">Distinguish unique users</td>
                        <td className="px-4 py-3 text-gray-700">2 years</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-gray-900">_ga_XXXXXXXXXX</td>
                        <td className="px-4 py-3 text-gray-700">Google Analytics</td>
                        <td className="px-4 py-3 text-gray-700">Session and campaign data</td>
                        <td className="px-4 py-3 text-gray-700">2 years</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-gray-900">_gid</td>
                        <td className="px-4 py-3 text-gray-700">Google Analytics</td>
                        <td className="px-4 py-3 text-gray-700">Distinguish unique users</td>
                        <td className="px-4 py-3 text-gray-700">1 day</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Marketing Cookies</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Cookie Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Provider</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Purpose</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                      <tr>
                        <td className="px-4 py-3 font-mono text-gray-900">_fbp</td>
                        <td className="px-4 py-3 text-gray-700">Facebook</td>
                        <td className="px-4 py-3 text-gray-700">Facebook Pixel tracking</td>
                        <td className="px-4 py-3 text-gray-700">3 months</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-gray-900">ads/ga-audiences</td>
                        <td className="px-4 py-3 text-gray-700">Google</td>
                        <td className="px-4 py-3 text-gray-700">Google Ads remarketing</td>
                        <td className="px-4 py-3 text-gray-700">Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Third-Party Services */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Services</h2>
                <p className="text-gray-700 mb-6">
                  We use various third-party services that may set their own cookies. Below are the main services we integrate with:
                </p>

                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Google Analytics</h3>
                    <p className="text-gray-700 mb-3">
                      We use Google Analytics to understand how visitors use our website. Google Analytics uses cookies to collect information about your visit and generate reports on website activity.
                    </p>
                    <p className="text-sm text-gray-600">
                      Learn more: <a href="https://policies.google.com/privacy" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Facebook Pixel</h3>
                    <p className="text-gray-700 mb-3">
                      We use Facebook Pixel to measure the effectiveness of our advertising campaigns and to show you relevant ads on Facebook and Instagram.
                    </p>
                    <p className="text-sm text-gray-600">
                      Learn more: <a href="https://www.facebook.com/privacy/explanation" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Facebook Privacy Policy</a>
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Stripe</h3>
                    <p className="text-gray-700 mb-3">
                      We use Stripe for payment processing. Stripe may set cookies related to fraud prevention and payment security.
                    </p>
                    <p className="text-sm text-gray-600">
                      Learn more: <a href="https://stripe.com/privacy" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Stripe Privacy Policy</a>
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Intercom</h3>
                    <p className="text-gray-700 mb-3">
                      We use Intercom for customer support chat. Intercom uses cookies to maintain conversation context and provide personalized support.
                    </p>
                    <p className="text-sm text-gray-600">
                      Learn more: <a href="https://www.intercom.com/privacy" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Intercom Privacy Policy</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Managing Cookies */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Managing Your Cookie Preferences</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Cookie Consent Banner</h3>
                <p className="text-gray-700 mb-4">
                  When you first visit our website, you'll see a cookie consent banner that allows you to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Accept all cookies</li>
                  <li>Reject non-essential cookies</li>
                  <li>Customize your cookie preferences</li>
                  <li>Learn more about our cookie usage</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Browser Settings</h3>
                <p className="text-gray-700 mb-4">
                  You can also control cookies through your browser settings. Here's how to manage cookies in popular browsers:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Chrome</h4>
                    <p className="text-sm text-gray-700">Settings → Privacy and security → Site Settings → Cookies and site data</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Firefox</h4>
                    <p className="text-sm text-gray-700">Preferences → Privacy & Security → Cookies and Site Data</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Safari</h4>
                    <p className="text-sm text-gray-700">Preferences → Privacy → Manage Website Data</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Edge</h4>
                    <p className="text-sm text-gray-700">Settings → Site permissions → Cookies and site data</p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.3 Opt-Out Tools</h3>
                <p className="text-gray-700 mb-4">You can opt out of specific tracking services:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" className=\"text-blue-600 underline" target=\"_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
                  <li><strong>Facebook:</strong> <a href="https://www.facebook.com/settings?tab=ads" className=\"text-blue-600 underline" target=\"_blank" rel="noopener noreferrer">Facebook Ad Preferences</a></li>
                  <li><strong>Network Advertising Initiative:</strong> <a href="http://optout.networkadvertising.org/" className=\"text-blue-600 underline" target=\"_blank" rel="noopener noreferrer">NAI Consumer Opt-out</a></li>
                  <li><strong>Digital Advertising Alliance:</strong> <a href="http://optout.aboutads.info/" className=\"text-blue-600 underline" target=\"_blank" rel="noopener noreferrer">DAA Consumer Choice</a></li>
                </ul>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-yellow-800">
                      <strong>Note:</strong> Disabling cookies may affect the functionality of our website. Some features may not work properly if essential cookies are blocked.
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Devices */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Mobile Devices and Apps</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.1 Mobile Browser Cookies</h3>
                <p className="text-gray-700 mb-4">
                  When you access our website through a mobile browser, the same cookie policies apply. You can manage cookies through your mobile browser settings.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.2 Mobile App Analytics</h3>
                <p className="text-gray-700 mb-4">
                  If you use our mobile app, we may collect analytics data through mobile-specific tracking technologies:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li><strong>Advertising ID:</strong> Device-specific identifier for advertising</li>
                  <li><strong>App Analytics:</strong> Usage patterns and performance metrics</li>
                  <li><strong>Push Notifications:</strong> Device tokens for notification delivery</li>
                  <li><strong>Crash Reporting:</strong> Error logs for app improvement</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.3 Managing Mobile Tracking</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">iOS Devices</h4>
                    <p className="text-sm text-gray-700 mb-2">Settings → Privacy & Security → Tracking</p>
                    <p className="text-sm text-gray-700">Settings → Privacy & Security → Apple Advertising → Personalized Ads</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Android Devices</h4>
                    <p className="text-sm text-gray-700 mb-2">Settings → Privacy → Ads → Reset advertising ID</p>
                    <p className="text-sm text-gray-700">Settings → Privacy → Ads → Opt out of Ads Personalization</p>
                  </div>
                </div>
              </div>

              {/* Updates to Policy */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Updates to This Cookie Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. When we make changes, we will:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Update the "Last Updated" date at the top of this policy</li>
                  <li>Provide notice through our website or via email for material changes</li>
                  <li>Update our cookie consent banner if necessary</li>
                  <li>Give you the opportunity to review and adjust your preferences</li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us About Cookies</h2>
                <p className="text-gray-700 mb-6">
                  If you have questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> privacy@askwhygrowth.com</p>
                    <p><strong>Subject Line:</strong> Cookie Policy Inquiry</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                    <p><strong>Mail:</strong><br />
                      Ask Why? Growth<br />
                      Privacy Team<br />
                      123 AI Innovation Drive<br />
                      Tech City, TC 12345<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800">
                    <strong>Quick Help:</strong> You can also use our cookie preference center (if available) to manage your settings at any time, or contact our support team through the live chat on our website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CookiePolicyPage;