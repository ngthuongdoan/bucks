export const toggleMixin = {
    data() {
        return {
            isOpen: false,
            modal: "",
        }
    },
    methods: {
        toggleModal(modal) {
            this.isOpen = !this.isOpen;
            this.modal = modal;
        }
    },
}