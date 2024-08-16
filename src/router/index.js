// router/index.js or main.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../view/home.vue'
import ViewTodo from '../view/viewTodo.vue' 
import Start from '../view/start.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/todos/:id',
    name: 'todoDetail',
    component: ViewTodo,
  },
  {
    path: '/',
    name: 'start',
    component: Start,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
