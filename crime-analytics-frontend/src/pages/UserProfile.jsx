import React from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Mail, Key, Lock, CheckCircle2 } from 'lucide-react';

export const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Officer User Profile</h1>
        <p className="text-xs text-[#9CA3AF]">Manage terminal authorization credentials and user session profile</p>
      </div>

      <Card hover={false} className="p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-[#2A3246] pb-8">
          <div className="w-24 h-24 rounded-full bg-[#FF7A00]/20 border-2 border-[#FF7A00] flex items-center justify-center text-[#FF7A00] text-3xl font-bold glow-orange-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'O'}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <h2 className="text-xl font-bold text-white">{user?.name || 'Duty Officer'}</h2>
              <Badge variant="success">AUTHORIZED</Badge>
            </div>
            <p className="text-sm text-[#9CA3AF] flex items-center justify-center sm:justify-start gap-2">
              <Mail className="w-4 h-4 text-[#FF7A00]" /> {user?.email || 'officer@gov.in'}
            </p>
            <p className="text-xs text-emerald-400 font-medium flex items-center justify-center sm:justify-start gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> JWT Token Session Verified
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <h3 className="text-sm font-bold text-white tracking-wide uppercase">System Authorization Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#1B2235] border border-[#2A3246] rounded-[16px]">
              <span className="text-[#9CA3AF] block">Assigned Role</span>
              <span className="font-bold text-white text-sm mt-0.5 block">Senior SOC Analyst</span>
            </div>
            <div className="p-4 bg-[#1B2235] border border-[#2A3246] rounded-[16px]">
              <span className="text-[#9CA3AF] block">Security Clearance</span>
              <span className="font-bold text-[#FF7A00] text-sm mt-0.5 block">Level 5 (Classified)</span>
            </div>
            <div className="p-4 bg-[#1B2235] border border-[#2A3246] rounded-[16px]">
              <span className="text-[#9CA3AF] block">Terminal Jurisdiction</span>
              <span className="font-bold text-white text-sm mt-0.5 block">Maharashtra Central Command</span>
            </div>
            <div className="p-4 bg-[#1B2235] border border-[#2A3246] rounded-[16px]">
              <span className="text-[#9CA3AF] block">Backend API Endpoint</span>
              <span className="font-mono text-white text-xs mt-0.5 block">http://localhost:9090/api</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
