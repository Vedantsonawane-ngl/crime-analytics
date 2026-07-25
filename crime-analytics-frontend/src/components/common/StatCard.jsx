import React from 'react';
import { Card } from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({ title, value, icon: Icon, change, changeType = 'increase', description }) => {
  return (
    <Card className="flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">{title}</p>
          <h3 className="text-2xl font-bold text-[#F8FAFC] tracking-tight mt-1">{value}</h3>
        </div>
        {Icon && (
          <div className="p-3 bg-[#1E2638] text-[#FF7A00] rounded-[16px] border border-[#2A3246] shadow-md">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(change || description) && (
        <div className="mt-4 pt-3 border-t border-[#2A3246]/60 flex items-center justify-between text-xs">
          {change && (
            <div className={`flex items-center font-medium gap-1 ${changeType === 'increase' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {changeType === 'increase' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{change}</span>
            </div>
          )}
          {description && <span className="text-[#6B7280]">{description}</span>}
        </div>
      )}
    </Card>
  );
};
