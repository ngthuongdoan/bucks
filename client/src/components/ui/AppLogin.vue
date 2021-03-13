<template>
  <form
    @submit.prevent="login"
    class="relative bg-white py-10 px-20 shadow-lg flex flex-col"
  >
    <label for="username" class="font-bold">Username</label>
    <input type="text" class="input" />
    <br />
    <label for="pass" class="font-bold">Password</label>
    <div class="flex justify-center items-center">
      <input type="password" class="input" ref="pass" />
      <i
        :class="[
          'fas',
          isShow ? 'fa-eye-slash' : 'fa-eye',
          'w-2 cursor-pointer  transform -translate-x-8 ',
        ]"
        @click="showPassword"
      ></i>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    showPassword() {
      this.isShow = !this.isShow;
      this.$refs.pass.type = this.isShow ? "text" : "password";
    },
  },
};
</script>

<style>
</style>