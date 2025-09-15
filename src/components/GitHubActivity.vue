<template>
    <div class="github-activity">
        <div class="activity-header">
            <div class="header-info">
                <Icon icon="mdi:github" class="github-icon" />
                <h3 class="activity-title">GitHub Activity</h3>
            </div>
            <a :href="githubProfile" target="_blank" class="profile-link">
                <span>View Profile</span>
                <Icon icon="mdi:open-in-new" />
            </a>
        </div>

        <!-- Contribution Graph -->
        <div class="contribution-section">
            <h4 class="section-title">Contributions in the last year</h4>
            <div class="contribution-graph">
                <div class="graph-months">
                    <span v-for="month in visibleMonths" :key="month.label" class="month-label"
                        :style="{ gridColumn: `span ${month.weeks}` }">
                        {{ month.label }}
                    </span>
                </div>
                <div class="graph-grid">
                    <div class="graph-days">
                        <span v-for="day in dayLabels" :key="day" class="day-label">{{ day }}</span>
                    </div>
                    <div class="graph-squares">
                        <div v-for="(week, weekIndex) in contributionData" :key="weekIndex" class="week-column">
                            <div v-for="(day, dayIndex) in week" :key="dayIndex" class="contribution-square"
                                :class="`level-${day.level}`"
                                :title="`${day.count} contributions on ${formatDate(day.date)}`">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="legend">
                    <span class="legend-label">Less</span>
                    <div class="legend-squares">
                        <div class="legend-square level-0"></div>
                        <div class="legend-square level-1"></div>
                        <div class="legend-square level-2"></div>
                        <div class="legend-square level-3"></div>
                        <div class="legend-square level-4"></div>
                    </div>
                    <span class="legend-label">More</span>
                </div>
            </div>
        </div>

        <!-- Recent Activity Feed -->
        <div class="activity-feed">
            <h4 class="section-title">Recent Activity</h4>
            <div class="feed-container">
                <div v-if="loading" class="loading-state">
                    <div class="spinner"></div>
                    <span>Loading activity...</span>
                </div>

                <div v-else-if="error" class="error-state">
                    <Icon icon="mdi:alert-circle" />
                    <span>{{ error }}</span>
                </div>

                <div v-else class="activity-list">
                    <div v-for="activity in activities" :key="activity.id" class="activity-item">
                        <div class="activity-icon">
                            <Icon :icon="getActivityIcon(activity.type)" />
                        </div>
                        <div class="activity-content">
                            <div class="activity-text" v-html="activity.text"></div>
                            <div class="activity-meta">
                                <span class="activity-repo">{{ activity.repo }}</span>
                                <span class="activity-time">{{ formatTime(activity.created_at) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="!loading && activities.length === 0" class="empty-state">
                    <Icon icon="mdi:timeline-outline" />
                    <span>No recent activity</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue'
    import { Icon } from '@iconify/vue'
    import type { GitHubActivity, ContributionDay } from '@/interfaces/githubActivity'

    const props = withDefaults(defineProps<{
        username?: string
    }>(), {
        username: 'devfrx' // Il tuo username GitHub
    })

    const activities = ref<GitHubActivity[]>([])
    const contributionData = ref<ContributionDay[][]>([])
    const loading = ref(true)
    const error = ref('')

    const githubProfile = `https://github.com/${props.username}`

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    // Computed property per i mesi visibili
    const visibleMonths = computed(() => {
        if (contributionData.value.length === 0) return []

        const months: { label: string; weeks: number }[] = []
        let currentMonth = -1
        let weekCount = 0

        contributionData.value.forEach((week, weekIndex) => {
            if (week.length === 0) return

            // Prendi il primo giorno della settimana per determinare il mese
            const firstDay = new Date(week[0].date)
            const month = firstDay.getMonth()

            if (month !== currentMonth) {
                if (currentMonth !== -1) {
                    months.push({ label: monthNames[currentMonth], weeks: weekCount })
                }
                currentMonth = month
                weekCount = 1
            } else {
                weekCount++
            }
        })

        // Aggiungi l'ultimo mese
        if (currentMonth !== -1) {
            months.push({ label: monthNames[currentMonth], weeks: weekCount })
        }

        return months
    })

    // Mock data as fallback
    const mockActivities: GitHubActivity[] = [
        {
            id: '1',
            type: 'push',
            text: 'Pushed 3 commits to <strong>portfolio-website</strong>',
            repo: `${props.username}/portfolio-website`,
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
        },
        {
            id: '2',
            type: 'create',
            text: 'Created repository <strong>new-project</strong>',
            repo: `${props.username}/new-project`,
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
        },
        {
            id: '3',
            type: 'issues',
            text: 'Opened issue <strong>Fix responsive design bug</strong>',
            repo: `${props.username}/vue-components`,
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
        },
        {
            id: '4',
            type: 'pull_request',
            text: 'Opened pull request <strong>Add dark mode support</strong>',
            repo: `${props.username}/ui-library`,
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
        },
        {
            id: '5',
            type: 'push',
            text: 'Pushed 5 commits to <strong>api-server</strong>',
            repo: `${props.username}/api-server`,
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()
        }
    ]

    const generateMockContributions = (): ContributionDay[][] => {
        const weeks: ContributionDay[][] = []
        const today = new Date()
        const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())

        // Trova la domenica prima di un anno fa per iniziare la griglia
        const startDate = new Date(oneYearAgo)
        startDate.setDate(startDate.getDate() - startDate.getDay()) // Vai alla domenica precedente

        let currentDate = new Date(startDate)

        while (currentDate <= today) {
            const week: ContributionDay[] = []

            // Crea una settimana (domenica-sabato)
            for (let day = 0; day < 7; day++) {
                const count = Math.floor(Math.random() * 15)
                const level = count === 0 ? 0 : Math.min(Math.floor(count / 3) + 1, 4)

                week.push({
                    date: currentDate.toISOString().split('T')[0],
                    count,
                    level
                })

                currentDate.setDate(currentDate.getDate() + 1)
            }

            weeks.push(week)
        }

        return weeks
    }

    const getActivityIcon = (type: string): string => {
        const icons: Record<string, string> = {
            push: 'mdi:source-commit',
            create: 'mdi:plus-circle',
            issues: 'mdi:alert-circle-outline',
            pull_request: 'mdi:source-pull',
            watch: 'mdi:star',
            fork: 'mdi:source-fork',
            release: 'mdi:tag',
            public: 'mdi:eye'
        }
        return icons[type] || 'mdi:circle'
    }

    const formatTime = (dateString: string): string => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

        if (diffInSeconds < 60) return 'just now'
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
        return date.toLocaleDateString()
    }

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const generateActivityText = (event: any): string => {
        switch (event.type) {
            case 'PushEvent':
                const commits = event.payload.commits?.length || 0
                const repoName = event.repo.name.split('/')[1]
                return `Pushed ${commits} commit${commits !== 1 ? 's' : ''} to <strong>${repoName}</strong>`

            case 'CreateEvent':
                const refType = event.payload.ref_type
                const ref = event.payload.ref
                const repoName2 = event.repo.name.split('/')[1]

                if (refType === 'repository') {
                    return `Created repository <strong>${repoName2}</strong>`
                } else if (refType === 'branch') {
                    return `Created branch <strong>${ref}</strong> in ${repoName2}`
                } else if (refType === 'tag') {
                    return `Created tag <strong>${ref}</strong> in ${repoName2}`
                }
                return `Created ${refType} <strong>${ref || repoName2}</strong>`

            case 'IssuesEvent':
                const action = event.payload.action
                const issueTitle = event.payload.issue?.title || 'issue'
                const repoName3 = event.repo.name.split('/')[1]
                return `${action.charAt(0).toUpperCase() + action.slice(1)} issue <strong>${issueTitle}</strong> in ${repoName3}`

            case 'PullRequestEvent':
                const prAction = event.payload.action
                const prTitle = event.payload.pull_request?.title || 'pull request'
                const repoName4 = event.repo.name.split('/')[1]
                return `${prAction.charAt(0).toUpperCase() + prAction.slice(1)} pull request <strong>${prTitle}</strong> in ${repoName4}`

            case 'WatchEvent':
                const repoName5 = event.repo.name.split('/')[1]
                return `Starred <strong>${repoName5}</strong>`

            case 'ForkEvent':
                const repoName6 = event.repo.name.split('/')[1]
                return `Forked <strong>${repoName6}</strong>`

            case 'ReleaseEvent':
                const repoName7 = event.repo.name.split('/')[1]
                const tagName = event.payload.release?.tag_name || 'release'
                return `Published release <strong>${tagName}</strong> in ${repoName7}`

            case 'PublicEvent':
                const repoName8 = event.repo.name.split('/')[1]
                return `Made <strong>${repoName8}</strong> public`

            default:
                const repoName9 = event.repo.name.split('/')[1]
                return `Activity in <strong>${repoName9}</strong>`
        }
    }


    const fetchContributionData = async (): Promise<ContributionDay[][]> => {
        // Chiamata al proxy serverless
        const response = await fetch(`/api/github?action=contributions&user=${props.username}`)
        if (!response.ok) throw new Error(`Proxy error: ${response.status}`)
        const result = await response.json()
        if (result.errors) throw new Error(result.errors[0].message)

        const levelMap: Record<string, number> = {
            'NONE': 0,
            'FIRST_QUARTILE': 1,
            'SECOND_QUARTILE': 2,
            'THIRD_QUARTILE': 3,
            'FOURTH_QUARTILE': 4
        }

        return result.data.user.contributionsCollection.contributionCalendar.weeks.map((week: any) =>
            week.contributionDays.map((day: any) => ({
                date: day.date,
                count: day.contributionCount,
                level: levelMap[day.contributionLevel] ?? 0
            }))
        )
    }


    const fetchGitHubActivity = async () => {
        try {
            loading.value = true
            error.value = ''

            // Chiamata al proxy serverless
            const eventsResponse = await fetch(`/api/github?action=activity&user=${props.username}`)

            if (eventsResponse.status === 404) {
                throw new Error('GitHub user not found')
            }

            if (eventsResponse.status === 403) {
                const rateLimitReset = eventsResponse.headers.get('X-RateLimit-Reset')
                const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000) : new Date()
                throw new Error(`API rate limit exceeded. Try again at ${resetTime.toLocaleTimeString()}`)
            }

            if (!eventsResponse.ok) {
                throw new Error(`GitHub API error: ${eventsResponse.status}`)
            }

            const events = await eventsResponse.json()

            // Se la risposta è un array di commit (non eventi), mappa i commit come attività "push"
            let activityList: GitHubActivity[] = []

            if (Array.isArray(events) && events.length && !events[0].type && events[0].commit) {
                // È un array di commit
                activityList = events.slice(0, 10).map((commit: any) => ({
                    id: commit.sha,
                    type: 'push',
                    text: `Committed <strong>${commit.commit.message.split('\n')[0]}</strong>`,
                    repo: `${props.username}/${commit.repository?.name || 'jays-portfolio'}`,
                    created_at: commit.commit.author.date
                }))
            } else if (Array.isArray(events)) {
                // È un array di eventi GitHub classici
                const relevantEventTypes = ['PushEvent', 'CreateEvent', 'IssuesEvent', 'PullRequestEvent', 'WatchEvent', 'ForkEvent', 'ReleaseEvent', 'PublicEvent']
                activityList = events
                    .filter((event: any) => relevantEventTypes.includes(event.type))
                    .slice(0, 10)
                    .map((event: any) => ({
                        id: event.id,
                        type: event.type.replace('Event', '').toLowerCase(),
                        text: generateActivityText(event),
                        repo: event.repo.name,
                        created_at: event.created_at
                    }))
            }

            activities.value = activityList
            console.log('Fetched activities:', activities.value)

            // Fetch contributions (with fallback)
            try {
                contributionData.value = await fetchContributionData()
            } catch (contributionError) {
                console.warn('Using mock contribution data:', contributionError)
                contributionData.value = generateMockContributions()
            }

            // Success message
            console.log(`✅ Loaded ${activities.value.length} GitHub activities for ${props.username}`)

        } catch (err: any) {
            error.value = err.message || 'Failed to load GitHub activity'
            console.error('GitHub API error:', err)

            // Fallback to mock data
            console.log('🔄 Using mock data as fallback')
            activities.value = mockActivities
            contributionData.value = generateMockContributions()
        } finally {
            loading.value = false
        }
    }

    onMounted(() => {
        fetchGitHubActivity()
    })
