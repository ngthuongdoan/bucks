<template>
  <div
    class="bg-background w-screen h-screen min-w-full min-h-full flex justify-center items-center"
  >
    <form
      @submit.prevent="login"
      class="relative bg-white py-10 px-20 shadow-lg flex flex-col"
    >
      <div class="bg-red w-full h-10 transform"></div>
      <label for="username" class="font-bold">Username</label>
      <input
        type="text"
        class="border rounded px-3 py-2 bg-grey-lighter my-3"
      />
      <br />
      <label for="pass" class="font-bold">Password</label>
      <input
        type="password"
        class="border rounded px-3 py-2 bg-grey-lighter my-3"
      />
      <p class="text-grey-dark text-center font-bold my-5">OR</p>
      <div class="flex justify-center">
        <icon
          v-for="icon in icons.selection"
          :key="icon.name"
          :icon-name="icon.name"
          class="mx-4 cursor-pointer"
        ></icon>
      </div>
    </form>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import icons from "@/config/icon.json";
export default {
  data() {
    return {
      icons,
    };
  },
  components: {
    Icon,
  },
  created() {
    console.log(icons);
  },
};
</script>

<style></style>
