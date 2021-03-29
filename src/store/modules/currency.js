import {init} from "@/service/Currency.service"

export const state = () => ({
  currency: null,
});

export const getters = {
  currency(state) {
    return state.currency;
  },
};
export const mutations = {
  SET_CURRENCY(state, currency) {
    state.currency = currency
  },
};

export const actions = {
  async fetchCurrency({commit}) {
    const currency = await init();
    commit("SET_CURRENCY", currency)
  }
};

export const namespaced = true;
