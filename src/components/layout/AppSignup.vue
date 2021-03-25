<template>
  <form
    @submit.prevent="signup"
    class="relative bg-white py-10 px-20 shadow-lg"
  >
    <div class="flex">
      <div class="flex flex-col mr-8">
        <label class="font-bold">Email</label>
        <input type="email" class="input" v-model.trim="user.email" />
        <br />
        <label class="font-bold">Name</label>
        <input type="text" class="input" v-model.trim="user.name" />
      </div>
      <div class="flex flex-col">
        <label class="font-bold">Password</label>
        <input
          type="password"
          class="input"
          ref="pass"
          v-model.trim="user.password"
        />
        <br />
        <label class="font-bold">Confirm Password</label>
        <input type="password" class="input" v-model.trim="confirmPassword" />
      </div>
    </div>
    <input
      type="submit"
      value="Sign up"
      class="bg-green-500 w-full py-3 font-semibold mt-4 cursor-pointer"
    />
  </form>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        name: "",
      },
      confirmPassword: "",
    };
  },
  methods: {
    async signup() {
      try {
        const data = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.user.email, this.user.password);

        await data.user.updateProfile({
          displayName: this.user.name,
        });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style>
</style>