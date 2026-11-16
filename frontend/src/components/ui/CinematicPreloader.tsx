import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicPreloaderProps {
  onComplete: () => void;
}

export const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Gentle, smooth, steady progress for an elegant, calm loading rhythm
      current += 2;
      if (current > 100) current = 100;
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 900); // graceful fade duration
        }, 350);
      }
    }, 28); // ~1.4 seconds total smooth loading experience

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -24,
            transition: {
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1], // gentle, silk-smooth transition
            },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#2B1720] text-[#FAF6F0] p-6 select-none"
        >
          {/* Subtle Ambient Matte Glow in Dark Brownish Pink & Ochre */}
          <div className="pointer-events-none absolute w-[500px] h-[500px] rounded-full bg-[#BF7587]/10 blur-[140px]" />
          <div className="pointer-events-none absolute w-[300px] h-[300px] rounded-full bg-[#E68057]/10 blur-[100px]" />

          {/* Centered Refined Architectural Lockup */}
          <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
            {/* Animated Geometric Monogram */}
            <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
              {/* Outer Rotating Hairline Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-2xl border border-[#BF7587]/30 border-dashed"
              />
              {/* Inner Diamond in Cognac/Ochre */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute w-10 h-10 rounded-lg border border-[#E68057]/50 rotate-45"
              />
              {/* Center Dot */}
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#993A8B] via-[#A2574F] to-[#E68057] shadow-[0_0_12px_rgba(230,128,87,0.6)]" />
            </div>

            {/* Subtle Name Title */}
            <div className="font-mono text-xs uppercase tracking-[0.35em] text-[#FAF6F0]/80 font-bold mb-2">
              Singh Nikhil Subhash
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#BF7587] font-medium mb-6">
              Engineering Systems Dossier
            </div>

            {/* Smooth Progress Track */}
            <div className="w-56 h-[3px] bg-[#FAF6F0]/15 rounded-full overflow-hidden relative mb-3">
              <motion.div
                className="absolute top-0 bottom-0 left-0 rounded-full bg-gradient-to-r from-[#993A8B] via-[#A2574F] via-[#E68057] to-[#BF7587]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Calm Percentage Counter */}
            <div className="font-mono text-xs text-[#E68057] font-semibold tracking-widest flex items-center gap-2">
              <span>{progress < 10 ? `0${progress}` : progress}%</span>
              <span className="text-[#FAF6F0]/30">•</span>
              <span className="text-[#FAF6F0]/50 text-[10px]">
                {progress < 40 ? 'Initializing' : progress < 85 ? 'Mounting Mesh' : 'Ready'}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
