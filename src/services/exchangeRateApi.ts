import type { RatesResponse } from '@/types'
import { POPULAR_CURRENCIES } from '@/types'

const RTER_DIRECT = 'https://tw.rter.info/capi.php'

/** 開發：Vite proxy；生產：`VITE_RTER_LIVE_URL`（建議 Worker），未設定則直連 RTER（可能遭 CORS 擋） */
function resolveRterFetchUrl(): string {
  if (import.meta.env.DEV) return '/api/rter/capi.php'
  const live = import.meta.env.VITE_RTER_LIVE_URL?.trim()
  return live || RTER_DIRECT
}

interface RterEntry {
  Exrate: number
  UTC: string
}

/**
 * 向 RTER API 取得最新熱門幣別對 USD 之匯率表。
 * @returns 正規化後之 `RatesResponse`（base 固定為 USD）
 * @throws 請求失敗或無法解析資料時
 */
export const fetchLatestRates = async (): Promise<RatesResponse> => {
  const res = await fetch(resolveRterFetchUrl())

  if (!res.ok) {
    throw new Error(`API 請求失敗：${res.status} ${res.statusText}`)
  }

  const data = (await res.json()) as Record<string, RterEntry>

  const rates: Record<string, number> = {}
  let utcTime = ''

  for (const code of POPULAR_CURRENCIES) {
    const key = `USD${code}`
    if (key in data) {
      rates[code] = data[key].Exrate
      if (!utcTime) utcTime = data[key].UTC
    }
  }

  if (Object.keys(rates).length === 0) {
    throw new Error('API 回傳資料格式異常，無法解析匯率')
  }

  const lastUpdated = utcTime
    ? new Date(utcTime + ' UTC').getTime()
    : Date.now()

  return {
    base: 'USD',
    date: utcTime,
    rates,
    lastUpdated,
  }
}
