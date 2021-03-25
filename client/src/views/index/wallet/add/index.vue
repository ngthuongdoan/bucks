<template>
  <add-layout title="Add Wallet">
    <form id="addForm" ref="form" class="flex flex-col m-auto gap-3 px-7 py-5" @submit.prevent="addWallet">
      <div class="grid grid-cols-add gap-y-2 justify-center items-center">
        <label class="font-bold" for="name">Name</label>
        <input
            id="name"
            v-model.trim="wallet.name"
            class="add-input"
            required
        />
        <label class="font-bold" for="currency">Currency</label>
        <select id="currency" v-model="wallet.currency" class="add-input" required>
          <option selected value="vnd">VND</option>
          <option value="usd">USD</option>
          <option value="jpn">JPN</option>
        </select>
        <label class="font-bold" for="type">Type</label>
        <select id="type" v-model="wallet.type" class="add-input">
          <option selected value="">None</option>
          <option value="visa">visa</option>
          <option value="mastercard">Mastercard</option>
        </select>
        <label class="font-bold" for="color">Color</label>
        <v-swatches id="color" v-model="wallet.color" class="ml-3" popover-x="right"></v-swatches>
        <label class="font-bold" for="initial">Initial</label>
        <input
            id="initial"
            v-model.number="wallet.amount"
            class="add-input"
            required
        />
        <label class="font-bold " for="serial">Serial</label>
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
import VSwatches from 'vue-swatches'
import {db, Timestamp} from "@/plugin/db";

// Import the styles too, typically in App.vue or main.js
import 'vue-swatches/dist/vue-swatches.css'

export default {
  data() {
    return {
      wallet: new Wallet(),
    }
  },
  methods: {
    async addWallet() {
      this.$helpers.loading()
      try {
        await db.collection('wallets').add(Object.assign({createdDate: Timestamp.fromDate(new Date('1789-07-14')),}, this.wallet))
        this.$helpers.showSuccess();
        await this.$router.push("/dashboard");
      } catch (err) {
        this.$helpers.showError(err)
      }
    }
  },
  components: {
    AddLayout,
    VSwatches
  }
}
</script>

<style scoped>

</style>