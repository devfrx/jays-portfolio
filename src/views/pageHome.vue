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
                  <div class="terminal-status">
                    <div class="status-dot"></div>
                    <span class="status-text">CONNECTED</span>
                  </div>
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

                <!-- Matrix Rain Effect -->
                <div class="matrix-rain">
                  <div class="rain-column" v-for="n in 8" :key="n"></div>
                </div>
              </div>

              <!-- Holographic Stats Panel -->
              <div class="holo-stats-panel">
                <div class="holo-header">
                  <Icon icon="mdi:chart-line" class="holo-icon" />
                  <span class="holo-title">SYSTEM_STATUS</span>
                </div>
                <div class="holo-stats">
                  <div class="holo-stat" v-for="(stat, index) in systemStats" :key="stat.label"
                    :style="{ animationDelay: `${index * 0.2}s` }">
                    <div class="stat-display">
                      <div class="stat-bar">
                        <div class="stat-fill" :style="{ width: stat.percentage + '%' }"></div>
                      </div>
                      <div class="stat-info">
                        <span class="stat-value">{{ stat.value }}</span>
                        <span class="stat-label">{{ stat.label }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- CTA Buttons -->
              <div class="hero-actions">
                <router-link to="/projects" class="cta-button cta-button--primary">
                  <div class="button-bg-effect"></div>
                  <Icon icon="mdi:code-braces" class="button-icon" />
                  <span>View Projects</span>
                  <span class="button-primary">.execute()</span>
                </router-link>
                <router-link to="/contact" class="cta-button cta-button--secondary">
                  <div class="button-bg-effect"></div>
                  <Icon icon="mdi:message-text" class="button-icon" />
                  <span>Get In Touch</span>
                  <span class="button-primary">.send()</span>
                </router-link>
              </div>

              <!-- Tech Stack -->
              <div class="tech-stack">
                <div class="tech-label">
                  <Icon icon="mdi:code-tags" />
                  <span>Currently learning</span>
                </div>
                <div class="tech-list">
                  <div class="tech-item" v-for="(tech, index) in techStack" :key="tech.name"
                    :style="{ animationDelay: `${index * 0.1}s` }">
                    <div class="tech-orb">
                      <Icon :icon="tech.icon" :style="{ color: tech.color }" />
                    </div>
                    <span>{{ tech.name }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cyber Dashboard -->
            <div class="cyber-dashboard">
              <!-- Main Console -->
              <div class="main-console">
                <div class="console-header">
                  <div class="console-controls">
                    <div class="control-orb active"></div>
                    <div class="control-orb warning"></div>
                    <div class="control-orb error"></div>
                  </div>
                  <div class="console-title">
                    <Icon icon="mdi:monitor-dashboard" />
                    <span>NEURAL_INTERFACE</span>
                  </div>
                </div>

                <!-- Code Visualization -->
                <div class="code-visualization">
                  <div class="code-header">
                    <div class="file-tabs">
                      <div class="tab active">
                        <Icon icon="mdi:language-javascript" />
                        <span>main.js</span>
                      </div>
                      <div class="tab">
                        <Icon icon="mdi:language-typescript" />
                        <span>types.ts</span>
                      </div>
                    </div>
                  </div>
                  <div class="code-content">
                    <div class="code-line" v-for="(line, index) in codeLines" :key="index"
                      :style="{ animationDelay: `${index * 0.15}s` }">
                      <div class="line-number">{{ String(index + 1).padStart(2, '0') }}</div>
                      <div class="code-text" v-html="line"></div>
                      <div class="line-glow"></div>
                    </div>
                  </div>
                </div>

                <!-- Circuit Board Pattern -->
                <div class="circuit-board">
                  <div class="circuit-path" v-for="n in 6" :key="n"></div>
                  <div class="circuit-node" v-for="n in 12" :key="n"></div>
                </div>
              </div>

              <!-- Side Panels -->
              <div class="side-panels">
                <!-- Memory Usage Panel -->
                <div class="side-panel memory-panel">
                  <div class="panel-header">
                    <Icon icon="mdi:memory" />
                    <span>MEMORY</span>
                  </div>
                  <div class="memory-bars">
                    <div class="memory-bar" v-for="n in 8" :key="n"
                      :style="{ height: Math.random() * 100 + '%', animationDelay: `${n * 0.1}s` }">
                    </div>
                  </div>
                </div>

                <!-- Network Panel -->
                <div class="side-panel network-panel">
                  <div class="panel-header">
                    <Icon icon="mdi:lan" />
                    <span>NETWORK</span>
                  </div>
                  <div class="network-graph">
                    <div class="network-node center-node">
                      <div class="node-pulse"></div>
                    </div>
                    <div class="network-node" v-for="n in 6" :key="n" :style="{
                      transform: `rotate(${n * 60}deg) translateY(-40px)`,
                      animationDelay: `${n * 0.2}s`
                    }">
                    </div>
                    <div class="connection-lines">
                      <div class="connection-line" v-for="n in 6" :key="n"
                        :style="{ transform: `rotate(${n * 60}deg)` }"></div>
                    </div>
                  </div>
                </div>

                <!-- Status Panel -->
                <div class="side-panel status-panel">
                  <div class="panel-header">
                    <Icon icon="mdi:pulse" />
                    <span>STATUS</span>
                  </div>
                  <div class="status-indicators">
                    <div class="status-item">
                      <div class="status-led active"></div>
                      <span>ONLINE</span>
                    </div>
                    <div class="status-item">
                      <div class="status-led active"></div>
                      <span>READY</span>
                    </div>
                    <div class="status-item">
                      <div class="status-led warning"></div>
                      <span>LEARNING</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Advanced Background Effects -->
          <div class="hero-bg">
            <!-- Animated Grid -->
            <div class="cyber-grid">
              <div class="grid-lines-vertical">
                <div class="grid-line" v-for="n in 20" :key="n"></div>
              </div>
              <div class="grid-lines-horizontal">
                <div class="grid-line" v-for="n in 20" :key="n"></div>
              </div>
            </div>

            <!-- Floating Data Particles -->
            <div class="data-particles">
              <div class="data-particle" v-for="n in 15" :key="n" :style="{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: (Math.random() * 3 + 2) + 's'
              }">
                <span>{{ Math.random().toString(16).substr(2, 4) }}</span>
              </div>
            </div>

            <!-- Holographic Scanlines -->
            <div class="holo-scanlines">
              <div class="scanline" v-for="n in 3" :key="n"></div>
            </div>

            <!-- Energy Orbs -->
            <div class="energy-orbs">
              <div class="energy-orb" v-for="n in 5" :key="n"></div>
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
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { IonPage, IonContent } from '@ionic/vue'
  import { Icon } from "@iconify/vue"
  import { useHomeData } from '@/composables/useHomeData'
  import { useProjectsData } from '@/composables/useProjectsData'

  const { featuredProjects } = useProjectsData()
  const { techStack, codeLines } = useHomeData()

  // System stats for holographic panel
  const systemStats = ref([
    { label: 'CPU', value: '87%', percentage: 87 },
    { label: 'SKILLS', value: '94%', percentage: 94 },
    { label: 'CREATIVITY', value: '99%', percentage: 99 },
    { label: 'COFFEE', value: '12%', percentage: 12 }
  ])
