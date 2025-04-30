import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../components/ui/SectionHeading';
import TestimonialCard from '../components/ui/TestimonialCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Client logos array
const clientLogos = [
  { name: "TechCorp", industry: "Technology" },
  { name: "FinancePlus", industry: "Finance" },
  { name: "EcoSolutions", industry: "Environmental" },
  { name: "MediHealth", industry: "Healthcare" },
  { name: "RetailPro", industry: "Retail" },
  { name: "ManufactureX", industry: "Manufacturing" },
  { name: "EduLearn", industry: "Education" },
  { name: "TravelWise", industry: "Travel" },
];

// Full testimonials array
const testimonials = [
  {
    quote: "PPM Consultants helped us identify key operational inefficiencies and implement solutions that boosted our productivity by 30%. Their expertise and attention to detail were exceptional.",
    author: "Rahul Sharma",
    role: "CEO",
    company: "TechCorp",
  },
  {
    quote: "Working with PPM Consultants transformed our approach to strategic planning. Their team provided invaluable insights that have guided our business growth for the past two years.",
    author: "Priya Patel",
    role: "COO",
    company: "FinanceLink",
  },
  {
    quote: "The financial advisory services from PPM Consultants gave us the clarity we needed during a critical expansion phase. Their guidance helped us secure funding and optimize our resource allocation.",
    author: "Vikram Singh",
    role: "CFO",
    company: "GrowthVentures",
  },
  {
    quote: "PPM Consultants delivered beyond our expectations. Their team took the time to understand our unique challenges and developed a customized solution that perfectly addressed our needs.",
    author: "Ananya Desai",
    role: "Director",
    company: "InnovateTech",
  },
  {
    quote: "We partnered with PPM Consultants during a challenging time for our business, and their strategic guidance helped us navigate complex decisions with confidence. The results speak for themselves.",
    author: "Sanjay Kapoor",
    role: "Founder",
    company: "EcoSolutions",
  },
  {
    quote: "The operational improvements suggested by PPM Consultants resulted in a 25% reduction in costs and significant efficiency gains across our organization. Their ROI is exceptional.",
    author: "Neha Gupta",
    role: "Operations Director",
    company: "ManufactureX",
  },
];

const Clients: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.ceil(testimonials.length / 3) - 1;
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const goToNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, maxIndex));
  };
  
  const goToPrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };
  
  useEffect(() => {
    document.title = 'Our Clients | PPM Consultants';
    
    // Client logos animation
    gsap.utils.toArray('.client-logo').forEach((elem: any, index: number) => {
      gsap.fromTo(
        elem,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 80%',
          },
        }
      );
    });
    
    // Case studies animation
    gsap.utils.toArray('.case-study').forEach((elem: any) => {
      gsap.fromTo(
        elem,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 80%',
          },
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  useEffect(() => {
    if (!sliderRef.current) return;
    
    gsap.to(sliderRef.current, {
      x: `-${currentIndex * 100}%`,
      duration: 0.6,
      ease: 'power2.out',
    });
  }, [currentIndex]);

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 reveal">Our Clients</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto reveal">
            We've had the privilege of working with a diverse range of businesses,
            from startups to established enterprises across various industries.
          </p>
        </div>
      </section>
      
      {/* Client Logos */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionHeading
            title="Trusted by Companies Across Industries"
            centered
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clientLogos.map((client, index) => (
              <div 
                key={index} 
                className="client-logo bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center h-32"
              >
                <h3 className="text-xl font-bold text-blue-600">{client.name}</h3>
                <p className="text-gray-500">{client.industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="section bg-blue-50">
        <div className="container-custom">
          <SectionHeading
            title="Client Testimonials"
            subtitle="Hear from our clients about their experience working with PPM Consultants."
            centered
          />
          
          <div className="relative overflow-hidden">
            <div 
              ref={sliderRef}
              className="flex transition-all duration-500 ease-in-out"
              style={{ width: `${Math.ceil(testimonials.length / 3) * 100}%` }}
            >
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, groupIndex) => (
                <div key={groupIndex} className="w-full flex flex-wrap">
                  {testimonials.slice(groupIndex * 3, groupIndex * 3 + 3).map((testimonial, index) => (
                    <div key={index} className="w-full md:w-1/3 p-4">
                      <TestimonialCard
                        quote={testimonial.quote}
                        author={testimonial.author}
                        role={testimonial.role}
                        company={testimonial.company}
                      />
                    </div>
                  ))}
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
      
      {/* Case Studies */}
      <section className="section">
        <div className="container-custom">
          <SectionHeading
            title="Success Stories"
            subtitle="Explore how we've helped businesses overcome challenges and achieve their goals."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="case-study bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="TechCorp Case Study" 
                className="w-full h-64 object-cover" 
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">TechCorp</h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Technology</span>
                </div>
                <h4 className="text-lg font-semibold mb-3">Strategic Growth Acceleration</h4>
                <p className="text-gray-600 mb-4">
                  Helped a leading tech company develop and implement a strategic growth plan that resulted in 40% revenue increase within 18 months.
                </p>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-700 font-medium">Results:</p>
                      <ul className="text-gray-600 list-disc list-inside">
                        <li>40% revenue growth</li>
                        <li>Market share increased by 15%</li>
                        <li>New product line launch</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="case-study bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="FinanceLink Case Study" 
                className="w-full h-64 object-cover" 
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">ManufactureX</h3>
                  <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">Manufacturing</span>
                </div>
                <h4 className="text-lg font-semibold mb-3">Operational Excellence</h4>
                <p className="text-gray-600 mb-4">
                  Identified process inefficiencies and implemented lean manufacturing principles that reduced production costs by 25% and improved quality.
                </p>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-700 font-medium">Results:</p>
                      <ul className="text-gray-600 list-disc list-inside">
                        <li>25% reduction in operational costs</li>
                        <li>30% improvement in production output</li>
                        <li>Defect rate reduced by 40%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Clients;