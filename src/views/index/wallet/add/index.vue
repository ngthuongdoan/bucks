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
          <!--          BUGS: div not inside option, need to use custom select-->
          <option v-for="cur in currencies" :key="cur.key">
            <div :class="['currency-flag', `currency-flag-${cur.key.toLowerCase()}`]"> {{ cur.key }}</div>
          </option>
        </select>
        <label class="font-bold" for="type">Type</label>
        <select id="type" v-model="wallet.type" class="add-input">
          <option selected value="">None</option>
          <option value="visa">Visa</option>
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

// Import the styles too, typically in App.vue or main.js
import 'vue-swatches/dist/vue-swatches.css'
import {WalletService} from "@/service/Wallet.service"

export default {
  data() {
    return {
      wallet: new Wallet(),
    }
  },
  computed: {
    currencies() {
      return this.$store.getters["currencyModule/currencies"];
    }
  },
  methods: {
    async addWallet() {
      this.$helpers.loading()
      try {
        await WalletService.addNew(this.wallet);
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