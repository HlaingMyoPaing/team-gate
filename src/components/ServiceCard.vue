<template>
    <article class="card" @click="onOpen">
    <div class="icon">{{ icon }}</div>
    <div class="meta">
        <h3>{{ title }}</h3>
        <p class="muted">{{ subtitle }}</p>
    </div>
    <div class="chev">→</div>
    </article>
</template>

<script setup >
    const props = defineProps({
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String,
            default: ''
        },
        href: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            default: '🔗'
        }
    })

function onOpen() {
    window.location.href = props.href
}
 </script>

<style scoped>
.card {
	display: grid;
	grid-template-columns: 56px 1fr 24px;
	align-items: center;
	gap: .9rem;
	padding: 1rem;
	background: var(--card);
	border: 1px solid color-mix(in srgb, var(--muted) 14%, transparent);
	border-radius: 16px;
	box-shadow: var(--shadow);
	cursor: pointer;
	transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
}

.card:hover {
	transform: translateY(-2px);
	box-shadow: 0 14px 40px rgba(2, 8, 23, 0.10);
	border-color: color-mix(in srgb, var(--primary) 30%, transparent);
}

.icon {
	font-size: 1.4rem;
	width: 56px;
	height: 56px;
	border-radius: 12px;
	display: grid;
	place-items: center;
	background: color-mix(in srgb, var(--primary) 10%, transparent);
	color: var(--primary);
}

.meta h3 {
	margin: 0 0 .2rem;
	font-size: 1.05rem;
}

.meta .muted {
	margin: 0;
	color: var(--muted);
}

.chev {
	font-size: 1.4rem;
	color: var(--muted);
}

</style>