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
    <div className="w-full overflow-hidden border-y border-cognac/15 bg-warm-elevated/90 backdrop-blur-md py-2.5">
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
              <div key={idx} className="flex items-center gap-2.5 font-mono text-[11px] text-warm-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <Icon className="w-3.5 h-3.5 text-apricot shrink-0" />
                <span className="text-warm-muted uppercase font-semibold">{item.label}:</span>
                <span className="text-warm-ink font-medium">{item.value}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-plum/10 border border-plum/20 text-plum font-bold">
                  {item.status}
                </span>
                <span className="text-cognac/30 ml-2">•</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

