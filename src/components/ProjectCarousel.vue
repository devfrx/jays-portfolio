<template>
    <div class="project-carousel">
        <div class="carousel-container" ref="carouselContainer">
            <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                <div class="carousel-slide" v-for="project in projects" :key="project.id">
                    <div class="project-showcase">
                        <!-- Project Gallery -->
                        <div class="project-visual">
                            <div class="gallery-container">
                                <!-- Main Image -->
                                <div class="main-image-container">
                                    <img :src="getCurrentImage(project)?.url || '/placeholder.jpg'"
                                        :alt="getCurrentImage(project)?.caption || project.title" class="main-image"
                                        @click="openGallery(project, currentImageIndex[project.id] || 0)" />
                                    <div class="image-overlay" v-if="project.gallery && project.gallery.length > 0">
                                        <div class="gallery-info">
                                            <Icon icon="mdi:image-multiple" />
                                            <span>{{ project.gallery.length }} images</span>
                                        </div>
                                        <button class="zoom-button"
                                            @click="openGallery(project, currentImageIndex[project.id] || 0)">
                                            <Icon icon="mdi:magnify-plus" />
                                        </button>
                                    </div>

                                    <!-- Image Navigation -->
                                    <div class="image-nav" v-if="project.gallery && project.gallery.length > 1">
                                        <button class="image-nav-btn prev" @click="prevImage(project)"
                                            :disabled="(currentImageIndex[project.id] || 0) === 0">
                                            <Icon icon="mdi:chevron-left" />
                                        </button>
                                        <button class="image-nav-btn next" @click="nextImage(project)"
                                            :disabled="(currentImageIndex[project.id] || 0) >= (project.gallery?.length - 1 || 0)">
                                            <Icon icon="mdi:chevron-right" />
                                        </button>
                                    </div>
                                </div>

                                <!-- Thumbnail Strip -->
                                <div class="thumbnail-strip" v-if="project.gallery && project.gallery.length > 1">
                                    <div v-for="(image, index) in project.gallery" :key="index" class="thumbnail-item"
                                        :class="{ active: (currentImageIndex[project.id] || 0) === index }"
                                        @click="setCurrentImage(project, index)">
                                        <img :src="image.thumbnail || image.url" :alt="image.caption" />
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
    import { ref, onMounted, onUnmounted, watch, reactive } from 'vue'
    import { Icon } from '@iconify/vue'
    import type { Project } from '@/interfaces/projects'

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

    // Image management
    const currentImageIndex = reactive<Record<number, number>>({})

    const getCurrentImage = (project: Project) => {
        if (!project.gallery || project.gallery.length === 0) return null
        const index = currentImageIndex[project.id] || 0
        return project.gallery[index]
    }

    const setCurrentImage = (project: Project, index: number) => {
        currentImageIndex[project.id] = index
    }

    const nextImage = (project: Project) => {
        if (!project.gallery) return
        const current = currentImageIndex[project.id] || 0
        if (current < project.gallery.length - 1) {
            currentImageIndex[project.id] = current + 1
        }
    }

    const prevImage = (project: Project) => {
        const current = currentImageIndex[project.id] || 0
        if (current > 0) {
            currentImageIndex[project.id] = current - 1
        }
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
        props.projects.forEach(project => {
            currentImageIndex[project.id] = 0
        })

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

    /* Gallery Styles */
    .gallery-container {
        position: relative;
        border-radius: var(--radius-lg);
        overflow: hidden;
        background: var(--color-bg-dark);
        border: 2px solid rgba(var(--color-primary-rgb), 0.3);
    }

    .main-image-container {
        position: relative;
        aspect-ratio: 16/10;
        overflow: hidden;
    }

    .main-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
        transition: var(--transition-all);
    }

    .main-image:hover {
        transform: scale(1.05);
    }

    .image-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom,
                transparent 60%,
                rgba(var(--color-bg-dark-rgb), 0.8) 100%);
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: var(--space-4);
        opacity: 0;
        transition: var(--transition-opacity);
    }

    .main-image-container:hover .image-overlay {
        opacity: 1;
    }

    .gallery-info {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--color-white);
        font-size: var(--font-size-sm);
        background: rgba(var(--color-bg-dark-rgb), 0.8);
        padding: var(--space-2) var(--space-3);
        border-radius: var(--radius-md);
        backdrop-filter: blur(var(--blur-md));
    }

    .zoom-button {
        background: rgba(var(--color-primary-rgb), 0.9);
        color: var(--color-white);
        border: none;
        border-radius: var(--radius-full);
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: var(--transition-all);
    }

    .zoom-button:hover {
        background: var(--color-primary);
        transform: scale(1.1);
    }

    .image-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: var(--space-3);
        right: var(--space-3);
        display: flex;
        justify-content: space-between;
        pointer-events: none;
    }

    .image-nav-btn {
        background: rgba(var(--color-bg-dark-rgb), 0.8);
        color: var(--color-primary);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-full);
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: var(--transition-all);
        backdrop-filter: blur(var(--blur-md));
        pointer-events: auto;
        opacity: 0;
    }

    .main-image-container:hover .image-nav-btn {
        opacity: 1;
    }

    .image-nav-btn:hover:not(:disabled) {
        background: rgba(var(--color-primary-rgb), 0.2);
        transform: scale(1.1);
    }

    .image-nav-btn:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .thumbnail-strip {
        display: flex;
        gap: var(--space-2);
        padding: var(--space-3);
        background: rgba(var(--color-surface-dark-rgb), 0.9);
        overflow-x: auto;
        scrollbar-width: thin;
    }

    .thumbnail-item {
        flex-shrink: 0;
        width: 60px;
        height: 40px;
        border-radius: var(--radius-sm);
        overflow: hidden;
        cursor: pointer;
        border: 2px solid transparent;
        transition: var(--transition-all);
    }

    .thumbnail-item.active {
        border-color: var(--color-primary);
    }

    .thumbnail-item:hover {
        transform: scale(1.05);
        border-color: rgba(var(--color-primary-rgb), 0.5);
    }

    .thumbnail-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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

    /* Responsive Design - Ottimizzato */
    @media (max-width: 1200px) {
        .project-showcase {
            grid-template-columns: 1fr 0.8fr;
            gap: var(--space-6);
        }
    }

    /* Responsive Design - CORREZIONI per mobile */
    @media (max-width: 1024px) {
        .project-showcase {
            grid-template-columns: 1fr;
            gap: var(--space-6);
            min-height: auto;
            width: 100%;
            /* Fix: Assicura larghezza contenuta */
        }

        .gallery-container {
            order: -1;
            width: 100%;
            /* Fix: Evita overflow orizzontale */
        }

        .tech-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        }
    }

    @media (max-width: 768px) {
        .carousel-slide {
            padding: var(--space-4);
            /* Ridotto padding */
            width: 100vw;
            /* Fix: Forza larghezza viewport */
            max-width: 100%;
            /* Fix: Previene overflow */
            box-sizing: border-box;
            /* Fix: Include padding nel calcolo */
        }

        .project-showcase {
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
            /* Fix: Nasconde overflow orizzontale */
        }

        .project-info {
            padding: var(--space-4);
            width: 100%;
            box-sizing: border-box;
        }

        .gallery-container {
            width: 100%;
            max-width: 100%;
        }

        .main-image-container {
            aspect-ratio: 4/3;
            width: 100%;
        }

        .project-title {
            font-size: var(--font-size-2xl);
            word-wrap: break-word;
            /* Fix: Previene overflow del testo */
        }

        .project-description {
            font-size: var(--font-size-md);
            word-wrap: break-word;
            /* Fix: Previene overflow del testo */
        }

        .project-actions {
            flex-direction: column;
            gap: var(--space-3);
            width: 100%;
        }

        .action-button {
            justify-content: center;
            padding: var(--space-3) var(--space-4);
            width: 100%;
            /* Fix: Pulsanti full-width su mobile */
            box-sizing: border-box;
        }

        .tech-grid {
            width: 100%;
            grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
            /* Fix: Celle più piccole */
            gap: var(--space-2);
        }

        .tech-item {
            word-wrap: break-word;
            min-width: 0;
            /* Fix: Permette shrinking */
        }

        .thumbnail-strip {
            padding: var(--space-2);
            gap: var(--space-1);
            width: 100%;
            box-sizing: border-box;
        }
    }

    @media (max-width: 480px) {
        .carousel-slide {
            padding: var(--space-3);
            /* Ulteriormente ridotto */
            width: 100vw;
            max-width: 100%;
            box-sizing: border-box;
        }

        .project-info {
            padding: var(--space-3);
            width: 100%;
            box-sizing: border-box;
        }

        .project-title {
            font-size: var(--font-size-xl);
            margin-bottom: var(--space-3);
            line-height: 1.2;
            /* Fix: Line height più compatto */
            hyphens: auto;
            /* Fix: Hyphens per parole lunghe */
        }

        .project-description {
            font-size: var(--font-size-sm);
            margin-bottom: var(--space-4);
            line-height: 1.4;
            hyphens: auto;
        }

        .project-meta {
            flex-direction: column;
            gap: var(--space-2);
            align-items: flex-start;
            width: 100%;
        }

        .main-image-container {
            aspect-ratio: 16/12;
            width: 100%;
        }

        .tech-grid {
            grid-template-columns: 1fr 1fr;
            /* Fix: Solo 2 colonne su mobile small */
            gap: var(--space-2);
            width: 100%;
        }

        .tech-item {
            padding: var(--space-2) var(--space-1);
            min-width: 0;
            text-align: center;
        }

        .tech-name {
            font-size: var(--font-size-xs);
            line-height: 1.2;
            word-wrap: break-word;
        }

        .action-button {
            padding: var(--space-2) var(--space-3);
            font-size: var(--font-size-sm);
            width: 100%;
            min-height: 44px;
            /* Fix: Altezza minima touch-friendly */
        }

        .carousel-indicators {
            gap: var(--space-2);
            margin-top: var(--space-4);
            padding: 0 var(--space-3);
            /* Fix: Padding laterale */
            box-sizing: border-box;
        }

        .indicator {
            width: 30px;
            height: 3px;
        }
    }

    @media (max-width: 360px) {
        .carousel-slide {
            padding: var(--space-2);
            /* Padding minimo */
            width: 100vw;
            max-width: 100%;
            box-sizing: border-box;
        }

        .project-showcase {
            gap: var(--space-3);
            /* Gap ridotto */
            width: 100%;
        }

        .project-info {
            padding: var(--space-2);
            width: 100%;
            box-sizing: border-box;
        }

        .project-title {
            font-size: var(--font-size-lg);
            line-height: 1.1;
            margin-bottom: var(--space-2);
        }

        .project-description {
            font-size: var(--font-size-xs);
            line-height: 1.3;
            margin-bottom: var(--space-3);
        }

        .tech-grid {
            grid-template-columns: 1fr 1fr;
            gap: var(--space-1);
            width: 100%;
        }

        .tech-item {
            padding: var(--space-1);
            min-width: 0;
        }

        .tech-name {
            font-size: 11px;
        }

        .action-button {
            padding: var(--space-2);
            gap: var(--space-1);
            font-size: var(--font-size-xs);
            width: 100%;
            min-height: 40px;
        }

        .project-meta {
            gap: var(--space-1);
            margin-bottom: var(--space-2);
        }

        .project-type,
        .project-year {
            padding: 4px var(--space-1);
            font-size: 10px;
        }
    }

    /* Landscape orientations on mobile */
    @media (max-width: 768px) and (orientation: landscape) {
        .carousel-slide {
            padding: var(--space-3) var(--space-4);
            width: 100vw;
            max-width: 100%;
            box-sizing: border-box;
        }

        .main-image-container {
            aspect-ratio: 16/9;
        }

        .project-showcase {
            grid-template-columns: 1.2fr 1fr;
            gap: var(--space-4);
            width: 100%;
        }
    }

    /* Very small devices */
    @media (max-width: 320px) {
        .carousel-slide {
            padding: var(--space-1) var(--space-2);
        }

        .project-title {
            font-size: var(--font-size-md);
            line-height: 1.1;
        }

        .project-description {
            font-size: 12px;
            line-height: 1.2;
        }

        .tech-name {
            font-size: 10px;
        }

        .action-button span {
            display: none;
            /* Nasconde testo, mostra solo icone */
        }

        .action-button {
            min-width: 44px;
            aspect-ratio: 1;
            padding: var(--space-2);
        }
    }

    /* Container principale fix */
    .carousel-container {
        overflow: hidden;
        width: 100%;
        max-width: 100%;
        border-radius: var(--radius-xl);
        background: rgba(var(--color-surface-dark-rgb), 0.3);
        backdrop-filter: blur(var(--blur-md));
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
    }

    .carousel-track {
        display: flex;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        width: 100%;
    }

    /* Touch optimizations */
    @media (hover: none) and (pointer: coarse) {
        .image-nav-btn {
            opacity: 1;
            background: rgba(var(--color-bg-dark-rgb), 0.9);
        }

        .action-button:hover {
            transform: none;
        }

        .action-button:active {
            transform: scale(0.98);
        }

        .nav-button:hover {
            transform: none;
        }

        .nav-button:active {
            transform: scale(0.95);
        }

        .thumbnail-item:hover {
            transform: none;
        }
    }

    /* High DPI displays */
    @media (-webkit-min-device-pixel-ratio: 2),
    (min-resolution: 192dpi) {

        .main-image,
        .thumbnail-item img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
        }
    }

</style>