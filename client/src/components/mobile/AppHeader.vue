<template>
  <div class="fixed">
    <img src="~@/assets/img/top-panel.svg" alt="" class="w-screen"/>
    <h1
        class="absolute z-10 top-5 left-5 font-bold font-sans text-xl text-white"
    >
      bucks
    </h1>
    <img
        src="https://img.icons8.com/ios/64/000000/card-exchange.png"
        alt=""
        class="absolute z-10 top-7 right-5 w-6 cursor-pointer"
    />
    <wallet-card
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-20"
    ></wallet-card>
  </div>
</template>

<script>
import WalletCard from "@/components/ui/WalletCard";

export default {
  components: {
    WalletCard,
  },
};
</script>

<style>
</style>