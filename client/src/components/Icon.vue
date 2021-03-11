<template>
  <div>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="hidden"
    >
      <defs>
        <symbol :id="icon.tags" viewBox="0 0 1000 1000">
          <path :d="icon.paths[0]"></path>
        </symbol>
      </defs>
    </svg>
    <!-- :style="'fill:' + icon.attrs[0].fill" -->
    <svg class="w-10 h-10" :style="'fill:' + icon.fill">
      <use :xlink:href="'#' + icon.tags[0]"></use>
    </svg>
  </div>
</template>

<script>
import icons from "@/config/icon.json";
export default {
  data() {
    return {
      icon: {}
    };
  },
  props: {
    iconName: {
      type: String,
      required: true
    }
  },
  created() {
    this.icon = icons.icons.find(ico => {
      return ico.tags[0] === this.iconName;
    });
  }
};
</script>

<style></style>
