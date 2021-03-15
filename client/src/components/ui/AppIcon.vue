<template>
  <div @click="oauth2(icon.tags[0])">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="hidden"
    >
      <defs>
        <symbol :id="icon.tags[0]" viewBox="0 0 1000 1000">
          <path :d="icon.paths[0]"></path>
        </symbol>
      </defs>
    </svg>
    <!-- :style="'fill:' + icon.attrs[0].fill" -->
    <svg class="w-12 h-11" :style="filled">
      <use :xlink:href="'#' + icon.tags[0]"></use>
    </svg>
  </div>
</template>

<script>
import { createProvider, signInWithPopup } from "@/plugin/modules/auth";

export default {
  props: {
    icon: {
      type: Object,
      required: true,
    },
  },
  computed: {
    filled() {
      return this.icon.attrs ? { fill: this.icon.attrs[0].fill } : null;
    },
  },
  methods: {
    async oauth2(platform) {
      let provider = createProvider(platform);
      await signInWithPopup(provider);
      await this.$router.replace("/dashboard");
    },
  },
};
</script>

<style></style>
