<template>
  <div class="dash">
    <header class="hdr"><div><div class="title">API Gateway Dashboard</div></div></header>
    <section class="row"><div class="card"><StatsTiles :stats="inventory" /></div></section>
    <section class="grid">
      <div class="card"><h3 class="card-title">Routes by Service</h3><RoutesByService /></div>
      <div class="card"><h3 class="card-title">Upstream Targets Health</h3><UpstreamHealth /></div>
      <div class="card -span2"><h3 class="card-title">Traffic Rate</h3><TrafficChart /></div>
      <div class="card -span2"><h3 class="card-title">Top 10 Services by Routes</h3><TopTenServices /></div>
    </section>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import http from '@/http'
import StatsTiles from '@/components/StatsTiles.vue'
import RoutesByService from '@/components/RoutesByService.vue'
import UpstreamHealth from '@/components/UpstreamHealth.vue'
import TrafficChart from '@/components/TrafficChart.vue'
import TopTenServices from '@/components/TopTenServices.vue'
export default{
  name:'DashboardView',
  components:{StatsTiles,RoutesByService,UpstreamHealth,TrafficChart,TopTenServices},
  setup(){
    const inventory=ref({services:0,routes:0,upstreams:0})
    onMounted(async()=>{try{const {data}=await http.get('/inventory');inventory.value=data||inventory.value}catch{}})
    return {inventory}
  }
}
</script>
<style scoped>
.dash{padding:20px;background:var(--bg);color:var(--text)}
.hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px}
.title{font-size:20px;font-weight:700}
.row{display:grid;grid-template-columns:1fr;gap:16px;margin-bottom:16px}
.grid{display:grid;gap:16px;grid-template-columns:repeat(2,minmax(0,1fr))}
@media (max-width:980px){.grid{grid-template-columns:1fr}}
.card{background:var(--panel-bg);border:1px solid var(--panel-border);border-radius:12px;padding:14px}
.card.-span2{grid-column:span 2}
.card-title{margin:0 0 10px;font-size:14px;font-weight:600;opacity:.85}
</style>