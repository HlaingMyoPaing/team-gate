import {
   computed,
   onMounted,
   onBeforeUnmount
} from 'vue'

export default {
   name: 'Sidebar',
   props: {
      open: {
         type: Boolean,
         default: true
      }, // v-model:open
      links: {
         type: Object,
         default: () => ({
            kong: '/xxx/',
            grafana: '/xx/',
            zabbix: '/test/'
         })
      }
   },
   emits: ['update:open'],
   setup(props, {
      emit
   }) {
      // v-model bridge
      const open = computed({
         get: () => props.open,
         set: v => emit('update:open', v)
      })

      // open external (or internal) links
      function go(href) {
         window.location.href = href
      }

      // close drawer on ESC
      function onKey(e) {
         if (e.key === 'Escape') open.value = false
      }
      onMounted(() => window.addEventListener('keydown', onKey))
      onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

      return {
         open,
         go
      }
   }
}