import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const OfficerPerformanceBar = ({ data }) => {
  const defaultData = [
    { officer: 'Insp. Deshmukh', Resolved: 28, Active: 4 },
    { officer: 'Sub-Insp. Patil', Resolved: 22, Active: 6 },
    { officer: 'Insp. Sharma', Resolved: 31, Active: 2 },
    { officer: 'Const. Kulkarni', Resolved: 18, Active: 5 },
    { officer: 'Insp. Verma', Resolved: 25, Active: 3 },
  ];

  const chartData = data && data.length > 0 ? data : defaultData;

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A3246" vertical={false} />
          <XAxis dataKey="officer" stroke="#9CA3AF" tick={{ fontSize: 11 }} />
          <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#151A28',
              borderColor: '#2A3246',
              borderRadius: '16px',
              color: '#F8FAFC',
            }}
          />
          <Bar dataKey="Resolved" fill="#22C55E" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Active" fill="#FF7A00" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
