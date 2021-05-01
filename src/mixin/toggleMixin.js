import store from "@/store";

export const toggleMixin = {
  data() {
    return {}
  },
  methods: {
    async toggleModal(modal = "") {
      this.isOpen = !this.isOpen;
      console.log(modal)
      if (!(modal instanceof MouseEvent) && modal !== "") await store.dispatch("modalModule/changeModal", modal)
    }
  },
}