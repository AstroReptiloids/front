import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/ui/views/HomeView'
import MainLayout1 from '@/ui/layouts/MainLayoutBase'
import ToolbarItems1 from '@/ui/services/ToolbarItems1'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: HomeView,
      layout: MainLayout1,
      toolbar_items: ToolbarItems1
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: () => import('@/ui/views/LoginView'),
      layout: () => import('@/ui/layouts/MinimalLayoutBase')
    },
    meta: {
      requiresNonAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/ui/views/About.vue')
  },
  {
    path: '/*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('microchatsToken')
  const currentUserId = localStorage.getItem('microchatsUserId')
  const loggedIn = token && token !== 'null'
  const registered = currentUserId && currentUserId !== 'null'

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next({ path: '/login' })
  } else if (to.matched.some(record => record.meta.requiresNonAuth) && loggedIn && registered) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
