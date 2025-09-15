import { ref } from "vue";

export function useHomeData() {
  const techStack = ref([
    { name: "Vue.js", icon: "mdi:vuejs", color: "#4FC08D" },
    { name: "TypeScript", icon: "mdi:language-typescript", color: "#3178C6" },
    { name: "JavaScript", icon: "mdi:language-javascript", color: "#F7DF1E" },
    { name: "Node.js", icon: "mdi:nodejs", color: "#339933" },
    { name: "Nuxt.js", icon: "mdi:nuxt", color: "#00C58E" },
    { name: "C", icon: "mdi:language-c", color: "#A8B9CC" },
    { name: "Java", icon: "mdi:language-java", color: "#ED8B00" },
    { name: "PHP", icon: "mdi:language-php", color: "#777BB4" },
    { name: "HTML5", icon: "mdi:language-html5", color: "#E34F26" },
    { name: "CSS3", icon: "mdi:language-css3", color: "#1572B6" },
    { name: "Bootstrap", icon: "mdi:bootstrap", color: "#7952B3" },
    { name: "Git", icon: "mdi:git", color: "#F05032" },
  ]);

  const codeLines = ref([
    `<span class="keyword">const</span> <span class="variable">developer</span> = {`,
    `  <span class="property">name</span>: <span class="string">'Jays'</span>,`,
    `  <span class="property">skills</span>: [<span class="string">'Vue'</span>, <span class="string">'TypeScript'</span>, <span class="string">'C'</span>, <span class="string">'Java'</span>],`,
    `  <span class="property">passion</span>: <span class="string">'creating amazing things'</span>,`,
    `  <span class="method">code</span>() {`,
    `    <span class="keyword">return</span> <span class="string">'Clean & Efficient'</span>`,
    `  }`,
    `}`,
  ]);

  return { techStack, codeLines };
}
