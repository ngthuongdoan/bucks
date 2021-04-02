<template>
  <div>{{ wallet }}</div>
</template>

<script>

import { db } from "@/plugin/db";

export default {
  name: "index",
  data() {
    return {
      wallet: null
    };
  },
  firestore() {
    const wallet = db.collection("wallets").doc(this.$route.params.id);
    return {
      wallet
    };
  }
};
</script>

<style scoped>

</style>