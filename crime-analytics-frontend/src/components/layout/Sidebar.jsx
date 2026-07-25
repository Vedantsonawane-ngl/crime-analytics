import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Shield,
  BarChart3,
  MapPin,
  Sparkles,
  Bot,
  FileBarChart,
  User,
  Settings,
  ShieldAlert,
  LogOut,
  Network,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Crime Records', path: '/records', icon: FileText },
    { name: 'Criminals', path: '/criminals', icon: Users },
    { name: 'Officers', path: '/officers', icon: Shield },
    { name: 'Link & Network Graph', path: '/network-graph', icon: Network },
    { name: 'Socio-Economic Analytics', path: '/socio-economic', icon: TrendingUp },
    { name: 'Crime Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Heatmap', path: '/heatmap', icon: MapPin },
    { name: 'AI Prediction', path: '/prediction', icon: Sparkles },
    { name: 'AI Chatbot', path: '/chatbot', icon: Bot },
    { name: 'Report Center', path: '/reports', icon: FileBarChart },
    { name: 'User Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen w-64 bg-[#0B1120] border-r border-[#2A3246] transition-transform duration-300 flex flex-col justify-between ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center px-6 border-b border-[#2A3246]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-[#FF7A00] to-[#FB923C] rounded-[12px] shadow-lg shadow-[#FF7A00]/25">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-[#F8FAFC] tracking-wider uppercase">SENTINEL AI</h1>
              <p className="text-[10px] font-semibold text-[#FF7A00] tracking-widest uppercase">Crime Intelligence</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-[16px] text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF7A00]/20 to-transparent text-[#FF7A00] border-l-4 border-[#FF7A00]'
                      : 'text-[#9CA3AF] hover:text-white hover:bg-[#151A28]'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-[#2A3246]">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-[16px] text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
