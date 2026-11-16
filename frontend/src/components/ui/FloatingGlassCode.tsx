import React from 'react';
import { motion } from 'framer-motion';

// Authentic Official Tech Vector Logos
const KubernetesLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#326CE5"
      d="M63.556 1.911a8.51 8.44 0 0 0-3.26.826L15.794 24a8.51 8.44 0 0 0-4.603 5.725L.214 77.484a8.51 8.44 0 0 0 1.154 6.47 8.51 8.44 0 0 0 .485.673l30.799 38.297a8.51 8.44 0 0 0 6.654 3.175l49.393-.011a8.51 8.44 0 0 0 6.654-3.17l30.79-38.303a8.51 8.44 0 0 0 1.644-7.14l-10.996-47.76a8.51 8.44 0 0 0-4.604-5.727L67.681 2.738a8.51 8.44 0 0 0-4.125-.827Zm.44 16.252c1.47 0 2.664 1.327 2.664 2.961 0 .232.014.544.006.758-.034.943-.24 1.662-.364 2.531-.224 1.858-.417 3.4-.3 4.832.105.717.522 1 .869 1.332a63.624 63.624 0 0 0 .062 1.19c8.468.751 16.335 4.625 22.112 10.682l1.011-.723c.343.021 1.1.124 1.618-.176 1.19-.802 2.276-1.915 3.59-3.25.601-.638 1.044-1.245 1.76-1.861.162-.14.409-.328.59-.473 1.278-1.018 3.057-.912 3.974.238.917 1.15.622 2.908-.655 3.928-.18.145-.416.346-.588.473-.758.56-1.456.846-2.212 1.29-1.593.984-2.913 1.8-3.961 2.784-.494.53-.457 1.03-.5 1.508-.148.136-.67.598-.946.848a34.478 34.478 0 0 1 4.99 11.537 34.398 34.398 0 0 1 .56 12.435l1.073.313c.194.274.592.94 1.15 1.156 1.372.431 2.914.59 4.776.785.875.073 1.628.03 2.555.205.222.042.545.13.773.182 1.57.379 2.578 1.822 2.254 3.244-.324 1.422-1.857 2.286-3.437 1.946l-.04-.006c-.016-.004-.033-.012-.05-.016-.221-.048-.497-.098-.69-.148-.91-.245-1.57-.61-2.388-.922-1.763-.632-3.224-1.16-4.647-1.366-.72-.058-1.09.287-1.49.551a39.835 39.835 0 0 0-1.139-.199c-2.552 8.02-7.985 14.966-15.353 19.317.127.306.342.958.443 1.074-.17.449-.421.88-.205 1.572.517 1.34 1.354 2.652 2.363 4.229.488.728.988 1.288 1.428 2.122.105.2.244.507.346.717.685 1.465.183 3.151-1.131 3.785-1.326.639-2.974-.037-3.684-1.51-.1-.208-.244-.485-.33-.683-.377-.864-.507-1.604-.773-2.44-.604-1.772-1.102-3.24-1.827-4.48-.406-.6-.903-.676-1.359-.824-.085-.146-.4-.724-.57-1.024a34.56 34.56 0 0 1-4.57 1.377 34.413 34.413 0 0 1-20.01-1.44l-.604 1.09c-.449.12-.882.244-1.148.561-.97 1.157-1.356 3.016-2.061 4.786-.265.836-.393 1.577-.77 2.441-.086.196-.229.468-.33.676v.008l-.006.006c-.71 1.468-2.352 2.139-3.675 1.502-1.315-.633-1.818-2.32-1.133-3.785.102-.211.236-.517.342-.717.44-.834.94-1.398 1.427-2.127 1.008-1.578 1.895-2.994 2.413-4.334.13-.446-.063-1.057-.237-1.508l.483-1.159c-7.09-4.2-12.688-10.897-15.36-19.181l-1.162.199c-.31-.174-.937-.586-1.531-.539-1.422.206-2.88.733-4.643 1.365-.82.314-1.48.672-2.39.916-.193.052-.47.105-.69.154-.017.004-.034.014-.05.018l-.04.004c-1.58.341-3.112-.523-3.437-1.945-.325-1.422.684-2.865 2.254-3.245l.039-.011.021-.006c.224-.052.51-.125.713-.164.927-.175 1.68-.132 2.555-.205 1.862-.195 3.405-.354 4.775-.785.434-.18.85-.775 1.145-1.155l1.115-.326c-1.25-8.655.864-17.15 5.434-24.027l-.852-.762c-.055-.333-.127-1.101-.537-1.537-1.047-.983-2.366-1.8-3.959-2.783-.756-.445-1.449-.733-2.209-1.293-.16-.12-.376-.3-.55-.444l-.042-.027c-1.278-1.019-1.571-2.778-.654-3.928.516-.647 1.304-.967 2.123-.94a3.168 3.168 0 0 1 1.854.702c.182.143.431.333.593.473.715.614 1.15 1.221 1.752 1.859 1.314 1.334 2.4 2.442 3.592 3.244.626.364 1.107.218 1.582.154.153.113.667.483.961.684a34.262 34.262 0 0 1 17.404-9.943 34.663 34.663 0 0 1 4.815-.74l.062-1.128c.355-.344.753-.837.866-1.377.116-1.43-.073-2.974-.297-4.832-.124-.869-.329-1.588-.364-2.53-.007-.194.004-.462.006-.684 0-.025-.006-.05-.006-.075 0-1.634 1.193-2.959 2.663-2.959z"
    />
  </svg>
);

const DockerLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#2496ED"
      d="M110.4 55.1c.8-5.9-3.6-10.5-6.4-12.7-3.1 3.6-3.6 13.2 1.3 17.2-2.8 2.4-8.5 4.7-14.5 4.7H18.6c-.6 6.2.5 11.9 3 16.8l.8 1.5c.5.9 1.1 1.7 1.7 2.6 3 .2 5.7.3 8.2.2 4.9-.1 8.9-.7 12-1.7.5-.2.9.1 1.1.5.2.5-.1.9-.5 1.1-.4.1-.8.3-1.3.4-2.4.7-5 1.1-8.3 1.3h-.6c-1.3.1-2.7.1-4.2.1-1.6 0-3.1 0-4.9-.1 6 6.8 15.4 10.8 27.2 10.8 25 0 46.2-11.1 55.5-35.9 6.7.7 13.1-1 16-6.7-4.5-2.7-10.5-1.8-13.9-.1z"
    />
    <path
      fill="#2496ED"
      d="M28.4 52.7h9.8v9.8h-9.8v-9.8zm11.2 0h9.8v9.8h-9.8v-9.8zm11.3 0h9.8v9.8h-9.8v-9.8zm0-11.2h9.8v9.8h-9.8v-9.8zm11.3 11.2h9.8v9.8h-9.8v-9.8zm0-11.2h9.8v9.8h-9.8v-9.8zm0-11.3h9.8v9.8h-9.8v-9.8zm11.3 22.5h9.8v9.8h-9.8v-9.8zm-33.8-11.2h9.8v9.8h-9.8v-9.8z"
    />
  </svg>
);

const TerraformLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g fillRule="evenodd">
      <path d="M77.941 44.5v36.836L46.324 62.918V26.082zm0 0" fill="#844FBA" />
      <path d="M81.41 81.336l31.633-18.418V26.082L81.41 44.5zm0 0" fill="#5C4EE5" />
      <path d="M11.242 42.36L42.86 60.776V23.941L11.242 5.523zm0 0M77.941 85.375L46.324 66.957v36.82l31.617 18.418zm0 0" fill="#844FBA" />
    </g>
  </svg>
);

const AwsLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#FF9900"
      d="M118 73.348c-4.432.063-9.664 1.052-13.621 3.832-1.223.883-1.012 2.062.336 1.894 4.508-.547 14.44-1.726 16.21.547 1.77 2.23-1.976 11.62-3.663 15.79-.504 1.26.59 1.769 1.726.8 7.41-6.231 9.348-19.242 7.832-21.137-.757-.925-4.388-1.79-8.82-1.726zM1.63 75.859c-.927.116-1.347 1.236-.368 2.121 16.508 14.902 38.359 23.872 62.613 23.872 17.305 0 37.43-5.43 51.281-15.66 2.273-1.688.297-4.254-2.02-3.204-15.534 6.57-32.421 9.77-47.788 9.77-22.778 0-44.8-6.273-62.653-16.633-.39-.231-.755-.304-1.064-.266z"
    />
    <path
      fill="#232F3E"
      d="M36.38 53.64c0 1.56.17 2.83.47 3.75.34.93.76 1.94 1.35 3.03.21.34.29.67.29.97 0 .42-.25.84-.8 1.26l-2.65 1.77c-.38.25-.76.38-1.09.38-.42 0-.84-.21-1.27-.59a13.28 13.28 0 0 1-1.52-1.98 34.15 34.15 0 0 1-1.3-2.49c-3.28 3.88-7.41 5.81-12.38 5.81-3.54 0-6.36-1.01-8.42-3.03-2.06-2.02-3.11-4.72-3.11-8.09 0-3.58 1.26-6.48 3.83-8.67 2.57-2.19 5.98-3.29 10.32-3.29 1.43 0 2.9.13 4.46.34 1.56.21 3.16.55 4.85.93v-3.07c0-3.2-.68-5.43-1.98-6.73-1.3-1.3-3.57-1.94-6.81-1.94-1.47 0-2.99.17-4.55.55a33.42 33.42 0 0 0-4.55 1.43c-.68.29-1.18.46-1.47.55-.3.08-.51.13-.68.13-.59 0-.88-.42-.88-1.3v-2.06c0-.68.08-1.18.29-1.48.21-.29.59-.59 1.18-.88 1.47-.76 3.24-1.39 5.3-1.9 2.06-.55 4.25-.8 6.57-.8 5.01 0 8.67 1.14 11.03 3.41 2.32 2.27 3.49 5.73 3.49 10.36v13.64Z"
    />
  </svg>
);

const GitLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#F05032"
      d="M125.7 57.3L70.7 2.3c-3.1-3.1-8.1-3.1-11.2 0L47.7 14.1l15.1 15.1c3.3-1.1 7.2-.4 9.9 2.2 2.7 2.7 3.4 6.6 2.3 9.9l14.6 14.6c3.3-1.1 7.2-.4 9.9 2.2 3.7 3.7 3.7 9.8 0 13.5-3.7 3.7-9.8 3.7-13.5 0-2.9-2.9-3.5-7.1-2-10.5L69.8 46.9v35.3c.9.5 1.8 1.2 2.5 1.9 3.7 3.7 3.7 9.8 0 13.5-3.7 3.7-9.8 3.7-13.5 0-3.7-3.7-3.7-9.8 0-13.5.8-.8 1.8-1.5 2.8-2V46.6c-1-.5-2-1.2-2.8-2-2.9-2.9-3.5-7.2-2-10.6L41.9 19.1 2.3 58.7c-3.1 3.1-3.1 8.1 0 11.2l55 55c3.1 3.1 8.1 3.1 11.2 0l57.2-57.2c3.1-3.3 3.1-8.3 0-11.4z"
    />
  </svg>
);

const MySqlLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#00758F"
      d="M109.9 76.5c-4.4-1.7-8.8-3.3-13.3-4.8-1.5 4.3-3.6 8.3-6.4 11.9 6.8 1.4 13.8 2.3 20.9 2.5-0.4-3.2-0.8-6.4-1.2-9.6zM61.8 15.2C48.6 19.8 38 29.8 32.2 42.6c-4.3 9.5-5.6 20.3-3.6 30.6 2 10.3 7.8 19.6 16.1 26 5.8 4.4 12.7 7.2 20 8.1 1.7.2 3.4.3 5.1.3 10.6 0 20.7-4.1 28.3-11.4 4.5-4.4 7.9-9.8 10-15.7-10.7-3.6-21.7-6.2-32.9-7.8-2.5 4.2-5.7 7.9-9.5 10.9-4.7 3.7-10.4 5.9-16.4 6.3-5.9.4-11.8-1-16.7-4-4.8-3-8.3-7.5-10-12.7-1.7-5.2-1.6-10.9.3-16.1 1.9-5.1 5.4-9.5 10-12.4 4.6-2.9 10-4.3 15.5-3.9 5.5.4 10.7 2.6 14.8 6.2 3.9 3.5 6.7 8 8 13.1 8.7 1.3 17.2 3.4 25.5 6.3 0.2-2.3.2-4.6 0-6.9-0.8-7.9-4.2-15.3-9.7-21-5.6-5.8-13-9.7-21.1-11.2-2.7-.5-5.5-.7-8.3-.5z"
    />
    <path fill="#F29111" d="M106.8 53.6c-2.3-3.5-5.4-6.4-9.1-8.4 2.8 3 4.9 6.6 6.2 10.5 1.1-0.7 2-1.4 2.9-2.1z" />
  </svg>
);

