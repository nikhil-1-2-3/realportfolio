import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Cloud,
  Database,
  ShieldCheck,
  Zap,
  Play,
  CheckCircle2,
  Activity,
  Cpu,
} from 'lucide-react';

interface SimulationNode {
  id: string;
  name: string;
  role: string;
  protocol: string;
  latency: string;
  metrics: string;
  color: string;
  borderClass: string;
  bgLight: string;
  icon: typeof Server;
  description: string;
  specs: string[];
}

const NODES: SimulationNode[] = [
  {
    id: 'edge',
    name: 'Edge & CloudFront',
    role: 'Global SSL & CDN',
    protocol: 'HTTPS / TLS 1.3',
    latency: '12ms',
    metrics: '99.99% Cache Hit',
    color: '#993A8B', // Mulberry
    borderClass: 'border-mulberry/40',
    bgLight: 'rgba(153, 58, 139, 0.08)',
    icon: Cloud,
    description: 'Edge distribution point with geo-proximity routing, DDoS shielding, and automated SSL termination.',
    specs: ['CloudFront Edge Cache', 'Route53 GeoDNS', 'TLS 1.3 Strict ALPN'],
  },
  {
    id: 'ingress',
    name: 'AWS ALB & Ingress',
    role: 'Reverse Proxy & Gate',
    protocol: 'HTTP/2 • gRPC',
    latency: '18ms',
    metrics: '0.00% Error Rate',
    color: '#A2574F', // Cognac
    borderClass: 'border-cognac/40',
    bgLight: 'rgba(162, 87, 79, 0.08)',
    icon: Server,
    description: 'Application Load Balancer distributing encrypted traffic across multi-AZ subnets with path-based routing.',
    specs: ['AWS ALB Controller', 'Rate Limit: 1000r/s', 'Health Check /healthz'],
  },
  {
    id: 'k8s',
    name: 'Kubernetes Pods',
    role: 'Microservices Mesh',
    protocol: 'REST • WebSockets',
    latency: '24ms',
    metrics: '4 Replicas (HPA)',
    color: '#BF7587', // Dusty Rose
    borderClass: 'border-rose/40',
    bgLight: 'rgba(191, 117, 135, 0.10)',
    icon: Cpu,
    description: 'Containerized Node.js workloads running on AWS EKS with horizontal autoscaling and rolling deployments.',
    specs: ['EKS NodePool v1.30', 'HPA: 2-8 Replicas', 'Resource Limits: 256MB'],
  },
  {
    id: 'database',
    name: 'Docker MySQL 8',
    role: 'Relational Persistence',
    protocol: 'TCP :3307',
    latency: '4ms',
    metrics: 'Pool: 10 Active',
    color: '#E68057', // Ochre
    borderClass: 'border-ochre/40',
    bgLight: 'rgba(230, 128, 87, 0.10)',
    icon: Database,
    description: 'Relational MySQL container running on port 3307 with persistent volume mapping and automated schema migrations.',
    specs: ['MySQL 8 InnoDB', 'Connection Pool: 10', 'Indexed Inquiries Schema'],
  },
];

