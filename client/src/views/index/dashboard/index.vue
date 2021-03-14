<template>
  <div v-if="isMobile">
    <img src="~@/assets/img/top-panel.svg" class="sticky w-full" alt="" />
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
  </div>
  <div v-else>Desktop</div>
</template>

<script>
import { isMobile } from "mobile-device-detect";
export default {
  data() {
    return {
      isMobile,
    };
  },
  methods: {
    handle() {
      console.log("click");
    },
  },
};
</script>

<style>
</style>