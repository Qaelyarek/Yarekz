import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, Phone } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'AI Solutions', path: '/ai-solutions' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src={!isScrolled && location.pathname === '/' ? "/logos/SystemAQ-logo(w).png" : "/logos/SystemAQ-logo.png"} 
                  alt="QY Growth Logo" 
                  className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className={`text-2xl font-bold ${
                  !isScrolled && location.pathname === '/' 
                    ? 'text-white' 
                    : 'text-black'
                }`}>
                  QY Growth
                </span>
                <span className={`text-xs font-medium ${
                  !isScrolled && location.pathname === '/' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  AI Solutions
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-medium transition-colors duration-300 ${
                  location.pathname === item.path
                    ? (!isScrolled && location.pathname === '/' ? 'text-white' : 'text-black')
                    : !isScrolled && location.pathname === '/'
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <div className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                    !isScrolled && location.pathname === '/' ? 'bg-white' : 'bg-black'
                  }`}></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              className={`${
                !isScrolled && location.pathname === '/' 
                  ? 'text-white border-white hover:bg-white hover:text-black' 
                  : 'text-black border-black hover:bg-black hover:text-white'
              } border-2`}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
            
            <Button 
              variant="primary" 
              size="sm"
              className={`${
                !isScrolled && location.pathname === '/' 
                  ? 'bg-white text-black hover:bg-gray-100' 
                  : 'bg-black text-white hover:bg-gray-800'
              } border-0 shadow-lg`}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call AI
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
              !isScrolled && location.pathname === '/' 
                ? 'text-white hover:bg-white/10' 
                : 'text-black hover:bg-gray-100'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-black text-white'
                    : 'text-black hover:bg-gray-100'
                }`}
                onClick={onMenuToggle}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-gray-200">
              <Button 
                variant="primary" 
                className="w-full mb-3 bg-black text-white"
              >
                Call AI Agent
              </Button>
              
              <div className="flex space-x-3">
                <Button variant="ghost" size="sm" className="flex-1 border-2 border-black text-black">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 border-2 border-black text-black">
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