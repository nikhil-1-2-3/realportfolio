import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

interface SystemItem {
  id: string;
  index: string;
  title: string;
  role: string;
  highlight: string;
  activeLayer: number; // 1: Edge, 2: Compute, 3: Persistence
  tags: string[];
  liveUrl?: string;
  githubUrl: string;
}

const SYSTEMS: SystemItem[] = [
  {
    id: 'turfxl',
    index: '01',
    title: 'TurfXL',
    role: 'Distributed Arena Reservation Platform',
    highlight:
      'Real-time WebSocket slot state mutex prevents concurrent double-booking collisions before payment settlement.',
    activeLayer: 2,
    tags: ['React 19', 'Socket.io', 'Node.js', 'Docker', 'MongoDB'],
    liveUrl: 'https://turfbooksystem.vercel.app/',
    githubUrl: 'https://github.com/nikhil-1-2-3/turfbooksystem',
  },
  {
    id: 'vs-transport',
    index: '02',
    title: 'V S Transport',
    role: 'Enterprise Fleet Logistics Architecture',
    highlight:
      'Multi-AZ Kubernetes cluster with decoupled ALB ingress, rolling updates, and containerized MySQL 8 persistence on port 3307.',
    activeLayer: 3,
    tags: ['Kubernetes', 'Docker', 'MySQL 8', 'Express.js', 'CI/CD'],
    liveUrl: 'https://github.com/nikhil-1-2-3/VS-TRANSPORT',
    githubUrl: 'https://github.com/nikhil-1-2-3/VS-TRANSPORT',
  },
  {
    id: 'cloud-infra',
    index: '03',
    title: 'Cloud Core',
    role: 'Declarative Cloud & DevSecOps Matrix',
    highlight:
      'Idempotent Terraform infrastructure automation enforcing Aqua Trivy zero-CVE gates before container registry push.',
    activeLayer: 1,
    tags: ['Terraform IaC', 'Aqua Trivy', 'AWS EKS', 'GitHub Actions'],
    githubUrl: 'https://github.com/nikhil-1-2-3',
  },
];

