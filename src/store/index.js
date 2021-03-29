import Vue from "vue";
import Vuex from "vuex";
import * as userModule from "./modules/user";
import * as currencyModule from "./modules/currency";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userModule,
    currencyModule
  },
});
