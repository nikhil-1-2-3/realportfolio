import React, { useState } from 'react';
import { Terminal, Compass, Layers, GitPullRequest, Code, Image as ImageIcon } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [showPhoto, setShowPhoto] = useState(true);

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="02. ABOUT ME"
          title="The Person Behind the Work"
          description="How curiosity for full-stack architecture evolved into a passion for automated, resilient cloud systems."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Narrative Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-base leading-relaxed font-sans">
            <p>
              I am a developer who enjoys understanding how software behaves beyond the local terminal—from the initial database query to the containerized pod serving users across the internet.
            </p>

            <p>
              My journey began with hands-on full-stack engineering, building complete MERN platforms, real-time messaging services with Socket.io, and relational systems in MySQL and PostgreSQL. As these applications grew in complexity, I found myself increasingly drawn to the operational side of engineering: <span className="text-white font-medium">How do we deploy this reliably? How do we prevent downtime during traffic spikes? How can deployments be automated safely?</span>
            </p>

            <p>
              That curiosity drove me into cloud computing, containerization, and DevOps. I dedicated myself to mastering <span className="text-emerald-400 font-mono text-sm">Docker</span>, <span className="text-cyan-400 font-mono text-sm">Kubernetes</span>, <span className="text-indigo-400 font-mono text-sm">Terraform</span>, and <span className="text-white font-mono text-sm">automated CI/CD pipelines</span> across GitHub Actions, Jenkins, and GitLab. Rather than treating infrastructure as an afterthought, I treat infrastructure as code—reproducible, observable, and automated.
            </p>

            {/* Core Approaches Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800">
                <div className="flex items-center gap-2 text-white font-bold text-sm mb-1.5">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>Problem-Solving Mindset</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Focusing on practical constraints: solving concurrency conflicts, structuring clean APIs, and eliminating manual release friction.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800">
                <div className="flex items-center gap-2 text-white font-bold text-sm mb-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Real-World Construction</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Belief that true engineering competence is forged by building full, end-to-end working systems with persistent databases and automated rollouts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800">
                <div className="flex items-center gap-2 text-white font-bold text-sm mb-1.5">
                  <GitPullRequest className="w-4 h-4 text-indigo-400" />
                  <span>Automation First</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Automating repetitive chores through CI/CD pipelines, container security scanning (Aqua Trivy), and declarative Terraform infrastructure.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800">
                <div className="flex items-center gap-2 text-white font-bold text-sm mb-1.5">
                  <Code className="w-4 h-4 text-amber-400" />
                  <span>Continuous Learning</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Constantly strengthening fundamentals across DSA, systems design, Linux internals, and modern cloud telemetry like Prometheus.
                </p>
              </div>
            </div>
          </div>

          {/* Profile Card & Technical Spec (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="bg-[#0d1322] rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
              {/* Optional Photo Container */}
              <div className="relative mb-6 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 aspect-[4/3] flex items-center justify-center">
                {showPhoto && PERSONAL_INFO.profileImg ? (
                  <img
                    src={PERSONAL_INFO.profileImg}
                    alt="Nikhil Singh Subhash"
                    className="w-full h-full object-cover object-top transition-all duration-300 hover:scale-105"
                    onError={() => setShowPhoto(false)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-slate-500">
                    <Terminal className="w-12 h-12 text-emerald-400/40 mb-2" />
                    <span className="font-mono text-xs text-slate-400">
                      Singh Nikhil Subhash // Developer
                    </span>
                  </div>
                )}

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => setShowPhoto(!showPhoto)}
                    className="p-1.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-slate-400 hover:text-white text-[11px] font-mono flex items-center gap-1.5 transition-colors"
                    title="Toggle photo view"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{showPhoto ? 'Photo' : 'Placeholder'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Profile Metadata */}
              <div className="space-y-3 font-mono text-xs border-t border-slate-800/80 pt-4">
                <div className="flex justify-between items-center py-1 border-b border-slate-850">
                  <span className="text-slate-400">Role:</span>
                  <span className="text-slate-200 font-semibold">Full Stack & Cloud/DevOps</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-850">
                  <span className="text-slate-400">Education:</span>
                  <span className="text-slate-200">B.Tech CSE (2023 - 2027)</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-850">
                  <span className="text-slate-400">Academic Score:</span>
                  <span className="text-emerald-400 font-bold">8.5 / 10 CGPA</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-850">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-slate-200">{PERSONAL_INFO.location}</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Open to Opportunities
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

