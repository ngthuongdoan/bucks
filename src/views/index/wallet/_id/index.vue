<template>
  <div>{{ wallet }}</div>
</template>

<script>

import { walletStore } from "@/plugin/db";

export default {
  name: "index",
  data() {
    return {
      wallet: null
    };
  },
  firestore() {
    const wallet = walletStore.doc(this.$route.params.id);
    return {
      wallet
    };
  }
};
</script>

<style scoped>

</style>