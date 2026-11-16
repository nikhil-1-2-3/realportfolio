import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Database, Server, GitCommit, CheckCircle2, Cloud } from 'lucide-react';

const TELEMETRY_ITEMS = [
  { icon: Cloud, label: 'AWS REGION', value: 'ap-south-1 (Mumbai)', status: 'Active', color: '#E68057' },
  { icon: Server, label: 'K8S CLUSTER', value: 'v1.30 Production NodePool', status: 'Healthy', color: '#993A8B' },
  { icon: Database, label: 'PERSISTENCE', value: 'MySQL 8 (Docker :3307)', status: 'Connected', color: '#A2574F' },
  { icon: ShieldCheck, label: 'TRIVY SCAN', value: '0 Critical / 0 High CVEs', status: 'Secured', color: '#BF7587' },
  { icon: GitCommit, label: 'CI/CD PIPELINE', value: 'GitHub Actions + Jenkins', status: 'Passing', color: '#E68057' },
  { icon: Activity, label: 'TELEMETRY', value: 'Prometheus & Grafana Scraped', status: '99.98% SLA', color: '#993A8B' },
  { icon: CheckCircle2, label: 'DEPLOYMENTS', value: '9 Verified Production Systems', status: 'Live', color: '#BF7587' },
];

export const LiveTelemetryTicker: React.FC = () => {
  return (
    <div className="w-full overflow-hidden border-y border-cognac/30 bg-[#120a14]/90 backdrop-blur-xl py-3 shadow-2xl">
      <div className="flex items-center">
        {/* Repeating Marquee Container */}
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 32,
            ease: 'linear',
          }}
          className="flex items-center gap-8 shrink-0 whitespace-nowrap"
        >
          {[...TELEMETRY_ITEMS, ...TELEMETRY_ITEMS].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-2.5 font-mono text-[11px] text-neutral-300">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: item.color }} />
                <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: item.color }} />
                <span className="uppercase font-bold tracking-wider" style={{ color: item.color }}>
                  {item.label}:
                </span>
                <span className="text-white font-medium">{item.value}</span>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                  style={{
                    backgroundColor: `${item.color}25`,
                    color: item.color,
                    borderColor: `${item.color}50`,
                  }}
                >
                  {item.status}
                </span>
                <span className="text-cognac/40 ml-2">•</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
