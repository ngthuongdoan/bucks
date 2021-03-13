<template>
  <nav
    class="fixed bottom-0 left-0 right-0 py-4 shadow-negative border rounded-t-xl bg-white"
  >
    <action-button></action-button>
    <ul class="flex items-center">
      <li class="w-full text-center">
        <img
          class="w-7 m-auto"
          src="https://img.icons8.com/ios-glyphs/30/000000/coin-wallet.png"
        />
      </li>
      <li class="w-full pl-5">
        <img
          class="w-7"
          src="https://img.icons8.com/fluent-systems-filled/48/000000/business-report.png"
        />
      </li>
      <li class="w-full pr-5">
        <img
          class="w-7 float-right"
          src="https://img.icons8.com/ios-filled/50/000000/full-tool-storage-box---v1.png"
        />
      </li>
      <li class="w-full">
        <img
          class="w-7 m-auto"
          src="https://img.icons8.com/metro/26/000000/info.png"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
import ActionButton from "./ActionButton";
export default {
  components: {
    ActionButton,
  },
};
</script>

<style>
</style>