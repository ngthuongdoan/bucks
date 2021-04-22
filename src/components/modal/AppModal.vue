<template>
  <div>
    <div
        class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center flex sm:w-full">
      <div
          v-on-click-away="away"
          class="relative bg-white py-5 lg:w-2/6 w-full rounded-lg shadow-2xl ">
        <!--content-->
        <div
            class="border-0 relative flex flex-col w-full justify-center items-center">
          <!--body-->
          <slot></slot>
        </div>
      </div>
    </div>
    <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import {directive as onClickAway} from "vue-clickaway";

export default {
  name: "large-modal",
  directives: {
    onClickAway
  },
  methods: {
    away() {
      this.$emit('away');
    },
    changeWallet(wallet) {
      this.$emit("change-wallet", wallet);
      this.away();
    }
  }

};
</script>