<template>
  <div>
    <div class="w-full h-20 flex items-center bg-white shadow-xl">
      <h1 class="font-bold text-lg text-gray-900 ml-5">Hi! {{ currentUser.data.displayName }}</h1>
    </div>
    <div class="w-full mt-10 mx-4">
      <div class="my-3">
        <h1 class="font-semibold">ID</h1>
        <p class="italic text-sm text-gray-500">{{ currentUser.data.uid }}</p>
      </div>
      <div class="my-3">
        <h1 class="font-semibold">{{ $t("account.name") }}</h1>
        <p class="italic text-sm text-gray-500">{{ currentUser.data.displayName }}</p>
      </div>
      <div class="my-3">
        <h1 class="font-semibold">Email</h1>
        <p class="italic text-sm text-gray-500">{{ currentUser.data.email || "" }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      currentUser: "userModule/user"
    })
  },
};
</script>

<style>
</style>