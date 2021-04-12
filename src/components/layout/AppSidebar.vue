<template>
  <nav class="fixed min-h-screen h-full bg-white px-5 flex flex-col justify-center items-center rounded-br-3xl rounded-tr-3xl shadow-2xl">
    <ul class=" flex flex-col gap-10">
      <router-link
          active-class="active"
          class="w-full text-center"
          exact
          exact-active-class="active"
          tag="li"
          to="/dashboard"
      >
        <img
            class="w-7"
            src="https://img.icons8.com/ios-glyphs/30/000000/coin-wallet.png"
        />
      </router-link>
      <router-link
          active-class="active"
          class="w-full"
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
          class="w-full"
          tag="li"
          to="/tool"
      >
        <img
            class="w-7"
            src="https://img.icons8.com/ios-filled/50/000000/full-tool-storage-box---v1.png"
        />
      </router-link>
      <router-link active-class="active" class="w-full" tag="li" to="/account">
        <img
            class="w-7"
            src="https://img.icons8.com/plumpy/48/000000/test-account.png"
        />
      </router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "AppSidebar"
}
</script>

<style scoped>

</style>