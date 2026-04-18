import { onMounted, onBeforeUnmount } from 'vue'
import { useExchangeRateStore } from '@/stores/exchangeRate'

/** 即時匯率自動輪詢間隔（毫秒） */
const POLL_MS = 60_000

/**
 * 啟動每分鐘強制向 API 更新即時匯率（`fetchRates(true)`）。
 * 分頁隱藏時暫停計時；再次可見時立即補抓一次並恢復輪詢。
 * 若上一筆請求仍在進行（`isLoading`），略過該次 tick 以避免並行請求。
 */
export const useExchangeRatePoll = (): void => {
  const store = useExchangeRateStore()
  let intervalId: ReturnType<typeof setInterval> | null = null

  const tick = (): void => {
    if (store.isLoading) return
    void store.fetchRates(true)
  }

  const startInterval = (): void => {
    if (intervalId !== null) return
    intervalId = window.setInterval(tick, POLL_MS)
  }

  const stopInterval = (): void => {
    if (intervalId === null) return
    window.clearInterval(intervalId)
    intervalId = null
  }

  const onVisibilityChange = (): void => {
    if (document.hidden) {
      stopInterval()
      return
    }
    if (!store.isLoading) {
      void store.fetchRates(true)
    }
    startInterval()
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', onVisibilityChange)
    if (!document.hidden) {
      startInterval()
    }
  })

  onBeforeUnmount(() => {
    document.removeEventListener('visibilitychange', onVisibilityChange)
    stopInterval()
  })
}
