<template>
  <form id="addForm" ref="form" class="flex flex-col m-auto gap-3 px-7 py-5" @submit.prevent="changeInformation">
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
          class="col-span-2 currency-select"
          label="Currency"
          @select-handle="changeCurrency($event)"
      ></currency-select>
      <label class="text-input" for="wallet-type">Type</label>
      <div>
        <div class="flex items-center mr-4 mb-4 mt-3">
          <input id="radio1" v-model="wallet.type" class="hidden" name="radio" required type="radio" value=""/>
          <label class="flex items-center cursor-pointer" for="radio1">
            <span class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
            None</label>
        </div>

        <div class="flex items-center mr-4 mb-4">
          <input id="radio2" v-model="wallet.type" class="hidden" name="radio" required type="radio" value="visa"/>
          <label class="flex items-center cursor-pointer" for="radio2">
            <span class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
            Visa</label>
        </div>

        <div class="flex items-center mr-4 mb-4">
          <input id="radio3" v-model="wallet.type" class="hidden" name="radio" required type="radio"
                 value="mastercard"/>
          <label class="flex items-center cursor-pointer" for="radio3">
            <span class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
            Mastercard</label>
        </div>
      </div>
      <label class="text-input" for="color">Color</label>
      <v-swatches id="color" v-model="wallet.color" class="ml-3 z-50" popover-x="right"></v-swatches>
      <label class="text-input" for="initial">Initial</label>
      <input
          id="initial"
          v-model.number="wallet.amount"
          class="add-input"
          required
      />
      <label class="text-input" for="serial">Serial
        <input-optional></input-optional>
      </label>
      <input
          id="serial"
          v-model="wallet.serial"
          class="add-input"
      />
    </div>
    <div class="flex w-full items-center justify-center gap-3">
      <input
          class="main-btn p-3 w-2/6"
          type="submit"
          value="Change">
      <button class="p-3 bg-gray-200 font-bold text-md w-2/6 cursor-pointer ease-in-out duration-100 transition-all"
              type="button"
              @click="$store.dispatch('modalModule/changeModal')">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
import CurrencySelect from "@/components/ui/CurrencySelect";
import InputOptional from "@/components/ui/InputOptional";
import {WalletService} from "@/service/Wallet.service";
import VSwatches from "vue-swatches";

// Import the styles too, typically in App.vue or main.js
import 'vue-swatches/dist/vue-swatches.css';

export default {
  computed: {
    wallet() {
      return {...this.$store.getters["userModule/user"].data.selectedWallet};
    },
    currencies() {
      return this.$store.getters["currencyModule/currencies"];
    }
  },
  methods: {
    changeCurrency(currency) {
      this.wallet.currency = {...currency};
    },
    async changeInformation() {
      this.$helpers.loading();
      try {
        await WalletService.updateWallet(this.wallet);
        this.$helpers.showSuccess();
        await this.$store.dispatch("modalModule/changeModal")
      } catch (err) {
        this.$helpers.showError(err);
      }
    }
  },
  components: {
    CurrencySelect,
    VSwatches,
    InputOptional
  }
};
</script>