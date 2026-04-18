/**
 * 將匯率數值格式化為與匯率列表表格相同之小數位數。
 * @param rate 相對基準幣之匯率
 * @returns 字串形式之數值
 */
export const formatRate = (rate: number): string => {
  if (rate >= 100) return rate.toFixed(2)
  if (rate >= 1) return rate.toFixed(4)
  return rate.toFixed(6)
}
