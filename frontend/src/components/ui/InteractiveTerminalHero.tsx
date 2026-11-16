import React, { useState } from 'react';
import { Play, Server, RefreshCw, Send, Cloud, Terminal as TerminalIcon } from 'lucide-react';

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
    detail: 'React 19 & TypeScript, HTTP/2 SSL edge caching',
    status: 'Operational',
    latency: '18ms',
    color: '#993A8B', // Mulberry
    badgeBg: 'rgba(153, 58, 139, 0.12)',
  },
  {
    id: 'ingress',
    title: '2. Ingress & ALB',
    tech: 'AWS ALB & NGINX',
    detail: 'SSL termination, reverse proxy, DDoS rate limits',
    status: 'Operational',
    latency: '24ms',
    color: '#A2574F', // Cognac
    badgeBg: 'rgba(162, 87, 79, 0.12)',
  },
  {
    id: 'compute',
    title: '3. Microservices',
    tech: 'EC2 & K8s Pods',
    detail: 'Node.js Express pods, HPA autoscaling, zero downtime',
    status: '4 Pods Healthy',
    latency: '31ms',
    color: '#E68057', // Ochre
    badgeBg: 'rgba(230, 128, 87, 0.14)',
  },
  {
    id: 'database',
    title: '4. Persistence Tier',
    tech: 'Docker MySQL 8',
    detail: 'Connection pool (10), multi-AZ schema auto-migration',
    status: 'Port 3307 Live',
    latency: '6ms',
    color: '#BF7587', // Dusty Rose
    badgeBg: 'rgba(191, 117, 135, 0.15)',
  },
];

