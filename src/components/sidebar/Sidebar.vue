<template>
    <aside
            class="sidebar"
            :class="{ collapsed: !open }"
            role="navigation"
            aria-label="Main"
    >
        <nav>
            <ul>
                <!-- Home -->
                <li>
                    <RouterLink to="/" class="nav-link">
                        <span class="icon">📊</span>
                        <span class="label" v-if="open">{{ $t('home') }}</span>
                    </RouterLink>
                </li>
                <!-- Dashboard -->
                <li>
                    <RouterLink to="/dashboard" class="nav-link">
                        <span class="icon">🌏</span>
                        <span class="label" v-if="open">{{ $t('dashboard') }}</span>
                    </RouterLink>
                </li>
            </ul>
        </nav>
        </aside>
        </template>

        <!-- pull in split logic & styles -->
<script src="./_Sidebar.js"></script>
<style src="./_Sidebar.css" scoped></style>