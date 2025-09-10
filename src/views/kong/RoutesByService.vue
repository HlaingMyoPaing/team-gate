<template><div class='card-body'><Bar :data="dataObj" :options="opts" /></div></template>
<script>
import http from '@/http'
import { Bar } from 'vue-chartjs'
import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default{
  name:'RoutesByService',components:{Bar},
  data:()=>({rows:[]}),
  computed:{
    dataObj(){return{labels:this.rows.map(r=>r.name||r.id),datasets:[{label:'Routes',data:this.rows.map(r=>r.routeCount),backgroundColor:'#6366f1'}]}},
    opts(){return{responsive:true,plugins:{legend:{display:true},title:{display:false}},scales:{y:{beginAtZero:true}}}}
  },
  async mounted(){const res=await http.get('/api/services');this.rows=res.data||[]}
}
</script>
<style scoped>.card-body{padding:4px}</style>