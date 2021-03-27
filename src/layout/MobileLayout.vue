<template>
  <div class="relative bg-light-grey min-h-screen min-w-full">
    <router-view></router-view>
    <bottom-navigation></bottom-navigation>
  </div>
</template>

<script>
import BottomNavigation from "@/components/mobile/BottomNavigation";
export default {
  components: {
    BottomNavigation,
  },
};
</script>

<style>
</style>