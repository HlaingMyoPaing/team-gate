import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import HeaderBar from '@/components/Header.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import { keycloak } from '@/plugins/keycloak'

export default {
  name: "AppLayout",
  components: { HeaderBar, Sidebar },
  setup() {
    // ----- Sidebar / responsive -----
    const open = ref(true);
    const isMobile = ref(false);
    let mq;

    function handleMQ(e) {
      const matches =
        e?.matches ?? window.matchMedia("(max-width: 768px)").matches;
      isMobile.value = matches;
      open.value = matches ? false : true;
    }

    // ----- Theme (global class on <html>) -----
    const saved = localStorage.getItem("theme"); // 'dark' | 'light' | null
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const isDark = ref(saved ? saved === "dark" : prefersDark);

    function applyTheme() {
      const root = document.documentElement;
      root.classList.toggle("theme-dark", isDark.value);
      root.classList.toggle("theme-light", !isDark.value);
      localStorage.setItem("theme", isDark.value ? "dark" : "light");
    }
    function toggleTheme() {
      isDark.value = !isDark.value;
    }

    // ----- Logout confirmation modal -----
    const showLogoutConfirm = ref(false);
    const isLoggingOut = ref(false);
    const modalRef = ref(null);

    function askLogout() {
      showLogoutConfirm.value = true;
      // focus the dialog for accessibility
      nextTick(() => modalRef.value?.focus?.());
    }
    function cancelLogout() {
      showLogoutConfirm.value = false;
    }
    async function confirmLogout() {
      isLoggingOut.value = true;
      try {
        await keycloak.logout({
          redirectUri: window.location.origin + "/login",
        });
      } catch (e) {
        // swallow
      } finally {
        isLoggingOut.value = false;
        showLogoutConfirm.value = false;
      }
    }

    // ----- Infra/service links (adjust per env) -----
    const links = {
      kong: "/kong/",
      grafana: "/grafana/",
    };

    // ----- Lifecycle -----
    onMounted(() => {
      // responsive
      mq = window.matchMedia("(max-width: 768px)");
      handleMQ(mq);
      mq.addEventListener?.("change", handleMQ);

      // theme
      applyTheme();

      // ESC closes modal
      window.addEventListener("keydown", onKey);
    });
    onBeforeUnmount(() => {
      mq?.removeEventListener?.("change", handleMQ);
      window.removeEventListener("keydown", onKey);
    });

    function onKey(e) {
      if (e.key === "Escape" && showLogoutConfirm.value) cancelLogout();
    }

    watch(isDark, applyTheme);

    return {
      // state
      open,
      isMobile,
      showLogoutConfirm,
      isLoggingOut,
      modalRef,
      isDark,

      // methods
      toggleTheme,
      askLogout,
      cancelLogout,
      confirmLogout,

      // links for Sidebar
      links,
    };
  },
};
