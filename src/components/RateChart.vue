<template>
  <div class="relative h-64 sm:h-80">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import type { HistoryDataPoint } from '@/types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const props = defineProps<{
  points: HistoryDataPoint[]
  base: string
  target: string
}>()

const chartData = computed(() => ({
  labels: props.points.map(p => p.date),
  datasets: [
    {
      label: `${props.base} / ${props.target}`,
      data: props.points.map(p => p.rate),
      borderColor: '#5E6AD2',
      backgroundColor: 'rgba(94,106,210,0.06)',
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 4,
      pointHoverBackgroundColor: '#5E6AD2',
      fill: true,
      tension: 0.4,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0a0a0c',
      borderColor: 'rgba(255,255,255,0.08)',
      borderWidth: 1,
      titleColor: '#8A8F98',
      bodyColor: '#EDEDEF',
      titleFont: { family: 'JetBrains Mono, monospace', size: 11 },
      bodyFont:  { family: 'JetBrains Mono, monospace', size: 13 },
      padding: 10,
      callbacks: {
        label: (ctx: { parsed: { y: number } }) => ` ${ctx.parsed.y.toFixed(4)}`,
      },
    },
  },
  scales: {
    x: {
      grid:  { color: 'rgba(255,255,255,0.04)', drawBorder: false },
      ticks: { color: '#8A8F98', font: { size: 11, family: 'JetBrains Mono, monospace' }, maxTicksLimit: 8 },
      border: { display: false },
    },
    y: {
      grid:  { color: 'rgba(255,255,255,0.04)', drawBorder: false },
      ticks: { color: '#8A8F98', font: { size: 11, family: 'JetBrains Mono, monospace' } },
      border: { display: false },
    },
  },
}
</script>
