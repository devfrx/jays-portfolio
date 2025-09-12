<template>
    <ion-page :fullscreen="true">
        <ion-content>
            <div class="projects-page">
                <!-- Hero Section -->
                <section class="projects-hero">
                    <div class="hero-container">
                        <div class="hero-content">
                            <div class="terminal-window">
                                <div class="terminal-header">
                                    <div class="terminal-controls">
                                        <span class="control control--close"></span>
                                        <span class="control control--minimize"></span>
                                        <span class="control control--maximize"></span>
                                    </div>
                                    <div class="terminal-title">projects@portfolio:~$</div>
                                </div>
                                <div class="terminal-body">
                                    <div class="terminal-line">
                                        <span class="prompt">$</span>
                                        <span class="command">ls -la projects/</span>
                                    </div>
                                    <div class="terminal-output">
                                        <h1 class="page-title">
                                            My <span class="title-accent">Projects</span> & Work
                                        </h1>
                                        <p class="page-description">
                                            A showcase of my development journey, from personal projects to professional
                                            experience
                                        </p>
                                    </div>
                                    <div class="terminal-line">
                                        <span class="prompt">$</span>
                                        <span class="command typing">find . -name "*.experience"</span>
                                        <span class="cursor">_</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Featured Projects Carousel -->
                <section class="featured-projects">
                    <div class="section-container">
                        <div class="section-header">
                            <span class="section-number">01.</span>
                            <h2 class="section-title">Featured Projects</h2>
                            <div class="section-line"></div>
                        </div>

                        <!-- Project Carousel Component -->
                        <ProjectCarousel :projects="featuredProjects" :autoplay="true" :autoplay-interval="6000"
                            @open-gallery="openGallery" @slide-change="onSlideChange" />
                    </div>
                </section>

                <!-- Work Experience -->
                <section class="work-experience">
                    <div class="section-container">
                        <div class="section-header">
                            <span class="section-number">02.</span>
                            <h2 class="section-title">Experiences</h2>
                            <div class="section-line"></div>
                        </div>

                        <div class="experience-timeline">
                            <div class="experience-item" v-for="(job, index) in workExperience" :key="index">
                                <div class="experience-marker">
                                    <div class="marker-dot"></div>
                                    <div class="marker-line" v-if="index !== workExperience.length - 1"></div>
                                </div>
                                <div class="experience-content">
                                    <div class="experience-header">
                                        <div class="job-info">
                                            <h3 class="job-title">{{ job.title }}</h3>
                                            <div class="company-info">
                                                <span class="company-name">{{ job.company }}</span>
                                                <span class="job-type">{{ job.type }}</span>
                                            </div>
                                        </div>
                                        <div class="job-period">{{ job.period }}</div>
                                    </div>
                                    <p class="job-description">{{ job.description }}</p>
                                    <div class="job-achievements">
                                        <ul>
                                            <li v-for="achievement in job.achievements" :key="achievement">{{
                                                achievement }}
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="job-tech">
                                        <span v-for="tech in job.technologies" :key="tech" class="tech-tag">{{ tech
                                            }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- All Projects -->
                <section class="all-projects">
                    <div class="section-container">
                        <div class="section-header">
                            <span class="section-number">03.</span>
                            <h2 class="section-title">All Projects</h2>
                            <div class="section-line"></div>
                        </div>

                        <!-- Filter Tabs -->
                        <div class="filter-tabs">
                            <button v-for="filter in filters" :key="filter.key" @click="activeFilter = filter.key"
                                :class="['filter-tab', { 'active': activeFilter === filter.key }]">
                                {{ filter.label }}
                            </button>
                        </div>

                        <!-- Projects Grid -->
                        <div class="projects-grid">
                            <div class="project-card" v-for="project in filteredProjects" :key="project.id">
                                <div class="project-header">
                                    <Icon :icon="project.icon" class="project-icon" />
                                    <div class="project-links">
                                        <a :href="project.github" class="project-link" target="_blank" rel="noopener">
                                            <Icon icon="mdi:github" />
                                        </a>
                                        <a :href="project.demo" class="project-link" target="_blank" rel="noopener"
                                            v-if="project.demo">
                                            <Icon icon="mdi:open-in-new" />
                                        </a>
                                    </div>
                                </div>
                                <h3 class="project-title">{{ project.title }}</h3>
                                <p class="project-description">{{ project.description }}</p>
                                <div class="project-tech">
                                    <span v-for="tech in project.technologies" :key="tech" class="tech-tag">{{ tech
                                        }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <!-- Gallery Modal -->
            <ImageGallery :is-open="galleryOpen" :images="selectedProject?.gallery || []" :initial-index="galleryIndex"
                :project="selectedProject" @close="closeGallery" />
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { IonPage, IonContent } from '@ionic/vue'
    import { Icon } from "@iconify/vue"
    import { useProjectsData } from '@/composables/useProjectsData'
    import ProjectCarousel from '@/components/ProjectCarousel.vue'
    import ImageGallery from '@/components/ImageGallery.vue'

    const {
        featuredProjects,
        workExperience,
        education,
        allProjects,
        filters,
        activeFilter,
        filteredProjects
    } = useProjectsData()

    // Gallery state
    const galleryOpen = ref(false)
    const selectedProject = ref<any>(null)
    const galleryIndex = ref(0)

    // Handlers
    const openGallery = (project: any, index: number = 0) => {
        selectedProject.value = project
        galleryIndex.value = index
        galleryOpen.value = true
    }

    const closeGallery = () => {
        galleryOpen.value = false
        selectedProject.value = null
        galleryIndex.value = 0
    }

    const onSlideChange = (index: number) => {
        console.log('Current slide:', index)
        // You can add analytics or other tracking here
    }
</script>

<style scoped>
    .projects-page {
        min-height: 100vh;
        background: var(--color-bg-dark);
        color: var(--color-text-dark);
        font-family: var(--font-mono);
        padding-top: calc(var(--navbar-height) + var(--space-md));
    }

    /* Hero Section */
    .projects-hero {
        padding: var(--space-20) 0;
        position: relative;
    }

    .hero-container {
        max-width: var(--container-max-width);
        margin: 0 auto;
        padding: 0 var(--space-6);
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-12);
        align-items: center;
        text-align: center;
    }

    /* Terminal Window */
    .terminal-window {
        background: rgba(var(--color-surface-dark-rgb), 0.9);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-lg);
        overflow: hidden;
        backdrop-filter: blur(var(--blur-md));
        box-shadow: 0 0 30px rgba(var(--color-primary-rgb), 0.2);
        max-width: 800px;
        margin: 0 auto;
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
        animation: typewriter 2s steps(20) infinite;
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

    /* Work Experience - mantieni gli stili esistenti */
    .experience-timeline {
        position: relative;
    }

    .experience-item {
        display: flex;
        gap: var(--space-6);
        margin-bottom: var(--space-8);
    }

    .experience-marker {
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
        height: calc(100% + var(--space-8));
        background: linear-gradient(to bottom, var(--color-primary), transparent);
    }

    .experience-content {
        flex: 1;
        background: rgba(var(--color-surface-dark-rgb), 0.5);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
    }

    .experience-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--space-4);
    }

    .job-title {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-white);
        margin-bottom: var(--space-1);
    }

    .company-info {
        display: flex;
        gap: var(--space-3);
        align-items: center;
    }

    .company-name {
        color: var(--color-primary);
        font-weight: var(--font-weight-medium);
    }

    .job-type {
        background: rgba(var(--color-primary-rgb), 0.1);
        color: var(--color-primary);
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-xs);
    }

    .job-period {
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
        white-space: nowrap;
    }

    .job-description {
        color: var(--color-text-muted);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--space-4);
    }

    .job-achievements ul {
        list-style: none;
        padding: 0;
    }

    .job-achievements li {
        color: var(--color-text-muted);
        margin-bottom: var(--space-2);
        position: relative;
        padding-left: var(--space-6);
    }

    .job-achievements li::before {
        content: '▶';
        color: var(--color-primary);
        position: absolute;
        left: 0;
        font-size: var(--font-size-xs);
    }

    .job-tech {
        margin-top: var(--space-4);
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
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

    /* Filter Tabs */
    .filter-tabs {
        display: flex;
        gap: var(--space-2);
        margin-bottom: var(--space-8);
        flex-wrap: wrap;
    }

    .filter-tab {
        background: transparent;
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        color: var(--color-text-muted);
        padding: var(--space-3) var(--space-6);
        border-radius: var(--radius-lg);
        font-family: var(--font-mono);
        cursor: pointer;
        transition: var(--transition-all);
    }

    .filter-tab:hover {
        border-color: var(--color-primary);
        color: var(--color-white);
    }

    .filter-tab.active {
        background: var(--color-primary);
        color: var(--color-white);
        border-color: var(--color-primary);
    }

    /* Projects Grid */
    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: var(--space-6);
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

    .project-link {
        color: var(--color-text-muted);
        cursor: pointer;
        transition: var(--transition-colors);
    }

    .project-link:hover {
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

    /* Responsive Design */
    @media (max-width: 768px) {
        .hero-container {
            text-align: center;
        }

        .experience-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-2);
        }

        .company-info {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-1);
        }

        .projects-grid {
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

        .experience-item {
            gap: var(--space-4);
        }

        .filter-tabs {
            justify-content: center;
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