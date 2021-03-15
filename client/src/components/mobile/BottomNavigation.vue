<template>
  <nav
    class="fixed bottom-0 left-0 right-0 py-4 shadow-negative rounded-t-xl bg-white"
  >
    <action-button></action-button>

    <ul class="flex items-center">
      <router-link
        class="w-full text-center"
        tag="li"
        to="/dashboard"
        exact
        exact-active-class="active"
        active-class="active"
      >
        <img
          class="w-7 m-auto"
          src="https://img.icons8.com/ios-glyphs/30/000000/coin-wallet.png"
        />
      </router-link>
      <router-link
        class="w-full pl-5"
        tag="li"
        to="/report"
        active-class="active"
      >
        <img
          class="w-7"
          src="https://img.icons8.com/fluent-systems-filled/48/000000/business-report.png"
        />
      </router-link>
      <router-link
        class="w-full pr-5"
        tag="li"
        to="/tool"
        active-class="active"
      >
        <img
          class="w-7 float-right"
          src="https://img.icons8.com/ios-filled/50/000000/full-tool-storage-box---v1.png"
        />
      </router-link>
      <router-link class="w-full" tag="li" to="/account" active-class="active">
        <img
          class="w-7 m-auto"
          src="https://img.icons8.com/plumpy/48/000000/test-account.png"
        />
      </router-link>
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