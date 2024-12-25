import { createRouter, createWebHistory } from 'vue-router'
import LogicalExercises from '@/views/LogicalExercises.vue'
import AuthView from '@/views/AuthView.vue'
import StoreCrud from '@/views/StoreCrud.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'exercises',
      component: LogicalExercises,
    },
    {
      path: '/stores',
      name: 'stores',
      component: StoreCrud,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
  ],
})

export default router
