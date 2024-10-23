import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import index from "@/forms/myData/index.vue";
import LoginCollaborator from "@/views/LoginCollaborator.vue";
import Received from "@/views/Received.vue";
import People from "@/views/People.vue";
import Family from "@/views/Family.vue";
import Donor from "@/views/Donor.vue";
import Donation from "@/views/Donation.vue";
import Product from "@/views/Product.vue";
import User from "@/views/User.vue";
import Logger from "@/views/Logger.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    meta: { title: "Dashboard", auth: true },
  },
  {
    path: "/my-data",
    component: index,
    meta: { title: "Meus Dados", auth: true },
  },
  {
    path: "/login",
    component: LoginCollaborator,
    meta: { title: "Login" },
  },
  { path: "*", redirect: "/" },
  {
    path: "/people",
    component: People,
    meta: { title: "Pessoas", auth: true },
  },
  {
    path: "/family",
    component: Family,
    meta: { title: "Famílias", auth: true },
  },
  {
    path: "/donor",
    component: Donor,
    meta: { title: "Doadores", auth: true },
  },
  {
    path: "/product",
    component: Product,
    meta: { title: "Produtos", auth: true },
  },
  {
    path: "/received",
    component: Received,
    meta: { title: "Recebimento", auth: true },
  },
  {
    path: "/donation",
    component: Donation,
    meta: { title: "Doações", auth: true },
  },
  {
    path: "/users",
    component: User,
    meta: { title: "Usuários", auth: true },
  },
  {
    path: "/logger",
    component: Logger,
    meta: { title: "Logs", auth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("@sommittee.access_token");

  if (to.matched.some((record) => record.meta.auth)) {
    if (!token) {
      return next("/login");
    }

    return next();
  }

  return next();
});

export default router;
