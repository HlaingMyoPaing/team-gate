<template>
    <div class="tiles">
        <div class="tile">
            <div class="count">{{ stats.services }}</div>
            <div class="label">Services</div>
        </div>
        <div class="tile">
            <div class="count">{{ stats.routes }}</div>
            <div class="label">Routes</div>
        </div>
        <div class="tile">
            <div class="count">{{ stats.upstreams }}</div>
            <div class="label">Upstreams</div>
        </div>
    </div>
</template>

<script setup>
defineProps({ stats: { type: Object, default: () => ({ services:0, routes:0, upstreams:0 }) } })
</script>

<style scoped>
.tiles { display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; }
.tile {
background: var(--tile-bg, var(--panel-bg));
border: 1px solid var(--tile-border, var(--panel-border));
border-radius: 10px;
padding: 16px;
text-align: center;
box-shadow: 0 1px 2px rgba(0,0,0,.04);
}
.count { font-size: 28px; font-weight: 800; line-height: 1; margin-bottom: 4px; }
.label { font-size: 12px; color: var(--muted, #6b7280); text-transform: uppercase; letter-spacing: .06em; }
@media (max-width: 640px) { .tiles { grid-template-columns: 1fr; } }
</style>