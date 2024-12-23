import { createRouter, createWebHistory } from 'vue-router'
import LogicalExercises from '@/views/LogicalExercises.vue'
import AuthView from '@/views/AuthView.vue'
import StoreView from '@/views/StoreView.vue'
import StoreCrud from '@/views/StoreCrud.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/stores',
      name: 'stores',
      component: StoreCrud,
    },
    {
      path: '/store/:name',
      name: 'stores-view',
      component: StoreView,
    },
    {
      path: '/exercises',
      name: 'exercises',
      component: LogicalExercises,
    },
  ],
})

export default router
