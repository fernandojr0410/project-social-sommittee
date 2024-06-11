import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import MyData from '../views/MyData'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Home,
    meta: { title: 'Dashboard' },
  },
  {
    path: '/my-data',
    component: MyData,
    meta: { title: 'Meus Dados' },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
