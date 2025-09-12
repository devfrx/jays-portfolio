<template>
    <div class="project-carousel">
        <div class="carousel-container" ref="carouselContainer">
            <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                <div class="carousel-slide" v-for="project in projects" :key="project.id">
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
                                        <div class="browser-url">{{ project.demo || 'localhost:3000' }}</div>
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
                                                        <div class="file-item" v-for="(file, index) in project.files"
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
                                                                <span class="line-number">{{ String(index +
                                                                    1).padStart(2, '0') }}</span>
                                                                <span class="code-text" v-html="line"></span>
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
                                                v-for="(tech, index) in project.technologies.slice(0, 4)" :key="tech"
                                                :style="{ animationDelay: `${index * 0.5}s` }">
                                                {{ tech }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Project Actions -->
                            <div class="project-actions">
                                <a :href="project.github" class="action-button" target="_blank" rel="noopener"
                                    v-if="project.github">
                                    <Icon icon="mdi:github" />
                                    <span>Code</span>
                                </a>
                                <a :href="project.demo" class="action-button action-button--primary" target="_blank"
                                    rel="noopener" v-if="project.demo">
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
                                    <div class="tech-item" v-for="tech in project.technologies" :key="tech">
                                        <span class="tech-name">{{ tech }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Project Gallery -->
                            <div class="project-gallery" v-if="project.gallery && project.gallery.length">
                                <h4 class="gallery-title">Screenshots</h4>
                                <div class="gallery-preview">
                                    <div v-for="(image, index) in project.gallery.slice(0, 3)" :key="index"
                                        class="gallery-thumb" @click="openGallery(project, index)">
                                        <img :src="image.thumbnail || image.url" :alt="image.caption" loading="lazy" />
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
        </div>

        <!-- Carousel Navigation -->
        <div class="carousel-nav">
            <button class="nav-button nav-button--prev" @click="prevSlide" :disabled="currentSlide === 0">
                <Icon icon="mdi:chevron-left" />
            </button>
            <button class="nav-button nav-button--next" @click="nextSlide"
                :disabled="currentSlide === projects.length - 1">
                <Icon icon="mdi:chevron-right" />
            </button>
        </div>

        <!-- Carousel Indicators -->
        <div class="carousel-indicators">
            <button v-for="(project, index) in projects" :key="index" class="indicator"
                :class="{ active: currentSlide === index }" @click="goToSlide(index)">
                <span class="indicator-progress"></span>
            </button>
        </div>

        <!-- Auto-play Controls -->
        <div class="carousel-controls" v-if="autoplay">
            <button class="control-button" @click="toggleAutoplay" :title="isPlaying ? 'Pause' : 'Play'">
                <Icon :icon="isPlaying ? 'mdi:pause' : 'mdi:play'" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onUnmounted, watch } from 'vue'
    import { Icon } from '@iconify/vue'

    interface Project {
        id: number
        title: string
        description: string
        type: string
        year: string
        icon: string
        technologies: string[]
        github?: string
        demo?: string
        gallery?: Array<{
            url: string
            thumbnail?: string
            caption?: string
        }>
        files: Array<{
            name: string
            icon: string
        }>
        codePreview: string[]
    }

    interface Props {
        projects: Project[]
        autoplay?: boolean
        autoplayInterval?: number
        showControls?: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
        autoplay: true,
        autoplayInterval: 5000,
        showControls: true
    })

    const emit = defineEmits<{
        openGallery: [project: Project, index: number]
        slideChange: [index: number]
    }>()

    // Carousel state
    const currentSlide = ref(0)
    const carouselContainer = ref<HTMLElement>()
    const isPlaying = ref(props.autoplay)
    const autoplayTimer = ref<NodeJS.Timeout>()

    // Navigation methods
    const nextSlide = () => {
        if (currentSlide.value < props.projects.length - 1) {
            currentSlide.value++
        } else {
            currentSlide.value = 0
        }
        emit('slideChange', currentSlide.value)
    }

    const prevSlide = () => {
        if (currentSlide.value > 0) {
            currentSlide.value--
        } else {
            currentSlide.value = props.projects.length - 1
        }
        emit('slideChange', currentSlide.value)
    }

    const goToSlide = (index: number) => {
        currentSlide.value = index
        emit('slideChange', currentSlide.value)
    }

    // Gallery handler
    const openGallery = (project: Project, index: number) => {
        emit('openGallery', project, index)
    }

    // Autoplay functionality
    const startAutoplay = () => {
        if (!props.autoplay) return

        stopAutoplay()
        autoplayTimer.value = setInterval(() => {
            if (isPlaying.value) {
                nextSlide()
            }
        }, props.autoplayInterval)
    }

    const stopAutoplay = () => {
        if (autoplayTimer.value) {
            clearInterval(autoplayTimer.value)
            autoplayTimer.value = undefined
        }
    }

    const toggleAutoplay = () => {
        isPlaying.value = !isPlaying.value
        if (isPlaying.value) {
            startAutoplay()
        } else {
            stopAutoplay()
        }
    }

    // Keyboard navigation
    const handleKeydown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault()
                prevSlide()
                break
            case 'ArrowRight':
                event.preventDefault()
                nextSlide()
                break
            case ' ':
                event.preventDefault()
                if (props.autoplay) {
                    toggleAutoplay()
                }
                break
        }
    }

    // Touch/swipe support
    const touchStartX = ref(0)
    const touchEndX = ref(0)

    const handleTouchStart = (event: TouchEvent) => {
        touchStartX.value = event.changedTouches[0].screenX
    }

    const handleTouchEnd = (event: TouchEvent) => {
        touchEndX.value = event.changedTouches[0].screenX
        handleSwipe()
    }

    const handleSwipe = () => {
        const swipeThreshold = 50
        const diff = touchStartX.value - touchEndX.value

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide() // Swipe left - next slide
            } else {
                prevSlide() // Swipe right - previous slide
            }
        }
    }

    // Pause autoplay on hover
    const handleMouseEnter = () => {
        if (isPlaying.value) {
            stopAutoplay()
        }
    }

    const handleMouseLeave = () => {
        if (isPlaying.value) {
            startAutoplay()
        }
    }

    // Watch for slide changes to restart autoplay timer
    watch(currentSlide, () => {
        if (isPlaying.value) {
            startAutoplay()
        }
    })

    // Lifecycle
    onMounted(() => {
        if (props.autoplay) {
            startAutoplay()
        }

        // Add event listeners
        document.addEventListener('keydown', handleKeydown)

        if (carouselContainer.value) {
            carouselContainer.value.addEventListener('touchstart', handleTouchStart)
            carouselContainer.value.addEventListener('touchend', handleTouchEnd)
            carouselContainer.value.addEventListener('mouseenter', handleMouseEnter)
            carouselContainer.value.addEventListener('mouseleave', handleMouseLeave)
        }
    })

    onUnmounted(() => {
        stopAutoplay()
        document.removeEventListener('keydown', handleKeydown)

        if (carouselContainer.value) {
            carouselContainer.value.removeEventListener('touchstart', handleTouchStart)
            carouselContainer.value.removeEventListener('touchend', handleTouchEnd)
            carouselContainer.value.removeEventListener('mouseenter', handleMouseEnter)
            carouselContainer.value.removeEventListener('mouseleave', handleMouseLeave)
        }
    })
