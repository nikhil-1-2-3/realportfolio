import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitCommit,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface PipelineStage {
  id: string;
  step: string;
  name: string;
  category: string;
  iconType: 'custom' | 'svg';
  iconSrc?: string;
  customIcon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  tag: string;
  desc: string;
  metric: string;
  color: string;
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'stage-commit',
    step: '01',
    name: 'Git Commit Gate',
    category: 'Source Control',
    iconType: 'custom',
    customIcon: GitCommit,
    tag: 'main @ sha-9e2a84',
    desc: 'Automated webhook triggers ephemeral runner on every signed push by Nikhil Singh.',
    metric: 'Trigger: < 1.2s',
    color: '#E68057', // Ochre
  },
  {
    id: 'stage-ci',
    step: '02',
    name: 'Build & CI Pipeline',
    category: 'Continuous Integration',
    iconType: 'svg',
    iconSrc: '/jenkins.svg',
    tag: 'Jenkins + Actions',
    desc: 'Multi-stage parallel testing, TypeScript compile check, and unit test validation.',
    metric: '100% Tests Pass',
    color: '#BF7587', // Dusty Rose
  },
  {
    id: 'stage-sec',
    step: '03',
    name: 'Zero-CVE Security Gate',
    category: 'DevSecOps',
    iconType: 'custom',
    customIcon: ShieldCheck,
    tag: 'Aqua Trivy Scanner',
    desc: 'Deep SBOM and container base-image vulnerability scans enforcing zero critical/high CVEs.',
    metric: '0 CVEs Detected',
    color: '#A2574F', // Cognac
  },
  {
    id: 'stage-docker',
    step: '04',
    name: 'Container & IaC Packaging',
    category: 'Immutable Infrastructure',
    iconType: 'svg',
    iconSrc: '/docker.svg',
    tag: 'Docker + Terraform',
    desc: 'Hardened rootless container images with declarative Terraform remote state lock on S3.',
    metric: 'Digest Verified',
    color: '#E68057', // Ochre
  },
  {
    id: 'stage-k8s',
    step: '05',
    name: 'AWS EKS Multi-AZ Mesh',
    category: 'Cluster Orchestration',
    iconType: 'svg',
    iconSrc: '/kubernetes.svg',
    tag: 'AWS EKS v1.30',
    desc: 'Zero-downtime rolling deployment with ALB Ingress, HPA, and Docker MySQL 8 (:3307) persistence.',
    metric: 'Zero-Downtime',
    color: '#993A8B', // Mulberry
  },
];

