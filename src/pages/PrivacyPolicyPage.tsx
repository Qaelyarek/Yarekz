import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Ask Why? Growth</title>
        <meta name="description" content="Privacy Policy for Ask Why? Growth - Learn how we collect, use, and protect your personal information." />
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
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-lg text-gray-600 mb-6">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
              {/* Introduction */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ask Why? Growth ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our AI-powered services.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-blue-800">
                      <strong>Important:</strong> By using our services, you agree to the collection and use of information in accordance with this policy.
                    </div>
                  </div>
                </div>
              </div>

              {/* Information We Collect */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
                <p className="text-gray-700 mb-4">We may collect the following personal information:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li><strong>Contact Information:</strong> Name, email address, phone number, company name</li>
                  <li><strong>Account Information:</strong> Username, password, profile information</li>
                  <li><strong>Communication Data:</strong> Messages, chat logs, voice recordings from AI interactions</li>
                  <li><strong>Business Information:</strong> Industry, company size, business needs and preferences</li>
                  <li><strong>Payment Information:</strong> Billing address, payment method details (processed securely through third-party providers)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li><strong>Usage Data:</strong> Pages visited, time spent, clicks, scrolling behavior</li>
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                  <li><strong>Location Data:</strong> General geographic location based on IP address</li>
                  <li><strong>Cookies and Tracking:</strong> Information collected through cookies and similar technologies</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 AI Interaction Data</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Voice Recordings:</strong> Audio from AI assistant conversations (with consent)</li>
                  <li><strong>Chat Transcripts:</strong> Text-based conversations with our AI systems</li>
                  <li><strong>Behavioral Analytics:</strong> Interaction patterns and preferences to improve AI responses</li>
                  <li><strong>Performance Metrics:</strong> Response times, success rates, user satisfaction scores</li>
                </ul>
              </div>

              {/* How We Use Information */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Service Provision</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Provide and maintain our AI-powered services</li>
                  <li>Process transactions and manage your account</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Personalize your experience and improve service quality</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Communication</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Send service-related notifications and updates</li>
                  <li>Provide marketing communications (with consent)</li>
                  <li>Send newsletters and promotional materials (opt-in only)</li>
                  <li>Notify you of changes to our services or policies</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Improvement and Analytics</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Analyze usage patterns to improve our services</li>
                  <li>Train and enhance our AI models and algorithms</li>
                  <li>Conduct research and development activities</li>
                  <li>Generate aggregate analytics and reports</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.4 Legal and Security</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Comply with legal obligations and regulatory requirements</li>
                  <li>Protect against fraud, abuse, and security threats</li>
                  <li>Enforce our terms of service and policies</li>
                  <li>Resolve disputes and legal matters</li>
                </ul>
              </div>

              {/* Information Sharing */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Service Providers</h3>
                <p className="text-gray-700 mb-4">We may share information with trusted third-party service providers who assist us in:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Cloud hosting and data storage (AWS, Google Cloud, Microsoft Azure)</li>
                  <li>Payment processing (Stripe, PayPal)</li>
                  <li>Email and communication services (SendGrid, Mailchimp)</li>
                  <li>Analytics and performance monitoring (Google Analytics, Mixpanel)</li>
                  <li>Customer support and helpdesk services</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Business Transfers</h3>
                <p className="text-gray-700 mb-6">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction. We will notify you of any such change in ownership or control.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Legal Requirements</h3>
                <p className="text-gray-700 mb-4">We may disclose your information when required by law or to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Comply with legal processes, court orders, or government requests</li>
                  <li>Protect our rights, property, or safety</li>
                  <li>Protect the rights, property, or safety of our users</li>
                  <li>Prevent fraud or illegal activities</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.4 Consent-Based Sharing</h3>
                <p className="text-gray-700">
                  We may share your information with third parties when you have given us explicit consent to do so.
                </p>
              </div>

              {/* Data Security */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                <p className="text-gray-700 mb-4">
                  We implement industry-standard security measures to protect your information:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Lock className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">Encryption</h4>
                    </div>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                      <li>SSL/TLS encryption for data in transit</li>
                      <li>AES-256 encryption for data at rest</li>
                      <li>End-to-end encryption for sensitive communications</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">Access Controls</h4>
                    </div>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                      <li>Multi-factor authentication</li>
                      <li>Role-based access permissions</li>
                      <li>Regular access reviews and audits</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-yellow-800">
                      <strong>Important:</strong> While we implement robust security measures, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to protecting your information using industry best practices.
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Rights */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 GDPR Rights (EU Residents)</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li><strong>Right to Access:</strong> Request copies of your personal data</li>
                  <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
                  <li><strong>Right to Data Portability:</strong> Request transfer of data to another service</li>
                  <li><strong>Right to Object:</strong> Object to processing for direct marketing</li>
                  <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 CCPA Rights (California Residents)</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li><strong>Right to Know:</strong> Information about data collection and use</li>
                  <li><strong>Right to Delete:</strong> Request deletion of personal information</li>
                  <li><strong>Right to Opt-Out:</strong> Opt-out of sale of personal information</li>
                  <li><strong>Right to Non-Discrimination:</strong> Equal service regardless of privacy choices</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.3 General Rights</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li><strong>Account Management:</strong> Update, modify, or delete your account</li>
                  <li><strong>Communication Preferences:</strong> Opt-out of marketing communications</li>
                  <li><strong>Cookie Settings:</strong> Manage cookie preferences</li>
                  <li><strong>Data Download:</strong> Request a copy of your data</li>
                </ul>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800">
                    <strong>To exercise your rights:</strong> Contact us at <a href="mailto:privacy@askwhygrowth.com" className="underline">privacy@askwhygrowth.com</a> or use our data request form. We will respond within 30 days (or as required by applicable law).
                  </p>
                </div>
              </div>

              {/* Cookies and Tracking */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar technologies to enhance your experience and improve our services.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.1 Types of Cookies We Use</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                  <li><strong>Performance Cookies:</strong> Help us analyze site usage and performance</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Marketing Cookies:</strong> Track effectiveness of marketing campaigns</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.2 Managing Cookies</h3>
                <p className="text-gray-700 mb-4">
                  You can control cookies through your browser settings. However, disabling certain cookies may affect site functionality.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.3 Opt-Out Options</h3>
                <p className="text-gray-700 mb-4">
                  You can opt out of certain tracking and advertising cookies through these resources:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>Google Analytics:</strong>
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Analytics Opt-out Browser Add-on
                    </a>
                  </li>
                  <li>
                    <strong>Facebook:</strong>
                    <a
                      href="https://www.facebook.com/settings?tab=ads"
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook Ad Preferences
                    </a>
                  </li>
                  <li>
                    <strong>Network Advertising Initiative:</strong>
                    <a
                      href="http://optout.networkadvertising.org/"
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      NAI Consumer Opt-out
                    </a>
                  </li>
                  <li>
                    <strong>Digital Advertising Alliance:</strong>
                    <a
                      href="http://optout.aboutads.info/"
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DAA Consumer Choice
                    </a>
                  </li>
                </ul>
              </div>

              {/* International Transfers */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
                <p className="text-gray-700 mb-4">
                  Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Standard Contractual Clauses approved by the European Commission</li>
                  <li>Adequacy decisions for countries with adequate protection levels</li>
                  <li>Certification schemes and codes of conduct</li>
                  <li>Binding Corporate Rules for intra-group transfers</li>
                </ul>
              </div>

              {/* Data Retention */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data Retention</h2>
                <p className="text-gray-700 mb-4">
                  We retain your information for as long as necessary to provide our services and comply with legal obligations:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li><strong>Account Data:</strong> Retained while your account is active plus 3 years after closure</li>
                  <li><strong>Communication Records:</strong> Retained for 7 years for business and legal purposes</li>
                  <li><strong>AI Training Data:</strong> Anonymized data may be retained indefinitely for model improvement</li>
                  <li><strong>Marketing Data:</strong> Retained until you opt-out or 5 years from last interaction</li>
                  <li><strong>Legal Compliance:</strong> As required by applicable laws and regulations</li>
                </ul>
              </div>

              {/* Children's Privacy */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
                <p className="text-gray-700 mb-4">
                  Our services are not directed to children under 16 years of age. We do not knowingly collect personal information from children under 16. If you believe we have collected information from a child under 16, please contact us immediately.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="text-red-800">
                      <strong>Parental Notice:</strong> If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <a href="mailto:privacy@askwhygrowth.com" className="underline">privacy@askwhygrowth.com</a>.
                    </div>
                  </div>
                </div>
              </div>

              {/* Updates to Policy */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Updates to This Privacy Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Privacy Policy periodically to reflect changes in our practices or for legal, operational, or regulatory reasons. We will:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Post the updated policy on our website with a new "Last Updated" date</li>
                  <li>Notify you by email if the changes are material</li>
                  <li>Provide prominent notice on our website for significant changes</li>
                  <li>Give you the opportunity to review changes before they take effect</li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
                <p className="text-gray-700 mb-6">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">General Inquiries</h3>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Email:</strong> privacy@askwhygrowth.com</p>
                      <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                      <p><strong>Mail:</strong><br />
                        Ask Why? Growth<br />
                        Privacy Officer<br />
                        123 AI Innovation Drive<br />
                        Tech City, TC 12345<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Data Protection Officer</h3>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Email:</strong> dpo@askwhygrowth.com</p>
                      <p><strong>Role:</strong> EU GDPR Compliance</p>
                      <p className="text-sm text-gray-600 mt-4">
                        Our Data Protection Officer is available to answer questions about your rights under GDPR and other privacy regulations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800">
                    <strong>Response Time:</strong> We aim to respond to all privacy inquiries within 48 hours and formal requests within 30 days (or as required by applicable law).
                  </p>
                </div>
              </div>

              {/* Supervisory Authority */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Supervisory Authority</h2>
                <p className="text-gray-700 mb-4">
                  If you are located in the European Union and believe we have not addressed your concerns, you have the right to lodge a complaint with your local data protection supervisory authority.
                </p>
                <p className="text-gray-700">
                  For a list of supervisory authorities, visit: <a href="https://edpb.europa.eu/about-edpb/board/members_en" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">https://edpb.europa.eu/about-edpb/board/members_en</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;