import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchHistoricalRates } from '@/services/frankfurterApi'
import type { HistoryData, TimeRange } from '@/types'

export const useHistoryStore = defineStore('history', () => {
  const historyData = ref<HistoryData | null>(null)
  const baseCurrency = ref('USD')
  const targetCurrency = ref('TWD')
  const timeRange = ref<TimeRange>(30)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchHistory(): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      historyData.value = await fetchHistoricalRates(
        baseCurrency.value,
        targetCurrency.value,
        timeRange.value
      )
    } catch (err) {
      error.value = err instanceof Error ? err.message : '取得歷史資料失敗，請稍後再試'
    } finally {
      isLoading.value = false
    }
  }

  function setTimeRange(range: TimeRange): void {
    timeRange.value = range
    void fetchHistory()
  }

  function setCurrencyPair(base: string, target: string): void {
    baseCurrency.value = base
    targetCurrency.value = target
    void fetchHistory()
  }

  return {
    historyData,
    baseCurrency,
    targetCurrency,
    timeRange,
    isLoading,
    error,
    fetchHistory,
    setTimeRange,
    setCurrencyPair,
  }
})
