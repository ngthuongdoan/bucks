<template>
  <add-layout title="Add Wallet">
    <form id="addForm" ref="form" class="flex flex-col m-auto gap-3 px-7 py-5" @submit.prevent="addWallet">
      <div class="grid grid-cols-add gap-y-2 justify-center items-center">
        <label class="text-input" for="name">Name</label>
        <input
            id="name"
            v-model.trim="wallet.name"
            class="add-input"
            required
        />
        <currency-select
            :currency="wallet.currency"
            class="col-span-2 z-50"
            label="Currency"
            @select-handle="changeCurrency($event)"
        ></currency-select>
        <label class="text-input" for="type">Type</label>
        <select id="type" v-model="wallet.type" class="add-input">
          <option selected value="">None</option>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
        </select>
        <label class="text-input" for="color">Color</label>
        <v-swatches id="color" v-model="wallet.color" class="ml-3" popover-x="right"></v-swatches>
        <label class="text-input" for="initial">Initial</label>
        <input
            id="initial"
            v-model.number="wallet.amount"
            class="add-input"
            required
        />
        <label class="text-input" for="serial">Serial</label>
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
import CurrencySelect from "@/components/ui/CurrencySelect";
import AddLayout from "@/layout/AddLayout";
import Wallet from "@/model/Wallet.model";
import { WalletService } from "@/service/Wallet.service";
import VSwatches from "vue-swatches";

// Import the styles too, typically in App.vue or main.js
import 'vue-swatches/dist/vue-swatches.css';

export default {
  data() {
    return {
      wallet: new Wallet()
    };
  },
  computed: {
    currencies() {
      return this.$store.getters["currencyModule/currencies"];
    }
  },
  methods: {
    changeCurrency(currency) {
      this.wallet.currency = Object.assign({}, currency);
    },
    async addWallet() {
      this.$helpers.loading();
      try {
        this.wallet.uid = this.$store.getters["userModule/user"].data.uid;
        await WalletService.addNew(this.wallet);
        this.$helpers.showSuccess();
        await this.$router.push("/dashboard");
      } catch (err) {
        this.$helpers.showError(err);
      }
    }
  },
  components: {
    CurrencySelect,
    AddLayout,
    VSwatches
  }
};
</script>

<style scoped>

</style>
