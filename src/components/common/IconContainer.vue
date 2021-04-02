<template>
  <div>
    <p class="text-gray-500 text-center font-bold my-5">OR</p>
    <div class="flex justify-center">
      <app-icon
          v-for="icon in filterIcon"
          :key="icon.tags[0]"
          :icon="icon"
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
      icons
    };
  },
  computed: {
    filterIcon() {
      return this.icons.icons.filter((item) =>
          [ "facebook", "github", "google" ].some((d) => d === item.tags[0])
      );
    }
  },
  components: {
    AppIcon
  }
};
</script>