<template>
    <div class="certification-showcase">
        <div class="showcase-header">
            <div class="header-info">
                <Icon icon="mdi:certificate" class="header-icon" />
                <div class="header-text">
                    <h3 class="showcase-title">Professional Certifications</h3>
                    <p class="showcase-subtitle">Validated expertise and continuous learning</p>
                </div>
            </div>
            <div class="achievement-counter">
                <span class="counter-number">{{ certifications.length }}</span>
                <span class="counter-label">Certifications</span>
            </div>
        </div>

        <div class="certifications-grid">
            <div v-for="(cert, index) in certifications" :key="cert.id" class="certification-card"
                :class="`cert-${cert.level.toLowerCase()}`" :style="{ animationDelay: `${index * 0.1}s` }">
                <!-- Certification Badge -->
                <div class="cert-badge">
                    <div class="badge-ring">
                        <div class="badge-inner">
                            <Icon :icon="cert.icon" class="cert-icon" :style="{ color: cert.color }" />
                        </div>
                    </div>
                    <div class="cert-level-badge" :class="`level-${cert.level.toLowerCase()}`">
                        {{ cert.level }}
                    </div>
                </div>

                <!-- Certification Content -->
                <div class="cert-content">
                    <div class="cert-header">
                        <h4 class="cert-title">{{ cert.title }}</h4>
                        <div class="cert-issuer">
                            <span class="issuer-name">{{ cert.issuer }}</span>
                            <div class="issuer-verified">
                                <Icon icon="mdi:check-circle" />
                                <span>Verified</span>
                            </div>
                        </div>
                    </div>

                    <div class="cert-meta">
                        <div class="cert-date">
                            <Icon icon="mdi:calendar" />
                            <span>{{ formatDate(cert.date) }}</span>
                        </div>
                        <div class="cert-validity" v-if="cert.expires">
                            <Icon icon="mdi:clock-outline" />
                            <span>Valid until {{ formatDate(cert.expires) }}</span>
                        </div>
                        <div class="cert-permanent" v-else>
                            <Icon icon="mdi:infinity" />
                            <span>Permanent</span>
                        </div>
                    </div>

                    <!-- Skills Covered -->
                    <div class="cert-skills" v-if="cert.skills">
                        <h5 class="skills-title">Skills Covered</h5>
                        <div class="skills-list">
                            <span v-for="skill in cert.skills" :key="skill" class="skill-tag">
                                {{ skill }}
                            </span>
                        </div>
                    </div>

                    <!-- Certification Actions -->
                    <div class="cert-actions">
                        <button class="action-button view-cert" @click="viewCertificate(cert)"
                            v-if="cert.credentialUrl">
                            <Icon icon="mdi:eye" />
                            <span>View Certificate</span>
                        </button>
                        <button class="action-button verify-cert" @click="verifyCertificate(cert)"
                            v-if="cert.verificationId">
                            <Icon icon="mdi:shield-check" />
                            <span>Verify</span>
                        </button>
                    </div>
                </div>

                <!-- Certification Effects -->
                <div class="cert-glow"></div>
                <div class="cert-particles">
                    <div class="particle" v-for="i in 6" :key="i"></div>
                </div>
            </div>
        </div>

        <!-- Achievement Timeline -->
        <div class="achievement-timeline">
            <h4 class="timeline-title">Certification Journey</h4>
            <div class="timeline-track">
                <div v-for="(cert, index) in sortedCertifications" :key="cert.id" class="timeline-item"
                    :style="{ left: `${getTimelinePosition(cert.date)}%` }">
                    <div class="timeline-marker">
                        <Icon :icon="cert.icon" :style="{ color: cert.color }" />
                    </div>
                    <div class="timeline-tooltip">
                        <strong>{{ cert.title }}</strong>
                        <span>{{ cert.date }}</span>
                    </div>
                </div>
            </div>
            <div class="timeline-labels">
                <span class="timeline-start">{{ earliestYear }}</span>
                <span class="timeline-end">{{ currentYear }}</span>
            </div>
        </div>

        <!-- Statistics -->
        <div class="cert-statistics">
            <div class="stat-item">
                <div class="stat-icon">
                    <Icon icon="mdi:trending-up" />
                </div>
                <div class="stat-content">
                    <div class="stat-number">{{ certificationsByLevel.advanced + certificationsByLevel.expert }}</div>
                    <div class="stat-label">Advanced+</div>
                </div>
            </div>
            <div class="stat-item">
                <div class="stat-icon">
                    <Icon icon="mdi:school" />
                </div>
                <div class="stat-content">
                    <div class="stat-number">{{ uniqueIssuers.length }}</div>
                    <div class="stat-label">Institutions</div>
                </div>
            </div>
            <div class="stat-item">
                <div class="stat-icon">
                    <Icon icon="mdi:calendar-check" />
                </div>
                <div class="stat-content">
                    <div class="stat-number">{{ recentCertifications }}</div>
                    <div class="stat-label">This Year</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import { Icon } from '@iconify/vue'

    interface Certification {
        id: string
        title: string
        issuer: string
        date: string
        expires?: string
        level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Certified'
        icon: string
        color: string
        credentialUrl?: string
        verificationId?: string
        skills?: string[]
    }

    interface Props {
        certifications: Certification[]
    }

    const props = defineProps<Props>()

    const emit = defineEmits<{
        viewCertificate: [certification: Certification]
        verifyCertificate: [certification: Certification]
    }>()

    // Computed properties
    const sortedCertifications = computed(() => {
        return [...props.certifications].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    })

    const certificationsByLevel = computed(() => {
        return props.certifications.reduce((acc, cert) => {
            const level = cert.level.toLowerCase()
            acc[level] = (acc[level] || 0) + 1
            return acc
        }, {} as Record<string, number>)
    })

    const uniqueIssuers = computed(() => {
        return [...new Set(props.certifications.map(cert => cert.issuer))]
    })

    const recentCertifications = computed(() => {
        const currentYear = new Date().getFullYear()
        return props.certifications.filter(cert => new Date(cert.date).getFullYear() === currentYear).length
    })

    const earliestYear = computed(() => {
        const dates = props.certifications.map(cert => new Date(cert.date).getFullYear())
        return Math.min(...dates)
    })

    const currentYear = computed(() => new Date().getFullYear())

    // Methods
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        })
    }

    const getTimelinePosition = (dateString: string): number => {
        const date = new Date(dateString)
        const startYear = earliestYear.value
        const endYear = currentYear.value
        const yearRange = endYear - startYear
        const certYear = date.getFullYear()

        return yearRange > 0 ? ((certYear - startYear) / yearRange) * 100 : 0
    }

    const viewCertificate = (cert: Certification) => {
        emit('viewCertificate', cert)
    }

    const verifyCertificate = (cert: Certification) => {
        emit('verifyCertificate', cert)
    }
