import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

// Images for the Who We Are section
const aboutImages = [
  '/images/about-image.jpg',
  '/images/company-image.jpg',
  '/images/careers-team.jpg'
];

const AboutPreview: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Image transition effect
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % aboutImages.length;
      
      if (imageRef.current) {
        const currentImage = imageRef.current.querySelector(`.about-img-${currentImageIndex}`);
        const nextImage = imageRef.current.querySelector(`.about-img-${nextIndex}`);
        
        if (currentImage && nextImage) {
          gsap.to(currentImage, {
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: 'power2.inOut'
          });
          
          gsap.fromTo(
            nextImage,
            {
              opacity: 0,
              scale: 1.05
            },
            {
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: 'power2.inOut'
            }
          );
        }
      }
      
      setCurrentImageIndex(nextIndex);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentImageIndex]);
  
  // Initial setup - ensure the first image is visible
  useEffect(() => {
    if (imageRef.current) {
      const firstImage = imageRef.current.querySelector('.about-img-0');
      if (firstImage) {
        gsap.set(firstImage, { opacity: 1, scale: 1 });
      }
    }
  }, []);
  
  // Scroll animation
  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;
    
    const textElements = sectionRef.current.querySelectorAll('.reveal-item');
    const imageContainer = imageRef.current;
    
    gsap.fromTo(
      textElements,
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
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    );
    
    gsap.fromTo(
      imageContainer,
      {
        clipPath: 'inset(0 100% 0 0)',
      },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: imageContainer,
          start: 'top 70%',
        },
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="section py-20 bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div 
            ref={imageRef} 
            className="overflow-hidden rounded-lg relative h-[400px] shadow-lg border border-gray-200"
          >
            {aboutImages.map((src, index) => (
              <div 
                key={index}
                className={`about-img-${index} absolute inset-0 w-full h-full ${index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <img 
                  src={src}
                  alt={`About us image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
              </div>
            ))}
            
            {/* Image indicators */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-20 bg-black/20 px-2 py-1 rounded-full">
              {aboutImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div ref={sectionRef}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal-item text-blue-800">Who We Are</h2>
            <p className="text-gray-600 mb-6 reveal-item">
              PPM Consultants is a leading business consulting firm with over 15 years of experience helping organizations across various industries achieve their goals.
            </p>
            <p className="text-gray-600 mb-6 reveal-item">
              Our team of experienced consultants brings specialized knowledge and a results-driven approach to every project.
            </p>
            
            <div className="mb-8 reveal-item">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Expert consultants with industry-specific knowledge</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Customized solutions tailored to your business needs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Proven track record of successful client outcomes</span>
                </li>
              </ul>
            </div>
            
            <Link to="/about" className="reveal-item inline-block">
              <Button variant="primary">Learn More About Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;