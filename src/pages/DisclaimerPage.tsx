import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Info, TrendingUp, Shield, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const DisclaimerPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Disclaimer - Ask Why? Growth</title>
        <meta name="description" content="Important disclaimers and limitations regarding Ask Why? Growth's AI services and website content." />
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
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Disclaimer</h1>
              <p className="text-lg text-gray-600 mb-6">
                Important information about the limitations and scope of our AI services and website content.
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
              {/* General Disclaimer */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. General Disclaimer</h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="text-red-800">
                      <p className="font-semibold mb-2">IMPORTANT NOTICE</p>
                      <p className="text-sm leading-relaxed">
                        The information and services provided by Ask Why? Growth are for general informational and business automation purposes only. While we strive for accuracy and reliability, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of our AI services, website content, or related information.
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  By using our services, you acknowledge and agree that Ask Why? Growth, its employees, agents, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our AI technology, website, or services.
                </p>
              </div>

              {/* AI Technology Disclaimer */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Artificial Intelligence Technology Disclaimer</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 AI Limitations and Accuracy</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-yellow-800 text-sm">
                      <strong>AI Technology Limitations:</strong> Our AI systems are sophisticated but not infallible. AI-generated responses may sometimes be inaccurate, incomplete, or contextually inappropriate.
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">You acknowledge and understand that:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>AI responses are generated based on patterns in training data and may not always reflect current information</li>
                  <li>AI systems can produce unexpected, biased, or incorrect outputs</li>
                  <li>AI recommendations should be reviewed and validated before implementation</li>
                  <li>AI technology is continuously evolving and improving, but current limitations exist</li>
                  <li>AI systems may misinterpret context, tone, or intent in communications</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Human Oversight Required</h3>
                <p className="text-gray-700 mb-4">
                  We strongly recommend that all AI-generated content, recommendations, and automated actions be reviewed by qualified human personnel before implementation. Our AI services are designed to assist and enhance human decision-making, not replace human judgment.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Training Data and Bias</h3>
                <p className="text-gray-700 mb-4">
                  Our AI models are trained on diverse datasets, but they may inadvertently reflect biases present in the training data. We continuously work to improve our systems, but users should be aware that AI outputs may contain inherent biases related to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Cultural, demographic, or linguistic perspectives</li>
                  <li>Industry-specific practices or assumptions</li>
                  <li>Historical data patterns and trends</li>
                  <li>Geographic or regional variations</li>
                </ul>
              </div>

              {/* Business Results Disclaimer */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Business Results and Performance Disclaimer</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 No Guarantee of Results</h3>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div className="text-orange-800 text-sm">
                      <strong>Performance Disclaimer:</strong> Past performance and case studies do not guarantee future results. Individual business outcomes may vary significantly based on numerous factors.
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">
                  While we provide examples of successful implementations and potential benefits, we make no guarantees about:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Specific revenue increases or cost savings</li>
                  <li>Lead generation volumes or conversion rates</li>
                  <li>Return on investment (ROI) or profitability</li>
                  <li>Time savings or efficiency improvements</li>
                  <li>Customer satisfaction improvements</li>
                  <li>Market share gains or competitive advantages</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Factors Affecting Results</h3>
                <p className="text-gray-700 mb-4">Business results depend on numerous factors including but not limited to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Quality of implementation and user adoption</li>
                  <li>Industry conditions and market dynamics</li>
                  <li>Existing business processes and systems</li>
                  <li>Team training and change management</li>
                  <li>Customer base characteristics and behavior</li>
                  <li>Competitive landscape and economic conditions</li>
                  <li>Regulatory changes and compliance requirements</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Testimonials and Case Studies</h3>
                <p className="text-gray-700">
                  Testimonials and case studies represent specific individual experiences and may not be typical results. These examples are provided for illustrative purposes only and should not be considered as guarantees of similar outcomes for your business.
                </p>
              </div>

              {/* Professional Advice Disclaimer */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Professional Advice Disclaimer</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Not Professional Advice</h3>
                <p className="text-gray-700 mb-4">
                  Our AI services and website content are not intended to provide and should not be considered as:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li><strong>Legal Advice:</strong> Consult qualified attorneys for legal matters</li>
                  <li><strong>Financial Advice:</strong> Consult certified financial advisors for investment decisions</li>
                  <li><strong>Tax Advice:</strong> Consult licensed tax professionals for tax planning</li>
                  <li><strong>Medical Advice:</strong> Consult healthcare professionals for health-related decisions</li>
                  <li><strong>Regulatory Compliance:</strong> Consult compliance experts for regulatory matters</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Industry-Specific Considerations</h3>
                <p className="text-gray-700 mb-4">
                  Different industries have unique regulations, requirements, and best practices. Our AI solutions provide general automation capabilities, but you are responsible for ensuring compliance with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Industry-specific regulations and standards</li>
                  <li>Professional licensing and certification requirements</li>
                  <li>Data protection and privacy laws</li>
                  <li>Consumer protection regulations</li>
                  <li>Advertising and marketing compliance</li>
                  <li>International trade and export controls</li>
                </ul>
              </div>

              {/* Technical Disclaimer */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Technical Service Disclaimer</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Service Availability</h3>
                <p className="text-gray-700 mb-4">
                  While we strive to maintain high uptime and reliability, we cannot guarantee:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>100% service availability or uptime</li>
                  <li>Uninterrupted access to our services</li>
                  <li>Error-free operation of our systems</li>
                  <li>Compatibility with all third-party systems</li>
                  <li>Data backup and recovery in all circumstances</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 System Integration</h3>
                <p className="text-gray-700 mb-4">
                  Integration with third-party systems may require additional configuration, customization, or ongoing maintenance. We are not responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Third-party system outages or failures</li>
                  <li>Data loss due to integration issues</li>
                  <li>Compatibility problems with legacy systems</li>
                  <li>Security vulnerabilities in third-party systems</li>
                  <li>Changes to third-party APIs or services</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3 Data Security and Privacy</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-blue-800 text-sm">
                      <strong>Security Notice:</strong> While we implement industry-standard security measures, no system is completely secure. You are responsible for maintaining the security of your own systems and data.
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700">
                  You acknowledge that data transmission over the internet and electronic storage of data involve inherent security risks. We recommend implementing appropriate security measures on your end and regularly backing up your data.
                </p>
              </div>

              {/* Third-Party Services */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Third-Party Services and Links</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 External Links and References</h3>
                <p className="text-gray-700 mb-4">
                  Our website may contain links to third-party websites, services, or resources. These links are provided for convenience only, and we do not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Endorse or guarantee the accuracy of third-party content</li>
                  <li>Control the availability or content of external websites</li>
                  <li>Accept responsibility for third-party privacy practices</li>
                  <li>Warrant the security of external sites or services</li>
                  <li>Monitor or verify third-party claims or representations</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Integrated Third-Party Services</h3>
                <p className="text-gray-700 mb-4">
                  Our services may integrate with third-party platforms and tools. We are not responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Third-party service outages, errors, or data loss</li>
                  <li>Changes to third-party terms, pricing, or functionality</li>
                  <li>Security breaches or privacy violations by third parties</li>
                  <li>Disputes between you and third-party service providers</li>
                  <li>Compliance with third-party terms and conditions</li>
                </ul>
              </div>

              {/* Industry-Specific Disclaimers */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Industry-Specific Disclaimers</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.1 Financial Services</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 text-sm">
                    <strong>Financial Services Disclaimer:</strong> Our AI tools are not licensed financial advisors. Any financial information or business funding guidance should be verified with qualified financial professionals and regulatory compliance experts.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.2 Healthcare and Medical</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 text-sm">
                    <strong>Healthcare Disclaimer:</strong> Our services are not intended for medical diagnosis, treatment, or healthcare decision-making. Always consult qualified healthcare professionals for medical advice.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.3 Legal and Regulatory</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 text-sm">
                    <strong>Legal Disclaimer:</strong> Our AI systems do not provide legal advice or ensure regulatory compliance. Consult qualified attorneys and compliance professionals for legal and regulatory matters.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.4 Educational Services</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 text-sm">
                    <strong>Educational Disclaimer:</strong> Information provided is for general business education purposes. Individual learning outcomes may vary, and professional development should be supplemented with formal training and certification programs.
                  </p>
                </div>
              </div>

              {/* Limitation Period */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation Period for Claims</h2>
                <p className="text-gray-700 mb-4">
                  Any claims arising from the use of our services must be brought within one (1) year from the date when the claim arose, regardless of the form of action or the basis of the claim.
                </p>
                <p className="text-gray-700">
                  This limitation period applies to all claims, whether based on contract, tort, strict liability, or any other legal theory, and regardless of whether Ask Why? Growth has been advised of the possibility of such claims.
                </p>
              </div>

              {/* Updates and Changes */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Updates to This Disclaimer</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right to update or modify this Disclaimer at any time without prior notice. Changes will be effective immediately upon posting on our website. Your continued use of our services after any changes constitutes acceptance of the updated Disclaimer.
                </p>
                <p className="text-gray-700">
                  We recommend reviewing this Disclaimer periodically to stay informed of any updates or changes that may affect your use of our services.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Questions About This Disclaimer</h2>
                <p className="text-gray-700 mb-6">
                  If you have questions about this Disclaimer or need clarification on any points, please contact us:
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> legal@askwhygrowth.com</p>
                    <p><strong>Subject Line:</strong> Disclaimer Inquiry</p>
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

                <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="text-red-800 text-sm">
                      <strong>Important:</strong> This Disclaimer is part of our Terms of Service and should be read in conjunction with our Privacy Policy and other legal documents.
                    </div>
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

export default DisclaimerPage;