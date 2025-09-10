<template>
    <div class="layout">
        <HeaderBar
        @toggleSidebar="open = !open"
        @toggleTheme="toggleTheme"
        @logout="askLogout"
        />
        <div class="layout-body">
            <Sidebar v-model:open="open" :links="links" />
            <!-- Backdrop for mobile drawer -->
            <div v-if="isMobile && open"  class="backdrop" @click="open = false"  aria-hidden="true" />
            <main class="layout-content" :aria-hidden="isMobile && open">
                <router-view />
            </main>
        </div>
        <footer class="layout-footer">
            <small>© 2025 NTT DATA NEWSON CORPORATION</small>
        </footer>
        <!-- Logout Confirm Modal -->
        <div v-if="showLogoutConfirm" class="tg-modal-backdrop" @click.self="cancelLogout">
        <div class="tg-modal" role="dialog" aria-modal="true" aria-labelledby="logout-title">
            <h3 id="logout-title">Confirm logout</h3>
            <p class="muted">You’re about to sign out of your session.</p>
            <div class="tg-modal-actions">
                <button class="m-btn m-btn--secondary" @click="cancelLogout">Cancel</button>
            <button class="m-btn m-btn--danger" :disabled="isLoggingOut" @click="confirmLogout">
            {{ isLoggingOut ? 'Signing out…' : 'Log out' }}
        </button>
    </div>
</div>
        </div>
        </div>
        </template>

<script src="./_layout.js" lang="js"></script>
<style src="./_layout.css" lang="css" scoped></style>
