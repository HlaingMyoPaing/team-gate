<template>
    <div class="login-page" :class="theme">
        <main class="container">
        <section class="card">
            <h1 class="title">Sign in</h1>
            <p class="muted">Single Sign-On via Keycloak</p>

            <div v-if="loading" class="state">
                <div class="spinner"></div>
                <span>Checking session…</span>
            </div>
          <div v-else class="actions">
            <button class="btn primary" @click="login"><span class="icon">🔑</span> {{ $t('login') }}</button>
        </div>

<p class="powered">Powered by Keycloak JS Adapter</p>
<p v-if="error" class="error">{{ error }}</p>
        </section>
        </main>
        </div>
        </template>

        <!-- Import logic & styles from split files -->
<script src="./_Login.js"></script>
<style src="./_Login.css" scoped></style>
