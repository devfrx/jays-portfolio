<template>
    <ion-page>
        <ion-content>
            <div class="about-page">
                <!-- Hero Section -->
                <section class="about-hero">
                    <div class="hero-container">
                        <div class="hero-content">
                            <div class="terminal-window">
                                <div class="terminal-header">
                                    <div class="terminal-controls">
                                        <span class="control control--close"></span>
                                        <span class="control control--minimize"></span>
                                        <span class="control control--maximize"></span>
                                    </div>
                                    <div class="terminal-title">about@jays:~$</div>
                                </div>
                                <div class="terminal-body">
                                    <div class="terminal-line">
                                        <span class="prompt">$</span>
                                        <span class="command">cat about.md</span>
                                    </div>
                                    <div class="terminal-output">
                                        <h1 class="page-title">
                                            About <span class="title-accent">Me</span>
                                        </h1>
                                        <p class="page-description">
                                            The story behind the code, the passion, and the journey of continuous
                                            learning
                                        </p>
                                    </div>
                                    <div class="terminal-line">
                                        <span class="prompt">$</span>
                                        <span class="command typing">grep -r "passion" ./developer</span>
                                        <span class="cursor">_</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Profile Visual -->
                        <div class="profile-visual">
                            <div class="profile-container">
                                <div class="profile-avatar">
                                    <div class="avatar-placeholder">
                                        <Icon icon="mdi:account" />
                                    </div>
                                    <div class="status-indicator">
                                        <span class="status-dot"></span>
                                        <span class="status-text">Available for work</span>
                                    </div>
                                </div>
                                <!-- <div class="profile-stats">
                                    <div class="stat-item" v-for="stat in profileStats" :key="stat.label">
                                        <span class="stat-value">{{ stat.value }}</span>
                                        <span class="stat-label">{{ stat.label }}</span>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Add GitHub Activity Section -->
                <section class="github-section">
                    <div class="section-container">
                        <div class="section-header">
                            <span class="section-number">01.</span>
                            <h2 class="section-title">GitHub Activity</h2>
                            <div class="section-line"></div>
                        </div>

                        <GitHubActivity :username="githubUsername" />
                    </div>
                </section>

                <!-- Story Section -->
                <section class="story-section">
                    <div class="section-container">
                        <div class="section-header">
                            <span class="section-number">02.</span>
                            <h2 class="section-title">My Journey</h2>
                            <div class="section-line"></div>
                        </div>

                        <div class="story-content">
                            <div class="story-text">
                                <div class="story-paragraph" v-for="paragraph in storyParagraphs" :key="paragraph.id">
                                    <div class="paragraph-marker">
                                        <Icon :icon="paragraph.icon" />
                                    </div>
                                    <div class="paragraph-content">
                                        <h3 class="paragraph-title">{{ paragraph.title }}</h3>
                                        <p class="paragraph-text">{{ paragraph.content }}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="story-timeline">
                                <div class="timeline-item" v-for="(event, index) in timelineEvents" :key="index">
                                    <div class="timeline-marker">
                                        <div class="marker-dot"></div>
                                        <div class="marker-line" v-if="index !== timelineEvents.length - 1"></div>
                                    </div>
                                    <div class="timeline-content">
                                        <div class="timeline-year">{{ event.year }}</div>
                                        <h4 class="timeline-title">{{ event.title }}</h4>
                                        <p class="timeline-description">{{ event.description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Skills & Expertise -->
                <!-- <section class="skills-section">
                    <div class="section-container">
                        <div class="section-header">
                            <span class="section-number">02.</span>
                            <h2 class="section-title">Skills & Expertise</h2>
                            <div class="section-line"></div>
                        </div>

                        <div class="skills-grid">
                            <div class="skill-category" v-for="category in skillCategories" :key="category.name">
                                <div class="category-header">
                                    <Icon :icon="category.icon" class="category-icon" />
                                    <h3 class="category-title">{{ category.name }}</h3>
                                </div>
                                <div class="skills-list">
                                    <div class="skill-item" v-for="skill in category.skills" :key="skill.name">
                                        <div class="skill-info">
                                            <span class="skill-name">{{ skill.name }}</span>
                                            <span class="skill-level">{{ skill.level }}%</span>
                                        </div>
                                        <div class="skill-bar">
                                            <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> -->

                <!-- Values & Principles -->
                <section class="values-section">
                    <div class="section-container">
                        <div class="section-header">
                            <span class="section-number">03.</span>
                            <h2 class="section-title">Values & Principles</h2>
                            <div class="section-line"></div>
                        </div>

                        <div class="values-grid">
                            <div class="value-card" v-for="value in values" :key="value.title">
                                <div class="value-icon">
                                    <Icon :icon="value.icon" />
                                </div>
                                <h3 class="value-title">{{ value.title }}</h3>
                                <p class="value-description">{{ value.description }}</p>
                                <div class="value-code">
                                    <code>{{ value.code }}</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Interests & Hobbies -->
                <section class="interests-section">
                    <div class="section-container">
                        <div class="section-header">
                            <span class="section-number">04.</span>
                            <h2 class="section-title">Beyond Code</h2>
                            <div class="section-line"></div>
                        </div>

                        <div class="interests-content">
                            <div class="interests-text">
                                <p class="interests-intro">
                                    When I'm not coding, you'll find me exploring these passions that fuel my creativity
                                    and keep me balanced:
                                </p>
                                <div class="interests-list">
                                    <div class="interest-item" v-for="interest in interests" :key="interest.name">
                                        <Icon :icon="interest.icon" class="interest-icon" />
                                        <div class="interest-content">
                                            <h4 class="interest-name">{{ interest.name }}</h4>
                                            <p class="interest-description">{{ interest.description }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="fun-facts">
                                <h3 class="facts-title">Fun Facts</h3>
                                <div class="facts-list">
                                    <div class="fact-item" v-for="fact in funFacts" :key="fact.id">
                                        <span class="fact-emoji">{{ fact.emoji }}</span>
                                        <span class="fact-text">{{ fact.text }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- CTA Section -->
                <section class="cta-section">
                    <div class="section-container">
                        <div class="cta-content">
                            <div class="cta-text">
                                <h2 class="cta-title">Let's Build Something Amazing Together</h2>
                                <p class="cta-description">
                                    I'm always excited to work on new projects and collaborate with passionate people.
                                    Let's turn your ideas into reality!
                                </p>
                            </div>
                            <div class="cta-actions">
                                <router-link to="/contact" class="cta-button cta-button--primary">
                                    <Icon icon="mdi:message-text" class="button-icon" />
                                    <span>Get In Touch</span>
                                    <span class="button-accent">.connect()</span>
                                </router-link>
                                <router-link to="/projects" class="cta-button cta-button--secondary">
                                    <Icon icon="mdi:code-braces" class="button-icon" />
                                    <span>View My Work</span>
                                    <span class="button-accent">.explore()</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { IonPage, IonContent } from '@ionic/vue'
    import { Icon } from "@iconify/vue"
    import { useAboutData } from '@/composables/useAboutData'
    import GitHubActivity from '@/components/GitHubActivity.vue'
    const githubUsername = ref('devfrx') // Replace with your GitHub username

    const {
        profileStats,
        storyParagraphs,
        timelineEvents,
        values,
        interests,
        funFacts
    } = useAboutData()
</script>

<style scoped>
    .about-page {
        min-height: 100vh;
        background: var(--color-bg-dark);
        color: var(--color-text-dark);
        font-family: var(--font-mono);
    }

    /* Hero Section */
    .about-hero {
        padding: var(--space-20) 0;
        position: relative;
        overflow: hidden;
    }

    .hero-container {
        max-width: var(--container-max-width);
        margin: 0 auto;
        padding: 0 var(--space-6);
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-12);
        align-items: center;
    }

    /* Terminal Window */
    .terminal-window {
        background: rgba(var(--color-surface-dark-rgb), 0.9);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-lg);
        overflow: hidden;
        backdrop-filter: blur(var(--blur-md));
        box-shadow: 0 0 30px rgba(var(--color-primary-rgb), 0.2);
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
        background: #ff5f57;
    }

    .control--minimize {
        background: #ffbd2e;
    }

    .control--maximize {
        background: #28ca42;
    }

    .terminal-title {
        color: var(--color-primary);
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
        animation: typewriter 3s steps(25) infinite;
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

    .page-title {
        font-size: var(--font-size-5xl);
        font-weight: var(--font-weight-bold);
        line-height: var(--line-height-tight);
        margin: var(--space-2) 0;
        color: var(--color-white);
    }

    .title-accent {
        color: var(--color-primary);
        text-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.5);
    }

    .page-description {
        font-size: var(--font-size-lg);
        color: var(--color-text-muted);
        line-height: var(--line-height-relaxed);
        margin-top: var(--space-4);
    }

    /* Profile Visual */
    .profile-visual {
        display: flex;
        justify-content: center;
    }

    .profile-container {
        text-align: center;
    }

    .profile-avatar {
        position: relative;
        margin-bottom: var(--space-6);
    }

    .avatar-placeholder {
        width: 200px;
        height: 200px;
        background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.1), rgba(var(--color-primary-rgb), 0.05));
        border: 3px solid var(--color-primary);
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-6xl);
        color: var(--color-primary);
        margin: 0 auto var(--space-4);
        position: relative;
        overflow: hidden;
    }

    .avatar-placeholder::before {
        content: '';
        position: absolute;
        inset: 0;
        background: conic-gradient(from 0deg, var(--color-primary), var(--color-accent), var(--color-primary));
        border-radius: var(--radius-full);
        padding: 3px;
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        animation: rotate 3s linear infinite;
    }

    @keyframes rotate {
        to {
            transform: rotate(360deg);
        }
    }

    .status-indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-2);
        background: rgba(var(--color-surface-dark-rgb), 0.9);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-full);
        padding: var(--space-2) var(--space-4);
        backdrop-filter: blur(var(--blur-md));
    }

    .status-dot {
        width: 8px;
        height: 8px;
        background: var(--color-success);
        border-radius: var(--radius-full);
        animation: pulse 2s infinite;
    }

    @keyframes pulse {

        0%,
        100% {
            opacity: 1;
        }

        50% {
            opacity: 0.5;
        }
    }

    .status-text {
        font-size: var(--font-size-sm);
        color: var(--color-white);
    }

    .profile-stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-4);
    }

    .stat-item {
        background: rgba(var(--color-surface-dark-rgb), 0.5);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-lg);
        padding: var(--space-4);
        text-align: center;
    }

    .stat-value {
        display: block;
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-primary);
    }

    .stat-label {
        display: block;
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
        margin-top: var(--space-1);
    }

    /* Sections */
    section {
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

    /* Story Section */
    .story-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-12);
    }

    .story-paragraph {
        display: flex;
        gap: var(--space-4);
        margin-bottom: var(--space-8);
    }

    .paragraph-marker {
        flex-shrink: 0;
        width: 48px;
        height: 48px;
        background: rgba(var(--color-primary-rgb), 0.1);
        border: 2px solid var(--color-primary);
        border-radius: var(--radius-lg);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-primary);
        font-size: var(--font-size-lg);
    }

    .paragraph-title {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-white);
        margin-bottom: var(--space-2);
    }

    .paragraph-text {
        color: var(--color-text-muted);
        line-height: var(--line-height-relaxed);
    }

    /* Timeline */
    .story-timeline {
        position: relative;
    }

    .timeline-item {
        display: flex;
        gap: var(--space-4);
        margin-bottom: var(--space-6);
    }

    .timeline-marker {
        position: relative;
        flex-shrink: 0;
    }

    .marker-dot {
        width: 16px;
        height: 16px;
        background: var(--color-primary);
        border-radius: var(--radius-full);
        border: 3px solid var(--color-bg-dark);
        box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.5);
    }

    .marker-line {
        position: absolute;
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: calc(100% + var(--space-6));
        background: linear-gradient(to bottom, var(--color-primary), transparent);
    }

    .timeline-content {
        flex: 1;
    }

    .timeline-year {
        color: var(--color-primary);
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-sm);
        margin-bottom: var(--space-1);
    }

    .timeline-title {
        color: var(--color-white);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-2);
    }

    .timeline-description {
        color: var(--color-text-muted);
        line-height: var(--line-height-relaxed);
    }

    /* Skills Section */
    .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: var(--space-8);
    }

    .skill-category {
        background: rgba(var(--color-surface-dark-rgb), 0.5);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
    }

    .category-header {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        margin-bottom: var(--space-6);
    }

    .category-icon {
        color: var(--color-primary);
        font-size: var(--font-size-xl);
    }

    .category-title {
        color: var(--color-white);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
    }

    .skill-item {
        margin-bottom: var(--space-4);
    }

    .skill-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-2);
    }

    .skill-name {
        color: var(--color-white);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
    }

    .skill-level {
        color: var(--color-primary);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-bold);
    }

    .skill-bar {
        height: 6px;
        background: rgba(var(--color-primary-rgb), 0.1);
        border-radius: var(--radius-full);
        overflow: hidden;
    }

    .skill-progress {
        height: 100%;
        background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
        border-radius: var(--radius-full);
        transition: width 1s ease-out;
    }

    /* Values Section */
    .values-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--space-6);
    }

    .value-card {
        background: rgba(var(--color-surface-dark-rgb), 0.9);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
        text-align: center;
        transition: var(--transition-all);
    }

    .value-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 0 30px rgba(var(--color-primary-rgb), 0.2);
    }

    .value-icon {
        width: 64px;
        height: 64px;
        background: rgba(var(--color-primary-rgb), 0.1);
        border: 2px solid var(--color-primary);
        border-radius: var(--radius-lg);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto var(--space-4);
        color: var(--color-primary);
        font-size: var(--font-size-2xl);
    }

    .value-title {
        color: var(--color-white);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-3);
    }

    .value-description {
        color: var(--color-text-muted);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--space-4);
    }

    .value-code {
        background: rgba(var(--color-bg-dark-rgb), 0.8);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-md);
        padding: var(--space-3);
    }

    .value-code code {
        color: var(--color-accent);
        font-size: var(--font-size-sm);
        font-family: var(--font-mono);
    }

    /* Interests Section */
    .interests-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-12);
    }

    .interests-intro {
        color: var(--color-text-muted);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--space-6);
        font-size: var(--font-size-lg);
    }

    .interest-item {
        display: flex;
        gap: var(--space-4);
        margin-bottom: var(--space-6);
    }

    .interest-icon {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        color: var(--color-primary);
        font-size: var(--font-size-lg);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .interest-name {
        color: var(--color-white);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-1);
    }

    .interest-description {
        color: var(--color-text-muted);
        line-height: var(--line-height-relaxed);
    }

    .fun-facts {
        background: rgba(var(--color-surface-dark-rgb), 0.5);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
        height: fit-content;
    }

    .facts-title {
        color: var(--color-white);
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-4);
        text-align: center;
    }

    .fact-item {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        margin-bottom: var(--space-3);
        padding: var(--space-3);
        background: rgba(var(--color-primary-rgb), 0.05);
        border-radius: var(--radius-md);
    }

    .fact-emoji {
        font-size: var(--font-size-lg);
    }

    .fact-text {
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
    }

    /* CTA Section */
    .cta-section {
        background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.1), rgba(var(--color-accent-rgb), 0.05));
        border-top: 1px solid rgba(var(--color-primary-rgb), 0.2);
    }

    .cta-content {
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
    }

    .cta-title {
        font-size: var(--font-size-4xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-white);
        margin-bottom: var(--space-4);
    }

    .cta-description {
        font-size: var(--font-size-lg);
        color: var(--color-text-muted);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--space-8);
    }

    .cta-actions {
        display: flex;
        gap: var(--space-4);
        justify-content: center;
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
    }

    .cta-button--primary {
        background: var(--gradient-primary);
        color: var(--color-white);
        box-shadow: var(--shadow-primary);
    }

    .cta-button--secondary {
        background: transparent;
        color: var(--color-primary);
        border: 1px solid var(--color-primary);
    }

    .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 30px rgba(var(--color-primary-rgb), 0.4);
    }

    .button-icon {
        font-size: var(--font-size-lg);
    }

    .button-accent {
        color: rgba(var(--color-white-rgb), 0.7);
        font-size: var(--font-size-sm);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .hero-container {
            grid-template-columns: 1fr;
            gap: var(--space-8);
            text-align: center;
        }

        .story-content {
            grid-template-columns: 1fr;
            gap: var(--space-8);
        }

        .interests-content {
            grid-template-columns: 1fr;
            gap: var(--space-8);
        }

        .cta-actions {
            flex-direction: column;
            align-items: center;
        }

        .skills-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 480px) {
        .section-container {
            padding: 0 var(--space-4);
        }

        .page-title {
            font-size: var(--font-size-3xl);
        }

        .profile-stats {
            grid-template-columns: 1fr;
        }

        .avatar-placeholder {
            width: 150px;
            height: 150px;
            font-size: var(--font-size-4xl);
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