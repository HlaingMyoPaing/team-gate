<template>
  <div class="tiles">
    <div class="tile"><div class="label">Services</div><div class="value">{{ data.services }}</div></div>
    <div class="tile"><div class="label">Routes</div><div class="value">{{ data.routes }}</div></div>
    <div class="tile"><div class="label">Upstreams</div><div class="value">{{ data.upstreams }}</div></div>
  </div>
</template>

<script>
import http from '@/http'
export default {
  name: 'InventoryTiles',
  data: () => ({ data: { services: 0, routes: 0, upstreams: 0 } }),
  async mounted() { this.data = (await http.get('/api/inventory')).data }
}
</script>

<style scoped>
.tiles { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:24px; }
.tile { background: var(--tile-bg); border:1px solid var(--tile-border); border-radius:8px; padding:16px; }
.label { font-size:12px; color: var(--muted); }
.value { font-size:28px; font-weight:700; margin-top:4px; color: var(--text); }
</style>
