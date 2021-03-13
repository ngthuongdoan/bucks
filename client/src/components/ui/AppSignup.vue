<template>
  <form
    @submit.prevent="signup"
    class="relative bg-white py-10 px-20 shadow-lg"
  >
    <div class="flex">
      <div class="flex flex-col mr-8">
        <label class="font-bold">Username</label>
        <input type="text" class="input" v-model.trim="user.username" />
        <br />
        <label class="font-bold">Birth</label>
        <input type="date" class="input" v-model.trim="user.birth" />
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
      class="bg-green-500 w-full py-3 font-semibold mt-4"
    />
  </form>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        name: "",
        birth: new Date(),
      },
      confirmPassword: "",
    };
  },
};
</script>

<style>
</style>