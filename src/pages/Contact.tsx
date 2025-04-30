import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
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
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 reveal">Get In Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto reveal">
            Have questions or ready to start a project? Reach out to our team of consultants
            and let's discuss how we can help your business succeed.
          </p>
        </div>
      </section>
      
      {/* Contact Info */}
      <section className="section">
        <div className="container-custom">
          <div ref={contactRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="info-card bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="text-blue-600 mb-4 p-3 bg-blue-50 rounded-full">
                <Phone size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+91 98765 43210</p>
              <p className="text-gray-600">+91 98765 12345</p>
            </div>
            
            <div className="info-card bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="text-blue-600 mb-4 p-3 bg-blue-50 rounded-full">
                <Mail size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@ppmconsultants.in</p>
              <p className="text-gray-600">support@ppmconsultants.in</p>
            </div>
            
            <div className="info-card bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="text-blue-600 mb-4 p-3 bg-blue-50 rounded-full">
                <MapPin size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-gray-600">123 Business Street</p>
              <p className="text-gray-600">New Delhi, India</p>
            </div>
            
            <div className="info-card bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="text-blue-600 mb-4 p-3 bg-blue-50 rounded-full">
                <Clock size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Hours</h3>
              <p className="text-gray-600">Monday - Friday</p>
              <p className="text-gray-600">9:00 AM - 6:00 PM</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <SectionHeading
                title="Contact Information"
                subtitle="Fill out the form and our team will get back to you within 24 hours."
                centered={false}
              />
              
              <p className="text-gray-600 mb-8">
                Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-3">Headquarters</h3>
                <p className="text-gray-600 mb-2">123 Business Street</p>
                <p className="text-gray-600 mb-2">New Delhi, 110001</p>
                <p className="text-gray-600">India</p>
              </div>
              
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="https://twitter.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 md:p-8">
                {formSubmitted && (
                  <div className="success-message opacity-0 transform -translate-y-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>Thank you! Your message has been sent successfully.</span>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="form-animate">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
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
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
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
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="Business Consulting">Business Consulting</option>
                      <option value="Strategic Planning">Strategic Planning</option>
                      <option value="Financial Advisory">Financial Advisory</option>
                      <option value="Operations Improvement">Operations Improvement</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6 form-animate">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                
                <div className="form-animate">
                  <Button 
                    type="submit" 
                    variant="primary"
                    className="flex items-center"
                  >
                    <Send size={18} className="mr-2" />
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="mt-16">
        <div className="h-96 w-full bg-gray-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448196.5264056647!2d76.81304159430922!3d28.645748371436812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sus!4v1692364274220!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            title="Office Location"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default Contact;