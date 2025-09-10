import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import KongDashboard from '../views/KongDashboard.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import Layout from '../components/layout/Layout.vue'
import { keycloak } from '../plugins/keycloak'
import Login from '../views/login/Login.vue'

const routes = [
{ path: '/login', name:'login', component: Login },
{
	path: '/',
	component: Layout,
	children: [{
			path: '',
			name: 'KongDashboard',
			component: KongDashboard,
			meta: { requiresAuth: true }
		},
		{
		 path: 'dashboard',
		 name: 'Dashboard',
		 component: Dashboard,
		 meta: { requiresAuth: true }

		}
		// ထပ်ပြီး pages => Kong, Grafana, Zabbix routes
		// { path: '/grafana', component: GrafanaView }
	]
}]

const router = createRouter({
  history: createWebHistory('/my-vue/'),
  routes
})

const logout = () => {
  if (keycloak) {
    keycloak.logout({
      redirectUri: window.location.href, // Redirect to the current page
      idToken: keycloak.token,            // Include the ID token for more control (optional)
    });
  }
}

// Route guard
   router.beforeEach((to) => {
      if (to.meta.requiresAuth && !keycloak.authenticated) {
      return { name: 'login' }
     }
  })

export default router
