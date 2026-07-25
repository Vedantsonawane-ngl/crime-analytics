import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-[16px] transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#FF7A00] to-[#EA6A00] hover:from-[#EA6A00] hover:to-[#C45500] text-white shadow-lg shadow-[#FF7A00]/20 hover:shadow-[#FF7A00]/40 border border-[#FF7A00]/30',
    secondary: 'bg-[#1E2638] hover:bg-[#232D44] text-[#E5E7EB] border border-[#2A3246] hover:border-[#3A455F]',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-600/20 border border-red-500/30',
    outline: 'bg-transparent text-[#FF7A00] border border-[#FF7A00]/50 hover:bg-[#FF7A00]/10',
    ghost: 'bg-transparent hover:bg-[#1E2638] text-[#9CA3AF] hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </button>
  );
};
