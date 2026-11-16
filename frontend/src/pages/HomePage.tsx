import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight,
  Cloud,
  Layers,
  ShieldCheck,
  ExternalLink,
  Github,
  Cpu,
  Sparkles,
  CheckCircle2,
  GitBranch,
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { Button } from '../components/ui/Button';
import { HeroParticleCanvas } from '../components/ui/HeroParticleCanvas';
import { LiveTelemetryTicker } from '../components/ui/LiveTelemetryTicker';
import { DevOpsPipelineArtwork } from '../components/ui/DevOpsPipelineArtwork';
import { Tilt3D } from '../components/ui/Tilt3D';
import { CinematicPreloader } from '../components/ui/CinematicPreloader';

export const HomePage: React.FC = () => {
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const featuredProjects: Project[] = PROJECTS_DATA.slice(0, 3);

  // High-Sensitivity, Snappy Scroll-driven Paper Roll-Up Transformation
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 22, stiffness: 220 });

  // Highly responsive range (0 -> 220px): rolls up swiftly on initial scroll flick
  const paperRollY = useTransform(smoothScrollY, [0, 220], ['0%', '-135%']);
  const paperRotateX = useTransform(smoothScrollY, [0, 220], [0, 36]);
  const paperScale = useTransform(smoothScrollY, [0, 220], [1, 0.88]);
  const paperOpacity = useTransform(smoothScrollY, [0, 160, 230], [1, 0.8, 0]);
  const paperCurlOpacity = useTransform(smoothScrollY, [0, 15, 220], [0, 1, 1]);
  const paperCurlHeight = useTransform(smoothScrollY, [0, 220], [8, 34]);

  return (
    <div className="relative min-h-screen pt-20 pb-20 overflow-hidden">
      {/* High-Class Cinematic Boot Preloader */}
      {showPreloader && (
        <CinematicPreloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* DUAL-TONE SPLIT HERO SECTION: Left Part (#FAF6F0) | Right Part (#2B151F Dark Matte Brownish-Pink with Paper Roll-Up) */}
      <section className="relative overflow-hidden pt-6 pb-20 border-b border-rose/25 bg-[#FAF6F0]">
        {/* Base Background: Warm Sandstone Linen (#FAF6F0) spanning full hero width */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#FAF6F0]">
          <HeroParticleCanvas />
          <div className="absolute top-12 left-10 w-96 h-96 bg-gradient-to-tr from-mulberry/10 via-cognac/10 to-ochre/10 blur-[120px]" />
          <div className="absolute top-1/2 right-10 w-96 h-96 bg-gradient-to-bl from-ochre/10 via-rose/10 to-mulberry/10 blur-[130px]" />
        </div>

        {/* Foreground Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[75vh]">
            {/* LEFT PART: Sits on #FAF6F0 Warm Sandstone Canvas (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6 pr-0 lg:pr-2">
              {/* Monumental God-Level Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-1"
              >
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6rem] font-display font-black tracking-[-0.045em] text-[#231215] leading-[0.93] select-none">
                  Singh Nikhil{' '}
                  <span className="font-serif italic font-normal text-gradient-aesthetic tracking-[-0.02em] inline-block ml-1">
                    Subhash
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle Tagline with Decorative Architectural Accents */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs sm:text-sm text-cognac uppercase tracking-[0.2em] font-bold">
                <span className="w-8 h-[2px] bg-cognac rounded-full" />
                <span>Distributed Systems • Kubernetes Microservices • Zero-Downtime CI/CD</span>
              </div>

              {/* Narrative Statement */}
              <p className="text-base sm:text-lg text-[#5C4448] max-w-2xl leading-relaxed font-sans font-medium">
                Architecting scalable web platforms, containerized Kubernetes microservices, and declarative cloud infrastructure governed through automated security gates.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
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
                    Cloud Architecture
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

              {/* Integrated 4-Metric Footprint with True 3D Tilt Parallax */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <Tilt3D maxTilt={10} scale={1.03}>
                  <div className="p-4 rounded-2xl bg-white border border-rose/25 shadow-card-light h-full relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-cognac" />
                    <div
                      style={{ transform: 'translateZ(25px)' }}
                      className="text-2xl sm:text-3xl font-display font-black text-cognac tracking-tight"
                    >
                      9+
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#5C4448] mt-1 font-bold">
                      Production Systems
                    </div>
                  </div>
                </Tilt3D>

                <Tilt3D maxTilt={10} scale={1.03}>
                  <div className="p-4 rounded-2xl bg-white border border-rose/25 shadow-card-light h-full relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-ochre" />
                    <div
                      style={{ transform: 'translateZ(25px)' }}
                      className="text-2xl sm:text-3xl font-display font-black text-ochre tracking-tight"
                    >
                      AWS &amp; K8s
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#5C4448] mt-1 font-bold">
                      Cloud Architecture
                    </div>
                  </div>
                </Tilt3D>

                <Tilt3D maxTilt={10} scale={1.03}>
                  <div className="p-4 rounded-2xl bg-white border border-rose/25 shadow-card-light h-full relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-rose" />
                    <div
                      style={{ transform: 'translateZ(25px)' }}
                      className="text-2xl sm:text-3xl font-display font-black text-rose tracking-tight"
                    >
                      Zero-CVE
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#5C4448] mt-1 font-bold">
                      DevSecOps Gates
                    </div>
                  </div>
                </Tilt3D>

                <Tilt3D maxTilt={10} scale={1.03}>
                  <div className="p-4 rounded-2xl bg-white border border-rose/25 shadow-card-light h-full relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-mulberry" />
                    <div
                      style={{ transform: 'translateZ(25px)' }}
                      className="text-2xl sm:text-3xl font-display font-black text-mulberry tracking-tight"
                    >
                      8.5 / 10
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#5C4448] mt-1 font-bold">
                      B.Tech CSE Rigor
                    </div>
                  </div>
                </Tilt3D>
              </div>
            </div>

            {/* Desktop spacer to preserve 12-column grid balance */}
            <div className="hidden lg:block lg:col-span-5 h-[520px] pointer-events-none" />
          </div>
        </div>

        {/* THE DARK BLUEPRINT PAPER SHEET: Right 42% on desktop, rolls up like paper in upward direction on scroll */}
        <motion.div
          style={{
            y: paperRollY,
            rotateX: paperRotateX,
            scale: paperScale,
            opacity: paperOpacity,
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
          }}
          className="lg:absolute lg:top-0 lg:right-0 lg:bottom-0 w-full lg:w-[42%] bg-[#2B151F] border-t lg:border-t-0 lg:border-l border-rose/30 shadow-[0_25px_60px_rgba(0,0,0,0.65)] z-20 overflow-hidden flex flex-col justify-between"
        >
          {/* Subtle Matte Architectural Grid & Ambient Halos */}
          <div className="absolute inset-0 bg-warm-grid opacity-20 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#BF7587]/25 blur-[130px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#E68057]/15 blur-[110px] pointer-events-none" />

          {/* The DevOps Pipeline Artwork Content */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between pt-4 lg:pt-6 pb-6">
            <DevOpsPipelineArtwork />
          </div>

          {/* Physical 3D Curled Paper Roll Cylinder Edge (Bottom Lip) */}
          <motion.div
            style={{
              opacity: paperCurlOpacity,
              height: paperCurlHeight,
            }}
            className="absolute -bottom-3 left-0 right-0 bg-gradient-to-b from-[#4A2033] via-[#FAF6F0]/25 to-[#0E050A] rounded-b-full shadow-[0_18px_36px_rgba(0,0,0,0.9)] border-t border-[#FAF6F0]/35 pointer-events-none flex items-center justify-center transition-all"
          >
            <div className="w-32 h-[3px] bg-[#FAF6F0]/40 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

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

        {/* 3 Featured Project Cards with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <Tilt3D key={project.id} maxTilt={8} scale={1.02}>
              <div className="rounded-3xl bg-white border border-rose/25 p-6 shadow-card-light hover:shadow-card-hover transition-all flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-lg bg-sandstone text-cognac font-mono text-[11px] font-bold uppercase tracking-wider border border-rose/20">
                      {project.categoryLabel}
                    </span>
                    <span className="font-mono text-xs font-bold text-ochre">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-[#231215] group-hover:text-cognac transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-rose mt-0.5 font-semibold">
                    {project.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[#5C4448] mt-3 font-sans leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-sandstone/80 text-[#5C4448] font-mono text-[10px] font-medium border border-rose/15"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-rose/15 flex items-center justify-between">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#5C4448] hover:text-cognac transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
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

      {/* Production Delivery & Continuous Verification Lifecycle (Replaces old CLI console) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <Tilt3D maxTilt={5} scale={1.01}>
          <div className="rounded-3xl bg-white border border-rose/30 shadow-card-light p-6 sm:p-10 overflow-hidden relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-rose/20 mb-8">
              <div>
                <div className="flex items-center gap-2 text-cognac font-mono text-xs uppercase tracking-widest font-bold mb-1">
                  <GitBranch className="w-4 h-4 text-ochre" />
                  <span>Deployment Protocol</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#231215] tracking-tight">
                  Continuous Delivery &amp; Verification Lifecycle
                </h3>
              </div>

              <Link
                to="/cloud"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cognac hover:text-ochre transition-colors"
              >
                <span>Explore Full Infrastructure Architecture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 4 Pipeline Stages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {[
                {
                  step: '01',
                  title: 'Automated Commit Gate',
                  subtitle: 'GitHub Actions CI',
                  desc: 'Unit & integration test suites execute in isolated ephemeral runners with strict pull request approval checks.',
                  color: '#A2574F',
                },
                {
                  step: '02',
                  title: 'Security & CVE Audit',
                  subtitle: 'Aqua Trivy Scanner',
                  desc: 'Static application security testing and container base-image vulnerability scans enforcing zero critical/high CVEs.',
                  color: '#E68057',
                },
                {
                  step: '03',
                  title: 'Immutable Packaging',
                  subtitle: 'Docker Multi-Stage',
                  desc: 'Hardened rootless container builds with minimal attack surfaces and cryptographically signed image digests.',
                  color: '#BF7587',
                },
                {
                  step: '04',
                  title: 'Zero-Downtime Rollout',
                  subtitle: 'Kubernetes Pod Mesh',
                  desc: 'Rolling deployments across availability zones backed by automated health probes, HPA, and instant rollback triggers.',
                  color: '#993A8B',
                },
              ].map((stage, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-sandstone/60 border border-rose/20 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-xs font-mono font-bold px-2 py-0.5 rounded-md text-white"
                        style={{ backgroundColor: stage.color }}
                      >
                        STAGE {stage.step}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>

                    <h4 className="text-base font-display font-bold text-[#231215]">
                      {stage.title}
                    </h4>
                    <p className="text-xs font-mono text-rose font-semibold mt-0.5">
                      {stage.subtitle}
                    </p>

                    <p className="text-xs text-[#5C4448] mt-2.5 font-sans leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-rose/15 flex items-center justify-between text-[11px] font-mono text-[#5C4448]">
                    <span>Status</span>
                    <span className="font-bold text-emerald-700">Verified</span>
                  </div>
                </div>
              ))}
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
                Cloud Architecture
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Replay Cinematic Intro Controller */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPreloader(true)}
        className="fixed bottom-6 right-6 z-30 inline-flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-xl bg-white/90 border border-rose/30 text-cognac font-mono text-xs font-bold shadow-aesthetic-md hover:border-cognac hover:bg-white transition-all select-none"
        title="Replay cinematic intro animation"
      >
        <span className="w-2 h-2 rounded-full bg-ochre animate-pulse" />
        <span>Replay Intro ↺</span>
      </motion.button>
    </div>
  );
};
