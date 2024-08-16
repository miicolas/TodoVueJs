// router/index.js or main.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../view/home.vue'
import ViewTodo from '../view/viewTodo.vue' 

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/todos/:id',
    name: 'todoDetail',
    component: ViewTodo,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
