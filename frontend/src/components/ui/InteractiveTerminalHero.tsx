import React, { useState } from 'react';
import { Terminal, ShieldCheck, Play, Layers, Server, CheckCircle2, RefreshCw, Send } from 'lucide-react';

type TabMode = 'terminal' | 'topology' | 'pipeline';

interface NodeDetail {
  id: string;
  title: string;
  tech: string;
  detail: string;
  status: string;
  latency: string;
}

const TOPOLOGY_NODES: NodeDetail[] = [
  {
    id: 'edge',
    title: '1. Edge CDN',
    tech: 'Vercel Edge SPA',
    detail: 'React 18, Vite, Gzip bundle, HTTP/2 SSL edge caching',
    status: 'Operational',
    latency: '18ms',
  },
  {
    id: 'ingress',
    title: '2. Ingress Router',
    tech: 'AWS ALB & NGINX',
    detail: 'SSL termination, reverse proxy, DDoS throttling & rate limits',
    status: 'Operational',
    latency: '24ms',
  },
  {
    id: 'compute',
    title: '3. Microservices',
    tech: 'EC2 + K8s Pods',
    detail: 'Containerized Node.js/Express, Horizontal Pod Autoscaling (HPA)',
    status: '4 Replicas Healthy',
    latency: '31ms',
  },
  {
    id: 'database',
    title: '4. Persistence Tier',
    tech: 'Docker MySQL 8 & MongoDB',
    detail: 'Connection pooling (pool: 10), automated JSONL audit trails',
    status: 'Multi-AZ Ready',
    latency: '8ms',
  },
];

