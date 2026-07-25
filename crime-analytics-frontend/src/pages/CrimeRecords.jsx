import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input, PasswordInput } from '../components/common/Input';
import { Select, Textarea } from '../components/common/Select';
import { Modal } from '../components/common/Modal';
import { SearchBar } from '../components/common/SearchBar';
import { Pagination } from '../components/common/Pagination';
import { crimeRecordService } from '../services/crimeRecordService';
import { crimeService } from '../services/crimeService';
import { Plus, Filter, RefreshCw, Eye, Trash2, Calendar, MapPin, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const CrimeRecords = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [crimesList, setCrimesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    crimeId: '',
    crimeType: 'Cybercrime',
    city: 'Pune',
    state: 'Maharashtra',
    location: 'Hinjewadi IT Park',
    crimeDate: new Date().toISOString().split('T')[0],
    status: 'Open',
    severity: 'High',
    description: '',
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [recordsRes, crimesRes] = await Promise.all([
        crimeRecordService.getAllCrimeRecords(),
        crimeService.getAllCrimes().catch(() => [])
      ]);
      setRecords(recordsRes || []);
      setCrimesList(crimesRes || []);
    } catch (err) {
      toast.error('Failed to load crime records.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecord = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Ensure we have a valid crimeId
      let validCrimeId = formData.crimeId;
      if (!validCrimeId) {
        if (crimesList.length > 0) {
          validCrimeId = crimesList[0].id;
        } else {
          // Auto create a category in backend first if none exists
          const newCrime = await crimeService.createCrime({
            crimeName: formData.crimeType,
            category: formData.crimeType,
            severity: formData.severity,
            description: formData.description || 'Auto generated category'
          });
          validCrimeId = newCrime.id;
        }
      }

      await crimeRecordService.createCrimeRecord({
        ...formData,
        crimeId: Number(validCrimeId),
      });

      toast.success('Crime Incident Record Created Successfully!');
      setIsModalOpen(false);
      fetchInitialData();
    } catch (err) {
      // Error handled by interceptor
    } finally {
      setSubmitting(false);
    }
  };

  // Filter Logic
  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.crimeType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCity = selectedCity === 'ALL' || r.city?.toLowerCase() === selectedCity.toLowerCase();
    const matchesSeverity = selectedSeverity === 'ALL' || r.severity?.toLowerCase() === selectedSeverity.toLowerCase();
    const matchesStatus = selectedStatus === 'ALL' || r.status?.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesCity && matchesSeverity && matchesStatus;
  });

  const totalPages = Math.ceil(filteredRecords.length / pageSize) || 1;
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const columns = [
    {
      header: 'Case ID',
      accessorKey: 'id',
      cell: (row) => <span className="font-mono text-xs text-[#FF7A00] font-bold">#CR-{row.id}</span>
    },
    {
      header: 'Crime Category',
      accessorKey: 'crimeType',
      cell: (row) => (
        <div>
          <p className="font-semibold text-white">{row.crimeType}</p>
          {row.crime?.crimeName && <p className="text-[10px] text-[#9CA3AF]">{row.crime.crimeName}</p>}
        </div>
      )
    },
    {
      header: 'Location & Jurisdiction',
      accessorKey: 'city',
      cell: (row) => (
        <div className="flex items-center gap-1.5 text-xs text-white">
          <MapPin className="w-3.5 h-3.5 text-[#FF7A00]" />
          <span>{row.location}, {row.city}</span>
        </div>
      )
    },
    {
      header: 'Incident Date',
      accessorKey: 'crimeDate',
      cell: (row) => (
        <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
          <Calendar className="w-3.5 h-3.5" />
          <span>{row.crimeDate}</span>
        </div>
      )
    },
    {
      header: 'Severity',
      accessorKey: 'severity',
      cell: (row) => <Badge variant={row.severity}>{row.severity}</Badge>
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => <Badge variant={row.status}>{row.status}</Badge>
    },
    {
      header: 'Actions',
      cell: (row) => (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate(`/records/${row.id}`, { state: { record: row } })}
          icon={Eye}
        >
          Details
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Crime Records Intelligence</h1>
          <p className="text-xs text-[#9CA3AF]">Master database of reported criminal incidents & case files</p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={fetchInitialData} variant="secondary" icon={RefreshCw} size="sm">
            Refresh
          </Button>
          <Button onClick={() => setIsModalOpen(true)} icon={Plus}>
            Log Incident Record
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <Card hover={false} className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SearchBar
            value={searchQuery}
            onChange={(val) => { setSearchQuery(val); setCurrentPage(1); }}
            placeholder="Search by crime type, location, or details..."
          />

          <Select
            value={selectedCity}
            onChange={(e) => { setSelectedCity(e.target.value); setCurrentPage(1); }}
            options={[
              { label: 'All Cities', value: 'ALL' },
              { label: 'Pune', value: 'Pune' },
              { label: 'Mumbai', value: 'Mumbai' },
              { label: 'Delhi', value: 'Delhi' },
              { label: 'Bangalore', value: 'Bangalore' },
            ]}
          />

          <Select
            value={selectedSeverity}
            onChange={(e) => { setSelectedSeverity(e.target.value); setCurrentPage(1); }}
            options={[
              { label: 'All Severities', value: 'ALL' },
              { label: 'Critical', value: 'Critical' },
              { label: 'High', value: 'High' },
              { label: 'Medium', value: 'Medium' },
              { label: 'Low', value: 'Low' },
            ]}
          />

          <Select
            value={selectedStatus}
            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
            options={[
              { label: 'All Case Statuses', value: 'ALL' },
              { label: 'Open', value: 'Open' },
              { label: 'Under Investigation', value: 'Under Investigation' },
              { label: 'Closed', value: 'Closed' },
            ]}
          />
        </div>
      </Card>

      {/* Table & Pagination */}
      <Card hover={false}>
        <Table
          columns={columns}
          data={paginatedRecords}
          isLoading={loading}
          emptyTitle="No Incident Records Match Filters"
          emptyDescription="Try clearing search filters or click 'Log Incident Record' to add a new case."
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredRecords.length}
          pageSize={pageSize}
        />
      </Card>

      {/* Create Crime Record Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Log New Crime Incident Record"
      >
        <form onSubmit={handleCreateRecord} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Crime Category"
              value={formData.crimeType}
              onChange={(e) => setFormData({ ...formData, crimeType: e.target.value })}
              options={[
                'Cybercrime',
                'Financial Fraud',
                'Robbery',
                'Assault',
                'Property Theft',
                'Homicide',
                'Narcotics'
              ]}
              required
            />

            <Select
              label="Severity Rating"
              value={formData.severity}
              onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
              options={['Critical', 'High', 'Medium', 'Low']}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="City"
              placeholder="e.g. Pune"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />

            <Input
              label="State"
              placeholder="e.g. Maharashtra"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Specific Location"
              placeholder="e.g. Hinjewadi Sector 3"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />

            <Input
              label="Crime Date"
              type="date"
              value={formData.crimeDate}
              onChange={(e) => setFormData({ ...formData, crimeDate: e.target.value })}
              required
            />
          </div>

          <Select
            label="Case Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={['Open', 'Under Investigation', 'Closed']}
            required
          />

          <Textarea
            label="Incident Narrative / Description"
            placeholder="Provide detailed incident summary..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-[#2A3246]">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={submitting}>
              Save Incident Record
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
