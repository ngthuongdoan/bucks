<template>
  <add-layout title="Add Wallet" @save="save">
    <form class="flex flex-col m-auto gap-3 px-7 py-5">
      <div class="grid grid-cols-add items-end gap-y-2">
        <label class="font-bold self-start" for="name">Name</label>
        <input
            id="name"
            v-model="wallet.name"
            class="add-input"
        />
        <label class="font-bold" for="currency">Currency</label>
        <select id="currency" v-model="wallet.currency" class="add-input">
          <option selected value="">VND</option>
          <option value="">USD</option>
          <option value="">JPN</option>
        </select>
        <label class="font-bold" for="type">Type</label>
        <select id="type" v-model="wallet.type" class="add-input">
          <option selected value=""></option>
          <option value="">Visa</option>
          <option value="">USD</option>
          <option value="">JPN</option>
        </select>
        <label class="font-bold self-start" for="initial">Initial</label>
        <input
            id="initial"
            v-model="wallet.amount"
            class="add-input"
        />
        <label class="font-bold self-start" for="serial">Serial</label>
        <input
            id="serial"
            v-model="wallet.serial"
            class="add-input"
        />
      </div>
    </form>
  </add-layout>
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