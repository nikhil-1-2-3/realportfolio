import React, { useState } from 'react';
import { ShieldCheck, Play, Server, RefreshCw, Send, Cloud, Terminal as TerminalIcon } from 'lucide-react';

interface NodeDetail {
  id: string;
  title: string;
  tech: string;
  detail: string;
  status: string;
  latency: string;
  color: string;
  badgeBg: string;
}

const TOPOLOGY_NODES: NodeDetail[] = [
  {
    id: 'edge',
    title: '1. Edge CDN',
    tech: 'Vercel Edge SPA',
    detail: 'React 18 & TypeScript, HTTP/2 SSL edge caching',
    status: 'Operational',
    latency: '18ms',
    color: '#E68057', // Apricot
    badgeBg: 'rgba(230, 128, 87, 0.18)',
  },
  {
    id: 'ingress',
    title: '2. Ingress & ALB',
    tech: 'AWS ALB & NGINX',
    detail: 'SSL termination, reverse proxy, DDoS rate limits',
    status: 'Operational',
    latency: '24ms',
    color: '#BF7587', // Rose
    badgeBg: 'rgba(191, 117, 135, 0.18)',
  },
  {
    id: 'compute',
    title: '3. Microservices',
    tech: 'EC2 & K8s Pods',
    detail: 'Node.js Express pods, HPA autoscaling, zero downtime',
    status: '4 Pods Healthy',
    latency: '31ms',
    color: '#993A8B', // Plum
    badgeBg: 'rgba(153, 58, 139, 0.18)',
  },
  {
    id: 'database',
    title: '4. Persistence Tier',
    tech: 'Docker MySQL 8',
    detail: 'Connection pool (10), multi-AZ schema auto-migration',
    status: 'Port 3307 Live',
    latency: '6ms',
    color: '#A2574F', // Cognac
    badgeBg: 'rgba(162, 87, 79, 0.18)',
  },
];

