<template>
  <form
    @submit.prevent="login"
    class="relative bg-white py-10 px-20 shadow-lg flex flex-col"
  >
    <label for="username" class="font-bold">Email</label>
    <input type="email" class="input" v-model.trim="user.email" />
    <br />
    <label for="pass" class="font-bold">Password</label>
    <div class="flex justify-center items-center">
      <input
        type="password"
        class="input"
        ref="pass"
        v-model.trim="user.password"
      />
      <i
        :class="[
          'fas',
          isShow ? 'fa-eye-slash' : 'fa-eye',
          'w-2 cursor-pointer  transform -translate-x-8 ',
        ]"
        @click="showPassword"
      ></i>
    </div>
    <input
      type="submit"
      value="Login"
      class="bg-green-500 w-full py-3 font-semibold mt-4 cursor-pointer"
    />
  </form>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    showPassword() {
      this.isShow = !this.isShow;
      this.$refs.pass.type = this.isShow ? "text" : "password";
    },
    login() {},
  },
};
</script>

<style>
</style>