export const state = () => ({
  user: {
    loggedIn: false,
    data: null,
  },
});

export const getters = {
  user(state) {
    return state.user;
  },
};
export const mutations = {
  SET_LOGGED_IN(state, value) {
    state.user.loggedIn = value;
  },
  SET_USER(state, data) {
    state.user.data = data;
  },
  SET_SELECTED_WALLET(state, wallet) {
    state.user.data.selectedWallet = Object.assign({}, wallet)
  }
};

export const actions = {
  fetchUser({ commit }, user) {
    commit("SET_LOGGED_IN", user !== null);
    if (user) {
      commit("SET_USER", {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        selectedWallet: user.selectedWallet
      });
    } else {
      commit("SET_USER", null);
    }
  },
  changeSelected({commit}, wallet) {
    commit("SET_SELECTED_WALLET", wallet)
  }
};

export const namespaced = true;
