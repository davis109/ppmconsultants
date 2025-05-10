import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location]);

  // Initial animation
  useEffect(() => {
    if (!navbarRef.current) return;

    const navLinks = navbarRef.current.querySelectorAll('.nav-item');
    const logo = navbarRef.current.querySelector('.logo-container');
    
    // Animate logo first
    gsap.fromTo(
      logo,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    );
    
    // Then animate nav links with stagger
    gsap.fromTo(
      navLinks,
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.4, 
        ease: 'power2.out',
        delay: 0.3
      }
    );
  }, []);

  return (
    <nav 
      ref={navbarRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <div className="logo-container">
            <Logo className="flex-shrink-0" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`nav-item ${location.pathname === '/' ? 'nav-link-active' : 'nav-link'}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`nav-item ${location.pathname === '/about' ? 'nav-link-active' : 'nav-link'}`}
            >
              About Us
            </Link>
            <div className="relative group nav-item">
              <button 
                className={`flex items-center ${
                  location.pathname === '/services' ? 'nav-link-active' : 'nav-link'
                }`}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="py-1">
                  <Link to="/services#business" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Business Consulting
                  </Link>
                  <Link to="/services#strategy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Strategic Planning
                  </Link>
                  <Link to="/services#finance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Financial Advisory
                  </Link>
                  <Link to="/services#operations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Operations Improvement
                  </Link>
                </div>
              </div>
            </div>
            <Link 
              to="/clients" 
              className={`nav-item ${location.pathname === '/clients' ? 'nav-link-active' : 'nav-link'}`}
            >
              Clients
            </Link>
            <Link 
              to="/contact" 
              className={`nav-item ${location.pathname === '/contact' ? 'nav-link-active' : 'nav-link'}`}
            >
              Contact
            </Link>
            <Link to="/contact" className="nav-item btn btn-primary hover:scale-105 transition-transform duration-300">
              Get Started
            </Link>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden text-gray-800" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div 
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 py-4">
            <Link to="/" className="nav-link hover:translate-x-2 transition-transform duration-300">Home</Link>
            <Link to="/about" className="nav-link hover:translate-x-2 transition-transform duration-300">About Us</Link>
            <div>
              <button 
                className="flex items-center nav-link w-full text-left"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services <ChevronDown size={16} className={`ml-1 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`pl-4 space-y-2 mt-2 transition-all duration-300 ${servicesOpen ? 'block max-h-48 opacity-100' : 'hidden max-h-0 opacity-0'}`}>
                <Link to="/services#business" className="block text-gray-700 hover:text-blue-600 hover:translate-x-2 transition-transform duration-300">
                  Business Consulting
                </Link>
                <Link to="/services#strategy" className="block text-gray-700 hover:text-blue-600 hover:translate-x-2 transition-transform duration-300">
                  Strategic Planning
                </Link>
                <Link to="/services#finance" className="block text-gray-700 hover:text-blue-600 hover:translate-x-2 transition-transform duration-300">
                  Financial Advisory
                </Link>
                <Link to="/services#operations" className="block text-gray-700 hover:text-blue-600 hover:translate-x-2 transition-transform duration-300">
                  Operations Improvement
                </Link>
              </div>
            </div>
            <Link to="/clients" className="nav-link hover:translate-x-2 transition-transform duration-300">Clients</Link>
            <Link to="/contact" className="nav-link hover:translate-x-2 transition-transform duration-300">Contact</Link>
            <Link to="/contact" className="btn btn-primary w-full text-center hover:scale-105 transition-transform duration-300">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;