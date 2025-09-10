import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router";

import { keycloak, initKeycloak } from "./plugins/keycloak"; // <-- correct names

// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@/assets/theme.css";

async function bootstrap() {
  // 1) Initialize Keycloak first (check-sso with silent page)
  await initKeycloak(); // resolves true/false; app can still mount either way

  // 2) Create app and register plugins
  const app = createApp(App);
  app.use(router);
  app.use(i18n);

  // 3) Make keycloak available everywhere
  app.provide("keycloak", keycloak); // for inject('keycloak')
  app.config.globalProperties.$keycloak = keycloak; // for this.$keycloak (Options API)

  // 4) Mount
  app.mount("#app");
}

bootstrap();
