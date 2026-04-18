import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchHistoricalRates } from '@/services/frankfurterApi'
import type { HistoryData, TimeRange } from '@/types'

/**
 * 歷史匯率：幣別對、時間區間、圖表資料與載入／錯誤狀態。
 */
export const useHistoryStore = defineStore('history', () => {
  const historyData = ref<HistoryData | null>(null)
  const baseCurrency = ref('TWD')
  const targetCurrency = ref('USD')
  const timeRange = ref<TimeRange>(30)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchHistory = async (): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      historyData.value = await fetchHistoricalRates(
        baseCurrency.value,
        targetCurrency.value,
        timeRange.value,
      )
    } catch (err) {
      error.value = err instanceof Error ? err.message : '取得歷史資料失敗，請稍後再試'
    } finally {
      isLoading.value = false
    }
  }

  const setTimeRange = (range: TimeRange): void => {
    timeRange.value = range
    void fetchHistory()
  }

  const setCurrencyPair = (base: string, target: string): void => {
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
