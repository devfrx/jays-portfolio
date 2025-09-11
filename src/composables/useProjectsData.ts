import { ref, computed } from "vue";

export function useProjectsData() {
  const stats = ref([
    { number: "15+", label: "Projects", icon: "mdi:code-braces" },
    { number: "3+", label: "Years Experience", icon: "mdi:calendar-clock" },
    { number: "10+", label: "Technologies", icon: "mdi:tools" },
    { number: "5+", label: "Certifications", icon: "mdi:certificate" },
  ]);

  const featuredProjects = ref([
    {
      id: 1,
      title: "Easyorder",
      description:
        "An advanced configurator for digitalized recycling stations, enabling step-by-step customization, real-time constraints, instant quotations, and saved configurations with user preferences.",
      type: "Configuration & Quoting Software",
      year: "2025",
      category: "work",
      icon: "mdi:storefront",
      technologies: [
        "Vue.js",
        "Node.js",
        "MySQL",
        "JavaScript",
        "CSS",
        "Ionic",
        "Pinia",
        "Vite",
        "Capacitor",
        "...",
      ],
      github: "https://github.com/devfrx/configurator-ecoctrl.git",
      demo: "https://easyorder.ecocontrolgsm.it/login",
      files: [
        { name: "src/", icon: "mdi:folder" },
        { name: "components/", icon: "mdi:folder" },
        { name: "Configurations.vue", icon: "mdi:vuejs" },
        { name: "api.js", icon: "mdi:language-javascript" },
        { name: "package.json", icon: "mdi:nodejs" },
      ],
      codePreview: [
        `<span class="keyword">const</span> <span class="variable">config</span> = <span class="keyword">await</span> <span class="method">fetchConfigs</span>()`,
        `<span class="keyword">if</span> (<span class="variable">config?</span>.<span class="property">options</span>) {`,
        `  <span class="method">showAlert</span>(<span class="string">'Hot day ahead!'</span>)`,
        `}`,
        `<span class="method">loadConfig</span>(<span class="variable">config</span>.<span class="property">options</span>)`,
      ],
      stats: {
        stars: "15",
        forks: "4",
        views: "2.1k",
      },
    },
    {
      id: 2,
      title: "Recipay",
      description:
        "POS System and order management app for restaurants, order & products management, receipt printing & order-friendly user mobile version.",
      type: "Management Software",
      year: "2024",
      category: "work",
      icon: "mdi:clipboard-check",
      technologies: [
        "Vue.js",
        "TypeScript",
        "Laravel",
        "MySQL",
        "Ionic",
        "PHP",
        "CSS",
        "Capacitor",
        "...",
      ],
      github: "https://github.com/domenicotig/recipay-frontend.git",
      demo: "https://app.recipay.it/login",
      files: [
        { name: "src/", icon: "mdi:folder" },
        { name: "components/", icon: "mdi:folder" },
        { name: "App.vue", icon: "mdi:vuejs" },
        { name: "index.ts", icon: "mdi:language-typescript" },
        { name: "package.json", icon: "mdi:nodejs" },
      ],
      codePreview: [
        `<span class="keyword">function</span> <span class="variable">Recipay</span>() {`,
        `  <span class="keyword">const</span> [<span class="variable">orders</span>, <span class="variable">setOrders</span>] = <span class="method">useState</span>([])`,
        `  <span class="keyword">return</span> (`,
        `    &lt;<span class="variable">OrderManager</span> <span class="property">orders</span>={<span class="variable">orders</span>} /&gt;`,
        `  )`,
        `}`,
      ],
      stats: {
        stars: "8",
        forks: "2",
        views: "850",
      },
    },
    {
      id: 3,
      title: "Kamiswear",
      description:
        "E-commerce platform for a clothing brand, featuring product management & secure payments, built with basic web technologies (I was learning webdev).",
      type: "E-Commerce",
      year: "2020",
      category: "personal",
      icon: "mdi:weather-partly-cloudy",
      technologies: ["JavaScript", "CSS", "HTML"],
      github: "https://github.com/jays/weather-dashboard",
      demo: "https://weather.jays.dev",
      files: [
        { name: "src/", icon: "mdi:folder" },
        { name: "components/", icon: "mdi:folder" },
        { name: "App.vue", icon: "mdi:vuejs" },
        { name: "main.ts", icon: "mdi:language-typescript" },
        { name: "package.json", icon: "mdi:nodejs" },
      ],
      codePreview: [
        `<span class="keyword">export default</span> {`,
        `  <span class="property">name</span>: <span class="string">'Kamiswear'</span>,`,
        `  <span class="property">components</span>: { <span class="variable">Clothing Brand</span> },`,
        `  <span class="method">async</span> <span class="method">mounted</span>() {`,
        `    <span class="keyword">await</span> <span class="variable">this</span>.<span class="method">shirt</span>()`,
        `  }`,
        `}`,
      ],
      stats: {
        stars: "12",
        forks: "3",
        views: "1.2k",
      },
    },
  ]);

  const workExperience = ref([
    {
      title: "Full Stack Developer",
      company: "TechCorp Solutions",
      type: "Full-time",
      period: "2023 - Present",
      description:
        "Leading development of enterprise web applications and maintaining legacy systems.",
      achievements: [
        "Reduced application load time by 40% through optimization",
        "Led a team of 3 junior developers",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
      ],
      technologies: ["Vue.js", "Node.js", "PostgreSQL", "Docker", "AWS"],
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      type: "Contract",
      period: "2022 - 2023",
      description:
        "Developed responsive web applications for various clients in different industries.",
      achievements: [
        "Delivered 10+ client projects on time and within budget",
        "Improved client satisfaction score by 25%",
        "Mentored new team members on best practices",
      ],
      technologies: ["React", "TypeScript", "Sass", "Figma", "Git"],
    },
    {
      title: "Junior Web Developer",
      company: "StartupXYZ",
      type: "Full-time",
      period: "2021 - 2022",
      description: "Built and maintained company website and internal tools.",
      achievements: [
        "Developed company's first mobile-responsive website",
        "Created internal dashboard reducing manual work by 30%",
        "Collaborated with design team to improve UX",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    },
  ]);

  const education = ref([
    {
      id: 1,
      title: "Computer Science Degree",
      institution: "University of Technology",
      period: "2018 - 2021",
      icon: "mdi:school",
      description:
        "Bachelor's degree with focus on software engineering and web development.",
    },
    {
      id: 2,
      title: "AWS Cloud Practitioner",
      institution: "Amazon Web Services",
      period: "2023",
      icon: "mdi:aws",
    },
    {
      id: 3,
      title: "Vue.js Certification",
      institution: "Vue School",
      period: "2022",
      icon: "mdi:vuejs",
    },
    {
      id: 4,
      title: "Full Stack Web Development",
      institution: "Codecademy",
      period: "2021",
      icon: "mdi:certificate",
    },
  ]);

  const allProjects = ref([
    ...featuredProjects.value,
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "Personal portfolio built with Vue.js and modern design principles.",
      category: "personal",
      icon: "mdi:account",
      technologies: ["Vue.js", "TypeScript", "CSS3", "Vite"],
      github: "https://github.com/jays/portfolio",
      demo: "https://jays.dev",
    },
    {
      id: 5,
      title: "Expense Tracker",
      description: "Mobile-first expense tracking app with data visualization.",
      category: "personal",
      icon: "mdi:chart-line",
      technologies: ["React Native", "Firebase", "Chart.js"],
      github: "https://github.com/jays/expense-tracker",
    },
    {
      id: 6,
      title: "Blog CMS",
      description:
        "Content management system for technical blogs with markdown support.",
      category: "work",
      icon: "mdi:post",
      technologies: ["Nuxt.js", "Strapi", "GraphQL", "PostgreSQL"],
      github: "https://github.com/jays/blog-cms",
      demo: "https://blog-cms.jays.dev",
    },
  ]);

  const filters = ref([
    { key: "all", label: "All Projects" },
    { key: "featured", label: "Featured" },
    { key: "work", label: "Professional" },
    { key: "personal", label: "Personal" },
  ]);

  const activeFilter = ref("all");

  const filteredProjects = computed(() => {
    if (activeFilter.value === "all") {
      return allProjects.value;
    } else if (activeFilter.value === "featured") {
      return featuredProjects.value;
    } else {
      return allProjects.value.filter(
        (project) => project.category === activeFilter.value
      );
    }
  });

  return {
    stats,
    featuredProjects,
    workExperience,
    education,
    allProjects,
    filters,
    activeFilter,
    filteredProjects,
  };
}
