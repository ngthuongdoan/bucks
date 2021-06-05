<template>
  <form id="addForm" ref="form" class="flex flex-col m-auto gap-3 px-7 py-5" @submit.prevent="addWallet">
    <div class="grid grid-cols-add gap-y-2 justify-center items-center">
      <label class="text-input" for="name">{{ $t("name") }}</label>
      <input
          id="name"
          v-model.trim="wallet.name"
          class="add-input"
          required
      />
      <currency-select
          :currency="wallet.currency"
          :label="$t('modal.walletModal.currency')"
          class="col-span-2 currency-select"
          @select-handle="changeCurrency($event)"
      ></currency-select>
      <label class="text-input">{{ $t("modal.walletModal.type") }}</label>
      <div>
        <div class="flex items-center mr-4 mb-4 mt-3">
          <input id="radio1" v-model="wallet.type" class="hidden" name="radio" required type="radio" value=""/>
          <label class="flex items-center cursor-pointer" for="radio1">
            <span class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
            {{ $t("modal.walletModal.none") }}</label>
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
      <label class="text-input" for="color">{{ $t("modal.walletModal.color") }}</label>
      <v-swatches id="color" v-model="wallet.color" class="ml-3" popover-x="right"></v-swatches>
      <label class="text-input" for="initial">{{ $t("modal.walletModal.initial") }}</label>
      <currency-input
          v-model="wallet.amount"
          :currency="null"
          :precision="0"
          :value-as-integer="true"
          class="add-input"
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
          :value="$t('create')"
          class="main-btn p-3 w-2/6"
          type="submit">
      <button class="p-3 bg-gray-200 font-bold text-md w-2/6 cursor-pointer ease-in-out duration-100 transition-all"
              type="button"
              @click="$store.dispatch('modalModule/changeModal')">
        {{ $t("cancel") }}
      </button>
    </div>
  </form>
</template>

<script>
import CurrencySelect from "@/components/ui/CurrencySelect";
import InputOptional from "@/components/ui/InputOptional";
import Wallet from "@/model/Wallet.model";
import {WalletService} from "@/service/Wallet.service";
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

<style>

</style>
