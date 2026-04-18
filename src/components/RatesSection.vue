<template>
  <div>
    <PageHeader label="即時匯率" title="Exchange Rates" :subtitle="store.currentRates ? `更新於 ${lastUpdatedText}` : undefined">
      <template #action>
        <RefreshButton :loading="store.isLoading" @refresh="store.fetchRates(true)" />
      </template>
    </PageHeader>

    <ControlsBar>
      <div class="inline-flex items-center gap-2 px-3 py-2 rounded-full
                  border border-accent/30 bg-accent/[0.06] text-xs font-mono">
        <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
        <span class="text-accent">{{ store.baseCurrency }}</span>
        <span class="text-fg-muted">基礎貨幣</span>
      </div>
      <div class="flex-1 max-w-sm">
        <CurrencySearch v-model="searchQuery" />
      </div>
    </ControlsBar>

    <LoadingSpinner v-if="store.isLoading && !store.currentRates" />
    <ErrorMessage
      v-else-if="store.error"
      :message="store.error"
      @retry="store.fetchRates(true)"
    />
    <RateTable
      v-else
      :rates="filteredRates"
      @select="navigateToHistory"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useExchangeRateStore } from '@/stores/exchangeRate'
import PageHeader from '@/components/PageHeader.vue'
import ControlsBar from '@/components/ControlsBar.vue'
import CurrencySearch from '@/components/CurrencySearch.vue'
import RefreshButton from '@/components/RefreshButton.vue'
import RateTable from '@/components/RateTable.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const store = useExchangeRateStore()
const router = useRouter()
const searchQuery = ref('')

const filteredRates = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return store.rateList
  return store.rateList.filter(
    r => r.code.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
  )
})

const lastUpdatedText = computed(() => {
  const ts = store.currentRates?.lastUpdated
  if (!ts) return ''
  return new Date(ts).toLocaleString('zh-TW')
})

function navigateToHistory(code: string): void {
  void router.push({
    path: '/',
    hash: '#history',
    query: { pair: `${store.baseCurrency}-${code}` },
  })
}

onMounted(() => void store.fetchRates())
</script>
