<template>
  <ul v-on-click-away="away" class="bg-white text-black text-sm mt-2 block">
    <li class="px-3 py-2">Edit Wallet</li>
    <li class="px-3 py-2">Transfer Money</li>
    <li class="px-3 py-2">Adjust Balance</li>
    <li class="px-3 py-2">Delete Wallet</li>
  </ul>
</template>

<script>
import {directive as onClickAway} from "vue-clickaway";

export default {
  name: "WalletOptions",
  directives: {
    onClickAway
  },
  methods: {
    away() {
      this.$emit('away');
    }
  }
}
</script>

<style scoped>

</style>