<template>
  <div class="bg-gray-300 min-h-screen min-w-full">
    <app-sidebar></app-sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import AppSidebar from "@/components/layout/AppSidebar";

export default {
  components: {
    AppSidebar
  }
};
</script>

<style>
</style>