import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/weather/:city',
      name: 'weather',
      component: () => import('@/views/WeatherView.vue')
    }
  ]
})

export default router
