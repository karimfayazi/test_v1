
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-lg',
    md: 'px-4 py-1 text-2xl',
    lg: 'px-6 py-2 text-4xl'
  };

  return (
    <div className={`inline-block bg-white ${className}`}>
      <div className="border border-slate-900 p-[2px]">
        <div className={`border border-slate-900 ${sizeClasses[size]} font-serif font-bold text-slate-900 tracking-tight flex items-center justify-center leading-none`}>
          SJDA
        </div>
      </div>
    </div>
  );
};

export default Logo;
