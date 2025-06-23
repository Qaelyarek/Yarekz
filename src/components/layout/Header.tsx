import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MessageCircle, Phone } from 'lucide-react';
import Button from '@components/ui/Button';

interface HeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen = false }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Y</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Yarekz</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-primary-600 transition-colors">
              Services
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button variant="ghost" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
            >
              Contact
            </Link>
            <div className="pt-2 border-t border-gray-200">
              <Button variant="primary" className="w-full mb-2">
                Get Started
              </Button>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;