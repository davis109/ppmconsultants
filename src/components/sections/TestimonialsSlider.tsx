import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from '../ui/TestimonialCard';
import SectionHeading from '../ui/SectionHeading';

const testimonials = [
  {
    quote: "PPM Consultants helped us identify key operational inefficiencies and implement solutions that boosted our productivity by 30%. Their expertise and attention to detail were exceptional.",
    author: "Rahul Sharma",
    role: "CEO",
    company: "InnoTech Solutions",
  },
  {
    quote: "Working with PPM Consultants transformed our approach to strategic planning. Their team provided invaluable insights that have guided our business growth for the past two years.",
    author: "Priya Patel",
    role: "COO",
    company: "MindfulMedia",
  },
  {
    quote: "The financial advisory services from PPM Consultants gave us the clarity we needed during a critical expansion phase. Their guidance helped us secure funding and optimize our resource allocation.",
    author: "Vikram Singh",
    role: "CFO",
    company: "Nexus Enterprises",
  },
  {
    quote: "PPM Consultants delivered beyond our expectations. Their team took the time to understand our unique challenges and developed a customized solution that perfectly addressed our needs.",
    author: "Ananya Desai",
    role: "Director",
    company: "Vertex Analytics",
  },
];

const TestimonialsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.ceil(testimonials.length / 2) - 1;
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const goToNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, maxIndex));
  };
  
  const goToPrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };
  
  useEffect(() => {
    if (!sliderRef.current) return;
    
    gsap.to(sliderRef.current, {
      x: `-${currentIndex * 100}%`,
      duration: 0.6,
      ease: 'power2.out',
    });
  }, [currentIndex]);

  return (
    <section className="section bg-blue-50">
      <div className="container-custom">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Don't just take our word for it - hear from some of our satisfied clients about their experience working with PPM Consultants."
          centered
        />
        
        <div className="relative overflow-hidden">
          <div 
            ref={sliderRef}
            className="flex transition-all duration-500 ease-in-out"
            style={{ width: `${testimonials.length * 50}%` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-1/2 p-4">
                <TestimonialCard
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  company={testimonial.company}
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full ${
                currentIndex === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex === maxIndex}
              className={`p-2 rounded-full ${
                currentIndex === maxIndex 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;