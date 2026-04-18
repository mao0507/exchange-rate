import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchLatestRates } from '@/services/exchangeRateApi'
import type { RatesResponse, ExchangeRate } from '@/types'
import { CURRENCY_NAMES, POPULAR_CURRENCIES } from '@/types'

const CACHE_TTL = 10 * 60 * 1000

/**
 * 即時匯率列表：快取、載入／錯誤狀態與重新抓取。
 */
export const useExchangeRateStore = defineStore('exchangeRate', () => {
  const cachedRates = ref<RatesResponse | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /** 應用程式向使用者標示之基準幣（API 仍為 USD 報價時，列表改為每 1 TWD 兌他幣） */
  const baseCurrency = 'TWD'

  const rateList = computed<ExchangeRate[]>(() => {
    if (!cachedRates.value) return []
    const { rates } = cachedRates.value
    const twdPerUsd = rates.TWD
    if (twdPerUsd === undefined || twdPerUsd <= 0) return []

    return POPULAR_CURRENCIES.filter(code => code !== 'TWD')
      .map(code => {
        const perUsd = code === 'USD' ? 1 : (rates[code] ?? 0)
        return {
          code,
          name: CURRENCY_NAMES[code] ?? code,
          rate: perUsd / twdPerUsd,
        }
      })
      .filter(r => r.rate > 0)
  })

  const isCacheValid = (): boolean => {
    if (!cachedRates.value) return false
    return Date.now() - cachedRates.value.lastUpdated < CACHE_TTL
  }

  /** 與換算 UI 同步基準幣選擇（API 仍固定 USD 報價時為預留擴充）。 */
  const setBaseCurrency = (_code: string): void => {
    void _code
  }

  const fetchRates = async (force = false): Promise<void> => {
    if (!force && isCacheValid()) return

    isLoading.value = true
    error.value = null

    try {
      cachedRates.value = await fetchLatestRates()
    } catch (err) {
      error.value = err instanceof Error ? err.message : '取得匯率失敗，請稍後再試'
    } finally {
      isLoading.value = false
    }
  }

  return {
    baseCurrency,
    isLoading,
    error,
    currentRates: cachedRates,
    rateList,
    fetchRates,
    setBaseCurrency,
  }
})
