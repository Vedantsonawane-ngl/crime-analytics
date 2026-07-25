import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, Building2, Users, GraduationCap, DollarSign, ShieldAlert } from 'lucide-react';
import { Card } from '../components/common/Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LineChart, Line } from 'recharts';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

export const SocioEconomicAnalytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/analytics/advanced/socio-economic');
        setData(response.data);
      } catch (err) {
        toast.error('Failed to load socio-economic correlation data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#F8FAFC] tracking-tight">
              Socio-Economic & Criminological Correlation
            </h1>
            <span className="bg-purple-500/20 text-purple-400 border border-purple-500/40 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase">
              Proactive Intelligence
            </span>
          </div>
          <p className="text-sm text-[#9CA3AF] mt-1">
            Overlays crime frequency with urbanization patterns, unemployment rates, poverty levels, and literacy indices across Karnataka districts to understand the underlying drivers.
          </p>
        </div>
      </div>

      {/* Metric Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 bg-[#151A28] border border-[#2A3246]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#9CA3AF] uppercase">Highest Crime-Urban Correlation</span>
            <Building2 className="w-5 h-5 text-[#FF7A00]" />
          </div>
          <div className="text-xl font-black text-[#F8FAFC] mt-2">Bengaluru Urban</div>
          <div className="text-xs text-[#9CA3AF] mt-1">Urbanization Index: 91.2% | Cyber & Financial Crimes</div>
        </Card>

        <Card className="p-5 bg-[#151A28] border border-[#2A3246]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#9CA3AF] uppercase">High Unemployment Vulnerability</span>
            <Users className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-xl font-black text-[#F8FAFC] mt-2">Belagavi / Hubballi</div>
          <div className="text-xs text-[#9CA3AF] mt-1">Unemployment Rate: ~11.2% | Youth Property Offenses</div>
        </Card>

        <Card className="p-5 bg-[#151A28] border border-[#2A3246]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#9CA3AF] uppercase">Literacy Impact Factor</span>
            <GraduationCap className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-[#F8FAFC] mt-2">Mangaluru (90.1%)</div>
          <div className="text-xs text-[#9CA3AF] mt-1">-34% Lower Violent Crime Rate</div>
        </Card>

        <Card className="p-5 bg-[#151A28] border border-[#2A3246]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#9CA3AF] uppercase">Avg Socio-Risk Index</span>
            <ShieldAlert className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-xl font-black text-[#F8FAFC] mt-2">68.4 / 100</div>
          <div className="text-xs text-[#9CA3AF] mt-1">Statewide Composite Vulnerability</div>
        </Card>
      </div>

      {/* Main Charts: Crime vs Socio Economic Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District Crime vs Unemployment & Poverty */}
        <Card className="p-6 bg-[#151A28] border border-[#2A3246]">
          <h2 className="text-base font-bold text-[#F8FAFC] mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#FF7A00]" /> District Crime Volume vs Unemployment Rate (%)
          </h2>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3246" />
                <XAxis dataKey="district" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1E2638', borderColor: '#2A3246', borderRadius: '12px' }} />
                <Legend />
                <Bar dataKey="totalCrimes" name="Total Crime Volume" fill="#FF7A00" radius={[6, 6, 0, 0]} />
                <Bar dataKey="unemploymentRate" name="Unemployment Rate (%)" fill="#EF4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Literacy Rate vs Risk Correlation Index */}
        <Card className="p-6 bg-[#151A28] border border-[#2A3246]">
          <h2 className="text-base font-bold text-[#F8FAFC] mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" /> Literacy Rate (%) vs Structural Risk Correlation Index
          </h2>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3246" />
                <XAxis dataKey="district" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1E2638', borderColor: '#2A3246', borderRadius: '12px' }} />
                <Legend />
                <Line type="monotone" dataKey="literacyRate" name="Literacy Rate (%)" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="riskCorrelationIndex" name="Risk Correlation Index" stroke="#A855F7" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* District Vulnerability Matrix Table */}
      <Card className="p-6 bg-[#151A28] border border-[#2A3246]">
        <h2 className="text-base font-bold text-[#F8FAFC] mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" /> SCRB District Socio-Economic Vulnerability Assessment
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1E2638] text-[#9CA3AF] uppercase font-bold border-b border-[#2A3246]">
              <tr>
                <th className="p-3">District</th>
                <th className="p-3">Total Incident Count</th>
                <th className="p-3">Unemployment (%)</th>
                <th className="p-3">Poverty Rate (%)</th>
                <th className="p-3">Literacy Rate (%)</th>
                <th className="p-3">Urbanization (%)</th>
                <th className="p-3">Composite Risk Index</th>
                <th className="p-3">Primary Socio Vulnerability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A3246] text-[#D1D5DB]">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#1E2638]/50 transition-colors">
                  <td className="p-3 font-bold text-white">{row.district}</td>
                  <td className="p-3 font-semibold text-[#FF7A00]">{row.totalCrimes}</td>
                  <td className="p-3 text-red-400 font-semibold">{row.unemploymentRate}%</td>
                  <td className="p-3">{row.povertyRate}%</td>
                  <td className="p-3 text-emerald-400 font-semibold">{row.literacyRate}%</td>
                  <td className="p-3">{row.urbanizationIndex}%</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                      row.riskCorrelationIndex > 70
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}>
                      {row.riskCorrelationIndex} / 100
                    </span>
                  </td>
                  <td className="p-3 text-[#9CA3AF] italic">{row.primaryVulnerability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
