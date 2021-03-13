<template>
  <div>
    <p class="text-gray-500 text-center font-bold my-5">OR</p>
    <div class="flex justify-center">
      <app-icon
        v-for="icon in icons.selection"
        :key="icon.name"
        :icon-name="icon.name"
        class="mx-4 cursor-pointer"
      ></app-icon>
    </div>
  </div>
</template>

<script>
import AppIcon from "@/components/ui/AppIcon";
import icons from "@/config/icon.json";

export default {
  data() {
    return {
      icons,
    };
  },
  components: {
    AppIcon,
  },
};
</script>

<style>
</style>