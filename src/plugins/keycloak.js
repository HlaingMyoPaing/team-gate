import Keycloak from 'keycloak-js'

// Use Vue-CLI envs (VUE_APP_*). (Vite vars are read if present.)
const KC_URL = process.env.VUE_APP_KEYCLOAK_URL || import.meta?.env?.VITE_KEYCLOAK_URL
const KC_REALM = process.env.VUE_APP_KEYCLOAK_REALM || import.meta?.env?.VITE_KEYCLOAK_REALM
const KC_CLIENT = process.env.VUE_APP_KEYCLOAK_CLIENT || import.meta?.env?.VITE_KEYCLOAK_CLIENT

export const keycloak = new Keycloak({
   url: KC_URL,
   realm: KC_REALM,
   clientId: KC_CLIENT
})

export async function initKeycloak() {
   try {
      const ok = await keycloak.init({
         onLoad: 'check-sso', // or 'login-required'
         checkLoginIframe: false,
         silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
      })
      return ok
   } catch (err) {
      console.error('Keycloak init failed:', err)
      return false
   }
}