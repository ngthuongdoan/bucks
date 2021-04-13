<template>
  <nav
      class="fixed min-h-screen h-full bg-white p-5 flex flex-col justify-between items-center rounded-br-3xl rounded-tr-3xl shadow-2xl">
    <h1
        class="text-xl font-monoton self-start justify-start"
    >
      bucks
    </h1>
    <ul class=" flex flex-col gap-10">
      <router-link
          v-for="item in menu"
          :key="item.path"
          :to="item.path"
          active-class="active"
          class="w-full text-center cursor-pointer flex items-center justify-start gap-3"
          exact
          exact-active-class="active"
          tag="li"
      >
        <img
            :src="item.icon"
            class="w-7"
        />
        <h1>{{ item.name }}</h1>
      </router-link>
    </ul>
    <ul class="">
      <li class="mb-3">
        <button class="rounded-full w-full py-2 px-7 bg-gray-300 text-sm flex gap-2">
          <img
              class="object-contain"
              src="https://img.icons8.com/small/16/000000/gear.png"/>
          Setting
        </button>
      </li>
      <li>
        <button class="rounded-full w-full py-2 px-7 bg-red-500 text-sm flex gap-2" @click="logout">
          <img class="object-contain" src="https://img.icons8.com/android/16/000000/logout-rounded-left.png"/>
          Sign out
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import menu from "@/config/menu.json"
import {logout} from "@/plugin/oauth2";

export default {
  name: "AppSidebar",
  data() {
    return {
      menu
    }
  },
  methods: {
    logout
  }
}
</script>

<style scoped>

</style>