</script>

<style scoped>
    .project-carousel {
        position: relative;
        margin-bottom: var(--space-12);
    }

    .carousel-container {
        overflow: hidden;
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

    /* Tech Stack */
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

    /* Gallery */
    .project-gallery {
        margin-bottom: var(--space-4);
    }

    .gallery-title {
        color: var(--color-white);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-4);
    }

    .gallery-preview {
        display: flex;
        gap: var(--space-3);
    }

    .gallery-thumb {
        position: relative;
        aspect-ratio: 16/9;
        border-radius: var(--radius-md);
        overflow: hidden;
        cursor: pointer;
        transition: var(--transition-all);
        flex: 1;
    }

    .gallery-thumb:hover {
        transform: scale(1.05);
    }

    .gallery-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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
        align-items: center;
        justify-content: center;
        background: rgba(var(--color-primary-rgb), 0.1);
        border: 2px dashed rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-md);
        color: var(--color-primary);
        cursor: pointer;
        transition: var(--transition-all);
        font-weight: var(--font-weight-semibold);
        flex: 1;
    }

    .gallery-more:hover {
        background: rgba(var(--color-primary-rgb), 0.2);
        border-color: var(--color-primary);
    }

    /* Navigation */
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

    /* Indicators */
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

    /* Controls */
    .carousel-controls {
        position: absolute;
        top: var(--space-4);
        right: var(--space-4);
        z-index: 10;
    }

    .control-button {
        width: 40px;
        height: 40px;
        border-radius: var(--radius-full);
        background: rgba(var(--color-surface-dark-rgb), 0.9);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        color: var(--color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: var(--transition-all);
        backdrop-filter: blur(var(--blur-md));
    }

    .control-button:hover {
        background: rgba(var(--color-primary-rgb), 0.1);
        transform: scale(1.05);
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
    }

    @media (max-width: 480px) {
        .gallery-preview {
            flex-direction: column;
        }

        .nav-button {
            width: 40px;
            height: 40px;
        }
    }
</style>