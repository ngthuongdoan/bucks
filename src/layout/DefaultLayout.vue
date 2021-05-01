<template>
  <div class="bg-gray-300 min-h-screen min-w-full">
    <action-button class="absolute right-10 bottom-10"></action-button>

    <app-sidebar></app-sidebar>
    <!--    <app-right-sidebar></app-right-sidebar>-->
    <main>
      <router-view></router-view>
    </main>

  </div>
</template>

<script>
import AppSidebar from "@/components/layout/AppSidebar";
import ActionButton from "@/components/ui/ActionButton";

export default {
  components: {
    AppSidebar,
    ActionButton

  }
};
</script>

<style>

</style>