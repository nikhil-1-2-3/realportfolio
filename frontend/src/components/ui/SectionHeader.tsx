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
      {/* Eyebrow Badge with Mulberry / Ochre Accent */}
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-rose/35 text-mulberry font-mono text-xs uppercase tracking-widest font-bold mb-3.5 shadow-aesthetic-sm ${
          isCenter ? 'mx-auto' : ''
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-ochre shadow-sm" />
        <span>{eyebrow}</span>
      </div>

      {/* Main Title with Syne Bold Typography - Deep Crisp Ink */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#231215] leading-[1.12]">
        {title}
      </h2>

      {/* Narrative Subtitle */}
      {description && (
        <p className="mt-3.5 text-base sm:text-lg text-[#5C4448] leading-relaxed font-sans font-medium">
          {description}
        </p>
      )}
    </div>
  );
};
