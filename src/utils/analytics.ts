/**
 * Simple analytics utility that doesn't rely on fingerprinting
 */

// Track page views
export const trackPageView = (page: string) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`Page view: ${page}`);
  }
  
  // In production, you would send this data to your backend
  // in a way that respects user privacy
};

// Track events
export const trackEvent = (category: string, action: string, label?: string) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`Event: ${category} - ${action}${label ? ` - ${label}` : ''}`);
  }
  
  // In production, you would send this data to your backend
}; 