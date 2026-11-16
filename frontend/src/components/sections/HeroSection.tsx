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
    hidden: { opacity: 0, y: 16 },
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
      className="relative min-h-[95vh] flex flex-col justify-between pt-28 pb-0 px-4 sm:px-6 lg:px-8 overflow-hidden bg-theme-pattern"
    >
      {/* Live Interactive Ambient Particle Canvas in Palette Colors */}
      <HeroParticleCanvas />

      {/* Ambient Radial Glow Halo */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-[#E68057]/15 via-[#BF7587]/10 to-[#993A8B]/12 blur-[120px] -z-10"
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-warm-surface border border-cognac/20 shadow-sand-sm backdrop-blur-md mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 shadow-sm" />
            </span>
            <span className="text-xs font-mono font-medium text-warm-ink">
              Available for Full Stack & Cloud / DevOps Roles
            </span>
          </div>
        </motion.div>

        {/* Hero Identity & Modern Headline */}
        <motion.div variants={itemVariants} className="space-y-3 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-warm-ink leading-[1.08]">
            Singh Nikhil <span className="text-gradient-palette">Subhash</span>
          </h1>

          <p className="text-lg sm:text-xl font-sans font-semibold text-warm-muted tracking-tight">
            Full Stack Developer & Cloud / DevOps Engineer
          </p>

          <p className="text-sm sm:text-base text-warm-muted max-w-2xl mx-auto leading-relaxed font-sans">
            Architecting production-ready web platforms, containerized Kubernetes microservices, and automated CI/CD pipelines with declarative infrastructure.
          </p>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
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
            leftIcon={<Mail className="w-4 h-4 text-cognac" />}
          >
            Get in Touch
          </Button>

          <motion.a
            whileHover={{ scale: 1.025, y: -1 }}
            whileTap={{ scale: 0.975 }}
            href={PERSONAL_INFO.resumeUrl}
            download="Nikhil_Singh_Resume.pdf"
            className="inline-flex items-center justify-center font-sans font-semibold text-sm px-4 py-2.5 gap-2 rounded-xl bg-warm-surface hover:bg-warm-hover text-warm-ink border border-cognac/25 transition-all shadow-sand-sm"
          >
            <Download className="w-4 h-4 text-apricot" />
            <span>Resume (PDF)</span>
          </motion.a>
        </motion.div>

        {/* Interactive Balanced Workstation Console */}
        <motion.div variants={itemVariants} className="w-full mt-8">
          <InteractiveTerminalHero />
        </motion.div>

        {/* Balanced 3-Pillar Highlight Grid */}
        <motion.div
          variants={itemVariants}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl text-left"
        >
          <div className="p-4 rounded-xl bg-warm-surface border border-cognac/15 shadow-sand-sm flex items-start gap-3">
            <div className="p-2 rounded-lg bg-apricot/15 text-apricot shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-warm-ink uppercase">Full Stack Platforms</div>
              <div className="text-xs text-warm-muted mt-0.5 font-sans leading-relaxed">
                9 genuine production applications with React, Node.js, Express & MySQL/MongoDB.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-warm-surface border border-cognac/15 shadow-sand-sm flex items-start gap-3">
            <div className="p-2 rounded-lg bg-plum/15 text-plum shrink-0">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-warm-ink uppercase">Cloud Infrastructure</div>
              <div className="text-xs text-warm-muted mt-0.5 font-sans leading-relaxed">
                Multi-AZ AWS architecture, Docker containerization, Kubernetes & Terraform IaC.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-warm-surface border border-cognac/15 shadow-sand-sm flex items-start gap-3">
            <div className="p-2 rounded-lg bg-cognac/15 text-cognac shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-warm-ink uppercase">Automated CI/CD & Reliability</div>
              <div className="text-xs text-warm-muted mt-0.5 font-sans leading-relaxed">
                Automated GitHub Actions, Jenkins pipelines, Aqua Trivy zero-CVE scanning & Prometheus.
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
