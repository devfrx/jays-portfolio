<template>
    <nav class="navbar">
        <div class="navbar-container">
            <!-- Logo/Brand -->
            <div class="navbar-brand">
                <router-link to="/" class="brand-link">
                    <!-- <span class="brand-symbol">
                        <span class="code-brackets">&lt;</span>
                        <span class="brand-initial">J</span>
                        <span class="code-brackets">/&gt;</span>
                    </span> -->
                    <span class="brand-text">jays.dev</span>
                </router-link>
            </div>

            <!-- Navigation Links -->
            <div class="navbar-nav">
                <router-link to="/" class="nav-link">
                    <span class="nav-prefix">01.</span>
                    <span class="nav-text">home()</span>
                </router-link>
                <router-link to="/about" class="nav-link">
                    <span class="nav-prefix">02.</span>
                    <span class="nav-text">about()</span>
                </router-link>
                <router-link to="/projects" class="nav-link">
                    <span class="nav-prefix">03.</span>
                    <span class="nav-text">projects[]</span>
                </router-link>
                <router-link to="/skills" class="nav-link">
                    <span class="nav-prefix">04.</span>
                    <span class="nav-text">skills{}</span>
                </router-link>
                <router-link to="/contact" class="nav-link nav-link--cta">
                    <span class="nav-text">contact.me</span>
                </router-link>
            </div>

            <!-- Mobile menu button -->
            <button class="mobile-menu-btn" @click="toggleMobileMenu" :class="{ 'active': isMobileMenuOpen }">
                <span class="hamburger"></span>
                <span class="hamburger"></span>
                <span class="hamburger"></span>
            </button>
        </div>

        <!-- Mobile menu -->
        <div class="mobile-menu" :class="{ 'mobile-menu--open': isMobileMenuOpen }">
            <div class="mobile-menu-header">
                <span class="terminal-prompt">user@portfolio:~$</span>
            </div>
            <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">
                <span class="mobile-nav-prefix">01.</span>
                <span>home()</span>
            </router-link>
            <router-link to="/about" class="mobile-nav-link" @click="closeMobileMenu">
                <span class="mobile-nav-prefix">02.</span>
                <span>about()</span>
            </router-link>
            <router-link to="/projects" class="mobile-nav-link" @click="closeMobileMenu">
                <span class="mobile-nav-prefix">03.</span>
                <span>projects[]</span>
            </router-link>
            <router-link to="/skills" class="mobile-nav-link" @click="closeMobileMenu">
                <span class="mobile-nav-prefix">04.</span>
                <span>skills{}</span>
            </router-link>
            <router-link to="/contact" class="mobile-nav-link mobile-nav-link--cta" @click="closeMobileMenu">
                <span>contact.me</span>
            </router-link>
        </div>
    </nav>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    const isMobileMenuOpen = ref(false)

    const toggleMobileMenu = () => {
        isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    const closeMobileMenu = () => {
        isMobileMenuOpen.value = false
    }
</script>

<style scoped>
    .navbar {
        position: sticky;
        background: rgba(10, 15, 25, 0.95);
        /* backdrop-filter: blur(var(--blur-lg)); */
        /* border-bottom: 1px solid rgba(var(--color-primary-light-rgb), 0.1); */
        z-index: var(--z-sticky);
        transition: var(--transition-all);
        font-family: var(--font-mono);
    }

    /* .navbar.mobile-menu-open {
        border-radius: var(--radius-md);
    } */

    .navbar-container {
        max-width: var(--container-max-width);
        margin: 0 auto;
        padding: 0 var(--space-6);
        height: var(--navbar-height);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    /* Brand Section */
    .navbar-brand {
        display: flex;
        align-items: center;
    }

    .brand-link {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        text-decoration: none;
        color: var(--color-primary-light);
        font-weight: var(--font-weight-bold);
        transition: var(--transition-all);
    }

    .brand-link:hover {
        transform: translateY(-1px);
        filter: brightness(1.2);
    }

    .brand-symbol {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #0a0f19, #1a2332);
        border: 2px solid var(--color-primary-light);
        color: var(--color-primary-light);
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: var(--font-weight-extrabold);
        font-size: var(--font-size-sm);
        box-shadow:
            0 0 20px rgba(var(--color-primary-light-rgb), 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        transition: var(--transition-all);
        position: relative;
        overflow: hidden;
        font-family: var(--font-mono);
    }

    .brand-symbol::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(45deg, transparent 30%, rgba(var(--color-primary-light-rgb), 0.1) 50%, transparent 70%);
        transform: translateX(-100%);
        transition: transform 0.6s ease;
    }

    .brand-link:hover .brand-symbol::before {
        transform: translateX(100%);
    }

    .brand-link:hover .brand-symbol {
        border-color: var(--color-primary);
        box-shadow:
            0 0 30px rgba(var(--color-primary-light-rgb), 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        transform: scale(1.05);
    }

    .code-brackets {
        color: var(--color-error);
        font-size: 10px;
    }

    .brand-initial {
        color: var(--color-primary-light);
        font-size: 16px;
        margin: 0 1px;
    }

    .brand-text {
        font-size: var(--font-size-lg);
        font-family: var(--font-mono);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-light);
        text-shadow: 0 0 10px rgba(var(--color-primary-light-rgb), 0.1);
    }

    /* Navigation */
    .navbar-nav {
        display: flex;
        align-items: center;
        gap: var(--space-6);
    }

    .nav-link {
        position: relative;
        padding: var(--space-2) var(--space-4);
        text-decoration: none;
        color: #8892b0;
        font-weight: var(--font-weight-medium);
        font-size: var(--font-size-sm);
        font-family: var(--font-mono);
        transition: var(--transition-all);
        border-radius: var(--radius-sm) var(--radius-sm) 0 0;
        display: flex;
        align-items: center;
        gap: var(--space-2);
    }

    .nav-prefix {
        color: var(--color-primary-light);
        font-size: 12px;
        font-weight: var(--font-weight-normal);
    }

    .nav-text {
        transition: var(--transition-all);
    }

    .nav-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, var(--color-primary-light), var(--color-primary));
        transition: var(--transition-all);
    }

    .nav-link:hover {
        color: var(--color-primary-light);
        background: rgba(var(--color-primary-light-rgb), 0.1);
        transform: translateY(-1px);
    }

    .nav-link:hover::after {
        width: 100%;
    }

    .nav-link:hover .nav-text {
        text-shadow: 0 0 8px rgba(var(--color-primary-light-rgb), 0.1);
    }

    /* Active state */
    .nav-link.router-link-active {
        color: var(--color-accent-light);
        background: rgba(var(--color-primary-light-rgb), 0.1);
    }

    .nav-link.router-link-active::after {
        width: 100%;
    }

    .nav-link.router-link-active .nav-text {
        text-shadow: 0 0 8px rgba(var(--color-primary-light-rgb), 0.1);
    }

    /* CTA Button */
    .nav-link--cta {
        background: linear-gradient(135deg, #0a0f19, #1a2332);
        border: 1px solid var(--color-primary-light);
        color: var(--color-primary-light) !important;
        padding: var(--space-2_5) var(--space-5);
        border-radius: var(--radius-md);
        font-weight: var(--font-weight-semibold);
        box-shadow: 0 0 15px rgba(var(--color-primary-light-rgb), 0.1);
        position: relative;
        overflow: hidden;
    }

    .nav-link--cta::after {
        display: none;
    }

    .nav-link--cta:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 25px rgba(var(--color-accent-light-rgb), 0.5);
        border-color: var(--color-primary);
    }

    .nav-link--cta:hover::before {
        opacity: 1;
    }

    /* Mobile menu button */
    .mobile-menu-btn {
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 44px;
        height: 44px;
        background: rgba(var(--color-accent-light-rgb), 0.05);
        border: 1px solid rgba(var(--color-accent-light-rgb), 0.1);
        border-radius: var(--radius-md);
        cursor: pointer;
        padding: var(--space-2);
        transition: var(--transition-all);
    }

    .mobile-menu-btn:hover {
        background: rgba(var(--color-accent-light-rgb), 0.3);
        border-color: var(--color-primary-light);
        box-shadow: 0 0 15px rgba(var(--color-accent-light-rgb), 0.3);
    }

    .mobile-menu-btn.active .hamburger:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
    }

    .mobile-menu-btn.active .hamburger:nth-child(2) {
        opacity: 0;
    }

    .mobile-menu-btn.active .hamburger:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
    }

    .hamburger {
        width: 18px;
        height: 2px;
        background: var(--color-primary-light);
        border-radius: var(--radius-full);
        transition: var(--transition-all);
        margin: 2px 0;
    }

    /* Mobile menu */
    .mobile-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(10, 15, 25, 0.98);
        backdrop-filter: blur(var(--blur-lg));
        border-bottom: 1px solid rgba(var(--color-accent-light-rgb), 0.3);
        padding: var(--space-6);
        display: none;
        flex-direction: column;
        gap: var(--space-3);
        transform: translateY(-100%);
        opacity: 0;
        transition: var(--transition-all);
        font-family: var(--font-mono);
    }

    .mobile-menu--open {
        display: flex;
        transform: translateY(0);
        opacity: 1;
    }

    .mobile-menu-header {
        padding: var(--space-3);
        border-bottom: 1px solid rgba(var(--color-accent-light-rgb), 0.3);
        margin-bottom: var(--space-3);
    }

    .terminal-prompt {
        color: var(--color-primary-light);
        font-size: var(--font-size-sm);
        font-family: var(--font-mono);
    }

    .mobile-nav-link {
        padding: var(--space-3) var(--space-4);
        text-decoration: none;
        color: #8892b0;
        font-weight: var(--font-weight-medium);
        border-radius: var(--radius-md);
        transition: var(--transition-all);
        display: flex;
        align-items: center;
        gap: var(--space-3);
        font-family: var(--font-mono);
        border: 1px solid transparent;
    }

    .mobile-nav-prefix {
        color: var(--color-primary-light);
        font-size: 12px;
        min-width: 24px;
    }

    .mobile-nav-link:hover {
        background: rgba(var(--color-accent-rgb), 0.3);
        color: var(--color-text-light);
        border-color: rgba(var(--color-accent-rgb), 0.3);
        transform: translateX(4px);
    }

    .mobile-nav-link--cta {
        background: linear-gradient(135deg, #0a0f19, #1a2d32);
        border: 1px solid var(--color-primary-light);
        color: var(--color-primary-light) !important;
        font-weight: var(--font-weight-semibold);
        box-shadow: 0 0 15px rgba(var(--color-accent-rgb), 0.3);
        margin-top: var(--space-3);
        justify-content: center;
    }

    .mobile-nav-link--cta:hover {
        background: rgba(var(--color-accent-rgb), 0.3);
        box-shadow: 0 0 20px rgba(var(--color-accent-rgb), 0.3);
        transform: translateX(0) translateY(-1px);
    }

    /* Responsive design */
    @media (max-width: 768px) {
        .navbar-container {
            padding: 0 var(--space-4);
        }

        .navbar-nav {
            display: none;
        }

        .mobile-menu-btn {
            display: flex;
        }

        .brand-text {
            font-size: var(--font-size-md);
        }

        .brand-symbol {
            width: 40px;
            height: 40px;
            font-size: 11px;
        }
    }

    @media (max-width: 480px) {
        .navbar-container {
            padding: 0 var(--space-3);
        }

        /* 
        .brand-text {
            display: none;
        } */

        .brand-symbol {
            width: 36px;
            height: 36px;
            font-size: 10px;
        }
    }

    /* Glitch effect for active states */
    @keyframes glitch {
        0% {
            transform: translateX(0);
        }

        20% {
            transform: translateX(-2px);
        }

        40% {
            transform: translateX(2px);
        }

        60% {
            transform: translateX(-1px);
        }

        80% {
            transform: translateX(1px);
        }

        100% {
            transform: translateX(0);
        }
    }

    .nav-link.router-link-active .nav-text {
        animation: glitch 2s infinite;
    }

    /* Terminal cursor effect */
    .brand-text::after {
        content: '_';
        color: var(--color-primary-light);
        animation: blink 1s infinite;
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