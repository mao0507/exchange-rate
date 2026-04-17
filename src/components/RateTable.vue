<template>
  <div
    ref="tableRef"
    class="relative bg-bg-elevated rounded-xl border border-white/[0.06] overflow-hidden shadow-card transition-shadow duration-300 hover:shadow-card-hover backdrop-blur-sm"
    :style="{ ...spotlightStyle }"
    @mousemove="onMouseMove"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- Spotlight overlay -->
    <div
      class="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300 z-0"
      style="background: radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(94,106,210,0.08), transparent 70%);
             opacity: var(--spotlight-opacity, 0)"
    />

    <table class="relative z-10 w-full text-sm">
      <thead>
        <tr class="border-b border-white/[0.06]">
          <th class="px-5 py-3 text-left text-xs font-mono tracking-widest text-fg-muted uppercase">代碼</th>
          <th class="px-5 py-3 text-left text-xs font-mono tracking-widest text-fg-muted uppercase">名稱</th>
          <th class="px-5 py-3 text-right text-xs font-mono tracking-widest text-fg-muted uppercase">匯率</th>
          <th class="px-5 py-3 text-center text-xs font-mono tracking-widest text-fg-muted uppercase hidden sm:table-cell">走勢</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="rate in rates"
          :key="rate.code"
          class="border-b border-white/[0.04] last:border-0
                 hover:bg-white/[0.03] transition-colors duration-150 cursor-pointer group"
          @click="$emit('select', rate.code)"
        >
          <td class="px-5 py-3.5">
            <span class="font-mono font-medium text-accent group-hover:text-accent-bright transition-colors">
              {{ rate.code }}
            </span>
          </td>
          <td class="px-5 py-3.5 text-fg-muted">{{ rate.name }}</td>
          <td class="px-5 py-3.5 text-right font-mono text-fg">{{ formatRate(rate.rate) }}</td>
          <td class="px-5 py-3.5 text-center hidden sm:table-cell">
            <span class="text-fg-muted/40 group-hover:text-accent/60 transition-colors text-xs">📈</span>
          </td>
        </tr>
        <tr v-if="rates.length === 0">
          <td colspan="4" class="px-5 py-12 text-center text-fg-muted text-sm">無符合結果</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ExchangeRate } from '@/types'
import { useSpotlight } from '@/composables/useSpotlight'

defineProps<{ rates: ExchangeRate[] }>()
defineEmits<{ select: [code: string] }>()

const tableRef = ref<HTMLElement | null>(null)
const { spotlightStyle, onMouseMove, onMouseEnter, onMouseLeave } = useSpotlight(tableRef)

function formatRate(rate: number): string {
  if (rate >= 100) return rate.toFixed(2)
  if (rate >= 1)   return rate.toFixed(4)
  return rate.toFixed(6)
}
</script>
