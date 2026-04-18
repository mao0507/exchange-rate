<template>
  <div class="relative z-40 border-b border-white/[0.06] bg-bg-base/85 backdrop-blur-md">
    <!-- 初始載入（無快取） -->
    <div
      v-if="store.isLoading && !store.currentRates"
      class="px-4 py-3 text-center text-sm font-mono text-fg-muted"
    >
      載入匯率中…
    </div>

    <!-- 錯誤且無任何快取 -->
    <div
      v-else-if="store.error && !store.currentRates"
      class="px-4 py-3 text-center text-sm text-red-400/90"
    >
      {{ store.error }}
    </div>

    <!-- 無資料 -->
    <div
      v-else-if="items.length === 0"
      class="px-4 py-3 text-center text-sm text-fg-muted"
    >
      尚無匯率資料
    </div>

    <!-- 減少動效：可捲動／換行之靜態列 -->
    <div
      v-else-if="reducedMotion"
      class="px-3 sm:px-4 py-3 max-h-[6rem] overflow-x-auto overflow-y-auto"
      aria-hidden="true"
    >
      <div class="flex flex-wrap justify-center gap-x-6 gap-y-2 min-w-min py-1">
        <span
          v-for="r in items"
          :key="r.code"
          class="inline-flex items-baseline gap-2 shrink-0 whitespace-nowrap"
        >
          <span class="font-mono text-sm text-accent">{{ r.code }}</span>
          <span class="font-mono text-sm tabular-nums text-fg">{{ formatRate(r.rate) }}</span>
        </span>
      </div>
    </div>

    <!-- 預設：無縫橫向循環 -->
    <div v-else class="overflow-hidden py-3.5 select-none" aria-hidden="true">
      <div class="flex w-max animate-marquee-seamless">
        <ul class="flex items-center gap-10 sm:gap-12 px-4 sm:px-6 list-none m-0 shrink-0">
          <li
            v-for="r in items"
            :key="`a-${r.code}`"
            class="inline-flex items-baseline gap-2 whitespace-nowrap"
          >
            <span class="font-mono text-sm text-fg-muted">{{ store.baseCurrency }}</span>
            <span class="font-mono text-sm text-fg-muted">→</span>
            <span class="font-mono text-sm text-accent">{{ r.code }}</span>
            <span class="font-mono text-sm tabular-nums text-fg">{{ formatRate(r.rate) }}</span>
          </li>
        </ul>
        <ul
          class="flex items-center gap-10 sm:gap-12 px-4 sm:px-6 list-none m-0 shrink-0"
          aria-hidden="true"
        >
          <li
            v-for="r in items"
            :key="`b-${r.code}`"
            class="inline-flex items-baseline gap-2 whitespace-nowrap"
          >
            <span class="font-mono text-sm text-fg-muted">{{ store.baseCurrency }}</span>
            <span class="font-mono text-sm text-fg-muted">→</span>
            <span class="font-mono text-sm text-accent">{{ r.code }}</span>
            <span class="font-mono text-sm tabular-nums text-fg">{{ formatRate(r.rate) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useExchangeRateStore } from '@/stores/exchangeRate'
import { formatRate } from '@/utils/formatRate'

const store = useExchangeRateStore()

const items = computed(() => store.rateList)

const reducedMotion = ref(false)
let mql: MediaQueryList | null = null

const syncReduced = (): void => {
  reducedMotion.value = mql?.matches ?? false
}

onMounted(() => {
  mql = window.matchMedia('(prefers-reduced-motion: reduce)')
  syncReduced()
  mql.addEventListener('change', syncReduced)
  void store.fetchRates()
})

onUnmounted(() => {
  mql?.removeEventListener('change', syncReduced)
})
</script>
