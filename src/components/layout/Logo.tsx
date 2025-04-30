import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link to="/" className={`block ${className}`}>
      <img 
        src="/images/logo.png" 
        alt="PPMC Private Limited - Professional Partners for Project Delivery" 
        className="h-12 md:h-16"
      />
    </Link>
  );
};

export default Logo; 