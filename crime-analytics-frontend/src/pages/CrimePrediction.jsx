import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Select, Textarea } from '../components/common/Select';
import { Modal } from '../components/common/Modal';
import { predictionService } from '../services/predictionService';
import { crimeService } from '../services/crimeService';
import { Sparkles, Plus, RefreshCw, Cpu, CheckCircle, ShieldAlert, AlertTriangle, Activity } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

export const CrimePrediction = () => {
  const [predictions, setPredictions] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [crimesList, setCrimesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    crimeId: '',
    crimeType: 'Cybercrime',
    city: 'Bengaluru Urban',
    state: 'Karnataka',
    predictedRisk: 'High',
    confidenceScore: 0.92,
    predictionDate: new Date().toISOString().slice(0, 19),
    description: 'AI model predicts high risk based on spatiotemporal clusters & socio-economic correlation.',
  });

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const [predRes, crimeRes, anomalyRes] = await Promise.all([
        predictionService.getAllPredictions(),
        crimeService.getAllCrimes().catch(() => []),
        axiosInstance.get('/analytics/advanced/anomalies').then((r) => r.data).catch(() => [])
      ]);
      setPredictions(predRes || []);
      setCrimesList(crimeRes || []);
      setAnomalies(anomalyRes || []);
    } catch (err) {
      toast.error('Failed to load predictive threat model output.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePrediction = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let targetCrimeId = formData.crimeId;
      if (!targetCrimeId) {
        targetCrimeId = crimesList.length > 0 ? crimesList[0].id : 1;
      }

      await predictionService.createPrediction({
        ...formData,
        crimeId: Number(targetCrimeId),
        confidenceScore: Number(formData.confidenceScore),
      });

      toast.success('AI Threat Prediction Model Executed & Saved!');
      setIsModalOpen(false);
      fetchPredictions();
    } catch (err) {
      // Handled
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      header: 'Prediction ID',
      accessorKey: 'id',
      cell: (row) => <span className="font-mono text-xs text-[#FF7A00] font-bold">#PRED-{row.id}</span>
    },
    {
      header: 'Predicted Crime Category',
      accessorKey: 'crimeType',
      cell: (row) => <span className="font-semibold text-white">{row.crimeType}</span>
    },
    {
      header: 'District / Jurisdiction',
      accessorKey: 'city',
      cell: (row) => <span className="text-xs text-white">{row.city}, {row.state}</span>
    },
    {
      header: 'Predicted Risk Rating',
      accessorKey: 'predictedRisk',
      cell: (row) => <Badge variant={row.predictedRisk}>{row.predictedRisk}</Badge>
    },
    {
      header: 'Model Confidence',
      accessorKey: 'confidenceScore',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-[#1E2638] rounded-full h-2 overflow-hidden border border-[#2A3246]">
            <div
              className="bg-[#FF7A00] h-full rounded-full"
              style={{ width: `${(row.confidenceScore || 0.85) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-white">
            {((row.confidenceScore || 0.85) * 100).toFixed(0)}%
          </span>
        </div>
      )
    },
    {
      header: 'Prediction Date',
      accessorKey: 'predictionDate',
      cell: (row) => <span className="text-xs text-[#9CA3AF]">{row.predictionDate ? String(row.predictionDate).replace('T', ' ') : '2026-07-25'}</span>
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#FF7A00]" /> SCRB AI Predictive Risk & Anomaly Engine
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            Statistical z-score anomaly detection & predictive risk scoring for proactive resource deployment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={fetchPredictions} variant="secondary" icon={RefreshCw} size="sm">
            Refresh Logs
          </Button>
          <Button onClick={() => setIsModalOpen(true)} icon={Cpu}>
            Run AI Threat Model
          </Button>
        </div>
      </div>

      {/* Automated Anomaly & Spatiotemporal Callout Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {anomalies.slice(0, 3).map((a, idx) => (
          <Card key={idx} className="p-5 bg-[#151A28] border border-red-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 animate-pulse" /> {a.alertSeverity || 'CRITICAL_SPIKE'}
                </span>
                <span className="bg-red-500/20 text-red-400 font-mono text-[11px] font-bold px-2 py-0.5 rounded-full border border-red-500/30">
                  Z: +{a.zScore}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-2">{a.district}</h3>
              <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">{a.description}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#2A3246] flex items-center justify-between text-xs">
              <span className="text-[#9CA3AF]">Current vs Avg: <strong className="text-white">{a.currentIncidentCount} vs {a.historicalAverage}</strong></span>
              <span className="text-[#FF7A00] font-bold">Action Required</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Predictions Table */}
      <Card hover={false}>
        <Table
          columns={columns}
          data={predictions}
          isLoading={loading}
          emptyTitle="No Threat Predictions Generated Yet"
          emptyDescription="Click 'Run AI Threat Model' to generate a predictive risk log."
        />
      </Card>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Execute Predictive Threat Model"
      >
        <form onSubmit={handleCreatePrediction} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Target Crime Category"
              value={formData.crimeType}
              onChange={(e) => setFormData({ ...formData, crimeType: e.target.value })}
              options={['Cybercrime', 'Financial Fraud', 'Armed Robbery', 'Property Theft', 'Narcotics Trafficking']}
            />
            <Select
              label="Predicted Risk Rating"
              value={formData.predictedRisk}
              onChange={(e) => setFormData({ ...formData, predictedRisk: e.target.value })}
              options={['Critical', 'High', 'Medium', 'Low']}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="District / City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <Input
              label="State Jurisdiction"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Confidence Score (0.0 to 1.0)"
              type="number"
              step="0.01"
              max="1.0"
              min="0.1"
              value={formData.confidenceScore}
              onChange={(e) => setFormData({ ...formData, confidenceScore: e.target.value })}
            />
            <Input
              label="Execution Date & Time"
              type="datetime-local"
              value={formData.predictionDate.slice(0, 16)}
              onChange={(e) => setFormData({ ...formData, predictionDate: e.target.value })}
            />
          </div>

          <Textarea
            label="Model Rationale & Spatiotemporal Rationale"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-[#2A3246]">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={submitting} icon={Sparkles}>
              Save Prediction Output
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
