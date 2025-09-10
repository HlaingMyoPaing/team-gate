<template>
  <div class="card-body">
    <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
    <div v-else class="empty">No data</div>
  </div>
</template>
<script>
import http from '@/http'
import { Bar } from 'vue-chartjs'
import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
  name:'TopTenServices',
  components:{ Bar },
  data:()=>({ chartData:null }),
  computed:{
    chartOptions(){ return { responsive:true, plugins:{ legend:{display:false}, title:{display:false}}, scales:{ y:{beginAtZero:true}} } }
  },
  async mounted(){
    try{
      const res = await http.get('/api/routes-by-service')
      const entries = Object.entries(res.data||{}).sort((a,b)=>b[1]-a[1]).slice(0,10)
      this.chartData = { labels: entries.map(([n])=>n), datasets:[{label:'Routes', data: entries.map(([,v])=>v), backgroundColor:'#3b82f6'}] }
    }catch(e){ console.error('TopTenServices failed', e) }
  }
}
</script>
<style scoped>
.card-body{padding:4px}.empty{padding:8px;color:var(--muted)}
</style>