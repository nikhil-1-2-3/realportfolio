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
    detail: 'React 18 & TypeScript, HTTP/2 SSL edge caching',
    status: 'Operational',
    latency: '18ms',
    color: '#73EEDC', // Mint
    badgeBg: 'rgba(115, 238, 220, 0.15)',
  },
  {
    id: 'ingress',
    title: '2. Ingress & ALB',
    tech: 'AWS ALB & NGINX',
    detail: 'SSL termination, reverse proxy, DDoS rate limits',
    status: 'Operational',
    latency: '24ms',
    color: '#73C2BE', // Teal
    badgeBg: 'rgba(115, 194, 190, 0.15)',
  },
  {
    id: 'compute',
    title: '3. Microservices',
    tech: 'EC2 & K8s Pods',
    detail: 'Node.js Express pods, HPA autoscaling, zero downtime',
    status: '4 Pods Healthy',
    latency: '31ms',
    color: '#90C3C8', // Ice
    badgeBg: 'rgba(144, 195, 200, 0.15)',
  },
  {
    id: 'database',
    title: '4. Persistence Tier',
    tech: 'Docker MySQL 8',
    detail: 'Connection pool (10), multi-AZ schema auto-migration',
    status: 'Port 3307 Live',
    latency: '6ms',
    color: '#776885', // Lavender / Wine
    badgeBg: 'rgba(119, 104, 133, 0.18)',
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
    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-lavender/30 bg-[#130A15]/95 overflow-hidden text-left shadow-2xl backdrop-blur-2xl">
      {/* Top Window Header with Palette Beads */}
      <div className="px-4 py-3 bg-[#1B0E1E] border-b border-lavender/25 flex items-center justify-between gap-3 select-none">
        {/* The 5 Palette Color Beads */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-mint shadow-glow-mint" title="#73EEDC (Mint)" />
          <span className="w-3 h-3 rounded-full bg-teal" title="#73C2BE (Teal)" />
          <span className="w-3 h-3 rounded-full bg-ice" title="#90C3C8 (Ice)" />
          <span className="w-3 h-3 rounded-full bg-lavender" title="#776885 (Lavender)" />
          <span className="w-3 h-3 rounded-full bg-wine" title="#5F1A37 (Wine)" />
          <span className="ml-2 font-mono text-xs text-[#D4CDD7] hidden sm:inline flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-mint" />
            <span>nikhil@cloud-orchestrator: ~ (AWS ap-south-1)</span>
          </span>
        </div>

        {/* Live Cluster Indicator */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-mint animate-pulse shadow-glow-mint" />
          <span className="text-white font-semibold">Cluster Healthy</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-wine/40 text-mint font-bold border border-mint/40 hidden md:inline">
            Docker + K8s
          </span>
        </div>
      </div>

      {/* Balanced 2-Pane Workstation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-lavender/25">
        {/* LEFT PANE: Cloud Topology & Interactive Node Map (5 Cols) */}
        <div className="lg:col-span-5 p-5 bg-[#0F0711]/70 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-mint" />
                <span>Cloud Topology Map</span>
              </span>
              <span className="text-[10px] font-mono text-ice">Click to inspect</span>
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
                        ? 'bg-[#1E0F21] border-2 shadow-glow-mint'
                        : 'bg-[#130A15]/80 border border-lavender/20 hover:border-mint/40'
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
                    <div className="font-mono text-[10px] text-[#8E8295] mt-0.5 flex justify-between">
                      <span>{node.latency}</span>
                      <span className="text-mint font-semibold">{node.status}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Node Inspector Detail */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#170C1A] border border-lavender/25">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-mint" />
                  <span>{selectedNode.title}: Specs</span>
                </span>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                  style={{ backgroundColor: selectedNode.badgeBg, color: selectedNode.color }}
                >
                  {selectedNode.latency}
                </span>
              </div>
              <p className="text-xs text-[#D4CDD7] font-sans mt-1.5 leading-relaxed">
                {selectedNode.detail}
              </p>
            </div>
          </div>

          {/* Interactive CI/CD Pipeline Simulator */}
          <div className="pt-3 border-t border-lavender/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4CDD7] font-semibold">
                CI/CD Automated Deployment
              </span>
              <button
                onClick={triggerPipeline}
                disabled={isPipelineRunning}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-mint/15 hover:bg-mint/25 text-mint border border-mint/40 text-[10px] font-mono font-bold transition-all disabled:opacity-50"
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
                { label: 'Lint & Test', color: '#73EEDC' },
                { label: 'Trivy Scan', color: '#73C2BE' },
                { label: 'Docker Push', color: '#90C3C8' },
                { label: 'K8s Deploy', color: '#776885' },
              ].map((step, idx) => {
                const isPassed = pipelineStep > idx;
                const isCurrent = pipelineStep === idx && isPipelineRunning;

                return (
                  <div
                    key={step.label}
                    className={`py-1.5 px-1 rounded text-center font-mono text-[9px] transition-all border ${
                      isPassed
                        ? 'bg-[#1C0E1E] text-mint border-mint/50 font-bold'
                        : isCurrent
                        ? 'bg-mint/20 text-white border-mint animate-pulse font-bold'
                        : 'bg-[#130A15] text-[#8E8295] border-lavender/20'
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
        <div className="lg:col-span-7 p-5 bg-[#0A050B] flex flex-col justify-between h-[360px] font-mono text-xs">
          {/* Live Terminal Output Stream */}
          <div className="overflow-y-auto space-y-1 pr-1 font-mono text-xs leading-relaxed max-h-[260px]">
            {terminalOutput.map((line, idx) => {
              if (line.startsWith('$')) {
                return (
                  <div key={idx} className="text-mint font-bold pt-1">
                    {line}
                  </div>
                );
              }
              if (line.includes('Healthy') || line.includes('PASS') || line.includes('Running')) {
                return (
                  <div key={idx} className="text-teal font-semibold">
                    {line}
                  </div>
                );
              }
              if (line.startsWith('//')) {
                return (
                  <div key={idx} className="text-[#8E8295] italic">
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
              <div className="flex items-center gap-1.5 text-mint pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-mint animate-ping" />
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
                  className="px-2 py-0.5 rounded text-[10px] bg-[#130A15] hover:bg-[#1E0F21] text-ice hover:text-white border border-lavender/25 transition-colors disabled:opacity-40"
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
              className="flex items-center gap-2 bg-[#130A15] px-3 py-1.5 rounded-xl border border-lavender/30 focus-within:border-mint transition-colors"
            >
              <span className="text-mint font-bold">$</span>
              <input
                type="text"
                value={inputCommand}
                onChange={(e) => setInputCommand(e.target.value)}
                placeholder="Type 'help' or any command..."
                disabled={isRunning}
                className="w-full bg-transparent text-white placeholder-[#8E8295] text-xs focus:outline-none"
              />
              <button
                type="submit"
                disabled={isRunning || !inputCommand.trim()}
                className="text-mint hover:text-white disabled:opacity-30 transition-colors"
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
