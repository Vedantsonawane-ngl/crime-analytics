import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ value, onChange, placeholder = 'Search intelligence data...', className = '' }) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B7280]">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#1B2235] text-[#F8FAFC] placeholder-[#6B7280] text-sm rounded-[16px] border border-[#2A3246] pl-10 pr-9 py-2.5 focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00]/40 transition-all duration-200"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
