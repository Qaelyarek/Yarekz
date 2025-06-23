import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  results: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechVision Inc.",
    content: "Yarekz transformed our customer engagement completely. The AI chat support handles 80% of our inquiries automatically, and our conversion rate increased by 250%.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    results: "250% increase in conversions"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director",
    company: "GrowthLab",
    content: "The AI-powered analytics dashboard gave us insights we never had before. We optimized our campaigns and saw immediate results in lead quality and ROI.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    results: "300% ROI improvement"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Operations Manager",
    company: "ScaleUp Solutions",
    content: "The workflow automation saved us 20 hours per week. Our team can now focus on strategic work while AI handles routine tasks perfectly.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/3783376/pexels-photo-3783376.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    results: "20 hours saved weekly"
  },
  {
    id: 4,
    name: "David Park",
    role: "Founder",
    company: "InnovateHub",
    content: "Voice integration was a game-changer for our customer experience. The natural conversations and instant responses impressed our clients and boosted satisfaction scores.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    results: "95% customer satisfaction"
  }
];

const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-4">
            Client Success Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how businesses like yours are achieving remarkable results with our AI solutions
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 mx-auto max-w-4xl">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Avatar and Company */}
              <div className="flex-shrink-0 text-center lg:text-left">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full mx-auto lg:mx-0 mb-4 object-cover ring-4 ring-blue-100"
                />
                <h4 className="font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                <p className="text-blue-600 font-semibold">{testimonials[currentIndex].company}</p>
                
                {/* Results Badge */}
                <div className="mt-4 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {testimonials[currentIndex].results}
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-blue-200 mb-4" />
                
                <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
                  "{testimonials[currentIndex].content}"
                </blockquote>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Client Logos */}
        <div className="mt-16">
          <p className="text-center text-gray-500 mb-8">Trusted by leading companies worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {/* Placeholder logos - replace with actual client logos */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 h-12 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 font-semibold">Logo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;