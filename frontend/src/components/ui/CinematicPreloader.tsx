import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicPreloaderProps {
  onComplete: () => void;
}

const BOOT_STAGES = [
  { threshold: 0, text: 'INITIALIZING ARCHITECTURAL DOSSIER' },
  { threshold: 22, text: 'HYDRATING AWS MULTI-AZ VPC & EKS MESH' },
  { threshold: 48, text: 'VERIFYING DOCKER MYSQL 8 PERSISTENCE (:3307)' },
  { threshold: 72, text: 'AUDITING TRIVY DEVSECOPS GATES (0-CVE)' },
  { threshold: 92, text: 'SYSTEM VERIFIED // WELCOME TO DOSSIER' },
];

export const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState(BOOT_STAGES[0].text);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Dynamic non-linear acceleration for natural high-tech feel
      const increment = Math.max(1, Math.floor(Math.random() * 4) + 1);
      current = Math.min(100, current + increment);
      setProgress(current);

      const matchingStage = [...BOOT_STAGES].reverse().find((s) => current >= s.threshold);
      if (matchingStage) {
        setStageText(matchingStage.text);
      }

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 850); // allow curtain exit animation to finish
        }, 300);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.85,
              ease: [0.77, 0, 0.175, 1], // luxury architectural ease
            },
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-[#1A0D12] text-[#FAF6F0] overflow-hidden select-none cursor-wait"
        >
          {/* Subtle Ambient Background Halos in the 4 Palette Colors */}
          <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#993A8B]/15 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#E68057]/15 blur-[120px]" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#A2574F]/10 blur-[140px]" />

          {/* Top Bar: Monogram & Location Coordinates */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#FAF6F0]/70 border-b border-[#FAF6F0]/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E68057] animate-pulse" />
              <span className="font-bold tracking-wider text-[#FAF6F0]">SINGH NIKHIL SUBHASH</span>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-[11px] tracking-widest text-[#FAF6F0]/60">
              <span>GUJARAT, IN [21.17° N]</span>
              <span>•</span>
              <span className="text-[#E68057]">PORTFOLIO RUNTIME v2.6</span>
            </div>
          </div>

          {/* Centerpiece: Monumental Kinetic Counter & Architectural Lockup */}
          <div className="relative z-10 max-w-5xl mx-auto w-full my-auto py-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              {/* Giant Numeric Counter */}
              <div className="flex items-baseline">
                <span className="font-display font-black text-7xl sm:text-9xl md:text-[10rem] lg:text-[11.5rem] tracking-tighter text-[#FAF6F0] leading-none">
                  {progress < 10 ? `0${progress}` : progress}
                </span>
                <span className="font-mono text-2xl sm:text-4xl text-[#E68057] font-bold ml-2">
                  %
                </span>
              </div>

              {/* Technical Stage Readout */}
              <div className="text-left md:text-right max-w-md pb-2">
                <div className="text-[11px] font-mono tracking-widest text-[#FAF6F0]/40 uppercase mb-1">
                  STAGE PROTOCOL
                </div>
                <div className="text-xs sm:text-sm font-mono text-[#E68057] font-semibold tracking-wide h-6">
                  {stageText}
                </div>
              </div>
            </div>

            {/* 4-Color Luxury Progress Gauge */}
            <div className="relative w-full h-1.5 sm:h-2 rounded-full bg-[#FAF6F0]/10 overflow-hidden">
              <motion.div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#993A8B] via-[#A2574F] via-[#E68057] to-[#BF7587] rounded-full shadow-[0_0_16px_rgba(230,128,87,0.5)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Micro 4-Color Bead Indicators */}
            <div className="flex items-center justify-between text-[10px] font-mono text-[#FAF6F0]/40 mt-3">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A2574F]" />
                #A2574F
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E68057]" />
                #E68057
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BF7587]" />
                #BF7587
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#993A8B]" />
                #993A8B
              </span>
            </div>
          </div>

          {/* Bottom Bar: Status Strip */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#FAF6F0]/50 border-t border-[#FAF6F0]/10 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E68057]" />
              <span>SYSTEM: K8S • DOCKER • AWS • REACT 19</span>
            </div>

            <div className="text-[11px] uppercase tracking-wider text-[#FAF6F0]/40">
              CLICK OR WAIT TO SKIP
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
