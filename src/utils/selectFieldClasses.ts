/** 幣別 combobox 觸發列（與 prompt.xml / 全站 token 對齊） */
const comboboxTriggerBase =
  'rounded-lg text-left min-w-0 w-full text-fg bg-bg-input border border-white/10 shadow-inner ' +
  'leading-normal ' +
  '[color-scheme:dark] ' +
  'cursor-pointer ' +
  'transition-[border-color,box-shadow,transform,color] duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ' +
  'hover:border-white/15 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ' +
  'focus:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/50 ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base ' +
  'pointer-fine:active:scale-[0.99] ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

/** 換算區全寬幣別：觸控目標約 44px */
export const currencyComboboxTriggerMd = `${comboboxTriggerBase} min-h-[44px] px-4 py-3 pr-10 text-base`

/** 歷史幣別對：等寬字；字級至少 16px 以避免 iOS 聚焦縮放 */
export const currencyComboboxTriggerSm = `${comboboxTriggerBase} min-h-[44px] pl-3 pr-8 py-2 text-base font-mono`
