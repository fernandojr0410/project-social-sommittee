import axios from "axios";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./filters";
import vuetify from "./plugins/vuetify";
import { VueMaskDirective } from "v-mask";
import "./plugins/axios";

Vue.directive("mask", VueMaskDirective);

Vue.filter("capitalize", function (value) {
  if (!value) return "";
  d;
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("formatDate", function (value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
});

Vue.prototype.$success = (text) => {
  store.dispatch("snackbar", { status: "success", text });
};

Vue.prototype.$loading = (text) => {
  store.dispatch("snackbar", { status: "loading", text });
};

Vue.prototype.$error = (text) => {
  store.dispatch("snackbar", { status: "error", text });
};

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem("@sommittee.access_token");
//       router.push("/login");
//     }
//     return Promise.reject(error);
//   }
// );

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
