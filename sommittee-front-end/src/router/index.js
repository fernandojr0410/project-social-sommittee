import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import LoginCollaborator from '../views/LoginCollaborator'

Vue.use(VueRouter)

const routes = [
  { path: '/Home', component: Home },
  { path: '/LoginCollaborator', component: LoginCollaborator },
  // { path: "/RegistrationCollaborator", component: RegistrationCollaborator },
  // { path: "/RecoverPassword", component: RecoverPassword },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
