<template>
    <teleport to="body">
        <div v-if="isOpen" class="gallery-modal" @click="handleBackdropClick">
            <div class="gallery-container" @click.stop>
                <!-- Header -->
                <div class="gallery-header">
                    <div class="gallery-info">
                        <h3 class="gallery-title">{{ project?.title }} Gallery</h3>
                        <span class="image-counter">{{ currentIndex + 1 }} / {{ images.length }}</span>
                    </div>
                    <button class="close-button" @click="$emit('close')">
                        <Icon icon="mdi:close" />
                    </button>
                </div>

                <!-- Main Image Display -->
                <div class="gallery-main" @click="toggleZoom">
                    <div class="image-container" :class="{ 'zoomed': isZoomed }" ref="imageContainer">
                        <img :src="currentImage?.url" :alt="currentImage?.caption" class="main-image"
                            :class="{ 'zoomed': isZoomed }" @load="onImageLoad" @error="onImageError" />

                        <!-- Loading Spinner -->
                        <div v-if="imageLoading" class="image-loading">
                            <div class="spinner"></div>
                        </div>

                        <!-- Zoom Indicator -->
                        <div v-if="!isZoomed" class="zoom-indicator">
                            <Icon icon="mdi:magnify-plus" />
                            <span>Click to zoom</span>
                        </div>
                    </div>

                    <!-- Navigation Arrows -->
                    <button class="nav-arrow nav-arrow--prev" @click.stop="prevImage" :disabled="currentIndex === 0"
                        v-if="images.length > 1">
                        <Icon icon="mdi:chevron-left" />
                    </button>
                    <button class="nav-arrow nav-arrow--next" @click.stop="nextImage"
                        :disabled="currentIndex === images.length - 1" v-if="images.length > 1">
                        <Icon icon="mdi:chevron-right" />
                    </button>
                </div>

                <!-- Thumbnails -->
                <div class="gallery-thumbnails" v-if="images.length > 1">
                    <div class="thumbnails-container">
                        <div v-for="(image, index) in images" :key="index" class="thumbnail-item"
                            :class="{ 'active': index === currentIndex }" @click="goToImage(index)">
                            <img :src="image.thumbnail || image.url" :alt="image.caption" class="thumbnail"
                                loading="lazy" />
                        </div>
                    </div>
                </div>

                <!-- Image Info -->
                <div class="image-info" v-if="currentImage?.caption">
                    <p class="image-caption">{{ currentImage.caption }}</p>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup lang="ts">
    import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
    import { Icon } from '@iconify/vue'
    import type { GalleryImage } from '@/interfaces/imageGallery'

    interface Props {
        isOpen: boolean
        images: GalleryImage[]
        initialIndex?: number
        project?: { title: string } | null
    }

    const props = withDefaults(defineProps<Props>(), {
        initialIndex: 0,
        project: null
    })

    const emit = defineEmits<{
        close: []
    }>()

    const currentIndex = ref(props.initialIndex)
    const isZoomed = ref(false)
    const imageLoading = ref(false)
    const imageContainer = ref<HTMLElement>()

    const currentImage = computed(() => props.images[currentIndex.value])

    const nextImage = () => {
        if (currentIndex.value < props.images.length - 1) {
            currentIndex.value++
            isZoomed.value = false
        }
    }

    const prevImage = () => {
        if (currentIndex.value > 0) {
            currentIndex.value--
            isZoomed.value = false
        }
    }

    const goToImage = (index: number) => {
        currentIndex.value = index
        isZoomed.value = false
    }

    const toggleZoom = () => {
        isZoomed.value = !isZoomed.value
    }

    const handleBackdropClick = () => {
        emit('close')
    }

    const onImageLoad = () => {
        imageLoading.value = false
    }

    const onImageError = () => {
        imageLoading.value = false
        console.error('Failed to load image:', currentImage.value?.url)
    }

    // Watch for image changes to show loading
    // watch(currentIndex, () => {
    //     imageLoading.value = true
    // })

    // Keyboard navigation
    const handleKeydown = (event: KeyboardEvent) => {
        if (!props.isOpen) return

        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault()
                prevImage()
                break
            case 'ArrowRight':
                event.preventDefault()
                nextImage()
                break
            case 'Escape':
                event.preventDefault()
                emit('close')
                break
        }
    }

    // Prevent body scroll when modal is open
    const toggleBodyScroll = (disable: boolean) => {
        if (disable) {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '0px' // Prevent layout shift
        } else {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
        }
    }

    // Watch for modal open/close
    watch(() => props.isOpen, (isOpen) => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeydown)
            toggleBodyScroll(true)
            currentIndex.value = props.initialIndex
            imageLoading.value = true
        } else {
            document.removeEventListener('keydown', handleKeydown)
            toggleBodyScroll(false)
            isZoomed.value = false
        }
    })

    // Cleanup on component unmount
    onUnmounted(() => {
        document.removeEventListener('keydown', handleKeydown)
        toggleBodyScroll(false)
    })
</script>

