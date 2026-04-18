import { ref, computed, type ComputedRef, type Ref } from 'vue'
import { useExchangeRateStore } from '@/stores/exchangeRate'

/** RTER 正規化後 base 為 USD：`rates[x]` 為 1 USD 可兌換之 x 數量 */
const unitPerUsd = (rates: Record<string, number>, code: string): number | null => {
  if (code === 'USD') return 1
  const v = rates[code]
  return v !== undefined && v > 0 ? v : null
}

/**
 * 以 USD 報價表推導「1 單位 from 可兌換多少 to」（與 `amount * rate` 相容）。
 */
const effectiveRateFromUsdTable = (
  rates: Record<string, number>,
  from: string,
  to: string,
): number | null => {
  const rFrom = unitPerUsd(rates, from)
  const rTo = unitPerUsd(rates, to)
  if (rFrom === null || rTo === null || rFrom <= 0) return null
  return rTo / rFrom
}

/** `useConverter` 回傳之反應式狀態與操作 */
export interface UseConverterReturn {
  amount: Ref<number | null>
  fromCurrency: Ref<string>
  toCurrency: Ref<string>
  currentRate: ComputedRef<number | null>
  result: ComputedRef<number | null>
  swap: () => void
  store: ReturnType<typeof useExchangeRateStore>
}

/**
 * 換算表單：金額、來源／目標幣別、依目前 store 匯率試算之結果，以及幣別對調。
 * @returns 反應式欄位、`swap` 與 exchange rate store
 */
export const useConverter = (): UseConverterReturn => {
  const store = useExchangeRateStore()
  const amount = ref<number | null>(null)
  const fromCurrency = ref('TWD')
  const toCurrency = ref('USD')

  const currentRate = computed<number | null>(() => {
    const payload = store.currentRates
    if (!payload || payload.base !== 'USD') return null
    return effectiveRateFromUsdTable(payload.rates, fromCurrency.value, toCurrency.value)
  })

  const result = computed<number | null>(() => {
    if (amount.value === null || currentRate.value === null) return null
    return amount.value * currentRate.value
  })

  const swap = (): void => {
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
