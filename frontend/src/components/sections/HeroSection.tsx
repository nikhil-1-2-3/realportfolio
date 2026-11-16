import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowDown, Mail, Download, Github, Linkedin, Gitlab, Terminal, Cpu, Layers } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Button } from '../ui/Button';
import { InteractiveTerminalHero } from '../ui/InteractiveTerminalHero';
import { HeroParticleCanvas } from '../ui/HeroParticleCanvas';
import { LiveTelemetryTicker } from '../ui/LiveTelemetryTicker';

const KINETIC_ROLES = [
  'Full Stack Web Platforms',
  'Kubernetes & Cloud Orchestration',
  'Automated CI/CD & DevSecOps',
  'Infrastructure as Code (Terraform)',
];

export const HeroSection: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % KINETIC_ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

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
        staggerChildren: 0.1,
        delayChildren: 0.05,
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
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex flex-col justify-between pt-28 pb-0 px-4 sm:px-6 lg:px-8 overflow-hidden bg-theme-pattern"
    >
      {/* Live Interactive Ambient Particle Canvas */}
      <HeroParticleCanvas />

      {/* Ambient Radial Mesh Halo */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-gradient-to-tr from-amber-500/10 via-orange-500/8 to-cyan-500/8 blur-[130px] -z-10"
        aria-hidden="true"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto w-full flex flex-col items-center text-center my-auto"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-theme-surface border border-theme-border shadow-sand-sm backdrop-blur-md mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-sm" />
            </span>
            <span className="text-xs font-mono font-medium text-theme-muted">
              Available for Full Stack & Cloud / DevOps Roles
            </span>
          </div>
        </motion.div>

        {/* Hero Identity & Grand Headline */}
        <motion.div variants={itemVariants} className="space-y-4 max-w-4xl">
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-theme-subtle font-semibold">
            Full Stack & Cloud Systems Engineer
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-theme-main leading-[1.04]">
            Singh Nikhil <span className="text-gradient-accent">Subhash</span>
          </h1>

          {/* Kinetic Cycling Role Text */}
          <div className="h-9 flex items-center justify-center overflow-hidden">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="text-lg sm:text-2xl font-serif text-theme-subtle max-w-3xl mx-auto font-medium"
            >
              Specializing in {KINETIC_ROLES[roleIndex]}
            </motion.p>
          </div>
        </motion.div>

        {/* Punchy Narrative Headline */}
        <motion.div variants={itemVariants} className="mt-4 max-w-2xl mx-auto">
          <p className="text-base sm:text-lg text-theme-muted font-sans leading-relaxed">
            Building applications. Automating infrastructure. Solving real problems.
          </p>
        </motion.div>

        {/* Tactical Key Metrics Ribbon */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-wrap justify-center items-center gap-3 font-mono text-xs text-theme-main"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-theme-surface border border-theme-border shadow-sand-sm">
            <Terminal className="w-4 h-4 text-theme-accent" />
            <span className="font-medium">MERN & Microservices</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-theme-surface border border-theme-border shadow-sand-sm">
            <Cpu className="w-4 h-4 text-orange-500" />
            <span className="font-medium">Docker & Kubernetes</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-theme-surface border border-theme-border shadow-sand-sm">
            <Layers className="w-4 h-4 text-cyan-500" />
            <span className="font-medium">CI/CD & Terraform IaC</span>
          </div>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollTo('projects')}
            rightIcon={<ArrowDown className="w-4 h-4" />}
          >
            Explore Projects
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => scrollTo('contact')}
            leftIcon={<Mail className="w-4 h-4 text-theme-accent" />}
          >
            Get in Touch
          </Button>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={PERSONAL_INFO.resumeUrl}
            download="Nikhil_Singh_Resume.pdf"
            className="inline-flex items-center justify-center font-mono text-xs font-bold px-5 py-3.5 gap-2 rounded-xl bg-theme-surface hover:bg-theme-hover text-theme-main border border-theme-border transition-all shadow-sand-sm"
          >
            <Download className="w-4 h-4 text-theme-accent" />
            <span>Resume (PDF)</span>
          </motion.a>
        </motion.div>

        {/* Interactive Live DevOps Workstation Window */}
        <motion.div variants={itemVariants} className="w-full">
          <InteractiveTerminalHero />
        </motion.div>

        {/* Social Connect Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-10 pt-6 pb-12 border-t border-theme-border w-full max-w-md flex items-center justify-center gap-6"
        >
          <motion.a
            whileHover={{ scale: 1.1 }}
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-theme-muted hover:text-theme-main transition-colors p-2 rounded-xl hover:bg-theme-surface"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4 text-theme-main" />
            <span>GitHub</span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.1 }}
            href={PERSONAL_INFO.socials.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-theme-muted hover:text-theme-main transition-colors p-2 rounded-xl hover:bg-theme-surface"
            aria-label="GitLab Profile"
          >
            <Gitlab className="w-4 h-4 text-orange-500" />
            <span>GitLab</span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.1 }}
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-theme-muted hover:text-theme-main transition-colors p-2 rounded-xl hover:bg-theme-surface"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4 text-cyan-500" />
            <span>LinkedIn</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Live Continuous Telemetry Marquee Banner */}
      <div className="w-full -mx-4 sm:-mx-6 lg:-mx-8">
        <LiveTelemetryTicker />
      </div>
    </section>
  );
};
