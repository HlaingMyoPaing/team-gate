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
import StatsTiles from '@/views/kong/StatsTiles.vue'
import RoutesByService from '@/views/kong/RoutesByService.vue'
import UpstreamHealth from '@/views/kong/UpstreamHealth.vue'
import TrafficChart from '@/views/kong/TrafficChart.vue'
import TopTenServices from '@/views/kong/TopTenServices.vue'
export default{
  name:'DashboardView',
  components:{StatsTiles,RoutesByService,UpstreamHealth,TrafficChart,TopTenServices},
  setup(){
    const inventory=ref({services:0,routes:0,upstreams:0})
    onMounted(async()=>{try{const {data}=await http.get('/api/inventory');inventory.value=data||inventory.value}catch{}})
    return {inventory}
  }
}
</script>
<style scoped>

.hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px}
/* Shell: sidebar + content */
.app{
display:grid;
grid-template-columns: 240px minmax(0,1fr);
min-height:100vh;
}
.sidebar{overflow:auto;}
.content{width:100%; max-width:none; overflow:auto;}

/* Dashboard area */
.dash{padding:24px; box-sizing:border-box;background:var(--bg);color:var(--text)}
.grid{
display:grid;
grid-template-columns: repeat(12, minmax(0,1fr));
gap:16px;
}
.card{
grid-column: span 4;
background: var(--panel-bg); /* uses your existing theme vars */
border: 1px solid var(--panel-border); /* uses your existing theme vars */
border-radius: 10px;
padding:16px;
box-sizing:border-box;
}
.card-title{margin:0 0 8px 0; font-weight:600;}
.span2{grid-column: span 8;}
.chart{height:340px;}

/* Responsive collapse */
@media (max-width: 1200px){
.card, .span2{ grid-column: span 12; }
.chart{ height:300px; }
}
@media (max-width: 768px){
.dash{ padding:12px; }
.card{ padding:12px; }
.chart{ height:220px; }
}
</style>