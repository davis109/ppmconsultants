import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  company,
  image,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <Quote size={32} className="text-blue-500 opacity-30 mb-4" />
      <p className="text-gray-700 italic mb-6">"{quote}"</p>
      <div className="flex items-center">
        {image ? (
          <img src={image} alt={author} className="w-12 h-12 rounded-full mr-4 object-cover" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <span className="text-blue-600 font-bold text-lg">
              {author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h4 className="font-semibold text-gray-900">{author}</h4>
          <p className="text-gray-600 text-sm">
            {role}, {company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;