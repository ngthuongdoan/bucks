<template>
  <div v-if="isMobile">
    <app-header></app-header>
    <div class="px-4 pt-80 ">
      <app-transaction/>
    </div>
  </div>
  <div v-else>Desktop</div>
</template>

<script>
import AppHeader from "@/components/mobile/AppHeader";
import AppTransaction from "@/components/ui/AppTransaction";
import { isMobile } from "mobile-device-detect";

export default {
  data() {
    return {
      isMobile
    };
  },
  components: {
    AppTransaction,
    AppHeader
  }
};
</script>