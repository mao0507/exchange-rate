import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized, RouterScrollBehavior } from 'vue-router'

const NAV_SCROLL_OFFSET = 80

const converterRedirect = (): { path: string; hash: string } => ({
  path: '/',
  hash: '#converter',
})

const historyPairRedirect = (
  to: RouteLocationNormalized,
): { path: string; hash: string; query?: Record<string, string> } => {
  const pair = to.params.pair
  if (pair && typeof pair === 'string' && pair.length > 0) {
    return { path: '/', hash: '#history', query: { pair } }
  }
  return { path: '/', hash: '#history' }
}

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) return savedPosition
  if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth',
      top: NAV_SCROLL_OFFSET,
    }
  }
  if (to.path === '/' && from.path !== '/' && !to.hash) {
    return { top: 0, behavior: 'smooth' }
  }
  return { top: 0 }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/converter',
      redirect: converterRedirect,
    },
    {
      path: '/history/:pair?',
      redirect: historyPairRedirect,
    },
  ],
  scrollBehavior,
})

export default router
