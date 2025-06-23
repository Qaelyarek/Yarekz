import React, { useState } from 'react';
import { Mail, Phone, User, ArrowRight } from 'lucide-react';
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
    phone: '',
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

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
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
        phone: formData.phone.trim() || undefined,
        source: 'website',
        status: 'new',
        score: 25, // Initial score for form submission
        interactions: [
          {
            id: generateId(),
            type: 'form',
            content: `Lead captured via form: ${formData.name} (${formData.email})`,
            timestamp: new Date(),
            aiGenerated: false,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await onSubmit(leadData);
      
      // Reset form
      setFormData({ name: '', email: '', phone: '' });
      
      // Show success message (you might want to add a success state)
      alert('Thank you! We\'ll be in touch soon.');
      
    } catch (error) {
      console.error('Lead submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            name="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            className="pl-10"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="email"
            name="email"
            placeholder="Your email address"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            className="pl-10"
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="tel"
            name="phone"
            placeholder="Your phone number (optional)"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
            className="pl-10"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          className="w-full"
        >
          Get Started
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          By submitting this form, you agree to our{' '}
          <a href="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="/terms" className="text-primary-600 hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
};

export default LeadCapture;