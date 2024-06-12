import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import MyData from '@/views/MyData.vue'
import LoginCollaborator from '@/views/LoginCollaborator.vue'

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
  {
    path: '/login-collaborator',
    component: LoginCollaborator,
    meta: { title: 'Login' },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
