import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({
  label,
  error,
  icon: Icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B7280]">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-[#1B2235] text-[#F8FAFC] placeholder-[#6B7280] text-sm rounded-[16px] border ${
            error ? 'border-red-500/80 focus:border-red-500' : 'border-[#2A3246] focus:border-[#FF7A00]'
          } ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#FF7A00]/40 transition-all duration-200 ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400 font-medium">{error}</p>}
    </div>
  );
};

export const PasswordInput = ({ label, error, icon: Icon, className = '', id, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B7280]">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          id={inputId}
          type={showPassword ? 'text' : 'password'}
          className={`w-full bg-[#1B2235] text-[#F8FAFC] placeholder-[#6B7280] text-sm rounded-[16px] border ${
            error ? 'border-red-500/80 focus:border-red-500' : 'border-[#2A3246] focus:border-[#FF7A00]'
          } ${Icon ? 'pl-11' : 'pl-4'} pr-11 py-3 focus:outline-none focus:ring-1 focus:ring-[#FF7A00]/40 transition-all duration-200 ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6B7280] hover:text-[#E5E7EB] transition-colors"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400 font-medium">{error}</p>}
    </div>
  );
};
