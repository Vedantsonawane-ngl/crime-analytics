import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = true,
  header,
  action,
  ...props
}) => {
  return (
    <div
      className={`bg-[#151A28] border border-[#2A3246] rounded-[24px] p-6 shadow-xl relative ${
        hover ? 'hover:border-[#FF7A00]/40 transition-all duration-300 hover:shadow-[#FF7A00]/5' : ''
      } ${className}`}
      {...props}
    >
      {(header || action) && (
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2A3246]">
          {header && typeof header === 'string' ? (
            <h3 className="text-base font-semibold text-[#F8FAFC] tracking-tight">{header}</h3>
          ) : (
            header
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
