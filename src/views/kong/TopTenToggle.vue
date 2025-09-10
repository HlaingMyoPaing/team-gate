<template>
  <div class="panel">
    <div class="toolbar">
      <div class="tabs">
        <button :class="['tab', mode==='services' && 'active']" @click="mode='services'">Services · Routes</button>
        <button :class="['tab', mode==='upstreams' && 'active']" @click="mode='upstreams'">Upstreams · Health</button>
      </div>
      <label class="n-wrap">Top <select v-model.number="topN"><option v-for="n in [5,10,15,20]" :key="n" :value="n">{{n}}</option></select></label>
    </div>
    <Bar v-if="!loading" :data="chartData" :options="chartOpts" />
    <div v-else class="loading">Loading…</div>
    <div v-if="err" class="error">Error: {{err}}</div>
  </div>
</template>
<script>
import { Bar } from 'vue-chartjs'
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js'
import http from '@/http'
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)
export default {
  name:'TopTenToggle',
  components:{Bar},
  data(){return{mode:'services',topN:10,services:[],upstreams:[],loading:true,err:''}},
  computed:{
    chartData(){
      if(this.mode==='services'){
        const rows=[...this.services].sort((a,b)=>b.routeCount-a.routeCount).slice(0,this.topN)
        return{labels:rows.map(r=>r.name||r.id),datasets:[{label:'Routes',data:rows.map(r=>r.routeCount)}]}
      } else {
        const rows=[...this.upstreams].sort((a,b)=>b.targetCount-a.targetCount).slice(0,this.topN)
        return{labels:rows.map(r=>r.name),datasets:[
          {label:'Healthy',data:rows.map(r=>r.healthy)},
          {label:'Unhealthy',data:rows.map(r=>r.unhealthy)},
          {label:'DNS Error',data:rows.map(r=>r.dnsErrored)}]}
      }
    },
    chartOpts(){
      const title=this.mode==='services'?`Top ${this.topN} Services by Routes`:`Top ${this.topN} Upstreams · Targets Health`
      const stacked=this.mode==='upstreams'
      return{responsive:true,plugins:{title:{display:true,text:title}},scales:{x:{stacked},y:{stacked,beginAtZero:true}}}
    }
  },
  async mounted(){
    try{this.loading=true;const[svc,ups]=await Promise.all([http.get('/api/services'),http.get('/api/upstreams')]);this.services=svc.data||[];this.upstreams=ups.data||[]}catch(e){this.err=e?.response?.statusText||e?.message||'Request failed'}finally{this.loading=false}}
}
</script>
<style scoped>.panel{background:var(--panel-bg);border:1px solid var(--panel-border);border-radius:8px;padding:12px;margin-bottom:24px;color:var(--text);} .toolbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;gap:12px;flex-wrap:wrap;} .tabs{display:flex;gap:6px;} .tab{border:1px solid var(--panel-border);background:var(--panel-bg);color:var(--text);padding:6px 10px;border-radius:6px;cursor:pointer;} .tab.active{background:var(--accent);color:#fff;border-color:var(--accent);} .n-wrap{display:flex;align-items:center;gap:6px;font-size:14px;color:var(--muted);} .loading{padding:16px;color:var(--muted);} .error{margin-top:8px;color:var(--error);}</style>
