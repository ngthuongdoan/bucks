<template>
  <div class="fixed" style="height: 300px">
    <img alt="" class="w-screen" src="~@/assets/img/top-panel.svg"/>
    <h1
        class="absolute z-10 top-5 left-5 text-xl text-white font-monoton"
    >
      bucks
    </h1>
    <img
        alt=""
        class="absolute z-10 top-7 right-5 w-6 cursor-pointer"
        src="https://img.icons8.com/small/16/000000/gear.png"
    />
    <wallet-card
        v-if="wallet"
        :wallet="wallet"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-20 translate-z"
        @click.native="$helpers.to('/wallet')"
        @open-modal="openOption($event)"
    ></wallet-card>
  </div>
</template>

<script>
import WalletCard from "@/components/ui/WalletCard";
import {walletStore} from "@/plugin/db";
import store from "@/store"

export default {
  data() {
    return {
      wallet: {},
    }
  },
  methods: {
    openOption(modal) {
      this.$emit("open-modal", modal)
    },
  },
  components: {
    WalletCard,
  },
  firestore() {
    const wallet = store.getters["userModule/user"].data.selectedWallet;
    return {
      wallet: walletStore.doc(wallet)
    }
  }
};
</script>

<style>
</style>