</script>

<style scoped>

  /* Hero Section */
  .home-page {
    min-height: 100vh;
    background: var(--color-bg-dark);
    color: var(--color-text-dark);
    font-family: var(--font-mono);
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
    margin-top: var(--space-24);
    padding: 0 var(--space-6);
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: var(--space-16);
    align-items: center;
    z-index: 2;
  }

  /* Enhanced Terminal Window */
  .terminal-window {
    background: rgba(var(--color-surface-dark-rgb), 0.95);
    border: 2px solid rgba(var(--color-primary-rgb), 0.4);
    border-radius: var(--radius-xl);
    overflow: hidden;
    box-shadow:
      0 0 50px rgba(var(--color-primary-rgb), 0.3),
      inset 0 1px 0 rgba(var(--color-primary-rgb), 0.2);
    backdrop-filter: blur(var(--blur-lg));
    position: relative;
  }

  .terminal-header {
    background: rgba(var(--color-bg-dark-rgb), 0.9);
    padding: var(--space-4) var(--space-6);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.3);
  }

  .terminal-controls {
    display: flex;
    gap: var(--space-3);
  }

  .control {
    width: 16px;
    height: 16px;
    border-radius: var(--radius-full);
    position: relative;
    cursor: pointer;
    transition: var(--transition-all);
  }

  .control::after {
    content: '';
    position: absolute;
    inset: 2px;
    border-radius: var(--radius-full);
    background: currentColor;
    opacity: 0.8;
  }

  .control--close {
    background: #ff5f57;
    box-shadow: 0 0 10px rgba(255, 95, 87, 0.5);
  }

  .control--minimize {
    background: #ffbd2e;
    box-shadow: 0 0 10px rgba(255, 189, 46, 0.5);
  }

  .control--maximize {
    background: #28ca42;
    box-shadow: 0 0 10px rgba(40, 202, 66, 0.5);
  }

  .control:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px currentColor;
  }

  .terminal-title {
    color: var(--color-primary);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-bold);
    text-shadow: 0 0 10px rgba(var(--color-primary-rgb), 0.5);
  }

  .terminal-status {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .status-dot {
    width: 8px;
    height: 8px;
    background: var(--color-success);
    border-radius: var(--radius-full);
    animation: pulse 2s infinite;
    box-shadow: 0 0 10px var(--color-success);
  }

  .status-text {
    color: var(--color-success);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    letter-spacing: 1px;
  }

  .terminal-body {
    padding: var(--space-8);
    position: relative;
    z-index: 2;
  }

  .terminal-line {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-3);
  }

  .prompt {
    color: var(--color-primary);
    font-weight: var(--font-weight-bold);
    text-shadow: 0 0 5px rgba(var(--color-primary-rgb), 0.8);
  }

  .command {
    color: var(--color-white);
  }

  .typing {
    animation: typewriter 3s steps(14) infinite;
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
    text-shadow: 0 0 10px rgba(var(--color-primary-rgb), 0.8);
  }

  .terminal-output {
    margin: var(--space-6) 0;
    padding-left: var(--space-8);
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
    text-shadow: 0 0 30px rgba(var(--color-primary-rgb), 0.6);
    animation: glow 3s ease-in-out infinite alternate;
  }

  @keyframes glow {
    from {
      text-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.6);
    }

    to {
      text-shadow: 0 0 40px rgba(var(--color-primary-rgb), 0.8);
    }
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
    text-shadow: 0 0 10px rgba(var(--color-primary-rgb), 0.4);
  }

  /* Matrix Rain Effect */
  .matrix-rain {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.1;
  }

  .rain-column {
    position: absolute;
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom,
        transparent,
        var(--color-primary),
        transparent);
    animation: matrixRain 3s linear infinite;
  }

  .rain-column:nth-child(1) {
    left: 10%;
    animation-delay: 0s;
  }

  .rain-column:nth-child(2) {
    left: 20%;
    animation-delay: 0.5s;
  }

  .rain-column:nth-child(3) {
    left: 30%;
    animation-delay: 1s;
  }

  .rain-column:nth-child(4) {
    left: 50%;
    animation-delay: 1.5s;
  }

  .rain-column:nth-child(5) {
    left: 70%;
    animation-delay: 2s;
  }

  .rain-column:nth-child(6) {
    left: 80%;
    animation-delay: 2.5s;
  }

  .rain-column:nth-child(7) {
    left: 90%;
    animation-delay: 0.8s;
  }

  .rain-column:nth-child(8) {
    left: 95%;
    animation-delay: 1.8s;
  }

  @keyframes matrixRain {
    0% {
      transform: translateY(-100%);
    }

    100% {
      transform: translateY(100%);
    }
  }

  /* Holographic Stats Panel */
  .holo-stats-panel {
    background: rgba(var(--color-surface-dark-rgb), 0.8);
    border: 2px solid rgba(var(--color-accent-rgb), 0.3);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    margin-top: var(--space-8);
    backdrop-filter: blur(var(--blur-md));
    position: relative;
    overflow: hidden;
  }

  .holo-stats-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg,
        transparent 30%,
        rgba(var(--color-accent-rgb), 0.1) 50%,
        transparent 70%);
    animation: holoSweep 3s ease-in-out infinite;
  }

  @keyframes holoSweep {

    0%,
    100% {
      transform: translateX(-100%);
    }

    50% {
      transform: translateX(100%);
    }
  }

  .holo-header {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
    color: var(--color-accent);
  }

  .holo-icon {
    font-size: var(--font-size-lg);
  }

  .holo-title {
    font-weight: var(--font-weight-bold);
    letter-spacing: 2px;
    font-size: var(--font-size-sm);
  }

  .holo-stats {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .holo-stat {
    animation: slideInHolo 0.8s ease-out forwards;
    opacity: 0;
  }

  @keyframes slideInHolo {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .stat-display {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .stat-bar {
    flex: 1;
    height: 8px;
    background: rgba(var(--color-accent-rgb), 0.2);
    border-radius: var(--radius-full);
    overflow: hidden;
    position: relative;
  }

  .stat-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--color-accent), var(--color-primary));
    border-radius: var(--radius-full);
    transition: width 2s ease-out;
    box-shadow: 0 0 10px rgba(var(--color-accent-rgb), 0.5);
  }

  .stat-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 80px;
  }

  .stat-value {
    color: var(--color-white);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-sm);
  }

  .stat-label {
    color: var(--color-accent);
    font-size: var(--font-size-xs);
    letter-spacing: 1px;
  }

  /* Enhanced CTA Buttons */
  .hero-actions {
    display: flex;
    gap: var(--space-6);
    margin-top: var(--space-10);
  }

  .cta-button {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4) var(--space-8);
    border-radius: var(--radius-xl);
    text-decoration: none;
    font-weight: var(--font-weight-bold);
    font-family: var(--font-mono);
    transition: var(--transition-all);
    position: relative;
    overflow: hidden;
    border: 2px solid transparent;
  }

  .button-bg-effect {
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  .cta-button:hover .button-bg-effect {
    transform: translateX(100%);
  }

  .cta-button--primary {
    background: var(--gradient-primary);
    color: var(--color-bg-dark);
    box-shadow: 0 0 30px rgba(var(--color-primary-rgb), 0.4);
    border-color: rgba(var(--color-primary-rgb), 0.5);
  }

  .cta-button--secondary {
    background: var(--gradient-accent);
    color: var(--color-bg-dark);
    box-shadow: 0 0 30px rgba(var(--color-accent-rgb), 0.4);
    border-color: rgba(var(--color-accent-rgb), 0.5);
  }

  .cta-button:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 0 50px rgba(var(--color-primary-rgb), 0.6);
  }

  .button-icon {
    font-size: var(--font-size-xl);
    z-index: 2;
  }

  .button-primary {
    color: rgba(var(--color-surface-dark-rgb), 0.8);
    font-size: var(--font-size-sm);
    z-index: 2;
  }

  /* Enhanced Tech Stack */
  .tech-stack {
    margin-top: var(--space-10);
  }

  .tech-label {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    margin-bottom: var(--space-6);
  }

  .tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-6);
  }

  .tech-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    transition: var(--transition-all);
    animation: techFloat 0.8s ease-out forwards;
    opacity: 0;
  }

  @keyframes techFloat {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .tech-orb {
    width: 50px;
    height: 50px;
    border: 2px solid rgba(var(--color-primary-rgb), 0.3);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-xl);
    background: rgba(var(--color-surface-dark-rgb), 0.8);
    backdrop-filter: blur(var(--blur-sm));
    transition: var(--transition-all);
    position: relative;
  }

  .tech-orb::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: var(--radius-full);
    background: conic-gradient(from 0deg, transparent, rgba(var(--color-primary-rgb), 0.4), transparent);
    opacity: 0;
    transition: var(--transition-opacity);
    animation: orbRotate 3s linear infinite;
  }

  .tech-item:hover .tech-orb::before {
    opacity: 1;
  }

  .tech-item:hover .tech-orb {
    transform: translateY(-4px) scale(1.1);
    box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.5);
  }

  .tech-item:hover {
    color: var(--color-white);
  }

  @keyframes orbRotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  /* Cyber Dashboard */
  .cyber-dashboard {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    height: 100%;
  }

  .main-console {
    background: rgba(var(--color-surface-dark-rgb), 0.95);
    border: 2px solid rgba(var(--color-accent-rgb), 0.3);
    border-radius: var(--radius-xl);
    overflow: hidden;
    backdrop-filter: blur(var(--blur-lg));
    position: relative;
    flex: 1;
  }

  .console-header {
    background: rgba(var(--color-bg-dark-rgb), 0.9);
    padding: var(--space-4) var(--space-6);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(var(--color-accent-rgb), 0.3);
  }

  .console-controls {
    display: flex;
    gap: var(--space-2);
  }

  .control-orb {
    width: 12px;
    height: 12px;
    border-radius: var(--radius-full);
    animation: pulse 2s infinite;
  }

  .control-orb.active {
    background: var(--color-success);
  }

  .control-orb.warning {
    background: var(--color-warning);
  }

  .control-orb.error {
    background: var(--color-error);
  }

  .console-title {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--color-accent);
    font-weight: var(--font-weight-bold);
    letter-spacing: 1px;
  }

  /* Code Visualization */
  .code-visualization {
    padding: var(--space-6);
    position: relative;
  }

  .code-header {
    margin-bottom: var(--space-4);
  }

  .file-tabs {
    display: flex;
    gap: var(--space-2);
  }

  .tab {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    background: rgba(var(--color-bg-dark-rgb), 0.5);
    border: 1px solid rgba(var(--color-accent-rgb), 0.2);
    border-radius: var(--radius-md);
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    transition: var(--transition-all);
    cursor: pointer;
  }

  .tab.active {
    background: rgba(var(--color-accent-rgb), 0.2);
    color: var(--color-accent);
    border-color: var(--color-accent);
  }

  .code-content {
    background: rgba(var(--color-bg-dark-rgb), 0.8);
    border: 1px solid rgba(var(--color-accent-rgb), 0.2);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    max-height: 300px;
    overflow-y: auto;
  }

  .code-line {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-2);
    position: relative;
    opacity: 0;
    animation: codeAppear 0.8s ease-out forwards;
  }

  @keyframes codeAppear {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .line-number {
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    min-width: 30px;
    font-family: var(--font-mono);
  }

  .code-text {
    color: var(--color-white);
    font-size: var(--font-size-sm);
    font-family: var(--font-mono);
    flex: 1;
  }

  .line-glow {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
    opacity: 0;
    transition: var(--transition-opacity);
  }

  .code-line:hover .line-glow {
    opacity: 0.5;
  }

  /* Circuit Board Pattern */
  .circuit-board {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.1;
  }

  .circuit-path {
    position: absolute;
    background: var(--color-accent);
    animation: circuitFlow 4s linear infinite;
  }

  .circuit-path:nth-child(1) {
    width: 2px;
    height: 50%;
    top: 0;
    left: 20%;
  }

  .circuit-path:nth-child(2) {
    width: 50%;
    height: 2px;
    top: 30%;
    left: 0;
  }

  .circuit-path:nth-child(3) {
    width: 2px;
    height: 30%;
    bottom: 0;
    right: 30%;
  }

  .circuit-path:nth-child(4) {
    width: 30%;
    height: 2px;
    bottom: 40%;
    right: 0;
  }

  .circuit-path:nth-child(5) {
    width: 2px;
    height: 40%;
    top: 10%;
    right: 15%;
  }

  .circuit-path:nth-child(6) {
    width: 40%;
    height: 2px;
    top: 60%;
    left: 30%;
  }

  .circuit-node {
    position: absolute;
    width: 6px;
    height: 6px;
    background: var(--color-accent);
    border-radius: var(--radius-full);
    box-shadow: 0 0 10px var(--color-accent);
    animation: nodeFlash 2s ease-in-out infinite;
  }

  .circuit-node:nth-child(1) {
    top: 10%;
    left: 20%;
    animation-delay: 0s;
  }

  .circuit-node:nth-child(2) {
    top: 30%;
    left: 0%;
    animation-delay: 0.2s;
  }

  .circuit-node:nth-child(3) {
    top: 30%;
    left: 50%;
    animation-delay: 0.4s;
  }

  .circuit-node:nth-child(4) {
    bottom: 40%;
    right: 0%;
    animation-delay: 0.6s;
  }

  .circuit-node:nth-child(5) {
    bottom: 40%;
    right: 30%;
    animation-delay: 0.8s;
  }

  .circuit-node:nth-child(6) {
    bottom: 0%;
    right: 30%;
    animation-delay: 1s;
  }

  .circuit-node:nth-child(7) {
    top: 10%;
    right: 15%;
    animation-delay: 1.2s;
  }

  .circuit-node:nth-child(8) {
    top: 60%;
    left: 30%;
    animation-delay: 1.4s;
  }

  .circuit-node:nth-child(9) {
    top: 60%;
    left: 70%;
    animation-delay: 1.6s;
  }

  .circuit-node:nth-child(10) {
    top: 50%;
    right: 10%;
    animation-delay: 1.8s;
  }

  .circuit-node:nth-child(11) {
    bottom: 20%;
    left: 40%;
    animation-delay: 2s;
  }

  .circuit-node:nth-child(12) {
    top: 80%;
    right: 50%;
    animation-delay: 2.2s;
  }

  @keyframes circuitFlow {
    0% {
      opacity: 0.2;
    }

    50% {
      opacity: 0.8;
    }

    100% {
      opacity: 0.2;
    }
  }

  @keyframes nodeFlash {

    0%,
    100% {
      opacity: 0.5;
      transform: scale(1);
    }

    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  /* Side Panels */
  .side-panels {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .side-panel {
    background: rgba(var(--color-surface-dark-rgb), 0.9);
    border: 1px solid rgba(var(--color-accent-rgb), 0.3);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    backdrop-filter: blur(var(--blur-sm));
  }

  .panel-header {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--color-accent);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    letter-spacing: 1px;
    margin-bottom: var(--space-3);
  }

  /* Memory Panel */
  .memory-bars {
    display: flex;
    align-items: end;
    gap: var(--space-1);
    height: 60px;
  }

  .memory-bar {
    flex: 1;
    background: linear-gradient(to top, var(--color-accent), var(--color-primary));
    border-radius: var(--radius-sm);
    animation: memoryPulse 2s ease-in-out infinite;
    min-height: 10px;
  }

  @keyframes memoryPulse {

    0%,
    100% {
      opacity: 0.6;
    }

    50% {
      opacity: 1;
    }
  }

  /* Network Panel */
  .network-graph {
    position: relative;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .network-node {
    position: absolute;
    width: 8px;
    height: 8px;
    background: var(--color-accent);
    border-radius: var(--radius-full);
    box-shadow: 0 0 10px var(--color-accent);
    animation: networkPulse 3s ease-in-out infinite;
  }

  .center-node {
    width: 12px;
    height: 12px;
    position: relative;
  }

  .node-pulse {
    position: absolute;
    inset: -10px;
    border: 2px solid rgba(var(--color-accent-rgb), 0.3);
    border-radius: var(--radius-full);
    animation: ringExpand 2s ease-out infinite;
  }

  @keyframes networkPulse {

    0%,
    100% {
      transform: scale(1);
      opacity: 0.7;
    }

    50% {
      transform: scale(1.3);
      opacity: 1;
    }
  }

  @keyframes ringExpand {
    0% {
      transform: scale(0.5);
      opacity: 1;
    }

    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  .connection-lines {
    position: absolute;
    inset: 0;
  }

  .connection-line {
    position: absolute;
    width: 40px;
    height: 1px;
    background: linear-gradient(90deg, var(--color-accent), transparent);
    top: 50%;
    left: 50%;
    transform-origin: left center;
    animation: dataFlow 2s ease-in-out infinite;
  }

  @keyframes dataFlow {

    0%,
    100% {
      opacity: 0.3;
    }

    50% {
      opacity: 1;
    }
  }

  /* Status Panel */
  .status-indicators {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .status-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .status-led {
    width: 8px;
    height: 8px;
    border-radius: var(--radius-full);
    animation: pulse 2s infinite;
  }

  .status-led.active {
    background: var(--color-success);
  }

  .status-led.warning {
    background: var(--color-warning);
  }

  .status-item span {
    color: var(--color-text-muted);
    font-size: var(--font-size-xs);
    letter-spacing: 1px;
  }

  /* Advanced Background Effects */
  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  /* Cyber Grid */
  .cyber-grid {
    position: absolute;
    inset: 0;
    opacity: 0.15;
  }

  .grid-lines-vertical,
  .grid-lines-horizontal {
    position: absolute;
    inset: 0;
  }

  .grid-lines-vertical .grid-line {
    position: absolute;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom,
        transparent,
        var(--color-primary),
        transparent);
    animation: gridFlicker 4s ease-in-out infinite;
  }

  .grid-lines-horizontal .grid-line {
    position: absolute;
    height: 1px;
    width: 100%;
    background: linear-gradient(to right,
        transparent,
        var(--color-primary),
        transparent);
    animation: gridFlicker 4s ease-in-out infinite;
  }

  .grid-lines-vertical .grid-line:nth-child(1) {
    left: 5%;
    animation-delay: 0s;
  }

  .grid-lines-vertical .grid-line:nth-child(2) {
    left: 15%;
    animation-delay: 0.5s;
  }

  .grid-lines-vertical .grid-line:nth-child(3) {
    left: 25%;
    animation-delay: 1s;
  }

  .grid-lines-vertical .grid-line:nth-child(4) {
    left: 35%;
    animation-delay: 1.5s;
  }

  .grid-lines-vertical .grid-line:nth-child(5) {
    left: 45%;
    animation-delay: 2s;
  }

  .grid-lines-vertical .grid-line:nth-child(6) {
    left: 55%;
    animation-delay: 2.5s;
  }

  .grid-lines-vertical .grid-line:nth-child(7) {
    left: 65%;
    animation-delay: 3s;
  }

  .grid-lines-vertical .grid-line:nth-child(8) {
    left: 75%;
    animation-delay: 3.5s;
  }

  .grid-lines-vertical .grid-line:nth-child(9) {
    left: 85%;
    animation-delay: 0.2s;
  }

  .grid-lines-vertical .grid-line:nth-child(10) {
    left: 95%;
    animation-delay: 0.7s;
  }

  .grid-lines-horizontal .grid-line:nth-child(1) {
    top: 10%;
    animation-delay: 0.3s;
  }

  .grid-lines-horizontal .grid-line:nth-child(2) {
    top: 20%;
    animation-delay: 0.8s;
  }

  .grid-lines-horizontal .grid-line:nth-child(3) {
    top: 30%;
    animation-delay: 1.3s;
  }

  .grid-lines-horizontal .grid-line:nth-child(4) {
    top: 40%;
    animation-delay: 1.8s;
  }

  .grid-lines-horizontal .grid-line:nth-child(5) {
    top: 50%;
    animation-delay: 2.3s;
  }

  .grid-lines-horizontal .grid-line:nth-child(6) {
    top: 60%;
    animation-delay: 2.8s;
  }

  .grid-lines-horizontal .grid-line:nth-child(7) {
    top: 70%;
    animation-delay: 3.3s;
  }

  .grid-lines-horizontal .grid-line:nth-child(8) {
    top: 80%;
    animation-delay: 3.8s;
  }

  .grid-lines-horizontal .grid-line:nth-child(9) {
    top: 90%;
    animation-delay: 0.1s;
  }

  @keyframes gridFlicker {

    0%,
    100% {
      opacity: 0.1;
    }

    50% {
      opacity: 0.8;
    }
  }

  /* Data Particles */
  .data-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .data-particle {
    position: absolute;
    color: var(--color-accent);
    font-size: var(--font-size-xs);
    font-family: var(--font-mono);
    animation: particleFloat 5s ease-in-out infinite;
    opacity: 0;
  }

  @keyframes particleFloat {

    0%,
    100% {
      opacity: 0;
      transform: translateY(0) rotate(0deg);
    }

    10% {
      opacity: 0.8;
    }

    90% {
      opacity: 0.8;
    }

    50% {
      opacity: 1;
      transform: translateY(-100px) rotate(180deg);
    }
  }

  /* Holographic Scanlines */
  .holo-scanlines {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .scanline {
    position: absolute;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg,
        transparent,
        rgba(var(--color-accent-rgb), 0.8),
        transparent);
    animation: scanlineMove 4s linear infinite;
  }

  .scanline:nth-child(1) {
    animation-delay: 0s;
  }

  .scanline:nth-child(2) {
    animation-delay: 1.3s;
  }

  .scanline:nth-child(3) {
    animation-delay: 2.6s;
  }

  @keyframes scanlineMove {
    0% {
      top: -2px;
      opacity: 0;
    }

    10% {
      opacity: 1;
    }

    90% {
      opacity: 1;
    }

    100% {
      top: 100%;
      opacity: 0;
    }
  }

  /* Energy Orbs */
  .energy-orbs {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .energy-orb {
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--color-primary);
    border-radius: var(--radius-full);
    box-shadow: 0 0 20px var(--color-primary);
    animation: energyFloat 8s ease-in-out infinite;
  }

  .energy-orb:nth-child(1) {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  .energy-orb:nth-child(2) {
    top: 60%;
    left: 20%;
    animation-delay: 1s;
  }

  .energy-orb:nth-child(3) {
    top: 30%;
    right: 15%;
    animation-delay: 2s;
  }

  .energy-orb:nth-child(4) {
    bottom: 40%;
    left: 30%;
    animation-delay: 3s;
  }

  .energy-orb:nth-child(5) {
    top: 70%;
    right: 25%;
    animation-delay: 4s;
  }

  @keyframes energyFloat {

    0%,
    100% {
      transform: translateY(0px) scale(1);
      opacity: 0.6;
    }

    50% {
      transform: translateY(-30px) scale(1.5);
      opacity: 1;
    }
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

  /* Responsive Design */
  @media (max-width: 1200px) {
    .hero-container {
      grid-template-columns: 1fr;
      gap: var(--space-12);
      text-align: center;
    }

    .cyber-dashboard {
      max-width: 600px;
      margin: 0 auto;
    }

    .side-panels {
      flex-direction: row;
      justify-content: center;
      gap: var(--space-3);
    }

    .side-panel {
      flex: 1;
      max-width: 150px;
    }
  }

  @media (max-width: 768px) {
    .hero-container {
      margin-top: var(--space-16);
      padding: 0 var(--space-4);
    }

    .name {
      font-size: var(--font-size-4xl);
    }

    .hero-actions {
      flex-direction: column;
      align-items: center;
      gap: var(--space-4);
    }

    .cta-button {
      width: 100%;
      justify-content: center;
      max-width: 300px;
    }

    .tech-list {
      justify-content: center;
      gap: var(--space-4);
    }

    .tech-orb {
      width: 40px;
      height: 40px;
      font-size: var(--font-size-lg);
    }

    .about-content {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .side-panels {
      flex-direction: column;
      gap: var(--space-4);
    }

    .side-panel {
      max-width: none;
    }

    .code-content {
      max-height: 200px;
    }

    .memory-bars {
      height: 40px;
    }

    .network-graph {
      height: 60px;
    }
  }

</style>
