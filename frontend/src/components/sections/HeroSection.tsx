import React from 'react';
import { motion } from 'framer-motion';
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

  return (
    <section
      id="home"
      className="relative min-h-[96vh] flex flex-col justify-between pt-28 pb-0 px-4 sm:px-6 lg:px-8 overflow-hidden bg-egyptian-grid"
    >
      {/* Dynamic Luminous Particle & Laser Canvas */}
      <HeroParticleCanvas />

      {/* Atmospheric Egyptian Warm Halos */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[400px] bg-gradient-to-tr from-apricot/20 via-rose/15 to-plum/20 blur-[120px] -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 left-1/4 -translate-x-1/2 w-[380px] h-[280px] bg-cognac/15 blur-[100px] -z-10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center my-auto relative z-10">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-cognac/30 shadow-egyptian-sm backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-apricot opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-apricot shadow-sm" />
            </span>
            <span className="text-xs font-mono font-bold text-[#1F151B] tracking-wide">
              Available for Full Stack & Cloud / DevOps Roles
            </span>
          </div>
        </motion.div>

        {/* Hero Identity & Modern Headline */}
        <div className="space-y-3 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-[#1F151B] leading-[1.05]">
            Singh Nikhil{' '}
            <span className="text-gradient-palette drop-shadow-sm">
              Subhash
            </span>
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-base sm:text-2xl font-sans font-bold text-[#5C4B56]">
            <span className="text-cognac">Full Stack Developer</span>
            <span className="text-apricot">•</span>
            <span className="text-plum">Cloud Architect</span>
            <span className="text-rose">•</span>
            <span className="text-cognac">DevOps Automation</span>
          </div>

          <p className="text-sm sm:text-base text-[#5C4B56] max-w-2xl mx-auto leading-relaxed font-sans font-medium">
            Engineering high-concurrency web applications, containerized Kubernetes microservices, and automated zero-downtime CI/CD infrastructure.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
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
            className="inline-flex items-center justify-center font-sans font-bold text-sm px-4 py-2.5 gap-2 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF4EF] text-[#1F151B] border border-cognac/30 hover:border-apricot transition-all shadow-egyptian-sm"
          >
            <Download className="w-4 h-4 text-rose" />
            <span>Resume (PDF)</span>
          </motion.a>
        </div>

        {/* Interactive Balanced Workstation Console (Centerpiece) */}
        <div className="w-full mt-9">
          <InteractiveTerminalHero />
        </div>

        {/* Symmetrical 3-Pillar Highlight Grid in the 4 Colors */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl text-left">
          {/* Pillar 1: Apricot */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-apricot/40 shadow-egyptian-sm flex items-start gap-3 backdrop-blur-md hover:border-apricot hover:shadow-egyptian-md transition-all group">
            <div className="p-2.5 rounded-lg bg-apricot/15 text-apricot shrink-0 border border-apricot/30 group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[#1F151B] uppercase tracking-wider">Full Stack Platforms</div>
              <div className="text-xs text-[#5C4B56] mt-1 font-sans leading-relaxed">
                9 production applications built with React, Node.js, Express & relational MySQL/MongoDB.
              </div>
            </div>
          </div>

          {/* Pillar 2: Plum */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-plum/40 shadow-egyptian-sm flex items-start gap-3 backdrop-blur-md hover:border-plum hover:shadow-egyptian-md transition-all group">
            <div className="p-2.5 rounded-lg bg-plum/15 text-plum shrink-0 border border-plum/30 group-hover:scale-105 transition-transform">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[#1F151B] uppercase tracking-wider">Cloud Infrastructure</div>
              <div className="text-xs text-[#5C4B56] mt-1 font-sans leading-relaxed">
                Multi-AZ AWS architecture, Docker containers, Kubernetes orchestration & Terraform IaC.
              </div>
            </div>
          </div>

          {/* Pillar 3: Cognac & Rose */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-cognac/40 shadow-egyptian-sm flex items-start gap-3 backdrop-blur-md hover:border-cognac hover:shadow-egyptian-md transition-all group">
            <div className="p-2.5 rounded-lg bg-cognac/15 text-cognac shrink-0 border border-cognac/30 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[#1F151B] uppercase tracking-wider">CI/CD & DevSecOps</div>
              <div className="text-xs text-[#5C4B56] mt-1 font-sans leading-relaxed">
                GitHub Actions & Jenkins pipelines, Aqua Trivy zero-CVE scanning & Prometheus telemetry.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Continuous Telemetry Marquee Banner */}
      <div className="w-full -mx-4 sm:-mx-6 lg:-mx-8 mt-10">
        <LiveTelemetryTicker />
      </div>
    </section>
  );
};
