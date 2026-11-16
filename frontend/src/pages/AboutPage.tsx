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
        <div className="lg:col-span-7 space-y-5 text-[#544452] text-base leading-relaxed font-sans font-medium">
          <p className="text-lg text-[#1E101B] font-sans font-bold leading-relaxed">
            I am a software engineer who believes systems should be as resilient in production as they are elegant in architecture—from the initial database transaction to the containerized pod orchestrating workloads across the cloud.
          </p>

          <p>
            My journey began with hands-on full-stack engineering, building complete MERN platforms, real-time messaging services with Socket.io, and relational systems in MySQL and PostgreSQL. As these applications grew in complexity, I found myself drawn to the operational side of engineering: <strong className="text-[#1E101B] font-bold">How do we guarantee zero downtime? How can deployments be automated safely? How do we monitor health before an incident occurs?</strong>
          </p>

          <p>
            That curiosity drove me into cloud computing, containerization, and DevOps. I dedicated myself to mastering <span className="text-cognac font-mono font-bold">Docker</span>, <span className="text-ochre font-mono font-bold">Kubernetes</span>, <span className="text-rose font-mono font-bold">Terraform</span>, and <span className="text-mulberry font-mono font-bold">automated CI/CD pipelines</span> across GitHub Actions, Jenkins, and GitLab. Rather than treating infrastructure as an afterthought, I treat infrastructure as code—reproducible, observable, and automated.
          </p>

          {/* Core Architectural Pillars in the 4 Palette Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {/* Pillar 1: Cognac #A2574F */}
            <div className="p-5 rounded-2xl bg-white border border-rose/25 shadow-card-light hover:border-cognac/40 hover:shadow-card-hover transition-all duration-300 group">
              <div className="flex items-center gap-2.5 text-[#231215] font-sans font-bold text-base mb-1.5">
                <div className="p-2.5 rounded-xl bg-cognac/10 text-cognac group-hover:bg-cognac group-hover:text-white transition-colors border border-cognac/25">
                  <Compass className="w-4 h-4" />
                </div>
                <span>Problem-Solving Mindset</span>
              </div>
              <p className="text-xs text-[#5C4448] leading-relaxed font-sans">
                Solving real engineering constraints: concurrency locks, race conditions, and eliminating manual deployment friction.
              </p>
            </div>

            {/* Pillar 2: Ochre #E68057 */}
            <div className="p-5 rounded-2xl bg-white border border-rose/25 shadow-card-light hover:border-ochre/40 hover:shadow-card-hover transition-all duration-300 group">
              <div className="flex items-center gap-2.5 text-[#231215] font-sans font-bold text-base mb-1.5">
                <div className="p-2.5 rounded-xl bg-ochre/15 text-ochre group-hover:bg-ochre group-hover:text-white transition-colors border border-ochre/25">
                  <Layers className="w-4 h-4" />
                </div>
                <span>Real-World Construction</span>
              </div>
              <p className="text-xs text-[#5C4448] leading-relaxed font-sans">
                Engineering complete, working systems with persistent databases and automated rollouts over toy tutorials.
              </p>
            </div>

            {/* Pillar 3: Dusty Rose #BF7587 */}
            <div className="p-5 rounded-2xl bg-white border border-rose/25 shadow-card-light hover:border-rose/50 hover:shadow-card-hover transition-all duration-300 group">
              <div className="flex items-center gap-2.5 text-[#231215] font-sans font-bold text-base mb-1.5">
                <div className="p-2.5 rounded-xl bg-rose/15 text-rose group-hover:bg-rose group-hover:text-white transition-colors border border-rose/30">
                  <GitPullRequest className="w-4 h-4" />
                </div>
                <span>Automation First</span>
              </div>
              <p className="text-xs text-[#5C4448] leading-relaxed font-sans">
                Eliminating toil via CI/CD pipelines, container vulnerability scanning (Aqua Trivy), and declarative Terraform.
              </p>
            </div>

            {/* Pillar 4: Mulberry #993A8B */}
            <div className="p-5 rounded-2xl bg-white border border-rose/25 shadow-card-light hover:border-mulberry/40 hover:shadow-card-hover transition-all duration-300 group">
              <div className="flex items-center gap-2.5 text-[#231215] font-sans font-bold text-base mb-1.5">
                <div className="p-2.5 rounded-xl bg-mulberry/10 text-mulberry group-hover:bg-mulberry group-hover:text-white transition-colors border border-mulberry/25">
                  <Code className="w-4 h-4" />
                </div>
                <span>Continuous Learning</span>
              </div>
              <p className="text-xs text-[#5C4448] leading-relaxed font-sans">
                Deepening foundations across DSA, Linux internals, network policies, and telemetry like Prometheus.
              </p>
            </div>
          </div>
        </div>

        {/* Profile Card & Technical Dossier (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-rose/30 p-6 shadow-card-light relative overflow-hidden backdrop-blur-xl">
            {/* Photo Container with Warm Aesthetic Duotone Filter (eliminates cold neon) */}
            <div className="relative mb-6 rounded-xl overflow-hidden bg-[#FAF4EC] border border-rose/25 aspect-[4/3] flex items-center justify-center shadow-inner group">
              {showPhoto && PERSONAL_INFO.profileImg ? (
                <>
                  <motion.img
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.4 }}
                    src={PERSONAL_INFO.profileImg}
                    alt="Nikhil Singh Subhash"
                    className="w-full h-full object-cover object-top filter grayscale contrast-110 sepia-[0.35]"
                    onError={() => setShowPhoto(false)}
                  />
                  {/* Warm Egyptian Sandstone & Cognac Gradient Sheen */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#993A8B]/30 via-[#A2574F]/25 to-[#E68057]/20 mix-blend-color" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#231215]/40 via-transparent to-transparent" />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center text-[#5C4448]">
                  <Terminal className="w-12 h-12 text-cognac mb-2" />
                  <span className="font-mono text-xs font-bold text-[#231215]">
                    Singh Nikhil Subhash // Developer
                  </span>
                </div>
              )}

              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={() => setShowPhoto(!showPhoto)}
                  className="p-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-rose/30 text-[#231215] hover:text-cognac text-[11px] font-mono flex items-center gap-1.5 shadow-aesthetic-sm transition-colors"
                  title="Toggle photo view"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-cognac" />
                  <span>{showPhoto ? 'Photo' : 'Placeholder'}</span>
                </button>
              </div>
            </div>

            {/* Dossier Metadata Rows */}
            <div className="space-y-3 font-mono text-xs border-t border-rose/20 pt-4 text-[#5C4448]">
              <div className="flex justify-between items-center py-1 border-b border-rose/10">
                <span className="text-[#8A6E73]">Professional Role:</span>
                <span className="text-[#231215] font-bold">Full Stack & DevOps</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-rose/10">
                <span className="text-[#8A6E73]">Degree:</span>
                <span className="text-[#231215]">B.Tech CSE (2023 - 2027)</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-rose/10">
                <span className="text-[#8A6E73]">Current Standing:</span>
                <span className="text-cognac font-bold">8.5 / 10 CGPA</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-rose/10">
                <span className="text-[#8A6E73]">Location:</span>
                <span className="text-[#231215]">{PERSONAL_INFO.location}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-[#8A6E73]">Status:</span>
                <span className="text-ochre font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-ochre animate-pulse" />
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
