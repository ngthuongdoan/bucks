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
};

export const actions = {
  fetchUser({ commit }, user) {
    commit("SET_LOGGED_IN", user !== null);
    if (user) {
      commit("SET_USER", {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      });
    } else {
      commit("SET_USER", null);
    }
  },
};

export const namespaced = true;