export const DevOpsPipelineArtwork: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>('stage-k8s');

  const selectedStage =
    PIPELINE_STAGES.find((s) => s.id === selectedStageId) || PIPELINE_STAGES[4];

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none text-white p-5 sm:p-7">
      {/* Background Architectural Grid & Subtle Laser Aura */}
      <div className="absolute inset-0 bg-warm-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 -right-12 w-64 h-64 bg-[#BF7587]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 -left-12 w-64 h-64 bg-[#E68057]/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Header Eyebrow & Live Architect Identity Stamp */}
      <div className="relative z-10 flex items-center justify-between pb-3.5 border-b border-[#BF7587]/30">
        <div className="flex items-center gap-3">
          {/* Nikhil's Authentic Avatar Stamp */}
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#E68057]/60 ring-2 ring-[#E68057]/20 shadow-md shrink-0">
            <img
              src="/profile.jpg"
              alt="Nikhil Singh"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#FAF6F0] tracking-wide">
                Nikhil Singh
              </span>
              <span className="font-mono text-[10px] text-[#E68057] uppercase font-bold tracking-widest px-1.5 py-0.2 bg-[#E68057]/15 rounded border border-[#E68057]/30">
                Architect
              </span>
            </div>
            <div className="font-mono text-[10px] text-[#BF7587] tracking-wider">
              PIPELINE // PROD-RUNTIME
            </div>
          </div>
        </div>

        {/* Live Pulse Indicator */}
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#FAF6F0]/70">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="hidden sm:inline">GATES PASS</span>
        </div>
      </div>

      {/* Main DevOps Pipeline Graphic: 5 Connected Stages with Live Laser Track */}
      <div className="relative z-10 my-4 space-y-2">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#BF7587] font-bold mb-2 flex items-center justify-between">
          <span>Continuous Delivery Assembly Line</span>
          <span className="text-white/40">Select stage</span>
        </div>

        {/* Stages List with Vertical Laser Track */}
        <div className="relative pl-6 space-y-2.5">
          {/* Vertical Connecting Laser Guide */}
          <div className="absolute left-[13px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#E68057] via-[#BF7587] to-[#993A8B] opacity-60">
            {/* Animated Laser Pulse Traveling Down the Line */}
            <motion.div
              animate={{
                top: ['0%', '100%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute left-[-2px] w-[6px] h-6 rounded-full bg-white shadow-[0_0_12px_#FAF6F0]"
            />
          </div>

          {PIPELINE_STAGES.map((stage) => {
            const isSelected = stage.id === selectedStageId;

            return (
              <div
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`relative p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-all duration-200 border flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-white/[0.08] border-[#E68057] shadow-[0_0_20px_rgba(230,128,87,0.25)] ring-1 ring-[#E68057]/40'
                    : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                }`}
              >
                {/* Node Pip on the Vertical Laser */}
                <div
                  className={`absolute -left-[19px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#E68057] shadow-[0_0_10px_#E68057] scale-110'
                      : 'bg-[#2B151F] border-2 border-[#BF7587]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                {/* Stage Info */}
                <div className="flex items-center gap-3 min-w-0">
                  {/* Tool Icon */}
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center p-1.5 shrink-0 transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: `${stage.color}25`,
                      border: `1px solid ${stage.color}40`,
                    }}
                  >
                    {stage.iconType === 'svg' && stage.iconSrc ? (
                      <img
                        src={stage.iconSrc}
                        alt={stage.name}
                        className="w-full h-full object-contain"
                      />
                    ) : stage.customIcon ? (
                      <stage.customIcon
                        className="w-4 h-4"
                        style={{ color: stage.color }}
                      />
                    ) : null}
                  </div>

                  {/* Stage Label */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] font-bold text-white/50">
                        {stage.step}
                      </span>
                      <h4 className="text-xs sm:text-sm font-display font-bold text-[#FAF6F0] truncate">
                        {stage.name}
                      </h4>
                    </div>
                    <div className="text-[10px] font-mono text-[#BF7587] truncate">
                      {stage.tag}
                    </div>
                  </div>
                </div>

                {/* Metric Badge */}
                <div className="shrink-0 flex items-center gap-1.5 font-mono text-[10px] font-bold px-2 py-1 rounded-lg bg-black/40 border border-white/10 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span className="hidden sm:inline">{stage.metric}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Deep-Dive Footprint */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedStage.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 p-3 rounded-2xl bg-black/40 border border-[#BF7587]/25 text-xs font-mono space-y-1.5"
        >
          <div className="flex items-center justify-between text-[11px] text-[#BF7587]">
            <span className="font-bold text-[#FAF6F0]">
              STAGE {selectedStage.step} // {selectedStage.category}
            </span>
            <span className="text-emerald-400 font-bold">{selectedStage.metric}</span>
          </div>
          <p className="text-xs text-white/80 font-sans leading-relaxed">
            {selectedStage.desc}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Architectural Metadata Footnote */}
      <div className="relative z-10 pt-3 border-t border-[#BF7587]/25 flex items-center justify-between text-[10px] font-mono text-white/50">
        <span>CLUSTER: AP-SOUTH-1 (MUMBAI)</span>
        <span className="text-[#E68057] font-bold">MYSQL 8 PORT 3307 ACTIVE</span>
      </div>
    </div>
  );
};
