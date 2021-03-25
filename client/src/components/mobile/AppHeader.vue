<template>
  <div class="fixed">
    <img src="~@/assets/img/top-panel.svg" alt="" class="w-screen"/>
    <h1
        class="absolute z-10 top-5 left-5  text-xl text-white font-monoton"
    >
      bucks
    </h1>
    <img
        alt=""
        class="absolute z-10 top-7 right-5 w-6 cursor-pointer"
        src="https://img.icons8.com/ios/64/000000/card-exchange.png"
        @click="$helpers.to('/wallet')"
    />
    <wallet-card
        :wallet="wallet"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-20 translate-z"
    ></wallet-card>
  </div>
</template>

<script>
import WalletCard from "@/components/ui/WalletCard";
import Wallet from "@/model/Wallet.model";

export default {
  data() {
    return {
      wallet: new Wallet("Sacombank", "6000000", "green", "sacombank", "070080070479", "vnd")
    }
  },
  components: {
    WalletCard,
  },
};
</script>

<style>
</style>