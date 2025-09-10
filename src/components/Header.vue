<template>
    <header class="header">
        <div class="brand">
            <!-- Sidebar toggle -->
            <button class="icon-btn" @click="$emit('toggleSidebar')" aria-label="Toggle sidebar">☰</button>
        <div class="logo">🔐</div>
        <h2 class="app-name">TeamGate</h2>
    </div>
    <div class="actions">
        <!-- Language selector -->
        <select v-model="$i18n.locale" class="lang-select">
            <option value="en">English</option>
            <option value="ja">日本語</option>
        </select>
        <!-- Theme toggle -->
        <button class="icon-btn" @click="$emit('toggleTheme')" aria-label="Toggle theme">🌓</button>
    <!-- Logout button -->
    <button class="btn danger" @click="$emit('logout')">Logout</button>
        </div>
        </header>
        </template>

<script>
export default {
name: 'HeaderBar',
emits: ['toggleSidebar', 'toggleTheme', 'logout'],
watch: {
'$i18n.locale'(val) {
localStorage.setItem('locale', val) // persist language choice
}
}
}
</script>

<style scoped>
.header{
position: sticky; top: 0; z-index: 10;
display:flex; align-items:center; justify-content:space-between; gap:1rem;
padding:.75rem 1.25rem;
background: color-mix(in srgb, var(--card) 92%, transparent);
border-bottom:1px solid color-mix(in srgb, var(--muted) 20%, transparent);
backdrop-filter: blur(8px);
}

.brand{ display:flex; align-items:center; gap:.75rem; }
.logo{
width:36px; height:36px; border-radius:10px;
display:grid; place-items:center;
background:var(--primary); color:#fff; font-size:1.1rem; box-shadow:var(--shadow);
}
.app-name{ margin:0; font-size:1.1rem; font-weight:700; color:var(--text); }

.actions{ display:flex; align-items:center; gap:.5rem; }

.icon-btn{
border:1px solid color-mix(in srgb, var(--muted) 22%, transparent);
background: color-mix(in srgb, var(--card) 70%, transparent);
color: var(--text);
border-radius:8px; padding:.35rem .55rem; cursor:pointer;
}
.icon-btn:focus{ outline:2px solid var(--ring); }

.lang-select{
background: color-mix(in srgb, var(--card) 70%, transparent);
color: var(--text);
border:1px solid color-mix(in srgb, var(--muted) 22%, transparent);
border-radius:8px; padding:.25rem .5rem; min-width:110px;
}
.lang-select:focus{ outline:2px solid var(--ring); }

.btn.danger{
border:none; border-radius:8px; padding:.4rem .8rem;
background:linear-gradient(135deg,#e11d48,#be123c); color:#fff; font-weight:600;
cursor:pointer; box-shadow:var(--shadow);
}
.btn.danger:hover{ opacity:.9; }
</style>