<template>
  <div>
    Account
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { firebase } from "@firebase/app";
require("firebase/auth");
export default {
  methods: {
    async logout() {
      await firebase.auth().signOut();
      await this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>