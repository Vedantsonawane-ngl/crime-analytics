import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Modal } from '../components/common/Modal';
import { SearchBar } from '../components/common/SearchBar';
import { officerService } from '../services/officerService';
import { Shield, Plus, RefreshCw, Edit, Trash2, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

export const OfficerManagement = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    badgeNumber: '',
    name: '',
    department: 'Cyber Crime Cell',
    rank: 'Inspector',
    phoneNumber: '',
    email: '',
  });

  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = async () => {
    setLoading(true);
    try {
      const data = await officerService.getAllOfficers();
      setOfficers(data || []);
    } catch (err) {
      toast.error('Failed to fetch officer roster.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (officer = null) => {
    if (officer) {
      setEditingId(officer.id);
      setFormData({
        badgeNumber: officer.badgeNumber || '',
        name: officer.name || '',
        department: officer.department || 'Cyber Crime Cell',
        rank: officer.rank || 'Inspector',
        phoneNumber: officer.phoneNumber || '',
        email: officer.email || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        badgeNumber: `OFF-${Math.floor(1000 + Math.random() * 9000)}`,
        name: '',
        department: 'Cyber Crime Cell',
        rank: 'Inspector',
        phoneNumber: '',
        email: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await officerService.updateOfficer(editingId, formData);
        toast.success('Officer Duty Record Updated!');
      } else {
        await officerService.createOfficer(formData);
        toast.success('New Officer Onboarded Successfully!');
      }
      setIsModalOpen(false);
      fetchOfficers();
    } catch (err) {
      // Handled by interceptor
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this officer from the active directory?')) return;
    try {
      await officerService.deleteOfficer(id);
      toast.success('Officer deleted successfully.');
      fetchOfficers();
    } catch (err) {
      // Handled by interceptor
    }
  };

  const filteredOfficers = officers.filter((o) =>
    o.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.badgeNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      header: 'Officer Name & Badge',
      accessorKey: 'name',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/40 flex items-center justify-center text-[#FF7A00]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white">{row.name}</h4>
            <p className="text-[10px] font-mono text-[#FF7A00]">Badge: {row.badgeNumber}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Rank & Department',
      accessorKey: 'rank',
      cell: (row) => (
        <div>
          <p className="font-semibold text-white text-xs">{row.rank}</p>
          <p className="text-[10px] text-[#9CA3AF]">{row.department}</p>
        </div>
      )
    },
    {
      header: 'Contact Info',
      accessorKey: 'email',
      cell: (row) => (
        <div className="text-xs space-y-0.5">
          <p className="text-white flex items-center gap-1">
            <Mail className="w-3 h-3 text-[#FF7A00]" /> {row.email}
          </p>
          <p className="text-[#9CA3AF] flex items-center gap-1">
            <Phone className="w-3 h-3" /> {row.phoneNumber}
          </p>
        </div>
      )
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Active Officer Roster</h1>
          <p className="text-xs text-[#9CA3AF]">Manage police personnel, duty ranks, and contact info</p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={fetchOfficers} variant="secondary" icon={RefreshCw} size="sm">
            Refresh
          </Button>
          <Button onClick={() => handleOpenModal()} icon={Plus}>
            Add Officer
          </Button>
        </div>
      </div>

      <Card hover={false} className="p-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by officer name, badge number, department..."
        />
      </Card>

      <Card hover={false}>
        <Table
          columns={columns}
          data={filteredOfficers}
          isLoading={loading}
          emptyTitle="No Officers Registered in System"
          emptyDescription="Click 'Add Officer' to register personnel to backend database."
        />
      </Card>

      {/* Officer Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Update Officer Credentials' : 'Enroll New Police Officer'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Badge Number"
              placeholder="e.g. OFF-9201"
              value={formData.badgeNumber}
              onChange={(e) => setFormData({ ...formData, badgeNumber: e.target.value })}
              required
            />
            <Input
              label="Officer Full Name"
              placeholder="Inspector Deshmukh"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Rank"
              value={formData.rank}
              onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
              options={['Superintendent', 'Inspector', 'Sub-Inspector', 'Constable', 'Analyst']}
            />
            <Input
              label="Department / Unit"
              placeholder="Cyber Crime Cell"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Official Email"
              type="email"
              placeholder="deshmukh@police.gov.in"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              label="Contact Phone"
              placeholder="9876543210"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#2A3246]">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={submitting}>
              {editingId ? 'Save Changes' : 'Enroll Officer'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
