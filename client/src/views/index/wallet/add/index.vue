<template>
  <add-layout title="Add Wallet" @save="save"></add-layout>
</template>

<script>
import AddLayout from "@/layout/AddLayout";
import Wallet from "@/model/Wallet.model";

export default {
  data() {
    return {
      wallet: new Wallet(),
    }
  },
  methods: {
    save() {
      console.log(this.wallet)
    }
  },
  components: {AddLayout}
}
</script>

<style scoped>

</style>