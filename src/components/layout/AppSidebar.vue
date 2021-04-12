<template>
  <nav class="fixed min-h-screen h-full bg-white px-5 flex flex-col justify-center items-center rounded-br-3xl rounded-tr-3xl shadow-2xl">
    <ul class=" flex flex-col gap-10">
      <router-link
          v-for="item in menu"
          :key="item.path"
          active-class="active"
          :to="item.path"
          exact
          exact-active-class="active"
          tag="li"
          class="w-full text-center cursor-pointer"
      >
        <img
            class="w-7"
            :src="item.icon"
        />
      </router-link>
    </ul>
  </nav>
</template>

<script>
import menu from "@/config/menu.json"

export default {
  name: "AppSidebar",
  data() {
    return {
      menu
    }
  }
}
</script>

<style scoped>

</style>