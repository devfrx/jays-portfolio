<template>
    <div class="work-experience-showcase">
        <!-- Terminal Header -->
        <div class="terminal-header">
            <div class="terminal-controls">
                <span class="control control--close"></span>
                <span class="control control--minimize"></span>
                <span class="control control--maximize"></span>
            </div>
            <div class="terminal-title">work-history@portfolio:~$</div>
        </div>

        <!-- Command Interface -->
        <div class="terminal-body">
            <div class="terminal-line">
                <span class="prompt">$</span>
                <span class="command">cat career.log --follow</span>
            </div>
            <div class="terminal-output">
                <div class="career-stats">
                    <span class="stat-item">{{ workExperience.length }} positions</span>
                    <span class="stat-item">{{ totalYearsExperience }}+ years total</span>
                    <span class="stat-item">{{ uniqueCompanies.length }} companies</span>
                </div>
            </div>
            <div class="terminal-line">
                <span class="prompt">$</span>
                <span class="command typing">tail -f experience.stream</span>
                <span class="cursor">_</span>
            </div>
        </div>

        <!-- Experience Timeline -->
        <div class="experience-matrix">
            <div class="timeline-track">
                <div class="track-line"></div>
                <div v-for="(job, index) in workExperience" :key="job.company" class="experience-node" :style="{
                    top: `${(index / (workExperience.length - 1)) * 100}%`,
                    animationDelay: `${index * 0.2}s`
                }">
                    <!-- Timeline Marker -->
                    <div class="node-marker">
                        <div class="marker-ring">
                            <div class="marker-core"></div>
                            <div class="marker-pulse"></div>
                        </div>
                        <div class="node-connector" v-if="index !== workExperience.length - 1"></div>
                    </div>

                    <!-- Experience Terminal -->
                    <div class="experience-terminal">
                        <div class="terminal-window-header">
                            <div class="window-controls">
                                <span class="control control--close"></span>
                                <span class="control control--minimize"></span>
                                <span class="control control--maximize"></span>
                            </div>
                            <div class="window-title">{{ job.company.toLowerCase().replace(/\s+/g, '-') }}.exp</div>
                            <div class="window-status">
                                <div class="status-indicator" :class="getJobStatus(job.period)"></div>
                                <span class="status-text">{{ getStatusText(job.period) }}</span>
                            </div>
                        </div>

                        <div class="terminal-content">
                            <!-- Job Header -->
                            <div class="job-header">
                                <div class="job-title-section">
                                    <h3 class="job-title">{{ job.title }}</h3>
                                    <div class="job-meta">
                                        <span class="company-name">{{ job.company }}</span>
                                        <div class="job-badges">
                                            <span class="job-type-badge"
                                                :class="`type-${job.type.toLowerCase().replace(/\s+/g, '-')}`">
                                                {{ job.type }}
                                            </span>
                                            <span class="period-badge">{{ job.period }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Job Console Output -->
                            <div class="job-console">
                                <div class="console-line">
                                    <span class="console-prompt">job@{{ job.company.toLowerCase().replace(/\s+/g, '')
                                    }}:~$</span>
                                    <span class="console-command">cat job-description.txt</span>
                                </div>
                                <div class="console-output">
                                    <p class="job-description">{{ job.description }}</p>
                                </div>
                            </div>

                            <!-- Achievements Matrix -->
                            <div class="achievements-matrix" v-if="job.achievements">
                                <div class="matrix-header">
                                    <Icon icon="mdi:trophy" />
                                    <span class="matrix-label">[ACHIEVEMENTS]</span>
                                </div>
                                <div class="achievements-list">
                                    <div v-for="(achievement, achIndex) in job.achievements" :key="achIndex"
                                        class="achievement-item" :style="{ animationDelay: `${achIndex * 0.1}s` }">
                                        <div class="achievement-marker">
                                            <Icon icon="mdi:check-circle" />
                                        </div>
                                        <span class="achievement-text">{{ achievement }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Tech Stack Matrix -->
                            <div class="tech-stack-matrix">
                                <div class="matrix-header">
                                    <Icon icon="mdi:code-tags" />
                                    <span class="matrix-label">[TECH_STACK]</span>
                                </div>
                                <div class="tech-grid">
                                    <div v-for="(tech, techIndex) in job.technologies" :key="tech" class="tech-chip"
                                        :style="{ animationDelay: `${techIndex * 0.05}s` }">
                                        <span class="tech-index">[{{ techIndex }}]</span>
                                        <span class="tech-name">{{ tech }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Terminal Effects -->
                        <div class="terminal-effects">
                            <div class="scan-line"></div>
                            <div class="data-flow">
                                <div class="flow-particle" v-for="n in 4" :key="n"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Career Analytics -->
        <div class="career-analytics">
            <div class="analytics-header">
                <Icon icon="mdi:chart-timeline-variant" />
                <span>Career Analytics</span>
            </div>
            <div class="analytics-grid">
                <div class="metric-card">
                    <div class="metric-icon">
                        <Icon icon="mdi:briefcase" />
                    </div>
                    <div class="metric-info">
                        <span class="metric-value">{{ workExperience.length }}</span>
                        <span class="metric-label">POSITIONS</span>
                    </div>
                    <div class="metric-chart">
                        <div class="chart-line"></div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon">
                        <Icon icon="mdi:trending-up" />
                    </div>
                    <div class="metric-info">
                        <span class="metric-value">{{ totalYearsExperience }}+</span>
                        <span class="metric-label">YEARS_EXP</span>
                    </div>
                    <div class="metric-progress">
                        <div class="progress-bar" :style="{ width: `${(totalYearsExperience / 10) * 100}%` }"></div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon">
                        <Icon icon="mdi:code-array" />
                    </div>
                    <div class="metric-info">
                        <span class="metric-value">{{ totalTechnologies }}</span>
                        <span class="metric-label">TECHNOLOGIES</span>
                    </div>
                    <div class="metric-dots">
                        <div class="dot" v-for="n in Math.min(totalTechnologies, 10)" :key="n"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import { Icon } from '@iconify/vue'
    import type { WorkExperience } from '@/interfaces/projects'

    interface Props {
        workExperience: WorkExperience[]
    }

    const props = defineProps<Props>()

    // Computed properties
    const uniqueCompanies = computed(() => {
        return [...new Set(props.workExperience.map(job => job.company))]
    })

    const totalYearsExperience = computed(() => {
        // Simple calculation based on periods
        let totalYears = 0
        props.workExperience.forEach(job => {
            const period = job.period
            const yearMatch = period.match(/(\d{4})\s*-\s*(\d{4}|Present)/i)
            if (yearMatch) {
                const startYear = parseInt(yearMatch[1])
                const endYear = yearMatch[2] === 'Present' ? new Date().getFullYear() : parseInt(yearMatch[2])
                totalYears += endYear - startYear
            }
        })
        return Math.max(totalYears, 1) // At least 1 year
    })

    const totalTechnologies = computed(() => {
        const allTech = new Set()
        props.workExperience.forEach(job => {
            job.technologies.forEach(tech => allTech.add(tech))
        })
        return allTech.size
    })

    // Methods
    const getJobStatus = (period: string): string => {
        return period.toLowerCase().includes('present') ? 'status-active' : 'status-completed'
    }

    const getStatusText = (period: string): string => {
        return period.toLowerCase().includes('present') ? 'ACTIVE' : 'COMPLETED'
    }
</script>

<style scoped>
    .work-experience-showcase {
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

    .career-stats {
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

    /* Experience Matrix */
    .experience-matrix {
        padding: var(--space-16);
        position: relative;
        overflow-y: scroll;
    }

    .timeline-track {
        position: relative;
        min-height: 600px;
    }

    .track-line {
        position: absolute;
        left: 40px;
        top: 0;
        bottom: 0;
        width: 3px;
        background: linear-gradient(to bottom,
                var(--color-primary),
                rgba(var(--color-primary-rgb), 0.5),
                transparent);
    }

    .experience-node {
        position: absolute;
        left: 0;
        right: 0;
        display: flex;
        gap: var(--space-6);
        margin-bottom: var(--space-8);
        animation: slideInMatrix 0.8s ease-out forwards;
        opacity: 0;
    }

    @keyframes slideInMatrix {
        from {
            opacity: 0;
            transform: translateX(-40px);
        }

        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    /* Timeline Marker */
    .node-marker {
        position: relative;
        flex-shrink: 0;
        z-index: 2;
    }

    .marker-ring {
        width: 80px;
        height: 80px;
        border-radius: var(--radius-full);
        background: var(--color-bg-dark);
        border: 3px solid var(--color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.3);
    }

    .marker-core {
        width: 20px;
        height: 20px;
        background: var(--color-primary);
        border-radius: var(--radius-full);
        animation: pulse 2s infinite;
    }

    .marker-pulse {
        position: absolute;
        inset: -10px;
        border: 2px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-full);
        animation: ringPulse 3s infinite;
    }

    @keyframes ringPulse {
        0% {
            transform: scale(0.8);
            opacity: 1;
        }

        100% {
            transform: scale(1.4);
            opacity: 0;
        }
    }

    /* .node-connector {
        position: absolute;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 120px;
        background: linear-gradient(to bottom, var(--color-primary), transparent);
    } */

    /* Experience Terminal */
    .experience-terminal {
        flex: 1;
        background: linear-gradient(135deg,
                rgba(var(--color-bg-dark-rgb), 0.95),
                rgba(var(--color-surface-dark-rgb), 0.8));
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-lg);
        overflow: hidden;
        position: relative;
        transition: var(--transition-all);
    }

    .experience-terminal:hover {
        transform: translateY(-4px);
        box-shadow: 0 0 30px rgba(var(--color-primary-rgb), 0.3);
        border-color: var(--color-primary);
    }

    .terminal-window-header {
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

    .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: var(--radius-full);
        animation: pulse 2s infinite;
    }

    .status-active {
        background: var(--color-success);
    }

    .status-completed {
        background: var(--color-info);
    }

    .status-text {
        color: var(--color-text-muted);
        font-size: var(--font-size-xs);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    /* Terminal Content */
    .terminal-content {
        padding: var(--space-6);
    }

    .job-header {
        margin-bottom: var(--space-6);
    }

    .job-title {
        color: var(--color-white);
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-2);
    }

    .job-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--space-2);
    }

    .company-name {
        color: var(--color-primary);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
    }

    .job-badges {
        display: flex;
        gap: var(--space-2);
        align-items: center;
    }

    .job-type-badge {
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-bold);
        text-transform: uppercase;
    }

    .type-full-time {
        background: rgba(var(--color-success-rgb), 0.1);
        color: var(--color-success);
    }

    .type-part-time {
        background: rgba(var(--color-warning-rgb), 0.1);
        color: var(--color-warning);
    }

    .type-contract {
        background: rgba(var(--color-info-rgb), 0.1);
        color: var(--color-info);
    }

    .type-freelance {
        background: rgba(var(--color-accent-rgb), 0.1);
        color: var(--color-accent);
    }

    .period-badge {
        background: rgba(var(--color-primary-rgb), 0.1);
        color: var(--color-primary);
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-xs);
        font-family: var(--font-mono);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
    }

    /* Job Console */
    .job-console {
        margin-bottom: var(--space-6);
        background: rgba(var(--color-bg-dark-rgb), 0.5);
        border: 1px solid rgba(var(--color-primary-rgb), 0.1);
        border-radius: var(--radius-md);
        padding: var(--space-4);
    }

    .console-line {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        margin-bottom: var(--space-2);
    }

    .console-prompt {
        color: var(--color-primary);
        font-size: var(--font-size-xs);
    }

    .console-command {
        color: var(--color-accent);
        font-size: var(--font-size-xs);
    }

    .console-output {
        padding-left: var(--space-4);
    }

    .job-description {
        color: var(--color-text-muted);
        line-height: var(--line-height-relaxed);
        margin: 0;
    }

    /* Matrices */
    .achievements-matrix,
    .tech-stack-matrix {
        margin-bottom: var(--space-4);
    }

    .matrix-header {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        margin-bottom: var(--space-3);
        color: var(--color-primary);
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-sm);
    }

    .achievements-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
    }

    .achievement-item {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-2);
        background: rgba(var(--color-success-rgb), 0.05);
        border: 1px solid rgba(var(--color-success-rgb), 0.1);
        border-radius: var(--radius-sm);
        animation: achievementPop 0.5s ease-out forwards;
        opacity: 0;
    }

    @keyframes achievementPop {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }

        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .achievement-marker {
        color: var(--color-success);
        font-size: var(--font-size-sm);
    }

    .achievement-text {
        color: var(--color-white);
        font-size: var(--font-size-sm);
        flex: 1;
    }

    /* Tech Grid */
    .tech-grid {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
    }

    .tech-chip {
        background: rgba(var(--color-primary-rgb), 0.1);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-sm);
        padding: var(--space-1) var(--space-2);
        display: flex;
        align-items: center;
        gap: var(--space-1);
        transition: var(--transition-all);
        animation: techChipFade 0.5s ease-out forwards;
        opacity: 0;
    }

    @keyframes techChipFade {
        to {
            opacity: 1;
        }
    }

    .tech-chip:hover {
        background: rgba(var(--color-primary-rgb), 0.2);
        transform: translateY(-1px);
    }

    .tech-index {
        color: var(--color-accent);
        font-size: var(--font-size-xs);
    }

    .tech-name {
        color: var(--color-white);
        font-size: var(--font-size-xs);
    }

    /* Terminal Effects */
    .terminal-effects {
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0;
        transition: var(--transition-opacity);
    }

    .experience-terminal:hover .terminal-effects {
        opacity: 0.3;
    }

    .scan-line {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
        animation: scanMove 3s linear infinite;
    }

    @keyframes scanMove {
        0% {
            transform: translateY(0);
        }

        100% {
            transform: translateY(300px);
        }
    }

    .data-flow {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 2px;
    }

    .flow-particle {
        position: absolute;
        width: 100%;
        height: 4px;
        background: var(--color-accent);
        animation: flowDown 2s linear infinite;
    }

    .flow-particle:nth-child(1) {
        animation-delay: 0s;
    }

    .flow-particle:nth-child(2) {
        animation-delay: 0.5s;
    }

    .flow-particle:nth-child(3) {
        animation-delay: 1s;
    }

    .flow-particle:nth-child(4) {
        animation-delay: 1.5s;
    }

    @keyframes flowDown {
        0% {
            transform: translateY(-100px);
            opacity: 0;
        }

        10% {
            opacity: 1;
        }

        90% {
            opacity: 1;
        }

        100% {
            transform: translateY(300px);
            opacity: 0;
        }
    }

    /* Career Analytics */
    .career-analytics {
        background: rgba(var(--color-bg-dark-rgb), 0.8);
        border-top: 1px solid rgba(var(--color-primary-rgb), 0.2);
        padding: var(--space-6);
    }

    .analytics-header {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--color-primary);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--space-4);
    }

    .analytics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--space-4);
    }

    .metric-card {
        background: rgba(var(--color-surface-dark-rgb), 0.8);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-md);
        padding: var(--space-4);
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        transition: var(--transition-all);
    }

    .metric-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.3);
    }

    .metric-icon {
        color: var(--color-primary);
        font-size: var(--font-size-xl);
        align-self: flex-start;
    }

    .metric-info {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
    }

    .metric-value {
        color: var(--color-white);
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        font-family: var(--font-mono);
    }

    .metric-label {
        color: var(--color-text-muted);
        font-size: var(--font-size-xs);
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .metric-chart {
        height: 20px;
        position: relative;
    }

    .chart-line {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--color-primary);
        animation: chartGrow 2s ease-out;
    }

    @keyframes chartGrow {
        from {
            width: 0;
        }

        to {
            width: 100%;
        }
    }

    .metric-progress {
        height: 6px;
        background: rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-full);
        overflow: hidden;
    }

    .progress-bar {
        height: 100%;
        background: var(--color-primary);
        border-radius: var(--radius-full);
        transition: width 2s ease-out;
    }

    .metric-dots {
        display: flex;
        gap: var(--space-1);
        flex-wrap: wrap;
    }

    .dot {
        width: 6px;
        height: 6px;
        background: var(--color-primary);
        border-radius: var(--radius-full);
        animation: dotPulse 2s infinite;
    }

    .dot:nth-child(odd) {
        animation-delay: 0.2s;
    }

    .dot:nth-child(even) {
        animation-delay: 0.4s;
    }

    @keyframes dotPulse {

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
        .experience-matrix {
            padding: var(--space-4);
        }

        .experience-node {
            flex-direction: column;
            position: relative;
            top: auto !important;
            margin-bottom: var(--space-8);
        }

        .track-line {
            left: 20px;
        }

        .marker-ring {
            width: 60px;
            height: 60px;
        }

        .job-meta {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    @media (max-width: 480px) {
        .analytics-grid {
            grid-template-columns: 1fr;
        }

        .career-stats {
            flex-direction: column;
            gap: var(--space-2);
        }

        .job-badges {
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>