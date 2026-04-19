import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

/** GitHub Project Pages 需子路徑；本機與 User Pages 根站為 `/` */
function viteBaseFromEnv(mode: string): string {
  const loaded = loadEnv(mode, process.cwd(), '')
  const raw = loaded.VITE_BASE ?? process.env.VITE_BASE
  if (raw === undefined || raw === '' || raw === '/') return '/'
  const withLeading = raw.startsWith('/') ? raw : `/${raw}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

export default defineConfig(({ mode }) => ({
  base: viteBaseFromEnv(mode),
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api/rter': {
        target: 'https://tw.rter.info',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rter/, ''),
      },
      '/api/frankfurter': {
        target: 'https://api.frankfurter.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/frankfurter/, ''),
      },
    },
  },
}))
