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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`mb-12 md:mb-16 ${
        isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'
      } ${className}`}
    >
      {/* Antique Sandstone Eyebrow Tag */}
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-900/[0.06] border border-amber-900/15 text-amber-900 font-mono text-xs uppercase tracking-widest mb-4 shadow-sand-sm ${
          isCenter ? 'mx-auto' : ''
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-700 shadow-sm" />
        <span>{eyebrow}</span>
      </div>

      {/* Main Title with Editorial Serif Grandeur */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-stone-900 leading-tight">
        {title}
      </h2>

      {/* Narrative Subtitle */}
      {description && (
        <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed font-sans font-normal">
          {description}
        </p>
      )}
    </motion.div>
  );
};
