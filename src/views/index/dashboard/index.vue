<template>
  <div v-if="isMobile">
    <app-header></app-header>
  </div>
  <div v-else>Desktop</div>
</template>

<script>
import AppHeader from "@/components/mobile/AppHeader";
import { isMobile } from "mobile-device-detect";
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

<style>
</style>