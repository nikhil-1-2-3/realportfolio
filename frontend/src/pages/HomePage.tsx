import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Cloud,
  Layers,
  ShieldCheck,
  ExternalLink,
  Github,
  Cpu,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { Button } from '../components/ui/Button';
import { HeroParticleCanvas } from '../components/ui/HeroParticleCanvas';
import { LiveTelemetryTicker } from '../components/ui/LiveTelemetryTicker';
import { HeroArchitectureSimulator } from '../components/ui/HeroArchitectureSimulator';
import { Tilt3D } from '../components/ui/Tilt3D';

export const HomePage: React.FC = () => {
  const featuredProjects: Project[] = PROJECTS_DATA.slice(0, 3);
  const [activeCliCommand, setActiveCliCommand] = useState<string>('kubectl');

  const cliOutputs: Record<string, string[]> = {
    kubectl: [
      '$ kubectl get pods -n production -o wide',
      'NAME                             READY   STATUS    RESTARTS   AGE   IP            NODE',
      'auth-service-78bfb54c8d-4knq9    1/1     Running   0          12d   10.0.24.112   ip-10-0-2-15',
      'api-gateway-569d4d8fc-2w9xp     1/1     Running   0          12d   10.0.24.114   ip-10-0-2-15',
      'turf-booking-svc-66df98-z8pm2   1/1     Running   0          12d   10.0.25.88    ip-10-0-2-16',
      'db-mysql-container-0            1/1     Running   0          12d   10.0.25.90    ip-10-0-2-16',
      '// 4 Pods healthy • HPA policy active • Zero restart events',
    ],
    terraform: [
      '$ terraform output -json cluster_infra',
      '{',
      '  "vpc_id": "vpc-07892bb84ae791f1",',
      '  "aws_region": "ap-south-1 (Mumbai)",',
      '  "public_subnets": ["subnet-1a", "subnet-1b"],',
      '  "private_subnets": ["subnet-1a-priv", "subnet-1b-priv"],',
      '  "nat_gateways": 2,',
      '  "eks_version": "1.30.2",',
      '  "iac_state": "Synced with AWS S3 backend lock (DynamoDB)"',
      '}',
    ],
    docker: [
      '$ docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"',
      'NAMES                  STATUS          PORTS',
      'portfolio-backend      Up 12 days      0.0.0.0:5000->5000/tcp',
      'portfolio-frontend     Up 12 days      0.0.0.0:5173->5173/tcp',
      'portfolio-db-mysql     Up 12 days      0.0.0.0:3307->3306/tcp',
      'portfolio-redis-cache  Up 12 days      0.0.0.0:6379->6379/tcp',
      '// Docker MySQL persistence verified on port 3307',
    ],
    trivy: [
      '$ trivy image --severity HIGH,CRITICAL nikhil/production-api:latest',
      '2026-11-16T07:15:00Z  INFO  Vulnerability DB refreshed',
      '2026-11-16T07:15:02Z  INFO  Scanning OS packages and application dependencies...',
      'Target: nikhil/production-api:latest (debian 12.5)',
      '==================================================',
      'Total: 0 (UNKNOWN: 0, LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0)',
      '// 0 CVEs detected • Container image verified for deployment',
    ],
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      {/* Background Particle Canvas */}
      <HeroParticleCanvas />

      {/* Atmospheric Soft Light Halos */}
      <div
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-mulberry/10 via-cognac/10 to-ochre/10 blur-[120px] -z-10"
        aria-hidden="true"
      />

      {/* Hero Master Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Architectural Metadata Header */}
        <div className="mb-8 pb-3 border-b border-rose/25 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#5C4448]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cognac" />
            <span className="font-bold text-[#231215]">VOL. 2026 // ENGINEERING SYSTEMS DOSSIER</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>LOCATION: GUJARAT, IN [21.17° N, 72.83° E]</span>
            <span className="hidden sm:inline text-rose/40">•</span>
            <span className="hidden sm:inline text-ochre font-bold">STATUS: AVAILABLE FOR HIRE</span>
          </div>
        </div>

        {/* Master Hero Header with God-Level Typography & Staggered Motion */}
        <div className="mb-14">
          {/* Availability Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-rose/30 shadow-aesthetic-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ochre opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-ochre" />
            </span>
            <span className="text-[11px] font-mono font-bold text-cognac uppercase tracking-wider">
              Cloud &amp; DevOps Engineer • Full Stack Architect
            </span>
          </motion.div>

          {/* Monumental God-Level Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.25rem] font-display font-black tracking-[-0.045em] text-[#231215] leading-[0.92] select-none">
              Singh Nikhil{' '}
              <span className="font-serif italic font-normal text-gradient-aesthetic tracking-[-0.02em] inline-block ml-1">
                Subhash
              </span>
            </h1>
          </motion.div>

          {/* Subtitle Tagline with Decorative Architectural Accents */}
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs sm:text-sm text-cognac uppercase tracking-[0.2em] font-bold">
            <span className="w-8 h-[2px] bg-cognac rounded-full" />
            <span>Distributed Systems • Kubernetes Microservices • Zero-Downtime CI/CD</span>
            <span className="w-8 h-[2px] bg-cognac rounded-full hidden sm:inline" />
          </div>

          {/* Narrative Statement */}
          <p className="mt-5 text-base sm:text-xl text-[#5C4448] max-w-3xl leading-relaxed font-sans font-medium">
            Architecting scalable web platforms, containerized Kubernetes microservices, and declarative cloud infrastructure governed through automated security gates.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/projects">
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Selected Work (9)
              </Button>
            </Link>

            <Link to="/cloud">
              <Button
                variant="secondary"
                size="md"
                leftIcon={<Cloud className="w-4 h-4 text-ochre" />}
              >
                Cloud &amp; DevOps Console
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                variant="outline"
                size="md"
                leftIcon={<Sparkles className="w-4 h-4 text-cognac" />}
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>

        {/* Integrated 4-Metric Footprint with True 3D Tilt Parallax */}
        <div className="mb-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <Tilt3D maxTilt={10} scale={1.03}>
            <div className="p-5 rounded-2xl bg-white border border-rose/25 shadow-card-light h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-cognac" />
              <div
                style={{ transform: 'translateZ(30px)' }}
                className="text-3xl sm:text-4xl font-display font-black text-cognac tracking-tight"
              >
                9+
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#5C4448] mt-1.5 font-bold">
                Production Systems
              </div>
              <p className="text-[11px] text-[#8A6E73] mt-1 font-sans line-clamp-1">
                Full stack &amp; microservices
              </p>
            </div>
          </Tilt3D>

          <Tilt3D maxTilt={10} scale={1.03}>
            <div className="p-5 rounded-2xl bg-white border border-rose/25 shadow-card-light h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-ochre" />
              <div
                style={{ transform: 'translateZ(30px)' }}
                className="text-3xl sm:text-4xl font-display font-black text-ochre tracking-tight"
              >
                AWS &amp; K8s
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#5C4448] mt-1.5 font-bold">
                Cloud Architecture
              </div>
              <p className="text-[11px] text-[#8A6E73] mt-1 font-sans line-clamp-1">
                Multi-AZ VPC &amp; Docker pods
              </p>
            </div>
          </Tilt3D>

          <Tilt3D maxTilt={10} scale={1.03}>
            <div className="p-5 rounded-2xl bg-white border border-rose/25 shadow-card-light h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-rose" />
              <div
                style={{ transform: 'translateZ(30px)' }}
                className="text-3xl sm:text-4xl font-display font-black text-rose tracking-tight"
              >
                Zero-CVE
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#5C4448] mt-1.5 font-bold">
                DevSecOps Pipelines
              </div>
              <p className="text-[11px] text-[#8A6E73] mt-1 font-sans line-clamp-1">
                Aqua Trivy gated builds
              </p>
            </div>
          </Tilt3D>

          <Tilt3D maxTilt={10} scale={1.03}>
            <div className="p-5 rounded-2xl bg-white border border-rose/25 shadow-card-light h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-mulberry" />
              <div
                style={{ transform: 'translateZ(30px)' }}
                className="text-3xl sm:text-4xl font-display font-black text-mulberry tracking-tight"
              >
                8.5 / 10
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#5C4448] mt-1.5 font-bold">
                B.Tech CSE Standing
              </div>
              <p className="text-[11px] text-[#8A6E73] mt-1 font-sans line-clamp-1">
                Formal computer science rigor
              </p>
            </div>
          </Tilt3D>
        </div>

        {/* Centerpiece: Interactive Living Infrastructure Simulator wrapped in 3D Perspective Tilt */}
        <div className="mb-20">
          <Tilt3D maxTilt={5} scale={1.01}>
            <HeroArchitectureSimulator />
          </Tilt3D>
        </div>
      </div>

      {/* Live Telemetry Marquee Banner */}
      <div className="w-full mb-20">
        <LiveTelemetryTicker />
      </div>

      {/* Featured Engineering Systems Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-rose/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-rose/35 text-cognac font-mono text-xs uppercase tracking-widest font-bold mb-3 shadow-aesthetic-sm">
              <span className="w-2 h-2 rounded-full bg-ochre" />
              <span>Flagship Systems</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#231215] tracking-tight">
              Selected Engineering Works
            </h2>
            <p className="text-sm text-[#5C4448] mt-1 font-sans">
              Hand-picked distributed web platforms, containerized microservices, and automated infrastructure deployments.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-mono font-bold text-cognac hover:text-ochre transition-colors shrink-0"
          >
            <span>View All 9 Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Flagship Architectural Cards with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project: Project, idx: number) => (
            <Tilt3D key={project.id} maxTilt={9} scale={1.02}>
              <div className="bg-white border border-rose/25 rounded-2xl p-6 shadow-card-light hover:border-cognac/40 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group relative overflow-hidden h-full">
                <div>
                  {/* Header Index & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold text-[#8A6E73] uppercase tracking-wider">
                      SYS.0{idx + 1} // {project.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-ochre" />
                      <span className="text-[10px] font-mono text-ochre font-bold uppercase">Production Live</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold text-[#231215] group-hover:text-cognac transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-ochre font-mono mt-0.5 truncate font-semibold">
                    {project.subtitle}
                  </p>
                  <p className="text-xs text-[#5C4448] mt-3 font-sans leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Tech Chips */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-[#FAF4EC] text-[#5C4448] border border-rose/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-1 text-[10px] font-mono rounded-lg bg-[#FAF4EC] text-cognac border border-rose/25 font-bold">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-rose/15 flex items-center justify-between">
                  {(project.githubUrl || project.gitlabUrl) && (
                    <a
                      href={project.githubUrl || project.gitlabUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5C4448] hover:text-[#231215] transition-colors"
                    >
                      <Github className="w-3.5 h-3.5 text-cognac" />
                      <span>Source</span>
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cognac hover:underline"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>
      </section>

      {/* Core Engineering Disciplines Bento Grid with 3D Tilt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-rose/35 text-cognac font-mono text-xs uppercase tracking-widest font-bold mb-3 shadow-aesthetic-sm">
            <span>Engineering Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#231215] tracking-tight">
            Architectural Focus Areas
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pillar 1: Cognac */}
          <Tilt3D maxTilt={10} scale={1.02}>
            <div className="p-6 rounded-2xl bg-white border border-rose/25 shadow-card-light hover:border-cognac/40 hover:shadow-card-hover transition-all group h-full">
              <div className="p-3 rounded-xl bg-cognac/10 text-cognac border border-cognac/25 w-fit mb-4 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-display font-bold text-[#231215]">Full Stack Platforms</h3>
              <p className="text-xs text-[#5C4448] mt-2 font-sans leading-relaxed">
                Complete responsive web platforms, REST APIs, Socket.io real-time websockets, and relational MySQL schemas.
              </p>
            </div>
          </Tilt3D>

          {/* Pillar 2: Ochre */}
          <Tilt3D maxTilt={10} scale={1.02}>
            <div className="p-6 rounded-2xl bg-white border border-rose/25 shadow-card-light hover:border-ochre/40 hover:shadow-card-hover transition-all group h-full">
              <div className="p-3 rounded-xl bg-ochre/15 text-ochre border border-ochre/25 w-fit mb-4 group-hover:scale-105 transition-transform">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="text-base font-display font-bold text-[#231215]">Cloud &amp; Kubernetes</h3>
              <p className="text-xs text-[#5C4448] mt-2 font-sans leading-relaxed">
                Multi-AZ AWS architecture, Docker containers, Kubernetes deployments, and declarative Terraform IaC.
              </p>
            </div>
          </Tilt3D>

          {/* Pillar 3: Dusty Rose */}
          <Tilt3D maxTilt={10} scale={1.02}>
            <div className="p-6 rounded-2xl bg-white border border-rose/25 shadow-card-light hover:border-rose/50 hover:shadow-card-hover transition-all group h-full">
              <div className="p-3 rounded-xl bg-rose/15 text-rose border border-rose/30 w-fit mb-4 group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-display font-bold text-[#231215]">CI/CD Automation</h3>
              <p className="text-xs text-[#5C4448] mt-2 font-sans leading-relaxed">
                GitHub Actions &amp; Jenkins pipelines, automated testing, canary deployments, and zero-downtime rollouts.
              </p>
            </div>
          </Tilt3D>

          {/* Pillar 4: Mulberry */}
          <Tilt3D maxTilt={10} scale={1.02}>
            <div className="p-6 rounded-2xl bg-white border border-rose/25 shadow-card-light hover:border-mulberry/40 hover:shadow-card-hover transition-all group h-full">
              <div className="p-3 rounded-xl bg-mulberry/15 text-mulberry border border-mulberry/25 w-fit mb-4 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-display font-bold text-[#231215]">DevSecOps &amp; Telemetry</h3>
              <p className="text-xs text-[#5C4448] mt-2 font-sans leading-relaxed">
                Aqua Trivy vulnerability scanning, Prometheus metrics collection, Grafana dashboards, and rate limiting.
              </p>
            </div>
          </Tilt3D>
        </div>
      </section>

      {/* Interactive Quick CLI Preview Terminal with 3D Tilt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <Tilt3D maxTilt={5} scale={1.01}>
          <div className="rounded-3xl bg-[#1A0E18] text-[#F5ECE3] border border-rose/30 shadow-aesthetic-lg p-6 sm:p-8 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#E68057]" />
                  <span className="w-3 h-3 rounded-full bg-[#BF7587]" />
                  <span className="w-3 h-3 rounded-full bg-[#993A8B]" />
                </div>
                <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5 ml-2">
                  <Terminal className="w-4 h-4 text-ochre" />
                  <span>production-shell // nik@cluster:~#</span>
                </span>
              </div>

              {/* Quick Command Selector Tabs */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'kubectl', label: 'kubectl get pods' },
                  { id: 'terraform', label: 'terraform output' },
                  { id: 'docker', label: 'docker ps' },
                  { id: 'trivy', label: 'trivy image scan' },
                ].map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => setActiveCliCommand(cmd.id)}
                    className={`px-3 py-1 rounded-lg font-mono text-xs transition-all ${
                      activeCliCommand === cmd.id
                        ? 'bg-cognac text-white font-bold shadow-sm'
                        : 'bg-white/10 text-[#F5ECE3]/70 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {cmd.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Console Output */}
            <div className="font-mono text-xs sm:text-sm space-y-1.5 overflow-x-auto py-2">
              {cliOutputs[activeCliCommand]?.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    idx === 0
                      ? 'text-ochre font-bold'
                      : line.startsWith('//')
                      ? 'text-rose italic font-semibold mt-2'
                      : 'text-[#E0D5CE]'
                  }
                >
                  {line}
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
              <span>Shell: zsh 5.9 • AWS CLI v2 • Docker 24.0.7 • K8s 1.30</span>
              <Link to="/cloud" className="text-ochre hover:underline font-bold flex items-center gap-1">
                <span>Open Full Interactive Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Tilt3D>
      </section>

      {/* Collaboration Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 bg-white border border-rose/30 shadow-card-light overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-cognac font-bold">
              Initiate Collaboration
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#231215] mt-1.5">
              Ready to architect something resilient?
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4448] mt-2 font-sans">
              Currently open for Full Stack Developer and Cloud / DevOps Engineering roles. Let's discuss your engineering infrastructure needs.
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex flex-wrap gap-3">
            <Link to="/contact">
              <Button variant="primary" size="md">
                Send a Message
              </Button>
            </Link>
            <Link to="/cloud">
              <Button variant="secondary" size="md">
                Launch Console
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};