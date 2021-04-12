<template>
  <div>
    <mobile-layout v-if="isMobile"></mobile-layout>
    <default-layout v-else></default-layout>
  </div>
</template>
<script>
import DefaultLayout from "@/layout/DefaultLayout";
import MobileLayout from "@/layout/MobileLayout";
import { isMobile } from "mobile-device-detect";

export default {
  data() {
    return {
      isMobile
    };
  },
  components: {
    MobileLayout,
    DefaultLayout
  }
};
</script>