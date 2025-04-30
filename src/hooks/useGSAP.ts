import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScrollAnimations } from '../utils/animations';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = () => {
  useEffect(() => {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Clean up ScrollTrigger when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};

export const useElementAnimation = <T extends HTMLElement>(
  animationCallback: (element: HTMLElement) => gsap.core.Timeline | gsap.core.Tween
) => {
  const ref = useRef<T>(null);
  
  useEffect(() => {
    if (ref.current) {
      const animation = animationCallback(ref.current);
      
      return () => {
        animation.kill();
      };
    }
  }, [animationCallback]);
  
  return ref;
};