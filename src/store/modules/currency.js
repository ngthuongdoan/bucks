import {init} from "@/service/Currency.service"

export const state = () => ({
  currencies: null,
});

export const getters = {
  currencies(state) {
    return state.currencies;
  },
};
export const mutations = {
  SET_CURRENCY(state, currencies) {
    state.currencies = currencies
  },
};

export const actions = {
  async fetchCurrency({commit}) {
    const currencies = await init();
    commit("SET_CURRENCY", currencies)
  }
};

export const namespaced = true;
