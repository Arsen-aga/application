import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CompletedTasks from '@/views/TodoList/CompletedTasks.vue'
import AllTasks from '@/views/TodoList/AllTasks.vue'
import Wrapper from '@/views/TodoList/Wrapper.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: Wrapper,
      redirect: { name: 'all-tasks' },
      children: [
        {
          path: 'completed',
          name: 'completed',
          component: CompletedTasks,
        },
        {
          path: 'all-tasks',
          name: 'all-tasks',
          component: AllTasks,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
