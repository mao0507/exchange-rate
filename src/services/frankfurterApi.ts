import type { HistoryData, TimeRange } from '@/types'

const BASE_URL = import.meta.env.DEV
  ? '/api/frankfurter'
  : 'https://api.frankfurter.app'

export async function fetchHistoricalRates(
  base: string,
  target: string,
  days: TimeRange
): Promise<HistoryData> {
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

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}
