export interface Skill {
  name: string;
  level: number;
  icon: string;
  color: string;
  experience: string;
  projects: number;
  description: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export interface StatsItem {
  number: string;
  label: string;
  icon: string;
}

export interface LearningPathPhase {
  year: string;
  phase: string;
  technologies: string[];
  milestone: string;
  icon: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  expires?: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert" | "Certified";
  icon: string;
  color: string;
  credentialUrl?: string;
  verificationId?: string;
  skills?: string[];
}

export interface LearningItem {
  name: string;
  progress: number;
  icon: string;
  color: string;
  eta: string;
}
