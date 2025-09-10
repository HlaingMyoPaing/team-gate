<template>
  <div class="container py-4">
      <!-- Show Agreement Modal if not agreed yet -->
      <AgreementModal v-if="isAuth && hasAgreed === null" />
    <div class="mt-4 d-flex flex-column align-items-center text-center">
      <p v-if="!isAuth" class="text-muted">Silent SSO is attempted automatically. If you're not logged in, click below.</p>
      <button v-if="!isAuth" class="btn btn-primary btn-lg" @click="login">
         <span class="icon">🔑</span> {{ $t('login') }}
      </button>
      <router-link v-else class="btn btn-success btn-lg" to="/dashboard">
        {{ $t('dashboard') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import Header from '../components/Header.vue'
import AgreementModal from '../components/AgreementModal.vue'

const keycloak = inject('keycloak')
const isAuth = computed(() => !!keycloak?.authenticated)
const login = () => keycloak.login()
// Check if the user has agreed (from localStorage)
const hasAgreed = localStorage.getItem('hasAgreed')
</script>
