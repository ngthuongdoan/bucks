<template>
  <div v-if="isMobile">
    <app-header></app-header>
    <div class="px-4 pt-80">
      <div v-for="i in 50" :key="i" class=" px-3 py-2 my-3 flex w-full transaction items-center">
        <img alt="" class="object-cover w-8 justify-self-start" src="~@/assets/icon/family.svg">
        <h1 class="ml-3 font-bold text-sm">Khám bệnh</h1>
        <span class="">120.000</span>
      </div>
    </div>
  </div>
  <div v-else>Desktop</div>
</template>

<script>
import AppHeader from "@/components/mobile/AppHeader";
import {isMobile} from "mobile-device-detect";

export default {
  data() {
    return {
      isMobile,
    };
  },
  components: {
    AppHeader,
  },
};
</script>