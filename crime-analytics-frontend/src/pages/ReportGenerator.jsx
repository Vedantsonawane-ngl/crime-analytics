import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Select, Textarea } from '../components/common/Select';
import { Modal } from '../components/common/Modal';
import { reportService } from '../services/reportService';
import { crimeRecordService } from '../services/crimeRecordService';
import { useAuth } from '../context/AuthContext';
import { FileBarChart, Plus, Download, RefreshCw, FileText, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const ReportGenerator = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    reportName: 'Pune Cybercrime Analysis Report',
    reportType: 'Crime Analysis',
    generatedBy: user?.name || 'Yadnyesh',
    generatedAt: new Date().toISOString().slice(0, 19),
    filePath: '/reports/pune-cybercrime-analysis.pdf',
    description: 'Detailed analysis of cybercrime incidents and predicted risks in Pune.',
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await reportService.getAllReports();
      setReports(data || []);
    } catch (err) {
      toast.error('Failed to load reports.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReport = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await reportService.createReport({
        ...formData,
        generatedBy: user?.name || formData.generatedBy,
      });
      toast.success('Executive Intelligence Report Generated!');
      setIsModalOpen(false);
      fetchReports();
    } catch (err) {
      // Handled by interceptor
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this generated report file?')) return;
    try {
      await reportService.deleteReport(id);
      toast.success('Report deleted successfully.');
      fetchReports();
    } catch (err) {
      // Handled
    }
  };

  const handleExportPDF = async (reportItem = null) => {
    try {
      const records = await crimeRecordService.getAllCrimeRecords();
      if (!records || records.length === 0) {
        toast.error('No crime records available to generate PDF.');
        return;
      }

      const reportTitle = reportItem ? reportItem.reportName : 'Karnataka State Police - State Crime Analytics Report';
      const reportDesc = reportItem ? reportItem.description : 'Comprehensive intelligence report of crime records, geospatial clusters, and threat assessments.';
      const officerName = reportItem ? reportItem.generatedBy : (user?.name || 'Duty Officer');
      const currentDate = new Date().toLocaleDateString('en-IN', { dateStyle: 'full' });

      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast.error('Pop-up blocked! Please allow pop-ups to download PDF.');
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${reportTitle}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111827; margin: 30px; }
            .header { text-align: center; border-bottom: 3px double #1E3A8A; padding-bottom: 15px; margin-bottom: 20px; }
            .header h1 { margin: 0; font-size: 22px; color: #1E3A8A; text-transform: uppercase; letter-spacing: 1px; }
            .header h2 { margin: 5px 0 0 0; font-size: 14px; color: #4B5563; }
            .badge { display: inline-block; padding: 4px 12px; background-color: #DC2626; color: white; font-weight: bold; font-size: 11px; border-radius: 4px; margin-top: 8px; text-transform: uppercase; }
            .meta-grid { display: flex; justify-content: space-between; background: #F3F4F6; padding: 12px 18px; border-radius: 8px; font-size: 12px; margin-bottom: 20px; }
            .summary-box { background: #EFF6FF; border-left: 4px solid #2563EB; padding: 12px 16px; margin-bottom: 20px; font-size: 13px; line-height: 1.5; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
            th, td { border: 1px solid #D1D5DB; padding: 8px 10px; text-align: left; }
            th { background-color: #1E3A8A; color: white; text-transform: uppercase; font-size: 11px; }
            tr:nth-child(even) { background-color: #F9FAFB; }
            .footer { margin-top: 40px; border-top: 1px solid #E5E7EB; padding-top: 15px; display: flex; justify-content: space-between; font-size: 11px; color: #6B7280; }
            .signature-box { margin-top: 30px; text-align: right; font-size: 12px; }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div className="header">
            <h1>KARNATAKA STATE POLICE (KSP)</h1>
            <h2>STATE CRIME RECORDS BUREAU (SCRB) • OFFICIAL INTELLIGENCE DOSSIER</h2>
            <div class="badge">CONFIDENTIAL / FOR OFFICIAL USE ONLY</div>
          </div>

          <div class="meta-grid">
            <div>
              <strong>Report Title:</strong> ${reportTitle}<br/>
              <strong>Generated By:</strong> ${officerName}<br/>
              <strong>Classification:</strong> ${reportItem?.reportType || 'Statewide Analytics'}
            </div>
            <div style="text-align: right;">
              <strong>Date Generated:</strong> ${currentDate}<br/>
              <strong>Total Records Included:</strong> ${records.length}<br/>
              <strong>System:</strong> Sentinel SOC Intelligence Platform
            </div>
          </div>

          <div class="summary-box">
            <strong>Executive Brief:</strong> ${reportDesc}
          </div>

          <h3>Incidents & Crime Analytics Log</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Crime Category</th>
                <th>District / Location</th>
                <th>Date</th>
                <th>Status</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              ${records.map(r => `
                <tr>
                  <td>#REC-${r.id}</td>
                  <td><strong>${r.crimeType}</strong></td>
                  <td>${r.city || r.district || 'Bengaluru Urban'} (${r.location || 'Central'})</td>
                  <td>${r.crimeDate || '2026-07-25'}</td>
                  <td>${r.status}</td>
                  <td><span style="color: ${r.severity === 'High' || r.severity === 'Critical' ? '#DC2626' : '#D97706'}">${r.severity}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="signature-box">
            <br/><br/>
            ____________________________________<br/>
            <strong>Authorized Officer Signature</strong><br/>
            State Crime Records Bureau (SCRB)
          </div>

          <div class="footer">
            <span>Generated by Sentinel SOC Intelligence Platform</span>
            <span>Page 1 of 1</span>
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
      toast.success('PDF Report Dossier Prepared & Download Dialog Opened!');
    } catch (err) {
      toast.error('Failed to generate PDF report.');
    }
  };

  const columns = [
    {
      header: 'Report ID',
      accessorKey: 'id',
      cell: (row) => <span className="font-mono text-xs text-[#FF7A00] font-bold">#REP-{row.id}</span>
    },
    {
      header: 'Report Title',
      accessorKey: 'reportName',
      cell: (row) => (
        <div className="flex items-center gap-2.5">
          <FileText className="w-4 h-4 text-[#FF7A00]" />
          <div>
            <h4 className="font-bold text-white text-xs">{row.reportName}</h4>
            <p className="text-[10px] text-[#9CA3AF]">{row.description}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Type',
      accessorKey: 'reportType',
      cell: (row) => <Badge variant="info">{row.reportType}</Badge>
    },
    {
      header: 'Generated By',
      accessorKey: 'generatedBy',
      cell: (row) => <span className="text-xs text-white">{row.generatedBy}</span>
    },
    {
      header: 'Generated Date',
      accessorKey: 'generatedAt',
      cell: (row) => <span className="text-xs text-[#9CA3AF]">{row.generatedAt ? String(row.generatedAt).replace('T', ' ') : '2026-07-25'}</span>
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleExportPDF(row)} icon={Download}>
            Export PDF
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(row.id)} icon={Trash2}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileBarChart className="w-6 h-6 text-[#FF7A00]" /> Executive PDF Report Center
          </h1>
          <p className="text-xs text-[#9CA3AF]">Generate, compile, and export formal PDF crime intelligence dossiers</p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => handleExportPDF()} variant="secondary" icon={Download}>
            Download Full PDF Report
          </Button>
          <Button onClick={() => setIsModalOpen(true)} icon={Plus}>
            Compile New Report
          </Button>
        </div>
      </div>

      <Card hover={false}>
        <Table
          columns={columns}
          data={reports}
          isLoading={loading}
          emptyTitle="No Generated Reports"
          emptyDescription="Click 'Compile New Report' to generate a report dossier."
        />
      </Card>

      {/* Report Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Compile Executive Intelligence Report"
      >
        <form onSubmit={handleCreateReport} className="space-y-4">
          <Input
            label="Report Title"
            value={formData.reportName}
            onChange={(e) => setFormData({ ...formData, reportName: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Report Classification Type"
              value={formData.reportType}
              onChange={(e) => setFormData({ ...formData, reportType: e.target.value })}
              options={['Crime Analysis', 'Threat Prediction', 'Officer Activity', 'Suspect Registry']}
            />
            <Input
              label="Generated By Officer"
              value={formData.generatedBy}
              onChange={(e) => setFormData({ ...formData, generatedBy: e.target.value })}
            />
          </div>

          <Textarea
            label="Executive Summary & Notes"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-[#2A3246]">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={submitting} icon={FileBarChart}>
              Compile & Save Report
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
