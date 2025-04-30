import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Target, Check, Shield, Lightbulb, Building, Users, Clock } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio, image }) => {
  return (
    <div className="card overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="aspect-w-1 aspect-h-1 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover object-center transition-transform duration-500 hover:scale-105" 
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-blue-600 mb-3">{role}</p>
        <p className="text-gray-600">{bio}</p>
      </div>
    </div>
  );
};

const teamMembers = [
  {
    name: "Rajiv Mehta",
    role: "CEO & Founder",
    bio: "With over 20 years of experience in business consulting, Rajiv has helped countless organizations transform their operations and achieve sustainable growth.",
    image: "/images/team-member-1.jpg",
  },
  {
    name: "Priya Singh",
    role: "Chief Strategy Officer",
    bio: "Priya specializes in strategic planning and business development, helping clients identify new opportunities and develop effective growth strategies.",
    image: "/images/team-member-2.jpg",
  },
  {
    name: "Arun Kumar",
    role: "Financial Advisory Lead",
    bio: "Arun brings extensive expertise in financial analysis and planning, guiding clients through complex financial decisions with clarity and confidence.",
    image: "/images/team-member-3.jpg",
  },
  {
    name: "Meera Patel",
    role: "Operations Consultant",
    bio: "Meera specializes in optimizing operational efficiency, helping organizations streamline processes and improve productivity across all departments.",
    image: "/images/team-member-4.jpg",
  },
];

const stats = [
  { value: '12+', label: 'Years of Excellence', icon: <Clock size={24} className="text-blue-600" /> },
  { value: '500+', label: 'Projects Completed', icon: <Building size={24} className="text-blue-600" /> },
  { value: '200+', label: 'Happy Clients', icon: <Users size={24} className="text-blue-600" /> },
  { value: '50+', label: 'Team Members', icon: <Users size={24} className="text-blue-600" /> },
];

