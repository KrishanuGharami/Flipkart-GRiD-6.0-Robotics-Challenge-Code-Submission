import React from 'react';
import { Eye } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-8 h-8 bg-primary-600 text-white rounded-md">
      <Eye size={20} />
    </div>
  );
};

export default Logo;