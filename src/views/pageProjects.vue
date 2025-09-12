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

                        <!-- Stats -->
                        <!-- <div class="stats-grid">
                            <div class="stat-card" v-for="stat in stats" :key="stat.label">
                                <div class="stat-icon">
                                    <Icon :icon="stat.icon" />
                                </div>
                                <div class="stat-content">
                                    <div class="stat-number">{{ stat.number }}</div>
                                    <div class="stat-label">{{ stat.label }}</div>
                                </div>
                            </div>
                        </div> -->
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

                        <!-- Projects Carousel -->
                        <div class="projects-carousel">
                            <div class="carousel-container" ref="carouselContainer">
                                <div class="carousel-track"
                                    :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                                    <div class="carousel-slide" v-for="project in featuredProjects" :key="project.id">
                                        <div class="project-showcase">
                                            <!-- Project Visual -->
                                            <div class="project-visual">
                                                <div class="project-screen">
                                                    <!-- Mockup Browser Window -->
                                                    <div class="browser-frame">
                                                        <div class="browser-header">
                                                            <div class="browser-controls">
                                                                <span class="control control--close"></span>
                                                                <span class="control control--minimize"></span>
                                                                <span class="control control--maximize"></span>
                                                            </div>
                                                            <div class="browser-url">{{ project.demo || 'localhost:3000'
                                                            }}</div>
                                                            <div class="browser-actions">
                                                                <Icon icon="mdi:refresh" />
                                                                <Icon icon="mdi:dots-horizontal" />
                                                            </div>
                                                        </div>
                                                        <div class="browser-content">
                                                            <!-- Code Preview -->
                                                            <div class="code-preview">
                                                                <div class="code-editor">
                                                                    <div class="editor-sidebar">
                                                                        <div class="file-tree">
                                                                            <div class="file-item"
                                                                                v-for="(file, index) in project.files"
                                                                                :key="index">
                                                                                <Icon :icon="file.icon" />
                                                                                <span>{{ file.name }}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="editor-main">
                                                                        <div class="editor-tabs">
                                                                            <div class="tab active">
                                                                                <Icon icon="mdi:vuejs" />
                                                                                <span>App.vue</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="editor-content">
                                                                            <div class="code-lines">
                                                                                <div class="code-line"
                                                                                    v-for="(line, index) in project.codePreview"
                                                                                    :key="index">
                                                                                    <span class="line-number">{{
                                                                                        String(index + 1).padStart(2,
                                                                                            '0') }}</span>
                                                                                    <span class="code-text"
                                                                                        v-html="line"></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <!-- Project Icon Overlay -->
                                                            <div class="project-icon-overlay">
                                                                <Icon :icon="project.icon" />
                                                            </div>

                                                            <!-- Floating Elements -->
                                                            <div class="floating-tech">
                                                                <div class="tech-bubble"
                                                                    v-for="(tech, index) in project.technologies.slice(0, 4)"
                                                                    :key="tech"
                                                                    :style="{ animationDelay: `${index * 0.5}s` }">
                                                                    {{ tech }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Project Actions -->
                                                <div class="project-actions">
                                                    <a :href="project.github" class="action-button" target="_blank"
                                                        rel="noopener">
                                                        <Icon icon="mdi:github" />
                                                        <span>Code</span>
                                                    </a>
                                                    <a :href="project.demo" class="action-button action-button--primary"
                                                        target="_blank" rel="noopener">
                                                        <Icon icon="mdi:open-in-new" />
                                                        <span>Live Demo</span>
                                                    </a>
                                                </div>
                                            </div>

                                            <!-- Project Info -->
                                            <div class="project-info">
                                                <div class="project-meta">
                                                    <span class="project-type">{{ project.type }}</span>
                                                    <span class="project-year">{{ project.year }}</span>
                                                </div>
                                                <h3 class="project-title">{{ project.title }}</h3>
                                                <p class="project-description">{{ project.description }}</p>

                                                <!-- Tech Stack -->
                                                <div class="tech-stack-detailed">
                                                    <h4 class="tech-title">Technologies Used</h4>
                                                    <div class="tech-grid">
                                                        <div class="tech-item" v-for="tech in project.technologies"
                                                            :key="tech">
                                                            <span class="tech-name">{{ tech }}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Gallery Modal -->
                                                <ImageGallery :is-open="galleryOpen"
                                                    :images="selectedProject?.gallery || []"
                                                    :initial-index="galleryIndex" :project="selectedProject"
                                                    @close="closeGallery" />
                                                <!-- Project Stats -->
                                                <!-- <div class="project-stats">
                                                    <div class="stat">
                                                        <Icon icon="mdi:star" />
                                                        <span>{{ project.stats?.stars || 'N/A' }}</span>
                                                    </div>
                                                    <div class="stat">
                                                        <Icon icon="mdi:source-fork" />
                                                        <span>{{ project.stats?.forks || 'N/A' }}</span>
                                                    </div>
                                                    <div class="stat">
                                                        <Icon icon="mdi:eye" />
                                                        <span>{{ project.stats?.views || 'N/A' }}</span>
                                                    </div>
                                                </div> -->
                                            </div>

                                            <div class="project-gallery"
                                                v-if="project.gallery && project.gallery.length">
                                                <h4 class="gallery-title">Screenshots</h4>
                                                <div class="gallery-preview">
                                                    <div v-for="(image, index) in project.gallery.slice(0, 3)"
                                                        :key="index" class="gallery-thumb"
                                                        @click="openGallery(project, index)">
                                                        <img :src="image.thumbnail || image.url" :alt="image.caption"
                                                            loading="lazy" />
                                                        <div class="thumb-overlay">
                                                            <Icon icon="mdi:magnify" />
                                                        </div>
                                                    </div>
                                                    <div v-if="project.gallery.length > 3" class="gallery-more"
                                                        @click="openGallery(project, 0)">
                                                        <span>+{{ project.gallery.length - 3 }} more</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Carousel Navigation -->
                            <div class="carousel-nav">
                                <button class="nav-button nav-button--prev" @click="prevSlide"
                                    :disabled="currentSlide === 0">
                                    <Icon icon="mdi:chevron-left" />
                                </button>
                                <button class="nav-button nav-button--next" @click="nextSlide"
                                    :disabled="currentSlide === featuredProjects.length - 1">
                                    <Icon icon="mdi:chevron-right" />
                                </button>
                            </div>

                            <!-- Carousel Indicators -->
                            <div class="carousel-indicators">
                                <button v-for="(project, index) in featuredProjects" :key="index" class="indicator"
                                    :class="{ active: currentSlide === index }" @click="goToSlide(index)">
                                    <span class="indicator-progress"></span>
                                </button>
                            </div>
                        </div>
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

                <!-- Education -->
                <!-- <section class="education">
                    <div class="section-container">
                        <div class="section-header">
                            <span class="section-number">03.</span>
                            <h2 class="section-title">Education & Certifications</h2>
                            <div class="section-line"></div>
                        </div>

                        <div class="education-grid">
                            <div class="education-card" v-for="edu in education" :key="edu.id">
                                <div class="edu-icon">
                                    <Icon :icon="edu.icon" />
                                </div>
                                <div class="edu-content">
                                    <h3 class="edu-title">{{ edu.title }}</h3>
                                    <div class="edu-institution">{{ edu.institution }}</div>
                                    <div class="edu-period">{{ edu.period }}</div>
                                    <p class="edu-description" v-if="edu.description">{{ edu.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> -->

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
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted } from 'vue'
    import { IonPage, IonContent } from '@ionic/vue'
    import { Icon } from "@iconify/vue"
    import { useProjectsData } from '@/composables/useProjectsData'
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

    // Gallery state con tipi corretti
    const galleryOpen = ref(false)
    const selectedProject = ref<any>(null)  // Cambia da null a any
    const galleryIndex = ref(0)
    const githubUsername = ref('devfrx') // Il tuo username GitHub

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

    // Carousel logic
    const currentSlide = ref(0)
    const carouselContainer = ref(null)

    const nextSlide = () => {
        if (currentSlide.value < featuredProjects.value.length - 1) {
            currentSlide.value++
        } else {
            currentSlide.value = 0
        }
    }

    const prevSlide = () => {
        if (currentSlide.value > 0) {
            currentSlide.value--
        } else {
            currentSlide.value = featuredProjects.value.length - 1
        }
    }

    const goToSlide = (index: number) => {
        currentSlide.value = index
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

    /* Stats Grid */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
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

    /* Projects Carousel */
    .projects-carousel {
        margin-bottom: var(--space-12);
        position: relative;
    }

    .carousel-container {
        overflow: hidden;
        height: auto;
        border-radius: var(--radius-xl);
        background: rgba(var(--color-surface-dark-rgb), 0.3);
        backdrop-filter: blur(var(--blur-md));
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
    }

    .carousel-track {
        display: flex;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .carousel-slide {
        min-width: 100%;
        padding: var(--space-8);
    }

    .project-showcase {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: var(--space-8);
        align-items: center;
        min-height: 600px;
    }

    /* Project Visual */
    .project-visual {
        position: relative;
    }

    .project-screen {
        position: relative;
        border-radius: var(--radius-lg);
        overflow: hidden;
        background: var(--color-bg-dark);
        border: 2px solid rgba(var(--color-primary-rgb), 0.3);
        box-shadow:
            0 0 50px rgba(var(--color-primary-rgb), 0.2),
            inset 0 0 20px rgba(var(--color-primary-rgb), 0.05);
    }

    /* Browser Frame */
    .browser-frame {
        background: rgba(var(--color-surface-dark-rgb), 0.95);
    }

    .browser-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-3) var(--space-4);
        background: rgba(var(--color-bg-dark-rgb), 0.8);
        border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.2);
    }

    .browser-controls {
        display: flex;
        gap: var(--space-2);
    }

    .browser-url {
        background: rgba(var(--color-surface-dark-rgb), 0.8);
        padding: var(--space-1) var(--space-3);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-xs);
        color: var(--color-text-muted);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        min-width: 200px;
        text-align: center;
    }

    .browser-actions {
        display: flex;
        gap: var(--space-2);
        color: var(--color-text-muted);
    }

    /* Code Preview */
    .code-preview {
        height: 400px;
        position: relative;
    }

    .code-editor {
        display: flex;
        height: 100%;
    }

    .editor-sidebar {
        width: 200px;
        background: rgba(var(--color-bg-dark-rgb), 0.9);
        border-right: 1px solid rgba(var(--color-primary-rgb), 0.2);
        padding: var(--space-4);
    }

    .file-tree {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
    }

    .file-item {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-sm);
        transition: var(--transition-colors);
    }

    .file-item:hover {
        background: rgba(var(--color-primary-rgb), 0.1);
        color: var(--color-white);
    }

    .editor-main {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .editor-tabs {
        display: flex;
        background: rgba(var(--color-surface-dark-rgb), 0.8);
        border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.2);
    }

    .tab {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-2) var(--space-4);
        background: rgba(var(--color-primary-rgb), 0.1);
        color: var(--color-primary);
        font-size: var(--font-size-sm);
        border-right: 1px solid rgba(var(--color-primary-rgb), 0.2);
    }

    .editor-content {
        flex: 1;
        padding: var(--space-4);
        overflow: hidden;
    }

    .code-lines {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
    }

    .code-line {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        opacity: 0;
        animation: fadeInLine 0.5s ease forwards;
    }

    .code-line:nth-child(1) {
        animation-delay: 0.1s;
    }

    .code-line:nth-child(2) {
        animation-delay: 0.2s;
    }

    .code-line:nth-child(3) {
        animation-delay: 0.3s;
    }

    .code-line:nth-child(4) {
        animation-delay: 0.4s;
    }

    .code-line:nth-child(5) {
        animation-delay: 0.5s;
    }

    @keyframes fadeInLine {
        to {
            opacity: 1;
        }
    }

    .line-number {
        color: var(--color-text-muted);
        font-size: var(--font-size-xs);
        min-width: 20px;
        text-align: right;
    }

    .code-text {
        color: var(--color-white);
        font-size: var(--font-size-sm);
        font-family: var(--font-mono);
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

    /* Project Icon Overlay */
    .project-icon-overlay {
        position: absolute;
        bottom: var(--space-4);
        right: var(--space-4);
        width: 60px;
        height: 60px;
        background: rgba(var(--color-primary-rgb), 0.1);
        border: 2px solid var(--color-primary);
        border-radius: var(--radius-lg);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-primary);
        font-size: var(--font-size-2xl);
        backdrop-filter: blur(var(--blur-md));
    }

    /* Floating Tech Bubbles */
    .floating-tech {
        position: absolute;
        inset: 0;
        pointer-events: none;
    }

    .tech-bubble {
        position: absolute;
        background: rgba(var(--color-primary-rgb), 0.1);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        color: var(--color-primary);
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-full);
        font-size: var(--font-size-xs);
        font-family: var(--font-mono);
        backdrop-filter: blur(var(--blur-sm));
        animation: floatBubble 4s ease-in-out infinite;
    }

    .tech-bubble:nth-child(1) {
        top: 20%;
        left: 10%;
        animation-delay: 0s;
    }

    .tech-bubble:nth-child(2) {
        top: 40%;
        right: 15%;
        animation-delay: 1s;
    }

    .tech-bubble:nth-child(3) {
        bottom: 30%;
        left: 20%;
        animation-delay: 2s;
    }

    .tech-bubble:nth-child(4) {
        bottom: 15%;
        right: 25%;
        animation-delay: 3s;
    }

    @keyframes floatBubble {

        0%,
        100% {
            transform: translateY(0px) scale(1);
            opacity: 0.7;
        }

        50% {
            transform: translateY(-10px) scale(1.05);
            opacity: 1;
        }
    }

    /* Project Actions */
    .project-actions {
        display: flex;
        gap: var(--space-4);
        margin-top: var(--space-6);
    }

    .action-button {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-3) var(--space-6);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-lg);
        background: transparent;
        color: var(--color-primary);
        text-decoration: none;
        font-family: var(--font-mono);
        transition: var(--transition-all);
        backdrop-filter: blur(var(--blur-md));
    }

    .action-button--primary {
        background: var(--gradient-primary);
        color: var(--color-white);
        border-color: var(--color-primary);
    }

    .action-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.4);
    }

    /* Project Info */
    .project-info {
        padding: var(--space-6);
    }

    .project-meta {
        display: flex;
        gap: var(--space-3);
        margin-bottom: var(--space-4);
    }

    .project-type,
    .project-year {
        background: rgba(var(--color-primary-rgb), 0.1);
        color: var(--color-primary);
        padding: var(--space-1) var(--space-3);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-xs);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
    }

    .project-title {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-white);
        margin-bottom: var(--space-4);
        line-height: var(--line-height-tight);
    }

    .project-description {
        color: var(--color-text-muted);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--space-6);
        font-size: var(--font-size-lg);
    }

    /* Tech Stack Detailed */
    .tech-stack-detailed {
        margin-bottom: var(--space-6);
    }

    .tech-title {
        color: var(--color-white);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-3);
    }

    .tech-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: var(--space-2);
    }

    .tech-item {
        background: rgba(var(--color-surface-dark-rgb), 0.8);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-md);
        padding: var(--space-2) var(--space-3);
        text-align: center;
        transition: var(--transition-all);
    }

    .tech-item:hover {
        border-color: var(--color-primary);
        background: rgba(var(--color-primary-rgb), 0.1);
    }

    .tech-name {
        color: var(--color-white);
        font-size: var(--font-size-sm);
        font-family: var(--font-mono);
    }

    /* Project Stats */
    .project-stats {
        display: flex;
        gap: var(--space-6);
    }

    .stat {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
    }

    /* Carousel Navigation */
    .carousel-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 var(--space-4);
        pointer-events: none;
    }

    .nav-button {
        width: 48px;
        height: 48px;
        border-radius: var(--radius-full);
        background: rgba(var(--color-surface-dark-rgb), 0.9);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        color: var(--color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-xl);
        cursor: pointer;
        transition: var(--transition-all);
        backdrop-filter: blur(var(--blur-md));
        pointer-events: auto;
    }

    .nav-button:hover:not(:disabled) {
        background: rgba(var(--color-primary-rgb), 0.1);
        border-color: var(--color-primary);
        transform: scale(1.05);
    }

    .nav-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Gallery Styles */
    .project-gallery {
        margin-bottom: var(--space-2);
    }

    .gallery-title {
        color: var(--color-white);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-4);
    }

    .gallery-preview {
        display: flex;
        flex-direction: row;
        gap: var(--space-3);
    }

    .gallery-thumb {
        position: relative;
        aspect-ratio: 16/9;
        border-radius: var(--radius-md);
        overflow: hidden;
        cursor: pointer;
        transition: var(--transition-all);
    }

    .gallery-thumb:hover {
        transform: scale(1.05);
    }

    .gallery-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition-all);
    }

    .thumb-overlay {
        position: absolute;
        inset: 0;
        background: rgba(var(--color-bg-dark-rgb), 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-primary);
        font-size: var(--font-size-xl);
        opacity: 0;
        transition: var(--transition-opacity);
    }

    .gallery-thumb:hover .thumb-overlay {
        opacity: 1;
    }

    .gallery-more {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        background: rgba(var(--color-primary-rgb), 0.1);
        border: 2px dashed rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-md);
        color: var(--color-primary);
        cursor: pointer;
        transition: var(--transition-all);
        font-weight: var(--font-weight-semibold);
    }

    .gallery-more:hover {
        background: rgba(var(--color-primary-rgb), 0.2);
        border-color: var(--color-primary);
    }

    /* GitHub Section */
    .github-section {
        background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.05), rgba(var(--color-accent-rgb), 0.02));
        border-top: 1px solid rgba(var(--color-primary-rgb), 0.1);
    }

    /* Carousel Indicators */
    .carousel-indicators {
        display: flex;
        justify-content: center;
        gap: var(--space-3);
        margin-top: var(--space-6);
    }

    .indicator {
        width: 40px;
        height: 4px;
        background: rgba(var(--color-primary-rgb), 0.2);
        border: none;
        border-radius: var(--radius-full);
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--transition-all);
    }

    .indicator.active {
        background: rgba(var(--color-primary-rgb), 0.3);
    }

    .indicator-progress {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: var(--color-primary);
        border-radius: var(--radius-full);
        width: 0%;
        transition: width 0.3s ease;
    }

    .indicator.active .indicator-progress {
        width: 100%;
        animation: indicatorProgress 5s linear;
    }

    @keyframes indicatorProgress {
        from {
            width: 0%;
        }

        to {
            width: 100%;
        }
    }

    /* Work Experience */
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

    /* Education */
    .education-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--space-6);
    }

    .education-card {
        background: rgba(var(--color-surface-dark-rgb), 0.9);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
        display: flex;
        gap: var(--space-4);
        transition: var(--transition-all);
    }

    .education-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.3);
    }

    .edu-icon {
        color: var(--color-primary);
        font-size: var(--font-size-2xl);
        flex-shrink: 0;
    }

    .edu-title {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        color: var(--color-white);
        margin-bottom: var(--space-1);
    }

    .edu-institution {
        color: var(--color-primary);
        font-weight: var(--font-weight-medium);
        margin-bottom: var(--space-1);
    }

    .edu-period {
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
        margin-bottom: var(--space-2);
    }

    .edu-description {
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
        line-height: var(--line-height-relaxed);
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

    /* Responsive Design */
    @media (max-width: 1024px) {
        .project-showcase {
            grid-template-columns: 1fr;
            gap: var(--space-6);
        }

        .code-editor {
            flex-direction: column;
        }

        .editor-sidebar {
            width: 100%;
            height: 100px;
        }
    }

    @media (max-width: 768px) {
        .hero-container {
            grid-template-columns: 1fr;
            gap: var(--space-8);
            text-align: center;
        }

        .stats-grid {
            grid-template-columns: 1fr;
        }

        .carousel-slide {
            padding: var(--space-4);
        }

        .project-showcase {
            min-height: auto;
        }

        .code-preview {
            height: 300px;
        }

        .project-actions {
            flex-direction: column;
        }

        .tech-grid {
            grid-template-columns: repeat(2, 1fr);
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