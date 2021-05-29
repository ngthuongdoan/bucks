<template>
  <div>
    <form @submit.prevent="forgot">
      <div class="flex flex-col">
        <label for="">Your Email</label>
        <input v-model="email" class="input" type="email"/>
      </div>
      <input class="main-btn w-full py-2" type="submit" value="Send me reset link">
    </form>
  </div>
</template>

<script>
import {Auth} from "@/plugin/modules/auth";

export default {
  name: "ForgotModal",
  data() {
    return {
      email: "",
    }
  },
  methods: {
    async forgot() {
      this.$helpers.loading();
      try {
        await Auth.sendPasswordResetEmail(this.email)
        this.$helpers.showSuccess();
      } catch (e) {
        this.$helpers.showError(e);
      }
    }
  }
}
</script>

<style scoped>

</style>