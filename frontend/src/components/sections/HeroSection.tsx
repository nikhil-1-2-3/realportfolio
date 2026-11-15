import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowDown, Mail, Download, Github, Linkedin, Gitlab, Terminal, Cpu, Layers } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 24,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-sand-texture"
    >
      {/* Ambient Warm Sun-Baked Ray Gradient in Background */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-amber-500/12 via-orange-400/8 to-amber-200/5 blur-[130px] -z-10"
        aria-hidden="true"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto w-full flex flex-col items-center text-center"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-amber-900/15 shadow-sand backdrop-blur-md mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600 shadow-sm" />
            </span>
            <span className="text-xs font-mono font-medium text-stone-700">
              Available for Full Stack & Cloud / DevOps Roles
            </span>
          </div>
        </motion.div>

        {/* Hero Identity & Grand Headline */}
        <motion.div variants={itemVariants} className="space-y-4 max-w-4xl">
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-amber-800 font-semibold">
            Architectural Engineering
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-stone-900 leading-[1.05]">
            Singh Nikhil <span className="text-gradient-gold">Subhash</span>
          </h1>

          <p className="text-lg sm:text-2xl font-serif text-stone-700 max-w-3xl mx-auto leading-relaxed">
            Full Stack Developer <span className="text-amber-800/60 px-2 font-mono">|</span> Cloud & DevOps Engineer
          </p>
        </motion.div>

        {/* Punchy Narrative Headline */}
        <motion.div variants={itemVariants} className="mt-6 max-w-2xl mx-auto">
          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Building applications. Automating infrastructure. Solving real problems.
          </p>
        </motion.div>

        {/* Tactile Shaded Metrics Ribbon */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap justify-center items-center gap-3 font-mono text-xs text-stone-700"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-amber-900/10 shadow-sand-sm">
            <Terminal className="w-4 h-4 text-amber-700" />
            <span className="font-medium">MERN & Microservices</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-amber-900/10 shadow-sand-sm">
            <Cpu className="w-4 h-4 text-terracotta-600" />
            <span className="font-medium">Docker & Kubernetes</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-amber-900/10 shadow-sand-sm">
            <Layers className="w-4 h-4 text-lapis-600" />
            <span className="font-medium">CI/CD & Terraform IaC</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollTo('projects')}
            rightIcon={<ArrowDown className="w-4 h-4" />}
          >
            Explore Projects
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => scrollTo('contact')}
            leftIcon={<Mail className="w-4 h-4 text-amber-700" />}
          >
            Get in Touch
          </Button>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={PERSONAL_INFO.resumeUrl}
            download="Nikhil_Singh_Resume.pdf"
            className="inline-flex items-center justify-center font-mono text-xs font-bold px-5 py-3.5 gap-2 rounded-xl bg-white hover:bg-[#faf7f2] text-stone-800 border border-amber-900/15 transition-all shadow-sand-sm"
          >
            <Download className="w-4 h-4 text-amber-700" />
            <span>Resume (PDF)</span>
          </motion.a>
        </motion.div>

        {/* Social Connect Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-amber-900/10 w-full max-w-md flex items-center justify-center gap-6"
        >
          <motion.a
            whileHover={{ scale: 1.1, color: '#b45309' }}
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-stone-600 transition-colors p-2 rounded-xl hover:bg-amber-900/[0.04]"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4 text-stone-700" />
            <span>GitHub</span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.1, color: '#c2410c' }}
            href={PERSONAL_INFO.socials.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-stone-600 transition-colors p-2 rounded-xl hover:bg-amber-900/[0.04]"
            aria-label="GitLab Profile"
          >
            <Gitlab className="w-4 h-4 text-stone-700" />
            <span>GitLab</span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.1, color: '#0369a1' }}
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-stone-600 transition-colors p-2 rounded-xl hover:bg-amber-900/[0.04]"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4 text-stone-700" />
            <span>LinkedIn</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};
