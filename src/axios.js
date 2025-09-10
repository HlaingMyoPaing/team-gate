import axios from 'axios'
import { keycloak } from './plugins/keycloak'

const api = axios.create({
  baseURL: '/api'
})

// Attach bearer token if available
api.interceptors.request.use((config) => {
  if (keycloak && keycloak.token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${keycloak.token}`
  }
  return config
})

export default api
