import { ref, computed } from "vue";

export function useProjectsData() {
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
      gallery: [
        {
          url: "public/assets/configurator/configuratorHome.png",
          thumbnail: "public/assets/configurator/configuratorHome.png",
          caption: "Configurator homepage with quicksearch, favorites and CTAs",
        },
        {
          url: "public/assets/configurator/configuratorCategories.png",
          thumbnail: "public/assets/configurator/configuratorCategories.png",
          caption: "Category selection",
        },
        {
          url: "public/assets/configurator/configuratorStep.png",
          thumbnail: "public/assets/configurator/configuratorStep.png",
          caption: "Step-by-step configuration wizard",
        },
        {
          url: "public/assets/configurator/configuratorStepConstraints.png",
          thumbnail:
            "public/assets/configurator/configuratorStepConstraints.png",
          caption: "Step-by-step configuration wizard with constraints",
        },
        {
          url: "public/assets/configurator/configuratorStepDetails.png",
          thumbnail: "public/assets/configurator/configuratorStepDetails.png",
          caption: "Step-by-step configuration wizard details at the footer",
        },
        {
          url: "public/assets/configurator/configuratorSummary1.png",
          thumbnail: "public/assets/configurator/configuratorSummary1.png",
          caption:
            "Summary page with services included, products management and details and commercial specs",
        },
        {
          url: "public/assets/configurator/configuratorSummary2.png",
          thumbnail: "public/assets/configurator/configuratorSummary2.png",
          caption:
            "Summary page bottom with found tecnical sheets and brochures found in configured products and CTAs",
        },
        {
          url: "public/assets/configurator/configuratorConfirmation.png",
          thumbnail: "public/assets/configurator/configuratorConfirmation.png",
          caption: "Customer selection and info and CTAs",
        },
        {
          url: "public/assets/configurator/configuratorSeeQuotes.png",
          thumbnail: "public/assets/configurator/configuratorSeeQuotes.png",
          caption: "Digital quotes created page preview",
        },
        {
          url: "public/assets/configurator/configuratorQuote.png",
          thumbnail: "public/assets/configurator/configuratorQuote.png",
          caption: "Digital quote preview",
        },
        {
          url: "public/assets/configurator/configuratorBS.png",
          thumbnail: "public/assets/configurator/configuratorBS.png",
          caption: "Brochures and tecnical sheets of products",
        },
      ],
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
      gallery: [
        {
          url: "public/assets/recipay/recipayProducts.png",
          thumbnail: "public/assets/recipay/recipayProducts.png",
          caption:
            "Products management page (cashier view, admin has CTAs to manage)",
        },
        {
          url: "public/assets/recipay/recipayDrafts.png",
          thumbnail: "public/assets/recipay/recipayDrafts.png",
          caption:
            "Drafts management page, the cashier can turn drafts into orders or confirm them istantly",
        },
        {
          url: "public/assets/recipay/recipayCashreg.png",
          thumbnail: "public/assets/recipay/recipayCashreg.png",
          caption: "Cash register, connected to a receipt printer",
        },
        {
          url: "public/assets/recipay/recipaySettings.png",
          thumbnail: "public/assets/recipay/recipaySettings.png",
          caption:
            "Settings tab, with password reset (managed in laravel) and other settings",
        },
      ],
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
      github: "",
      demo: "https://kamiswear.netlify.app/",
      gallery: [
        {
          url: "public/assets/kamiswear/kamisHome.png",
          thumbnail: "public/assets/kamiswear/kamisHome.png",
          caption: "Kamiswear Homepage (Responsive)",
        },
        {
          url: "public/assets/kamiswear/kamis1.png",
          thumbnail: "public/assets/kamiswear/kamis1.png",
          caption:
            "Seasonal products page, no products in the project no more :/",
        },
      ],
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
      title: "Frontend (Sometimes backend) Developer",
      company: "EcocontrolGSM",
      type: "Full-time",
      period: "2025 - Present",
      description:
        "Developing and maintaining web applications and management softwares.",
      achievements: [
        "Developed a complex configurator app increasing workflow efficiency, reducing errors and boosting sales.",
        "Worked closely with product managers to define project scope and requirements.",
        "Implemented responsive designs to ensure optimal user experience across devices.",
      ],
      technologies: [
        "Vue.js",
        "Node.js",
        "Vite",
        "SSH",
        "Aruba Hosting and DB",
        "MySQL",
        "Ionic",
        "TypeScript",
        "Pinia",
        "Capacitor",
      ],
    },
    {
      title: "Frontend Developer",
      company: "KamisWear",
      type: "Personal Project",
      period: "2021 - 2022",
      description:
        "Built and maintained the e-commerce website for a clothing brand.",
      achievements: [
        "This Project was a big step for me, I learned a lot of new things and started understanding how to manage a real project.",
        "Tried to implement best practices and write clean code",
        "Learned and implemented SEO strategies",
      ],
      technologies: ["HTML", "Javascript", "CSS3", "Git"],
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
    featuredProjects,
    workExperience,
    education,
    allProjects,
    filters,
    activeFilter,
    filteredProjects,
  };
}