export const ArchitecturalIsometricCanvas: React.FC = () => {
  const [activeSystemId, setActiveSystemId] = useState<string>('turfxl');
  const [activeLayer, setActiveLayer] = useState<number>(2); // 1 = Edge, 2 = Compute, 3 = Storage
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate mouse tilt coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const selectSystem = (system: SystemItem) => {
    setActiveSystemId(system.id);
    setActiveLayer(system.activeLayer);
  };

  // 3D rotation angles derived from mouse
  const rotateX = -mousePos.y * 14;
  const rotateY = mousePos.x * 18;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex flex-col justify-between select-none text-white pt-2 pb-4"
    >
      {/* Editorial Header Stamp: Directly on dark canvas, NO BOX */}
      <div className="flex items-center justify-between pb-3 border-b border-[#BF7587]/25 text-[11px] font-mono tracking-widest text-[#BF7587]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E68057] animate-pulse" />
          <span className="font-bold text-[#FAF6F0] tracking-[0.2em] uppercase">
            System Topology Blueprint
          </span>
        </div>
        <span className="text-[#BF7587]/70 text-[10px]">
          AP-SOUTH-1 // MULTI-AZ
        </span>
      </div>

      {/* Bespoke Isometric Vector Architectural Schematic: Open 3D Space */}
      <div className="relative my-4 flex items-center justify-center min-h-[260px] perspective-[1200px]">
        <motion.div
          animate={{
            rotateX: rotateX,
            rotateY: rotateY,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 120 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full max-w-[360px] h-[250px] flex items-center justify-center cursor-pointer"
        >
          {/* Isometric SVG Schematic */}
          <svg
            viewBox="0 0 360 270"
            className="w-full h-full overflow-visible drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="planeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E68057" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#BF7587" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="planeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A2574F" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#E68057" stopOpacity="0.08" />
              </linearGradient>
              <linearGradient id="planeGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#993A8B" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#A2574F" stopOpacity="0.06" />
              </linearGradient>

              <filter id="glowLight" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Vertical Guide Beams / Inter-tier Connectors */}
            <g stroke="#BF7587" strokeWidth="1" strokeDasharray="3 3" opacity="0.35">
              <line x1="180" y1="35" x2="180" y2="235" />
              <line x1="60" y1="80" x2="60" y2="220" />
              <line x1="300" y1="80" x2="300" y2="220" />
            </g>

            {/* Animated Laser Pulse Traveling Across Tiers */}
            <motion.circle
              r="3"
              fill="#E68057"
              filter="url(#glowLight)"
              animate={{
                cx: [180, 180, 180],
                cy: [55, 140, 225],
                opacity: [0.2, 1, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* ========================================================
                PLANE 3: STORAGE & PERSISTENCE TIER (Bottom, Z: -20px)
                Center: (180, 225)
               ======================================================== */}
            <g
              onClick={() => setActiveLayer(3)}
              className="transition-all duration-300"
              style={{
                opacity: activeLayer === 3 ? 1 : 0.65,
                cursor: 'pointer',
              }}
            >
              {/* Isometric Rhombus Plane */}
              <polygon
                points="180,185 300,225 180,265 60,225"
                fill="url(#planeGrad3)"
                stroke={activeLayer === 3 ? '#993A8B' : '#BF7587'}
                strokeWidth={activeLayer === 3 ? '1.8' : '1'}
                strokeDasharray={activeLayer === 3 ? 'none' : '4 2'}
              />

              {/* Internal Grid Lines */}
              <line x1="120" y1="205" x2="240" y2="245" stroke="#993A8B" strokeWidth="0.7" opacity="0.4" />
              <line x1="240" y1="205" x2="120" y2="245" stroke="#993A8B" strokeWidth="0.7" opacity="0.4" />

              {/* Tier Label */}
              <text
                x="308"
                y="230"
                fill={activeLayer === 3 ? '#FAF6F0' : '#BF7587'}
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="1"
              >
                TIER 03 // DATA STORE
              </text>

              {/* Database Core Nodes */}
              <circle cx="180" cy="225" r="5" fill="#993A8B" filter="url(#glowLight)" />
              <circle cx="130" cy="225" r="3.5" fill="#A2574F" />
              <circle cx="230" cy="225" r="3.5" fill="#A2574F" />
            </g>

            {/* ========================================================
                PLANE 2: COMPUTE & MICROSERVICES MESH (Middle, Z: 0)
                Center: (180, 140)
               ======================================================== */}
            <g
              onClick={() => setActiveLayer(2)}
              className="transition-all duration-300"
              style={{
                opacity: activeLayer === 2 ? 1 : 0.65,
                cursor: 'pointer',
              }}
            >
              {/* Isometric Rhombus Plane */}
              <polygon
                points="180,100 300,140 180,180 60,140"
                fill="url(#planeGrad2)"
                stroke={activeLayer === 2 ? '#E68057' : '#BF7587'}
                strokeWidth={activeLayer === 2 ? '2' : '1'}
              />

              {/* Internal Mesh Lattice Lines */}
              <line x1="120" y1="120" x2="240" y2="160" stroke="#E68057" strokeWidth="0.8" opacity="0.5" />
              <line x1="240" y1="120" x2="120" y2="160" stroke="#E68057" strokeWidth="0.8" opacity="0.5" />

              {/* Tier Label */}
              <text
                x="308"
                y="145"
                fill={activeLayer === 2 ? '#FAF6F0' : '#BF7587'}
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="1"
              >
                TIER 02 // COMPUTE MESH
              </text>

              {/* Microservice Pod Cluster Nodes */}
              <circle cx="180" cy="140" r="6" fill="#E68057" filter="url(#glowLight)" />
              <circle cx="135" cy="135" r="3.5" fill="#BF7587" />
              <circle cx="225" cy="145" r="3.5" fill="#BF7587" />
              <circle cx="180" cy="160" r="3" fill="#A2574F" />
            </g>

            {/* ========================================================
                PLANE 1: EDGE & INGRESS MESH (Top, Z: +25px)
                Center: (180, 55)
               ======================================================== */}
            <g
              onClick={() => setActiveLayer(1)}
              className="transition-all duration-300"
              style={{
                opacity: activeLayer === 1 ? 1 : 0.65,
                cursor: 'pointer',
              }}
            >
              {/* Isometric Rhombus Plane */}
              <polygon
                points="180,15 300,55 180,95 60,55"
                fill="url(#planeGrad1)"
                stroke={activeLayer === 1 ? '#E68057' : '#BF7587'}
                strokeWidth={activeLayer === 1 ? '1.8' : '1'}
                strokeDasharray={activeLayer === 1 ? 'none' : '4 2'}
              />

              {/* Internal Grid Lines */}
              <line x1="120" y1="35" x2="240" y2="75" stroke="#E68057" strokeWidth="0.7" opacity="0.4" />
              <line x1="240" y1="35" x2="120" y2="75" stroke="#E68057" strokeWidth="0.7" opacity="0.4" />

              {/* Tier Label */}
              <text
                x="308"
                y="60"
                fill={activeLayer === 1 ? '#FAF6F0' : '#BF7587'}
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="1"
              >
                TIER 01 // GLOBAL EDGE
              </text>

              {/* Ingress Edge Nodes */}
              <circle cx="180" cy="55" r="5" fill="#E68057" filter="url(#glowLight)" />
              <circle cx="140" cy="50" r="3.5" fill="#BF7587" />
              <circle cx="220" cy="60" r="3.5" fill="#BF7587" />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Layer Specification Bar: Clean Hairline Callout */}
      <div className="py-2 px-3 border-y border-[#BF7587]/20 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E68057]" />
          <span className="text-[#FAF6F0] font-semibold">
            {activeLayer === 1 && 'Layer 01: CloudFront CDN • Route 53 • TLS Ingress'}
            {activeLayer === 2 && 'Layer 02: K8s Pod Mesh • Node.js Microservices • Socket Mutex'}
            {activeLayer === 3 && 'Layer 03: MySQL 8 (Port 3307) • Redis Session Cache'}
          </span>
        </div>
        <span className="text-[#BF7587]/70 text-[10px] uppercase font-bold tracking-wider">
          {activeLayer === 1 && 'Edge Ingress'}
          {activeLayer === 2 && 'Live Sync'}
          {activeLayer === 3 && 'ACID Storage'}
        </span>
      </div>

      {/* Editorial System Roster: Open, Bespoke, ZERO BOXES */}
      <div className="space-y-4 pt-4">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#BF7587] font-bold">
          Verified Systems Archive
        </div>

        <div className="space-y-3">
          {SYSTEMS.map((system) => {
            const isSelected = system.id === activeSystemId;

            return (
              <div
                key={system.id}
                onClick={() => selectSystem(system)}
                onMouseEnter={() => selectSystem(system)}
                className="group cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`font-mono text-xs font-bold transition-colors ${
                        isSelected ? 'text-[#E68057]' : 'text-white/40 group-hover:text-white/70'
                      }`}
                    >
                      {system.index}
                    </span>

                    <h4
                      className={`text-base sm:text-lg font-display font-bold tracking-tight whitespace-nowrap transition-colors ${
                        isSelected
                          ? 'text-[#FAF6F0]'
                          : 'text-white/70 group-hover:text-white'
                      }`}
                    >
                      {system.title}
                    </h4>

                    <span className="text-[11px] text-[#BF7587]/75 font-mono truncate hidden md:inline-block">
                      // {system.role}
                    </span>
                  </div>

                  {/* Minimalist Action Links */}
                  <div className="flex items-center gap-2.5 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                    {system.liveUrl && (
                      <a
                        href={system.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-mono font-bold text-[#E68057] hover:underline flex items-center gap-0.5"
                      >
                        <span>Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a
                      href={system.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-mono text-white/50 hover:text-white flex items-center gap-0.5"
                      title="GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Expanded Architectural Insight for Selected System */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden mt-1.5 pl-6"
                    >
                      <p className="text-xs text-[#FAF6F0]/85 font-sans leading-relaxed">
                        {system.highlight}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {system.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono text-[#BF7587] border-b border-[#BF7587]/30 pb-0.5"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
