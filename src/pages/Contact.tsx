import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Clock, Send, Calendar, Briefcase, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

// Service options for the consultation request
const serviceOptions = [
  { value: "Business Consulting", label: "Business Consulting", icon: <Briefcase size={16} /> },
  { value: "Strategic Planning", label: "Strategic Planning", icon: <Users size={16} /> },
  { value: "Financial Advisory", label: "Financial Advisory", icon: <Calendar size={16} /> },
  { value: "Operations Improvement", label: "Operations Improvement", icon: <Briefcase size={16} /> },
  { value: "Project Management", label: "Project Management", icon: <Calendar size={16} /> },
  { value: "Other", label: "Other Services", icon: <Users size={16} /> }
];

// Office locations for the business
const officeLocations = [
  {
    city: "New Delhi",
    address: "123 Business Avenue, Connaught Place",
    postal: "New Delhi, 110001",
    country: "India",
    phone: "+91 98765 43210",
    email: "delhi@ppmconsultants.in"
  },
  {
    city: "Mumbai",
    address: "456 Corporate Tower, Bandra Kurla Complex",
    postal: "Mumbai, 400051",
    country: "India",
    phone: "+91 98765 12345",
    email: "mumbai@ppmconsultants.in"
  },
  {
    city: "Bangalore",
    address: "789 Tech Park, Whitefield",
    postal: "Bangalore, 560066",
    country: "India",
    phone: "+91 98765 67890",
    email: "bangalore@ppmconsultants.in"
  }
];

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(0);
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    companySize: '',
    budget: '',
    timeline: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send the form data to a server
    console.log('Form submitted:', formState);
    setFormSubmitted(true);
    
    // Clear form after submission
    setFormState({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      companySize: '',
      budget: '',
      timeline: ''
    });
    
    // Show success message with animation
    if (formRef.current) {
      gsap.to(formRef.current.querySelector('.success-message'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        if (formRef.current) {
          gsap.to(formRef.current.querySelector('.success-message'), {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: 'power2.in',
          });
          
          setTimeout(() => {
            setFormSubmitted(false);
          }, 500);
        }
      }, 5000);
    }
  };
  
  useEffect(() => {
    document.title = 'Contact Us | PPM Consultants';
    
    if (contactRef.current) {
      const infoCards = contactRef.current.querySelectorAll('.info-card');
      
      gsap.fromTo(
        infoCards,
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
            trigger: contactRef.current,
            start: 'top 70%',
          },
        }
      );
    }
    
    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll('.form-animate');
      
      gsap.fromTo(
        formElements,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 70%',
          },
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section id="contact-hero" className="relative min-h-[400px] flex items-center scroll-mt-16">
        {/* Background color */}
        <div className="absolute inset-0 bg-blue-600 z-0"></div>
        
        {/* Optional overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-600/50 z-10"></div>
        
        {/* Content */}
        <div className="container-custom py-16 md:py-20 flex flex-col items-center justify-center text-center relative z-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            Ready to Transform Your Business?
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto mb-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            Get in touch with our expert consultants today to discover how we can
            help your business reach its full potential.
          </p>
          
          <a 
            href="#request-form" 
            className="bg-white text-blue-700 hover:bg-blue-50 transition-all duration-300 px-8 py-4 rounded-lg font-semibold shadow-lg text-lg"
          >
            Schedule a Consultation
          </a>
        </div>
      </section>
      
      {/* Contact Info Cards */}
      <section id="contact-info" className="section py-16 bg-white scroll-mt-16">
        <div className="container-custom">
          <div ref={contactRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="info-card bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="text-blue-600 mb-4 p-4 bg-blue-100 rounded-full">
                <Phone size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-600 mb-1">+91 98765 43210</p>
              <p className="text-gray-600">+91 98765 12345</p>
              <a href="tel:+919876543210" className="mt-3 text-blue-600 font-medium hover:underline">Call Now</a>
            </div>
            
            <div className="info-card bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="text-blue-600 mb-4 p-4 bg-blue-100 rounded-full">
                <Mail size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600 mb-1">info@ppmconsultants.in</p>
              <p className="text-gray-600">support@ppmconsultants.in</p>
              <a href="mailto:info@ppmconsultants.in" className="mt-3 text-blue-600 font-medium hover:underline">Send Email</a>
            </div>
            
            <div className="info-card bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="text-blue-600 mb-4 p-4 bg-blue-100 rounded-full">
                <MapPin size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-gray-600 mb-1">123 Business Street</p>
              <p className="text-gray-600">New Delhi, India</p>
              <a href="#locations" className="mt-3 text-blue-600 font-medium hover:underline">View Locations</a>
            </div>
            
            <div className="info-card bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="text-blue-600 mb-4 p-4 bg-blue-100 rounded-full">
                <Clock size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
              <p className="text-gray-600 mb-1">Monday - Friday</p>
              <p className="text-gray-600">9:00 AM - 6:00 PM</p>
              <a href="#request-form" className="mt-3 text-blue-600 font-medium hover:underline">Schedule Meeting</a>
            </div>
          </div>
          
          {/* What We Can Help With Section */}
          <div id="services" className="mb-16 scroll-mt-20">
            <SectionHeading
              title="How We Can Help"
              subtitle="Our consulting services cover a wide range of business needs"
              centered
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {serviceOptions.map((service, index) => (
                <div key={index} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      {service.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800">{service.label}</h3>
                  </div>
                  <a href="#request-form" className="text-blue-600 text-sm hover:underline inline-flex items-center">
                    Request consultation
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Form and Info */}
          <div id="request-form" className="grid grid-cols-1 lg:grid-cols-5 gap-8 scroll-mt-20">
            <div className="lg:col-span-2">
              <SectionHeading
                title="Contact Information"
                subtitle="Fill out the form and our team will get back to you within 24 hours."
                centered={false}
              />
              
              <p className="text-gray-600 mb-8">
                Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
              </p>
              
              <div id="locations" className="space-y-6 scroll-mt-24">
                {officeLocations.map((office, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-lg transition-all duration-300 cursor-pointer ${
                      selectedLocation === index 
                        ? 'bg-blue-100 border-l-4 border-blue-600 shadow' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedLocation(index)}
                  >
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <MapPin size={18} className={`mr-2 ${selectedLocation === index ? 'text-blue-600' : 'text-gray-500'}`} />
                      {office.city} Office
                    </h3>
                    <p className="text-gray-600 mb-1">{office.address}</p>
                    <p className="text-gray-600 mb-3">{office.postal}, {office.country}</p>
                    <div className="flex flex-col text-sm">
                      <a href={`tel:${office.phone}`} className="text-blue-600 hover:underline flex items-center mb-1">
                        <Phone size={14} className="mr-2" /> {office.phone}
                      </a>
                      <a href={`mailto:${office.email}`} className="text-blue-600 hover:underline flex items-center">
                        <Mail size={14} className="mr-2" /> {office.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex space-x-4">
                <a href="https://facebook.com" className="text-gray-600 hover:text-blue-600 transition-colors p-2 bg-gray-100 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="https://twitter.com" className="text-gray-600 hover:text-blue-600 transition-colors p-2 bg-gray-100 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com" className="text-gray-600 hover:text-blue-600 transition-colors p-2 bg-gray-100 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
                {formSubmitted && (
                  <div className="success-message opacity-0 transform -translate-y-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.</span>
                    </div>
                  </div>
                )}
                
                <h3 className="text-xl font-semibold mb-6 text-center">Request a Consultation</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="form-animate">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="form-animate">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="form-animate">
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="form-animate">
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Service Interest *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="form-animate">
                    <label htmlFor="companySize" className="block text-gray-700 font-medium mb-2">Company Size</label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={formState.companySize}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </select>
                  </div>
                  
                  <div className="form-animate">
                    <label htmlFor="budget" className="block text-gray-700 font-medium mb-2">Budget Range</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formState.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select budget</option>
                      <option value="Under ₹5L">Under ₹5 Lakhs</option>
                      <option value="₹5L-₹10L">₹5-10 Lakhs</option>
                      <option value="₹10L-₹25L">₹10-25 Lakhs</option>
                      <option value="₹25L-₹50L">₹25-50 Lakhs</option>
                      <option value="₹50L+">₹50 Lakhs+</option>
                    </select>
                  </div>
                  
                  <div className="form-animate">
                    <label htmlFor="timeline" className="block text-gray-700 font-medium mb-2">Project Timeline</label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formState.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select timeline</option>
                      <option value="Immediate">Immediate</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months">6+ months</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6 form-animate">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Project Details *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Please describe your project, goals, and any specific requirements"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                
                <div className="form-animate">
                  <Button 
                    type="submit" 
                    variant="primary"
                    className="flex items-center justify-center w-full md:w-auto px-8 py-3"
                  >
                    <Send size={18} className="mr-2" />
                    Submit Request
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section id="map" className="mt-16 scroll-mt-16">
        <div className="h-96 w-full bg-gray-200 relative">
          {/* Primary Map */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.173056685805!2d77.2234453!3d28.6122356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1649935238135!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            title="Office Location"
            className="absolute inset-0 z-10"
          ></iframe>
          
          {/* Fallback Static Map - display only when iframe fails to load */}
          <div className="absolute inset-0 z-0 flex items-center justify-center flex-col p-4 bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Our Main Office</h3>
              <p className="text-gray-600 mb-2 flex items-center">
                <MapPin size={18} className="mr-2 text-blue-600" />
                123 Business Avenue, Connaught Place
              </p>
              <p className="text-gray-600 mb-4">New Delhi, 110001, India</p>
              <div className="border-t border-gray-200 pt-4 mt-2">
                <p className="text-gray-500 text-sm">
                  Interactive map failed to load. Please check your internet connection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;