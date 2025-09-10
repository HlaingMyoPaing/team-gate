<template>
  <div class="panel">
    <Bar :data="chartData" :options="chartOpts" />
  </div>
</template>

<script>
import axios from 'axios'
import { Bar } from 'vue-chartjs'
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js'
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title)

export default {
  name: 'RateChart',
  components: { Bar },
  data() {
    const http = axios.create({ baseURL: '/' })
    return {
      http,
      points: [],
      refreshMs: 30000,
      _timer: null
    }
  },
  computed: {
    chartData() {
      return { labels: this.points.map(p => new Date(p.t).toLocaleTimeString()), datasets: [ { label: 'Requests per Minute', data: this.points.map(p => p.v) } ] }
    },
    chartOpts() {
      return { responsive: true, plugins: { legend: { display: true }, title: { display: true, text: 'Traffic Rate' } }, scales: { y: { beginAtZero: true } } }
    }
  },
  methods: {
    async load() {
      try {
        const res = await this.http.get('/api/traffic')
        this.points = (res.data?.series?.[0]?.points) || []
      } catch (e) { console.error('Failed to load traffic data', e) }
    },
    startAutoRefresh() { this._timer = setInterval(() => this.load(), this.refreshMs) },
    stopAutoRefresh() { if (this._timer) { clearInterval(this._timer); this._timer = null } }
  },
  async mounted() { await this.load(); this.startAutoRefresh() },
  beforeUnmount() { this.stopAutoRefresh() }
}
</script>

<style scoped>
.panel { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 24px; }
</style>
