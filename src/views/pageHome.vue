<template>
  <ion-page>
    <ion-content>
      <div class="home-page">
        <!-- Hero Section -->
        <section class="hero-section">
          <div class="hero-container">
            <div class="hero-content">
              <!-- Terminal Window -->
              <div class="terminal-window">
                <div class="terminal-header">
                  <div class="terminal-controls">
                    <span class="control control--close"></span>
                    <span class="control control--minimize"></span>
                    <span class="control control--maximize"></span>
                  </div>
                  <div class="terminal-title">jays@portfolio:~$</div>
                </div>
                <div class="terminal-body">
                  <div class="terminal-line">
                    <span class="prompt">$</span>
                    <span class="command">whoami</span>
                  </div>
                  <div class="terminal-output">
                    <span class="greeting">Hi, I'm</span>
                    <h1 class="name">
                      <span class="name-part">Francesco Idato</span>
                      <span class="greeting">AKA</span>

                      <span class="name-part name-part--primary">Jays</span>
                    </h1>
                    <p class="tagline">
                      I build <span class="highlight">digital experiences</span> that live on the web
                    </p>
                  </div>
                  <div class="terminal-line">
                    <span class="prompt">$</span>
                    <span class="command typing">cat skills.json</span>
                    <span class="cursor">_</span>
                  </div>
                </div>
              </div>

              <!-- CTA Buttons -->
              <div class="hero-actions">
                <router-link to="/projects" class="cta-button cta-button--primary">
                  <Icon icon="mdi:code-braces" class="button-icon" />
                  <span>View Projects</span>
                  <span class="button-primary">.execute()</span>
                </router-link>
                <router-link to="/contact" class="cta-button cta-button--secondary">
                  <Icon icon="mdi:message-text" class="button-icon" />
                  <span>Get In Touch</span>
                  <span class="button-primary">.send()</span>
                </router-link>
              </div>

              <!-- Tech Stack -->
              <div class="tech-stack">
                <div class="tech-label">
                  <Icon icon="mdi:code-tags" />
                  <span>Currently working with</span>
                </div>
                <div class="tech-list">
                  <div class="tech-item" v-for="tech in techStack" :key="tech.name">
                    <Icon :icon="tech.icon" :style="{ color: tech.color }" />
                    <span>{{ tech.name }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Code Animation -->
            <div class="code-animation">
              <div class="code-window">
                <div class="code-header">
                  <span class="file-name">portfolio.js</span>
                  <div class="file-tabs">
                    <span class="tab active">main</span>
                    <span class="tab">dev</span>
                  </div>
                </div>
                <div class="code-content">
                  <div class="code-line" v-for="(line, index) in codeLines" :key="index"
                    :style="{ animationDelay: `${index * 0.1}s` }">
                    <span class="line-number">{{ String(index + 1).padStart(2, '0') }}</span>
                    <span class="code-text" v-html="line"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Background Elements -->
          <div class="hero-bg">
            <div class="grid-pattern"></div>
            <div class="floating-elements">
              <div class="floating-element" v-for="n in 6" :key="n"></div>
            </div>
          </div>
        </section>

        <!-- About Preview Section -->
        <section class="about-preview">
          <div class="section-container">
            <div class="section-header">
              <span class="section-number">01.</span>
              <h2 class="section-title">About Me</h2>
              <div class="section-line"></div>
            </div>
            <div class="about-content">
              <div class="about-text">
                <p>
                  I am a code-loving person who likes to create digital experiences that touch lives. I focus on modern
                  web technologies and code with clarity, building applications that work great and are visually
                  appealing.
                </p>
                <p>
                  Now exploring design and development convergence, continually learning new tech and best practices to
                  deliver enhanced user experience.
                </p>
                <router-link to="/about" class="learn-more-link">
                  <span>Learn more about me</span>
                  <Icon icon="mdi:arrow-right" />
                </router-link>
              </div>
              <div class="about-visual">
                <div class="profile-card">
                  <div class="card-header">
                    <span class="card-title">developer.json</span>
                  </div>
                  <div class="card-content">
                    <pre class="json-content">{{
                      {
                        "name": "Jay",
                        "role": "Developer",
                        "location": "🌍",
                        "status": "available",
                        "passion": "coding",
                        "coffee": "☕ required"
                      }
                    }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Projects Preview -->
        <section class="projects-preview">
          <div class="section-container">
            <div class="section-header">
              <span class="section-number">02.</span>
              <h2 class="section-title">Featured Projects</h2>
              <div class="section-line"></div>
            </div>
            <div class="projects-grid">
              <div class="project-card" v-for="project in featuredProjects" :key="project.id">
                <div class="project-header">
                  <Icon icon="mdi:folder" class="project-icon" />
                  <div class="project-links">
                    <Icon icon="mdi:github" />
                    <Icon icon="mdi:open-in-new" />
                  </div>
                </div>
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.description }}</p>
                <div class="project-tech">
                  <span v-for="tech in project.tech" :key="tech" class="tech-tag">{{ tech }}</span>
                </div>
              </div>
            </div>
            <div class="projects-cta">
              <router-link to="/projects" class="view-all-link">
                <span>View All Projects</span>
                <Icon icon="mdi:arrow-right" />
              </router-link>
            </div>
          </div>
        </section>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { IonPage, IonContent } from '@ionic/vue'
  import { Icon } from "@iconify/vue"
  import { useHomeData } from '@/composables/useHomeData'

  const { techStack, codeLines, featuredProjects } = useHomeData()
