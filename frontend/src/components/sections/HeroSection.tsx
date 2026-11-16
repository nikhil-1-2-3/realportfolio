import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowDown, Mail, Download, Layers, Server, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Button } from '../ui/Button';
import { InteractiveTerminalHero } from '../ui/InteractiveTerminalHero';
import { HeroParticleCanvas } from '../ui/HeroParticleCanvas';
import { LiveTelemetryTicker } from '../ui/LiveTelemetryTicker';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 320,
        damping: 24,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[96vh] flex flex-col justify-between pt-28 pb-0 px-4 sm:px-6 lg:px-8 overflow-hidden bg-theme-pattern"
    >
      {/* Dynamic Luminous Particle & Laser Canvas */}
      <HeroParticleCanvas />

      {/* Atmospheric Radial Palette Mesh Halos */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[450px] bg-gradient-to-tr from-apricot/25 via-rose/20 to-plum/30 blur-[130px] -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 left-1/4 -translate-x-1/2 w-[400px] h-[300px] bg-cognac/20 blur-[120px] -z-10"
        aria-hidden="true"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto w-full flex flex-col items-center text-center my-auto"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#18101c]/90 border border-apricot/30 shadow-glow-apricot backdrop-blur-xl mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-apricot opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-apricot shadow-sm" />
            </span>
            <span className="text-xs font-mono font-medium text-white tracking-wide">
              Available for Full Stack & Cloud / DevOps Roles
            </span>
          </div>
        </motion.div>

        {/* Hero Identity & Modern Headline */}
        <motion.div variants={itemVariants} className="space-y-3 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white leading-[1.05]">
            Singh Nikhil <span className="text-gradient-palette">Subhash</span>
          </h1>

          <p className="text-lg sm:text-2xl font-sans font-semibold text-rose tracking-tight">
            Full Stack Developer & Cloud / DevOps Engineer
          </p>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Architecting production-ready web platforms, containerized Kubernetes microservices, and automated CI/CD pipelines with declarative infrastructure.
          </p>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-wrap items-center justify-center gap-3.5"
        >
          <Button
            variant="primary"
            size="md"
            onClick={() => scrollTo('projects')}
            rightIcon={<ArrowDown className="w-4 h-4" />}
          >
            Explore Projects
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => scrollTo('contact')}
            leftIcon={<Mail className="w-4 h-4 text-apricot" />}
          >
            Get in Touch
          </Button>

          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href={PERSONAL_INFO.resumeUrl}
            download="Nikhil_Singh_Resume.pdf"
            className="inline-flex items-center justify-center font-sans font-semibold text-sm px-4 py-2.5 gap-2 rounded-xl bg-[#1e1422] hover:bg-[#281a2e] text-white border border-rose/30 hover:border-plum transition-all shadow-sand-sm"
          >
            <Download className="w-4 h-4 text-rose" />
            <span>Resume (PDF)</span>
          </motion.a>
        </motion.div>

        {/* Interactive Balanced Workstation Console */}
        <motion.div variants={itemVariants} className="w-full mt-8">
          <InteractiveTerminalHero />
        </motion.div>

        {/* Balanced 3-Pillar Highlight Grid in the 4 Colors */}
        <motion.div
          variants={itemVariants}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl text-left"
        >
          {/* Pillar 1: Apricot */}
          <div className="p-4 rounded-xl bg-[#170f1a]/90 border border-apricot/30 shadow-glow-apricot flex items-start gap-3 backdrop-blur-md hover:border-apricot/60 transition-colors">
            <div className="p-2.5 rounded-lg bg-apricot/20 text-apricot shrink-0 border border-apricot/40">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">Full Stack Platforms</div>
              <div className="text-xs text-neutral-300 mt-1 font-sans leading-relaxed">
                9 production applications built with React, Node.js, Express & MySQL/MongoDB.
              </div>
            </div>
          </div>

          {/* Pillar 2: Plum */}
          <div className="p-4 rounded-xl bg-[#170f1a]/90 border border-plum/30 shadow-glow-plum flex items-start gap-3 backdrop-blur-md hover:border-plum/60 transition-colors">
            <div className="p-2.5 rounded-lg bg-plum/20 text-plum shrink-0 border border-plum/40">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">Cloud Infrastructure</div>
              <div className="text-xs text-neutral-300 mt-1 font-sans leading-relaxed">
                Multi-AZ AWS architecture, Docker containers, Kubernetes orchestration & Terraform IaC.
              </div>
            </div>
          </div>

          {/* Pillar 3: Cognac & Rose */}
          <div className="p-4 rounded-xl bg-[#170f1a]/90 border border-cognac/35 shadow-glow-cognac flex items-start gap-3 backdrop-blur-md hover:border-rose/60 transition-colors">
            <div className="p-2.5 rounded-lg bg-cognac/20 text-rose shrink-0 border border-rose/40">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">CI/CD & DevSecOps</div>
              <div className="text-xs text-neutral-300 mt-1 font-sans leading-relaxed">
                GitHub Actions & Jenkins pipelines, Aqua Trivy zero-CVE scanning & Prometheus telemetry.
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Live Continuous Telemetry Marquee Banner */}
      <div className="w-full -mx-4 sm:-mx-6 lg:-mx-8 mt-10">
        <LiveTelemetryTicker />
      </div>
    </section>
  );
};
