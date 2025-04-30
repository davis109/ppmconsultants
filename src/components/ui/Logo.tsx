import React from 'react';
import { BookOpen } from 'lucide-react';

interface LogoProps {
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ color = "currentColor" }) => {
  return (
    <div className="flex items-center">
      <BookOpen size={28} color={color} strokeWidth={2} className="text-blue-700" />
    </div>
  );
};

export default Logo;