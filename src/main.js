import Vue from "vue";
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
import VueCurrencyInput from 'vue-currency-input'

Vue.use(VueCurrencyInput)

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
