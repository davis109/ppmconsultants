import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, BarChart3, Users, Briefcase } from 'lucide-react';
import ServiceCard from '../ui/ServiceCard';
import SectionHeading from '../ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Business Strategy',
    description: 'Develop innovative and effective strategies to achieve your business objectives and stay ahead of the competition.',
    icon: <TrendingUp size={24} />,
    image: '/images/project-management.jpg',
    link: '/services#business',
  },
  {
    title: 'Financial Analysis',
    description: 'Get detailed financial insights and projections to make informed decisions and optimize your financial performance.',
    icon: <BarChart3 size={24} />,
    image: '/images/cost-management.jpg',
    link: '/services#finance',
  },
  {
    title: 'Organizational Development',
    description: 'Build high-performing teams and create an organizational structure that supports your business goals.',
    icon: <Users size={24} />,
    image: '/images/training.jpg',
    link: '/services#organization',
  },
  {
    title: 'Operations Management',
    description: 'Streamline your operations, reduce costs, and improve efficiency throughout your organization.',
    icon: <Briefcase size={24} />,
    image: '/images/construction-management.jpg',
    link: '/services#operations',
  },
];

const FeaturedServices: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!servicesRef.current) return;
    
    const serviceCards = servicesRef.current.querySelectorAll('.service-card');
    
    gsap.fromTo(
      serviceCards,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 70%',
        },
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <SectionHeading
          title="Our Services"
          subtitle="We offer a wide range of consulting services to help your business reach its full potential."
          centered
        />
        
        <div 
          ref={servicesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                image={service.image}
                link={service.link}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;