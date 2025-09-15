<template>
    <div class="certification-showcase">
        <!-- Terminal Header -->
        <div class="terminal-header">
            <div class="terminal-controls">
                <span class="control control--close"></span>
                <span class="control control--minimize"></span>
                <span class="control control--maximize"></span>
            </div>
            <div class="terminal-title">certifications@portfolio:~$</div>
        </div>

        <!-- Command Line Interface -->
        <div class="terminal-body">
            <div class="terminal-line">
                <span class="prompt">$</span>
                <span class="command">ls -la certifications/</span>
            </div>
            <div class="terminal-output">
                <div class="cert-stats">
                    <span class="stat-item">total {{ certifications.length }} certificates</span>
                    <span class="stat-item">{{ uniqueIssuers.length }} institutions</span>
                    <span class="stat-item">{{ recentCertifications }} this year</span>
                </div>
            </div>
            <div class="terminal-line">
                <span class="prompt">$</span>
                <span class="command typing">cat certifications.json</span>
                <span class="cursor">_</span>
            </div>
        </div>

        <!-- Certifications Matrix -->
        <div class="certifications-matrix">
            <div v-for="(cert, index) in certifications" :key="cert.id" class="cert-terminal"
                :style="{ animationDelay: `${index * 0.1}s` }">
                <!-- Terminal Window -->
                <div class="cert-window">
                    <div class="cert-window-header">
                        <div class="window-controls">
                            <span class="control control--close"></span>
                            <span class="control control--minimize"></span>
                            <span class="control control--maximize"></span>
                        </div>
                        <div class="window-title">{{ cert.id }}.cert</div>
                        <div class="window-status">
                            <span class="status-dot" :class="cert.expires ? 'status-warning' : 'status-active'"></span>
                            <span class="status-text">{{ cert.expires ? 'expires' : 'permanent' }}</span>
                        </div>
                    </div>

                    <div class="cert-window-body">
                        <!-- Certificate Header with Tech Icons -->
                        <div class="cert-header">
                            <div class="cert-icon-container">
                                <div class="icon-matrix">
                                    <div class="icon-grid">
                                        <Icon :icon="cert.icon" class="cert-icon" :style="{ color: cert.color }" />

                                        <div class="grid-dot" v-for="i in 9" :key="i"></div>
                                    </div>
                                </div>
                                <div class="cert-level-indicator">
                                    <div class="level-bar" :class="`level-${cert.level.toLowerCase()}`">
                                        <span class="level-text">{{ cert.level.toUpperCase() }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Certificate Data -->
                        <div class="cert-data">
                            <div class="data-line">
                                <span class="data-key">"title":</span>
                                <span class="data-value">"{{ cert.title }}"</span>
                            </div>
                            <div class="data-line">
                                <span class="data-key">"issuer":</span>
                                <span class="data-value">"{{ cert.issuer }}"</span>
                                <Icon icon="mdi:check-decagram" class="verified-icon" />
                            </div>
                            <div class="data-line">
                                <span class="data-key">"issued":</span>
                                <span class="data-value">"{{ formatDate(cert.date) }}"</span>
                            </div>
                            <div class="data-line" v-if="cert.expires">
                                <span class="data-key">"expires":</span>
                                <span class="data-value data-warning">"{{ formatDate(cert.expires) }}"</span>
                            </div>
                        </div>

                        <!-- Skills Matrix -->
                        <div class="skills-matrix" v-if="cert.skills">
                            <div class="matrix-header">
                                <span class="matrix-label">[SKILLS_ARRAY]</span>
                            </div>
                            <div class="skills-grid">
                                <div v-for="(skill, skillIndex) in cert.skills" :key="skill" class="skill-chip"
                                    :style="{ animationDelay: `${skillIndex * 0.1}s` }">
                                    <span class="skill-index">[{{ skillIndex }}]</span>
                                    <span class="skill-name">{{ skill }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Action Commands -->
                        <div class="cert-commands">
                            <button class="command-button" @click="viewCertificate(cert)" v-if="cert.credentialUrl">
                                <Icon icon="mdi:console-line" />
                                <span>./view-certificate.sh</span>
                            </button>
                            <button class="command-button verify-cmd" @click="verifyCertificate(cert)"
                                v-if="cert.verificationId">
                                <Icon icon="mdi:shield-check" />
                                <span>./verify.sh {{ cert.verificationId }}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Matrix Rain Effect -->
                <div class="matrix-rain">
                    <div class="rain-column" v-for="i in 3" :key="i"></div>
                </div>
            </div>
        </div>

        <!-- Timeline Console -->
        <div class="timeline-console">
            <div class="console-header">
                <Icon icon="mdi:timeline" />
                <span>Certification Timeline</span>
            </div>
            <div class="timeline-matrix">
                <div v-for="(cert, index) in sortedCertifications" :key="cert.id" class="timeline-entry"
                    :style="{ left: `${getTimelinePosition(cert.date)}%` }">
                    <div class="timeline-node">
                        <Icon :icon="cert.icon" :style="{ color: cert.color }" />
                    </div>
                    <div class="timeline-data">
                        <div class="data-title">{{ cert.title }}</div>
                        <div class="data-timestamp">{{ cert.date }}</div>
                    </div>
                </div>
            </div>
            <div class="timeline-axis">
                <span class="axis-label">{{ earliestYear }}</span>
                <span class="axis-label">{{ currentYear }}</span>
            </div>
        </div>

        <!-- System Stats -->
        <div class="system-stats">
            <div class="stat-terminal">
                <div class="stat-content">
                    <Icon icon="mdi:trending-up" class="stat-icon" />
                    <div class="stat-info">
                        <span class="stat-number">{{ certificationsByLevel.advanced + certificationsByLevel.expert
                            }}</span>
                        <span class="stat-label">ADVANCED+</span>
                    </div>
                </div>
            </div>
            <div class="stat-terminal">
                <div class="stat-content">
                    <Icon icon="mdi:school" class="stat-icon" />
                    <div class="stat-info">
                        <span class="stat-number">{{ uniqueIssuers.length }}</span>
                        <span class="stat-label">INSTITUTIONS</span>
                    </div>
                </div>
            </div>
            <div class="stat-terminal">
                <div class="stat-content">
                    <Icon icon="mdi:calendar-check" class="stat-icon" />
                    <div class="stat-info">
                        <span class="stat-number">{{ recentCertifications }}</span>
                        <span class="stat-label">THIS_YEAR</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import { Icon } from '@iconify/vue'
    import type { Certification } from "@/interfaces/skills"

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
        overflow: hidden;
        backdrop-filter: blur(var(--blur-md));
        font-family: var(--font-mono);
    }

    /* Terminal Header */
    .terminal-header {
        background: rgba(var(--color-bg-dark-rgb), 0.9);
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

    /* Terminal Body */
    .terminal-body {
        padding: var(--space-6);
        border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.1);
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
        animation: typewriter 3s steps(20) infinite;
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
        margin: var(--space-3) 0;
        padding-left: var(--space-6);
    }

    .cert-stats {
        display: flex;
        gap: var(--space-4);
        flex-wrap: wrap;
    }

    .stat-item {
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
        background: rgba(var(--color-primary-rgb), 0.1);
        padding: var(--space-1) var(--space-3);
        border-radius: var(--radius-sm);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
    }

    /* Certifications Matrix */
    .certifications-matrix {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: var(--space-6);
        padding: var(--space-8);
    }

    .cert-terminal {
        position: relative;
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

    /* Certificate Window */
    .cert-window {
        background: linear-gradient(135deg,
                rgba(var(--color-bg-dark-rgb), 0.95),
                rgba(var(--color-surface-dark-rgb), 0.8));
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-lg);
        overflow: hidden;
        transition: var(--transition-all);
        position: relative;
    }

    .cert-window:hover {
        transform: translateY(-4px);
        box-shadow: 0 0 30px rgba(var(--color-primary-rgb), 0.3);
        border-color: var(--color-primary);
    }

    .cert-window-header {
        background: rgba(var(--color-bg-dark-rgb), 0.8);
        padding: var(--space-3) var(--space-4);
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.2);
    }

    .window-controls {
        display: flex;
        gap: var(--space-2);
    }

    .window-title {
        color: var(--color-accent);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
    }

    .window-status {
        display: flex;
        align-items: center;
        gap: var(--space-2);
    }

    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: var(--radius-full);
        animation: pulse 2s infinite;
    }

    .status-active {
        background: var(--color-success);
    }

    .status-warning {
        background: var(--color-warning);
    }

    .status-text {
        color: var(--color-text-muted);
        font-size: var(--font-size-xs);
        text-transform: uppercase;
    }

    /* Certificate Body */
    .cert-window-body {
        padding: var(--space-6);
    }

    .cert-header {
        margin-bottom: var(--space-6);
    }

    .cert-icon-container {
        display: flex;
        align-items: center;
        gap: var(--space-4);
    }

    .icon-matrix {
        position: relative;
        width: 60px;
        height: 60px;
    }

    .cert-icon {
        font-size: var(--font-size-3xl);
        position: relative;
        z-index: 2;
    }

    .icon-grid {
        position: absolute;
        inset: 0;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2px;
        opacity: 0.3;
    }

    .grid-dot {
        background: var(--color-primary);
        border-radius: var(--radius-full);
        animation: gridPulse 3s ease-in-out infinite;
    }

    .grid-dot:nth-child(odd) {
        animation-delay: 0.5s;
    }

    .grid-dot:nth-child(even) {
        animation-delay: 1s;
    }

    @keyframes gridPulse {

        0%,
        100% {
            opacity: 0.2;
            transform: scale(0.8);
        }

        50% {
            opacity: 0.8;
            transform: scale(1.2);
        }
    }

    .cert-level-indicator {
        flex: 1;
    }

    .level-bar {
        width: 100%;
        height: 8px;
        border-radius: var(--radius-full);
        position: relative;
        overflow: hidden;
    }

    .level-beginner {
        background: linear-gradient(90deg, #4CAF50, #8BC34A);
    }

    .level-intermediate {
        background: linear-gradient(90deg, #FF9800, #FFC107);
    }

    .level-advanced {
        background: linear-gradient(90deg, #2196F3, #03DAC6);
    }

    .level-expert,
    .level-certified {
        background: linear-gradient(90deg, #9C27B0, #E91E63);
    }

    .level-text {
        position: absolute;
        top: -20px;
        right: 0;
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-bold);
        color: var(--color-primary);
    }

    /* Certificate Data */
    .cert-data {
        margin-bottom: var(--space-6);
    }

    .data-line {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        margin-bottom: var(--space-2);
        font-size: var(--font-size-sm);
    }

    .data-key {
        color: var(--color-accent);
        min-width: 80px;
    }

    .data-value {
        color: var(--color-white);
        flex: 1;
    }

    .data-warning {
        color: var(--color-warning);
    }

    .verified-icon {
        color: var(--color-success);
        font-size: var(--font-size-sm);
    }

    /* Skills Matrix */
    .skills-matrix {
        margin-bottom: var(--space-6);
    }

    .matrix-header {
        margin-bottom: var(--space-3);
    }

    .matrix-label {
        color: var(--color-primary);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-bold);
    }

    .skills-grid {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
    }

    .skill-chip {
        background: rgba(var(--color-primary-rgb), 0.1);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-sm);
        padding: var(--space-1) var(--space-2);
        display: flex;
        align-items: center;
        gap: var(--space-1);
        transition: var(--transition-all);
        animation: chipFadeIn 0.5s ease-out forwards;
        opacity: 0;
    }

    @keyframes chipFadeIn {
        to {
            opacity: 1;
        }
    }

    .skill-chip:hover {
        background: rgba(var(--color-primary-rgb), 0.2);
        transform: translateY(-1px);
    }

    .skill-index {
        color: var(--color-accent);
        font-size: var(--font-size-xs);
    }

    .skill-name {
        color: var(--color-white);
        font-size: var(--font-size-xs);
    }

    /* Commands */
    .cert-commands {
        display: flex;
        gap: var(--space-3);
    }

    .command-button {
        flex: 1;
        display: flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-2) var(--space-4);
        background: rgba(var(--color-primary-rgb), 0.1);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-md);
        color: var(--color-primary);
        font-size: var(--font-size-sm);
        font-family: var(--font-mono);
        cursor: pointer;
        transition: var(--transition-all);
    }

    .command-button:hover {
        background: rgba(var(--color-primary-rgb), 0.2);
        transform: translateY(-1px);
        box-shadow: 0 0 10px rgba(var(--color-primary-rgb), 0.3);
    }

    .verify-cmd {
        background: rgba(var(--color-success-rgb), 0.1);
        border-color: rgba(var(--color-success-rgb), 0.3);
        color: var(--color-success);
    }

    .verify-cmd:hover {
        background: rgba(var(--color-success-rgb), 0.2);
        box-shadow: 0 0 10px rgba(var(--color-success-rgb), 0.3);
    }

    /* Matrix Rain Effect */
    .matrix-rain {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        opacity: 0;
        transition: var(--transition-opacity);
    }

    .cert-window:hover .matrix-rain {
        opacity: 0.1;
    }

    .rain-column {
        position: absolute;
        top: -100%;
        width: 2px;
        height: 100%;
        background: linear-gradient(to bottom,
                transparent,
                var(--color-primary),
                transparent);
        animation: matrixRain 3s linear infinite;
    }

    .rain-column:nth-child(1) {
        left: 20%;
        animation-delay: 0s;
    }

    .rain-column:nth-child(2) {
        left: 50%;
        animation-delay: 1s;
    }

    .rain-column:nth-child(3) {
        left: 80%;
        animation-delay: 2s;
    }

    @keyframes matrixRain {
        0% {
            transform: translateY(0);
        }

        100% {
            transform: translateY(200%);
        }
    }

    /* Timeline Console */
    .timeline-console {
        margin: var(--space-8);
        background: rgba(var(--color-bg-dark-rgb), 0.8);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
    }

    .console-header {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--color-primary);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-4);
    }

    .timeline-matrix {
        position: relative;
        height: 60px;
        background: linear-gradient(90deg,
                rgba(var(--color-primary-rgb), 0.1),
                rgba(var(--color-primary-rgb), 0.3),
                rgba(var(--color-primary-rgb), 0.1));
        border-radius: var(--radius-sm);
        margin-bottom: var(--space-4);
    }

    .timeline-entry {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .timeline-node {
        width: 32px;
        height: 32px;
        background: var(--color-bg-dark);
        border: 2px solid var(--color-primary);
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-sm);
        cursor: pointer;
        transition: var(--transition-all);
    }

    .timeline-node:hover {
        transform: scale(1.1);
        box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.5);
    }

    .timeline-data {
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        opacity: 0;
        transition: var(--transition-opacity);
        pointer-events: none;
    }

    .timeline-entry:hover .timeline-data {
        opacity: 1;
    }

    .data-title {
        color: var(--color-white);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-bold);
        white-space: nowrap;
    }

    .data-timestamp {
        color: var(--color-text-muted);
        font-size: var(--font-size-xs);
    }

    .timeline-axis {
        display: flex;
        justify-content: space-between;
    }

    .axis-label {
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
    }

    /* System Stats */
    .system-stats {
        display: flex;
        justify-content: center;
        gap: var(--space-6);
        padding: var(--space-8);
        border-top: 1px solid rgba(var(--color-primary-rgb), 0.1);
    }

    .stat-terminal {
        background: rgba(var(--color-bg-dark-rgb), 0.8);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-md);
        padding: var(--space-4);
        transition: var(--transition-all);
    }

    .stat-terminal:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.3);
    }

    .stat-content {
        display: flex;
        align-items: center;
        gap: var(--space-3);
    }

    .stat-icon {
        color: var(--color-primary);
        font-size: var(--font-size-xl);
    }

    .stat-number {
        color: var(--color-white);
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        font-family: var(--font-mono);
    }

    .stat-label {
        color: var(--color-text-muted);
        font-size: var(--font-size-xs);
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    /* Animations */
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

    @keyframes pulse {

        0%,
        100% {
            opacity: 1;
        }

        50% {
            opacity: 0.5;
        }
    }

    /* Responsive */
    @media (max-width: 768px) {
        .certifications-matrix {
            grid-template-columns: 1fr;
            padding: var(--space-4);
        }

        .system-stats {
            flex-direction: column;
            align-items: center;
        }

        .timeline-console {
            margin: var(--space-4);
        }
    }

    @media (max-width: 480px) {
        .cert-commands {
            flex-direction: column;
        }

        .cert-stats {
            flex-direction: column;
        }
    }
</style>