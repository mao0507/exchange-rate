import type { HistoryData, TimeRange } from '@/types'

const BASE_URL = import.meta.env.DEV
  ? '/api/frankfurter'
  : 'https://api.frankfurter.app'

const formatDate = (date: Date): string => date.toISOString().split('T')[0]

/**
 * 向 Frankfurter API 取得兩幣別於指定天數區間之日線匯率序列。
 * @param base 基準幣代碼
 * @param target 目標幣代碼
 * @param days 回溯天數（7／30／90）
 * @returns 排序後之歷史資料點
 * @throws HTTP 或 JSON 解析失敗時
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

  const res = await fetch(`${BASE_URL}/${start}..${end}?from=${base}&to=${target}`)

  if (!res.ok) {
    throw new Error(`歷史資料請求失敗：${res.status} ${res.statusText}`)
  }

  const data = await res.json()

  const points = Object.entries(data.rates as Record<string, Record<string, number>>)
    .map(([date, rates]) => ({ date, rate: rates[target] ?? 0 }))
    .sort((a, b) => a.date.localeCompare(b.date))

  return {
    pair: { base, target },
    points,
  }
}
