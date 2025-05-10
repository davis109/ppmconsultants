import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../components/ui/SectionHeading';
import TestimonialCard from '../components/ui/TestimonialCard';
import { ChevronLeft, ChevronRight, Building, Users, Award, BarChart, CheckCircle, Star, TrendingUp, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Generate simple company logos as colored SVG data URIs to prevent download issues
const generateLogoSVG = (companyName: string, color: string): string => {
  const initials = companyName
    .split(' ')
    .map((word: string) => word[0])
    .join('')
    .toUpperCase();
  
  const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 200 80">
    <rect width="200" height="80" fill="${color}" rx="10" ry="10" />
    <text x="100" y="50" font-family="Arial" font-size="36" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${initials}</text>
  </svg>`;
  
  return `data:image/svg+xml;base64,${btoa(svgStr)}`;
};

// Generate simple SVG for case studies
const generateCaseStudySVG = (companyName: string, color: string): string => {
  const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600">
    <rect width="1200" height="600" fill="${color}" rx="0" ry="0" />
    <text x="600" y="300" font-family="Arial" font-size="72" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${companyName}</text>
    <text x="600" y="400" font-family="Arial" font-size="36" font-weight="normal" fill="white" text-anchor="middle" dominant-baseline="middle">Case Study</text>
  </svg>`;
  
  return `data:image/svg+xml;base64,${btoa(svgStr)}`;
};

// Client logos array with more meaningful data
const clientLogos = [
  { 
    name: "Tata Consultancy", 
    industry: "Technology",
    logo: generateLogoSVG("Tata Consultancy", "#0052CC") 
  },
  { 
    name: "HDFC Bank", 
    industry: "Finance",
    logo: generateLogoSVG("HDFC Bank", "#004C8C") 
  },
  { 
    name: "Reliance Industries", 
    industry: "Energy & Infrastructure",
    logo: generateLogoSVG("Reliance Industries", "#1E4DB7") 
  },
  { 
    name: "Apollo Hospitals", 
    industry: "Healthcare",
    logo: generateLogoSVG("Apollo Hospitals", "#0088CC") 
  },
  { 
    name: "Mahindra Group", 
    industry: "Automotive & Manufacturing",
    logo: generateLogoSVG("Mahindra Group", "#D62828") 
  },
  { 
    name: "Infosys", 
    industry: "IT Services",
    logo: generateLogoSVG("Infosys", "#006644") 
  },
  { 
    name: "Britannia", 
    industry: "FMCG",
    logo: generateLogoSVG("Britannia", "#FF6B00") 
  },
  { 
    name: "DLF Limited", 
    industry: "Real Estate",
    logo: generateLogoSVG("DLF Limited", "#5A189A") 
  },
];

// Key achievements with our clients
const clientAchievements = [
  { 
    stat: "200+", 
    label: "Clients Served", 
    icon: <Users className="text-blue-600" size={24} /> 
  },
  { 
    stat: "15+", 
    label: "Years of Experience", 
    icon: <Award className="text-blue-600" size={24} /> 
  },
  { 
    stat: "93%", 
    label: "Client Retention", 
    icon: <CheckCircle className="text-blue-600" size={24} /> 
  },
  { 
    stat: "₹450Cr+", 
    label: "Client ROI Generated", 
    icon: <TrendingUp className="text-blue-600" size={24} /> 
  },
];

// Industry sectors we serve
const industrySectors = [
  {
    name: "Technology",
    icon: <Building size={40} className="text-blue-600" />,
    description: "Digital transformation, IT strategy, and software implementation projects for tech companies.",
    clients: 26
  },
  {
    name: "Finance & Banking",
    icon: <BarChart size={40} className="text-blue-600" />,
    description: "Risk management, compliance solutions, and operational efficiency for financial institutions.",
    clients: 18
  },
  {
    name: "Healthcare",
    icon: <Users size={40} className="text-blue-600" />,
    description: "Process optimization, facility planning, and regulatory compliance for healthcare providers.",
    clients: 15
  },
  {
    name: "Manufacturing",
    icon: <Award size={40} className="text-blue-600" />,
    description: "Supply chain optimization, lean manufacturing, and quality management systems.",
    clients: 22
  }
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
    gsap.utils.toArray<HTMLElement>('.client-logo').forEach((elem, index: number) => {
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
    gsap.utils.toArray<HTMLElement>('.case-study').forEach((elem) => {
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
    
    // Industry sectors animation
    gsap.utils.toArray<HTMLElement>('.industry-card').forEach((elem, index: number) => {
      gsap.fromTo(
        elem,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: index * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
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
      <section id="hero" className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden scroll-mt-16">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-400 filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-teal-400 filter blur-3xl"></div>
        </div>
        
        <div className="container-custom text-center relative z-10">
          <div className="inline-block bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
            Trusted by Industry Leaders
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 reveal drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            Our <span className="text-blue-200">Prestigious</span> Clients
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto reveal mb-8 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            We've had the privilege of partnering with over 200 businesses across India,
            from ambitious startups to established industry leaders.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="#success-stories" className="bg-white text-blue-700 hover:bg-blue-50 transition-all duration-300 px-6 py-3 rounded-lg font-semibold shadow-lg flex items-center">
              <Star className="mr-2" size={20} />
              See Success Stories
            </a>
            <a href="#industries" className="bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all duration-300 px-6 py-3 rounded-lg font-semibold flex items-center">
              <Building className="mr-2" size={20} />
              Industries We Serve
            </a>
          </div>
          
          {/* Client achievements stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            {clientAchievements.map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-white/20 rounded-full">
                    {item.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{item.stat}</div>
                <div className="text-blue-100 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Client Logos */}
      <section id="clients" className="section bg-white py-16 scroll-mt-16">
        <div className="container-custom">
          <SectionHeading
            title="Trusted by Leading Organizations"
            subtitle="Our clients include some of the most respected businesses across various industries throughout India"
            centered
          />
          
          <div className="flex justify-center mb-8">
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clientLogos.map((client, index) => (
              <div 
                key={index} 
                className="client-logo bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center h-44 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Company logo with SVG data URI */}
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src={client.logo} 
                    alt={`${client.name} logo`} 
                    className="max-h-full max-w-[80%] object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-blue-800 mb-1">{client.name}</h3>
                <p className="text-gray-500 text-sm px-2 py-1 bg-gray-50 rounded-full">{client.industry}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join the growing roster of businesses that trust PPM Consultants to deliver exceptional results. 
              Our proven track record spans multiple industries and business needs.
            </p>
            <a href="#request-consultation" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-all">
              <Shield className="mr-2" size={20} />
              Learn about our client confidentiality pledge
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      {/* Industries We Serve */}
      <section id="industries" className="section bg-gray-50 py-16 scroll-mt-16">
        <div className="container-custom">
          <SectionHeading
            title="Industries We Serve"
            subtitle="Our consulting expertise spans across multiple sectors with specialized solutions for each industry"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {industrySectors.map((sector, index) => (
              <div 
                key={index}
                className="industry-card bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-4 bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-5">
                  {sector.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">{sector.name}</h3>
                <p className="text-gray-600 mb-4">{sector.description}</p>
                <div className="border-t border-gray-100 pt-4 flex items-center">
                  <span className="text-sm text-gray-500">
                    <span className="text-blue-600 font-bold text-lg">{sector.clients}</span> clients served
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="section bg-blue-50 scroll-mt-16">
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
      <section id="success-stories" className="section py-16 scroll-mt-16">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Real Results
            </div>
            <SectionHeading
              title="Client Success Stories"
              subtitle="Explore how our consulting strategies have transformed businesses across industries"
              centered
            />
            <div className="flex justify-center mt-4">
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="case-study bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="relative h-64">
                <img 
                  src={generateCaseStudySVG("TechCorp", "#0052CC")} 
                  alt="TechCorp Case Study" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              </div>
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
                    <a href="#" className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-lg transition-colors">
                      View Case Study
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="case-study bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="relative h-64">
                <img 
                  src={generateCaseStudySVG("ManufactureX", "#00A86B")} 
                  alt="ManufactureX Case Study" 
                  className="w-full h-64 object-cover"
                />
              </div>
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
                    <a href="#" className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-lg transition-colors">
                      View Case Study
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <a href="#" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-md">
              View All Case Studies
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Clients;