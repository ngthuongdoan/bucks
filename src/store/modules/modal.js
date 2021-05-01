export const state = () => ({
  modal: "",
  isOpen: false,
});

export const getters = {
  modal(state) {
    return state.modal;
  },
  isOpen(state) {
    return state.isOpen;
  }
};
export const mutations = {
  SET_MODAL(state, modal) {
    state.modal = modal;
  },
  SET_OPEN(state) {
    state.isOpen = !state.isOpen;
  }
};

export const actions = {
  async changeModal({commit}, modal) {
    commit("SET_MODAL", modal);
    commit("SET_OPEN")
  },
};

export const namespaced = true;
