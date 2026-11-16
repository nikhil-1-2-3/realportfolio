import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server,
  Cloud,
  Database,
  Cpu,
  Zap,
  CheckCircle2,
  Activity,
  ShieldCheck,
} from 'lucide-react';

interface ClusterNode {
  id: string;
  step: string;
  name: string;
  role: string;
  status: string;
  latency: string;
  color: string;
  icon: typeof Server;
  specs: string[];
}

const CLUSTER_NODES: ClusterNode[] = [
  {
    id: 'edge',
    step: '01',
    name: 'Edge & CloudFront',
    role: 'Global CDN & TLS 1.3',
    status: 'Operational',
    latency: '12ms',
    color: '#993A8B', // Mulberry
    icon: Cloud,
    specs: ['CloudFront Edge Cache', 'Route53 GeoDNS', 'Strict SSL Termination'],
  },
  {
    id: 'ingress',
    step: '02',
    name: 'AWS ALB & Ingress',
    role: 'HTTP/2 Reverse Proxy',
    status: 'Healthy',
    latency: '18ms',
    color: '#A2574F', // Cognac
    icon: Server,
    specs: ['AWS ALB Controller', 'Rate Limit: 1000r/s', 'Path-based routing'],
  },
  {
    id: 'k8s',
    step: '03',
    name: 'Kubernetes Pods',
    role: 'Microservices Mesh',
    status: '4 Replicas (HPA)',
    latency: '24ms',
    color: '#E68057', // Ochre
    icon: Cpu,
    specs: ['EKS NodePool v1.30', 'HPA: 2-8 Replicas', 'Resource Limit: 256MB'],
  },
  {
    id: 'db',
    step: '04',
    name: 'Docker MySQL 8',
    role: 'Relational DB (:3307)',
    status: 'Connected',
    latency: '4ms',
    color: '#BF7587', // Rose
    icon: Database,
    specs: ['MySQL 8 InnoDB', 'Connection Pool: 10', 'Persistent Volume Mount'],
  },
];

