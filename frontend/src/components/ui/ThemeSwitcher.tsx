import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, Sun, Moon, Flame } from 'lucide-react';
import { useTheme, THEMES, ThemeMode } from '../../context/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, currentThemeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getThemeIcon = (id: ThemeMode) => {
    switch (id) {
      case 'obsidian':
        return <Moon className="w-3.5 h-3.5 text-cyan-400" />;
      case 'sunset':
        return <Flame className="w-3.5 h-3.5 text-orange-400" />;
      default:
        return <Sun className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme-border bg-theme-surface hover:bg-theme-hover shadow-sand-sm text-theme-main transition-colors text-xs font-mono"
        aria-label="Switch theme palette"
        aria-expanded={isOpen}
      >
        <Palette className="w-3.5 h-3.5 text-theme-accent" />
        <span className="hidden sm:inline font-sans font-semibold text-xs">{currentThemeConfig.name}</span>
        <span className="flex items-center gap-1 ml-0.5">
          {currentThemeConfig.previewColors.map((color, idx) => (
            <span
              key={idx}
              className="w-2 h-2 rounded-full border border-black/10 shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute right-0 mt-2 w-64 p-2 rounded-2xl border border-theme-border bg-theme-surface/95 backdrop-blur-2xl shadow-sand-xl z-50 overflow-hidden"
          >
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-theme-muted border-b border-theme-border/50 flex justify-between items-center">
              <span>Select Color Palette</span>
              <span>3 Themes</span>
            </div>

            <div className="mt-1 space-y-1">
              {THEMES.map((t) => {
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-theme-accent/10 border border-theme-accent/30 text-theme-main font-bold shadow-sm'
                        : 'hover:bg-theme-hover text-theme-muted hover:text-theme-main'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-theme-base border border-theme-border/60">
                        {getThemeIcon(t.id)}
                      </div>
                      <div>
                        <div className="text-xs font-sans font-semibold flex items-center gap-1.5 text-theme-main">
                          <span>{t.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-theme-base border border-theme-border/40 text-theme-muted font-normal">
                            {t.category}
                          </span>
                        </div>
                        <div className="text-[11px] font-sans text-theme-muted truncate max-w-[130px]">
                          {t.description}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center -space-x-1">
                        {t.previewColors.map((color, idx) => (
                          <span
                            key={idx}
                            className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-theme-accent ml-1" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

