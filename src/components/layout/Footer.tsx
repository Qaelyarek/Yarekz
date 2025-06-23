import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t-4 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/logos/LOGO QY Growth.png" 
                alt="Ask Why? Growth Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <span className="text-2xl font-bold text-white">
                  Ask Why? Growth
                </span>
                <div className="text-xs text-gray-400">AI Solutions</div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transform your business with cutting-edge AI technology. Automate processes, 
              enhance customer engagement, and boost conversions.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 border border-gray-600 rounded-lg flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-600 rounded-lg flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-600 rounded-lg flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-600 rounded-lg flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <div className="w-12 h-0.5 bg-white mb-6"></div>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/ai-solutions" className="text-gray-300 hover:text-white transition-colors duration-300">
                  AI Solutions
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Legal</h3>
            <div className="w-12 h-0.5 bg-white mb-6"></div>
            <ul className="space-y-4">
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="/security" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Security
                </a>
              </li>
              <li>
                <a href="/compliance" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Compliance
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
            <div className="w-12 h-0.5 bg-white mb-6"></div>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-white" />
                <span className="text-gray-300">hello@askwhygrowth.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-white mt-1" />
                <span className="text-gray-300">
                  123 AI Street<br />
                  Tech City, TC 12345<br />
                  United States
                </span>
              </li>
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-3 text-white">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-transparent border border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
                />
                <button className="px-4 py-2 bg-white text-black hover:bg-gray-100 rounded-r-lg transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Ask Why? Growth. All rights reserved. | Powered by AI Innovation
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">🔒 Enterprise-grade security</span>
            <span className="text-gray-400 text-sm">⚡ 99.9% uptime</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;