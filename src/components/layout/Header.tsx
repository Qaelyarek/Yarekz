import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, Phone } from 'lucide-react';
import Button from '../ui/Button';
import VAPIService from '../../ai-services/vapi-official';

interface HeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [callState, setCallState] = useState(VAPIService.getCallState());
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for VAPI call state changes
  useEffect(() => {
    const handleCallStateChanged = (newCallState: any) => {
      setCallState(newCallState);
      setIsConnecting(newCallState.isConnecting);
    };

    VAPIService.on('call-state-changed', handleCallStateChanged);
    
    return () => {
      VAPIService.off('call-state-changed', handleCallStateChanged);
    };
  }, []);

  const handleCallAI = async () => {
    if (isConnecting || callState.inCall) return;
    
    try {
      console.log('🎯 Header: Starting VAPI call...');
      const result = await VAPIService.startCall();
      
      if (!result.success) {
        alert(`Failed to connect: ${result.message}`);
      }
      // Success will be handled by VAPI events
    } catch (error) {
      console.error('Header: Failed to connect to AI agent:', error);
      alert('Failed to connect to AI agent. Please try again.');
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'AI Features', path: '/ai-features' },
    { name: 'AI Solutions', path: '/ai-solutions' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact', path: '/contact-us' },
  ];

  const getCallButtonClasses = () => {
    let baseClasses = "vapi-call-button border-0 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed";
    
    if (isConnecting) {
      baseClasses += " connecting";
    } else if (callState.inCall) {
      baseClasses += " active";
    }
    
    return `${baseClasses} ${
      !isScrolled && location.pathname === '/' 
        ? 'bg-white text-black hover:bg-gray-100' 
        : 'bg-black text-white hover:bg-gray-800'
    }`;
  };

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
                  src="/logos/LOGO QY Growth.png" 
                  alt="Ask Why? Growth - AI Appointment Setting for CEOs" 
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
                  Ask Why? Growth
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
            <Link 
              to="/schedule-demo"
              className={`inline-flex items-center px-4 py-2 border-2 rounded-lg font-medium transition-all duration-300 ${
                !isScrolled && location.pathname === '/' 
                  ? 'text-white border-white hover:bg-white hover:text-black' 
                  : 'text-black border-black hover:bg-black hover:text-white'
              }`}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Schedule Demo
            </Link>
            
            <Button 
              variant="primary" 
              size="sm"
              onClick={handleCallAI}
              disabled={isConnecting}
              className={getCallButtonClasses()}
              data-vapi-call="true"
            >
              <Phone className={`w-4 h-4 mr-2 ${isConnecting ? 'animate-pulse' : ''}`} />
              {isConnecting ? 'Connecting...' : callState.inCall ? 'End Call' : 'Talk to AI'}
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
                onClick={handleCallAI}
                disabled={isConnecting}
                className="w-full mb-3 bg-black text-white disabled:opacity-50 vapi-call-button"
                data-vapi-call="true"
              >
                <Phone className={`w-4 h-4 mr-2 ${isConnecting ? 'animate-pulse' : ''}`} />
                {isConnecting ? 'Connecting...' : callState.inCall ? 'End Call' : 'Talk to AI Assistant'}
              </Button>
              
              <div className="flex space-x-3">
                <Link
                  to="/schedule-demo"
                  className="flex-1 text-center px-4 py-2 border-2 border-black text-black rounded-lg font-medium hover:bg-black hover:text-white transition-all duration-300"
                  onClick={onMenuToggle}
                >
                  <MessageCircle className="w-4 h-4 mr-2 inline" />
                  Schedule Demo
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCallAI}
                  disabled={isConnecting}
                  className="flex-1 border-2 border-black text-black disabled:opacity-50 vapi-call-button"
                  data-vapi-call="true"
                >
                  <Phone className={`w-4 h-4 mr-2 ${isConnecting ? 'animate-pulse' : ''}`} />
                  Call AI
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