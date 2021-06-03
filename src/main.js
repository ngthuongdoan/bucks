import Vue from "vue";
import './plugins/axios'
import App from "./App.vue";
import "./assets/tailwind.css";
import "./filters";
import helpers from "./helper";
import "./plugin";
import "./directive"
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import {i18n} from './i18n'

if (process.env.VUE_APP_CURRENCY) store.dispatch("currencyModule/fetchCurrency").then();

Vue.config.productionTip = false;
Vue.prototype["$helpers"] = helpers;

Vue.config.devtools = true
Vue.config.performance = true

new Vue({
    store,
    router,
    i18n,
    render: (h) => h(App)
}).$mount("#app");
