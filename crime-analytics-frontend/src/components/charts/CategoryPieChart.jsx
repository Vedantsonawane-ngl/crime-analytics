import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const CategoryPieChart = ({ data }) => {
  const defaultData = [
    { name: 'Cyber Crime', value: 35 },
    { name: 'Robbery', value: 20 },
    { name: 'Financial Fraud', value: 25 },
    { name: 'Assault', value: 12 },
    { name: 'Other', value: 8 },
  ];

  const chartData = data && data.length > 0 ? data : defaultData;
  const COLORS = ['#FF7A00', '#38BDF8', '#22C55E', '#EF4444', '#A855F7', '#EC4899'];

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#151A28" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#151A28',
              borderColor: '#2A3246',
              borderRadius: '16px',
              color: '#F8FAFC',
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span style={{ color: '#9CA3AF', fontSize: 12 }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
