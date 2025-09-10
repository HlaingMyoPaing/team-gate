<template>
    <div class="probe">
        <div class="row">
            <select v-model="method">
                <option>GET</option>
                <option>POST</option>
            </select>
            <input v-model="path" placeholder="/inventory" />
            <button @click="call" :disabled="loading">
            {{ loading ? 'Testing...' : 'Test API' }}
        </button>
    </div>

    <div class="info">
        <div><b>Request URL:</b> {{ baseURL + (path.startsWith('/') ? path : '/' + path) }}</div>
        <div><b>Auth header:</b> {{ hasToken ? 'Bearer <present>' : '(none)' }}</div>
    </div>

    <div v-if="status !== null" class="status">
        <b>Status:</b> {{ status }}
    </div>

    <pre v-if="data" class="ok">{{ data }}</pre>
    <pre v-else-if="error" class="err">{{ error }}</pre>
</div>
        </template>

<script>
import http from '@/http' // adjust path if different

export default {
name: 'ApiProbe',
data: () => ({
method: 'GET',
path: '/inventory', // change to your simplest endpoint, e.g. /inventory
status: null,
data: '',
error: '',
loading: false,
baseURL: '/api',
}),
computed: {
hasToken() {
return !!(window.keycloak && window.keycloak.token)
}
},
methods: {
async call() {
this.loading = true
this.status = null
this.data = ''
this.error = ''
try {
const url = this.path.startsWith('/') ? this.path : `/${this.path}`
const res = await http.request({ url, method: this.method })
this.status = res.status
this.data = JSON.stringify(res.data, null, 2)
} catch (e) {
this.status = e.response?.status ?? 'NETWORK/JS ERROR'
const body = e.response?.data ? JSON.stringify(e.response.data, null, 2) : ''
const msg = e.message || ''
this.error = `Message: ${msg}\n${body}`
} finally {
this.loading = false
}
}
}
}
</script>

<style scoped>
.probe { background: var(--panel-bg, #fff); border: 1px solid var(--panel-border, #e5e7eb); border-radius: 8px; padding: 12px; }
.row { display:flex; gap:8px; align-items:center; margin-bottom:8px; }
.row input { flex:1; padding:6px 8px; border:1px solid var(--panel-border,#e5e7eb); border-radius:6px; }
.row select, .row button { padding:6px 8px; }
.info { font-size:12px; opacity:.8; margin-bottom:8px; }
.status { margin:8px 0; }
.ok { background:#0f172a10; padding:8px; border-radius:6px; overflow:auto; }
.err { background:#ef444410; padding:8px; border-radius:6px; color:#b91c1c; white-space:pre-wrap; }
</style>