<style scoped>
    .gallery-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    .gallery-container {
        width: 95vw;
        height: 95vh;
        max-width: 1400px;
        display: flex;
        flex-direction: column;
        background: var(--color-bg-dark);
        color: var(--color-text-dark);
        border-radius: var(--radius-xl);
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
        animation: scaleIn 0.3s ease-out;
    }

    @keyframes scaleIn {
        from {
            transform: scale(0.9);
            opacity: 0;
        }

        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    /* Header */
    .gallery-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-4) var(--space-6);
        background: rgba(var(--color-surface-dark-rgb), 0.9);
        border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.2);
        backdrop-filter: blur(var(--blur-md));
        flex-shrink: 0;
    }

    .gallery-info {
        display: flex;
        align-items: center;
        gap: var(--space-4);
    }

    .gallery-title {
        color: var(--color-white);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        margin: 0;
    }

    .image-counter {
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
        font-family: var(--font-mono);
        background: rgba(var(--color-primary-rgb), 0.1);
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-sm);
    }

    .close-button {
        width: 40px;
        height: 40px;
        border-radius: var(--radius-full);
        background: rgba(var(--color-primary-rgb), 0.1);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        color: var(--color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: var(--transition-all);
    }

    .close-button:hover {
        background: rgba(var(--color-primary-rgb), 0.2);
        transform: scale(1.05);
    }

    /* Main Image */
    .gallery-main {
        flex: 1;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-4);
        overflow: hidden;
        min-height: 0;
        /* Important for flex child */
    }

    .image-container {
        position: relative;
        max-width: 100%;
        max-height: 100%;
        transition: var(--transition-all);
        cursor: zoom-in;
    }

    .image-container.zoomed {
        cursor: zoom-out;
        transform: scale(1.5);
    }

    .main-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-2xl);
        transition: var(--transition-all);
    }

    .image-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(var(--color-primary-rgb), 0.3);
        border-top: 3px solid var(--color-primary);
        border-radius: var(--radius-full);
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    .zoom-indicator {
        position: absolute;
        bottom: var(--space-4);
        right: var(--space-4);
        background: rgba(var(--color-bg-dark-rgb), 0.9);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-lg);
        padding: var(--space-2) var(--space-3);
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--color-primary);
        font-size: var(--font-size-sm);
        backdrop-filter: blur(var(--blur-md));
        opacity: 0.7;
        transition: var(--transition-opacity);
        pointer-events: none;
    }

    .image-container:hover .zoom-indicator {
        opacity: 1;
    }

    /* Navigation Arrows */
    .nav-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 60px;
        height: 60px;
        border-radius: var(--radius-full);
        background: rgba(var(--color-bg-dark-rgb), 0.9);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        color: var(--color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: var(--transition-all);
        backdrop-filter: blur(var(--blur-md));
        z-index: 10;
    }

    .nav-arrow:hover:not(:disabled) {
        background: rgba(var(--color-primary-rgb), 0.2);
        transform: translateY(-50%) scale(1.1);
        border-color: var(--color-primary);
    }

    .nav-arrow:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .nav-arrow--prev {
        left: var(--space-4);
    }

    .nav-arrow--next {
        right: var(--space-4);
    }

    /* Thumbnails */
    .gallery-thumbnails {
        padding: var(--space-4) var(--space-6);
        background: rgba(var(--color-surface-dark-rgb), 0.9);
        border-top: 1px solid rgba(var(--color-primary-rgb), 0.2);
        backdrop-filter: blur(var(--blur-md));
        flex-shrink: 0;
    }

    .thumbnails-container {
        display: flex;
        gap: var(--space-3);
        overflow-x: auto;
        padding: var(--space-2) 0;
        scrollbar-width: thin;
        scrollbar-color: rgba(var(--color-primary-rgb), 0.3) transparent;
    }

    .thumbnails-container::-webkit-scrollbar {
        height: 6px;
    }

    .thumbnails-container::-webkit-scrollbar-track {
        background: transparent;
    }

    .thumbnails-container::-webkit-scrollbar-thumb {
        background: rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-full);
    }

    .thumbnails-container::-webkit-scrollbar-thumb:hover {
        background: rgba(var(--color-primary-rgb), 0.5);
    }

    .thumbnail-item {
        flex-shrink: 0;
        width: 80px;
        height: 60px;
        border-radius: var(--radius-md);
        overflow: hidden;
        cursor: pointer;
        border: 2px solid transparent;
        transition: var(--transition-all);
    }

    .thumbnail-item.active {
        border-color: var(--color-primary);
        box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.4);
    }

    .thumbnail-item:hover {
        transform: scale(1.05);
        border-color: rgba(var(--color-primary-rgb), 0.5);
    }

    .thumbnail {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* Image Info */
    .image-info {
        padding: var(--space-4) var(--space-6);
        background: rgba(var(--color-surface-dark-rgb), 0.9);
        border-top: 1px solid rgba(var(--color-primary-rgb), 0.2);
        backdrop-filter: blur(var(--blur-md));
        flex-shrink: 0;
    }

    .image-caption {
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
        line-height: var(--line-height-relaxed);
        text-align: center;
        margin: 0;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .gallery-container {
            width: 100vw;
            height: 100vh;
            border-radius: 0;
        }

        .gallery-header {
            padding: var(--space-3) var(--space-4);
        }

        .gallery-main {
            padding: var(--space-2);
        }

        .nav-arrow {
            width: 50px;
            height: 50px;
        }

        .nav-arrow--prev {
            left: var(--space-2);
        }

        .nav-arrow--next {
            right: var(--space-2);
        }

        .gallery-thumbnails {
            padding: var(--space-3) var(--space-4);
        }

        .thumbnail-item {
            width: 60px;
            height: 45px;
        }

        .gallery-info {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-2);
        }
    }

    @media (max-width: 480px) {
        .gallery-header {
            padding: var(--space-2) var(--space-3);
        }

        .gallery-title {
            font-size: var(--font-size-md);
        }

        .nav-arrow {
            width: 45px;
            height: 45px;
        }

        .zoom-indicator {
            bottom: var(--space-2);
            right: var(--space-2);
            padding: var(--space-1) var(--space-2);
        }

        .zoom-indicator span {
            display: none;
        }
    }
</style>