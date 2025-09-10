<template>
  <div class="card-body">
    <Bar :data="dataObj" :options="opts" />
  </div>
</template>
<script>
import http from '@/http'
import { Bar } from 'vue-chartjs'
import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default{
  name:'UpstreamHealth',components:{Bar},
  data:()=>({rows:[]}),
  computed:{
    dataObj(){return{labels:this.rows.map(u=>u.name),datasets:[
      {label:'Healthy',data:this.rows.map(u=>u.healthy),backgroundColor:'#10b981'},
      {label:'Unhealthy',data:this.rows.map(u=>u.unhealthy),backgroundColor:'#ef4444'},
      {label:'DNS Error',data:this.rows.map(u=>u.dnsErrored),backgroundColor:'#f59e0b'}
    ]}},
    opts(){return{responsive:true,plugins:{legend:{display:true,position:'bottom'},title:{display:false}},scales:{x:{stacked:true},y:{stacked:true,beginAtZero:true}}}}
  },
  async mounted(){const res=await http.get('/api/upstreams');this.rows=res.data||[]}
}
</script>
<style scoped>.card-body{padding:4px}</style>