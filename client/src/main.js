import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import "./plugin";
import helpers from "./helper";

Vue.config.productionTip = false;
Vue.prototype.$helpers = helpers;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