export const InteractiveTerminalHero: React.FC = () => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '$ whoami',
    'Singh Nikhil Subhash — Full Stack Developer & Cloud / DevOps Engineer',
    '',
    '$ terraform output cluster_status',
    'Production EKS Cluster: Healthy | Multi-AZ MySQL Containerized',
    '',
    '// Click any command below or type in the console:'
  ]);
  const [inputCommand, setInputCommand] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NodeDetail>(TOPOLOGY_NODES[0]);
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(4);

  const executeCommand = (cmd: string) => {
    if (isRunning) return;
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setIsRunning(true);
    setTerminalOutput((prev) => [...prev, ``, `$ ${cmd}`]);

    let responses: string[] = [];

    if (trimmed === 'help') {
      responses = [
        'Available Verified Commands:',
        '  projects     - List 9 production applications',
        '  skills       - Inspect full-stack & DevOps stack',
        '  terraform    - Simulate IaC cloud provisioning',
        '  kubectl      - Inspect container pods across namespaces',
        '  trivy        - Scan Docker container for security CVEs',
        '  whoami       - Display developer summary',
        '  clear        - Reset terminal console'
      ];
    } else if (trimmed === 'whoami') {
      responses = [
        'Singh Nikhil Subhash',
        'Full Stack Developer | Cloud & DevOps Engineer',
        'B.Tech CSE (2023 - 2027) • 8.5 / 10 CGPA',
        'Specialty: React, Node.js, Docker, Kubernetes, AWS, Terraform, CI/CD'
      ];
    } else if (trimmed === 'projects') {
      responses = [
        '1. TurfXL            — MERN sports booking + Socket.io + Docker',
        '2. V S Transport     — Logistics fleet tracking + AWS + K8s + Terraform',
        '3. WorkLink          — Freelancing platform + Docker + Kubernetes + AWS',
        '4. BikeWeb           — Microservices + Docker + Kubernetes + NGINX',
        '5. TaskFlow          — Team task manager + REST API + JWT auth',
        '6. QuickCart         — E-commerce platform + order state workflows',
        '7. Observability     — Prometheus + Grafana + Node Exporter',
        '8. CarePulse Clinic  — Healthcare appointment system + MySQL',
        '9. SoleVerse         — Footwear catalog + responsive cart state'
      ];
    } else if (trimmed === 'skills') {
      responses = [
        'Languages:    C, C++, JavaScript (ES6+), TypeScript, SQL, Bash',
        'Cloud/DevOps: Docker, Kubernetes, AWS, Terraform, Jenkins, GitHub Actions',
        'Full Stack:   React.js, Node.js, Express.js, Socket.io, Tailwind CSS',
        'Databases:    MySQL, MongoDB, PostgreSQL'
      ];
    } else if (trimmed.includes('terraform')) {
      responses = [
        'Initializing AWS Provider (ap-south-1)...',
        'aws_vpc.primary: Provisioning [10.20.0.0/16]...',
        'aws_alb.ingress: SSL termination configured on 443.',
        'aws_eks_node_group.prod: 4 nodes registered.',
        'Apply complete! 14 resources added. Zero downtime.'
      ];
    } else if (trimmed.includes('kubectl') || trimmed.includes('k8s')) {
      responses = [
        'NAME                               READY   STATUS    RESTARTS   AGE',
        'turf-booking-api-79bf48-xk9s       1/1     Running   0          4d',
        'v-s-transport-core-54b9d-m2lp     1/1     Running   0          4d',
        'taskflow-mysql-worker-88c9f-q11x   1/1     Running   0          3d',
        'bikeweb-gateway-micro-10aef-z40p   1/1     Running   0          2d'
      ];
    } else if (trimmed.includes('trivy')) {
      responses = [
        'Scanning container image: singhnikhil212/taskflow:latest...',
        'OS: alpine 3.20.3 (Zero high severity vulnerabilities)',
        'Aqua Trivy Security Gate: PASSED (0 Critical / 0 High)'
      ];
    } else if (trimmed === 'clear') {
      setTerminalOutput([
        '$ whoami',
        'Singh Nikhil Subhash — Full Stack Developer & Cloud / DevOps Engineer',
        '',
        '// Terminal cleared. Type `help` or click a chip:'
      ]);
      setIsRunning(false);
      setInputCommand('');
      return;
    } else {
      responses = [
        `Command not found: "${cmd}". Type 'help' for verified commands.`
      ];
    }

    responses.forEach((line, index) => {
      setTimeout(() => {
        setTerminalOutput((prev) => [...prev, line]);
        if (index === responses.length - 1) {
          setIsRunning(false);
        }
      }, (index + 1) * 160);
    });

    setInputCommand('');
  };

  const triggerPipeline = () => {
    if (isPipelineRunning) return;
    setIsPipelineRunning(true);
    setPipelineStep(0);

    const steps = [1, 2, 3, 4];
    steps.forEach((s, idx) => {
      setTimeout(() => {
        setPipelineStep(s);
        if (idx === steps.length - 1) {
          setIsPipelineRunning(false);
        }
      }, (idx + 1) * 750);
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-cognac/35 bg-[#140d17]/90 card-shading overflow-hidden text-left shadow-2xl backdrop-blur-2xl">
      {/* Top Window Header with Palette Beads */}
      <div className="px-4 py-3 bg-[#1a111e] border-b border-cognac/25 flex items-center justify-between gap-3 select-none">
        {/* The 4 Palette Color Beads */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-apricot shadow-glow-apricot" title="#E68057 Apricot" />
          <span className="w-3 h-3 rounded-full bg-rose shadow-glow-rose" title="#BF7587 Rose" />
          <span className="w-3 h-3 rounded-full bg-plum shadow-glow-plum" title="#993A8B Plum" />
          <span className="w-3 h-3 rounded-full bg-cognac shadow-glow-cognac" title="#A2574F Cognac" />
          <span className="ml-2 font-mono text-xs text-neutral-400 hidden sm:inline flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-apricot" />
            <span>nikhil@cloud-orchestrator: ~ (AWS ap-south-1)</span>
          </span>
        </div>

        {/* Live Cluster Indicator */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-semibold">Cluster Healthy</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-plum/20 text-plum font-bold border border-plum/40 hidden md:inline">
            Docker + K8s
          </span>
        </div>
      </div>

      {/* Balanced 2-Pane Workstation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-cognac/25">
        {/* LEFT PANE: Cloud Topology & Interactive Node Map (5 Cols) */}
        <div className="lg:col-span-5 p-5 bg-[#120b15]/60 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-apricot" />
                <span>Cloud Topology Map</span>
              </span>
              <span className="text-[10px] font-mono text-rose">Click to inspect</span>
            </div>

            {/* Interactive Nodes Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {TOPOLOGY_NODES.map((node) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-[#221626] border-2 shadow-glow-apricot'
                        : 'bg-[#18101c]/80 border border-cognac/20 hover:border-apricot/40'
                    }`}
                    style={{
                      borderColor: isSelected ? node.color : undefined,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase" style={{ color: node.color }}>
                        {node.title}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: node.color }} />
                    </div>
                    <div className="font-sans font-bold text-white text-xs mt-1 truncate">
                      {node.tech}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400 mt-1">
                      {node.latency} latency
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Node Detail Box */}
            <div className="mt-3 p-3.5 rounded-xl bg-[#1a111e] border border-cognac/25 shadow-sand-sm">
              <div className="flex items-center justify-between pb-2 border-b border-cognac/20">
                <span className="font-sans font-bold text-xs text-white flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" style={{ color: selectedNode.color }} />
                  <span>{selectedNode.tech}</span>
                </span>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold border"
                  style={{
                    backgroundColor: selectedNode.badgeBg,
                    color: selectedNode.color,
                    borderColor: `${selectedNode.color}40`,
                  }}
                >
                  {selectedNode.status}
                </span>
              </div>
              <p className="text-xs text-neutral-300 font-sans mt-2 leading-relaxed">
                {selectedNode.detail}
              </p>
            </div>
          </div>

          {/* Mini CI/CD Trigger */}
          <div className="pt-2 border-t border-cognac/20 flex items-center justify-between">
            <div className="text-[11px] font-mono text-neutral-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>CI/CD: {pipelineStep === 4 ? 'Passing' : `Step ${pipelineStep}/4`}</span>
            </div>
            <button
              onClick={triggerPipeline}
              disabled={isPipelineRunning}
              className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-apricot to-plum text-white hover:brightness-110 disabled:opacity-50 transition-all flex items-center gap-1 shadow-glow-apricot"
            >
              <Play className="w-3 h-3" />
              <span>{isPipelineRunning ? 'Deploying...' : 'Simulate Build'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT PANE: Interactive Live CLI (7 Cols) */}
        <div className="lg:col-span-7 p-5 bg-[#160e19] flex flex-col justify-between gap-3 font-mono text-xs">
          <div>
            {/* Quick Action Command Chips in Palette Colors */}
            <div className="flex flex-wrap items-center gap-1.5 pb-3 border-b border-cognac/25">
              <button
                onClick={() => executeCommand('terraform')}
                disabled={isRunning}
                className="px-2.5 py-1 rounded-lg bg-[#221626] hover:bg-[#2c1d32] border border-apricot/30 text-neutral-200 hover:text-apricot transition-colors flex items-center gap-1 text-[11px] font-medium"
              >
                <Play className="w-3 h-3 text-apricot" />
                <span>terraform apply</span>
              </button>

              <button
                onClick={() => executeCommand('kubectl')}
                disabled={isRunning}
                className="px-2.5 py-1 rounded-lg bg-[#221626] hover:bg-[#2c1d32] border border-plum/30 text-neutral-200 hover:text-plum transition-colors flex items-center gap-1 text-[11px] font-medium"
              >
                <Play className="w-3 h-3 text-plum" />
                <span>kubectl get pods</span>
              </button>

              <button
                onClick={() => executeCommand('trivy')}
                disabled={isRunning}
                className="px-2.5 py-1 rounded-lg bg-[#221626] hover:bg-[#2c1d32] border border-rose/30 text-neutral-200 hover:text-rose transition-colors flex items-center gap-1 text-[11px] font-medium"
              >
                <ShieldCheck className="w-3 h-3 text-rose" />
                <span>trivy scan</span>
              </button>

              <button
                onClick={() => executeCommand('projects')}
                disabled={isRunning}
                className="px-2.5 py-1 rounded-lg bg-[#221626] hover:bg-[#2c1d32] border border-cognac/30 text-neutral-200 hover:text-apricot transition-colors text-[11px] font-medium"
              >
                <span>projects</span>
              </button>

              <button
                onClick={() => executeCommand('clear')}
                className="p-1 rounded-lg bg-[#221626] border border-cognac/30 text-neutral-400 hover:text-white ml-auto"
                title="Clear console"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Terminal Console Stream */}
            <div className="h-44 overflow-y-auto space-y-1 text-white leading-relaxed pr-2 pt-2">
              {terminalOutput.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith('$')
                      ? 'text-apricot font-bold pt-1'
                      : line.includes('PASSED') || line.includes('Running') || line.includes('complete!') || line.includes('Healthy')
                      ? 'text-emerald-400 font-semibold'
                      : line.startsWith('//')
                      ? 'text-rose/80 italic'
                      : 'text-neutral-300'
                  }
                >
                  {line}
                </div>
              ))}
              {isRunning && (
                <div className="flex items-center gap-2 text-apricot animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-apricot" />
                  <span>Executing command...</span>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Command Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeCommand(inputCommand);
            }}
            className="flex items-center gap-2 pt-2 border-t border-cognac/25"
          >
            <span className="text-apricot font-bold select-none">$</span>
            <input
              type="text"
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              placeholder="type 'help', 'projects', 'skills', or 'clear'..."
              className="flex-1 bg-transparent text-white placeholder-neutral-500 text-xs focus:outline-none font-mono"
            />
            <button
              type="submit"
              disabled={!inputCommand.trim() || isRunning}
              className="p-1.5 rounded-lg bg-gradient-to-r from-apricot to-plum text-white disabled:opacity-40 transition-colors shadow-glow-apricot"
              aria-label="Send command"
            >
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
