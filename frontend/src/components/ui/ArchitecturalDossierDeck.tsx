import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ShieldCheck,
  Server,
  Database,
  Globe,
  Cpu,
  ArrowUpRight,
} from 'lucide-react';

interface ArchitectureTier {
  id: string;
  name: string;
  category: string;
  stack: string;
  spec: string;
  status: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface ShowcaseSystem {
  id: string;
  title: string;
  type: string;
  badge: string;
  summary: string;
  architectureHighlight: string;
  techTags: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl: string;
  tiers: ArchitectureTier[];
}

const SHOWCASE_SYSTEMS: ShowcaseSystem[] = [
  {
    id: 'turfxl',
    title: 'TurfXL',
    type: 'Distributed Arena Reservation Platform',
    badge: 'MERN + Socket.io + Docker',
    summary:
      'High-concurrency sports venue booking engine with real-time slot conflict locking, JWT authentication, and automated Dockerized CI/CD.',
    architectureHighlight:
      'Prevents double-booking race conditions during peak hours through fine-grained WebSocket mutex locks before payment settlement.',
    techTags: ['React 19', 'Node.js', 'Socket.io', 'MongoDB', 'Docker', 'Jenkins'],
    metrics: [
      { label: 'Concurrency Lock', value: 'Zero Overlaps' },
      { label: 'State Sync', value: 'Bidirectional' },
      { label: 'Auth Pipeline', value: 'JWT & RBAC' },
    ],
    liveUrl: 'https://turfbooksystem.vercel.app/',
    githubUrl: 'https://github.com/nikhil-1-2-3/turfbooksystem',
    tiers: [
      {
        id: 'tier-edge',
        name: 'Client Edge',
        category: 'Tier 01',
        stack: 'React SPA • Cloudflare CDN',
        spec: 'Optimized static delivery with zero-layout-shift UI',
        status: 'Active',
        icon: Globe,
        color: '#E68057', // Ochre
      },
      {
        id: 'tier-ingress',
        name: 'API Ingress',
        category: 'Tier 02',
        stack: 'Express.js • NGINX Reverse Proxy',
        spec: 'Role-based access control (RBAC) & rate-limiting gates',
        status: 'Operational',
        icon: Server,
        color: '#BF7587', // Dusty Rose
      },
      {
        id: 'tier-mesh',
        name: 'Socket Mutex',
        category: 'Tier 03',
        stack: 'Socket.io WebSocket Engine',
        spec: 'In-memory slot lease lock preventing simultaneous checkout collisions',
        status: 'Synchronized',
        icon: Cpu,
        color: '#A2574F', // Cognac
      },
      {
        id: 'tier-persist',
        name: 'Storage',
        category: 'Tier 04',
        stack: 'MongoDB Cluster & Docker Volume',
        spec: 'Atomic document transactions with indexed time-slot schemas',
        status: 'Persistent',
        icon: Database,
        color: '#993A8B', // Mulberry
      },
    ],
  },
  {
    id: 'vs-transport',
    title: 'V S Transport',
    type: 'Enterprise Fleet Logistics Architecture',
    badge: 'Kubernetes + Microservices',
    summary:
      'Multi-tenant transport operations management system orchestrating fleet tracking, route scheduling, and containerized microservices.',
    architectureHighlight:
      'Multi-AZ Kubernetes deployment with decoupled API gateways, automated rolling restarts, and persistent storage volumes.',
    techTags: ['React.js', 'Node.js', 'Docker', 'Kubernetes', 'MySQL 8', 'CI/CD'],
    metrics: [
      { label: 'Orchestration', value: 'K8s Cluster' },
      { label: 'Database', value: 'MySQL 8 (3307)' },
      { label: 'Security', value: 'Non-Root Pods' },
    ],
    liveUrl: 'https://github.com/nikhil-1-2-3/VS-TRANSPORT',
    githubUrl: 'https://github.com/nikhil-1-2-3/VS-TRANSPORT',
    tiers: [
      {
        id: 'tier-edge',
        name: 'Dispatch UI',
        category: 'Tier 01',
        stack: 'Responsive Logistics Portal',
        spec: 'High-speed fleet dispatch dashboard for real-time manifests',
        status: 'Active',
        icon: Globe,
        color: '#E68057',
      },
      {
        id: 'tier-ingress',
        name: 'ALB Ingress',
        category: 'Tier 02',
        stack: 'AWS Application Load Balancer',
        spec: 'Path-based routing to internal logistics microservices',
        status: 'Healthy',
        icon: Server,
        color: '#BF7587',
      },
      {
        id: 'tier-mesh',
        name: 'Pod Cluster',
        category: 'Tier 03',
        stack: 'Containerized Node.js Microservices',
        spec: 'Stateless worker pods with Horizontal Pod Autoscaler (HPA)',
        status: 'Replicated',
        icon: Cpu,
        color: '#A2574F',
      },
      {
        id: 'tier-persist',
        name: 'MySQL 8',
        category: 'Tier 04',
        stack: 'Dockerized MySQL 8 Engine (:3307)',
        spec: 'Stateful volume mount with automated daily backup snapshots',
        status: 'ACID Compliant',
        icon: Database,
        color: '#993A8B',
      },
    ],
  },
  {
    id: 'cloud-infra',
    title: 'Cloud Core',
    type: 'Declarative Cloud & DevSecOps Matrix',
    badge: 'Terraform + Trivy + Actions',
    summary:
      'Infrastructure as Code blueprint with automated security scans, container image provenance, and zero-downtime blue/green deployment.',
    architectureHighlight:
      'Aqua Trivy vulnerability scan gates embedded into GitHub Actions, enforcing zero critical/high CVEs before container registry push.',
    techTags: ['Terraform IaC', 'AWS EKS', 'GitHub Actions', 'Aqua Trivy', 'Docker Compose'],
    metrics: [
      { label: 'CVE Policy', value: 'Zero Tolerance' },
      { label: 'IaC State', value: 'Remote S3 Lock' },
      { label: 'Pipeline', value: 'Automated CI/CD' },
    ],
    githubUrl: 'https://github.com/nikhil-1-2-3',
    tiers: [
      {
        id: 'tier-edge',
        name: 'Actions CI',
        category: 'Tier 01',
        stack: 'GitHub Actions & Webhooks',
        spec: 'Automated test suite execution on every branch pull request',
        status: 'Automated',
        icon: Globe,
        color: '#E68057',
      },
      {
        id: 'tier-ingress',
        name: 'Trivy Audit',
        category: 'Tier 02',
        stack: 'Aqua Trivy Scanner',
        spec: 'Deep container image and SBOM dependency vulnerability analysis',
        status: '0 CVEs',
        icon: ShieldCheck,
        color: '#BF7587',
      },
      {
        id: 'tier-mesh',
        name: 'Terraform',
        category: 'Tier 03',
        stack: 'Terraform v1.8 Provider',
        spec: 'Idempotent provisioning of VPCs, subnets, and Kubernetes clusters',
        status: 'Declarative',
        icon: Server,
        color: '#A2574F',
      },
      {
        id: 'tier-persist',
        name: 'K8s Nodes',
        category: 'Tier 04',
        stack: 'Docker Engine & K8s Workers',
        spec: 'Isolated runtime environments running hardened rootless containers',
        status: 'Hardened',
        icon: Database,
        color: '#993A8B',
      },
    ],
  },
];

export const ArchitecturalDossierDeck: React.FC = () => {
  const [activeSystemId, setActiveSystemId] = useState<string>('turfxl');
  const [selectedTierId, setSelectedTierId] = useState<string>('tier-mesh');

  const currentSystem =
    SHOWCASE_SYSTEMS.find((s) => s.id === activeSystemId) || SHOWCASE_SYSTEMS[0];

  const currentTier =
    currentSystem.tiers.find((t) => t.id === selectedTierId) ||
    currentSystem.tiers[2] ||
    currentSystem.tiers[0];

  return (
    <div className="relative w-full rounded-3xl p-6 sm:p-7 bg-[#23121A]/85 backdrop-blur-xl border border-rose/30 shadow-[0_24px_60px_rgba(0,0,0,0.45)] text-white overflow-hidden transition-all duration-300">
      {/* Ambient background glow accents in theme colors */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#BF7587]/20 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#E68057]/15 rounded-full blur-[80px] pointer-events-none" />

      {/* Header Eyebrow & Status */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E68057] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E68057]" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold text-[#E68057]">
            System Architecture Blueprint
          </span>
        </div>

        <span className="font-mono text-[10px] text-white/50 tracking-wider hidden sm:inline-block">
          ARCH-V2 // PROD-READY
        </span>
      </div>

      {/* System Selector Tabs */}
      <div className="grid grid-cols-3 gap-2 my-4 p-1 rounded-2xl bg-black/30 border border-white/10">
        {SHOWCASE_SYSTEMS.map((system) => {
          const isActive = system.id === activeSystemId;
          return (
            <button
              key={system.id}
              onClick={() => {
                setActiveSystemId(system.id);
                // Keep selected tier in bounds
                if (!system.tiers.some((t) => t.id === selectedTierId)) {
                  setSelectedTierId(system.tiers[0].id);
                }
              }}
              className={`relative py-2 px-2 sm:px-3 rounded-xl font-mono text-xs font-bold transition-all duration-200 text-center truncate ${
                isActive
                  ? 'text-white shadow-md'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSystemTabGlow"
                  className="absolute inset-0 bg-gradient-to-r from-cognac to-rose rounded-xl -z-10"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                />
              )}
              {system.title}
            </button>
          );
        })}
      </div>

      {/* System Headline & Summary */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSystem.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="space-y-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
                <span>{currentSystem.title}</span>
                <span className="text-xs font-mono font-normal text-rose px-2 py-0.5 rounded-md bg-rose/15 border border-rose/30">
                  {currentSystem.badge}
                </span>
              </h3>
              <p className="text-xs text-white/70 mt-1 line-clamp-2 leading-relaxed">
                {currentSystem.summary}
              </p>
            </div>
          </div>

          {/* Key 3 Metrics */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {currentSystem.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-center"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                  {m.label}
                </div>
                <div className="text-xs sm:text-sm font-display font-bold text-[#FAF6F0] mt-0.5 truncate">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Multi-Tier Blueprint Visualizer */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-white/60 mb-2">
              <span className="uppercase tracking-widest font-semibold text-ochre">
                Interactive Pipeline Topology
              </span>
              <span className="text-white/40">Select node to inspect</span>
            </div>

            {/* Visualizer Nodes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative">
              {currentSystem.tiers.map((tier, index) => {
                const isSelected = tier.id === selectedTierId;
                const Icon = tier.icon;

                return (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`relative p-3 rounded-2xl border text-left transition-all duration-200 group flex flex-col justify-between min-h-[92px] ${
                      isSelected
                        ? 'bg-white/15 border-ochre shadow-[0_0_20px_rgba(230,128,87,0.3)] ring-1 ring-ochre/50'
                        : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-white/25'
                    }`}
                  >
                    {/* Node Header */}
                    <div className="flex items-center justify-between w-full">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: `${tier.color}25`,
                          color: tier.color,
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[9px] font-bold uppercase text-white/40">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Node Title & Status */}
                    <div className="mt-2">
                      <div className="text-[11px] font-mono font-bold text-white leading-tight">
                        {tier.name}
                      </div>
                      <div className="text-[10px] font-mono text-white/60 truncate mt-0.5">
                        {tier.status}
                      </div>
                    </div>

                    {/* Active Indicator Pip */}
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-ochre shadow-[0_0_8px_#E68057]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deep Inspection Panel for Selected Node */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 mt-3 relative overflow-hidden">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: currentTier.color }}
                  />
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-white/60">
                    {currentTier.category} // {currentTier.stack}
                  </span>
                </div>
                <p className="text-xs text-white/90 leading-relaxed font-sans">
                  {currentTier.spec}
                </p>
              </div>

              <div className="shrink-0 font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-white/80 border border-white/15">
                {currentTier.status}
              </div>
            </div>
          </div>

          {/* System Footer: Tech Stack Pills & Direct Links */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
            {/* Tech Tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              {currentSystem.techTags.slice(0, 4).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 font-mono text-[10px] text-white/75"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Direct Links */}
            <div className="flex items-center gap-2 shrink-0">
              {currentSystem.liveUrl && (
                <a
                  href={currentSystem.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cognac text-white font-mono text-xs font-bold hover:bg-cognac/85 transition-colors shadow-sm"
                >
                  <span>Live System</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              <a
                href={currentSystem.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 text-white font-mono text-xs font-semibold hover:bg-white/20 transition-colors border border-white/10"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
