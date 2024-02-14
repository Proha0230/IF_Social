import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SearchPage from "@/views/SearchPage.vue";
import ChatPage from "@/views/ChatPage.vue";
import StartPage from "@/views/StartPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
      name: 'login',
      component: StartPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: '/search',
    name: 'search',
    component: SearchPage
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatPage
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
