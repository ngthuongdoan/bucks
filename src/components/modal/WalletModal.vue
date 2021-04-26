<template>
  <ul class="w-full p-2 flex-auto">
    <li v-for="(wallet, i) in wallets" :key="i" :style="{backgroundColor:wallet.color}"
        class="shadow-xl w-full px-5 py-2 rounded-2xl my-2 cursor-pointer"
        @click="changeWallet(wallet)">
      <h1 class="font-bold text-white">{{ wallet.name }}</h1>
      <p class="italic text-gray-200 text-sm">{{ wallet.amount }} {{ wallet.currency.key }}</p>
    </li>
  </ul>
</template>

<script>
import {walletStore} from "@/plugin/db";
import store from "@/store";

export default {
  data() {
    return {
      wallets: [],
    }
  },
  methods: {
    changeWallet(wallet) {
      this.$emit("change-wallet", wallet);
    }
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    return {
      wallets: walletStore.where("uid", "==", uid)
    };
  }
}
</script>

<style scoped>

</style>