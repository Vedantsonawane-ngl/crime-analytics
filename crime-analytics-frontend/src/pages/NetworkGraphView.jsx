import React, { useState, useEffect } from 'react';
import { Network, ShieldAlert, User, MapPin, Zap, RefreshCw, Info, Link2 } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

export const NetworkGraphView = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [filterType, setFilterType] = useState('ALL');

  const fetchGraphData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/analytics/advanced/network-graph');
      setGraphData(response.data);
      if (response.data?.nodes?.length > 0) {
        setSelectedNode(response.data.nodes[0]);
      }
    } catch (err) {
      toast.error('Failed to load network relationship graph.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraphData();
  }, []);

  const filteredNodes = graphData.nodes.filter(
    (node) => filterType === 'ALL' || node.type === filterType
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#F8FAFC] tracking-tight">
              Criminological Network & Link Analysis
            </h1>
            <span className="bg-[#FF7A00]/20 text-[#FF7A00] border border-[#FF7A00]/40 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase">
              SCRB Intelligence Hub
            </span>
          </div>
          <p className="text-sm text-[#9CA3AF] mt-1">
            Visualizing hidden relationships between repeat offenders, co-conspirators, Modus Operandi (MO), and recurring crime locations across Karnataka jurisdictions.
          </p>
        </div>

        <Button icon={RefreshCw} onClick={fetchGraphData} isLoading={loading} variant="secondary">
          Refresh Graph Data
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-3 bg-[#151A28] p-3 rounded-2xl border border-[#2A3246]">
        <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider pl-2">Filter Entities:</span>
        {['ALL', 'CRIMINAL', 'MODUS_OPERANDI', 'LOCATION'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === type
                ? 'bg-[#FF7A00] text-white shadow-lg glow-orange-sm'
                : 'bg-[#1E2638] text-[#9CA3AF] hover:text-white border border-[#2A3246]'
            }`}
          >
            {type === 'ALL' ? 'All Nodes' : type.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Main Grid: Visual Graph Canvas & Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Visual Graph Canvas */}
        <Card className="lg:col-span-2 p-6 flex flex-col justify-between min-h-[500px] relative overflow-hidden bg-[#111625]">
          <div className="flex items-center justify-between border-b border-[#2A3246] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Network className="w-5 h-5 text-[#FF7A00]" />
              <h2 className="text-base font-bold text-[#F8FAFC]">Entity Relationship Canvas</h2>
            </div>
            <span className="text-xs text-[#9CA3AF]">
              Active Nodes: <strong className="text-white">{filteredNodes.length}</strong> | Links: <strong className="text-white">{graphData.links.length}</strong>
            </span>
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#FF7A00]"></div>
            </div>
          ) : (
            <div className="relative flex-1 bg-[#0D121F] rounded-2xl border border-[#2A3246]/60 p-6 flex flex-col justify-center items-center overflow-auto min-h-[400px]">
              {/* Graphical Network Matrix Simulation */}
              <div className="w-full h-full flex flex-wrap items-center justify-center gap-8 py-8">
                {filteredNodes.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  const isCriminal = node.type === 'CRIMINAL';
                  const isMO = node.type === 'MODUS_OPERANDI';

                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`relative group p-4 rounded-2xl border transition-all duration-300 transform hover:scale-105 flex flex-col items-center gap-2 ${
                        isSelected
                          ? 'bg-[#FF7A00]/20 border-[#FF7A00] shadow-2xl ring-2 ring-[#FF7A00]/50 glow-orange-sm'
                          : isCriminal
                          ? 'bg-[#151A28] border-red-500/40 hover:border-red-500'
                          : isMO
                          ? 'bg-[#151A28] border-amber-500/40 hover:border-amber-500'
                          : 'bg-[#151A28] border-blue-500/40 hover:border-blue-500'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-inner ${
                          isCriminal
                            ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                            : isMO
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                        }`}
                      >
                        {isCriminal ? <User className="w-6 h-6" /> : isMO ? <Zap className="w-6 h-6" /> : <MapPin className="w-6 h-6" />}
                      </div>

                      <span className="text-xs font-bold text-[#F8FAFC] max-w-[120px] truncate text-center">
                        {node.label}
                      </span>
                      <span className="text-[10px] text-[#9CA3AF] bg-[#1E2638] px-2 py-0.5 rounded-full border border-[#2A3246]">
                        {node.type}
                      </span>

                      {/* Connection Indicator Pulse */}
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF7A00] rounded-full animate-ping" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="absolute bottom-3 left-3 bg-[#151A28]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#2A3246] text-[11px] text-[#9CA3AF] flex items-center gap-4">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Offender/Suspect</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Modus Operandi</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Hotspot Jurisdiction</span>
              </div>
            </div>
          )}
        </Card>

        {/* Selected Entity Inspector Panel */}
        <Card className="p-6 bg-[#151A28] border border-[#2A3246] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-[#2A3246] pb-3 mb-4">
              <Info className="w-5 h-5 text-[#FF7A00]" />
              <h2 className="text-base font-bold text-[#F8FAFC]">Entity Relationship Inspector</h2>
            </div>

            {selectedNode ? (
              <div className="space-y-4">
                <div className="p-4 bg-[#1E2638] rounded-2xl border border-[#2A3246]">
                  <div className="text-xs text-[#9CA3AF] uppercase tracking-wider font-bold">Selected Node</div>
                  <div className="text-lg font-black text-[#F8FAFC] mt-1">{selectedNode.label}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-[#FF7A00]/20 text-[#FF7A00] px-2.5 py-0.5 rounded-full font-bold">
                      {selectedNode.type}
                    </span>
                    <span className="text-xs bg-red-500/20 text-red-400 px-2.5 py-0.5 rounded-full font-bold">
                      Risk Score: {selectedNode.riskScore}/100
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Intelligence Profile & MO</span>
                  <p className="text-xs text-[#D1D5DB] bg-[#0D121F] p-3 rounded-xl border border-[#2A3246]/60 leading-relaxed">
                    {selectedNode.details || 'No additional intelligence records attached.'}
                  </p>
                </div>

                {/* Direct Connections */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5 text-[#FF7A00]" /> Direct Links ({graphData.links.filter(l => l.source === selectedNode.id || l.target === selectedNode.id).length})
                  </span>
                  <div className="space-y-2 max-h-[220px] overflow-auto pr-1">
                    {graphData.links
                      .filter((l) => l.source === selectedNode.id || l.target === selectedNode.id)
                      .map((link, idx) => (
                        <div key={idx} className="bg-[#1E2638] p-3 rounded-xl border border-[#2A3246] text-xs flex justify-between items-center">
                          <div>
                            <span className="font-bold text-white">
                              {link.source === selectedNode.id ? link.target.replace('CRIMINAL_', 'Offender #').replace('MO_', 'MO: ') : link.source.replace('CRIMINAL_', 'Offender #')}
                            </span>
                            <div className="text-[10px] text-[#9CA3AF] mt-0.5">{link.relationship}</div>
                          </div>
                          <span className="bg-[#FF7A00]/20 text-[#FF7A00] text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {link.weight} Incidents
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-[#9CA3AF] text-sm">
                Click on any node in the canvas to inspect criminal connections and modus operandi links.
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#2A3246]">
            <p className="text-[11px] text-[#6B7280] text-center">
              SCRB Automated Co-Offender & Multi-Jurisdictional MO Matcher
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
