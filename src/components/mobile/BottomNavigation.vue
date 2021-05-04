<template>
  <nav
      class="fixed bottom-0 left-0 right-0 py-4 shadow-negative rounded-t-xl bg-white z-50"
  >
    <action-button
        class="absolute flex items-center justify-center top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-control"
    ></action-button>

    <ul class="flex items-center">
      <router-link
          active-class="active"
          class="w-full text-center"
          exact
          exact-active-class="active"
          tag="li"
          to="/dashboard"
      >
        <img
            class="w-7 m-auto"
            src="https://img.icons8.com/ios-glyphs/30/000000/coin-wallet.png"
        />
      </router-link>
      <router-link
          active-class="active"
          class="w-full pl-5"
          tag="li"
          to="/report"
      >
        <img
            class="w-7"
            src="https://img.icons8.com/fluent-systems-filled/48/000000/business-report.png"
        />
      </router-link>
      <router-link
          active-class="active"
          class="w-full pr-5"
          tag="li"
          to="/tool"
      >
        <img
            class="w-7 float-right"
            src="https://img.icons8.com/ios-filled/50/000000/full-tool-storage-box---v1.png"
        />
      </router-link>
      <router-link active-class="active" class="w-full" tag="li" to="/account">
        <img
            class="w-7 m-auto"
            src="https://img.icons8.com/plumpy/48/000000/test-account.png"
        />
      </router-link>
    </ul>
  </nav>
</template>

<script>
import ActionButton from "../ui/ActionButton";

export default {
  components: {
    ActionButton
  }
};
</script>

<style>
</style>