<template>
  <div>{{ transaction }}</div>
</template>

<script>
import {transactionStore} from "@/plugin/db";


export default {
  data() {
    return {
      transaction: {},
    }
  },
  firestore() {
    const transactionId = this.$route.params.id;
    return {
      transaction: transactionStore.doc(transactionId)
    }
  }
}
</script>

<style scoped>

</style>