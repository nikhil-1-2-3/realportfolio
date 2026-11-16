import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`mb-12 md:mb-16 ${
        isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'
      } ${className}`}
    >
      {/* Eyebrow Badge with Palette Gradient Glow */}
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1e1322] border border-apricot/30 text-apricot font-mono text-xs uppercase tracking-widest mb-4 shadow-glow-apricot ${
          isCenter ? 'mx-auto' : ''
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-apricot shadow-sm" />
        <span>{eyebrow}</span>
      </div>

      {/* Main Title with Syne Bold Typography */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white leading-[1.12]">
        {title}
      </h2>

      {/* Narrative Subtitle */}
      {description && (
        <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed font-sans font-normal">
          {description}
        </p>
      )}
    </motion.div>
  );
};
