<template>
  <div class="fixed">
    <img src="~@/assets/img/top-panel.svg" class="w-full" />
    <h1
      class="absolute z-10 top-5 left-5 font-bold font-sans text-xl text-white"
    >
      bucks
    </h1>
    <img
      src="~@/assets/img/menu.svg"
      alt=""
      class="absolute z-10 top-7 right-5"
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