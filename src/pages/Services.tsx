import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, BarChart3, Users, Briefcase, BookOpen, PieChart, Building, LineChart } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
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
    <div ref={sectionRef} id={id} className="py-16 scroll-mt-20">
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

const additionalServices = [
  {
    icon: <Users size={32} />,
    title: "Organizational Development",
    description: "Build high-performing teams and organizational structures that support your business objectives.",
    features: [
      "Talent management strategies",
      "Organizational structure design",
      "Leadership development programs",
    ],
    image: "/images/training.jpg"
  },
  {
    icon: <PieChart size={32} />,
    title: "Market Research",
    description: "Gain deep insights into your market, customers, and competitors to inform strategic decisions.",
    features: [
      "Market opportunity assessment",
      "Competitive intelligence",
      "Customer needs analysis",
    ],
    image: "/images/company-image.jpg"
  },
  {
    icon: <Building size={32} />,
    title: "Project Management",
    description: "Expert management of projects from inception to completion, ensuring on-time and on-budget delivery.",
    features: [
      "Project planning and scheduling",
      "Resource allocation",
      "Risk management",
    ],
    image: "/images/ehs.jpg"
  },
  {
    icon: <LineChart size={32} />,
    title: "Performance Improvement",
    description: "Identify and implement targeted improvements to enhance business performance and results.",
    features: [
      "Performance assessment",
      "Gap analysis",
      "Implementation of best practices",
    ],
    image: "/images/audits.jpg"
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
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/banner-bg.jpg" 
            alt="Services banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/80"></div>
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white reveal">Our Services</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto reveal">
            Comprehensive consulting solutions tailored to your business needs. We help organizations
            solve complex challenges and achieve sustainable growth.
          </p>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="py-16 bg-white">
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
      <section className="section bg-gray-50">
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
                <div className="border-b border-gray-200 my-8"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
      
      {/* Additional Services */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionHeading
            title="Additional Services"
            subtitle="We offer a range of specialized services to address specific business needs."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg overflow-hidden reveal transition-transform duration-300 hover:-translate-y-2">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="text-blue-600 mb-4 bg-white p-3 rounded-full inline-block shadow-md">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-5">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-600 mr-2 flex-shrink-0">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-700 to-blue-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Let our expert consultants help you navigate challenges and achieve your business objectives with tailored solutions.
          </p>
          <Link to="/contact">
            <Button variant="primary" className="bg-white text-blue-700 hover:bg-gray-100">
              Schedule a Consultation
            </Button>
          </Link>
          
          {/* Client logos */}
          <div className="mt-20">
            <p className="text-lg mb-8">Trusted by leading organizations</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
              <img src="/images/biocon.jpg" alt="Client logo" className="h-12 object-contain mx-auto brightness-0 invert" />
              <img src="/images/manipal-hospitals.jpg" alt="Client logo" className="h-12 object-contain mx-auto brightness-0 invert" />
              <img src="/images/rakuten-office.jpg" alt="Client logo" className="h-12 object-contain mx-auto brightness-0 invert" />
              <img src="/images/lupin-ltd.jpg" alt="Client logo" className="h-12 object-contain mx-auto brightness-0 invert" />
              <img src="/images/byjus-centers.jpg" alt="Client logo" className="h-12 object-contain mx-auto brightness-0 invert" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;