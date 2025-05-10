import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, BarChart3, Briefcase, BookOpen } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface ServiceProps {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  image: string;
  reverse?: boolean;
}

const ServiceSection: React.FC<ServiceProps> = ({
  id,
  title,
  description,
  features,
  icon,
  image,
  reverse = false,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const textElements = sectionRef.current.querySelectorAll('.animate-text');
    const imageElement = sectionRef.current.querySelector('.animate-image');
    
    gsap.fromTo(
      textElements,
      {
        x: reverse ? 30 : -30,
        opacity: 0,
      },
      {
        x: 0,
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
        x: reverse ? -30 : 30,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    );
  }, [reverse]);

  return (
    <div ref={sectionRef} id={id} className="py-12 scroll-mt-20">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
        <div className={`${reverse ? 'lg:order-2' : ''}`}>
          <div className="text-blue-600 p-4 bg-blue-50 inline-block rounded-lg mb-6 animate-text">
            {icon}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 animate-text">{title}</h3>
          <p className="text-gray-600 mb-6 animate-text">{description}</p>
          
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start animate-text bg-gray-50 p-3 rounded-md transition-all duration-300 hover:bg-blue-50">
                <span className="text-blue-600 mr-2 flex-shrink-0 bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="animate-text">
            <Link to="/contact">
              <Button variant="primary">Consult with Us</Button>
            </Link>
          </div>
        </div>
        
        <div className={`animate-image ${reverse ? 'lg:order-1' : ''} relative`}>
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-lg z-0"></div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-lg z-0"></div>
          <img 
            src={image} 
            alt={title} 
            className="rounded-lg shadow-lg w-full h-auto relative z-10 object-cover" 
            style={{ minHeight: '400px' }}
          />
        </div>
      </div>
    </div>
  );
};

const services = [
  {
    id: "business",
    title: "Business Consulting",
    description: "Comprehensive consulting services to help businesses optimize operations, improve performance, and achieve strategic objectives.",
    features: [
      "Business model evaluation and optimization",
      "Competitive analysis and market positioning",
      "Growth strategy development",
      "Business process improvement",
      "Change management and implementation support",
    ],
    icon: <TrendingUp size={40} />,
    image: "/images/project-management.jpg",
  },
  {
    id: "strategy",
    title: "Strategic Planning",
    description: "Expert guidance to develop and implement effective strategies that drive sustainable growth and competitive advantage.",
    features: [
      "Vision and mission development",
      "SWOT and market analysis",
      "Long-term strategic planning",
      "Strategic implementation roadmaps",
      "Performance tracking and strategy refinement",
    ],
    icon: <BookOpen size={40} />,
    image: "/images/construction-stages.jpg",
    reverse: true,
  },
  {
    id: "finance",
    title: "Financial Advisory",
    description: "Specialized financial consulting to optimize financial performance, manage risk, and support strategic decision-making.",
    features: [
      "Financial analysis and projections",
      "Budgeting and forecasting",
      "Cash flow management",
      "Capital structure optimization",
      "Investment analysis and due diligence",
    ],
    icon: <BarChart3 size={40} />,
    image: "/images/cost-management.jpg",
  },
  {
    id: "operations",
    title: "Operations Improvement",
    description: "Streamline processes, reduce costs, and enhance operational efficiency to maximize productivity and profitability.",
    features: [
      "Process mapping and optimization",
      "Supply chain analysis and improvement",
      "Quality management systems",
      "Operational cost reduction",
      "Capacity planning and resource allocation",
    ],
    icon: <Briefcase size={40} />,
    image: "/images/construction-management.jpg",
    reverse: true,
  },
];

const Services: React.FC = () => {
  useEffect(() => {
    document.title = 'Our Services | PPMC Private Limited';
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section id="services-hero" className="relative min-h-[400px] flex items-center scroll-mt-16">
        {/* Background color */}
        <div className="absolute inset-0 bg-blue-600 z-0"></div>
        
        {/* Optional overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-600/50 z-10"></div>
        
        {/* Content */}
        <div className="container-custom py-16 md:py-20 flex flex-col items-center justify-center text-center relative z-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            Expert Consulting Services
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto mb-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            Comprehensive consulting solutions tailored to your business needs. We help organizations
            solve complex challenges and achieve sustainable growth.
          </p>
          
          <Link 
            to="/contact" 
            className="bg-white text-blue-700 hover:bg-blue-50 transition-all duration-300 px-8 py-4 rounded-lg font-semibold shadow-lg text-lg"
          >
            Get Started Today
          </Link>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <a 
                key={index} 
                href={`#${service.id}`} 
                className="bg-blue-50 hover:bg-blue-100 transition-colors duration-300 p-6 rounded-lg flex flex-col items-center text-center shadow-md hover:shadow-lg"
              >
                <div className="text-blue-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <div className="mt-4 inline-block">
                  <span className="flex items-center text-blue-700 font-medium">
                    Learn More 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services List */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          {services.map((service, index) => (
            <React.Fragment key={service.id}>
              <ServiceSection
                id={service.id}
                title={service.title}
                description={service.description}
                features={service.features}
                icon={service.icon}
                image={service.image}
                reverse={service.reverse}
              />
              {index < services.length - 1 && (
                <div className="border-b border-gray-200 my-4"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
      
      {/* Footer connection */}
      <div className="bg-gradient-to-b from-gray-50 to-blue-900 h-16 mb-[-2px]"></div>
    </>
  );
};

export default Services;