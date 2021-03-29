<template>
  <div class="wallet-container w-screen min-h-screen h-full flex flex-col items-center pt-5">
    <wallet-card v-for="(wallet, i) in wallets" :key="wallet.id"
                 :show-setting="false"
                 :style="{zIndex:i, transform: `rotateY(10deg) translateY(${(i)*150}px) !important`,
                  boxShadow:'1px 1px 70px black !important'}"
                 :wallet="wallet"
                 class="wallet w-2/3 absolute transform cursor-pointer"
    ></wallet-card>
  </div>
</template>

<script>
import WalletCard from "@/components/ui/WalletCard";
import {db} from "@/plugin/db";
import store from "@/store"

export default {
  data() {
    return {
      wallets: []
    }
  },
  components: {
    WalletCard
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    return {
      wallets: db.collection("wallets").where("uid", "==", uid)
    }
  }
};
</script>

<style lang="scss">
.wallet-container {
  background-image: url(~@/assets/img/wallet-container.svg);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>