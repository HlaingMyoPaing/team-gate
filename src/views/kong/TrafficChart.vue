<template><div class='card-body'><Line :data="dataObj" :options="opts" /></div></template>
<script>
import http from '@/http'
import { Line } from 'vue-chartjs'
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js'
Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend)
export default{
  name:'TrafficChart',components:{Line},
  data:()=>({points:[]}),
  computed:{
    dataObj(){return{labels:this.points.map(p=>new Date(p.t).toLocaleTimeString()),datasets:[{label:'Requests/min',data:this.points.map(p=>p.v),fill:false,borderColor:'#3b82f6',tension:.3}]}},
    opts(){return{responsive:true,plugins:{legend:{display:true,position:'bottom'},title:{display:false}},scales:{y:{beginAtZero:true}}}}
  },
  async mounted(){const res=await http.get('/api/traffic');this.points=(res.data?.series?.[0]?.points)||[]}
}
</script>
<style scoped>.card-body{padding:4px}</style>