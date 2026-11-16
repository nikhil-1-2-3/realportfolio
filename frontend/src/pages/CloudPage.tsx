import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { InteractiveTerminalHero } from '../components/ui/InteractiveTerminalHero';
import { Cloud, Server, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CloudPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="CLOUD INFRASTRUCTURE"
        title="Cloud Architecture & DevOps Command Center"
        description="Interactive live topology inspection, containerized Kubernetes orchestration, and declarative Terraform infrastructure."
      />

      {/* Main Interactive Workstation Console */}
      <div className="mb-16">
        <InteractiveTerminalHero />
      </div>

      {/* Cloud Architecture Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-[#130A15] border border-lavender/25 shadow-card-dark">
          <div className="p-3 rounded-xl bg-mint/15 text-mint border border-mint/30 w-fit mb-4">
            <Cloud className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-display font-bold text-white">AWS Multi-AZ VPC Architecture</h3>
          <p className="text-xs text-[#D4CDD7] mt-2 font-sans leading-relaxed">
            Public and private subnets distributed across multiple availability zones. Internet Gateways, NAT Gateways, and security groups strictly governed through Terraform IaC.
          </p>
          <div className="mt-4 pt-3 border-t border-lavender/15 flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1B0E1E] text-mint">VPC</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1B0E1E] text-mint">EKS</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1B0E1E] text-mint">ALB</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1B0E1E] text-mint">S3 State</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#130A15] border border-lavender/25 shadow-card-dark">
          <div className="p-3 rounded-xl bg-teal/15 text-teal border border-teal/30 w-fit mb-4">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-display font-bold text-white">Docker & Kubernetes Orchestration</h3>
          <p className="text-xs text-[#D4CDD7] mt-2 font-sans leading-relaxed">
            Multi-stage Docker builds reducing image sizes under 80MB. Kubernetes Deployments, ClusterIP & NodePort Services, Horizontal Pod Autoscalers (HPA), and ConfigMaps.
          </p>
          <div className="mt-4 pt-3 border-t border-lavender/15 flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1B0E1E] text-teal">Docker 24</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1B0E1E] text-teal">K8s Pods</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1B0E1E] text-teal">Helm</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1B0E1E] text-teal">HPA</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#130A15] border border-lavender/25 shadow-card-dark">
          <div className="p-3 rounded-xl bg-ice/15 text-ice border border-ice/30 w-fit mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-display font-bold text-white">DevSecOps & Zero-CVE Pipelines</h3>
          <p className="text-xs text-[#D4CDD7] mt-2 font-sans leading-relaxed">
            Automated security gates with Aqua Trivy container scanning, SonarQube static analysis, secret detection, and automated rollbacks on failed health probes.
          </p>
          <div className="mt-4 pt-3 border-t border-lavender/15 flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1B0E1E] text-ice">Aqua Trivy</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1B0E1E] text-ice">GitHub Actions</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1B0E1E] text-ice">Prometheus</span>
          </div>
        </div>
      </div>

      {/* Production Infrastructure Guarantees */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-wine/30 via-[#130A15] to-[#1B0E1E] border border-mint/30 shadow-card-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-mint" />
            <span>Infrastructure As Code (IaC) Principle</span>
          </h4>
          <p className="text-xs sm:text-sm text-[#D4CDD7] mt-1 font-sans max-w-2xl">
            No infrastructure is manually provisioned. From security group ingress rules to container pod replicas, all cloud state is checked into git, versioned, and continuously validated.
          </p>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs shrink-0">
          <div className="p-3 rounded-xl bg-[#0A050B] border border-lavender/20 text-center">
            <div className="text-mint font-bold">100%</div>
            <div className="text-[10px] text-[#8E8295] uppercase">Automated</div>
          </div>
          <div className="p-3 rounded-xl bg-[#0A050B] border border-lavender/20 text-center">
            <div className="text-teal font-bold">0 CVE</div>
            <div className="text-[10px] text-[#8E8295] uppercase">Gate Policy</div>
          </div>
        </div>
      </div>
    </div>
  );
};
