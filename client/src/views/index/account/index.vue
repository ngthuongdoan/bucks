<template>
  <div>
    Account
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { logout } from "@/plugin/auth";

export default {
  methods: {
    logout,
  },
};
</script>

<style>
</style>