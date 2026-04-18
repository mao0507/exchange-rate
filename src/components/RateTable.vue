<template>
  <div
    ref="tableRef"
    class="relative bg-bg-elevated rounded-2xl border border-white/[0.06] overflow-hidden shadow-card transition-shadow duration-300 hover:shadow-card-hover backdrop-blur-sm"
    :style="!isMobile ? { ...spotlightStyle } : {}"
    @mousemove="onMouseMoveWrapped"
    @mouseenter="onMouseEnterWrapped"
    @mouseleave="onMouseLeaveWrapped"
  >
    <div
      v-if="!isMobile"
      class="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-0"
      style="background: radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(94,106,210,0.08), transparent 70%);
             opacity: var(--spotlight-opacity, 0)"
    />

    <!-- 手機：card list -->
    <div v-if="isMobile" class="relative z-10 flex flex-col gap-2 p-3">
      <button
        v-for="rate in rates"
        :key="rate.code"
        type="button"
        class="flex min-h-[60px] justify-between items-center gap-3 w-full text-left rounded-lg px-4 py-3
               glass glass-hover border border-white/[0.06] transition-colors
               active:bg-white/[0.06] cursor-pointer group"
        @click="$emit('select', rate.code)"
      >
        <div class="min-w-0 flex flex-col gap-0.5">
          <span class="font-mono font-medium text-accent group-hover:text-accent-bright transition-colors">
            {{ rate.code }}
          </span>
          <span class="text-sm text-fg-muted truncate">{{ rate.name }}</span>
        </div>
        <span class="font-mono text-fg shrink-0 tabular-nums">{{ formatRate(rate.rate) }}</span>
      </button>
      <p v-if="rates.length === 0" class="text-center text-fg-muted text-sm py-12">無符合結果</p>
    </div>

    <!-- 桌面：table -->
    <table v-else class="relative z-10 w-full text-sm">
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
import { formatRate } from '@/utils/formatRate'
import { useSpotlight } from '@/composables/useSpotlight'
import { useBreakpoint } from '@/composables/useBreakpoint'

defineProps<{ rates: ExchangeRate[] }>()
defineEmits<{ select: [code: string] }>()

const { isMobile } = useBreakpoint()

const tableRef = ref<HTMLElement | null>(null)
const { spotlightStyle, onMouseMove, onMouseEnter, onMouseLeave } = useSpotlight(tableRef)

function onMouseMoveWrapped(e: MouseEvent): void {
  if (!isMobile.value) onMouseMove(e)
}
function onMouseEnterWrapped(): void {
  if (!isMobile.value) onMouseEnter()
}
function onMouseLeaveWrapped(): void {
  if (!isMobile.value) onMouseLeave()
}
</script>
