<template>
  <mobile-dashboard v-if="isMobile"></mobile-dashboard>
  <desktop-dashboard v-else></desktop-dashboard>
</template>

<script>
import {isMobile} from "mobile-device-detect";
import MobileDashboard from "@/components/layout/MobileDashboard";
import DesktopDashboard from "@/components/layout/DesktopDashboard";

export default {
  data() {
    return {
      isMobile,
    };
  },
  components: {
    MobileDashboard,
    DesktopDashboard,
  }
};
</script>