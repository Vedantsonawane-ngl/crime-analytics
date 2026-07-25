import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Checkbox } from '../components/common/Select';
import { Settings as SettingsIcon, ShieldCheck, Server, Bell, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

export const Settings = () => {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [darkTheme, setDarkTheme] = useState(true);

  const handleSave = () => {
    toast.success('Platform Settings Updated & Saved!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Platform Settings</h1>
        <p className="text-xs text-[#9CA3AF]">Configure Sentinel SOC system parameters and preferences</p>
      </div>

      <Card hover={false} className="space-y-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#2A3246] pb-3 flex items-center gap-2">
          <Server className="w-4 h-4 text-[#FF7A00]" /> Backend Integration Settings
        </h3>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-4 bg-[#1B2235] border border-[#2A3246] rounded-[16px]">
            <div>
              <h4 className="font-bold text-white text-sm">Spring Boot REST Proxy Target</h4>
              <p className="text-[#9CA3AF]">Vite Proxy `/api` mapped to local Spring Boot port</p>
            </div>
            <span className="font-mono text-[#FF7A00] font-bold">http://localhost:9090</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#1B2235] border border-[#2A3246] rounded-[16px]">
            <div>
              <h4 className="font-bold text-white text-sm">Real-time Auto Refresh</h4>
              <p className="text-[#9CA3AF]">Automatically poll backend services for new incidents</p>
            </div>
            <Checkbox checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#1B2235] border border-[#2A3246] rounded-[16px]">
            <div>
              <h4 className="font-bold text-white text-sm">SOC Alert Toast Notifications</h4>
              <p className="text-[#9CA3AF]">Receive popup alerts when new crimes or predictions are saved</p>
            </div>
            <Checkbox checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
          </div>
        </div>

        <div className="pt-4 border-t border-[#2A3246] flex justify-end">
          <Button onClick={handleSave}>Save Platform Configuration</Button>
        </div>
      </Card>
    </div>
  );
};
