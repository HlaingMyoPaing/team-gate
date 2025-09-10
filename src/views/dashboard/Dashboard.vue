<template>
    <div class="dashboard" >

       <!-- 🔔 Expiry alert banner -->
        <div v-if="showExpiryAlert"
                class="alert alert-warning"
                role="alert"
                aria-live="assertive">
            <strong>Token expiring soon.</strong>
            Your token will expire in <b>{{ timeLeft }}</b>.
            <button class="btn btn-refresh" @click="refreshToken" :disabled="isRefreshing">
                  {{ isRefreshing ? 'Refreshing…' : 'Refresh session' }}
            </button>
       </div>
        <!-- Profile -->
        <section class="section">
            <h3 class="section-title">Your account</h3>
            <article class="profile">
                <div class="avatar" :title="displayName">{{ initials }}</div>
                <div>
                    <h2 class="name">{{ displayName }}</h2>
                    <p class="email">{{ email }}</p>

                    <div class="chips" v-if="roles.length">
                        <span v-for="r in roles" :key="r" class="chip">{{ r }}</span>
                    </div>

                    <div class="status">
                        <span class="dot"></span>
                        <span>Authenticated via Keycloak</span>
                        <span class="sep">•</span>
                        <span> Access Token expires in {{ timeLeft }}</span>
                        <a class="manage" :href="accountUrl" target="_blank" rel="noopener">Manage profile</a>
                    </div>
                </div>
            </article>
        </section>

        <!-- Services -->
        <section class="section">
        <h3 class="section-title">Available services</h3>
        <div class="grid">
            <a v-for="s in services" :key="s.title" class="card" :href="s.href" target="_blank" @click.prevent="open(s.href)" rel="noopener">
            <div class="icon" :style="{ background: s.badgeBg }">
                <span v-if="!s.iconSrc">{{ s.icon }}</span>
                <img v-else :src="s.iconSrc" alt="" />
            </div>
            <div class="meta">
                <h4 class="card-title">{{ s.title }}</h4>
                <p class="muted">{{ s.subtitle }}</p>
            </div>
            <div class="chev">→</div>
        </a>
    </div>
</section>
        </div>
        </template>

        <!-- pull split logic & styles -->
<script src="./_Dashboard.js" lang="js"></script>
<style src="./_Dashboard.css" lang="css" scoped></style>
