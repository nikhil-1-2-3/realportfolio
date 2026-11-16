import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Layers, ShieldCheck, GitBranch, Zap } from 'lucide-react';

interface CodeSnippet {
  id: string;
  icon: typeof Terminal;
  iconColor: string;
  dotColor: string;
  content: React.ReactNode;
  positionClasses: string;
  floatRangeY: [number, number, number];
  duration: number;
  delay: number;
  hideOnMobile?: boolean;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'k8s',
    icon: Terminal,
    iconColor: '#A2574F', // Cognac
    dotColor: 'bg-cognac',
    content: (
      <>
        <span className="text-mulberry font-bold">kubectl</span>{' '}
        <span className="text-[#5C4448]">apply</span>{' '}
        <span className="text-cognac font-semibold">-f</span>{' '}
        <span className="text-ochre font-bold">k8s-mesh.yaml</span>
      </>
    ),
    positionClasses: '-top-8 right-2 lg:right-10',
    floatRangeY: [-6, 6, -6],
    duration: 5.5,
    delay: 0,
    hideOnMobile: true,
  },
  {
    id: 'latency',
    icon: Zap,
    iconColor: '#E68057', // Ochre
    dotColor: 'bg-ochre',
    content: (
      <>
        <span className="text-ochre font-bold">HTTP/2</span>{' '}
        <span className="text-[#5C4448]">200 OK</span>{' '}
        <span className="text-cognac font-bold">• 12ms</span>
      </>
    ),
    positionClasses: '-top-8 left-1 sm:left-4',
    floatRangeY: [5, -5, 5],
    duration: 6,
    delay: 0.5,
    hideOnMobile: true,
  },
  {
    id: 'terraform',
    icon: Layers,
    iconColor: '#993A8B', // Mulberry
    dotColor: 'bg-mulberry',
    content: (
      <>
        <span className="text-mulberry font-bold">terraform</span>{' '}
        <span className="text-[#5C4448]">apply</span>{' '}
        <span className="text-rose font-bold">-auto-approve</span>
      </>
    ),
    positionClasses: 'top-14 right-0 lg:right-4',
    floatRangeY: [6, -8, 6],
    duration: 7,
    delay: 0.8,
    hideOnMobile: true,
  },
  {
    id: 'docker-db',
    icon: Database,
    iconColor: '#E68057', // Ochre
    dotColor: 'bg-ochre',
    content: (
      <>
        <span className="text-ochre font-bold">docker</span>{' '}
        <span className="text-[#5C4448]">run</span>{' '}
        <span className="text-cognac font-bold">:3307</span>{' '}
        <span className="text-rose font-semibold">// mysql-8</span>
      </>
    ),
    positionClasses: 'top-40 right-2 lg:right-10',
    floatRangeY: [-7, 5, -7],
    duration: 6.5,
    delay: 0.4,
    hideOnMobile: true,
  },
  {
    id: 'trivy-scan',
    icon: ShieldCheck,
    iconColor: '#BF7587', // Rose
    dotColor: 'bg-rose',
    content: (
      <>
        <span className="text-rose font-bold">trivy</span>{' '}
        <span className="text-[#5C4448]">scan</span>{' '}
        <span className="text-cognac font-bold">0-CVE [PASS]</span>
      </>
    ),
    positionClasses: 'top-60 right-0 lg:right-6',
    floatRangeY: [6, -6, 6],
    duration: 5.8,
    delay: 1.2,
    hideOnMobile: true,
  },
  {
    id: 'git-deploy',
    icon: GitBranch,
    iconColor: '#A2574F', // Cognac
    dotColor: 'bg-cognac',
    content: (
      <>
        <span className="text-cognac font-bold">git</span>{' '}
        <span className="text-[#5C4448]">push</span>{' '}
        <span className="text-mulberry font-bold">main</span>{' '}
        <span className="text-ochre font-bold">→ prod</span>
      </>
    ),
    positionClasses: '-top-8 left-[38%] hidden xl:flex',
    floatRangeY: [-5, 7, -5],
    duration: 6.8,
    delay: 1.5,
    hideOnMobile: true,
  },
];

export const FloatingGlassCode: React.FC = () => {
  return (
    <>
      {/* Desktop & Tablet Floating Glass Elements positioned around Hero */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {SNIPPETS.map((snippet) => {
          const Icon = snippet.icon;
          return (
            <motion.div
              key={snippet.id}
              animate={{
                y: snippet.floatRangeY,
              }}
              transition={{
                duration: snippet.duration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: snippet.delay,
              }}
              whileHover={{ scale: 1.08, y: -4 }}
              className={`absolute pointer-events-auto hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl backdrop-blur-xl bg-white/85 border border-white/90 shadow-[0_8px_24px_-4px_rgba(162,87,79,0.12),0_2px_6px_rgba(35,17,21,0.04)] hover:shadow-[0_12px_32px_-4px_rgba(162,87,79,0.22)] hover:border-cognac/40 hover:bg-white transition-all duration-300 cursor-default select-none group ${snippet.positionClasses}`}
            >
              {/* Left Accent Glow & Icon */}
              <div
                className="p-1 rounded-lg border shadow-sm group-hover:scale-110 transition-transform"
                style={{
                  backgroundColor: `${snippet.iconColor}14`,
                  borderColor: `${snippet.iconColor}30`,
                }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: snippet.iconColor }} />
              </div>

              {/* Code Text Content */}
              <div className="font-mono text-xs tracking-tight">
                {snippet.content}
              </div>

              {/* Pulsing Status Dot */}
              <span className="relative flex h-1.5 w-1.5 ml-0.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${snippet.dotColor}`} />
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${snippet.dotColor}`} />
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Subtle Glass Ribbon Strip */}
      <div className="flex md:hidden items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none select-none">
        {SNIPPETS.slice(0, 3).map((snippet) => {
          const Icon = snippet.icon;
          return (
            <div
              key={snippet.id}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/85 border border-rose/25 shadow-aesthetic-sm shrink-0 font-mono text-[11px]"
            >
              <Icon className="w-3 h-3" style={{ color: snippet.iconColor }} />
              <div>{snippet.content}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
