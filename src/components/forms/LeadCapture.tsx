import React, { useState } from 'react';
import { Mail, User, ArrowRight, Shield, MessageCircle, Building } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { validateEmail, generateId } from '../../utils/index';
import type { Lead } from '../../types/index';

interface LeadCaptureProps {
  onSubmit: (lead: Partial<Lead>) => void;
  title?: string;
  subtitle?: string;
  className?: string;
}

const LeadCapture: React.FC<LeadCaptureProps> = ({
  onSubmit,
  title = "Get Your AI Demo",
  subtitle = "See how AI can 10x your appointments",
  className = "",
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.industry) {
      newErrors.industry = 'Please select your industry';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const leadData: Partial<Lead> = {
        id: generateId(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        source: 'website',
        status: 'new',
        score: 50, // Higher initial score for CEO funnel
        interactions: [
          {
            id: generateId(),
            type: 'form',
            content: `CEO lead captured: ${formData.name} (${formData.email}) from ${formData.company} - ${formData.industry} industry`,
            timestamp: new Date(),
            aiGenerated: false,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await onSubmit(leadData);
      
      // Reset form
      setFormData({ name: '', email: '', company: '', industry: '' });
      
      // Show success message
      alert('Success! We\'ll contact you within 15 minutes to schedule your AI demo.');
      
    } catch (error) {
      console.error('Lead submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 ${className}`}>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <img 
            src="/logos/LOGO QY Growth.png" 
            alt="QY Growth Logo" 
            className="w-12 h-12 object-contain"
          />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
        
        {/* Urgency indicator */}
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center justify-center text-red-700 text-sm font-medium">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            Limited: Only 50 CEOs accepted this month
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            name="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            className="pl-12 py-4 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="email"
            name="email"
            placeholder="Your CEO/executive email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            className="pl-12 py-4 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            name="company"
            placeholder="Company name"
            value={formData.company}
            onChange={handleInputChange}
            error={errors.company}
            className="pl-12 py-4 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <select
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            className={`w-full px-4 py-4 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
              errors.industry ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
            }`}
          >
            <option value="">Select your industry</option>
            <option value="business-funding">Business Funding & Tax Strategy</option>
            <option value="ecommerce">Ecommerce</option>
            <option value="business-coaching">Business Coaching</option>
            <option value="other">Other</option>
          </select>
          {errors.industry && (
            <p className="mt-1 text-sm text-red-600">{errors.industry}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          {isSubmitting ? (
            'Submitting...'
          ) : (
            <>
              <MessageCircle className="mr-2 w-5 h-5" />
              Get My AI Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-3">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Your information is 100% secure</span>
        </div>
        
        <p className="text-xs text-gray-500 leading-relaxed">
          By submitting this form, you agree to be contacted about our AI solutions. 
          We respect your privacy and will never share your information.
        </p>
      </div>
    </div>
  );
};

export default LeadCapture;