import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/ui/views/Home.vue'
import View1 from '@/ui/views/View1'
import MainLayout1 from '@/ui/layouts/MainLayoutBase'
import ToolbarItems1 from '@/ui/services/ToolbarItems1'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: View1,
      layout: MainLayout1,
      toolbar_items: ToolbarItems1
    }
  },
  {
    path: '/page1',
    name: 'page1',
    components: {
      default: () => import('@/ui/views/View2'),
      layout: () => import('@/ui/layouts/MainLayoutBase'),
      toolbar_items: () => import('@/ui/services/ToolbarItems2')
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/ui/views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
