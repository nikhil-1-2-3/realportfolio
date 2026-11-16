import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Cloud,
  Layers,
  ShieldCheck,
  ExternalLink,
  Github,
  Cpu,
  Sparkles,
  Server,
  Database,
  Radio,
  CheckCircle2,
  Activity,
  Zap,
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { Button } from '../components/ui/Button';
import { HeroParticleCanvas } from '../components/ui/HeroParticleCanvas';
import { LiveTelemetryTicker } from '../components/ui/LiveTelemetryTicker';
import { motion } from 'framer-motion';

interface ArchitectureTier {
  id: string;
  name: string;
  tag: string;
  icon: typeof Cloud;
  color: string;
  borderClass: string;
  bgLight: string;
  specs: string[];
  latency: string;
  status: string;
  description: string;
}

const ARCHITECTURE_TIERS: ArchitectureTier[] = [
  {
    id: 'edge',
    name: 'Edge & Global Delivery',
    tag: 'CloudFront • Route53 • SSL',
    icon: Radio,
    color: '#993A8B', // Mulberry
    borderClass: 'border-mulberry/40',
    bgLight: 'rgba(153, 58, 139, 0.08)',
    specs: ['HTTP/2 TLS Edge', 'DDoS Protection', 'Vercel / Route53 DNS'],
    latency: '14ms',
    status: 'Global Edge Live',
    description: 'High-speed edge proxy with TLS 1.3 termination, distributed asset caching, and intelligent geographic routing.',
  },
  {
    id: 'k8s',
    name: 'Containerized Microservices',
    tag: 'AWS EKS • Docker • HPA',
    icon: Cloud,
    color: '#A2574F', // Cognac
    borderClass: 'border-cognac/40',
    bgLight: 'rgba(162, 87, 79, 0.08)',
    specs: ['EKS NodePools v1.30', 'Horizontal Pod Autoscaler', 'Ingress Controller'],
    latency: '22ms',
    status: '4 Replicas Running',
    description: 'Containerized microservices orchestrated via Kubernetes with automated horizontal scaling, canary rollouts, and zero downtime.',
  },
  {
    id: 'persistence',
    name: 'Relational Database & Cache',
    tag: 'Docker MySQL 8 • Redis',
    icon: Database,
    color: '#E68057', // Ochre
    borderClass: 'border-ochre/40',
    bgLight: 'rgba(230, 128, 87, 0.10)',
    specs: ['Docker MySQL :3307', 'Connection Pool (10)', 'Schema Migrations'],
    latency: '4ms',
    status: 'Connected & Pooled',
    description: 'Relational storage in Dockerized MySQL 8 with indexed query optimization, sub-millisecond Redis caching, and persistent volume backups.',
  },
  {
    id: 'secops',
    name: 'DevSecOps & Telemetry',
    tag: 'Trivy • GitHub Actions • Prometheus',
    icon: ShieldCheck,
    color: '#BF7587', // Dusty Rose
    borderClass: 'border-rose/40',
    bgLight: 'rgba(191, 117, 135, 0.10)',
    specs: ['Zero-CVE Trivy Gate', 'GitHub Actions CI', 'Prometheus & Grafana'],
    latency: '99.99%',
    status: 'Zero Critical CVEs',
    description: 'Automated vulnerability gates with Trivy container scanners, continuous integration test suites, and real-time Prometheus monitoring.',
  },
];

