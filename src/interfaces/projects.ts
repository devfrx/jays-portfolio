export interface ProjectGalleryImage {
  url: string;
  thumbnail?: string;
  caption?: string;
}

export interface ProjectFile {
  name: string;
  icon: string;
}

export interface ProjectStats {
  stars: string;
  forks: string;
  views: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  type?: string;
  year?: string;
  category: string;
  icon: string;
  technologies: string[];
  github?: string;
  demo?: string;
  gallery?: ProjectGalleryImage[];
  files?: ProjectFile[];
  codePreview?: string[];
  stats?: ProjectStats;
}

export interface WorkExperience {
  title: string;
  company: string;
  type: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  id: number;
  title: string;
  institution: string;
  period: string;
  icon: string;
  description?: string;
}

export interface ProjectFilter {
  key: string;
  label: string;
}
