import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = () => {
  // Animate elements with the 'reveal' class
  gsap.utils.toArray('.reveal').forEach((elem: any) => {
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

  // Animate elements with the 'reveal-left' class
  gsap.utils.toArray('.reveal-left').forEach((elem: any) => {
    gsap.fromTo(
      elem,
      {
        x: -30,
        opacity: 0,
      },
      {
        x: 0,
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

  // Animate elements with the 'reveal-right' class
  gsap.utils.toArray('.reveal-right').forEach((elem: any) => {
    gsap.fromTo(
      elem,
      {
        x: 30,
        opacity: 0,
      },
      {
        x: 0,
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
};

export const animateHero = (element: Element) => {
  const tl = gsap.timeline();
  
  tl.fromTo(
    element.querySelector('.hero-title'),
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
  )
  .fromTo(
    element.querySelector('.hero-subtitle'),
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
    '-=0.7'
  )
  .fromTo(
    element.querySelector('.hero-cta'),
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
    '-=0.7'
  );
  
  return tl;
};

export const animateServiceCards = (cards: Element[]) => {
  gsap.fromTo(
    cards,
    {
      y: 40,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cards[0].parentElement,
        start: 'top 70%',
      },
    }
  );
};

export const animateImageReveal = (element: Element) => {
  return gsap.fromTo(
    element,
    {
      clipPath: 'inset(0 100% 0 0)',
    },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'top 70%',
      },
    }
  );
};

export const buttonHoverAnimation = (element: Element) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power1.out',
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: 'power1.out',
    });
  });
};