export const HomePage: React.FC = () => {
  const featuredProjects: Project[] = PROJECTS_DATA.slice(0, 3);
  const [activeTier, setActiveTier] = useState<ArchitectureTier>(ARCHITECTURE_TIERS[1]);
  const [isSimulatingPing, setIsSimulatingPing] = useState(false);
  const [pingSuccess, setPingSuccess] = useState(false);

  const handleSimulatePing = () => {
    setIsSimulatingPing(true);
    setPingSuccess(false);
    setTimeout(() => {
      setIsSimulatingPing(false);
      setPingSuccess(true);
      setTimeout(() => setPingSuccess(false), 3000);
    }, 900);
  };

  return (
    <div className="relative min-h-screen pt-28 pb-16 overflow-hidden">
      {/* Background Particle Canvas */}
      <HeroParticleCanvas />

      {/* Atmospheric Soft Light Halos in the 4 Palette Colors */}
      <div
        className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-gradient-to-tr from-mulberry/10 via-cognac/10 to-ochre/10 blur-[110px] -z-10"
        aria-hidden="true"
      />

      {/* Hero Master Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-rose/35 shadow-aesthetic-sm backdrop-blur-xl mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ochre opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ochre shadow-sm" />
          </span>
          <span className="text-xs font-mono font-bold text-cognac tracking-wide">
            Available for Full Stack & Cloud / DevOps Roles
          </span>
        </div>

        {/* Sculptural Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold tracking-tight text-[#231215] leading-[1.05]">
          Singh Nikhil{' '}
          <span className="text-gradient-aesthetic">
            Subhash
          </span>
        </h1>

        {/* Crisp Subtitle */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-base sm:text-2xl font-sans font-bold text-[#5C4448]">
          <span className="text-cognac">Full Stack Developer</span>
          <span className="text-rose">•</span>
          <span className="text-ochre">Cloud Architect</span>
          <span className="text-rose">•</span>
          <span className="text-mulberry">DevOps Automation</span>
        </div>

        {/* Concise Value Statement */}
        <p className="mt-4 text-base sm:text-lg text-[#5C4448] max-w-2xl mx-auto leading-relaxed font-sans font-medium">
          Architecting resilient distributed web platforms, containerized Kubernetes microservices, and automated zero-downtime CI/CD infrastructure.
        </p>

        {/* 4-Color Palette Indicator Capsule */}
        <div className="mt-6 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-rose/30 shadow-aesthetic-sm text-[11px] font-mono text-[#5C4448]">
          <span className="text-[#8A6E73] font-semibold uppercase tracking-wider">Aesthetic Palette:</span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cognac shadow-sm" />
              <span className="font-bold text-cognac">Cognac</span>
            </span>
            <span className="text-rose/40">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-ochre shadow-sm" />
              <span className="font-bold text-ochre">Ochre</span>
            </span>
            <span className="text-rose/40">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose shadow-sm" />
              <span className="font-bold text-rose">Rose</span>
            </span>
            <span className="text-rose/40">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-mulberry shadow-sm" />
              <span className="font-bold text-mulberry">Mulberry</span>
            </span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/projects">
            <Button
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore All Projects
            </Button>
          </Link>

          <Link to="/cloud">
            <Button
              variant="secondary"
              size="md"
              leftIcon={<Cloud className="w-4 h-4 text-ochre" />}
            >
              Cloud & Workstation Console
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

        {/* Clean Metrics Ribbon */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-white border border-rose/25 shadow-card-light">
            <div className="text-2xl font-display font-extrabold text-cognac">9+</div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#5C4448] mt-0.5 font-semibold">Production Projects</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-rose/25 shadow-card-light">
            <div className="text-2xl font-display font-extrabold text-ochre">AWS & K8s</div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#5C4448] mt-0.5 font-semibold">Cloud Architecture</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-rose/25 shadow-card-light">
            <div className="text-2xl font-display font-extrabold text-rose">Zero-CVE</div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#5C4448] mt-0.5 font-semibold">DevSecOps Pipelines</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-rose/25 shadow-card-light">
            <div className="text-2xl font-display font-extrabold text-mulberry">8.5 / 10</div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#5C4448] mt-0.5 font-semibold">B.Tech CSE Standing</div>
          </div>
        </div>

        {/* Grand Interactive Architectural Deck */}
        <div className="mt-16 max-w-5xl mx-auto rounded-3xl bg-white border border-rose/30 shadow-aesthetic-lg overflow-hidden text-left">
          {/* Deck Header */}
          <div className="px-6 py-4 bg-[#FAF4EC] border-b border-rose/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-cognac shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-ochre shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-rose shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-mulberry shadow-sm" />
              </div>
              <span className="font-mono text-xs font-bold text-[#231215] flex items-center gap-1.5 ml-2">
                <Server className="w-3.5 h-3.5 text-cognac" />
                <span>LIVE CLOUD ARCHITECTURE TOPOLOGY</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSimulatePing}
                disabled={isSimulatingPing}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold rounded-lg bg-white border border-rose/35 text-cognac hover:border-cognac hover:bg-[#FAF6F0] shadow-aesthetic-sm transition-all disabled:opacity-50"
              >
                <Zap className={`w-3.5 h-3.5 ${isSimulatingPing ? 'animate-bounce text-ochre' : 'text-ochre'}`} />
                <span>{isSimulatingPing ? 'Pinging Nodes...' : pingSuccess ? 'Ping: 18ms (OK)' : 'Simulate Request Flow'}</span>
              </button>

              <span className="px-2.5 py-0.5 rounded-full bg-white border border-rose/25 text-[10px] font-mono text-ochre font-bold shadow-aesthetic-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-ochre animate-pulse" />
                <span>Cluster Live</span>
              </span>
            </div>
          </div>

          {/* Deck Body - 2 Columns: Interactive Tiers & Live Inspector */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 4 Tier Buttons (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8A6E73] font-bold mb-1">
                Select Architectural Layer to Inspect:
              </span>

              {ARCHITECTURE_TIERS.map((tier) => {
                const Icon = tier.icon;
                const isSelected = activeTier.id === tier.id;

                return (
                  <motion.button
                    key={tier.id}
                    onClick={() => setActiveTier(tier)}
                    whileHover={{ x: 2 }}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-white shadow-aesthetic-md'
                        : 'bg-[#FAF4EC]/70 hover:bg-white border-rose/20'
                    }`}
                    style={{
                      borderColor: isSelected ? tier.color : undefined,
                      borderWidth: isSelected ? '2px' : '1px',
                    }}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className="p-2.5 rounded-xl border shrink-0 shadow-aesthetic-sm"
                        style={{
                          backgroundColor: tier.bgLight,
                          borderColor: `${tier.color}35`,
                          color: tier.color,
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-sm text-[#231215] flex items-center gap-2">
                          <span>{tier.name}</span>
                          {isSelected && (
                            <span
                              className="text-[10px] font-mono px-2 py-0.2 rounded-full font-bold"
                              style={{ backgroundColor: tier.bgLight, color: tier.color }}
                            >
                              Active
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-mono text-[#5C4448] mt-0.5">{tier.tag}</div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-mono text-xs font-bold" style={{ color: tier.color }}>
                        {tier.latency}
                      </div>
                      <div className="text-[10px] font-mono text-[#8A6E73]">{tier.status}</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Right Live Inspector Box (5 Cols) */}
            <div className="lg:col-span-5 bg-[#FAF4EC] rounded-2xl p-5 border border-rose/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-rose/15">
                  <span className="font-mono text-xs font-bold text-[#231215] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" style={{ color: activeTier.color }} />
                    <span>Layer Diagnostics</span>
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                    style={{
                      backgroundColor: activeTier.bgLight,
                      color: activeTier.color,
                      borderColor: `${activeTier.color}30`,
                    }}
                  >
                    {activeTier.status}
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="font-display font-bold text-lg text-[#231215]">
                    {activeTier.name}
                  </h4>
                  <p className="text-xs text-[#5C4448] font-sans mt-2 leading-relaxed">
                    {activeTier.description}
                  </p>
                </div>

                {/* Layer Specifications */}
                <div className="mt-4 pt-4 border-t border-rose/15">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#8A6E73] block mb-2">
                    Verified Specifications:
                  </span>
                  <ul className="space-y-1.5">
                    {activeTier.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-mono text-[#231215]">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: activeTier.color }} />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="mt-5 pt-3 border-t border-rose/15 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#8A6E73]">
                  Telemetry: ap-south-1
                </span>
                <Link
                  to="/cloud"
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold hover:underline"
                  style={{ color: activeTier.color }}
                >
                  <span>Launch Deep Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Telemetry Marquee Banner */}
      <div className="w-full mt-16">
        <LiveTelemetryTicker />
      </div>

      {/* Featured Projects Showcase Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-rose/35 text-cognac font-mono text-xs uppercase tracking-widest font-bold mb-3 shadow-aesthetic-sm">
              <span className="w-2 h-2 rounded-full bg-ochre" />
              <span>Featured Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#231215] tracking-tight">
              Selected Systems
            </h2>
            <p className="text-sm text-[#5C4448] mt-1 font-sans">
              Hand-picked full-stack platforms and containerized infrastructure architectures.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-mono font-bold text-cognac hover:text-ochre transition-colors"
          >
            <span>View All 9 Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Clean Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project: Project) => (
            <div
              key={project.id}
              className="bg-white border border-rose/25 rounded-2xl p-6 shadow-card-light hover:border-cognac/40 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#FAF4EC] text-cognac border border-rose/25 uppercase tracking-widest font-bold">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-ochre" />
                    <span className="text-[10px] font-mono text-ochre font-bold uppercase">Production Ready</span>
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold text-[#231215] group-hover:text-cognac transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-[#5C4448] mt-2.5 font-sans leading-relaxed line-clamp-3">
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
          ))}
        </div>
      </section>

      {/* Core Engineering Disciplines Grid - Bento Celebrating the 4 Palette Colors */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-rose/35 text-cognac font-mono text-xs uppercase tracking-widest font-bold mb-3 shadow-aesthetic-sm">
            <span>Core Disciplines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#231215] tracking-tight">
            Architectural Focus Areas
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pillar 1: Cognac */}
          <div className="p-6 rounded-2xl bg-white border border-rose/25 shadow-card-light hover:border-cognac/40 hover:shadow-card-hover transition-all group">
            <div className="p-3 rounded-xl bg-cognac/10 text-cognac border border-cognac/25 w-fit mb-4 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-display font-bold text-[#231215]">Full Stack Platforms</h3>
            <p className="text-xs text-[#5C4448] mt-2 font-sans leading-relaxed">
              Complete responsive web platforms, REST APIs, Socket.io real-time websockets, and relational MySQL schemas.
            </p>
          </div>

          {/* Pillar 2: Ochre */}
          <div className="p-6 rounded-2xl bg-white border border-rose/25 shadow-card-light hover:border-ochre/40 hover:shadow-card-hover transition-all group">
            <div className="p-3 rounded-xl bg-ochre/15 text-ochre border border-ochre/25 w-fit mb-4 group-hover:scale-105 transition-transform">
              <Cloud className="w-5 h-5" />
            </div>
            <h3 className="text-base font-display font-bold text-[#231215]">Cloud & Kubernetes</h3>
            <p className="text-xs text-[#5C4448] mt-2 font-sans leading-relaxed">
              Multi-AZ AWS architecture, Docker containers, Kubernetes deployments, and declarative Terraform IaC.
            </p>
          </div>

          {/* Pillar 3: Dusty Rose */}
          <div className="p-6 rounded-2xl bg-white border border-rose/25 shadow-card-light hover:border-rose/50 hover:shadow-card-hover transition-all group">
            <div className="p-3 rounded-xl bg-rose/15 text-rose border border-rose/30 w-fit mb-4 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-display font-bold text-[#231215]">CI/CD Automation</h3>
            <p className="text-xs text-[#5C4448] mt-2 font-sans leading-relaxed">
              GitHub Actions & Jenkins pipelines, automated testing, canary deployments, and zero-downtime rollouts.
            </p>
          </div>

          {/* Pillar 4: Mulberry */}
          <div className="p-6 rounded-2xl bg-white border border-rose/25 shadow-card-light hover:border-mulberry/40 hover:shadow-card-hover transition-all group">
            <div className="p-3 rounded-xl bg-mulberry/15 text-mulberry border border-mulberry/25 w-fit mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-display font-bold text-[#231215]">DevSecOps & Telemetry</h3>
            <p className="text-xs text-[#5C4448] mt-2 font-sans leading-relaxed">
              Aqua Trivy vulnerability scanning, Prometheus metrics collection, Grafana dashboards, and rate limiting.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
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