export const InteractiveTerminalHero: React.FC = () => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '$ whoami',
    'Singh Nikhil Subhash — Full Stack Developer & Cloud / DevOps Architect',
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
        '  projects     - List verified production applications',
        '  skills       - Inspect full-stack & DevOps stack',
        '  terraform    - Simulate IaC cloud provisioning',
        '  kubectl      - Inspect container pods across namespaces',
        '  trivy        - Run vulnerability scan on container images',
        '  db           - Test Docker MySQL connection',
        '  clear        - Clear console history'
      ];
    } else if (trimmed === 'projects') {
      responses = [
        'Production Full-Stack & Infrastructure Work:',
        '  [1] fullstack-auth-platform    - JWT, Refresh Tokens, RBAC',
        '  [2] e-commerce-microservices   - Event-driven, Redis cache',
        '  [3] devops-ci-cd-pipeline      - GitHub Actions & Trivy',
        '  [4] cloud-infra-terraform      - Multi-AZ VPC on AWS',
        '  [5] k8s-monitoring-stack       - Prometheus & Grafana',
        '  [6] real-time-chat-app         - Socket.io websockets'
      ];
    } else if (trimmed === 'skills') {
      responses = [
        'Verified Stack Breakdown:',
        '  Cloud & Containers: AWS, Docker, Kubernetes, Helm, Terraform',
        '  CI/CD & DevOps:     GitHub Actions, Jenkins, GitLab CI',
        '  Backend:            Node.js, Express, REST APIs, WebSockets',
        '  Databases:          MySQL 8 (Docker), MongoDB, PostgreSQL, Redis',
        '  Security & Observ.: Aqua Trivy, Prometheus, Grafana'
      ];
    } else if (trimmed.startsWith('terraform')) {
      responses = [
        '[IaC] Initializing Terraform state on AWS S3 backend...',
        '[IaC] Plan: 12 to add, 0 to change, 0 to destroy.',
        '[IaC] aws_vpc.prod_vpc: Creating...',
        '[IaC] aws_eks_cluster.main: Creating...',
        '[IaC] Apply complete! Resources: 12 added, 0 changed. Status: 100% HEALTHY'
      ];
    } else if (trimmed.startsWith('kubectl')) {
      responses = [
        'NAME                         READY   STATUS    RESTARTS   AGE',
        'api-gateway-7b9c9f6d8-4xk2   1/1     Running   0          4d2h',
        'auth-service-586b77c5f-9znm  1/1     Running   0          4d2h',
        'orders-worker-6c4789b-q8pl   1/1     Running   0          4d2h',
        'mysql-primary-stateful-0     1/1     Running   0          12d'
      ];
    } else if (trimmed.startsWith('trivy')) {
      responses = [
        '2026-11-16T11:00:00Z INFO Scanning container image: nikhil/api-gateway:v2.4',
        'Total: 0 (CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0)',
        'PASS: Zero CVE vulnerabilities detected. Ready for deployment.'
      ];
    } else if (trimmed.startsWith('db')) {
      responses = [
        'Testing Docker MySQL connection on port 3307...',
        'Connected to MySQL 8.0.35 Community Server.',
        'Database: portfolio_db | Table: contacts | Status: CONNECTED'
      ];
    } else if (trimmed === 'clear') {
      setTerminalOutput(['Console cleared. Ready for commands.']);
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
    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-lavender/30 bg-white overflow-hidden text-left shadow-aesthetic-lg">
      {/* Top Window Header with Palette Beads */}
      <div className="px-4 py-3 bg-[#F3ECE4] border-b border-lavender/25 flex items-center justify-between gap-3 select-none">
        {/* The 5 Palette Color Beads */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-wine shadow-sm" title="#5F1A37 (Wine)" />
          <span className="w-3 h-3 rounded-full bg-lavender" title="#776885 (Lavender)" />
          <span className="w-3 h-3 rounded-full bg-teal" title="#73C2BE (Teal)" />
          <span className="w-3 h-3 rounded-full bg-mint" title="#73EEDC (Mint)" />
          <span className="w-3 h-3 rounded-full bg-ice" title="#90C3C8 (Ice)" />
          <span className="ml-2 font-mono text-xs text-[#544452] hidden sm:inline flex items-center gap-1.5 font-semibold">
            <TerminalIcon className="w-3.5 h-3.5 text-wine" />
            <span>nikhil@cloud-orchestrator: ~ (AWS ap-south-1)</span>
          </span>
        </div>

        {/* Live Cluster Indicator */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
          <span className="text-[#1E101B] font-bold">Cluster Healthy</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-white text-wine font-bold border border-wine/30 hidden md:inline shadow-aesthetic-sm">
            Docker + K8s
          </span>
        </div>
      </div>

      {/* Balanced 2-Pane Workstation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-lavender/20">
        {/* LEFT PANE: Cloud Topology & Interactive Node Map (5 Cols) */}
        <div className="lg:col-span-5 p-5 bg-[#FAF7F2] flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E101B] flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-wine" />
                <span>Cloud Topology Map</span>
              </span>
              <span className="text-[10px] font-mono text-teal font-semibold">Click to inspect</span>
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
                        ? 'bg-white border-2 border-wine shadow-aesthetic-sm'
                        : 'bg-white/80 border border-lavender/25 hover:border-wine/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase" style={{ color: node.color }}>
                        {node.title}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.color }} />
                    </div>
                    <div className="font-sans font-bold text-[#1E101B] text-xs mt-1 truncate">
                      {node.tech}
                    </div>
                    <div className="font-mono text-[10px] text-[#847382] mt-0.5 flex justify-between font-semibold">
                      <span>{node.latency}</span>
                      <span className="text-teal font-bold">{node.status}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Node Inspector Detail */}
            <div className="mt-4 p-3.5 rounded-xl bg-white border border-lavender/25 shadow-aesthetic-sm">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#1E101B] flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-wine" />
                  <span>{selectedNode.title}: Specs</span>
                </span>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                  style={{ backgroundColor: selectedNode.badgeBg, color: selectedNode.color }}
                >
                  {selectedNode.latency}
                </span>
              </div>
              <p className="text-xs text-[#544452] font-sans mt-1.5 leading-relaxed font-medium">
                {selectedNode.detail}
              </p>
            </div>
          </div>

          {/* Interactive CI/CD Pipeline Simulator */}
          <div className="pt-3 border-t border-lavender/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#544452] font-bold">
                CI/CD Automated Deployment
              </span>
              <button
                onClick={triggerPipeline}
                disabled={isPipelineRunning}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-wine text-white text-[10px] font-mono font-bold transition-all hover:bg-[#732243] shadow-aesthetic-sm disabled:opacity-50"
              >
                {isPipelineRunning ? (
                  <RefreshCw className="w-3 h-3 animate-spin" />
                ) : (
                  <Play className="w-3 h-3" />
                )}
                <span>{isPipelineRunning ? 'Building...' : 'Simulate Build'}</span>
              </button>
            </div>

            {/* 4 Pipeline Stages */}
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { label: 'Lint & Test', color: '#993A8B' },
                { label: 'Trivy Scan', color: '#A2574F' },
                { label: 'Docker Push', color: '#E68057' },
                { label: 'K8s Deploy', color: '#BF7587' },
              ].map((step, idx) => {
                const isPassed = pipelineStep > idx;
                const isCurrent = pipelineStep === idx && isPipelineRunning;

                return (
                  <div
                    key={step.label}
                    className={`py-1.5 px-1 rounded text-center font-mono text-[9px] transition-all border ${
                      isPassed
                        ? 'bg-white text-wine border-wine/40 font-bold shadow-aesthetic-sm'
                        : isCurrent
                        ? 'bg-wine text-white border-wine font-bold'
                        : 'bg-white/60 text-[#847382] border-lavender/20'
                    }`}
                  >
                    <span>{step.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Production CLI Console (7 Cols) */}
        <div className="lg:col-span-7 p-5 bg-[#170C17] flex flex-col justify-between h-[360px] font-mono text-xs">
          {/* Live Terminal Output Stream */}
          <div className="overflow-y-auto space-y-1 pr-1 font-mono text-xs leading-relaxed max-h-[260px]">
            {terminalOutput.map((line, idx) => {
              if (line.startsWith('$')) {
                return (
                  <div key={idx} className="text-[#73EEDC] font-bold pt-1">
                    {line}
                  </div>
                );
              }
              if (line.includes('Healthy') || line.includes('PASS') || line.includes('Running')) {
                return (
                  <div key={idx} className="text-[#73C2BE] font-semibold">
                    {line}
                  </div>
                );
              }
              if (line.startsWith('//')) {
                return (
                  <div key={idx} className="text-[#847382] italic">
                    {line}
                  </div>
                );
              }
              return (
                <div key={idx} className="text-[#D4CDD7]">
                  {line}
                </div>
              );
            })}
            {isRunning && (
              <div className="flex items-center gap-1.5 text-[#73EEDC] pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#73EEDC] animate-ping" />
                <span className="animate-pulse">Executing cloud orchestration...</span>
              </div>
            )}
          </div>

          {/* Interactive Command Input + Quick Command Chips */}
          <div className="pt-3 border-t border-lavender/20 space-y-2">
            {/* Command Chips */}
            <div className="flex flex-wrap gap-1.5">
              {['terraform apply', 'kubectl get pods', 'trivy scan', 'db', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeCommand(cmd)}
                  disabled={isRunning}
                  className="px-2 py-0.5 rounded text-[10px] bg-[#241324] hover:bg-[#321a32] text-[#90C3C8] hover:text-white border border-lavender/30 transition-colors disabled:opacity-40"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Prompt Input Line */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeCommand(inputCommand);
              }}
              className="flex items-center gap-2 bg-[#221222] px-3 py-1.5 rounded-xl border border-lavender/30 focus-within:border-mint transition-colors"
            >
              <span className="text-[#73EEDC] font-bold">$</span>
              <input
                type="text"
                value={inputCommand}
                onChange={(e) => setInputCommand(e.target.value)}
                placeholder="Type 'help' or any command..."
                disabled={isRunning}
                className="w-full bg-transparent text-white placeholder-[#847382] text-xs focus:outline-none"
              />
              <button
                type="submit"
                disabled={isRunning || !inputCommand.trim()}
                className="text-[#73EEDC] hover:text-white disabled:opacity-30 transition-colors"
                aria-label="Send Command"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