export const HeroArchitectureSimulator: React.FC = () => {
  const [activeNode, setActiveNode] = useState<SimulationNode>(NODES[1]);
  const [isSurging, setIsSurging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [trafficRate, setTrafficRate] = useState(120);
  const [podCount, setPodCount] = useState(4);
  const [dbStatus, setDbStatus] = useState<'connected' | 'querying'>('connected');

  // Traffic Surge simulation
  const triggerTrafficSurge = () => {
    if (isSurging) return;
    setIsSurging(true);
    setTrafficRate(780);
    setPodCount(8);

    setTimeout(() => {
      setTrafficRate(140);
      setPodCount(4);
      setIsSurging(false);
    }, 3500);
  };

  // Trivy Security Scan simulation
  const triggerSecurityScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanResult('Auditing Docker container layers with Aqua Trivy...');

    setTimeout(() => {
      setScanResult('0 CRITICAL • 0 HIGH • SCAN PASSED');
      setTimeout(() => {
        setIsScanning(false);
      }, 3000);
    }, 1500);
  };

  // Ping Docker DB simulation
  const pingDatabase = () => {
    setDbStatus('querying');
    setTimeout(() => {
      setDbStatus('connected');
    }, 800);
  };

  return (
    <div className="w-full rounded-3xl bg-white border border-rose/30 shadow-aesthetic-lg overflow-hidden backdrop-blur-xl">
      {/* Top Console Bar */}
      <div className="px-5 py-3.5 bg-[#FAF4EC] border-b border-rose/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-cognac shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-ochre shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-rose shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-mulberry shadow-sm" />
          </div>
          <span className="font-bold text-[#231215] flex items-center gap-1.5 ml-1">
            <Activity className="w-3.5 h-3.5 text-cognac" />
            <span>INTERACTIVE PRODUCTION CLUSTER RUNTIME</span>
          </span>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-rose/25 text-[#5C4448] shadow-aesthetic-sm">
            <span>Throughput:</span>
            <strong className="text-cognac">{trafficRate} req/s</strong>
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-rose/25 text-[#5C4448] shadow-aesthetic-sm">
            <span>Active Pods:</span>
            <strong className="text-ochre">{podCount} Replicas</strong>
          </span>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-rose/25 text-ochre font-bold shadow-aesthetic-sm">
            <span className="w-2 h-2 rounded-full bg-ochre animate-pulse" />
            <span>99.98% SLA</span>
          </span>
        </div>
      </div>

      {/* Main Simulation Stage */}
      <div className="p-6 lg:p-8">
        {/* Interactive Node Path Visualizer */}
        <div className="relative mb-8">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#8A6E73] font-bold mb-3 flex items-center justify-between">
            <span>Live Architectural Pipeline: Click Any Node to Inspect Diagnostics</span>
            <span className="text-cognac font-bold hidden md:inline">Hover &amp; Click Interactive</span>
          </div>

          {/* 4 Node Grid with Flow Connections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {NODES.map((node, idx) => {
              const Icon = node.icon;
              const isSelected = activeNode.id === node.id;

              return (
                <motion.div
                  key={node.id}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveNode(node)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between h-36 ${
                    isSelected
                      ? 'bg-white shadow-aesthetic-md'
                      : 'bg-[#FAF4EC]/80 hover:bg-white border-rose/20'
                  }`}
                  style={{
                    borderColor: isSelected ? node.color : undefined,
                    borderWidth: isSelected ? '2px' : '1px',
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="p-2.5 rounded-xl border shadow-aesthetic-sm"
                      style={{
                        backgroundColor: node.bgLight,
                        borderColor: `${node.color}35`,
                        color: node.color,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="text-right">
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shadow-sm"
                        style={{
                          backgroundColor: node.bgLight,
                          color: node.color,
                          borderColor: `${node.color}30`,
                        }}
                      >
                        {node.id === 'k8s' ? `${podCount} Pods` : node.latency}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-[#8A6E73] uppercase tracking-wider font-semibold">
                      Step 0{idx + 1} • {node.protocol}
                    </div>
                    <div className="text-sm font-display font-bold text-[#231215] truncate mt-0.5">
                      {node.name}
                    </div>
                    <div className="text-xs font-mono font-bold mt-0.5" style={{ color: node.color }}>
                      {node.role}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Visual Connecting Stream (Desktop) */}
          <div className="hidden lg:flex items-center justify-between px-16 -mt-18 pointer-events-none opacity-30 relative -z-0">
            <div className="w-full h-0.5 bg-gradient-to-r from-mulberry via-cognac via-rose to-ochre" />
          </div>
        </div>

        {/* Diagnostic Inspector & Real-Time Action Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-rose/15 items-stretch">
          {/* Left: Active Node Diagnostics (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF4EC] rounded-2xl p-5 border border-rose/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-rose/15">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: activeNode.color }}
                  />
                  <span className="font-mono text-xs font-bold text-[#231215]">
                    {activeNode.name} Specification
                  </span>
                </div>
                <span className="font-mono text-xs font-bold" style={{ color: activeNode.color }}>
                  {activeNode.protocol}
                </span>
              </div>

              <p className="text-xs text-[#5C4448] font-sans mt-3 leading-relaxed">
                {activeNode.description}
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeNode.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white border border-rose/20 text-xs font-mono text-[#231215] flex items-center gap-2 shadow-aesthetic-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: activeNode.color }} />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-rose/15 flex items-center justify-between text-[11px] font-mono text-[#8A6E73]">
              <span>Telemetry: ap-south-1 (Mumbai)</span>
              <span className="font-bold text-[#231215]">Status: {activeNode.metrics}</span>
            </div>
          </div>

          {/* Right: Live Interactive Simulation Triggers (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-rose/25 shadow-aesthetic-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#231215] block mb-3">
                Live Engineering Simulations:
              </span>

              <div className="space-y-2.5">
                {/* Simulation 1: Traffic Surge */}
                <button
                  onClick={triggerTrafficSurge}
                  disabled={isSurging}
                  className={`w-full p-3 rounded-xl border text-left font-mono text-xs transition-all flex items-center justify-between group ${
                    isSurging
                      ? 'bg-cognac text-white border-cognac shadow-aesthetic-md'
                      : 'bg-[#FAF4EC] hover:bg-white text-[#231215] border-rose/25 hover:border-cognac/40 shadow-aesthetic-sm'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Zap className={`w-4 h-4 ${isSurging ? 'animate-bounce text-ochre' : 'text-cognac'}`} />
                    <div>
                      <div className="font-bold">
                        {isSurging ? 'Simulating 780 req/s Surge...' : 'Simulate Traffic Surge'}
                      </div>
                      <div className={`text-[10px] ${isSurging ? 'text-white/80' : 'text-[#8A6E73]'}`}>
                        Triggers Kubernetes HPA to scale pods
                      </div>
                    </div>
                  </div>
                  <Play className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Simulation 2: Security Scan */}
                <button
                  onClick={triggerSecurityScan}
                  disabled={isScanning}
                  className={`w-full p-3 rounded-xl border text-left font-mono text-xs transition-all flex items-center justify-between group ${
                    isScanning
                      ? 'bg-mulberry text-white border-mulberry shadow-aesthetic-md'
                      : 'bg-[#FAF4EC] hover:bg-white text-[#231215] border-rose/25 hover:border-mulberry/40 shadow-aesthetic-sm'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className={`w-4 h-4 ${isScanning ? 'animate-spin text-rose' : 'text-mulberry'}`} />
                    <div>
                      <div className="font-bold">
                        {isScanning ? 'Scanning Container Layers...' : 'Run Trivy Vulnerability Audit'}
                      </div>
                      <div className={`text-[10px] ${isScanning ? 'text-white/80' : 'text-[#8A6E73]'}`}>
                        CVE security inspection against CVE base
                      </div>
                    </div>
                  </div>
                  <Play className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Simulation 3: Ping Docker DB */}
                <button
                  onClick={pingDatabase}
                  className="w-full p-3 rounded-xl border text-left font-mono text-xs transition-all flex items-center justify-between bg-[#FAF4EC] hover:bg-white text-[#231215] border-rose/25 hover:border-ochre/40 shadow-aesthetic-sm group"
                >
                  <div className="flex items-center gap-2.5">
                    <Database className="w-4 h-4 text-ochre" />
                    <div>
                      <div className="font-bold">
                        {dbStatus === 'querying' ? 'Querying Port 3307 Pool...' : 'Test Docker MySQL Connection'}
                      </div>
                      <div className="text-[10px] text-[#8A6E73]">
                        Tests connection pool to local Docker container
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-ochre px-2 py-0.5 rounded bg-white border border-rose/20">
                    {dbStatus === 'querying' ? 'Testing...' : 'OK (4ms)'}
                  </span>
                </button>
              </div>
            </div>

            {/* Scan Output Toast */}
            {scanResult && (
              <div className="mt-3 p-2.5 rounded-xl bg-[#FAF4EC] border border-rose/30 text-[11px] font-mono text-[#231215] flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-mulberry shrink-0" />
                <span className="font-bold truncate">{scanResult}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};