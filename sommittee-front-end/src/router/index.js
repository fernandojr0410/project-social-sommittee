import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import index from '@/forms/myData/index.vue'
import LoginCollaborator from '@/views/LoginCollaborator.vue'
import Receipt from '@/components/receipt/Receipt.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    meta: { title: 'Dashboard', auth: true },
  },
  {
    path: '/my-data',
    component: index,
    meta: { title: 'Meus Dados', auth: true },
  },
  {
    path: '/login',
    component: LoginCollaborator,
    meta: { title: 'Login' },
  },
  { path: '*', redirect: '/' },
  {
    path: '/receipt',
    component: Receipt,
    meta: { title: 'Recibos', auth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (!localStorage.getItem('@sommittee.access_token')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
