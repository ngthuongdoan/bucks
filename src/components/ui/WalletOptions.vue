<template>
  <ul v-on-click-away="away" class="bg-white text-black text-sm mt-2 block">
    <li
        v-for="opt in options"
        :key="opt.name"
        class="px-3 py-2 cursor-pointer"
        @click="handleConfig(opt.config)"
    >
      {{ opt.name }}
    </li>
  </ul>
</template>

<script>
import {directive as onClickAway} from "vue-clickaway";
import options from "@/config/wallet-options.json"

export default {
  name: "WalletOptions",
  data() {
    return {
      options
    }
  },
  directives: {
    onClickAway
  },
  methods: {
    away() {
      this.$emit('away');
    },
    handleConfig(config) {
      this.$emit("config", config)
    }
  }
}
</script>

<style scoped>

</style>