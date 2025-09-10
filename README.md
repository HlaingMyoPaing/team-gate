# Vue 3 + Keycloak + Axios + Docker Compose Starter

## Overview
This repository contains a **production-ready Vue 3 application** secured by **Keycloak** using the official Keycloak JavaScript adapter. It is packaged with **Docker Compose** for local development and multi-stage builds for **deployments**.

Key Features:
- 🔑 **SSO Authentication** with Keycloak (silent SSO supported)  
- 🔐 **Role-based UI** (shows *Keycloak Admin* button only for `admin` users)  
- 🌍 **i18n** (English + Japanese included, extensible)  
- 📱 **Responsive Layout** with Bootstrap 5  
- 📦 **Environment-specific builds** (dev/staging/prod)  
- 🐳 **Dockerized** with Node 22 (dev) and NGINX Alpine (prod)  
- ⚡ **Axios interceptor** with bearer tokens  

---

## Architecture
```text
Vue Frontend (Vue 3, Axios, i18n)
   │
   ├── Keycloak Adapter (OIDC, Silent SSO, Role Mapping)
   │
   ├── Axios (Bearer Token → API Gateway / Backend)
   │
   ├── NGINX (Production SPA server)
   │
   └── Docker Compose (Dev: Vue hot reload)
```

---

## Prerequisites
- **Docker** >= 20.x
- **Docker Compose** >= 2.x
- Optional: **Node v22** (if running locally without Docker)

---

## Quick Start

### Development Environment
```bash
docker-compose -f docker-compose.dev.proxy.yml up --build -d
```

### Development Environment re-create
```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.proxy.yml up --force-recreate -d

```
- Frontend: http://host.docker.internal:3001/
- Keycloak Admin Console: http://host.docker.internal:8080/auth (user: `admin` / pass: `admin`)  

#### Configure Keycloak
1. Log into the Keycloak Admin Console.  
2. Create a **Realm**: `demo`  
3. Create a **Client**: `vue-client`  
   - Access Type: `public`  
   - Redirect URIs: `http://localhost:3001/*`  
   - Web Origins: `http://localhost:3001`  
4. Create a **Role**: `admin`  
5. Create a **User** and assign `admin` role if needed.  

---

## Environment Configuration
All environment-specific variables live in `.env.*` files.  

Examples:  

**.env.development**
```ini
VUE_APP_KEYCLOAK_URL=http://localhost:8080
VUE_APP_KEYCLOAK_REALM=myrealm
VUE_APP_KEYCLOAK_CLIENT=myclient
VUE_APP_API_URL=/api
```

**.env.production**
```ini
VUE_APP_KEYCLOAK_URL=https://keycloak.example.com
VUE_APP_KEYCLOAK_REALM=myrealm
VUE_APP_KEYCLOAK_CLIENT=myclient
VUE_APP_API_URL=/api
```

---

## Deployment Guidelines

### Scaling
- **Frontend**: Serve static assets with NGINX. Scale behind a load balancer (e.g., AWS ALB, GCP Load Balancer).  
- **Keycloak**: Run in **HA mode** with Postgres cluster and external cache (Infinispan/Redis).  
- **API Gateway**: Place Kong/NGINX Ingress in front of backend APIs.  

### Security
- Enforce **HTTPS** across all environments.  
- Use **confidential clients** for server-side integrations.  
- Rotate **Keycloak admin credentials**.  
- Enable **OIDC token introspection** for API services.  
- Configure **CSP headers** in NGINX for frontend security.  

### Monitoring & Logging
- Export **Keycloak metrics** to Prometheus/Grafana.  
- Forward logs to ELK/Splunk.  
- Use health checks for NGINX + frontend availability.  

---

## Project Structure
```
docker/nginx/default.conf      # Nginx SPA config
public/silent-check-sso.html   # Required for Keycloak silent SSO
src/plugins/keycloak.js        # Keycloak adapter init
src/axios.js                   # Axios client with token interceptor
src/router/index.js            # Vue Router (guards dashboard)
src/i18n/index.js              # i18n config
src/components/Header.vue      # Header with locale switch
src/views/Home.vue             # Home page (Login button)
src/views/Dashboard.vue        # Dashboard (Admin button + logout)
src/App.vue, src/main.js       # Vue entry point
.env.*                         # Environment files
Dockerfile                     # Multi-stage build
docker-compose.dev.yml         # Dev with Vue+Keycloak+Postgres
docker-compose.prod.yml        # Production build with Nginx
```

---

## Roadmap for Enterprise
- [ ] CI/CD with GitHub Actions / GitLab CI  
- [ ] Kubernetes manifests / Helm chart  
- [ ] Automatic Keycloak realm import via JSON  
- [ ] Integration tests with Cypress + Keycloak test user  
