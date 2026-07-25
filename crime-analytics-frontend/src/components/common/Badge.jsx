import React from 'react';

export const Badge = ({ children, variant = 'info', className = '' }) => {
  const variants = {
    critical: 'bg-red-500/15 text-red-400 border-red-500/30',
    high: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    medium: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    low: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    danger: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    info: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    open: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    investigation: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    closed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    wanted: 'bg-red-500/15 text-red-400 border-red-500/30',
    custody: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  };

  const normalizedVariant = variant.toLowerCase().replace(/\s+/g, '');
  const selectedStyle = variants[normalizedVariant] || variants.info;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${selectedStyle} ${className}`}>
      {children}
    </span>
  );
};
