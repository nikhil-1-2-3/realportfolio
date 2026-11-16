import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cloud, Layers, ShieldCheck, ExternalLink, Github, Cpu, Sparkles } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { Button } from '../components/ui/Button';
import { HeroParticleCanvas } from '../components/ui/HeroParticleCanvas';
import { LiveTelemetryTicker } from '../components/ui/LiveTelemetryTicker';

export const HomePage: React.FC = () => {
  // Top 3 Featured Work
  const featuredProjects: Project[] = PROJECTS_DATA.slice(0, 3);

  return (
    <div className="relative min-h-screen pt-28 pb-16 overflow-hidden">
      {/* Background Particle Canvas */}
      <HeroParticleCanvas />

      {/* Atmospheric Glowing Wine & Mint Ambient Halos */}
      <div
        className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[750px] h-[420px] bg-gradient-to-tr from-wine/25 via-lavender/15 to-mint/20 blur-[130px] -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 left-1/4 -translate-x-1/2 w-[420px] h-[300px] bg-wine/30 blur-[120px] -z-10"
        aria-hidden="true"
      />

      {/* Hero Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#130A15]/90 border border-mint/40 shadow-glow-mint backdrop-blur-xl mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-mint shadow-sm" />
          </span>
          <span className="text-xs font-mono font-bold text-mint tracking-wide">
            Available for Full Stack & Cloud / DevOps Roles
          </span>
        </div>

        {/* Clean, Massive Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold tracking-tight text-white leading-[1.05]">
          Singh Nikhil{' '}
          <span className="text-gradient-mint drop-shadow-sm">
            Subhash
          </span>
        </h1>

        {/* Crisp Subtitle */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-base sm:text-2xl font-sans font-bold text-[#D4CDD7]">
          <span className="text-mint">Full Stack Developer</span>
          <span className="text-lavender">•</span>
          <span className="text-ice">Cloud Architect</span>
          <span className="text-lavender">•</span>
          <span className="text-teal">DevOps Automation</span>
        </div>

        {/* Punchy Tagline */}
        <p className="mt-4 text-base sm:text-lg text-[#D4CDD7] max-w-2xl mx-auto leading-relaxed font-sans font-medium">
          Architecting scalable distributed web platforms, containerized Kubernetes microservices, and automated zero-downtime CI/CD infrastructure.
        </p>

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
              leftIcon={<Cloud className="w-4 h-4 text-mint" />}
            >
              Cloud & Workstation Console
            </Button>
          </Link>

          <Link to="/contact">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Sparkles className="w-4 h-4 text-ice" />}
            >
              Get in Touch
            </Button>
          </Link>
        </div>

        {/* Clean Metrics Ribbon */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-[#130A15]/85 border border-lavender/25 shadow-card-dark backdrop-blur-md">
            <div className="text-2xl font-display font-extrabold text-mint">9+</div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4CDD7] mt-0.5">Production Projects</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#130A15]/85 border border-lavender/25 shadow-card-dark backdrop-blur-md">
            <div className="text-2xl font-display font-extrabold text-teal">AWS & K8s</div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4CDD7] mt-0.5">Cloud Architecture</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#130A15]/85 border border-lavender/25 shadow-card-dark backdrop-blur-md">
            <div className="text-2xl font-display font-extrabold text-ice">Zero-CVE</div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4CDD7] mt-0.5">DevSecOps Pipelines</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#130A15]/85 border border-lavender/25 shadow-card-dark backdrop-blur-md">
            <div className="text-2xl font-display font-extrabold text-white">8.5 / 10</div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4CDD7] mt-0.5">B.Tech CSE Standing</div>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#130A15] border border-mint/30 text-mint font-mono text-xs uppercase tracking-widest font-bold mb-3 shadow-glow-mint">
              <span className="w-2 h-2 rounded-full bg-mint" />
              <span>Featured Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Selected Projects
            </h2>
            <p className="text-sm text-[#D4CDD7] mt-1 font-sans">
              Hand-picked full-stack systems and containerized infrastructure architectures.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-mono font-bold text-mint hover:text-white transition-colors"
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
              className="bg-[#130A15] border border-lavender/25 rounded-2xl p-6 shadow-card-dark hover:border-mint/60 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#1C0F1E] text-ice border border-lavender/30 uppercase tracking-widest font-semibold">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-mint" />
                    <span className="text-[10px] font-mono text-mint font-bold uppercase">Production Ready</span>
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold text-white group-hover:text-mint transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-[#D4CDD7] mt-2.5 font-sans leading-relaxed line-clamp-3">
                  {project.shortDescription}
                </p>

                {/* Tech Chips */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-[#1B0E1E] text-[#D4CDD7] border border-lavender/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2 py-1 text-[10px] font-mono rounded-lg bg-[#1B0E1E] text-mint border border-mint/30">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-lavender/15 flex items-center justify-between">
                {(project.githubUrl || project.gitlabUrl) && (
                  <a
                    href={project.githubUrl || project.gitlabUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4CDD7] hover:text-white transition-colors"
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
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-mint hover:underline"
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

      {/* Core Engineering Disciplines Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#130A15] border border-lavender/30 text-ice font-mono text-xs uppercase tracking-widest font-bold mb-3">
            <span>Core Disciplines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Architectural Focus Areas
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pillar 1: Mint */}
          <div className="p-6 rounded-2xl bg-[#130A15] border border-mint/30 shadow-card-dark hover:border-mint transition-all group">
            <div className="p-3 rounded-xl bg-mint/15 text-mint border border-mint/30 w-fit mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-display font-bold text-white">Full Stack Engineering</h3>
            <p className="text-xs text-[#D4CDD7] mt-2 font-sans leading-relaxed">
              Complete responsive web platforms, REST APIs, Socket.io real-time websockets, and relational MySQL schemas.
            </p>
          </div>

          {/* Pillar 2: Teal */}
          <div className="p-6 rounded-2xl bg-[#130A15] border border-teal/30 shadow-card-dark hover:border-teal transition-all group">
            <div className="p-3 rounded-xl bg-teal/15 text-teal border border-teal/30 w-fit mb-4 group-hover:scale-110 transition-transform">
              <Cloud className="w-5 h-5" />
            </div>
            <h3 className="text-base font-display font-bold text-white">Cloud & Kubernetes</h3>
            <p className="text-xs text-[#D4CDD7] mt-2 font-sans leading-relaxed">
              Multi-AZ AWS architecture, Docker containers, Kubernetes deployments, and declarative Terraform IaC.
            </p>
          </div>

          {/* Pillar 3: Ice */}
          <div className="p-6 rounded-2xl bg-[#130A15] border border-ice/30 shadow-card-dark hover:border-ice transition-all group">
            <div className="p-3 rounded-xl bg-ice/15 text-ice border border-ice/30 w-fit mb-4 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-display font-bold text-white">CI/CD Automation</h3>
            <p className="text-xs text-[#D4CDD7] mt-2 font-sans leading-relaxed">
              GitHub Actions & Jenkins pipelines, automated testing, canary deployments, and zero-downtime rollouts.
            </p>
          </div>

          {/* Pillar 4: Wine */}
          <div className="p-6 rounded-2xl bg-[#130A15] border border-wine/40 shadow-card-dark hover:border-wine transition-all group">
            <div className="p-3 rounded-xl bg-wine/25 text-white border border-wine/50 w-fit mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-display font-bold text-white">DevSecOps & Telemetry</h3>
            <p className="text-xs text-[#D4CDD7] mt-2 font-sans leading-relaxed">
              Aqua Trivy vulnerability scanning, Prometheus metrics collection, Grafana dashboards, and rate limiting.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-wine/40 via-[#130A15] to-[#1C0F1E] border border-mint/30 shadow-card-dark overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-mint font-bold">
              Initiate Collaboration
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1.5">
              Ready to architect something resilient?
            </h3>
            <p className="text-xs sm:text-sm text-[#D4CDD7] mt-2 font-sans">
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
