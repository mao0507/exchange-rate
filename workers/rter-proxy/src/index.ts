/**
 * 邊緣轉發 RTER capi.php，並對允許之 Origin 加上 CORS。
 * 部署：見 repo 根目錄 README「Cloudflare Worker（RTER 代理）」。
 */

export interface Env {
  /** 逗號分隔，例如 `https://user.github.io,https://user.github.io/repo,http://localhost:5173`；含 `*` 則允許任意來源 */
  ALLOWED_ORIGINS: string
}

const RTER_URL = 'https://tw.rter.info/capi.php'

function resolveAllowedOrigin(request: Request, raw: string): string | null {
  const origin = request.headers.get('Origin')
  const parts = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  if (parts.includes('*')) return origin || '*'
  if (!origin) return null
  if (parts.includes(origin)) return origin
  return null
}

function corsHeaders(request: Request, env: Env): Headers {
  const h = new Headers()
  const ao = resolveAllowedOrigin(request, env.ALLOWED_ORIGINS ?? '')
  if (ao) {
    h.set('Access-Control-Allow-Origin', ao)
    h.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    h.set('Access-Control-Allow-Headers', 'Content-Type')
    h.set('Access-Control-Max-Age', '86400')
  }
  return h
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) })
    }

    if (request.method !== 'GET') {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: corsHeaders(request, env),
      })
    }

    const upstream = await fetch(RTER_URL)
    const headers = new Headers()
    const ct = upstream.headers.get('Content-Type')
    if (ct) headers.set('Content-Type', ct)

    const cors = corsHeaders(request, env)
    cors.forEach((value, key) => {
      headers.set(key, value)
    })

    return new Response(upstream.body, {
      status: upstream.status,
      headers,
    })
  },
}
