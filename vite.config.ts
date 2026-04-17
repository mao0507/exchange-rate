import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
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
        target: 'https://api.frankfurter.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/frankfurter/, ''),
      },
    },
  },
})
