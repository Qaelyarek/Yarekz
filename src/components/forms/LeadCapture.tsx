import React, { useState } from 'react';
import { Mail, Phone, User, ArrowRight, Shield, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { validateEmail, validatePhone, generateId } from '../../utils/index';
import type { Lead } from '../../types/index';

interface LeadCaptureProps {
  onSubmit: (lead: Partial<Lead>) => void;
  title?: string;
  subtitle?: string;
  className?: string;
}

const LeadCapture: React.FC<LeadCaptureProps> = ({
  onSubmit,
  title = "Get Started Today",
  subtitle = "Join thousands of satisfied customers",
  className = "",
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        score: 25, // Initial score for form submission
        interactions: [
          {
            id: generateId(),
            type: 'form',
            content: `Lead captured via form: ${formData.name} (${formData.email}) from ${formData.company}`,
            timestamp: new Date(),
            aiGenerated: false,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await onSubmit(leadData);
      
      // Reset form
      setFormData({ name: '', email: '', company: '' });
      
      // Show success message (you might want to add a success state)
      alert('Thank you! We\'ll be in touch soon with your personalized AI recommendations.');
      
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
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
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
            placeholder="Your work email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            className="pl-12 py-4 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
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

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          {isSubmitting ? (
            'Processing...'
          ) : (
            <>
              Start Your AI Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-3">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Enterprise-grade security & privacy</span>
        </div>
        
        <p className="text-xs text-gray-500 leading-relaxed">
          By submitting this form, you agree to our{' '}
          <a href="/privacy" className="text-blue-600 hover:underline font-medium">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="/terms" className="text-blue-600 hover:underline font-medium">
            Terms of Service
          </a>
          . We respect your privacy and will never share your information.
        </p>
      </div>
    </div>
  );
};

export default LeadCapture;