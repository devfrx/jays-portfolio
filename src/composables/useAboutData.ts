import { ref } from "vue";

export function useAboutData() {
  const profileStats = ref([
    { value: "3+", label: "Years Coding" },
    { value: "15+", label: "Projects" },
    { value: "10+", label: "Technologies" },
    { value: "∞", label: "Learning" },
  ]);

  const storyParagraphs = ref([
    {
      id: 1,
      icon: "mdi:rocket-launch",
      title: "The Beginning",
      content:
        "My journey into programming started with curiosity and a desire to create. What began as tinkering with HTML and CSS quickly evolved into a passion for building meaningful digital experiences.",
    },
    {
      id: 2,
      icon: "mdi:school",
      title: "Learning & Growing",
      content:
        "Through formal education and countless hours of self-learning, I've developed a strong foundation in computer science principles while staying current with modern technologies and best practices.",
    },
    {
      id: 3,
      icon: "mdi:lightbulb",
      title: "Problem Solving",
      content:
        "I thrive on challenging problems and believe that every bug is a learning opportunity. My approach combines analytical thinking with creative solutions to deliver results that exceed expectations.",
    },
  ]);

  const timelineEvents = ref([
    {
      year: "2021",
      title: "First Steps",
      description:
        "Started learning programming with HTML, CSS, and JavaScript",
    },
    {
      year: "2022",
      title: "Framework Mastery",
      description:
        "Dove deep into Vue.js and began building complex applications",
    },
    {
      year: "2023",
      title: "Professional Growth",
      description:
        "Landed first full-stack developer role and expanded into backend technologies",
    },
    {
      year: "2024",
      title: "Leading Projects",
      description:
        "Currently leading development teams and architecting scalable solutions",
    },
  ]);

  const skillCategories = ref([
    {
      name: "Frontend Development",
      icon: "mdi:monitor-dashboard",
      skills: [
        { name: "Vue.js", level: 90 },
        { name: "JavaScript", level: 88 },
        { name: "TypeScript", level: 85 },
        { name: "HTML/CSS", level: 95 },
        { name: "Nuxt.js", level: 80 },
      ],
    },
    {
      name: "Backend Development",
      icon: "mdi:server",
      skills: [
        { name: "Node.js", level: 82 },
        { name: "PHP", level: 75 },
        { name: "Java", level: 70 },
        { name: "C", level: 65 },
        { name: "Databases", level: 78 },
      ],
    },
    {
      name: "Tools & Technologies",
      icon: "mdi:tools",
      skills: [
        { name: "Git", level: 92 },
        { name: "Docker", level: 70 },
        { name: "AWS", level: 68 },
        { name: "Vite", level: 85 },
        { name: "Figma", level: 75 },
      ],
    },
  ]);

  const values = ref([
    {
      title: "Clean Code",
      icon: "mdi:code-braces",
      description:
        "I believe in writing code that is not just functional, but readable, maintainable, and elegant. Every line of code should tell a story.",
      code: "const code = readable && maintainable && elegant;",
    },
    {
      title: "Continuous Learning",
      icon: "mdi:book-open-variant",
      description:
        "Technology evolves rapidly, and so do I. I'm committed to staying curious and learning new things every day.",
      code: "while (alive) { keepLearning(); }",
    },
    {
      title: "User Experience",
      icon: "mdi:account-heart",
      description:
        "Great software puts users first. I strive to create intuitive, accessible, and delightful experiences for everyone.",
      code: "if (user.happy) { mission.accomplished(); }",
    },
    {
      title: "Collaboration",
      icon: "mdi:account-group",
      description:
        "The best solutions come from diverse perspectives and teamwork. I value open communication and shared knowledge.",
      code: "team.synergy > individual.effort;",
    },
  ]);

  const interests = ref([
    {
      name: "Photography",
      icon: "mdi:camera",
      description:
        "Capturing moments and exploring composition teaches me to see details and beauty in everyday life.",
    },
    {
      name: "Gaming",
      icon: "mdi:controller-classic",
      description:
        "From indie games to AAA titles, gaming inspires my creativity and keeps me connected to interactive design trends.",
    },
    {
      name: "Music Production",
      icon: "mdi:music",
      description:
        "Creating music helps me understand rhythm, structure, and the emotional impact of digital creativity.",
    },
    {
      name: "Fitness & Running",
      icon: "mdi:run",
      description:
        "Staying active keeps my mind sharp and provides the energy needed for long coding sessions.",
    },
  ]);

  const funFacts = ref([
    { id: 1, emoji: "☕", text: "I drink at least 4 cups of coffee per day" },
    { id: 2, emoji: "🌙", text: "I do my best coding late at night" },
    { id: 3, emoji: "🐛", text: "I actually enjoy debugging complex issues" },
    {
      id: 4,
      emoji: "📚",
      text: "I have 50+ programming books in my collection",
    },
    { id: 5, emoji: "🎮", text: "I built my first game when I was 16" },
    {
      id: 6,
      emoji: "🚀",
      text: "I dream of contributing to space technology someday",
    },
  ]);

  return {
    profileStats,
    storyParagraphs,
    timelineEvents,
    skillCategories,
    values,
    interests,
    funFacts,
  };
}