interface CodeSnippet {
  id: string;
  logo: React.FC<{ className?: string }>;
  accentColor: string;
  dotColor: string;
  content: React.ReactNode;
  positionClasses: string;
  floatRangeY: [number, number, number];
  duration: number;
  delay: number;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'k8s',
    logo: KubernetesLogo,
    accentColor: '#A2574F',
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
  },
  {
    id: 'aws',
    logo: AwsLogo,
    accentColor: '#E68057',
    dotColor: 'bg-ochre',
    content: (
      <>
        <span className="text-ochre font-bold">AWS EKS</span>{' '}
        <span className="text-[#5C4448]">Multi-AZ</span>{' '}
        <span className="text-cognac font-bold">• 12ms</span>
      </>
    ),
    positionClasses: '-top-8 left-1 sm:left-4',
    floatRangeY: [5, -5, 5],
    duration: 6,
    delay: 0.5,
  },
  {
    id: 'terraform',
    logo: TerraformLogo,
    accentColor: '#993A8B',
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
  },
  {
    id: 'docker-app',
    logo: DockerLogo,
    accentColor: '#E68057',
    dotColor: 'bg-ochre',
    content: (
      <>
        <span className="text-ochre font-bold">docker</span>{' '}
        <span className="text-[#5C4448]">compose</span>{' '}
        <span className="text-cognac font-bold">up -d</span>{' '}
        <span className="text-rose font-semibold">// multi-tier</span>
      </>
    ),
    positionClasses: 'top-40 right-2 lg:right-10',
    floatRangeY: [-7, 5, -7],
    duration: 6.5,
    delay: 0.4,
  },
  {
    id: 'mysql-db',
    logo: MySqlLogo,
    accentColor: '#BF7587',
    dotColor: 'bg-rose',
    content: (
      <>
        <span className="text-rose font-bold">MySQL 8</span>{' '}
        <span className="text-[#5C4448]">InnoDB</span>{' '}
        <span className="text-cognac font-bold">:3307</span>
      </>
    ),
    positionClasses: 'top-60 right-0 lg:right-6',
    floatRangeY: [6, -6, 6],
    duration: 5.8,
    delay: 1.2,
  },
  {
    id: 'git-deploy',
    logo: GitLogo,
    accentColor: '#A2574F',
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
  },
];

export const FloatingGlassCode: React.FC = () => {
  return (
    <>
      {/* Desktop & Tablet Floating Glass Elements with Real Tech Logos */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {SNIPPETS.map((snippet) => {
          const Logo = snippet.logo;
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
              {/* Official Tech Logo Container */}
              <div
                className="p-1 rounded-lg border shadow-sm group-hover:scale-110 transition-transform bg-white shrink-0"
                style={{ borderColor: `${snippet.accentColor}30` }}
              >
                <Logo className="w-4 h-4 object-contain" />
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
        {SNIPPETS.slice(0, 4).map((snippet) => {
          const Logo = snippet.logo;
          return (
            <div
              key={snippet.id}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/85 border border-rose/25 shadow-aesthetic-sm shrink-0 font-mono text-[11px]"
            >
              <Logo className="w-3.5 h-3.5 shrink-0" />
              <div>{snippet.content}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