</script>

<style scoped>
    .certification-showcase {
        background: rgba(var(--color-surface-dark-rgb), 0.5);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-xl);
        padding: var(--space-8);
        backdrop-filter: blur(var(--blur-md));
    }

    /* Header */
    .showcase-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-8);
        padding-bottom: var(--space-6);
        border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.2);
    }

    .header-info {
        display: flex;
        align-items: center;
        gap: var(--space-4);
    }

    .header-icon {
        width: 48px;
        height: 48px;
        color: var(--color-primary);
        font-size: var(--font-size-2xl);
        background: rgba(var(--color-primary-rgb), 0.1);
        border: 2px solid var(--color-primary);
        border-radius: var(--radius-lg);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .showcase-title {
        color: var(--color-white);
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        margin: 0 0 var(--space-1) 0;
    }

    .showcase-subtitle {
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
        margin: 0;
    }

    .achievement-counter {
        text-align: center;
        background: rgba(var(--color-primary-rgb), 0.1);
        border: 2px solid var(--color-primary);
        border-radius: var(--radius-lg);
        padding: var(--space-4);
        min-width: 80px;
    }

    .counter-number {
        display: block;
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-primary);
        font-family: var(--font-mono);
    }

    .counter-label {
        display: block;
        font-size: var(--font-size-xs);
        color: var(--color-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    /* Certifications Grid */
    .certifications-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: var(--space-6);
        margin-bottom: var(--space-8);
    }

    .certification-card {
        background: linear-gradient(135deg,
                rgba(var(--color-surface-dark-rgb), 0.95),
                rgba(var(--color-bg-dark-rgb), 0.8));
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-xl);
        padding: var(--space-6);
        position: relative;
        overflow: hidden;
        transition: var(--transition-all);
        animation: slideInUp 0.6s ease-out forwards;
        opacity: 0;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .certification-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px rgba(var(--color-primary-rgb), 0.3);
    }

    .certification-card:hover .cert-glow {
        opacity: 1;
    }

    .certification-card:hover .particle {
        animation-play-state: running;
    }

    /* Certification Badge */
    .cert-badge {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: var(--space-4);
    }

    .badge-ring {
        width: 80px;
        height: 80px;
        background: conic-gradient(from 0deg, var(--color-primary), var(--color-accent), var(--color-primary));
        border-radius: var(--radius-full);
        padding: 3px;
        position: relative;
        animation: rotate 10s linear infinite;
    }

    .badge-inner {
        width: 100%;
        height: 100%;
        background: var(--color-bg-dark);
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cert-icon {
        font-size: var(--font-size-2xl);
    }

    .cert-level-badge {
        position: absolute;
        bottom: -8px;
        right: -8px;
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-full);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-bold);
        text-transform: uppercase;
        border: 2px solid var(--color-bg-dark);
    }

    .cert-level-badge.level-beginner {
        background: #4CAF50;
        color: white;
    }

    .cert-level-badge.level-intermediate {
        background: #FF9800;
        color: white;
    }

    .cert-level-badge.level-advanced {
        background: #2196F3;
        color: white;
    }

    .cert-level-badge.level-expert,
    .cert-level-badge.level-certified {
        background: #9C27B0;
        color: white;
    }

    /* Content */
    .cert-content {
        position: relative;
        z-index: 2;
    }

    .cert-header {
        margin-bottom: var(--space-4);
    }

    .cert-title {
        color: var(--color-white);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        margin: 0 0 var(--space-2) 0;
        line-height: var(--line-height-tight);
    }

    .cert-issuer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .issuer-name {
        color: var(--color-primary);
        font-weight: var(--font-weight-semibold);
    }

    .issuer-verified {
        display: flex;
        align-items: center;
        gap: var(--space-1);
        color: var(--color-success);
        font-size: var(--font-size-xs);
    }

    .cert-meta {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        margin-bottom: var(--space-4);
    }

    .cert-date,
    .cert-validity,
    .cert-permanent {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
    }

    .cert-permanent {
        color: var(--color-success);
    }

    /* Skills */
    .cert-skills {
        margin-bottom: var(--space-4);
    }

    .skills-title {
        color: var(--color-white);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        margin: 0 0 var(--space-2) 0;
    }

    .skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-1);
    }

    .skill-tag {
        background: rgba(var(--color-accent-rgb), 0.1);
        color: var(--color-accent);
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-xs);
        font-family: var(--font-mono);
        border: 1px solid rgba(var(--color-accent-rgb), 0.2);
    }

    /* Actions */
    .cert-actions {
        display: flex;
        gap: var(--space-2);
    }

    .action-button {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-2);
        padding: var(--space-2) var(--space-3);
        border-radius: var(--radius-md);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        transition: var(--transition-all);
        cursor: pointer;
    }

    .view-cert {
        background: rgba(var(--color-primary-rgb), 0.1);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        color: var(--color-primary);
    }

    .view-cert:hover {
        background: rgba(var(--color-primary-rgb), 0.2);
        transform: translateY(-1px);
    }

    .verify-cert {
        background: rgba(var(--color-success-rgb), 0.1);
        border: 1px solid rgba(var(--color-success-rgb), 0.3);
        color: var(--color-success);
    }

    .verify-cert:hover {
        background: rgba(var(--color-success-rgb), 0.2);
        transform: translateY(-1px);
    }

    /* Effects */
    .cert-glow {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center,
                rgba(var(--color-primary-rgb), 0.2),
                transparent 70%);
        border-radius: var(--radius-xl);
        opacity: 0;
        transition: var(--transition-opacity);
    }

    .cert-particles {
        position: absolute;
        inset: 0;
        pointer-events: none;
    }

    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--color-primary);
        border-radius: var(--radius-full);
        animation: float 6s ease-in-out infinite;
        animation-play-state: paused;
    }

    .particle:nth-child(1) {
        top: 20%;
        left: 10%;
        animation-delay: 0s;
    }

    .particle:nth-child(2) {
        top: 40%;
        right: 15%;
        animation-delay: 1s;
    }

    .particle:nth-child(3) {
        bottom: 30%;
        left: 20%;
        animation-delay: 2s;
    }

    .particle:nth-child(4) {
        bottom: 20%;
        right: 25%;
        animation-delay: 3s;
    }

    .particle:nth-child(5) {
        top: 60%;
        left: 50%;
        animation-delay: 4s;
    }

    .particle:nth-child(6) {
        top: 80%;
        right: 40%;
        animation-delay: 5s;
    }

    @keyframes float {

        0%,
        100% {
            transform: translateY(0px) scale(1);
            opacity: 0.7;
        }

        50% {
            transform: translateY(-10px) scale(1.2);
            opacity: 1;
        }
    }

    @keyframes rotate {
        to {
            transform: rotate(360deg);
        }
    }

    /* Timeline */
    .achievement-timeline {
        margin-bottom: var(--space-8);
        padding: var(--space-6);
        background: rgba(var(--color-bg-dark-rgb), 0.5);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-lg);
    }

    .timeline-title {
        color: var(--color-white);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        margin: 0 0 var(--space-4) 0;
        text-align: center;
    }

    .timeline-track {
        position: relative;
        height: 60px;
        background: linear-gradient(to right,
                rgba(var(--color-primary-rgb), 0.1),
                rgba(var(--color-primary-rgb), 0.3),
                rgba(var(--color-primary-rgb), 0.1));
        border-radius: var(--radius-full);
        margin: var(--space-4) 0;
    }

    .timeline-item {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .timeline-marker {
        width: 40px;
        height: 40px;
        background: var(--color-bg-dark);
        border: 3px solid var(--color-primary);
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-lg);
        cursor: pointer;
        transition: var(--transition-all);
    }

    .timeline-marker:hover {
        transform: scale(1.1);
        box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.5);
    }

    .timeline-tooltip {
        position: absolute;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(var(--color-bg-dark-rgb), 0.95);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-md);
        padding: var(--space-2) var(--space-3);
        white-space: nowrap;
        font-size: var(--font-size-xs);
        opacity: 0;
        pointer-events: none;
        transition: var(--transition-opacity);
    }

    .timeline-marker:hover+.timeline-tooltip,
    .timeline-marker:hover~.timeline-tooltip,
    .timeline-item:hover .timeline-tooltip {
        opacity: 1;
    }

    .timeline-tooltip strong {
        color: var(--color-white);
        display: block;
    }

    .timeline-tooltip span {
        color: var(--color-text-muted);
    }

    .timeline-labels {
        display: flex;
        justify-content: space-between;
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
        font-family: var(--font-mono);
    }

    /* Statistics */
    .cert-statistics {
        display: flex;
        justify-content: center;
        gap: var(--space-6);
    }

    .stat-item {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        background: rgba(var(--color-surface-dark-rgb), 0.8);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-lg);
        padding: var(--space-4);
        transition: var(--transition-all);
    }

    .stat-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.3);
    }

    .stat-icon {
        color: var(--color-primary);
        font-size: var(--font-size-xl);
    }

    .stat-number {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-white);
        font-family: var(--font-mono);
    }

    .stat-label {
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
    }

    /* Responsive */
    @media (max-width: 768px) {
        .showcase-header {
            flex-direction: column;
            text-align: center;
            gap: var(--space-4);
        }

        .certifications-grid {
            grid-template-columns: 1fr;
        }

        .cert-statistics {
            flex-direction: column;
            align-items: center;
        }

        .timeline-track {
            margin: var(--space-6) 0;
        }
    }

    @media (max-width: 480px) {
        .certification-card {
            padding: var(--space-4);
        }

        .badge-ring {
            width: 60px;
            height: 60px;
        }

        .cert-actions {
            flex-direction: column;
        }
    }
</style>