import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import index from '@/forms/myData/index.vue'
import LoginCollaborator from '@/views/LoginCollaborator.vue'
import Received from '@/views/Received.vue'
import Address from '@/views/Address.vue'
import People from '@/views/People.vue'
import Family from '@/views/Family.vue'
import Product from '@/views/Product.vue'

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
    path: '/people',
    component: People,
    meta: { title: 'Pessoas', auth: true },
  },
  {
    path: '/family',
    component: Family,
    meta: { title: 'Familias', auth: true },
  },
  {
    path: '/product',
    component: Product,
    meta: { title: 'Produtos', auth: true },
  },
  {
    path: '/received',
    component: Received,
    meta: { title: 'Recebidos', auth: true },
  },
  {
    path: '/address',
    component: Address,
    meta: { title: 'Endereços', auth: true },
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
