<template>
  <form
      class="relative bg-white py-10 px-20 shadow-lg flex flex-col"
      @submit.prevent="login"
  >
    <label class="font-bold" for="username">Email</label>
    <input v-model.trim="user.email" class="input" type="email"/>
    <br/>
    <label class="font-bold" for="pass">Password</label>
    <div class="flex justify-center items-center">
      <input
          ref="pass"
          v-model.trim="user.password"
          class="input"
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
        class="bg-green-500 w-full py-3 font-semibold mt-4 cursor-pointer"
        type="submit"
        value="Login"
    />
  </form>
</template>

<script>
import { Auth } from "@/plugin/modules/auth";

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
        await this.$router.replace("/dashboard");
      } catch (err) {
        this.$helpers.showError(err);
      }
    }
  }
};
</script>

<style>
</style>