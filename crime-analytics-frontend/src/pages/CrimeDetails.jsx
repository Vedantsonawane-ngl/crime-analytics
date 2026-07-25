import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ArrowLeft, Shield, MapPin, Calendar, FileText, UserCheck, Clock, FileCheck } from 'lucide-react';

export const CrimeDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const record = location.state?.record || {
    id: id || 1,
    crimeType: 'Cybercrime Incident',
    city: 'Pune',
    state: 'Maharashtra',
    location: 'Hinjewadi Phase 1',
    crimeDate: '2026-07-21',
    status: 'Open',
    severity: 'High',
    description: 'Unauthorized digital intrusion into local enterprise banking servers. Fraudulent wire transfers detected.',
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Button variant="secondary" onClick={() => navigate('/records')} icon={ArrowLeft} size="sm">
          Back to Records
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant={record.severity}>Severity: {record.severity}</Badge>
          <Badge variant={record.status}>Status: {record.status}</Badge>
        </div>
      </div>

      {/* Main Case Summary Header Card */}
      <Card hover={false} className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF7A00] font-bold">
              CASE FILE #CR-{record.id}
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mt-1">{record.crimeType}</h1>
            <p className="text-xs text-[#9CA3AF] mt-1 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#FF7A00]" /> {record.location}, {record.city}, {record.state}
              <span className="mx-2">•</span>
              <Calendar className="w-3.5 h-3.5 text-[#FF7A00]" /> Logged Date: {record.crimeDate}
            </p>
          </div>
        </div>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Case Brief & Evidence Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <Card header="Incident Overview & Narrative">
            <p className="text-sm text-[#E5E7EB] leading-relaxed">
              {record.description || 'Detailed intelligence narrative recorded in official police registry logs.'}
            </p>
          </Card>

          <Card header="Investigation Timeline & Milestones">
            <div className="relative border-l-2 border-[#2A3246] pl-6 space-y-6 ml-2">
              <div className="relative">
                <span className="absolute -left-[31px] top-0 p-1.5 bg-[#FF7A00] rounded-full text-white">
                  <Clock className="w-3 h-3" />
                </span>
                <h4 className="text-sm font-bold text-white">Incident Reported</h4>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Logged in Central System on {record.crimeDate}</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-0 p-1.5 bg-[#1E2638] border border-[#FF7A00] rounded-full text-[#FF7A00]">
                  <FileText className="w-3 h-3" />
                </span>
                <h4 className="text-sm font-bold text-white">Digital Forensics Analysis</h4>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Packet traces & IP logs attached to case dossier</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-0 p-1.5 bg-emerald-500 rounded-full text-white">
                  <FileCheck className="w-3 h-3" />
                </span>
                <h4 className="text-sm font-bold text-white">Officer Assignment Complete</h4>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Assigned to Cyber Crime Intelligence Squad</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Assigned Personnel & Suspect Info */}
        <div className="space-y-6">
          <Card header="Assigned Investigating Officer">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/40 flex items-center justify-center text-[#FF7A00]">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Inspector S. Deshmukh</h4>
                <p className="text-xs text-[#9CA3AF]">Badge #CY-4902</p>
                <p className="text-xs text-emerald-400 mt-1 font-medium">Cyber Crime Special Division</p>
              </div>
            </div>
          </Card>

          <Card header="Linked Criminal Suspects">
            <div className="space-y-3">
              <div className="p-3 bg-[#1B2235] border border-[#2A3246] rounded-[16px] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">Amit Sharma (Alias: Amit Bhai)</h4>
                  <p className="text-[10px] text-[#9CA3AF]">Age: 35 • Male</p>
                </div>
                <Badge variant="wanted">WANTED</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
