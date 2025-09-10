// JS logic (no TypeScript)
import {
   ref,
   computed,
   onMounted
} from 'vue'
import {
   keycloak
} from '@/plugins/keycloak'

export default {
   name: 'LoginView',
   setup() {
      const loading = ref(true)
      const authed = ref(false)
      const error = ref('')

      const displayName = computed(() =>
         (keycloak.tokenParsed && (keycloak.tokenParsed.name || keycloak.tokenParsed.preferred_username)) || ''
      )

      function login() {
         keycloak.login({
            scope: 'openid profile email',
            redirectUri: window.location.origin + '/dashboard'
         })
      }

      async function trySilent() {
         loading.value = true
         error.value = ''
         try {
            const ok = await keycloak.init({
               onLoad: 'check-sso',
               checkLoginFrame: false,
               silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
            })
            authed.value = !!ok
         } catch (e) {
            error.value = 'Silent SSO failed'
         } finally {
            loading.value = false
         }
      }

      function goDash() {
         window.location.href = '/dashboard'
      }

      async function logout() {
         try {
            await keycloak.logout({
               redirectUri: window.location.origin + '/login'
            })
         } catch (e) {}
      }

      const isDark = ref(
         (typeof localStorage !== 'undefined' && localStorage.getItem('theme') === 'dark') ||
         (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      )
      const theme = computed(() => (isDark.value ? 'theme-dark' : 'theme-light'))

      onMounted(() => {
         authed.value = !!keycloak.authenticated
         loading.value = false
      })

      return {
         // state
         loading,
         authed,
         error,
         displayName,
         theme,
         // actions
         login,
         trySilent,
         goDash,
         logout
      }
   }
}