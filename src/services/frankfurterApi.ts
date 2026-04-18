import type { HistoryData, HistoryDataPoint, TimeRange } from '@/types'

const BASE_URL = import.meta.env.DEV ? '/api/frankfurter' : 'https://api.frankfurter.dev'

const formatDate = (date: Date): string => date.toISOString().split('T')[0]

/** Frankfurter v2 `GET /v2/rates` 單筆列（見 https://frankfurter.dev/） */
interface FrankfurterV2RateRow {
  date: string
  base: string
  quote: string
  rate: number
}

/**
 * 向 Frankfurter API v2 取得兩幣別於指定天數區間之日線匯率序列。
 * @param base 基準幣代碼
 * @param target 目標幣代碼
 * @param days 回溯天數（7／30／90）
 * @returns 排序後之歷史資料點
 * @throws HTTP、JSON 格式不符或無有效資料時
 */
export const fetchHistoricalRates = async (
  base: string,
  target: string,
  days: TimeRange,
): Promise<HistoryData> => {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - days)

  const start = formatDate(startDate)
  const end = formatDate(endDate)

  const qs = new URLSearchParams({
    from: start,
    to: end,
    base,
    quotes: target,
  })
  const res = await fetch(`${BASE_URL}/v2/rates?${qs.toString()}`)

  if (!res.ok) {
    throw new Error(`歷史資料請求失敗：${res.status} ${res.statusText}`)
  }

  const data: unknown = await res.json()

  if (!Array.isArray(data)) {
    throw new Error('歷史資料格式錯誤：預期為 JSON 陣列')
  }

  const rows = data as FrankfurterV2RateRow[]

  if (rows.length === 0) {
    return {
      pair: { base, target },
      points: [],
    }
  }

  const points: HistoryDataPoint[] = rows
    .map((row) => {
      const rate = typeof row.rate === 'number' && Number.isFinite(row.rate) ? row.rate : NaN
      return { date: row.date, rate }
    })
    .filter((p): p is HistoryDataPoint => p.date !== '' && !Number.isNaN(p.rate))
    .sort((a, b) => a.date.localeCompare(b.date))

  if (points.length === 0) {
    throw new Error('歷史資料無有效匯率點')
  }

  return {
    pair: { base, target },
    points,
  }
}
