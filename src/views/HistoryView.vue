<template>
  <PageShell>
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

    <div class="bg-bg-elevated rounded-xl border border-white/[0.06] shadow-card backdrop-blur-sm p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <span class="text-sm font-mono text-accent">{{ store.baseCurrency }}</span>
          <span class="text-fg-muted mx-1">/</span>
          <span class="text-sm font-mono text-fg">{{ store.targetCurrency }}</span>
          <span class="text-xs text-fg-muted ml-3">近 {{ store.timeRange }} 天</span>
        </div>
      </div>

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
      <p v-else class="text-center text-fg-muted py-12 text-sm">尚無資料</p>
    </div>
  </PageShell>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHistoryStore } from '@/stores/history'
import PageShell from '@/components/PageShell.vue'
import PageHeader from '@/components/PageHeader.vue'
import ControlsBar from '@/components/ControlsBar.vue'
import CurrencyPairSelector from '@/components/CurrencyPairSelector.vue'
import TimeRangeSelector from '@/components/TimeRangeSelector.vue'
import RateChart from '@/components/RateChart.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const store = useHistoryStore()
const route = useRoute()

function parseRouteParam(): void {
  const pair = route.params.pair as string | undefined
  if (pair && pair.includes('-')) {
    const [base, target] = pair.split('-')
    if (base && target) {
      store.baseCurrency = base
      store.targetCurrency = target
    }
  }
}

function onBaseChange(code: string): void   { store.setCurrencyPair(code, store.targetCurrency) }
function onTargetChange(code: string): void { store.setCurrencyPair(store.baseCurrency, code) }

onMounted(() => { parseRouteParam(); void store.fetchHistory() })
watch(() => route.params.pair, () => { parseRouteParam(); void store.fetchHistory() })
</script>
