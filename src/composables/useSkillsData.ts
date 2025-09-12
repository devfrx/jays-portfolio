import { ref, computed } from "vue";

export function useSkillsData() {
  const skillsStats = ref([
    { number: "4+", label: "Projects", icon: "mdi:code-braces" },
    {
      number: "1+",
      label: "Years Work Experience",
      icon: "mdi:calendar-clock",
    },
    {
      number: "7+",
      label: "Years Coding Experience (high schools, Selftaught, University)",
      icon: "mdi:code-braces",
    },
    { number: "15+", label: "Technologies", icon: "mdi:tools" },
    { number: "3+", label: "Certifications", icon: "mdi:certificate" },
    { number: "85%", label: "Average Proficiency", icon: "mdi:chart-line" },
    { number: "∞", label: "Always Learning", icon: "mdi:brain" },
  ]);

  const detailedSkills = ref([
    {
      category: "Frontend Technologies",
      icon: "mdi:monitor-dashboard",
      color: "#61DAFB",
      skills: [
        {
          name: "Vue.js",
          level: 80,
          icon: "mdi:vuejs",
          color: "#4FC08D",
          experience: "3+ years",
          projects: 8,
          description:
            "Component-based architecture, Composition API, state management",
        },
        {
          name: "JavaScript",
          level: 85,
          icon: "mdi:language-javascript",
          color: "#F7DF1E",
          experience: "3+ years",
          projects: 12,
          description: "ES6+, async/await, DOM manipulation, modern frameworks",
        },
        {
          name: "TypeScript",
          level: 45,
          icon: "mdi:language-typescript",
          color: "#3178C6",
          experience: "2+ years",
          projects: 6,
          description: "Type safety, interfaces, generics, advanced typing",
        },
        {
          name: "CSS",
          level: 95,
          icon: "mdi:language-css3",
          color: "#1572B6",
          experience: "3+ years",
          projects: 15,
          description:
            "responsive design, CSS Grid, Flexbox, Media Queries, Keyframes",
        },
        {
          name: "HTML",
          level: 99,
          icon: "mdi:language-html5",
          color: "#E34F26",
          experience: "3+ years",
          projects: 15,
          description: "Semantic HTML 5, accessibility, SEO best practices",
        },
        {
          name: "Nuxt.js",
          level: 20,
          icon: "mdi:nuxt",
          color: "#00C58E",
          experience: "2+ years",
          projects: 4,
          description: "SSR, SSG, auto-routing (Still learning)",
        },
      ],
    },
    {
      category: "Backend & Systems",
      icon: "mdi:server",
      color: "#68217A",
      skills: [
        {
          name: "Node.js",
          level: 35,
          icon: "mdi:nodejs",
          color: "#339933",
          experience: "2+ years",
          projects: 5,
          description: "RESTful APIs, middleware (Still learning)",
        },
        {
          name: "PHP",
          level: 60,
          icon: "mdi:language-php",
          color: "#777BB4",
          experience: "2+ years",
          projects: 4,
          description:
            "Laravel framework (Still learning), MVC architecture, database integration",
        },
        {
          name: "Java",
          level: 90,
          icon: "mdi:language-java",
          color: "#ED8B00",
          experience: "1+ year",
          projects: 3,
          description:
            "OOP principles, Spring Boot basics, desktop applications",
        },
        {
          name: "C",
          level: 95,
          icon: "mdi:language-c",
          color: "#A8B9CC",
          experience: "1+ year",
          projects: 2,
          description:
            "System programming, memory management, algorithms, pointers",
        },
        {
          name: "MySQL",
          level: 80,
          icon: "mdi:database",
          color: "#4479A1",
          experience: "2+ years",
          projects: 8,
          description:
            "Database design, complex queries, optimization (Still learning)",
        },
      ],
    },
    {
      category: "Tools & DevOps",
      icon: "mdi:tools",
      color: "#FF6B6B",
      skills: [
        {
          name: "Git",
          level: 50,
          icon: "mdi:git",
          color: "#F05032",
          experience: "3+ years",
          projects: 15,
          description:
            "Version control, branching strategies, collaborative workflows",
        },
        {
          name: "Vite",
          level: 30,
          icon: "mdi:lightning-bolt",
          color: "#646CFF",
          experience: "2+ years",
          projects: 6,
          description:
            "(To learn Build optimization), (To learn HMR), plugin ecosystem, configuration",
        },
        {
          name: "Bootstrap",
          level: 80,
          icon: "mdi:bootstrap",
          color: "#7952B3",
          experience: "2+ years",
          projects: 8,
          description: "Responsive grids, component library, custom themes",
        },
      ],
    },
  ]);

  const learningPath = ref([
    {
      year: "2021",
      phase: "Foundation",
      technologies: ["HTML", "CSS", "JavaScript"],
      milestone: "Built first interactive website",
      icon: "mdi:foundation",
    },
    {
      year: "2022",
      phase: "Framework Adoption",
      technologies: ["Vue.js", "Bootstrap", "Git"],
      milestone: "Created first SPA application",
      icon: "mdi:rocket-launch",
    },
    {
      year: "2023",
      phase: "Full-Stack Development",
      technologies: ["Node.js", "PHP", "MySQL", "TypeScript"],
      milestone: "Deployed first full-stack project",
      icon: "mdi:layers",
    },
    {
      year: "2024",
      phase: "Professional Growth",
      technologies: ["Docker", "AWS", "Nuxt.js", "Advanced Vue"],
      milestone: "Leading development teams",
      icon: "mdi:trending-up",
    },
    {
      year: "2025",
      phase: "Specialization",
      technologies: ["React", "GraphQL", "Kubernetes", "AI/ML"],
      milestone: "Expanding into emerging technologies",
      icon: "mdi:telescope",
    },
  ]);

  const certifications = ref([
    {
      id: "vue-cert",
      title: "Vue.js Certification",
      issuer: "Vue School",
      date: "2023-06",
      level: "Advanced",
      icon: "mdi:vuejs",
      color: "#4FC08D",
      credentialUrl: "https://certificates.vue-school.com/xxx",
      verificationId: "VS-2023-VUE-ADV-001",
      skills: ["Vue.js", "Composition API", "Vuex", "Vue Router", "SSR"],
    },
    {
      id: "js-algo-cert",
      title: "JavaScript Algorithms & Data Structures",
      issuer: "freeCodeCamp",
      date: "2022-08",
      level: "Intermediate",
      icon: "mdi:language-javascript",
      color: "#F7DF1E",
      credentialUrl: "https://freecodecamp.org/certification/xxx",
      verificationId: "FCC-JS-ALGO-2022",
      skills: [
        "JavaScript",
        "Algorithms",
        "Data Structures",
        "ES6+",
        "Functional Programming",
      ],
    },
    {
      id: "responsive-cert",
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "2021-12",
      level: "Certified",
      icon: "mdi:responsive",
      color: "#0A0A23",
      credentialUrl: "https://freecodecamp.org/certification/xxx",
      skills: [
        "HTML5",
        "CSS3",
        "Flexbox",
        "Grid",
        "Media Queries",
        "Accessibility",
      ],
    },
    {
      id: "aws-cert",
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2023-03",
      expires: "2026-03",
      level: "Expert",
      icon: "mdi:aws",
      color: "#FF9900",
      credentialUrl: "https://aws.amazon.com/verification",
      verificationId: "AWS-CCP-2023-001",
      skills: [
        "Cloud Computing",
        "AWS Services",
        "Security",
        "Pricing",
        "Support",
      ],
    },
    {
      id: "typescript-cert",
      title: "TypeScript Advanced Patterns",
      issuer: "Microsoft Learn",
      date: "2023-09",
      level: "Advanced",
      icon: "mdi:language-typescript",
      color: "#3178C6",
      credentialUrl: "https://learn.microsoft.com/credentials",
      skills: [
        "TypeScript",
        "Generics",
        "Decorators",
        "Advanced Types",
        "Compiler API",
      ],
    },
  ]);

  const currentlyLearning = ref([
    {
      name: "TypeScript",
      progress: 45,
      icon: "mdi:language-typescript",
      color: "#3178C6",
      eta: "2025",
    },
    {
      name: "Vue.js",
      progress: 80,
      icon: "mdi:vuejs",
      color: "#4FC08D",
      eta: "2025",
    },
    {
      name: "Nuxt.js",
      progress: 20,
      icon: "mdi:nuxt",
      color: "#00C58E",
      eta: "2025",
    },
  ]);

  // Computed properties
  const totalSkills = computed(() => {
    return detailedSkills.value.reduce((total, category) => {
      return total + category.skills.length;
    }, 0);
  });

  const averageLevel = computed(() => {
    const allSkills = detailedSkills.value.flatMap(
      (category) => category.skills
    );
    const totalLevel = allSkills.reduce((sum, skill) => sum + skill.level, 0);
    return Math.round(totalLevel / allSkills.length);
  });

  const topSkills = computed(() => {
    const allSkills = detailedSkills.value.flatMap(
      (category) => category.skills
    );
    return allSkills.sort((a, b) => b.level - a.level).slice(0, 5);
  });

  return {
    skillsStats,
    detailedSkills,
    learningPath,
    certifications,
    currentlyLearning,
    totalSkills,
    averageLevel,
    topSkills,
  };
}
