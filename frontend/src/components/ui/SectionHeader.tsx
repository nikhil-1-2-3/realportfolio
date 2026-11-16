import React from 'react';

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
    <div
      className={`mb-10 md:mb-14 ${
        isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'
      } ${className}`}
    >
      {/* Eyebrow Badge with Mint Glow */}
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#130A15] border border-mint/40 text-mint font-mono text-xs uppercase tracking-widest font-bold mb-3.5 shadow-glow-mint ${
          isCenter ? 'mx-auto' : ''
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
        <span>{eyebrow}</span>
      </div>

      {/* Main Title with Syne Bold Typography - Pure Crisp White */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white leading-[1.12]">
        {title}
      </h2>

      {/* Narrative Subtitle */}
      {description && (
        <p className="mt-3.5 text-base sm:text-lg text-[#D4CDD7] leading-relaxed font-sans font-normal">
          {description}
        </p>
      )}
    </div>
  );
};
