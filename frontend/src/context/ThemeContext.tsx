import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'egyptian' | 'obsidian' | 'sunset';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  category: 'Light' | 'Dark' | 'Semi-Dark';
  description: string;
  previewColors: string[];
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'egyptian',
    name: 'Egyptian Alabaster',
    category: 'Light',
    description: 'Sun-baked sandstone, papyrus & warm terracotta shading',
    previewColors: ['#f7f4ed', '#b45309', '#c2410c'],
  },
  {
    id: 'obsidian',
    name: 'Obsidian Cyber',
    category: 'Dark',
    description: 'Deep obsidian space, neon emerald & linear cyan glows',
    previewColors: ['#030712', '#10b981', '#06b6d4'],
  },
  {
    id: 'sunset',
    name: 'Desert Dusk',
    category: 'Semi-Dark',
    description: 'Warm copper, desert dusk bronze & burnished amber',
    previewColors: ['#181210', '#f97316', '#fbbf24'],
  },
];

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  currentThemeConfig: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('nikhil_portfolio_theme') as ThemeMode;
    return saved && ['egyptian', 'obsidian', 'sunset'].includes(saved) ? saved : 'egyptian';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('nikhil_portfolio_theme', theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const currentThemeConfig = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentThemeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

