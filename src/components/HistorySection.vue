<template>
  <div>
    <PageHeader label="歷史走勢" title="Rate History" />

    <ControlsBar>
      <CurrencyPairSelector
        :base="store.baseCurrency"
        :target="store.targetCurrency"
        @update:base="onBaseChange"
        @update:target="onTargetChange"
      />
      <TimeRangeSelector
        :model-value="store.timeRange"
        @update:model-value="store.setTimeRange"
      />
    </ControlsBar>

    <div
      class="relative rounded-2xl border border-white/[0.06] shadow-card backdrop-blur-sm p-0 sm:p-6 overflow-hidden
             bg-gradient-to-b from-white/[0.08] to-bg-elevated"
    >
      <div
        class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-90"
        aria-hidden="true"
      />
      <div class="relative px-4 pt-4 pb-3 sm:px-0 sm:pt-0 sm:pb-0 border-b border-white/[0.06] sm:border-0 mb-4 sm:mb-6">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-sm font-mono text-accent">{{ store.baseCurrency }}</span>
            <span class="text-fg-muted mx-1">/</span>
            <span class="text-sm font-mono text-fg">{{ store.targetCurrency }}</span>
            <span class="text-sm text-fg-muted ml-3 md:text-xs">近 {{ store.timeRange }} 天</span>
          </div>
        </div>
      </div>

      <div class="px-0 pb-4 sm:pb-0">
        <LoadingSpinner v-if="store.isLoading" />
        <ErrorMessage
          v-else-if="store.error"
          :message="store.error"
          @retry="store.fetchHistory"
        />
        <RateChart
          v-else-if="store.historyData && store.historyData.points.length > 0"
          :points="store.historyData.points"
          :base="store.baseCurrency"
          :target="store.targetCurrency"
        />
        <p v-else class="text-center text-fg-muted py-12 text-sm px-4">尚無資料</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHistoryStore } from '@/stores/history'
import PageHeader from '@/components/PageHeader.vue'
import ControlsBar from '@/components/ControlsBar.vue'
import CurrencyPairSelector from '@/components/CurrencyPairSelector.vue'
import TimeRangeSelector from '@/components/TimeRangeSelector.vue'
import RateChart from '@/components/RateChart.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const store = useHistoryStore()
const route = useRoute()

function applyPairFromQuery(pair: string | null | undefined): void {
  if (pair && typeof pair === 'string' && pair.includes('-')) {
    const [base, target] = pair.split('-')
    if (base && target) {
      store.setCurrencyPair(base, target)
      return
    }
  }
  void store.fetchHistory()
}

function onBaseChange(code: string): void   { store.setCurrencyPair(code, store.targetCurrency) }
function onTargetChange(code: string): void { store.setCurrencyPair(store.baseCurrency, code) }

onMounted(() => {
  applyPairFromQuery(route.query.pair as string | undefined)
})

watch(
  () => route.query.pair,
  (pair) => {
    applyPairFromQuery(pair as string | undefined)
  },
)
</script>
