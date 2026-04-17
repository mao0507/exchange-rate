import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchLatestRates } from '@/services/exchangeRateApi'
import type { RatesResponse, ExchangeRate } from '@/types'
import { CURRENCY_NAMES, POPULAR_CURRENCIES } from '@/types'

const CACHE_TTL = 10 * 60 * 1000

export const useExchangeRateStore = defineStore('exchangeRate', () => {
  const cachedRates = ref<RatesResponse | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const baseCurrency = 'USD'

  const rateList = computed<ExchangeRate[]>(() => {
    if (!cachedRates.value) return []
    return POPULAR_CURRENCIES
      .filter(code => code !== 'USD')
      .map(code => ({
        code,
        name: CURRENCY_NAMES[code] ?? code,
        rate: cachedRates.value!.rates[code] ?? 0,
      }))
      .filter(r => r.rate > 0)
  })

  function isCacheValid(): boolean {
    if (!cachedRates.value) return false
    return Date.now() - cachedRates.value.lastUpdated < CACHE_TTL
  }

  async function fetchRates(force = false): Promise<void> {
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
  }
})
