import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/sections/Hero';
import FeaturedServices from '../components/sections/FeaturedServices';
import AboutPreview from '../components/sections/AboutPreview';
import TestimonialsSlider from '../components/sections/TestimonialsSlider';
import CTASection from '../components/sections/CTASection';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  useEffect(() => {
    // Update the document title
    document.title = 'PPM Consultants | Professional Business Consulting';
    
    // Clean up ScrollTrigger instances when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <Hero />
      <FeaturedServices />
      <AboutPreview />
      <TestimonialsSlider />
      <CTASection />
    </>
  );
};

export default Home;