import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const AboutPreview: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;
    
    const textElements = sectionRef.current.querySelectorAll('.reveal-item');
    const imageElement = imageRef.current;
    
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
      imageElement,
      {
        clipPath: 'inset(0 100% 0 0)',
      },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: imageElement,
          start: 'top 70%',
        },
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="section">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="overflow-hidden rounded-lg">
            <img 
              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Business team collaborating" 
              className="w-full h-auto" 
            />
          </div>
          
          <div ref={sectionRef}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal-item">Who We Are</h2>
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