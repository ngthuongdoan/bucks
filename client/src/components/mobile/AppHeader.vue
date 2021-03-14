<template>
  <div class="fixed">
    <img src="~@/assets/img/top-panel.svg" class="w-full" alt="" />
    <h1
      class="absolute z-10 top-5 left-5 font-bold font-sans text-xl text-white"
    >
      bucks
    </h1>
    <img
      src="~@/assets/img/menu.svg"
      alt=""
      class="absolute z-10 top-5 right-5"
    />
    <img
      src="~@/assets/img/down-arrow.svg"
      class="relative mx-auto transform -translate-y-7"
      @click="handle"
      v-anime="{
        top: '10px',
        direction: 'alternate',
        easing: 'easeInOutSine',
        loop: true,
      }"
    />
    <wallet-card
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-24"
    ></wallet-card>
  </div>
</template>

<script>
import WalletCard from "@/components/ui/WalletCard";

export default {
  methods: {
    handle() {
      console.log("click");
    },
  },
  components: {
    WalletCard,
  },
};
</script>

<style>
</style>