<template>
  <div v-if="user">
    <mobile-dashboard v-if="isMobile"></mobile-dashboard>
    <desktop-dashboard v-else></desktop-dashboard>
  </div>

</template>

<script>
import {isMobile} from "mobile-device-detect";
import MobileDashboard from "@/components/layout/MobileDashboard";
import DesktopDashboard from "@/components/layout/DesktopDashboard";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      isMobile,
    };
  },
  computed: {
    ...mapGetters({
      user: "userModule/user"
    })
  },
  components: {
    MobileDashboard,
    DesktopDashboard,
  }
};
</script>