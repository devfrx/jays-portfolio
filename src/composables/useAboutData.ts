import { ref } from "vue";
import type {
  ProfileStat,
  StoryParagraph,
  TimelineEvent,
  ValueItem,
  Interest,
  FunFact,
} from "@/interfaces/about";

export function useAboutData() {
  const profileStats = ref<ProfileStat[]>([
    { value: "3+", label: "Years Coding" },
    { value: "15+", label: "Projects" },
    { value: "10+", label: "Technologies" },
    { value: "∞", label: "Learning" },
  ]);

  const storyParagraphs = ref<StoryParagraph[]>([
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
        "Through formal education and countless hours of self-learning, I've developed a strong foundation in software technologies principles while staying current with modern technologies and best practices.",
    },
    {
      id: 3,
      icon: "mdi:lightbulb",
      title: "Problem Solving",
      content:
        "I thrive on challenging problems and believe that every bug is a learning opportunity. My approach combines analytical thinking with creative solutions to deliver results that exceed expectations.",
    },
  ]);

  const timelineEvents = ref<TimelineEvent[]>([
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

  const values = ref<ValueItem[]>([
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

  const interests = ref<Interest[]>([
    {
      name: "Guitar",
      icon: "mdi:guitar-acoustic",
      description:
        "Playing guitar allows me to express my creativity and unwind after a long day of coding.",
    },
    {
      name: "Gaming",
      icon: "mdi:controller-classic",
      description:
        "Gaming sharpens my problem-solving skills and I LOVE PLAYING GAMES!!",
    },
    {
      name: "Bodybuilding",
      icon: "mdi:dumbbell",
      description:
        "Staying fit and healthy is important to me, and bodybuilding helps me build discipline and resilience.",
    },
  ]);

  const funFacts = ref<FunFact[]>([
    {
      id: 1,
      emoji: "☕",
      text: "I drink at least 1 deca cup of coffee per day",
    },
    { id: 2, emoji: "🌙", text: "I do my best coding late at night" },
    { id: 3, emoji: "🐛", text: "I actually enjoy debugging complex issues" },
    {
      id: 4,
      emoji: "📚",
      text: "I have 6/7+ programming books in my collection",
    },
    {
      id: 5,
      emoji: "🎮",
      text: "I Tried to build my first game when I was 16",
    },
    {
      id: 6,
      emoji: "🚀",
      text: "I dream of working with a big tech company someday",
    },
  ]);

  return {
    profileStats,
    storyParagraphs,
    timelineEvents,
    values,
    interests,
    funFacts,
  };
}
