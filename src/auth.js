import { keycloak } from './plugins/keycloak'

export function hasClientRole(clientId, role) {
  const ra = keycloak?.resourceAccess || {}
  const roles = ra[clientId]?.roles || []
  return roles.includes(role)
}
export function hasAnyClientRole(clientId, roles = []) {
  return roles.some(r => hasClientRole(clientId, r))
}
