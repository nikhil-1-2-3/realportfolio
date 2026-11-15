export type ProjectCategory = 'all' | 'fullstack' | 'devops' | 'kubernetes' | 'microservices' | 'monitoring';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  shortDescription: string;
  longDescription: string;
  architectureDetails: string[];
  challengesSolved: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  gitlabUrl?: string;
  thumbnailBadge: string;
  stats?: { label: string; value: string }[];
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    highlight?: boolean;
    icon?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score: string;
  coursework: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
}
