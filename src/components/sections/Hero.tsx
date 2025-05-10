import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Button from '../ui/Button';

const heroContent = [
  {
    src: '/images/hero-bg.jpg',
    alt: 'Professional consulting team',
    title: 'Professional Partners for Project Delivery',
    subtitle: 'We help companies navigate complex projects and transform their operations for sustainable growth and success.'
  },
  {
    src: '/images/construction-meeting.jpg',
    alt: 'Construction project management',
    title: 'Expert Project Management Solutions',
    subtitle: 'Delivering excellence in construction and infrastructure projects with proven methodologies and expertise.'
  },
  {
    src: '/images/careers-hero.jpg',
    alt: 'Business strategy session',
    title: 'Strategic Business Consulting',
    subtitle: 'Transform your organization with data-driven strategies and innovative solutions tailored to your needs.'
  },
  {
    src: '/images/brand-promise.jpg',
    alt: 'Project delivery excellence',
    title: 'Committed to Your Success',
    subtitle: 'Our team of industry specialists ensures measurable results and long-term value for your business.'
  }
];

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo(
      heroRef.current.querySelector('.hero-subtitle'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo(
      heroRef.current.querySelector('.hero-cta'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo(
      heroRef.current.querySelectorAll('.slide-indicator'),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.8'
    );
    
    // Animate the feature cards if they exist
    const featureCards = heroRef.current.querySelectorAll('.feature-card');
    if (featureCards.length) {
      tl.fromTo(
        featureCards,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' },
        '-=0.8'
      );
    }
    
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
    
    const nextIndex = (activeIndex + 1) % heroContent.length;
    animateSlideTransition(activeIndex, nextIndex);
  };

  const goToSlide = (index: number) => {
    if (index === activeIndex || isTransitioning) return;
    setIsTransitioning(true);
    animateSlideTransition(activeIndex, index);
  };

  const animateSlideTransition = (currentIndex: number, nextIndex: number) => {
    if (!heroRef.current || !contentRef.current) {
      setActiveIndex(nextIndex);
      setIsTransitioning(false);
      return;
    }
    
    // Get current and next image containers
    const currentImage = heroRef.current.querySelector(`.slide-${currentIndex}`);
    const nextImage = heroRef.current.querySelector(`.slide-${nextIndex}`);
    
    if (!currentImage || !nextImage) {
      setActiveIndex(nextIndex);
      setIsTransitioning(false);
      return;
    }
    
    // Create timeline for smooth transition
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(nextIndex);
        setIsTransitioning(false);
      }
    });

    // Get the text elements
    const titleElement = contentRef.current.querySelector('.hero-title') as HTMLElement;
    const subtitleElement = contentRef.current.querySelector('.hero-subtitle') as HTMLElement;
    const contentElements = contentRef.current.children;
    
    // Animate slide transition
    tl
      // First animate out the content
      .to(contentElements, { 
        y: -30, 
        opacity: 0, 
        duration: 0.5, 
        stagger: 0.1, 
        ease: 'power2.in',
        onComplete: () => {
          // Update the text content when it's invisible
          if (titleElement && subtitleElement) {
            titleElement.textContent = heroContent[nextIndex].title;
            subtitleElement.textContent = heroContent[nextIndex].subtitle;
          }
        }
      })
      // Setup next slide to fade in
      .set(nextImage, { 
        zIndex: 1, 
        opacity: 0,
        scale: 1.05
      })
      .set(currentImage, { 
        zIndex: 2 
      })
      // Animate the crossfade between slides
      .to(nextImage, { 
        opacity: 1, 
        scale: 1, 
        duration: 1.5, 
        ease: 'power2.inOut' 
      })
      .to(currentImage, { 
        opacity: 0, 
        scale: 0.95,
        duration: 1.3, 
        ease: 'power2.inOut' 
      }, '-=1.5')
      // Animate in the content
      .to(contentElements, { 
        y: 0, 
        opacity: 1, 
        duration: 0.7, 
        stagger: 0.1, 
        ease: 'power2.out' 
      }, '-=0.8')
      // Update indicator dots
      .to(
        heroRef.current.querySelector(`.slide-indicator-${currentIndex}`), 
        { scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)', duration: 0.4 }, 
        '-=1'
      )
      .to(
        heroRef.current.querySelector(`.slide-indicator-${nextIndex}`), 
        { scale: 1.25, backgroundColor: '#ffffff', duration: 0.4 }, 
        '-=1'
      );
  };

  return (
    <div 
      ref={heroRef}
      className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroContent.map((slide, index) => (
          <div 
            key={index}
            className={`slide-${index} absolute inset-0 transition-opacity duration-1000`}
            style={{ opacity: index === activeIndex ? 1 : 0, zIndex: index === activeIndex ? 2 : 1 }}
          >
            <img 
              src={slide.src} 
              alt={slide.alt} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-blue-900/60"></div>
          </div>
        ))}
      </div>
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="text-white">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {heroContent[activeIndex].title}
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl mb-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              {heroContent[activeIndex].subtitle}
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
                  <div className="flex items-center gap-4 feature-card">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">Expert Consultation</h3>
                      <p className="text-gray-100 text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">Tailored solutions for your business</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 feature-card">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">Strategic Implementation</h3>
                      <p className="text-gray-100 text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">Turning plans into actionable results</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 feature-card">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">Continuous Growth</h3>
                      <p className="text-gray-100 text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">Long-term support for sustainable success</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Image indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroContent.map((_, index) => (
            <button
              key={index}
              onClick={() => !isTransitioning && goToSlide(index)}
              className={`slide-indicator slide-indicator-${index} w-3 h-3 rounded-full transition-all duration-300 ${
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