export const InteractiveTerminalHero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabMode>('terminal');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '$ whoami',
    'Singh Nikhil Subhash — Full Stack Developer & Cloud / DevOps Engineer',
    '',
    '$ terraform output -json cluster_endpoint',
    'https://k8s.nikhil-portfolio.internal:6443',
    '',
    '// Type a command below or click the quick action chips:'
  ]);
  const [inputCommand, setInputCommand] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NodeDetail>(TOPOLOGY_NODES[0]);

  // Pipeline simulation state
  const [pipelineProgress, setPipelineProgress] = useState<number>(4);
  const [isSimulatingPipeline, setIsSimulatingPipeline] = useState<boolean>(false);

  const executeCommand = (cmd: string) => {
    if (isRunning) return;
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setIsRunning(true);
    setTerminalOutput((prev) => [...prev, ``, `$ ${cmd}`]);

    let responses: string[] = [];

    if (trimmed === 'help') {
      responses = [
        'Available CLI Commands:',
        '  whoami       - Display identity and role summary',
        '  projects     - List all 9 verified production projects',
        '  skills       - Print core technical toolkit',
        '  terraform    - Simulate cloud infrastructure provisioning',
        '  kubectl      - Inspect active Kubernetes pods across namespaces',
        '  trivy        - Run vulnerability scan on taskflow Docker image',
        '  contact      - Output verified contact coordinates',
        '  clear        - Reset and clean the terminal display'
      ];
    } else if (trimmed === 'whoami') {
      responses = [
        'Name: Singh Nikhil Subhash',
        'Role: Full Stack Developer | Cloud & DevOps Engineer',
        'Education: B.Tech CSE (2023 - 2027), CGPA: 8.5 / 10',
        'Specialty: MERN, Kubernetes, Docker, CI/CD, Terraform, MySQL & Linux'
      ];
    } else if (trimmed === 'projects') {
      responses = [
        '1. TurfXL              [React, Node, Express, MongoDB, Socket.io, Docker]',
        '2. V S Transport       [React, Node, Socket.io, Docker, K8s, AWS, Terraform]',
        '3. WorkLink            [React, Node, Express, Docker, Kubernetes, AWS]',
        '4. BikeWeb             [Microservices, Docker, Kubernetes, NGINX, JWT]',
        '5. TaskFlow            [Full Stack MERN, Role-Based Access, REST API]',
        '6. QuickCart           [E-Commerce Platform, JWT Auth, Order Workflows]',
        '7. Observability       [Prometheus, Grafana, Node Exporter, Alerts]',
        '8. CarePulse Clinic    [Healthcare Booking, Doctor Schedules, MySQL]',
        '9. SoleVerse           [Footwear Store, Catalog Filters, Cart State]'
      ];
    } else if (trimmed === 'skills') {
      responses = [
        '[Languages]:       C, C++, JavaScript (ES6+), TypeScript, SQL, Bash',
        '[DevOps & Cloud]:  Docker, Kubernetes, Jenkins, GitHub Actions, AWS, Terraform',
        '[Full Stack]:      React.js, Node.js, Express.js, Tailwind CSS, Socket.io',
        '[Databases]:      MySQL, MongoDB, PostgreSQL, Redis',
        '[Observability]:  Prometheus, Grafana, Aqua Trivy, NGINX'
      ];
    } else if (trimmed.includes('terraform')) {
      responses = [
        'Initializing provider: hashicorp/aws v5.42.0...',
        'Plan: 14 to add, 0 to change, 0 to destroy.',
        'aws_vpc.primary: Creating... [CIDR 10.20.0.0/16]',
        'aws_subnet.public_a: Creating... [us-east-1a]',
        'aws_subnet.private_a: Creating... [us-east-1a]',
        'aws_eks_cluster.prod: Provisioning managed control plane...',
        'aws_db_instance.mysql_db: Multi-AZ storage encryption enabled.',
        'Apply complete! 14 resources deployed in 48s. Cluster healthy.'
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
        'OS: alpine 3.20.3 (Package count: 18)',
        'Target Severity: HIGH, CRITICAL',
        '✓ Total Vulnerabilities Found: 0 HIGH, 0 CRITICAL',
        'Security Policy Status: PASSED (Zero CVEs)'
      ];
    } else if (trimmed === 'contact') {
      responses = [
        'Email:    23amtics402@gmail.com',
        'Phone:    +91 9023980447',
        'GitHub:   https://github.com/nikhil-1-2-3',
        'GitLab:   https://gitlab.com/nikhil-group4850339',
        'LinkedIn: https://www.linkedin.com/in/nikhil-singh-788b68297/'
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
        `bash: command not found: ${cmd}`,
        `Type 'help' to see verified portfolio commands.`
      ];
    }

    responses.forEach((line, index) => {
      setTimeout(() => {
        setTerminalOutput((prev) => [...prev, line]);
        if (index === responses.length - 1) {
          setIsRunning(false);
        }
      }, (index + 1) * 180);
    });

    setInputCommand('');
  };

  const startPipelineSimulation = () => {
    if (isSimulatingPipeline) return;
    setIsSimulatingPipeline(true);
    setPipelineProgress(0);

    const stages = [1, 2, 3, 4];
    stages.forEach((step, idx) => {
      setTimeout(() => {
        setPipelineProgress(step);
        if (idx === stages.length - 1) {
          setIsSimulatingPipeline(false);
        }
      }, (idx + 1) * 900);
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 rounded-2xl border border-theme-border bg-theme-surface/90 card-shading backdrop-blur-xl overflow-hidden shadow-sand-xl text-left">
      {/* Terminal Title Bar */}
      <div className="px-4 py-3 border-b border-theme-border/60 bg-theme-base/60 flex items-center justify-between gap-3">
        {/* Mac OS beads */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70 shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-amber-500/70 shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/70 shadow-sm" />
          <span className="ml-2 font-mono text-xs text-theme-muted hidden sm:inline">
            nikhil@cloud-workstation: ~
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-theme-base border border-theme-border/60 font-mono text-xs">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'terminal'
                ? 'bg-theme-surface text-theme-main font-bold shadow-sand-sm border border-theme-border/60'
                : 'text-theme-muted hover:text-theme-main'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-theme-accent" />
            <span>CLI</span>
          </button>

          <button
            onClick={() => setActiveTab('topology')}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'topology'
                ? 'bg-theme-surface text-theme-main font-bold shadow-sand-sm border border-theme-border/60'
                : 'text-theme-muted hover:text-theme-main'
            }`}
          >
            <Server className="w-3.5 h-3.5 text-cyan-500" />
            <span>Topology</span>
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'pipeline'
                ? 'bg-theme-surface text-theme-main font-bold shadow-sand-sm border border-theme-border/60'
                : 'text-theme-muted hover:text-theme-main'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-orange-500" />
            <span>CI/CD</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Interactive Terminal with Prompt & Quick Chips */}
      {activeTab === 'terminal' && (
        <div className="p-5 font-mono text-xs space-y-4">
          {/* Quick Action Commands */}
          <div className="flex flex-wrap gap-2 pb-3 border-b border-theme-border/40">
            <button
              onClick={() => executeCommand('terraform')}
              disabled={isRunning}
              className="px-2.5 py-1.5 rounded-lg bg-theme-base border border-theme-border hover:border-theme-accent text-theme-muted hover:text-theme-main transition-colors flex items-center gap-1 text-[11px]"
            >
              <Play className="w-3 h-3 text-emerald-500" />
              <span>terraform apply</span>
            </button>

            <button
              onClick={() => executeCommand('kubectl')}
              disabled={isRunning}
              className="px-2.5 py-1.5 rounded-lg bg-theme-base border border-theme-border hover:border-theme-accent text-theme-muted hover:text-theme-main transition-colors flex items-center gap-1 text-[11px]"
            >
              <Play className="w-3 h-3 text-cyan-500" />
              <span>kubectl get pods</span>
            </button>

            <button
              onClick={() => executeCommand('trivy')}
              disabled={isRunning}
              className="px-2.5 py-1.5 rounded-lg bg-theme-base border border-theme-border hover:border-theme-accent text-theme-muted hover:text-theme-main transition-colors flex items-center gap-1 text-[11px]"
            >
              <ShieldCheck className="w-3 h-3 text-amber-500" />
              <span>trivy scan</span>
            </button>

            <button
              onClick={() => executeCommand('projects')}
              disabled={isRunning}
              className="px-2.5 py-1.5 rounded-lg bg-theme-base border border-theme-border hover:border-theme-accent text-theme-muted hover:text-theme-main transition-colors flex items-center gap-1 text-[11px]"
            >
              <span>projects</span>
            </button>

            <button
              onClick={() => executeCommand('help')}
              disabled={isRunning}
              className="px-2.5 py-1.5 rounded-lg bg-theme-base border border-theme-border hover:border-theme-accent text-theme-muted hover:text-theme-main transition-colors flex items-center gap-1 text-[11px]"
            >
              <span>help</span>
            </button>

            <button
              onClick={() => executeCommand('clear')}
              className="p-1.5 rounded-lg bg-theme-base border border-theme-border text-theme-muted hover:text-theme-main ml-auto"
              title="Clear terminal"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Terminal Console Stream */}
          <div className="h-44 overflow-y-auto space-y-1 text-theme-main leading-relaxed pr-2">
            {terminalOutput.map((line, i) => (
              <div
                key={i}
                className={
                  line.startsWith('$')
                    ? 'text-theme-accent font-bold pt-1'
                    : line.includes('PASSED') || line.includes('Running') || line.includes('complete!') || line.includes('Operational')
                    ? 'text-emerald-500 font-semibold'
                    : line.startsWith('//')
                    ? 'text-theme-muted italic'
                    : 'text-theme-muted'
                }
              >
                {line}
              </div>
            ))}
            {isRunning && (
              <div className="flex items-center gap-2 text-theme-accent animate-pulse">
                <span className="w-2 h-2 rounded-full bg-theme-accent" />
                <span>Executing command...</span>
              </div>
            )}
          </div>

          {/* Interactive Live Command Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeCommand(inputCommand);
            }}
            className="flex items-center gap-2 pt-2 border-t border-theme-border/40"
          >
            <span className="text-theme-accent font-bold select-none">$</span>
            <input
              type="text"
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              placeholder="type 'help', 'projects', 'skills', or 'clear'..."
              className="flex-1 bg-transparent text-theme-main placeholder-theme-muted/60 text-xs focus:outline-none font-mono"
            />
            <button
              type="submit"
              disabled={!inputCommand.trim() || isRunning}
              className="p-1.5 rounded-lg bg-theme-base hover:bg-theme-hover border border-theme-border text-theme-accent disabled:opacity-40 transition-colors"
            >
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Visual Cloud Topology Map with Interactive Inspection */}
      {activeTab === 'topology' && (
        <div className="p-5 font-mono text-xs space-y-4">
          <div className="text-center font-sans text-xs text-theme-muted">
            Click any node below to inspect live cluster specification:
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {TOPOLOGY_NODES.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-theme-accent/15 border-2 border-theme-accent shadow-sand-sm'
                      : 'bg-theme-base border border-theme-border hover:border-theme-border-strong'
                  }`}
                >
                  <div className="text-[10px] uppercase text-theme-muted font-bold truncate">{node.title}</div>
                  <div className="font-bold text-theme-main font-sans text-xs mt-1 truncate">{node.tech}</div>
                  <div className="text-[10px] text-emerald-500 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{node.latency}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Node Spec Inspector Box */}
          <div className="p-4 rounded-xl bg-theme-base border border-theme-border space-y-2">
            <div className="flex items-center justify-between border-b border-theme-border/60 pb-2">
              <span className="font-bold text-theme-main font-sans">{selectedNode.title}: {selectedNode.tech}</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 font-bold">
                {selectedNode.status}
              </span>
            </div>
            <p className="text-xs text-theme-muted font-sans leading-relaxed">
              {selectedNode.detail}
            </p>
            <div className="flex items-center justify-between text-[11px] text-theme-muted pt-1">
              <span>Healthcheck ping: <strong className="text-theme-main">{selectedNode.latency}</strong></span>
              <span className="text-theme-accent">Auto-reconciliation active</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: CI/CD Pipeline Simulator with Live Trigger */}
      {activeTab === 'pipeline' && (
        <div className="p-5 font-mono text-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-theme-border/60">
            <div>
              <span className="text-theme-main font-bold font-sans">Pipeline: #4829 (branch: main)</span>
              <div className="text-[10px] text-theme-muted font-mono mt-0.5">Automated Multi-Stage Deployment</div>
            </div>

            <button
              onClick={startPipelineSimulation}
              disabled={isSimulatingPipeline}
              className="px-3 py-1.5 rounded-xl bg-theme-accent text-white font-mono text-xs font-bold hover:brightness-110 disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-sand-sm"
            >
              <Play className="w-3 h-3" />
              <span>{isSimulatingPipeline ? 'Deploying...' : 'Trigger Pipeline'}</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {[
              { id: 1, stage: '1. Validate', tool: 'Node.js 20 Syntax & ESLint', duration: '2.1s' },
              { id: 2, stage: '2. Build', tool: 'Docker Multi-Stage Image', duration: '14.8s' },
              { id: 3, stage: '3. Security', tool: 'Aqua Trivy Vulnerability Scan', duration: '6.4s' },
              { id: 4, stage: '4. Publish', tool: 'Docker Hub & Kubernetes Rollout', duration: '10.7s' },
            ].map((step) => {
              const isPassed = pipelineProgress >= step.id;
              const isCurrent = isSimulatingPipeline && pipelineProgress === step.id - 1;

              return (
                <div
                  key={step.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-theme-accent/10 border-theme-accent animate-pulse'
                      : isPassed
                      ? 'bg-theme-base border-theme-border shadow-sand-sm'
                      : 'bg-theme-base/40 border-theme-border/40 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : isCurrent ? (
                      <span className="w-4 h-4 rounded-full border-2 border-theme-accent border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-theme-border shrink-0" />
                    )}
                    <div>
                      <span className="font-bold text-theme-main text-xs">{step.stage}</span>
                      <span className="text-theme-muted text-[11px] ml-2 font-sans">{step.tool}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-theme-muted text-[11px]">{step.duration}</span>
                    <span
                      className={`font-bold text-[10px] ${
                        isPassed ? 'text-emerald-500' : isCurrent ? 'text-theme-accent' : 'text-theme-muted'
                      }`}
                    >
                      {isPassed ? 'Passed' : isCurrent ? 'Running...' : 'Queued'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
