import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Select } from '../components/common/Select';
import { CrimeHeatmap } from '../components/maps/CrimeHeatmap';
import { MapPin, Filter, Layers, AlertTriangle, ShieldAlert, Clock } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

export const HeatmapView = () => {
  const [incidents, setIncidents] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('Bengaluru Urban');
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncidents();
    fetchAnomalies();
  }, [selectedDistrict, selectedTimeOfDay]);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/analytics/advanced/geospatial?district=${selectedDistrict}`);
      let data = response.data || [];
      
      if (selectedTimeOfDay !== 'ALL') {
        data = data.filter((item) => item.timeOfDay === selectedTimeOfDay);
      }
      
      setIncidents(data);
    } catch (err) {
      toast.error('Failed to load spatial incidents.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnomalies = async () => {
    try {
      const res = await axiosInstance.get('/analytics/advanced/anomalies');
      setAnomalies(res.data || []);
    } catch (err) {
      // Handled
    }
  };

  const getDistrictCenter = (district) => {
    switch (district) {
      case 'Bengaluru Urban': return [12.9716, 77.5946];
      case 'Mysuru': return [12.2958, 76.6394];
      case 'Hubballi-Dharwad': return [15.3647, 75.1240];
      case 'Mangaluru': return [12.9141, 74.8560];
      case 'Belagavi': return [15.8497, 74.4977];
      case 'Kalaburagi': return [17.3297, 76.8343];
      default: return [12.9716, 77.5946];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">KSP Spatiotemporal Crime Heatmap</h1>
            <span className="bg-red-500/20 text-red-400 border border-red-500/40 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase">
              GIS Hotspot Layer
            </span>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Layering location coordinates with time of day to identify spatiotemporal clusters & active anomaly zones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-48">
            <Select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              options={[
                { label: 'Bengaluru Urban', value: 'Bengaluru Urban' },
                { label: 'Mysuru', value: 'Mysuru' },
                { label: 'Hubballi-Dharwad', value: 'Hubballi-Dharwad' },
                { label: 'Mangaluru', value: 'Mangaluru' },
                { label: 'Belagavi', value: 'Belagavi' },
                { label: 'Kalaburagi', value: 'Kalaburagi' },
                { label: 'All Districts', value: 'ALL' },
              ]}
            />
          </div>

          <div className="w-44">
            <Select
              value={selectedTimeOfDay}
              onChange={(e) => setSelectedTimeOfDay(e.target.value)}
              options={[
                { label: 'All Hours', value: 'ALL' },
                { label: 'Night (22:00 - 06:00)', value: 'NIGHT' },
                { label: 'Evening (18:00 - 22:00)', value: 'EVENING' },
                { label: 'Afternoon (12:00 - 18:00)', value: 'AFTERNOON' },
                { label: 'Morning (06:00 - 12:00)', value: 'MORNING' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Active Anomaly Alerts Banner */}
      {anomalies.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-500/20 rounded-xl text-red-400 animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider">
                Emerging Crime Spike Detected (Anomaly Alert)
              </div>
              <div className="text-sm font-semibold text-white mt-0.5">
                {anomalies[0].description}
              </div>
            </div>
          </div>
          <span className="bg-red-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-lg glow-orange-sm">
            Z-Score: +{anomalies[0].zScore}
          </span>
        </div>
      )}

      {/* Map Canvas */}
      <Card hover={false} className="p-2 border border-[#2A3246]">
        <CrimeHeatmap
          incidents={incidents}
          center={getDistrictCenter(selectedDistrict)}
          zoom={selectedDistrict === 'ALL' ? 7 : 12}
        />
      </Card>
    </div>
  );
};