</script>

<style scoped>

  /* Hero Section */
  .home-page {
    min-height: 100vh;
    background: var(--color-bg-dark);
    color: var(--color-text-dark);
    font-family: var(--font-mono);
    /* padding-top: var(--space-md); */
  }

  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .hero-container {
    max-width: var(--container-max-width);
    margin-inline: auto;
    margin-top: var(--space-40);
    padding: 0 var(--space-6);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    align-items: center;
    z-index: 2;
  }

  /* Terminal Window */
  .terminal-window {
    background: rgba(var(--color-surface-dark-rgb), 0.9);
    border: 1px solid rgba(var(--color-primary-rgb), 0.3);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow:
      0 0 30px rgba(var(--color-primary-rgb), 0.2),
      var(--shadow-2xl);
    backdrop-filter: blur(var(--blur-md));
  }

  .terminal-header {
    background: rgba(var(--color-bg-dark-rgb), 0.8);
    padding: var(--space-3) var(--space-4);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.2);
  }

  .terminal-controls {
    display: flex;
    gap: var(--space-2);
  }

  .control {
    width: 12px;
    height: 12px;
    border-radius: var(--radius-full);
  }

  .control--close {
    background: var(--color-error);
  }

  .control--minimize {
    background: var(--color-warning);
  }

  .control--maximize {
    background: var(--color-success);
  }

  .terminal-title {
    color: var(--color-accent);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
  }

  .terminal-body {
    padding: var(--space-6);
  }

  .terminal-line {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-2);
  }

  .prompt {
    color: var(--color-primary);
    font-weight: var(--font-weight-bold);
  }

  .command {
    color: var(--color-white);
  }

  .typing {
    animation: typewriter 2s steps(14) infinite;
  }

  @keyframes typewriter {

    0%,
    50% {
      opacity: 1;
    }

    51%,
    100% {
      opacity: 0.7;
    }
  }

  .cursor {
    color: var(--color-primary);
    animation: blink 1s infinite;
  }

  .terminal-output {
    margin: var(--space-4) 0;
    padding-left: var(--space-6);
  }

  .greeting {
    color: var(--color-text-muted);
    font-size: var(--font-size-lg);
    display: block;
    margin-bottom: var(--space-2);
  }

  .name {
    font-size: var(--font-size-6xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    margin: var(--space-2) 0;
  }

  .name-part {
    display: block;
    color: var(--color-white);
  }

  .name-part--primary {
    color: var(--color-primary);
    text-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.5);
  }

  .tagline {
    font-size: var(--font-size-xl);
    color: var(--color-text-muted);
    line-height: var(--line-height-relaxed);
    margin-top: var(--space-4);
  }

  .highlight {
    color: var(--color-primary);
    font-weight: var(--font-weight-semibold);
  }

  /* Hero Actions */
  .hero-actions {
    display: flex;
    gap: var(--space-4);
    margin-top: var(--space-8);
  }

  .cta-button {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-lg);
    text-decoration: none;
    font-weight: var(--font-weight-semibold);
    font-family: var(--font-mono);
    transition: var(--transition-all);
    position: relative;
    overflow: hidden;
  }

  .cta-button--primary {
    background: var(--gradient-primary);
    color: var(--color-bg-dark);
    box-shadow: var(--shadow-primary);
  }

  .cta-button--secondary {
    background: var(--gradient-accent);
    color: var(--color-bg-dark);
    box-shadow: var(--shadow-accent);
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(var(--color-primary-rgb), 0.4);
  }

  .button-icon {
    font-size: var(--font-size-lg);
  }

  .button-primary {
    color: rgba(var(--color-surface-dark-rgb), 0.9);
    font-size: var(--font-size-sm);
  }

  /* Tech Stack */
  .tech-stack {
    margin-top: var(--space-8);
  }

  .tech-label {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    margin-bottom: var(--space-4);
  }

  .tech-list {
    display: flex;
    flex-wrap: wrap;

    gap: var(--space-6);
  }

  .tech-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    transition: var(--transition-all);
  }

  .tech-item:hover {
    color: var(--color-white);
    transform: translateY(-2px);
  }

  /* Code Animation */
  .code-window {
    background: rgba(var(--color-surface-dark-rgb), 0.9);
    border: 1px solid rgba(var(--color-primary-rgb), 0.3);
    border-radius: var(--radius-lg);
    overflow: hidden;
    backdrop-filter: blur(var(--blur-md));
  }

  .code-header {
    background: rgba(var(--color-bg-dark-rgb), 0.8);
    padding: var(--space-3) var(--space-4);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.2);
  }

  .file-name {
    color: var(--color-accent);
    font-size: var(--font-size-sm);
  }

  .file-tabs {
    display: flex;
    gap: var(--space-2);
  }

  .tab {
    padding: var(--space-1) var(--space-3);
    background: rgba(var(--color-primary-rgb), 0.1);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
  }

  .tab.active {
    background: rgba(var(--color-primary-rgb), 0.2);
    color: var(--color-primary);
  }

  .code-content {
    padding: var(--space-4);
  }

  .code-line {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-1);
    opacity: 0;
    animation: fadeInCode 0.5s ease forwards;
  }

  @keyframes fadeInCode {
    to {
      opacity: 1;
    }
  }

  .line-number {
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    min-width: 24px;
  }

  .code-text {
    color: var(--color-white);
    font-size: var(--font-size-sm);
  }

  /* Code syntax highlighting */
  :deep(.keyword) {
    color: #ff6b9d;
  }

  :deep(.variable) {
    color: #c792ea;
  }

  :deep(.property) {
    color: #82aaff;
  }

  :deep(.string) {
    color: #c3e88d;
  }

  :deep(.method) {
    color: #ffcb6b;
  }

  /* Background Elements */
  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(var(--color-primary-rgb), 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(var(--color-primary-rgb), 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    animation: gridMove 20s linear infinite;
  }

  @keyframes gridMove {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(20px, 20px);
    }
  }

  .floating-elements {
    position: absolute;
    inset: 0;
  }

  .floating-element {
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--color-primary);
    border-radius: var(--radius-full);
    animation: float 6s ease-in-out infinite;
  }

  .floating-element:nth-child(1) {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  .floating-element:nth-child(2) {
    top: 60%;
    left: 20%;
    animation-delay: 1s;
  }

  .floating-element:nth-child(3) {
    top: 30%;
    right: 15%;
    animation-delay: 2s;
  }

  .floating-element:nth-child(4) {
    bottom: 40%;
    left: 30%;
    animation-delay: 3s;
  }

  .floating-element:nth-child(5) {
    top: 70%;
    right: 25%;
    animation-delay: 4s;
  }

  .floating-element:nth-child(6) {
    bottom: 20%;
    right: 10%;
    animation-delay: 5s;
  }

  @keyframes float {

    0%,
    100% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(-20px);
    }
  }

  /* Sections */
  .about-preview,
  .projects-preview {
    padding: var(--section-spacing) 0;
  }

  .section-container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--space-6);
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
  }

  .section-number {
    color: var(--color-primary);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
  }

  .section-title {
    color: var(--color-white);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    white-space: nowrap;
  }

  .section-line {
    flex: 1;
    height: 1px;
    background: rgba(var(--color-primary-rgb), 0.3);
  }

  /* About Preview */
  .about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    align-items: center;
  }

  .about-text p {
    color: var(--color-text-muted);
    line-height: var(--line-height-relaxed);
    margin-bottom: var(--space-4);
  }

  .learn-more-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--color-primary);
    text-decoration: none;
    font-weight: var(--font-weight-semibold);
    margin-top: var(--space-4);
    transition: var(--transition-all);
  }

  .learn-more-link:hover {
    transform: translateX(4px);
  }

  /* Profile Card */
  .profile-card {
    background: rgba(var(--color-surface-dark-rgb), 0.9);
    border: 1px solid rgba(var(--color-primary-rgb), 0.3);
    border-radius: var(--radius-lg);
    overflow: hidden;
    backdrop-filter: blur(var(--blur-md));
  }

  .card-header {
    background: rgba(var(--color-bg-dark-rgb), 0.8);
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.2);
  }

  .card-title {
    color: var(--color-primary);
    font-size: var(--font-size-sm);
  }

  .card-content {
    padding: var(--space-4);
  }

  .json-content {
    color: var(--color-white);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
  }

  /* Projects Preview */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-6);
    margin-bottom: var(--space-8);
  }

  .project-card {
    background: rgba(var(--color-surface-dark-rgb), 0.9);
    border: 1px solid rgba(var(--color-primary-rgb), 0.3);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    transition: var(--transition-all);
    backdrop-filter: blur(var(--blur-md));
  }

  .project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 30px rgba(var(--color-primary-rgb), 0.2);
  }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-4);
  }

  .project-icon {
    color: var(--color-primary);
    font-size: var(--font-size-2xl);
  }

  .project-links {
    display: flex;
    gap: var(--space-2);
  }

  .project-links svg {
    color: var(--color-text-muted);
    cursor: pointer;
    transition: var(--transition-colors);
  }

  .project-links svg:hover {
    color: var(--color-primary);
  }

  .project-title {
    color: var(--color-white);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--space-2);
  }

  .project-description {
    color: var(--color-text-muted);
    line-height: var(--line-height-relaxed);
    margin-bottom: var(--space-4);
  }

  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .tech-tag {
    background: rgba(var(--color-primary-rgb), 0.1);
    color: var(--color-primary);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-family: var(--font-mono);
  }

  .projects-cta {
    text-align: center;
  }

  .view-all-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--color-primary);
    text-decoration: none;
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-lg);
    transition: var(--transition-all);
  }

  .view-all-link:hover {
    transform: translateX(4px);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .hero-container {
      grid-template-columns: 1fr;
      gap: var(--space-8);
      text-align: center;
    }

    .about-content {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .name {
      font-size: var(--font-size-4xl);
    }

    .hero-actions {
      flex-direction: column;
      align-items: center;
    }

    .tech-list {
      justify-content: center;
      flex-wrap: wrap;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .section-container {
      padding: 0 var(--space-4);
    }

    .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-2);
    }

    .section-line {
      width: 100%;
    }
  }

  @keyframes blink {

    0%,
    50% {
      opacity: 1;
    }

    51%,
    100% {
      opacity: 0;
    }
  }
</style>