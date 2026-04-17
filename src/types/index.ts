export interface ExchangeRate {
  code: string
  name: string
  rate: number
}

export interface RatesResponse {
  base: string
  date: string
  rates: Record<string, number>
  lastUpdated: number
}

export interface CurrencyPair {
  base: string
  target: string
}

export interface HistoryDataPoint {
  date: string
  rate: number
}

export interface HistoryData {
  pair: CurrencyPair
  points: HistoryDataPoint[]
}

export type TimeRange = 7 | 30 | 90

export const CURRENCY_NAMES: Record<string, string> = {
  USD: '美元',
  EUR: '歐元',
  GBP: '英鎊',
  JPY: '日圓',
  TWD: '新台幣',
  CNY: '人民幣',
  HKD: '港幣',
  KRW: '韓元',
  AUD: '澳幣',
  CAD: '加幣',
  CHF: '瑞士法郎',
  SGD: '新加坡元',
  THB: '泰銖',
  MYR: '馬來西亞林吉特',
  NZD: '紐西蘭元',
}

export const POPULAR_CURRENCIES = Object.keys(CURRENCY_NAMES)
