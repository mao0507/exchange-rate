/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 生產環境即時匯率 API（建議為 Cloudflare Worker 代理 URL）；未設定則回退為 RTER 官方網址 */
  readonly VITE_RTER_LIVE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
