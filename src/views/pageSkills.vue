<template>
    <ion-page>
        <ion-content>
            <div class="skills-page">
                <!-- Hero Section -->
                <section class="skills-hero">
                    <div class="hero-container">
                        <div class="hero-content">
                            <div class="terminal-window">
                                <div class="terminal-header">
                                    <div class="terminal-controls">
                                        <span class="control control--close"></span>
                                        <span class="control control--minimize"></span>
                                        <span class="control control--maximize"></span>
                                    </div>
                                    <div class="terminal-title">skills@portfolio:~$</div>
                                </div>
                                <div class="terminal-body">
                                    <div class="terminal-line">
                                        <span class="prompt">$</span>
                                        <span class="command">ls -la skills/</span>
                                    </div>
                                    <div class="terminal-output">
                                        <h1 class="page-title">
                                            My <span class="title-accent">Skills</span> & Expertise
                                        </h1>
                                        <p class="page-description">
                                            A comprehensive overview of my technical abilities, tools I master, and
                                            technologies I'm passionate about
                                        </p>
                                    </div>
                                    <div class="terminal-line">
                                        <span class="prompt">$</span>
                                        <span class="command typing">grep -r "proficiency" ./developer</span>
                                        <span class="cursor">_</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Skills Stats -->
                        <div class="stats-grid">
                            <div class="stat-card" v-for="stat in skillsStats" :key="stat.label">
                                <div class="stat-icon">
                                    <Icon :icon="stat.icon" />
                                </div>
                                <div class="stat-content">
                                    <div class="stat-number">{{ stat.number }}</div>
                                    <div class="stat-label">{{ stat.label }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Skills Overview -->
                <section class="skills-overview">
                    <div class="section-container">
                        <div class="section-header">
                            <span class="section-number">01.</span>
                            <h2 class="section-title">Technical Skills</h2>
                            <div class="section-line"></div>
                        </div>

                        <SkillsShowcase :skill-categories="detailedSkills" />
                    </div>
                </section>


                <!-- Learning Journey -->
                <section class="learning-journey">
                    <div class="section-container">
                        <div class="section-header">
                            <span class="section-number">02.</span>
                            <h2 class="section-title">Learning Journey</h2>
                            <div class="section-line"></div>
                        </div>

                        <div class="journey-timeline">
                            <div class="timeline-item" v-for="(phase, index) in learningPath" :key="phase.year">
                                <div class="timeline-marker">
                                    <div class="marker-icon">
                                        <Icon :icon="phase.icon" />
                                    </div>
                                    <div class="marker-line" v-if="index !== learningPath.length - 1"></div>
                                </div>
                                <div class="timeline-content">
                                    <div class="timeline-header">
                                        <div class="timeline-year">{{ phase.year }}</div>
                                        <div class="timeline-phase">{{ phase.phase }}</div>
                                    </div>
                                    <div class="timeline-milestone">{{ phase.milestone }}</div>
                                    <div class="timeline-technologies">
                                        <span v-for="tech in phase.technologies" :key="tech" class="tech-badge">
                                            {{ tech }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Certifications -->
                <section class="certifications">
                    <div class="section-container">
                        <div class="section-header">
                            <span class="section-number">03.</span>
                            <h2 class="section-title">Certifications & Achievements</h2>
                            <div class="section-line"></div>
                        </div>

                        <CertificationShowcase :certifications="certifications"
                            @view-certificate="handleViewCertificate" @verify-certificate="handleVerifyCertificate" />
                    </div>
                </section>

                <!-- Currently Learning -->
                <section class="currently-learning">
                    <div class="section-container">
                        <div class="section-header">
                            <span class="section-number">04.</span>
                            <h2 class="section-title">Currently Learning</h2>
                            <div class="section-line"></div>
                        </div>

                        <div class="learning-cards">
                            <div class="learning-card" v-for="item in currentlyLearning" :key="item.name">
                                <div class="learning-header">
                                    <Icon :icon="item.icon" class="learning-icon" :style="{ color: item.color }" />
                                    <div class="learning-info">
                                        <h3 class="learning-name">{{ item.name }}</h3>
                                        <div class="learning-eta">ETA: {{ item.eta }}</div>
                                    </div>
                                    <div class="learning-progress-text">{{ item.progress }}%</div>
                                </div>
                                <div class="learning-progress-bar">
                                    <div class="learning-progress-fill"
                                        :style="{ width: item.progress + '%', backgroundColor: item.color }"></div>
                                </div>
                            </div>
                        </div>

                        <div class="learning-philosophy">
                            <div class="philosophy-card">
                                <Icon icon="mdi:lightbulb-on" class="philosophy-icon" />
                                <div class="philosophy-content">
                                    <h3 class="philosophy-title">Continuous Learning Philosophy</h3>
                                    <p class="philosophy-text">
                                        Technology evolves rapidly, and staying current is not just about learning new
                                        tools—it's about
                                        understanding new paradigms, solving emerging problems, and pushing the
                                        boundaries of what's possible.
                                        Every day is an opportunity to grow.
                                    </p>
                                    <div class="philosophy-code">
                                        <code>while (developer.alive) { developer.learn(); }</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Top Skills Showcase -->
                <section class="top-skills-showcase">
                    <div class="section-container">
                        <div class="section-header">
                            <span class="section-number">05.</span>
                            <h2 class="section-title">Top Skills</h2>
                            <div class="section-line"></div>
                        </div>

                        <div class="top-skills-grid">
                            <div class="top-skill-item" v-for="(skill, index) in topSkills" :key="skill.name">
                                <div class="rank-number">{{ String(index + 1).padStart(2, '0') }}</div>
                                <div class="skill-visual">
                                    <Icon :icon="skill.icon" :style="{ color: skill.color }" />
                                </div>
                                <div class="skill-info">
                                    <h3 class="skill-name">{{ skill.name }}</h3>
                                    <div class="skill-level">{{ skill.level }}% proficiency</div>
                                </div>
                                <div class="skill-ring">
                                    <svg class="progress-ring" width="60" height="60">
                                        <circle class="progress-ring-circle-bg"
                                            stroke="rgba(var(--color-primary-rgb), 0.1)" stroke-width="4"
                                            fill="transparent" r="26" cx="30" cy="30" />
                                        <circle class="progress-ring-circle" :stroke="skill.color" stroke-width="4"
                                            fill="transparent" r="26" cx="30" cy="30"
                                            :stroke-dasharray="`${(skill.level / 100) * 163.36} 163.36`" />
                                    </svg>
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
    import { IonPage, IonContent } from '@ionic/vue'
    import { Icon } from "@iconify/vue"
    import { useSkillsData } from '@/composables/useSkillsData'
    import CertificationShowcase from '@/components/CertificationShowcase.vue'
    import SkillsShowcase from '@/components/SkillsShowcase.vue'

    const {
        skillsStats,
        detailedSkills,
        learningPath,
        certifications,
        currentlyLearning,
        topSkills
    } = useSkillsData()

    // Certificate handlers
    const handleViewCertificate = (cert: any) => {
        if (cert.credentialUrl) {
            window.open(cert.credentialUrl, '_blank', 'noopener,noreferrer')
        }
    }

    const handleVerifyCertificate = (cert: any) => {
        // You could implement a verification modal or redirect to verification page
        if (cert.verificationId) {
            alert(`Verification ID: ${cert.verificationId}\n\nYou can verify this certificate with the issuer using this ID.`)
        }
    }
</script>

<style scoped>
    .skills-page {
        min-height: 100vh;
        background: var(--color-bg-dark);
        color: var(--color-text-dark);
        font-family: var(--font-mono);
    }

    /* Hero Section */
    .skills-hero {
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
        animation: typewriter 3s steps(30) infinite;
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

    /* Stats Grid */
    .stats-grid {
        display: flex;
        align-items: stretch;
        justify-content: flex-end;
        flex-wrap: wrap;
        flex-direction: row;
        gap: var(--space-4);
    }

    .stat-card {
        background: rgba(var(--color-surface-dark-rgb), 0.9);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
        display: flex;
        align-items: center;
        gap: var(--space-4);
        backdrop-filter: blur(var(--blur-md));
        transition: var(--transition-all);
    }

    .stat-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.3);
    }

    .stat-icon {
        color: var(--color-primary);
        font-size: var(--font-size-2xl);
    }

    .stat-number {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-white);
    }

    .stat-label {
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
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

    /* Skills Categories */
    .skills-categories {
        display: flex;
        flex-direction: column;
        gap: var(--space-12);
    }

    .category-card {
        background: rgba(var(--color-surface-dark-rgb), 0.5);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-xl);
        padding: var(--space-8);
        backdrop-filter: blur(var(--blur-md));
    }

    .category-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-6);
    }

    .category-info {
        display: flex;
        align-items: center;
        gap: var(--space-3);
    }

    .category-icon {
        font-size: var(--font-size-2xl);
    }

    .category-title {
        color: var(--color-white);
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
    }

    .category-count {
        background: rgba(var(--color-primary-rgb), 0.1);
        color: var(--color-primary);
        padding: var(--space-1) var(--space-3);
        border-radius: var(--radius-full);
        font-size: var(--font-size-sm);
    }


    /* Skills Grid */
    .skills-page {
        min-height: 100vh;
        background: var(--color-bg-dark);
        color: var(--color-text-dark);
        font-family: var(--font-mono);
    }


    /* Learning Journey */
    .journey-timeline {
        position: relative;
    }

    .timeline-item {
        display: flex;
        gap: var(--space-6);
        margin-bottom: var(--space-8);
    }

    .timeline-marker {
        position: relative;
        flex-shrink: 0;
    }

    .marker-icon {
        width: 48px;
        height: 48px;
        background: rgba(var(--color-primary-rgb), 0.1);
        border: 2px solid var(--color-primary);
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-primary);
        font-size: var(--font-size-lg);
    }

    .marker-line {
        position: absolute;
        top: 48px;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: calc(100% + var(--space-8));
        background: linear-gradient(to bottom, var(--color-primary), transparent);
    }

    .timeline-content {
        flex: 1;
        background: rgba(var(--color-surface-dark-rgb), 0.5);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
    }

    .timeline-header {
        display: flex;
        gap: var(--space-4);
        align-items: center;
        margin-bottom: var(--space-3);
    }

    .timeline-year {
        background: var(--color-primary);
        color: var(--color-white);
        padding: var(--space-1) var(--space-3);
        border-radius: var(--radius-sm);
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-sm);
    }

    .timeline-phase {
        color: var(--color-white);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
    }

    .timeline-milestone {
        color: var(--color-text-muted);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--space-4);
    }

    .timeline-technologies {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
    }

    .tech-badge {
        background: rgba(var(--color-accent-rgb), 0.1);
        color: var(--color-accent);
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-xs);
        font-family: var(--font-mono);
    }

    /* Currently Learning */
    .learning-cards {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        margin-bottom: var(--space-8);
    }

    .learning-card {
        background: rgba(var(--color-surface-dark-rgb), 0.8);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
        transition: var(--transition-all);
    }

    .learning-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.3);
    }

    .learning-header {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        margin-bottom: var(--space-3);
    }

    .learning-icon {
        font-size: var(--font-size-xl);
    }

    .learning-info {
        flex: 1;
    }

    .learning-name {
        color: var(--color-white);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-1);
    }

    .learning-eta {
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
    }

    .learning-progress-text {
        color: var(--color-primary);
        font-weight: var(--font-weight-bold);
    }

    .learning-progress-bar {
        height: 8px;
        background: rgba(var(--color-primary-rgb), 0.1);
        border-radius: var(--radius-full);
        overflow: hidden;
    }

    .learning-progress-fill {
        height: 100%;
        border-radius: var(--radius-full);
        transition: width 1s ease-out;
    }

    /* Learning Philosophy */
    .learning-philosophy {
        margin-top: var(--space-8);
    }

    .philosophy-card {
        background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.1), rgba(var(--color-accent-rgb), 0.05));
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-xl);
        padding: var(--space-8);
        display: flex;
        gap: var(--space-6);
        align-items: flex-start;
    }

    .philosophy-icon {
        color: var(--color-primary);
        font-size: var(--font-size-4xl);
        flex-shrink: 0;
    }

    .philosophy-title {
        color: var(--color-white);
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-3);
    }

    .philosophy-text {
        color: var(--color-text-muted);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--space-4);
    }

    .philosophy-code {
        background: rgba(var(--color-bg-dark-rgb), 0.8);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-md);
        padding: var(--space-3);
    }

    .philosophy-code code {
        color: var(--color-accent);
        font-family: var(--font-mono);
    }

    /* Top Skills Showcase */
    .top-skills-grid {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
    }

    .top-skill-item {
        background: rgba(var(--color-surface-dark-rgb), 0.8);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
        display: flex;
        align-items: center;
        gap: var(--space-6);
        transition: var(--transition-all);
        position: relative;
        overflow: hidden;
    }

    .top-skill-item:hover {
        transform: translateX(8px);
        box-shadow: 0 0 25px rgba(var(--color-primary-rgb), 0.3);
    }

    .top-skill-item::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: linear-gradient(to bottom, var(--color-primary), var(--color-accent));
        opacity: 0;
        transition: var(--transition-opacity);
    }

    .top-skill-item:hover::before {
        opacity: 1;
    }

    .rank-number {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-primary);
        min-width: 60px;
        font-family: var(--font-mono);
    }

    .skill-visual {
        font-size: var(--font-size-3xl);
    }

    .skill-info {
        flex: 1;
    }

    .skill-info .skill-name {
        font-size: var(--font-size-xl);
        margin-bottom: var(--space-1);
    }

    .skill-info .skill-level {
        color: var(--color-text-muted);
    }

    .skill-ring {
        position: relative;
    }

    .progress-ring-circle {
        transition: stroke-dasharray 1s ease-out;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .hero-container {
            grid-template-columns: 1fr;
            gap: var(--space-8);
            text-align: center;
        }

        .stats-grid {
            grid-template-columns: 1fr;
        }

        .skills-grid {
            grid-template-columns: 1fr;
        }

        .category-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-2);
        }

        .timeline-item {
            gap: var(--space-4);
        }

        .philosophy-card {
            flex-direction: column;
            text-align: center;
        }

        .top-skill-item {
            flex-direction: column;
            text-align: center;
            gap: var(--space-4);
        }
    }

    @media (max-width: 480px) {
        .section-container {
            padding: 0 var(--space-4);
        }

        .page-title {
            font-size: var(--font-size-3xl);
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