import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const CTASection: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!ctaRef.current) return;
    
    const elements = ctaRef.current.querySelectorAll('.cta-animate');
    
    gsap.fromTo(
      elements,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section className="py-16 md:py-20 bg-blue-600">
      <div ref={ctaRef} className="container-custom text-center">
        <h2 className="cta-animate text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Business?
        </h2>
        <p className="cta-animate text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Get in touch with our expert consultants today to discover how we can help your business reach its full potential.
        </p>
        <div className="cta-animate">
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/contact')}
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;