<template>
  <div class="wallet-container w-screen min-h-screen h-full flex flex-col items-center pt-5">
    <wallet-card v-for="(wallet, i) in wallets" :key="wallet.id"
                 :style="{zIndex:i, transform: `rotateY(10deg) translateY(${(i)*150}px) !important`,
                  boxShadow:'1px 1px 70px black !important'}"
                 :wallet="wallet"
                 :show-setting="false"
                 class="wallet w-2/3 absolute transform cursor-pointer min-h-0"
    ></wallet-card>
  </div>
</template>

<script>
import WalletCard from "@/components/ui/WalletCard";
import {db} from "@/plugin/db";

export default {
  data() {
    return {
      wallets: []
    }
  },
  components: {
    WalletCard
  },
  firestore: {
    wallets: db.collection("wallets").orderBy("createdDate", "desc")
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