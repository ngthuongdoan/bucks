<template>
  <div>
    Account
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { logout } from "@/plugin/modules/auth";

export default {
  methods: {
    logout,
  },
};
</script>

<style>
</style>