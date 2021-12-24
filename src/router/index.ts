import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path:'/fileDownload',
    name:'FileDownload',
    component:  () => import(/* webpackChunkName: "about" */ '../views/FileDownload.vue')
  },
  {
    path:'/Spider',
    name:'Spider',
    component:  () => import(/* webpackChunkName: "about" */ '../views/Spider.vue')
  },
  {
    path:'/EditCompiler',
    name:'EditCompiler',
    component:  () => import(/* webpackChunkName: "about" */ '../views/EditCompiler.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
