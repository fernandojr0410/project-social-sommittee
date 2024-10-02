import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./filters";
import vuetify from "./plugins/vuetify";
import { VueMaskDirective } from "v-mask";
import Notifications from "vue-notification";

Vue.directive("mask", VueMaskDirective);

Vue.use(Notifications);

Vue.filter("capitalize", function (value) {
  if (!value) return "";
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

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
