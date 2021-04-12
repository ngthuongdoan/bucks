<template>
  <div class="bg-gray-300 min-h-screen min-w-full">
    <app-sidebar></app-sidebar>
<!--    <app-right-sidebar></app-right-sidebar>-->
    <router-view></router-view>
  </div>
</template>

<script>
import AppSidebar from "@/components/layout/AppSidebar";
// import AppRightSidebar from "@/components/layout/AppRightSidebar";

export default {
  components: {
    AppSidebar,
    // AppRightSidebar
  }
};
</script>

<style>
</style>