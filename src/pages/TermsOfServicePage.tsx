import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Scale, AlertCircle, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const TermsOfServicePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Ask Why? Growth</title>
        <meta name="description" content="Terms of Service for Ask Why? Growth - Legal terms and conditions governing the use of our AI services." />
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
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
              <p className="text-lg text-gray-600 mb-6">
                These terms govern your use of Ask Why? Growth's AI-powered services and platform.
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
              {/* Acceptance of Terms */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By accessing or using Ask Why? Growth's website, applications, or services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-yellow-800">
                      <strong>Important:</strong> These Terms constitute a legally binding agreement between you and Ask Why? Growth. Please read them carefully.
                    </div>
                  </div>
                </div>
              </div>

              {/* Definitions */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Definitions</h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li><strong>"Company," "we," "us," or "our"</strong> refers to Ask Why? Growth</li>
                  <li><strong>"User," "you," or "your"</strong> refers to any individual or entity using our Services</li>
                  <li><strong>"Services"</strong> refers to our AI-powered business solutions, website, applications, and related services</li>
                  <li><strong>"Content"</strong> refers to all information, data, text, software, graphics, or other materials</li>
                  <li><strong>"Account"</strong> refers to your registered user account with our Services</li>
                  <li><strong>"AI Technology"</strong> refers to our artificial intelligence systems, models, and algorithms</li>
                </ul>
              </div>

              {/* Description of Services */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Description of Services</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 AI-Powered Solutions</h3>
                <p className="text-gray-700 mb-4">Ask Why? Growth provides AI-powered business solutions including:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Voice-enabled AI assistants for customer interactions</li>
                  <li>Automated lead qualification and appointment setting</li>
                  <li>Business process automation and workflow optimization</li>
                  <li>Analytics and performance monitoring tools</li>
                  <li>Integration services with third-party business applications</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Service Availability</h3>
                <p className="text-gray-700 mb-4">
                  We strive to maintain 99.9% uptime for our Services. However, we do not guarantee uninterrupted access and may need to perform maintenance or updates that temporarily affect availability.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Service Modifications</h3>
                <p className="text-gray-700">
                  We reserve the right to modify, suspend, or discontinue any part of our Services at any time. We will provide reasonable notice for material changes that affect your use of the Services.
                </p>
              </div>

              {/* User Accounts */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Accounts and Registration</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Account Creation</h3>
                <p className="text-gray-700 mb-4">To access certain Services, you must create an account by providing:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Accurate and complete registration information</li>
                  <li>A valid email address</li>
                  <li>A secure password meeting our requirements</li>
                  <li>Business information relevant to our Services</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Account Security</h3>
                <p className="text-gray-700 mb-4">You are responsible for:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Immediately notifying us of any unauthorized use</li>
                  <li>Using strong passwords and enabling two-factor authentication when available</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Account Termination</h3>
                <p className="text-gray-700">
                  You may terminate your account at any time. We may suspend or terminate your account if you violate these Terms or engage in prohibited activities.
                </p>
              </div>

              {/* Acceptable Use */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Acceptable Use Policy</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Permitted Uses</h3>
                <p className="text-gray-700 mb-4">You may use our Services for legitimate business purposes, including:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Customer service automation and support</li>
                  <li>Lead generation and qualification</li>
                  <li>Business process optimization</li>
                  <li>Data analysis and insights generation</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Prohibited Activities</h3>
                <p className="text-gray-700 mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Use our Services for illegal, fraudulent, or harmful activities</li>
                  <li>Attempt to reverse engineer, decompile, or hack our AI systems</li>
                  <li>Send spam, malware, or other malicious content</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Interfere with or disrupt our Services or servers</li>
                  <li>Create multiple accounts to circumvent restrictions</li>
                  <li>Use our Services to compete with us or develop competing products</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3 Content Guidelines</h3>
                <p className="text-gray-700 mb-4">When using our Services, you must not submit content that:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Is offensive, discriminatory, or harassing</li>
                  <li>Contains personal information of third parties without consent</li>
                  <li>Violates privacy rights or confidentiality obligations</li>
                  <li>Is misleading, deceptive, or fraudulent</li>
                  <li>Contains viruses, malware, or harmful code</li>
                </ul>
              </div>

              {/* Payment Terms */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payment Terms and Billing</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Pricing and Fees</h3>
                <p className="text-gray-700 mb-4">
                  Our pricing is available on our website and may vary based on service level, usage, and other factors. All prices are exclusive of applicable taxes unless otherwise stated.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Billing and Payment</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Fees are billed in advance on a monthly or annual basis</li>
                  <li>Payment is due within 30 days of invoice date</li>
                  <li>We accept major credit cards and ACH transfers</li>
                  <li>Late payments may incur interest charges</li>
                  <li>Usage-based fees are billed monthly in arrears</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.3 Refunds and Cancellations</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Annual subscriptions may be refunded within 30 days of initial purchase</li>
                  <li>Monthly subscriptions may be cancelled at any time</li>
                  <li>Custom setup fees are non-refundable</li>
                  <li>Usage-based charges are non-refundable</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.4 Price Changes</h3>
                <p className="text-gray-700">
                  We may change our pricing with 30 days' written notice. Changes will not affect your current billing cycle.
                </p>
              </div>

              {/* Intellectual Property */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property Rights</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.1 Our Rights</h3>
                <p className="text-gray-700 mb-4">
                  Ask Why? Growth owns all rights, title, and interest in our Services, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>AI models, algorithms, and machine learning technologies</li>
                  <li>Software, applications, and user interfaces</li>
                  <li>Trademarks, logos, and brand elements</li>
                  <li>Documentation, training materials, and methodologies</li>
                  <li>Aggregate and anonymized data insights</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.2 Your Rights</h3>
                <p className="text-gray-700 mb-4">You retain ownership of:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Your original content and data submitted to our Services</li>
                  <li>Your business processes and methodologies</li>
                  <li>Your customer relationships and business information</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.3 License to Use</h3>
                <p className="text-gray-700 mb-4">
                  Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to use our Services for your internal business purposes during your subscription period.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.4 Data Usage Rights</h3>
                <p className="text-gray-700">
                  You grant us a license to use your data solely to provide Services, improve our AI systems, and generate anonymized insights. We will not share your confidential data with third parties except as required to provide Services.
                </p>
              </div>

              {/* Privacy and Data Protection */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privacy and Data Protection</h2>
                <p className="text-gray-700 mb-4">
                  Your privacy is important to us. Our collection and use of personal information is governed by our <Link to="/privacy-policy" className="text-blue-600 underline">Privacy Policy</Link>, which is incorporated into these Terms by reference.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">8.1 Data Security</h3>
                <p className="text-gray-700 mb-4">We implement industry-standard security measures to protect your data, including:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Access controls and authentication requirements</li>
                  <li>Employee training on data protection practices</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">8.2 Data Portability</h3>
                <p className="text-gray-700">
                  You may export your data from our Services at any time using our standard export tools or by requesting assistance from our support team.
                </p>
              </div>

              {/* Warranties and Disclaimers */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Warranties and Disclaimers</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">9.1 Limited Warranty</h3>
                <p className="text-gray-700 mb-4">
                  We warrant that our Services will perform substantially in accordance with our documentation under normal use conditions. This warranty is limited to material breaches and does not cover issues caused by misuse or third-party factors.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">9.2 Disclaimer</h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="text-red-800">
                      <strong>EXCEPT AS EXPRESSLY PROVIDED, OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</strong>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">9.3 AI Technology Limitations</h3>
                <p className="text-gray-700 mb-4">You acknowledge that:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>AI systems may produce unexpected or inaccurate results</li>
                  <li>AI responses should be reviewed before taking business actions</li>
                  <li>We do not guarantee specific business outcomes or results</li>
                  <li>AI technology is continuously evolving and improving</li>
                </ul>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="text-red-800">
                      <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, ASK WHY? GROWTH SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, DATA LOSS, OR BUSINESS INTERRUPTION.</strong>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">10.1 Liability Cap</h3>
                <p className="text-gray-700 mb-4">
                  Our total liability for all claims arising out of or relating to these Terms or the Services shall not exceed the amount you paid us in the 12 months preceding the claim.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">10.2 Essential Purpose</h3>
                <p className="text-gray-700">
                  These limitations are essential elements of the bargain between us and will apply even if any limited remedy fails of its essential purpose.
                </p>
              </div>

              {/* Indemnification */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Indemnification</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">11.1 Your Indemnification</h3>
                <p className="text-gray-700 mb-4">You agree to indemnify and hold harmless Ask Why? Growth from claims arising from:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Your use of the Services in violation of these Terms</li>
                  <li>Your content or data that infringes third-party rights</li>
                  <li>Your negligent or wrongful acts</li>
                  <li>Your violation of applicable laws or regulations</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">11.2 Our Indemnification</h3>
                <p className="text-gray-700">
                  We will defend you against third-party claims that our Services infringe a patent, copyright, or trademark, provided you promptly notify us and cooperate in the defense.
                </p>
              </div>

              {/* Termination */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Termination</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">12.1 Termination by You</h3>
                <p className="text-gray-700 mb-4">
                  You may terminate these Terms at any time by cancelling your subscription and ceasing use of our Services.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">12.2 Termination by Us</h3>
                <p className="text-gray-700 mb-4">We may terminate these Terms or suspend your access if:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>You breach these Terms and fail to cure within 30 days</li>
                  <li>You fail to pay fees when due</li>
                  <li>We reasonably believe continued provision of Services would be illegal</li>
                  <li>You engage in prohibited activities that harm our business or other users</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">12.3 Effect of Termination</h3>
                <p className="text-gray-700 mb-4">Upon termination:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Your right to use the Services immediately ceases</li>
                  <li>We will provide 30 days to export your data</li>
                  <li>Outstanding fees become immediately due</li>
                  <li>Confidentiality obligations continue indefinitely</li>
                </ul>
              </div>

              {/* Dispute Resolution */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Dispute Resolution</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">13.1 Informal Resolution</h3>
                <p className="text-gray-700 mb-4">
                  Before filing any formal legal action, you agree to first contact us at <a href="mailto:legal@askwhygrowth.com" className="text-blue-600 underline">legal@askwhygrowth.com</a> to attempt to resolve the dispute informally.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">13.2 Binding Arbitration</h3>
                <p className="text-gray-700 mb-4">
                  Any disputes that cannot be resolved informally shall be resolved through binding arbitration administered by the American Arbitration Association under its Commercial Arbitration Rules.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">13.3 Class Action Waiver</h3>
                <p className="text-gray-700">
                  You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.
                </p>
              </div>

              {/* Governing Law */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Governing Law</h2>
                <p className="text-gray-700 mb-4">
                  These Terms are governed by the laws of the State of Delaware, without regard to conflict of law principles. Any legal action must be brought in the state or federal courts located in Delaware.
                </p>
              </div>

              {/* Miscellaneous */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Miscellaneous Provisions</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">15.1 Entire Agreement</h3>
                <p className="text-gray-700 mb-4">
                  These Terms, together with our Privacy Policy and any applicable service agreements, constitute the entire agreement between you and Ask Why? Growth.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">15.2 Severability</h3>
                <p className="text-gray-700 mb-4">
                  If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">15.3 Assignment</h3>
                <p className="text-gray-700 mb-4">
                  You may not assign these Terms without our written consent. We may assign these Terms in connection with a merger, acquisition, or sale of assets.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">15.4 Force Majeure</h3>
                <p className="text-gray-700 mb-4">
                  Neither party will be liable for delays or failures in performance resulting from causes beyond their reasonable control, including natural disasters, government actions, or pandemics.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">15.5 Notices</h3>
                <p className="text-gray-700">
                  Legal notices must be sent to <a href="mailto:legal@askwhygrowth.com" className="text-blue-600 underline">legal@askwhygrowth.com</a>. We may provide notices to you via email or through our Services.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Contact Information</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    For questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> legal@askwhygrowth.com</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                    <p><strong>Mail:</strong><br />
                      Ask Why? Growth<br />
                      Legal Department<br />
                      123 AI Innovation Drive<br />
                      Tech City, TC 12345<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TermsOfServicePage;