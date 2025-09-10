import { ref, computed,	onMounted,	onBeforeUnmount } from 'vue'
import { keycloak } from '@/plugins/keycloak'
import axios from 'axios'

export default {
	name: 'DashboardView',
	props: {
		links: {
			type: Object,
			default: () => ({
				kong: process.env.VUE_APP_KONG_ADMIN_GUI_URL,
				grafana: process.env.VUE_APP_GRAFANA_URL,
				zabbix: process.env.VUE_APP_ZABBIX_URL
			})
		}
	},
	setup(props) {
		// ----- theme -----
		const theme = computed(() =>
			(isDark.value ? 'theme-dark' : 'theme-light')
		)
		// ----- user info (existing) -----
		const displayName = computed(() =>
			(keycloak.tokenParsed && (keycloak.tokenParsed.name || keycloak.tokenParsed.preferred_username)) || 'User'
		)
		const email = computed(() => (keycloak.tokenParsed && keycloak.tokenParsed.email) || '')
		const roles = computed(() => {
			const realm = (keycloak.realmAccess?.roles) || []
			const cid = keycloak.clientId
			const client = (keycloak.resourceAccess?.[cid]?.roles) || []
			return Array.from(new Set([...realm, ...client])).slice(0, 8)
		})
		const initials = computed(() => {
			const parts = String(displayName.value).trim().split(' ').filter(Boolean)
			return (parts[0]?.[0] || 'U') + (parts[1]?.[0] || '')
		})

		// ----- expiry countdown + alert -----
		const isRefreshing = ref(false)
		const timeLeft = ref('') // e.g. "3m 12s"
		const showExpiryAlert = ref(false) // banner visibility
		const alertThresholdSec = 120 // warn when < 2 minutes
		let timer
		function updateTimeLeft() {
		    console.log("keycloak token")
            console.log(keycloak.token)
			const expSec = keycloak.tokenParsed?.exp ? keycloak.tokenParsed.exp : 0
			const nowSec = Math.floor(Date.now() / 1000)
			const remaining = Math.max(0, expSec - nowSec)

			// humanize for the UI
			const m = Math.floor(remaining / 60)
			const s = remaining % 60
			timeLeft.value = (m ? `${m}m ` : '') + `${s}s`

			// show or hide the alert
			showExpiryAlert.value = remaining > 0 && remaining <= alertThresholdSec

			// stop timer if expired (optional)
			if (remaining === 0) {
				clearInterval(timer)
			}
		}

       async function refreshToken() {
       	// Hide optimistically for instant UX
       	showExpiryAlert.value = false
       	isRefreshing.value = true
       	try {
       		// Ensure we end up ABOVE the alert threshold after refresh
       		const minValidity = alertThresholdSec + 60 // 180s
       		const refreshed = await keycloak.updateToken(minValidity)

       		// Recompute now (tokenParsed.exp should be updated by Keycloak)
       		updateTimeLeft()

       		// If for some reason still under threshold, re-show the banner
       		// (e.g., IdP didn’t refresh, clock skew, etc.)
       		const expSec = keycloak.tokenParsed?.exp || 0
       		const nowSec = Math.floor(Date.now() / 1000)
       		const remaining = Math.max(0, expSec - nowSec)
       		if (remaining > 0 && remaining <= alertThresholdSec) {
       			showExpiryAlert.value = true
       		}
       	} catch (e) {
       		// Refresh failed -> logout
       		try {
       			await keycloak.logout({
       				redirectUri: window.location.origin + '/login'
       			})
       		} catch {}
       	} finally {
       		isRefreshing.value = false
       	}
       }

		onMounted(() => {
			updateTimeLeft();
			timer = setInterval(updateTimeLeft, 1000)
		})
		onBeforeUnmount(() => clearInterval(timer))

		// ----- services (existing) -----
		const services = computed(() => ([{
				title: 'Konga (Kong Admin GUI)',
				subtitle: 'Admin / Dev Portal',
				href: props.links.kong,
				icon: '🦍',
				iconSrc: require('@/assets/icons/kong.svg'),
				badgeBg: ''
			},
			{
				title: 'Grafana',
				subtitle: 'Observability',
				href: props.links.grafana,
				icon: '📊',
				iconSrc: require('@/assets/icons/grafana.svg'),
				badgeBg: ''
			},
			{
				title: 'Zabbix',
				subtitle: 'Monitoring',
				href: props.links.zabbix,
				icon: '📈',
				iconSrc: require('@/assets/icons/zabbix.svg'),
				badgeBg: ''
			}
		])) //badgeBg: 'linear-gradient(135deg,#e11d48,#be123c)'

		function open(href) {
			//window.location.href = href
			window.open(href,'_blank')
		}

		const accountUrl = computed(() => {
			const base = (keycloak.authServerUrl || '').replace(/\/$/, '')
			return `${base}/realms/${keycloak.realm}/account/`
		})

		return {
		    theme,
			displayName,
			email,
			roles,
			initials,
			timeLeft,
			showExpiryAlert,
			refreshToken,
			isRefreshing,
			services,
			open,
			accountUrl
		}
	}
}