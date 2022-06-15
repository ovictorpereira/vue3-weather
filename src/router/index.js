import { createRouter, createWebHistory } from 'vue-router'
import { useWeatherStore } from "@/stores/weather.js";

import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import('../views/Weather.vue'),
      beforeEnter: (to, from, next) => {
        const weatherStore = useWeatherStore();
        if (weatherStore.currentWeather) next();
        else next('/');
      },
    }
  ]
})

export default router