const About: React.FC = () => {
  useEffect(() => {
    document.title = 'About Us | PPMC Private Limited';
    
    // Initialize scroll animations
    gsap.utils.toArray<HTMLElement>('.reveal').forEach((elem) => {
      gsap.fromTo(
        elem,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 80%',
          },
        }
      );
    });
    
    // Team member animations
    gsap.utils.toArray<HTMLElement>('.team-card').forEach((elem, index) => {
      gsap.fromTo(
        elem,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
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

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/construction-meeting.jpg" 
            alt="PPMC in action" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/80"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 reveal">About PPMC Private Limited</h1>
            <p className="text-xl text-gray-100 reveal">
              Professional Partners for Project Delivery - leading the way in project management and business consulting with expertise, innovation, and a commitment to your success.
            </p>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-white shadow-md hover:shadow-lg transition-all duration-300 reveal"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 reveal">Our Story</h2>
              <p className="text-gray-600 mb-4 reveal">
                Founded in 2008, PPMC Private Limited began with a vision to provide businesses with the strategic guidance and operational expertise needed to thrive in an increasingly competitive landscape.
              </p>
              <p className="text-gray-600 mb-4 reveal">
                Over the years, we've grown from a small team of dedicated consultants to a comprehensive consulting firm with specialists in various business domains. Throughout our journey, our commitment to excellence and client success has remained unwavering.
              </p>
              <p className="text-gray-600 reveal">
                Today, we're proud to serve clients across industries, helping them navigate challenges, seize opportunities, and achieve sustainable growth through customized solutions and expert guidance.
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-4 reveal">
                <img 
                  src="/images/construction-stages.jpg" 
                  alt="Construction stages" 
                  className="rounded-lg shadow-md h-32 object-cover"
                />
                <img 
                  src="/images/airport-metro.jpg" 
                  alt="Airport metro project" 
                  className="rounded-lg shadow-md h-32 object-cover"
                />
              </div>
            </div>
            <div className="reveal relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-lg z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-lg z-0"></div>
              <img 
                src="/images/about-image.jpg" 
                alt="PPMC team" 
                className="rounded-lg shadow-lg w-full h-auto relative z-10" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Vision & Mission */}
      <section className="section bg-white py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 reveal">Vision & Mission</h2>
            <p className="text-gray-600 max-w-3xl mx-auto reveal">
              Our vision and mission guide every aspect of our work, ensuring that we consistently deliver value to our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-blue-50 p-8 rounded-lg shadow-md reveal relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32">
                <img 
                  src="/images/project-management.jpg" 
                  alt="Project management" 
                  className="w-full h-full object-cover opacity-20 rounded-bl-full"
                />
              </div>
              <div className="relative z-10">
                <div className="text-blue-600 mb-4 bg-white p-4 inline-block rounded-full shadow-md">
                  <Target size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To be the premier project management and consulting partner for businesses seeking transformative growth and operational excellence, recognized for our innovative solutions and measurable impact on client success.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-8 rounded-lg shadow-md reveal relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32">
                <img 
                  src="/images/construction-management.jpg" 
                  alt="Construction management" 
                  className="w-full h-full object-cover opacity-20 rounded-bl-full"
                />
              </div>
              <div className="relative z-10">
                <div className="text-blue-600 mb-4 bg-white p-4 inline-block rounded-full shadow-md">
                  <Award size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To empower organizations through expert project management and consulting services that address their unique challenges, unlock potential, and drive sustainable growth while fostering long-term partnerships built on trust and shared success.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
            <img src="/images/lt-galleria.jpg" alt="Project example" className="rounded-lg shadow-md h-48 object-cover" />
            <img src="/images/giva-jewelry.jpg" alt="Project example" className="rounded-lg shadow-md h-48 object-cover" />
            <img src="/images/byjus-centers.jpg" alt="Project example" className="rounded-lg shadow-md h-48 object-cover" />
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="section bg-gray-50 py-20">
        <div className="container-custom">
          <SectionHeading
            title="Our Core Values"
            subtitle="The principles that guide our work and interactions with clients."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2 reveal">
              <div className="h-48 mb-6 overflow-hidden rounded-lg">
                <img 
                  src="/images/ehs.jpg" 
                  alt="Excellence" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="text-blue-600 mb-6 bg-white p-4 rounded-full inline-block shadow-md">
                <Check size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, delivering high-quality solutions that exceed expectations and create lasting value for our clients.
              </p>
              <ul className="mt-4 text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Rigorous quality standards</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Continuous improvement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Attention to detail</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2 reveal">
              <div className="h-48 mb-6 overflow-hidden rounded-lg">
                <img 
                  src="/images/company-image.jpg" 
                  alt="Integrity" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="text-blue-600 mb-6 bg-white p-4 rounded-full inline-block shadow-md">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Integrity</h3>
              <p className="text-gray-600">
                We operate with honesty, transparency, and ethical standards in all client relationships, building trust through our actions and accountability.
              </p>
              <ul className="mt-4 text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Honest communication</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Ethical business practices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Transparent processes</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2 reveal">
              <div className="h-48 mb-6 overflow-hidden rounded-lg">
                <img 
                  src="/images/audits.jpg" 
                  alt="Innovation" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="text-blue-600 mb-6 bg-white p-4 rounded-full inline-block shadow-md">
                <Lightbulb size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Innovation</h3>
              <p className="text-gray-600">
                We embrace creative thinking and innovative approaches to solving complex business challenges, constantly evolving to deliver cutting-edge solutions.
              </p>
              <ul className="mt-4 text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Creative problem-solving</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Adoption of new technologies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Forward-thinking approaches</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionHeading
            title="Meet Our Team"
            subtitle="Our experienced consultants bring diverse expertise to help solve your business challenges."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <TeamMember
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  image={member.image}
                />
              </div>
            ))}
          </div>
          
          {/* Company culture gallery */}
          <div className="mt-16 reveal">
            <h3 className="text-2xl font-bold mb-6 text-center">Our Company Culture</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <img src="/images/careers-team.jpg" alt="Company culture" className="rounded-lg shadow-md h-40 object-cover" />
              <img src="/images/construction-meeting.jpg" alt="Team meeting" className="rounded-lg shadow-md h-40 object-cover" />
              <img src="/images/company-image.jpg" alt="Office environment" className="rounded-lg shadow-md h-40 object-cover" />
              <img src="/images/careers-hero.jpg" alt="Team building" className="rounded-lg shadow-md h-40 object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;