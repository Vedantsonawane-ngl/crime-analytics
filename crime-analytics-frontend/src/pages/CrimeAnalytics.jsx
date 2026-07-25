import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { AreaTrendChart } from '../components/charts/AreaTrendChart';
import { CategoryPieChart } from '../components/charts/CategoryPieChart';
import { OfficerPerformanceBar } from '../components/charts/OfficerPerformanceBar';
import { RiskRadarChart } from '../components/charts/RiskRadarChart';
import { crimeRecordService } from '../services/crimeRecordService';
import { BarChart3, TrendingUp, ShieldAlert, Award } from 'lucide-react';

export const CrimeAnalytics = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await crimeRecordService.getAllCrimeRecords();
      setRecords(res || []);
    } catch (err) {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  // Calculate dynamic pie chart category data from records
  const categoryCounts = records.reduce((acc, r) => {
    const cat = r.crimeType || 'Other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(categoryCounts).map(cat => ({
    name: cat,
    value: categoryCounts[cat]
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Crime Analytics & Intelligence Center</h1>
        <p className="text-xs text-[#9CA3AF]">Advanced trend forecasting, threat radar, and department performance metrics</p>
      </div>

      {/* Top 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card header="Monthly Crime Growth & Resolution Index">
          <AreaTrendChart />
        </Card>
        <Card header="Threat Vector Radar Analysis">
          <RiskRadarChart />
        </Card>
      </div>

      {/* Bottom 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card header="Category Distribution">
          <CategoryPieChart data={pieData.length > 0 ? pieData : null} />
        </Card>
        <Card header="Officer Performance & Resolution Rate">
          <OfficerPerformanceBar />
        </Card>
      </div>
    </div>
  );
};
