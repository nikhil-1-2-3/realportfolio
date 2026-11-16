import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Compass, Layers, GitPullRequest, Code, Image as ImageIcon } from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutPage: React.FC = () => {
  const [showPhoto, setShowPhoto] = useState(true);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="ENGINEER DOSSIER"
        title="The Person Behind the Work"
        description="How hands-on full-stack engineering evolved into a dedicated passion for resilient, automated cloud systems."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Narrative Column (7 cols) */}
        <div className="lg:col-span-7 space-y-5 text-[#D4CDD7] text-base leading-relaxed font-sans">
          <p className="text-lg text-white font-sans font-semibold leading-relaxed">
            I am a software engineer who believes systems should be as resilient in production as they are elegant in architecture—from the initial database transaction to the containerized pod orchestrating workloads across the cloud.
          </p>

          <p>
            My journey began with hands-on full-stack engineering, building complete MERN platforms, real-time messaging services with Socket.io, and relational systems in MySQL and PostgreSQL. As these applications grew in complexity, I found myself drawn to the operational side of engineering: <strong className="text-white font-semibold">How do we guarantee zero downtime? How can deployments be automated safely? How do we monitor health before an incident occurs?</strong>
          </p>

          <p>
            That curiosity drove me into cloud computing, containerization, and DevOps. I dedicated myself to mastering <span className="text-mint font-mono font-bold">Docker</span>, <span className="text-teal font-mono font-bold">Kubernetes</span>, <span className="text-ice font-mono font-bold">Terraform</span>, and <span className="text-lavender font-mono font-bold">automated CI/CD pipelines</span> across GitHub Actions, Jenkins, and GitLab. Rather than treating infrastructure as an afterthought, I treat infrastructure as code—reproducible, observable, and automated.
          </p>

          {/* Core Architectural Pillars in the 5 Palette Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {/* Pillar 1: Mint #73EEDC */}
            <div className="p-5 rounded-2xl bg-[#130A15] border border-mint/30 shadow-card-dark hover:border-mint transition-all duration-300 group">
              <div className="flex items-center gap-2.5 text-white font-sans font-bold text-base mb-1.5">
                <div className="p-2.5 rounded-xl bg-mint/15 text-mint group-hover:bg-mint group-hover:text-[#0A050B] transition-colors border border-mint/25">
                  <Compass className="w-4 h-4" />
                </div>
                <span>Problem-Solving Mindset</span>
              </div>
              <p className="text-xs text-[#D4CDD7] leading-relaxed font-sans">
                Solving real engineering constraints: concurrency locks, race conditions, and eliminating manual deployment friction.
              </p>
            </div>

            {/* Pillar 2: Teal #73C2BE */}
            <div className="p-5 rounded-2xl bg-[#130A15] border border-teal/30 shadow-card-dark hover:border-teal transition-all duration-300 group">
              <div className="flex items-center gap-2.5 text-white font-sans font-bold text-base mb-1.5">
                <div className="p-2.5 rounded-xl bg-teal/15 text-teal group-hover:bg-teal group-hover:text-[#0A050B] transition-colors border border-teal/25">
                  <Layers className="w-4 h-4" />
                </div>
                <span>Real-World Construction</span>
              </div>
              <p className="text-xs text-[#D4CDD7] leading-relaxed font-sans">
                Engineering complete, working systems with persistent databases and automated rollouts over toy tutorials.
              </p>
            </div>

            {/* Pillar 3: Ice #90C3C8 */}
            <div className="p-5 rounded-2xl bg-[#130A15] border border-ice/30 shadow-card-dark hover:border-ice transition-all duration-300 group">
              <div className="flex items-center gap-2.5 text-white font-sans font-bold text-base mb-1.5">
                <div className="p-2.5 rounded-xl bg-ice/15 text-ice group-hover:bg-ice group-hover:text-[#0A050B] transition-colors border border-ice/25">
                  <GitPullRequest className="w-4 h-4" />
                </div>
                <span>Automation First</span>
              </div>
              <p className="text-xs text-[#D4CDD7] leading-relaxed font-sans">
                Eliminating toil via CI/CD pipelines, container vulnerability scanning (Aqua Trivy), and declarative Terraform.
              </p>
            </div>

            {/* Pillar 4: Lavender #776885 */}
            <div className="p-5 rounded-2xl bg-[#130A15] border border-lavender/35 shadow-card-dark hover:border-lavender transition-all duration-300 group">
              <div className="flex items-center gap-2.5 text-white font-sans font-bold text-base mb-1.5">
                <div className="p-2.5 rounded-xl bg-lavender/20 text-white group-hover:bg-lavender group-hover:text-white transition-colors border border-lavender/30">
                  <Code className="w-4 h-4" />
                </div>
                <span>Continuous Learning</span>
              </div>
              <p className="text-xs text-[#D4CDD7] leading-relaxed font-sans">
                Deepening foundations across DSA, Linux internals, network policies, and telemetry like Prometheus.
              </p>
            </div>
          </div>
        </div>

        {/* Profile Card & Technical Dossier (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#130A15] rounded-2xl border border-lavender/30 p-6 shadow-card-dark relative overflow-hidden backdrop-blur-xl">
            {/* Photo Container */}
            <div className="relative mb-6 rounded-xl overflow-hidden bg-[#1B0E1E] border border-lavender/25 aspect-[4/3] flex items-center justify-center shadow-inner">
              {showPhoto && PERSONAL_INFO.profileImg ? (
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.3 }}
                  src={PERSONAL_INFO.profileImg}
                  alt="Nikhil Singh Subhash"
                  className="w-full h-full object-cover object-top"
                  onError={() => setShowPhoto(false)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center text-[#D4CDD7]">
                  <Terminal className="w-12 h-12 text-mint mb-2" />
                  <span className="font-mono text-xs font-bold text-white">
                    Singh Nikhil Subhash // Developer
                  </span>
                </div>
              )}

              <div className="absolute top-3 right-3">
                <button
                  onClick={() => setShowPhoto(!showPhoto)}
                  className="p-1.5 rounded-lg bg-[#130A15]/90 backdrop-blur-md border border-lavender/30 text-white hover:text-mint text-[11px] font-mono flex items-center gap-1.5 shadow-card-dark transition-colors"
                  title="Toggle photo view"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-mint" />
                  <span>{showPhoto ? 'Photo' : 'Placeholder'}</span>
                </button>
              </div>
            </div>

            {/* Dossier Metadata Rows */}
            <div className="space-y-3 font-mono text-xs border-t border-lavender/20 pt-4 text-[#D4CDD7]">
              <div className="flex justify-between items-center py-1 border-b border-lavender/10">
                <span className="text-[#8E8295]">Professional Role:</span>
                <span className="text-white font-bold">Full Stack & DevOps</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-lavender/10">
                <span className="text-[#8E8295]">Degree:</span>
                <span className="text-white">B.Tech CSE (2023 - 2027)</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-lavender/10">
                <span className="text-[#8E8295]">Current Standing:</span>
                <span className="text-mint font-bold">8.5 / 10 CGPA</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-lavender/10">
                <span className="text-[#8E8295]">Location:</span>
                <span className="text-white">{PERSONAL_INFO.location}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-[#8E8295]">Status:</span>
                <span className="text-mint font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                  Open for Work
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
