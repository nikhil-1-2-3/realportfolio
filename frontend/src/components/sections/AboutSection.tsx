import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Compass, Layers, GitPullRequest, Code, Image as ImageIcon } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [showPhoto, setShowPhoto] = useState(true);

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cognac/20 bg-[#0e0910]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="02. ABOUT ME"
          title="The Person Behind the Work"
          description="How hands-on full-stack engineering evolved into a dedicated passion for resilient, automated cloud systems."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Narrative Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-neutral-300 text-base leading-relaxed font-sans">
            <p className="text-lg text-white font-sans font-semibold leading-relaxed">
              I am a developer who believes software should be as resilient in production as it is elegant in architecture—from the initial database transaction to the containerized pod orchestrating workloads across the cloud.
            </p>

            <p>
              My journey began with hands-on full-stack engineering, building complete MERN platforms, real-time messaging services with Socket.io, and relational systems in MySQL and PostgreSQL. As these applications grew in complexity, I found myself drawn to the operational side of engineering: <strong className="text-white font-semibold">How do we guarantee zero downtime? How can deployments be automated safely? How do we monitor health before an incident occurs?</strong>
            </p>

            <p>
              That curiosity drove me into cloud computing, containerization, and DevOps. I dedicated myself to mastering <span className="text-apricot font-mono font-medium">Docker</span>, <span className="text-plum font-mono font-medium">Kubernetes</span>, <span className="text-cognac font-mono font-medium">Terraform</span>, and <span className="text-rose font-mono font-medium">automated CI/CD pipelines</span> across GitHub Actions, Jenkins, and GitLab. Rather than treating infrastructure as an afterthought, I treat infrastructure as code—reproducible, observable, and automated.
            </p>

            {/* Core Architectural Pillars in the 4 Palette Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {/* Pillar 1: Cognac #A2574F */}
              <div className="p-5 rounded-2xl bg-[#170e1a] border border-cognac/35 shadow-glow-cognac hover:border-cognac/70 transition-all duration-300 group">
                <div className="flex items-center gap-2.5 text-white font-sans font-bold text-base mb-1.5">
                  <div className="p-2.5 rounded-xl bg-cognac/20 text-cognac group-hover:bg-cognac group-hover:text-white transition-colors border border-cognac/30">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span>Problem-Solving Mindset</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Solving real engineering constraints: concurrency locks, race conditions, and eliminating manual deployment friction.
                </p>
              </div>

              {/* Pillar 2: Apricot #E68057 */}
              <div className="p-5 rounded-2xl bg-[#170e1a] border border-apricot/35 shadow-glow-apricot hover:border-apricot/70 transition-all duration-300 group">
                <div className="flex items-center gap-2.5 text-white font-sans font-bold text-base mb-1.5">
                  <div className="p-2.5 rounded-xl bg-apricot/20 text-apricot group-hover:bg-apricot group-hover:text-white transition-colors border border-apricot/30">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span>Real-World Construction</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Engineering complete, working systems with persistent databases and automated rollouts over toy tutorials.
                </p>
              </div>

              {/* Pillar 3: Rose #BF7587 */}
              <div className="p-5 rounded-2xl bg-[#170e1a] border border-rose/35 shadow-glow-rose hover:border-rose/70 transition-all duration-300 group">
                <div className="flex items-center gap-2.5 text-white font-sans font-bold text-base mb-1.5">
                  <div className="p-2.5 rounded-xl bg-rose/20 text-rose group-hover:bg-rose group-hover:text-white transition-colors border border-rose/30">
                    <GitPullRequest className="w-4 h-4" />
                  </div>
                  <span>Automation First</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Eliminating toil via CI/CD pipelines, container vulnerability scanning (Aqua Trivy), and declarative Terraform.
                </p>
              </div>

              {/* Pillar 4: Plum #993A8B */}
              <div className="p-5 rounded-2xl bg-[#170e1a] border border-plum/35 shadow-glow-plum hover:border-plum/70 transition-all duration-300 group">
                <div className="flex items-center gap-2.5 text-white font-sans font-bold text-base mb-1.5">
                  <div className="p-2.5 rounded-xl bg-plum/20 text-plum group-hover:bg-plum group-hover:text-white transition-colors border border-plum/30">
                    <Code className="w-4 h-4" />
                  </div>
                  <span>Continuous Learning</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Deepening foundations across DSA, Linux internals, network policies, and telemetry like Prometheus.
                </p>
              </div>
            </div>
          </div>

          {/* Profile Card & Technical Dossier (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#170e1a] rounded-2xl border border-cognac/30 p-6 shadow-card-dark relative overflow-hidden backdrop-blur-xl">
              {/* Photo Container with Glowing Frame */}
              <div className="relative mb-6 rounded-xl overflow-hidden bg-[#201524] border border-apricot/30 aspect-[4/3] flex items-center justify-center shadow-inner">
                {showPhoto && PERSONAL_INFO.profileImg ? (
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={PERSONAL_INFO.profileImg}
                    alt="Nikhil Singh Subhash"
                    className="w-full h-full object-cover object-top"
                    onError={() => setShowPhoto(false)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-neutral-400">
                    <Terminal className="w-12 h-12 text-apricot/50 mb-2" />
                    <span className="font-mono text-xs text-neutral-400">
                      Singh Nikhil Subhash // Developer
                    </span>
                  </div>
                )}

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => setShowPhoto(!showPhoto)}
                    className="p-1.5 rounded-lg bg-[#140d17]/90 backdrop-blur-md border border-cognac/30 text-neutral-300 hover:text-white text-[11px] font-mono flex items-center gap-1.5 shadow-sand-sm transition-colors"
                    title="Toggle photo view"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-apricot" />
                    <span>{showPhoto ? 'Photo' : 'Placeholder'}</span>
                  </button>
                </div>
              </div>

              {/* Dossier Metadata Rows */}
              <div className="space-y-3 font-mono text-xs border-t border-cognac/20 pt-4 text-neutral-300">
                <div className="flex justify-between items-center py-1 border-b border-cognac/10">
                  <span className="text-neutral-400">Professional Role:</span>
                  <span className="text-white font-bold">Full Stack & DevOps</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-cognac/10">
                  <span className="text-neutral-400">Degree:</span>
                  <span className="text-white">B.Tech CSE (2023 - 2027)</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-cognac/10">
                  <span className="text-neutral-400">Current Standing:</span>
                  <span className="text-apricot font-bold">8.5 / 10 CGPA</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-cognac/10">
                  <span className="text-neutral-400">Location:</span>
                  <span className="text-white">{PERSONAL_INFO.location}</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-neutral-400">Status:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
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
