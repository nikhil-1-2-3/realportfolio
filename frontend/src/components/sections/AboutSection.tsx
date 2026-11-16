import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Compass, Layers, GitPullRequest, Code, Image as ImageIcon } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [showPhoto, setShowPhoto] = useState(true);

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-theme-border bg-theme-base">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="02. ABOUT ME"
          title="The Person Behind the Work"
          description="How curiosity for full-stack architecture evolved into a disciplined passion for resilient, automated cloud systems."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Narrative Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-theme-muted text-base leading-relaxed font-sans">
            <p className="text-lg text-theme-main font-sans font-semibold leading-relaxed">
              I am a developer who believes software should be as resilient in production as it is elegant in architecture—from the initial database transaction to the containerized pod orchestrating workloads across the cloud.
            </p>

            <p>
              My journey began with hands-on full-stack engineering, building complete MERN platforms, real-time messaging services with Socket.io, and relational systems in MySQL and PostgreSQL. As these applications grew in complexity, I found myself drawn to the operational side of engineering: <strong className="text-theme-main font-semibold">How do we guarantee zero downtime? How can deployments be automated safely? How do we monitor health before an incident occurs?</strong>
            </p>

            <p>
              That curiosity drove me into cloud computing, containerization, and DevOps. I dedicated myself to mastering <span className="text-apricot font-mono font-medium">Docker</span>, <span className="text-plum font-mono font-medium">Kubernetes</span>, <span className="text-cognac font-mono font-medium">Terraform</span>, and <span className="text-rose font-mono font-medium">automated CI/CD pipelines</span> across GitHub Actions, Jenkins, and GitLab. Rather than treating infrastructure as an afterthought, I treat infrastructure as code—reproducible, observable, and automated.
            </p>

            {/* Core Architectural Pillars in the 4 Palette Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border shadow-sand-sm card-shading hover:card-shading-hover transition-all duration-300">
                <div className="flex items-center gap-2.5 text-theme-main font-sans font-bold text-base mb-1.5">
                  <div className="p-2 rounded-lg bg-cognac/15 text-cognac">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span>Problem-Solving Mindset</span>
                </div>
                <p className="text-xs text-theme-muted leading-relaxed font-sans">
                  Solving real constraints: concurrency locks, real-time sync, and eliminating manual deployment friction.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border shadow-sand-sm card-shading hover:card-shading-hover transition-all duration-300">
                <div className="flex items-center gap-2.5 text-theme-main font-sans font-bold text-base mb-1.5">
                  <div className="p-2 rounded-lg bg-apricot/15 text-apricot">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span>Real-World Construction</span>
                </div>
                <p className="text-xs text-theme-muted leading-relaxed font-sans">
                  Engineering complete, working systems with persistent databases and automated rollouts over toy tutorials.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border shadow-sand-sm card-shading hover:card-shading-hover transition-all duration-300">
                <div className="flex items-center gap-2.5 text-theme-main font-sans font-bold text-base mb-1.5">
                  <div className="p-2 rounded-lg bg-rose/15 text-rose">
                    <GitPullRequest className="w-4 h-4" />
                  </div>
                  <span>Automation First</span>
                </div>
                <p className="text-xs text-theme-muted leading-relaxed font-sans">
                  Eliminating toil via CI/CD pipelines, container vulnerability scanning (Aqua Trivy), and declarative Terraform.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border shadow-sand-sm card-shading hover:card-shading-hover transition-all duration-300">
                <div className="flex items-center gap-2.5 text-theme-main font-sans font-bold text-base mb-1.5">
                  <div className="p-2 rounded-lg bg-plum/15 text-plum">
                    <Code className="w-4 h-4" />
                  </div>
                  <span>Continuous Learning</span>
                </div>
                <p className="text-xs text-theme-muted leading-relaxed font-sans">
                  Deepening foundations across DSA, Linux internals, network policies, and telemetry like Prometheus.
                </p>
              </div>
            </div>
          </div>

          {/* Profile Card & Technical Dossier (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-theme-surface rounded-2xl border border-theme-border p-6 card-shading relative overflow-hidden">
              {/* Photo Container */}
              <div className="relative mb-6 rounded-xl overflow-hidden bg-theme-elevated border border-theme-border aspect-[4/3] flex items-center justify-center shadow-inner">
                {showPhoto && PERSONAL_INFO.profileImg ? (
                  <motion.img
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.4 }}
                    src={PERSONAL_INFO.profileImg}
                    alt="Nikhil Singh Subhash"
                    className="w-full h-full object-cover object-top"
                    onError={() => setShowPhoto(false)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-theme-muted">
                    <Terminal className="w-12 h-12 text-theme-accent/40 mb-2" />
                    <span className="font-mono text-xs text-theme-muted">
                      Singh Nikhil Subhash // Developer
                    </span>
                  </div>
                )}

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => setShowPhoto(!showPhoto)}
                    className="p-1.5 rounded-lg bg-theme-surface/90 backdrop-blur-md border border-theme-border text-theme-muted hover:text-theme-main text-[11px] font-mono flex items-center gap-1.5 shadow-sand-sm transition-colors"
                    title="Toggle photo view"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{showPhoto ? 'Photo' : 'Placeholder'}</span>
                  </button>
                </div>
              </div>

              {/* Dossier Metadata */}
              <div className="space-y-3 font-mono text-xs border-t border-theme-border/60 pt-4 text-theme-muted">
                <div className="flex justify-between items-center py-1 border-b border-theme-border/30">
                  <span className="text-theme-muted">Professional Role:</span>
                  <span className="text-theme-main font-bold">Full Stack & DevOps</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-theme-border/30">
                  <span className="text-theme-muted">Degree:</span>
                  <span className="text-theme-main">B.Tech CSE (2023 - 2027)</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-theme-border/30">
                  <span className="text-theme-muted">Current Standing:</span>
                  <span className="text-theme-accent font-bold">8.5 / 10 CGPA</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-theme-border/30">
                  <span className="text-theme-muted">Location:</span>
                  <span className="text-theme-main">{PERSONAL_INFO.location}</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-theme-muted">Status:</span>
                  <span className="text-emerald-500 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Open for Work
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
