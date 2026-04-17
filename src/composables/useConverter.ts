import { ref, computed } from 'vue'
import { useExchangeRateStore } from '@/stores/exchangeRate'

export function useConverter() {
  const store = useExchangeRateStore()
  const amount = ref<number | null>(null)
  const fromCurrency = ref('USD')
  const toCurrency = ref('TWD')

  const currentRate = computed<number | null>(() => {
    const rates = store.currentRates
    if (!rates || rates.base !== fromCurrency.value) return null
    return rates.rates[toCurrency.value] ?? null
  })

  const result = computed<number | null>(() => {
    if (amount.value === null || currentRate.value === null) return null
    return amount.value * currentRate.value
  })

  function swap(): void {
    const prev = fromCurrency.value
    fromCurrency.value = toCurrency.value
    toCurrency.value = prev
    store.setBaseCurrency(fromCurrency.value)
  }

  return {
    amount,
    fromCurrency,
    toCurrency,
    currentRate,
    result,
    swap,
    store,
  }
}
