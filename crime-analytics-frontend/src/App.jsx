import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';

import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { ForgotPassword } from './pages/auth/ForgotPassword';

import { Dashboard } from './pages/Dashboard';
import { CrimeRecords } from './pages/CrimeRecords';
import { CrimeDetails } from './pages/CrimeDetails';
import { CriminalManagement } from './pages/CriminalManagement';
import { OfficerManagement } from './pages/OfficerManagement';
import { NetworkGraphView } from './pages/NetworkGraphView';
import { SocioEconomicAnalytics } from './pages/SocioEconomicAnalytics';
import { CrimeAnalytics } from './pages/CrimeAnalytics';
import { HeatmapView } from './pages/HeatmapView';
import { CrimePrediction } from './pages/CrimePrediction';
import { AIChatbot } from './pages/AIChatbot';
import { ReportGenerator } from './pages/ReportGenerator';
import { UserProfile } from './pages/UserProfile';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#151A28',
              color: '#F8FAFC',
              border: '1px solid #2A3246',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            },
          }}
        />

        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected SOC Dashboard Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="records" element={<CrimeRecords />} />
            <Route path="records/:id" element={<CrimeDetails />} />
            <Route path="criminals" element={<CriminalManagement />} />
            <Route path="officers" element={<OfficerManagement />} />
            <Route path="network-graph" element={<NetworkGraphView />} />
            <Route path="socio-economic" element={<SocioEconomicAnalytics />} />
            <Route path="analytics" element={<CrimeAnalytics />} />
            <Route path="heatmap" element={<HeatmapView />} />
            <Route path="prediction" element={<CrimePrediction />} />
            <Route path="chatbot" element={<AIChatbot />} />
            <Route path="reports" element={<ReportGenerator />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback Catch-all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
