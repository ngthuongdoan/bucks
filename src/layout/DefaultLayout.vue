<template>
  <div class="bg-gray-300 min-h-screen min-w-full">
    <app-sidebar></app-sidebar>
    <!--    <app-right-sidebar></app-right-sidebar>-->
    <main>
      <router-view></router-view>
    </main>
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