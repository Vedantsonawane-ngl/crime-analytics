import React from 'react';
import { Database, Plus } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  title = 'No Records Found',
  description = 'No active intelligence data matches your query or filters.',
  actionLabel,
  onAction,
  icon: Icon = Database
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-[#151A28]/50 border border-dashed border-[#2A3246] rounded-[24px]">
      <div className="p-4 bg-[#1E2638] text-[#FF7A00] rounded-full mb-4 border border-[#2A3246]">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-[#F8FAFC] tracking-tight mb-1">{title}</h3>
      <p className="text-sm text-[#9CA3AF] max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} icon={Plus}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
