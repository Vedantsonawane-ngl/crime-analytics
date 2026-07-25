import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const AreaTrendChart = ({ data }) => {
  const defaultData = [
    { month: 'Jan', Incidents: 45, Solved: 38 },
    { month: 'Feb', Incidents: 52, Solved: 42 },
    { month: 'Mar', Incidents: 61, Solved: 48 },
    { month: 'Apr', Incidents: 48, Solved: 40 },
    { month: 'May', Incidents: 74, Solved: 62 },
    { month: 'Jun', Incidents: 85, Solved: 71 },
    { month: 'Jul', Incidents: 68, Solved: 59 },
  ];

  const chartData = data && data.length > 0 ? data : defaultData;

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF7A00" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#FF7A00" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A3246" vertical={false} />
          <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
          <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#151A28',
              borderColor: '#2A3246',
              borderRadius: '16px',
              color: '#F8FAFC',
            }}
          />
          <Area
            type="monotone"
            dataKey="Incidents"
            stroke="#FF7A00"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorIncidents)"
          />
          <Area
            type="monotone"
            dataKey="Solved"
            stroke="#22C55E"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSolved)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
