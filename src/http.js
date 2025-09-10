import axios from 'axios'
import { keycloak } from './plugins/keycloak'

const http = axios.create({ baseURL: 'http://localhost:8085' })

http.interceptors.request.use(async (cfg) => {
  await keycloak.updateToken(60).catch(() => keycloak.login())
  cfg.headers = cfg.headers || {}
  cfg.headers.Authorization = `Bearer ${keycloak.token}`
  return cfg
})

export default http
