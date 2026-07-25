import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Select, Textarea } from '../components/common/Select';
import { Modal } from '../components/common/Modal';
import { SearchBar } from '../components/common/SearchBar';
import { criminalService } from '../services/criminalService';
import { Users, Plus, RefreshCw, Edit, Trash2, UserX, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

export const CriminalManagement = () => {
  const [criminals, setCriminals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    alias: '',
    gender: 'Male',
    age: 30,
    address: '',
    phoneNumber: '',
    criminalStatus: 'Wanted',
    description: '',
  });

  useEffect(() => {
    fetchCriminals();
  }, []);

  const fetchCriminals = async () => {
    setLoading(true);
    try {
      const data = await criminalService.getAllCriminals();
      setCriminals(data || []);
    } catch (err) {
      toast.error('Failed to fetch criminal records.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (criminal = null) => {
    if (criminal) {
      setEditingId(criminal.id);
      setFormData({
        name: criminal.name || '',
        alias: criminal.alias || '',
        gender: criminal.gender || 'Male',
        age: criminal.age || 30,
        address: criminal.address || '',
        phoneNumber: criminal.phoneNumber || '',
        criminalStatus: criminal.criminalStatus || 'Wanted',
        description: criminal.description || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        alias: '',
        gender: 'Male',
        age: 30,
        address: '',
        phoneNumber: '',
        criminalStatus: 'Wanted',
        description: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await criminalService.updateCriminal(editingId, formData);
        toast.success('Criminal Dossier Updated Successfully!');
      } else {
        await criminalService.createCriminal(formData);
        toast.success('New Suspect/Criminal Profile Registered!');
      }
      setIsModalOpen(false);
      fetchCriminals();
    } catch (err) {
      // Error handled by interceptor
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to purge this suspect record from backend DB?')) return;
    try {
      await criminalService.deleteCriminal(id);
      toast.success('Criminal record deleted successfully.');
      fetchCriminals();
    } catch (err) {
      // Handled by interceptor
    }
  };

  const filteredCriminals = criminals.filter((c) => {
    const matchesQuery =
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.alias?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.address?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatusFilter === 'ALL' || c.criminalStatus?.toLowerCase() === selectedStatusFilter.toLowerCase();
    return matchesQuery && matchesStatus;
  });

  const columns = [
    {
      header: 'Profile',
      accessorKey: 'name',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#1E2638] border border-[#2A3246] flex items-center justify-center text-[#FF7A00] font-bold text-xs">
            {row.name ? row.name.charAt(0).toUpperCase() : 'C'}
          </div>
          <div>
            <h4 className="font-bold text-white">{row.name}</h4>
            {row.alias && <p className="text-[10px] text-[#FF7A00]">Alias: "{row.alias}"</p>}
          </div>
        </div>
      )
    },
    {
      header: 'Age & Gender',
      accessorKey: 'age',
      cell: (row) => <span className="text-xs text-[#9CA3AF]">{row.age} yrs • {row.gender}</span>
    },
    {
      header: 'Contact & Address',
      accessorKey: 'phoneNumber',
      cell: (row) => (
        <div>
          <p className="text-xs text-white">{row.address || 'N/A'}</p>
          <p className="text-[10px] text-[#9CA3AF]">{row.phoneNumber}</p>
        </div>
      )
    },
    {
      header: 'Status',
      accessorKey: 'criminalStatus',
      cell: (row) => <Badge variant={row.criminalStatus}>{row.criminalStatus}</Badge>
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleOpenModal(row)} icon={Edit}>
            Edit
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Criminal Suspect Registry</h1>
          <p className="text-xs text-[#9CA3AF]">Manage suspect profiles, warrants, and criminal intelligence</p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={fetchCriminals} variant="secondary" icon={RefreshCw} size="sm">
            Refresh
          </Button>
          <Button onClick={() => handleOpenModal()} icon={Plus}>
            Register Suspect
          </Button>
        </div>
      </div>

      <Card hover={false} className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by suspect name, alias, address..."
          />
          <Select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            options={[
              { label: 'All Statuses', value: 'ALL' },
              { label: 'Wanted', value: 'Wanted' },
              { label: 'Under Investigation', value: 'Under Investigation' },
              { label: 'In Custody', value: 'In Custody' },
            ]}
          />
        </div>
      </Card>

      <Card hover={false}>
        <Table
          columns={columns}
          data={filteredCriminals}
          isLoading={loading}
          emptyTitle="No Criminal Suspect Profiles Found"
          emptyDescription="Click 'Register Suspect' to create a suspect profile."
        />
      </Card>

      {/* Criminal CRUD Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Suspect Dossier' : 'Register New Suspect Profile'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="Amit Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Known Alias"
              placeholder="e.g. Amit Bhai"
              value={formData.alias}
              onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Gender"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              options={['Male', 'Female', 'Other']}
            />
            <Input
              label="Age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
            />
            <Select
              label="Criminal Status"
              value={formData.criminalStatus}
              onChange={(e) => setFormData({ ...formData, criminalStatus: e.target.value })}
              options={['Wanted', 'Under Investigation', 'In Custody']}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Address / Jurisdiction"
              placeholder="Pune, Maharashtra"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <Input
              label="Phone Number"
              placeholder="9876543210"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </div>

          <Textarea
            label="Intel Description & Background"
            placeholder="Suspected involvement in organized cybercrime..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-[#2A3246]">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={submitting}>
              {editingId ? 'Update Record' : 'Save Criminal Profile'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
