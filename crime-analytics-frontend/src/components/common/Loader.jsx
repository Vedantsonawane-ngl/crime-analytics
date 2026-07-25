import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const Loader = ({ text = 'Analyzing Intelligence Data...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 w-full min-h-[300px]">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#FF7A00]/20 border-t-[#FF7A00] rounded-full animate-spin"></div>
        <ShieldAlert className="w-6 h-6 text-[#FF7A00] absolute animate-pulse" />
      </div>
      <p className="mt-4 text-sm font-medium text-[#9CA3AF] tracking-wide">{text}</p>
    </div>
  );
};

export const SkeletonLoader = ({ count = 4, className = 'h-16' }) => {
  return (
    <div className="space-y-3 w-full animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`bg-[#1B2235] border border-[#2A3246] rounded-[16px] w-full ${className}`} />
      ))}
    </div>
  );
};
