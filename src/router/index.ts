import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'exchange-rate',
      component: () => import('@/views/ExchangeRateView.vue'),
    },
    {
      path: '/converter',
      name: 'converter',
      component: () => import('@/views/ConverterView.vue'),
    },
    {
      path: '/history/:pair?',
      name: 'history',
      component: () => import('@/views/HistoryView.vue'),
    },
  ],
})

export default router
