import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Button from '../ui/Button';

const heroImages = [
  {
    src: '/images/hero-bg.jpg',
    alt: 'Professional consulting team'
  },
  {
    src: '/images/construction-meeting.jpg',
    alt: 'Construction project management'
  },
  {
    src: '/images/careers-hero.jpg',
    alt: 'Business strategy session'
  },
  {
    src: '/images/brand-promise.jpg',
    alt: 'Project delivery excellence'
  }
];

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Initial animations for text elements
  useEffect(() => {
    if (!heroRef.current) return;
    
    const tl = gsap.timeline();
    
    tl.fromTo(
      heroRef.current.querySelector('.hero-title'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(
      heroRef.current.querySelector('.hero-subtitle'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.7'
    )
    .fromTo(
      heroRef.current.querySelector('.hero-cta'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.7'
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  // Image carousel setup
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        goToNextSlide();
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isTransitioning]);

  // Handle transition between slides
  const goToNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const nextIndex = (activeIndex + 1) % heroImages.length;
    
    if (!heroRef.current) {
      setActiveIndex(nextIndex);
      setIsTransitioning(false);
      return;
    }
    
    // Get current and next image containers
    const currentImage = heroRef.current.querySelector(`.slide-${activeIndex}`);
    const nextImage = heroRef.current.querySelector(`.slide-${nextIndex}`);
    
    if (!currentImage || !nextImage) {
      setActiveIndex(nextIndex);
      setIsTransitioning(false);
      return;
    }
    
    // Animate transition
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(nextIndex);
        setIsTransitioning(false);
      }
    });
    
    tl.set(nextImage, { zIndex: 1, opacity: 0 })
      .set(currentImage, { zIndex: 2 })
      .to(nextImage, { opacity: 1, duration: 1.2, ease: 'power2.inOut' })
      .to(currentImage, { opacity: 0, duration: 1, ease: 'power2.inOut' }, '-=0.9');
  };

  const goToSlide = (index: number) => {
    if (index === activeIndex || isTransitioning) return;
    setIsTransitioning(true);
    
    if (!heroRef.current) {
      setActiveIndex(index);
      setIsTransitioning(false);
      return;
    }
    
    // Get current and selected image containers
    const currentImage = heroRef.current.querySelector(`.slide-${activeIndex}`);
    const nextImage = heroRef.current.querySelector(`.slide-${index}`);
    
    if (!currentImage || !nextImage) {
      setActiveIndex(index);
      setIsTransitioning(false);
      return;
    }
    
    // Animate transition
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(index);
        setIsTransitioning(false);
      }
    });
    
    tl.set(nextImage, { zIndex: 1, opacity: 0 })
      .set(currentImage, { zIndex: 2 })
      .to(nextImage, { opacity: 1, duration: 1.2, ease: 'power2.inOut' })
      .to(currentImage, { opacity: 0, duration: 1, ease: 'power2.inOut' }, '-=0.9');
  };

  return (
    <div 
      ref={heroRef}
      className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroImages.map((image, index) => (
          <div 
            key={index}
            className={`slide-${index} absolute inset-0 transition-opacity duration-1000`}
            style={{ opacity: index === activeIndex ? 1 : 0, zIndex: index === activeIndex ? 2 : 1 }}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-blue-900/80"></div>
          </div>
        ))}
      </div>
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-shadow-lg">
              Professional Partners for Project Delivery
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl mb-8 text-white text-shadow-md">
              We help companies navigate complex projects and transform their operations for sustainable growth and success.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => navigate('/contact')}
                className="bg-white text-blue-700 hover:bg-gray-100"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/services')}
                className="border-white text-white hover:bg-white/20"
              >
                Our Services
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex justify-end">
            <div className="relative w-full max-w-lg">
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-white/10 rounded-full filter blur-xl opacity-50"></div>
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-white/10 rounded-full filter blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-white/20 to-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20 shadow-2xl overflow-hidden">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-shadow-sm">Expert Consultation</h3>
                      <p className="text-gray-100 text-sm text-shadow-sm">Tailored solutions for your business</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-shadow-sm">Strategic Implementation</h3>
                      <p className="text-gray-100 text-sm text-shadow-sm">Turning plans into actionable results</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-shadow-sm">Continuous Growth</h3>
                      <p className="text-gray-100 text-sm text-shadow-sm">Long-term support for sustainable success</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Image indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => !isTransitioning && goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`View slide ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;