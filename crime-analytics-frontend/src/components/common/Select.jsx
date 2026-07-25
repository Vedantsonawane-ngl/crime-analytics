import React from 'react';

export const Select = ({ label, options = [], error, icon: Icon, className = '', id, ...props }) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B7280]">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <select
          id={selectId}
          className={`w-full bg-[#1B2235] text-[#F8FAFC] text-sm rounded-[16px] border ${
            error ? 'border-red-500/80 focus:border-red-500' : 'border-[#2A3246] focus:border-[#FF7A00]'
          } ${Icon ? 'pl-11' : 'pl-4'} pr-8 py-3 focus:outline-none focus:ring-1 focus:ring-[#FF7A00]/40 transition-all duration-200 appearance-none ${className}`}
          {...props}
        >
          {options.map((opt, idx) => (
            <option key={idx} value={typeof opt === 'object' ? opt.value : opt} className="bg-[#151A28] text-white">
              {typeof opt === 'object' ? opt.label : opt}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#6B7280]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400 font-medium">{error}</p>}
    </div>
  );
};

export const Textarea = ({ label, error, className = '', id, rows = 4, ...props }) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-2">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={`w-full bg-[#1B2235] text-[#F8FAFC] placeholder-[#6B7280] text-sm rounded-[16px] border ${
          error ? 'border-red-500/80 focus:border-red-500' : 'border-[#2A3246] focus:border-[#FF7A00]'
        } px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#FF7A00]/40 transition-all duration-200 resize-none ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-400 font-medium">{error}</p>}
    </div>
  );
};

export const Checkbox = ({ label, id, className = '', ...props }) => {
  const checkboxId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <label htmlFor={checkboxId} className={`inline-flex items-center gap-2.5 cursor-pointer text-sm text-[#E5E7EB] ${className}`}>
      <input
        id={checkboxId}
        type="checkbox"
        className="w-4 h-4 rounded border-[#2A3246] bg-[#1B2235] text-[#FF7A00] focus:ring-[#FF7A00]/40 accent-[#FF7A00]"
        {...props}
      />
      {label && <span>{label}</span>}
    </label>
  );
};
