import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-900 to-black text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="bg-white p-4 rounded-lg inline-block mb-4">
              <Logo className="w-48" />
            </div>
            <p className="mt-4 text-gray-300">
              Professional Partners for Project Delivery - providing expert consulting services to help businesses grow and transform.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" className="bg-blue-800 p-2 rounded-full text-white hover:bg-blue-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="bg-blue-800 p-2 rounded-full text-white hover:bg-blue-700 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" className="bg-blue-800 p-2 rounded-full text-white hover:bg-blue-700 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com" className="bg-blue-800 p-2 rounded-full text-white hover:bg-blue-700 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="bg-blue-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="bg-blue-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="bg-blue-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/clients" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="bg-blue-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Clients
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="bg-blue-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services#business" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="bg-blue-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Business Consulting
                </Link>
              </li>
              <li>
                <Link to="/services#strategy" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="bg-blue-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Strategic Planning
                </Link>
              </li>
              <li>
                <Link to="/services#finance" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="bg-blue-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Financial Advisory
                </Link>
              </li>
              <li>
                <Link to="/services#operations" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="bg-blue-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Operations Improvement
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="bg-blue-800 p-2 rounded-full mr-3 flex-shrink-0">
                  <MapPin size={18} className="text-white" />
                </div>
                <span className="text-gray-300">123 Business Street, New Delhi, India</span>
              </li>
              <li className="flex items-center">
                <div className="bg-blue-800 p-2 rounded-full mr-3 flex-shrink-0">
                  <Phone size={18} className="text-white" />
                </div>
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <div className="bg-blue-800 p-2 rounded-full mr-3 flex-shrink-0">
                  <Mail size={18} className="text-white" />
                </div>
                <span className="text-gray-300">info@ppmc.in</span>
              </li>
              <li className="mt-6">
                <Link 
                  to="/contact" 
                  className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors inline-block"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-12 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} PPMC Private Limited. All rights reserved.
            </p>
            <div className="flex gap-4 md:justify-end text-sm">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;