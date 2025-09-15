<template>
    <div class="skills-showcase">
        <!-- Terminal Header -->
        <div class="terminal-header">
            <div class="terminal-controls">
                <span class="control control--close"></span>
                <span class="control control--minimize"></span>
                <span class="control control--maximize"></span>
            </div>
            <div class="terminal-title">skills-matrix@portfolio:~$</div>
        </div>

        <!-- Command Interface -->
        <div class="terminal-body">
            <div class="terminal-line">
                <span class="prompt">$</span>
                <span class="command">sudo apt-get install skills --verbose</span>
            </div>
            <div class="terminal-output">
                <div class="install-progress">
                    <span class="progress-item">Reading package lists... Done</span>
                    <span class="progress-item">Building dependency tree...</span>
                    <span class="progress-item">{{ totalSkills }} skills found in {{ skillCategories.length }}
                        categories</span>
                </div>
            </div>
            <div class="terminal-line">
                <span class="prompt">$</span>
                <span class="command typing">./analyze-skills.sh --all</span>
                <span class="cursor">_</span>
            </div>
        </div>

        <!-- Skills Matrix Grid -->
        <div class="skills-matrix-grid">
            <div v-for="(category, categoryIndex) in skillCategories" :key="category.category" class="category-terminal"
                :style="{ animationDelay: `${categoryIndex * 0.15}s` }">
                <!-- Category Header -->
                <div class="category-window-header">
                    <div class="window-controls">
                        <span class="control control--close"></span>
                        <span class="control control--minimize"></span>
                        <span class="control control--maximize"></span>
                    </div>
                    <div class="window-title">
                        <Icon :icon="category.icon" :style="{ color: category.color }" />
                        <span>{{ category.category.toLowerCase().replace(/\s+/g, '-') }}.pkg</span>
                    </div>
                    <div class="package-info">
                        <span class="package-count">{{ category.skills.length }}</span>
                        <span class="package-label">modules</span>
                    </div>
                </div>

                <!-- Skills Grid -->
                <div class="skills-terminal-body">
                    <div class="skills-matrix">
                        <div v-for="(skill, skillIndex) in category.skills" :key="skill.name" class="skill-module"
                            :style="{ animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s` }">
                            <!-- Module Header -->
                            <div class="module-header">
                                <div class="module-info">
                                    <div class="module-icon">
                                        <Icon :icon="skill.icon" :style="{ color: skill.color }" />
                                    </div>
                                    <div class="module-details">
                                        <div class="module-name">{{ skill.name }}</div>
                                        <div class="module-version">v{{ getVersionFromLevel(skill.level) }}</div>
                                    </div>
                                </div>
                                <div class="module-status" :class="`status-${getStatusFromLevel(skill.level)}`">
                                    <div class="status-indicator"></div>
                                    <span class="status-text">{{ getStatusFromLevel(skill.level) }}</span>
                                </div>
                            </div>

                            <!-- Progress Matrix -->
                            <div class="progress-matrix">
                                <div class="matrix-grid">
                                    <div v-for="i in 100" :key="i" class="matrix-cell"
                                        :class="{ active: i <= skill.level }" :style="{
                                            backgroundColor: i <= skill.level ? skill.color : 'transparent',
                                            animationDelay: `${i * 0.01}s`
                                        }"></div>
                                </div>
                                <div class="progress-overlay">
                                    <span class="progress-percentage">{{ skill.level }}%</span>
                                </div>
                            </div>

                            <!-- Module Data -->
                            <div class="module-data">
                                <div class="data-line">
                                    <span class="data-key">experience:</span>
                                    <span class="data-value">{{ skill.experience }}</span>
                                </div>
                                <!-- <div class="data-line">
                                    <span class="data-key">projects:</span>
                                    <span class="data-value">{{ skill.projects }} deployed</span>
                                </div> -->
                                <div class="data-line">
                                    <span class="data-key">description:</span>
                                    <span class="data-value">"{{ skill.description }}"</span>
                                </div>
                            </div>

                            <!-- Matrix Effects -->
                            <div class="matrix-effects">
                                <div class="scan-line"></div>
                                <div class="data-stream">
                                    <div class="stream-bit" v-for="n in 6" :key="n"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Category Stats -->
                <div class="category-stats">
                    <div class="stat-display">
                        <Icon icon="mdi:chart-line" />
                        <span class="stat-label">AVG:</span>
                        <span class="stat-value">{{ getCategoryAverage(category.skills) }}%</span>
                    </div>
                    <div class="stat-display">
                        <Icon icon="mdi:trophy" />
                        <span class="stat-label">TOP:</span>
                        <span class="stat-value">{{ getTopSkill(category.skills).name }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- System Analytics -->
        <div class="system-analytics">
            <div class="analytics-header">
                <Icon icon="mdi:monitor-dashboard" />
                <span>System Analytics</span>
            </div>
            <div class="analytics-grid">
                <div class="analytics-item">
                    <div class="metric-display">
                        <span class="metric-number">{{ totalSkills }}</span>
                        <span class="metric-label">Total Skills</span>
                    </div>
                    <div class="metric-chart">
                        <div class="chart-bar" v-for="n in 10" :key="n" :style="{ height: `${Math.random() * 100}%` }">
                        </div>
                    </div>
                </div>
                <div class="analytics-item">
                    <div class="metric-display">
                        <span class="metric-number">{{ averageLevel }}%</span>
                        <span class="metric-label">Average Level</span>
                    </div>
                    <div class="metric-ring">
                        <svg class="ring-chart" width="50" height="50">
                            <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(var(--color-primary-rgb), 0.2)"
                                stroke-width="4" />
                            <circle cx="25" cy="25" r="20" fill="none" stroke="var(--color-primary)" stroke-width="4"
                                :stroke-dasharray="`${(averageLevel / 100) * 125.66} 125.66`" stroke-linecap="round"
                                transform="rotate(-90 25 25)" />
                        </svg>
                    </div>
                </div>
                <div class="analytics-item">
                    <div class="metric-display">
                        <span class="metric-number">{{ expertSkillsCount }}</span>
                        <span class="metric-label">Expert Level</span>
                    </div>
                    <div class="metric-gauge">
                        <div class="gauge-fill" :style="{ width: `${(expertSkillsCount / totalSkills) * 100}%` }"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import { Icon } from '@iconify/vue'
    import type { SkillCategory } from '@/interfaces/skills'

    interface Props {
        skillCategories: SkillCategory[]
    }

    const props = defineProps<Props>()

    // Computed properties
    const totalSkills = computed(() => {
        return props.skillCategories.reduce((total, category) => total + category.skills.length, 0)
    })

    const averageLevel = computed(() => {
        const allSkills = props.skillCategories.flatMap(category => category.skills)
        const totalLevel = allSkills.reduce((sum, skill) => sum + skill.level, 0)
        return Math.round(totalLevel / allSkills.length)
    })

    const expertSkillsCount = computed(() => {
        const allSkills = props.skillCategories.flatMap(category => category.skills)
        return allSkills.filter(skill => skill.level >= 80).length
    })

    // Methods
    const getVersionFromLevel = (level: number): string => {
        if (level >= 90) return `${Math.floor(level / 10)}.${level % 10}.0`
        return `${Math.floor(level / 10)}.${level % 10}`
    }

    const getStatusFromLevel = (level: number): string => {
        if (level >= 90) return 'stable'
        if (level >= 70) return 'testing'
        if (level >= 50) return 'beta'
        return 'alpha'
    }

    const getCategoryAverage = (skills: any[]): number => {
        const total = skills.reduce((sum, skill) => sum + skill.level, 0)
        return Math.round(total / skills.length)
    }

    const getTopSkill = (skills: any[]) => {
        return skills.reduce((top, skill) => skill.level > top.level ? skill : top, skills[0])
    }
</script>

<style scoped>
    .skills-showcase {
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

    .install-progress {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
    }

    .progress-item {
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
    }

    /* Skills Matrix Grid */
    .skills-matrix-grid {
        display: flex;
        flex-direction: column;
        gap: var(--space-8);
        padding: var(--space-8);
    }

    .category-terminal {
        background: linear-gradient(135deg,
                rgba(var(--color-bg-dark-rgb), 0.95),
                rgba(var(--color-surface-dark-rgb), 0.8));
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-lg);
        overflow: hidden;
        animation: slideInMatrix 0.8s ease-out forwards;
        opacity: 0;
    }

    @keyframes slideInMatrix {
        from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
        }

        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    /* Category Window Header */
    .category-window-header {
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
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--color-accent);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
    }

    .package-info {
        display: flex;
        align-items: center;
        gap: var(--space-1);
        background: rgba(var(--color-primary-rgb), 0.1);
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-sm);
    }

    .package-count {
        color: var(--color-primary);
        font-weight: var(--font-weight-bold);
        min-width: 20px;
        text-align: center;
    }

    .package-label {
        color: var(--color-text-muted);
        font-size: var(--font-size-xs);
    }

    /* Skills Terminal Body */
    .skills-terminal-body {
        padding: var(--space-6);
    }

    .skills-matrix {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
        gap: var(--space-6);
    }

    /* Skill Module */
    .skill-module {
        background: rgba(var(--color-surface-dark-rgb), 0.8);
        border: 1px solid rgba(var(--color-primary-rgb), 0.3);
        border-radius: var(--radius-md);
        padding: var(--space-4);
        position: relative;
        overflow: hidden;
        transition: var(--transition-all);
        animation: moduleLoad 0.6s ease-out forwards;
        opacity: 0;
    }

    @keyframes moduleLoad {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }

        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .skill-module:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.3);
        border-color: var(--color-primary);
    }

    /* Module Header */
    .module-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-4);
    }

    .module-info {
        display: flex;
        align-items: center;
        gap: var(--space-3);
    }

    .module-icon {
        font-size: var(--font-size-xl);
    }

    .module-name {
        color: var(--color-white);
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-bold);
    }

    .module-version {
        color: var(--color-text-muted);
        font-size: var(--font-size-xs);
        font-family: var(--font-mono);
    }

    .module-status {
        display: flex;
        align-items: center;
        gap: var(--space-1);
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-xs);
    }

    .status-stable {
        background: rgba(var(--color-success-rgb), 0.1);
        color: var(--color-success);
    }

    .status-testing {
        background: rgba(var(--color-warning-rgb), 0.1);
        color: var(--color-warning);
    }

    .status-beta {
        background: rgba(var(--color-info-rgb), 0.1);
        color: var(--color-info);
    }

    .status-alpha {
        background: rgba(var(--color-error-rgb), 0.1);
        color: var(--color-error);
    }

    .status-indicator {
        width: 6px;
        height: 6px;
        border-radius: var(--radius-full);
        background: currentColor;
        animation: pulse 2s infinite;
    }

    /* Progress Matrix */
    .progress-matrix {
        position: relative;
        margin-bottom: var(--space-4);
        height: 60px;
        background: rgba(var(--color-bg-dark-rgb), 0.8);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-2xs);
        overflow: hidden;
    }

    .matrix-grid {
        display: grid;
        grid-template-columns: repeat(20, 1fr);
        grid-template-rows: repeat(5, 1fr);
        height: 100%;
        gap: 3px;
        padding: var(--space-2);
    }

    .matrix-cell {
        background: rgba(var(--color-primary-rgb), 0.1);
        border-radius: var(--radius-3xs);
        transition: all 0.3s ease;
        animation: cellActivate 0.1s ease-out forwards;
    }

    .matrix-cell.active {
        /* box-shadow: 0 0 4px currentColor; */
    }

    @keyframes cellActivate {
        from {
            transform: scale(0);
        }

        to {
            transform: scale(1);
        }
    }

    .progress-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(var(--color-bg-dark-rgb), 0.8);
        opacity: 0;
        transition: var(--transition-opacity);
    }

    .skill-module:hover .progress-overlay {
        opacity: 1;
    }

    .progress-percentage {
        color: var(--color-primary);
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-lg);
    }

    /* Module Data */
    .module-data {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
    }

    .data-line {
        display: flex;
        gap: var(--space-2);
        font-size: var(--font-size-xs);
    }

    .data-key {
        color: var(--color-accent);
        min-width: 80px;
    }

    .data-value {
        color: var(--color-text-muted);
        flex: 1;
    }

    /* Matrix Effects */
    .matrix-effects {
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0;
        transition: var(--transition-opacity);
    }

    .skill-module:hover .matrix-effects {
        opacity: 1;
    }

    .scan-line {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
        animation: scanMove 2s linear infinite;
    }

    @keyframes scanMove {
        0% {
            transform: translateY(0);
        }

        100% {
            transform: translateY(100px);
        }
    }

    .data-stream {
        position: absolute;
        top: 0;
        right: 0;
        width: 2px;
        height: 100%;
    }

    .stream-bit {
        position: absolute;
        width: 100%;
        height: 4px;
        background: var(--color-accent);
        animation: streamFlow 1s linear infinite;
    }

    .stream-bit:nth-child(1) {
        animation-delay: 0s;
    }

    .stream-bit:nth-child(2) {
        animation-delay: 0.2s;
    }

    .stream-bit:nth-child(3) {
        animation-delay: 0.4s;
    }

    .stream-bit:nth-child(4) {
        animation-delay: 0.6s;
    }

    .stream-bit:nth-child(5) {
        animation-delay: 0.8s;
    }

    .stream-bit:nth-child(6) {
        animation-delay: 1s;
    }

    @keyframes streamFlow {
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
            transform: translateY(200px);
            opacity: 0;
        }
    }

    /* Category Stats */
    .category-stats {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-4);
        background: rgba(var(--color-bg-dark-rgb), 0.5);
        border-top: 1px solid rgba(var(--color-primary-rgb), 0.1);
    }

    .stat-display {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
    }

    .stat-label {
        color: var(--color-accent);
    }

    .stat-value {
        color: var(--color-white);
        font-weight: var(--font-weight-bold);
    }

    /* System Analytics */
    .system-analytics {
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
        gap: var(--space-6);
    }

    .analytics-item {
        background: rgba(var(--color-surface-dark-rgb), 0.8);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-md);
        padding: var(--space-4);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .metric-display {
        display: flex;
        flex-direction: column;
    }

    .metric-number {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-primary);
        font-family: var(--font-mono);
    }

    .metric-label {
        font-size: var(--font-size-xs);
        color: var(--color-text-muted);
        text-transform: uppercase;
    }

    .metric-chart {
        display: flex;
        align-items: end;
        gap: 2px;
        height: 30px;
    }

    .chart-bar {
        width: 3px;
        background: var(--color-primary);
        opacity: 0.6;
        animation: barPulse 2s ease-in-out infinite;
    }

    .chart-bar:nth-child(odd) {
        animation-delay: 0.2s;
    }

    .chart-bar:nth-child(even) {
        animation-delay: 0.4s;
    }

    @keyframes barPulse {

        0%,
        100% {
            opacity: 0.6;
        }

        50% {
            opacity: 1;
        }
    }

    .metric-gauge {
        width: 60px;
        height: 8px;
        background: rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-full);
        overflow: hidden;
    }

    .gauge-fill {
        height: 100%;
        background: var(--color-primary);
        border-radius: var(--radius-full);
        transition: width 1s ease-out;
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
        .skills-matrix {
            grid-template-columns: 1fr;
        }

        .analytics-grid {
            grid-template-columns: 1fr;
        }

        .category-stats {
            flex-direction: column;
            gap: var(--space-2);
        }
    }

    @media (max-width: 480px) {
        .skills-showcase {
            margin: var(--space-2);
        }

        .skills-matrix-grid {
            padding: var(--space-4);
        }

        .module-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-2);
        }
    }
</style>