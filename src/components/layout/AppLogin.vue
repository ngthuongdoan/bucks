<template>
  <form
      class="relative bg-white py-10 lg:px-20 px-10 shadow-lg flex flex-col items-center justify-center"
      @submit.prevent="login"
  >
    <label class="font-bold self-start justify-start lg:justify-center" for="username">Email</label>
    <input v-model.trim="user.email" class="input" type="email"/>
    <br/>
    <label class="font-bold self-start justify-start lg:justify-center " for="pass">Password</label>
    <div class="flex items-center w-full lg:justify-center">
      <input
          ref="pass"
          v-model.trim="user.password"
          class="input w-full min-w-full"
          type="password"
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
        class="bg-green-500 py-3 font-semibold mt-4 cursor-pointer w-full"
        type="submit"
        value="Login"
    />
  </form>
</template>

<script>
import {Auth} from "@/plugin/modules/auth";

export default {
  data() {
    return {
      isShow: false,
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    showPassword() {
      this.isShow = !this.isShow;
      this.$refs.pass.type = this.isShow ? "text" : "password";
    },
    async login() {
      try {
        this.$helpers.loading();
        await Auth
            .signInWithEmailAndPassword(this.user.email, this.user.password);
        this.$helpers.showSuccess();
      } catch (err) {
        this.$helpers.showError(err);
      }
    }
  }
};
</script>

<style>
</style>