export const HeroClusterConsole: React.FC = () => {
  const [activeNode, setActiveNode] = useState<ClusterNode>(CLUSTER_NODES[2]); // Default to Kubernetes Pods
  const [isSurging, setIsSurging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);
  const [throughput, setThroughput] = useState(128);
  const [dbPingSuccess, setDbPingSuccess] = useState(false);

  const handleSurge = () => {
    if (isSurging) return;
    setIsSurging(true);
    setThroughput(840);
    setTimeout(() => {
      setThroughput(142);
      setIsSurging(false);
    }, 3200);
  };

  const handleScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanMessage('Auditing container layers with Aqua Trivy...');
    setTimeout(() => {
      setScanMessage('0 CVE Detected • Vulnerability Gate Passed');
      setTimeout(() => {
        setIsScanning(false);
        setScanMessage(null);
      }, 3500);
    }, 1200);
  };

  const handleDbPing = () => {
    setDbPingSuccess(true);
    setTimeout(() => setDbPingSuccess(false), 2000);
  };

  return (
    <div className="w-full rounded-3xl bg-[#28131D]/95 backdrop-blur-2xl border border-[#BF7587]/30 p-5 sm:p-6 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.4)] text-[#FAF6F0] flex flex-col justify-between select-none">
      {/* Top Header Row with the 4 Palette Beads */}
      <div className="flex items-center justify-between pb-4 border-b border-[#BF7587]/20">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#A2574F] shadow-sm" title="#A2574F (Cognac)" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E68057] shadow-sm" title="#E68057 (Ochre)" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#BF7587] shadow-sm" title="#BF7587 (Rose)" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#993A8B] shadow-sm" title="#993A8B (Mulberry)" />
          <span className="font-mono text-xs text-[#FAF6F0]/80 font-bold ml-2 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#E68057]" />
            <span>CLUSTER RUNTIME</span>
          </span>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E68057] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E68057]" />
          </span>
          <span className="text-[#E68057] font-bold">AWS ap-south-1</span>
        </div>
      </div>

      {/* Live Telemetry Metrics Row */}
      <div className="grid grid-cols-3 gap-2 py-4 border-b border-[#BF7587]/15 font-mono text-center">
        <div className="p-2.5 rounded-xl bg-[#351C28]/80 border border-[#BF7587]/20">
          <div className="text-[10px] text-[#FAF6F0]/50 uppercase tracking-wider">Throughput</div>
          <div className="text-sm font-bold text-[#E68057] mt-0.5">{throughput} req/s</div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#351C28]/80 border border-[#BF7587]/20">
          <div className="text-[10px] text-[#FAF6F0]/50 uppercase tracking-wider">Active Pods</div>
          <div className="text-sm font-bold text-[#FAF6F0] mt-0.5">{isSurging ? '8 (Scaling)' : '4 Replicas'}</div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#351C28]/80 border border-[#BF7587]/20">
          <div className="text-[10px] text-[#FAF6F0]/50 uppercase tracking-wider">SLA / Health</div>
          <div className="text-sm font-bold text-[#BF7587] mt-0.5">99.98%</div>
        </div>
      </div>

      {/* Interactive 4-Node Pipeline */}
      <div className="py-4">
        <div className="text-[11px] font-mono text-[#FAF6F0]/60 uppercase tracking-widest font-semibold mb-3 flex items-center justify-between">
          <span>Architectural Pipeline</span>
          <span className="text-[#E68057] text-[10px]">Click Node to Inspect</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {CLUSTER_NODES.map((node) => {
            const Icon = node.icon;
            const isSelected = activeNode.id === node.id;
            return (
              <motion.div
                key={node.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveNode(node)}
                className={`p-3 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#3A1E2B] shadow-[0_4px_16px_rgba(230,128,87,0.25)] border-[#E68057]'
                    : 'bg-[#311824]/60 hover:bg-[#381D2A] border-[#BF7587]/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="p-1.5 rounded-lg border"
                    style={{
                      backgroundColor: `${node.color}25`,
                      borderColor: `${node.color}40`,
                      color: node.color,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono text-[10px] text-[#FAF6F0]/40 font-bold">{node.step}</span>
                </div>

                <div>
                  <div className="font-display font-bold text-xs text-[#FAF6F0] tracking-tight line-clamp-1">
                    {node.name}
                  </div>
                  <div className="font-mono text-[10px] text-[#BF7587] mt-0.5 line-clamp-1">
                    {node.latency} • {node.status}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Specs Panel */}
      <div className="p-3.5 rounded-2xl bg-[#321925] border border-[#BF7587]/25 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs font-bold text-[#E68057] flex items-center gap-1.5">
            <span>// {activeNode.name}</span>
          </span>
          <span className="font-mono text-[10px] text-[#FAF6F0]/50">{activeNode.role}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {activeNode.specs.map((spec, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md bg-[#24111B] text-[#FAF6F0]/90 border border-[#BF7587]/20 font-mono text-[10px]"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Simulation Action Triggers */}
      <div className="pt-2 border-t border-[#BF7587]/20 space-y-2">
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#FAF6F0]/40 font-semibold">
          Live Runtime Simulations
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Simulation 1: Surge */}
          <button
            onClick={handleSurge}
            disabled={isSurging}
            className="p-2 rounded-xl bg-[#381D2B] hover:bg-[#462335] border border-[#BF7587]/30 text-left font-mono text-[11px] transition-all disabled:opacity-50 flex items-center gap-2 group"
          >
            <Zap className="w-3.5 h-3.5 text-[#E68057] shrink-0 group-hover:scale-110 transition-transform" />
            <span className="truncate">{isSurging ? 'Scaling Pods...' : 'Simulate Surge'}</span>
          </button>

          {/* Simulation 2: Security Scan */}
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="p-2 rounded-xl bg-[#381D2B] hover:bg-[#462335] border border-[#BF7587]/30 text-left font-mono text-[11px] transition-all disabled:opacity-50 flex items-center gap-2 group"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#BF7587] shrink-0 group-hover:scale-110 transition-transform" />
            <span className="truncate">{isScanning ? 'Auditing...' : 'Trivy Audit'}</span>
          </button>

          {/* Simulation 3: DB Ping */}
          <button
            onClick={handleDbPing}
            className="p-2 rounded-xl bg-[#381D2B] hover:bg-[#462335] border border-[#BF7587]/30 text-left font-mono text-[11px] transition-all flex items-center gap-2 group"
          >
            <Database className="w-3.5 h-3.5 text-[#A2574F] shrink-0 group-hover:scale-110 transition-transform" />
            <span className="truncate">{dbPingSuccess ? 'Ping: OK (4ms)' : 'Ping DB :3307'}</span>
          </button>
        </div>

        {/* Live Feedback Banner */}
        <AnimatePresence>
          {scanMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-2 rounded-lg bg-[#301623] border border-[#E68057]/40 text-[#E68057] font-mono text-[11px] flex items-center gap-2"
            >
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>{scanMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
