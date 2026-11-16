import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Database, Server, GitCommit, CheckCircle2, Cloud } from 'lucide-react';

const TELEMETRY_ITEMS = [
  { icon: Cloud, label: 'AWS REGION', value: 'ap-south-1 (Mumbai)', status: 'Active' },
  { icon: Server, label: 'K8S CLUSTER', value: 'v1.30 Production NodePool', status: 'Healthy' },
  { icon: Database, label: 'PERSISTENCE', value: 'MySQL 8 (Docker :3307)', status: 'Connected' },
  { icon: ShieldCheck, label: 'TRIVY SCAN', value: '0 Critical / 0 High CVEs', status: 'Secured' },
  { icon: GitCommit, label: 'CI/CD PIPELINE', value: 'GitHub Actions + Jenkins', status: 'Passing' },
  { icon: Activity, label: 'TELEMETRY', value: 'Prometheus & Grafana Scraped', status: '99.98% SLA' },
  { icon: CheckCircle2, label: 'DEPLOYMENTS', value: '9 Verified Production Systems', status: 'Live' },
];

export const LiveTelemetryTicker: React.FC = () => {
  return (
    <div className="w-full overflow-hidden border-y border-theme-border bg-theme-elevated/80 backdrop-blur-md py-2.5">
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
              <div key={idx} className="flex items-center gap-2.5 font-mono text-[11px] text-theme-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <Icon className="w-3.5 h-3.5 text-theme-accent shrink-0" />
                <span className="text-theme-muted uppercase font-semibold">{item.label}:</span>
                <span className="text-theme-main font-medium">{item.value}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-theme-base border border-theme-border text-emerald-600 dark:text-emerald-400 font-bold">
                  {item.status}
                </span>
                <span className="text-theme-border ml-2">•</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

