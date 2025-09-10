import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    welcome: 'Welcome',
    appName: 'TeamGate',
    login: 'Sign in with Keycloak',
    logout: 'Logout',
    home: 'Kong Dashboard',
    dashboard: 'Services',
    profile: 'Profile',
    open: 'OPEN',
    keycloakAdmin: 'Keycloak',
    keycloakAdminDescription: 'Manage group,user,roles...',
    GrafanaAdmin: 'Grafana',
    GrafanaAdminDescription: 'Visualize your metrics',
    zabbixAdmin: 'Zabbix',
    zabbixAdminDescription: 'Powered by Zabbix ',
    kongAdmin: 'Kong Manager',
    kongAdminDescription: 'Manage services,routes,plugin..'
  },
  ja: {
    welcome: 'ようこそ',
    appName: 'チームゲート',
    login: 'Keycloakでログイン',
    logout: 'ログアウト',
    home: 'KONG-ダッシュボード',
    dashboard: 'サービス',
    profile: 'プロフィール',
    open: '開く',
    keycloakAdmin: 'Keycloak管理',
    keycloakAdminDescription: 'keycloakAdminDescription',
    GrafanaAdmin: 'Grafana管理',
    GrafanaAdminDescription: 'GrafanaAdminDescription',
    zabbixAdmin: 'zabbix管理',
    zabbixAdminDescription: 'zabbixAdminDescription',
    kongAdmin: 'kongAdmin',
    kongAdminDescription: 'kongAdminDescription'

  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

export default i18n
