export const state = () => ({
  modal: "",
  isOpen: false,
  param: ""
});

export const getters = {
  modal(state) {
    return state.modal;
  },
  isOpen(state) {
    return state.isOpen;
  },
  param(state) {
    return state.param
  }
};
export const mutations = {
  SET_MODAL(state, modal) {
    state.modal = modal;
  },
  SET_OPEN(state) {
    state.isOpen = !state.isOpen;
  },
  SET_PARAM(state, param) {
    state.param = param
  }
};

export const actions = {
  async changeModal({commit}, payload) {
    if (payload) {
      commit("SET_MODAL", payload.modal);
      if (Object.keys(payload).includes("param")) commit("SET_PARAM", payload.param)
    } else {
      commit("SET_MODAL", "")
    }
    commit("SET_OPEN")
  },
};

export const namespaced = true;
