import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export const RiskRadarChart = ({ data }) => {
  const defaultData = [
    { subject: 'Cyber Attack', A: 120, fullMark: 150 },
    { subject: 'Financial Fraud', A: 98, fullMark: 150 },
    { subject: 'Property Theft', A: 86, fullMark: 150 },
    { subject: 'Violent Crime', A: 65, fullMark: 150 },
    { subject: 'Narcotics', A: 85, fullMark: 150 },
    { subject: 'Traffic Offense', A: 110, fullMark: 150 },
  ];

  const chartData = data && data.length > 0 ? data : defaultData;

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#2A3246" />
          <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" tick={{ fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#2A3246" />
          <Radar name="Threat Index" dataKey="A" stroke="#FF7A00" fill="#FF7A00" fillOpacity={0.4} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#151A28',
              borderColor: '#2A3246',
              borderRadius: '16px',
              color: '#F8FAFC',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
