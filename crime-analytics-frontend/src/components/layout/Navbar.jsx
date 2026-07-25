import React from 'react';
import { Bell, Menu, Activity, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-[#0B1120]/90 backdrop-blur-md border-b border-[#2A3246] sticky top-0 z-30 flex items-center justify-between px-6">
      {/* Left: Mobile Toggle & System Status */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 text-[#9CA3AF] hover:text-white rounded-[12px] bg-[#151A28] border border-[#2A3246]"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#151A28] border border-[#2A3246] rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-emerald-400 tracking-wide">SOC SYSTEM ONLINE</span>
        </div>
      </div>

      {/* Right: Notifications & Officer Profile */}
      <div className="flex items-center gap-4">
        <button className="relative p-2.5 bg-[#151A28] border border-[#2A3246] hover:border-[#FF7A00]/40 rounded-[12px] text-[#9CA3AF] hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF7A00] rounded-full"></span>
        </button>

        <div 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 pl-2 pr-3 py-1 bg-[#151A28] border border-[#2A3246] hover:border-[#FF7A00]/40 rounded-full cursor-pointer transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/40 flex items-center justify-center text-[#FF7A00]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-[#F8FAFC]">{user?.name || 'Duty Officer'}</p>
            <p className="text-[10px] text-[#9CA3AF]">{user?.email || 'officer@gov.in'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