</script>

<style scoped>
    .github-activity {
        background: rgba(var(--color-surface-dark-rgb), 0.5);
        border: 1px solid rgba(var(--color-primary-rgb), 0.2);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
        backdrop-filter: blur(var(--blur-md));
    }

    .activity-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-6);
    }

    .header-info {
        display: flex;
        align-items: center;
        gap: var(--space-3);
    }

    .github-icon {
        color: var(--color-primary);
        font-size: var(--font-size-2xl);
    }

    .activity-title {
        color: var(--color-white);
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        margin: 0;
    }

    .profile-link {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--color-primary);
        text-decoration: none;
        font-size: var(--font-size-sm);
        transition: var(--transition-colors);
    }

    .profile-link:hover {
        color: var(--color-accent);
    }

    .section-title {
        color: var(--color-white);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-4);
    }

    /* Contribution Graph */
    .contribution-section {
        margin-bottom: var(--space-8);
    }

    .contribution-graph {
        background: rgba(var(--color-bg-dark-rgb), 0.5);
        border: 1px solid rgba(var(--color-primary-rgb), 0.1);
        border-radius: var(--radius-md);
        padding: var(--space-4);
    }

    .graph-months {
        display: grid;
        grid-auto-columns: 1fr;
        grid-auto-flow: column;
        margin-bottom: var(--space-2);
        margin-left: 32px;
        /* Align with graph squares */
    }

    .month-label {
        color: var(--color-text-muted);
        font-size: var(--font-size-xs);
        text-align: left;
    }

    .graph-grid {
        display: flex;
        gap: var(--space-2);
    }

    .graph-days {
        display: flex;
        flex-direction: column;
        gap: 3px;
        width: 24px;
    }

    .day-label {
        color: var(--color-text-muted);
        font-size: var(--font-size-xs);
        height: 11px;
        display: flex;
        align-items: center;
        text-align: right;
    }

    .graph-squares {
        display: flex;
        gap: 3px;
        flex: 1;
        overflow-x: auto;
    }

    .week-column {
        display: flex;
        flex-direction: column;
        gap: 3px;
        min-width: 11px;
    }

    .contribution-square {
        width: 11px;
        height: 11px;
        border-radius: 2px;
        cursor: pointer;
        transition: var(--transition-all);
    }

    .contribution-square:hover {
        outline: 1px solid rgba(var(--color-primary-rgb), 0.5);
    }

    .contribution-square.level-0 {
        background: rgba(var(--color-primary-rgb), 0.1);
    }

    .contribution-square.level-1 {
        background: rgba(var(--color-primary-rgb), 0.3);
    }

    .contribution-square.level-2 {
        background: rgba(var(--color-primary-rgb), 0.5);
    }

    .contribution-square.level-3 {
        background: rgba(var(--color-primary-rgb), 0.7);
    }

    .contribution-square.level-4 {
        background: var(--color-primary);
    }

    .legend {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--space-2);
        margin-top: var(--space-3);
    }

    .legend-label {
        color: var(--color-text-muted);
        font-size: var(--font-size-xs);
    }

    .legend-squares {
        display: flex;
        gap: 3px;
    }

    .legend-square {
        width: 11px;
        height: 11px;
        border-radius: 2px;
    }

    /* Activity Feed */
    .feed-container {
        max-height: 400px;
        overflow-y: auto;
    }

    .loading-state,
    .error-state,
    .empty-state {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-3);
        padding: var(--space-6);
        color: var(--color-text-muted);
    }

    .spinner {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(var(--color-primary-rgb), 0.3);
        border-top: 2px solid var(--color-primary);
        border-radius: var(--radius-full);
        animation: spin 1s linear infinite;
    }

    .activity-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
    }

    .activity-item {
        display: flex;
        gap: var(--space-3);
        padding: var(--space-3);
        background: rgba(var(--color-bg-dark-rgb), 0.3);
        border: 1px solid rgba(var(--color-primary-rgb), 0.1);
        border-radius: var(--radius-md);
        transition: var(--transition-all);
    }

    .activity-item:hover {
        background: rgba(var(--color-primary-rgb), 0.05);
        border-color: rgba(var(--color-primary-rgb), 0.2);
    }

    .activity-icon {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        background: rgba(var(--color-primary-rgb), 0.1);
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-primary);
        font-size: var(--font-size-lg);
    }

    .activity-content {
        flex: 1;
        min-width: 0;
    }

    .activity-text {
        color: var(--color-white);
        font-size: var(--font-size-sm);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--space-1);
    }

    .activity-text :deep(strong) {
        color: var(--color-primary);
        font-weight: var(--font-weight-semibold);
    }

    .activity-meta {
        display: flex;
        gap: var(--space-3);
        font-size: var(--font-size-xs);
        color: var(--color-text-muted);
    }

    .activity-repo {
        font-family: var(--font-mono);
    }

    /* Responsive */
    @media (max-width: 768px) {
        .activity-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-3);
        }

        .graph-grid {
            overflow-x: auto;
        }

        .graph-months {
            margin-left: 28px;
        }

        .graph-days {
            width: 20px;
        }

        .feed-container {
            max-height: 300px;
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>