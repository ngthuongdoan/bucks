<template>
  <div>
    <form class="pt-8 px-4" @submit.prevent="exchange">
      <label>
        <input
            v-model.number="amount"
            class="add-input text-4xl m-0 font-bold text-center"
            min="0"
            step="0.01"
            type="number"
        />
      </label>
      <div class="flex items-center justify-center mt-5 gap-10">
        <custom-select
            :currency="from"
            :label="$t('from')"
            @select-handle="selectFrom($event)"/>
        <custom-select
            :currency="to"
            :label="$t('to')"
            @select-handle="selectTo($event)"/>
        <!--        -->

      </div>
      <input :value="$t('modal.exchangeModal.exchange')" class="w-full rounded mt-4 p-2 main-btn" type="submit">
    </form>
    <div v-if="isSubmit"
         class="w-full max-w-screen-sm rounded shadow p-5 mt-4 mx-auto bg-white">
      <div class="grid grid-cols-3 items-start justify-center gap-3 text-center">
        <h1 class="font-bold text-lg text-gray-900">
          <div
              :class="['currency-flag currency-flag-xl ', `currency-flag-${result.base_currency_code.toLowerCase()}`]"></div>
          <br>
          {{ result.base_currency_name }}
        </h1>
        <img class="object-cover w-10 justify-self-center"
             src="https://img.icons8.com/cotton/64/000000/data-in-both-directions.png"/>
        <h1 class="font-bold text-lg text-gray-900">
          <div
              :class="['currency-flag currency-flag-xl ', `currency-flag-${Object.keys(result.rates)[0].toLowerCase()}`]"></div>
          <br>
          {{ Object.values(result.rates)[0].currency_name }}
        </h1>
        <div class="col-span-3 justify-center">
          <span class="font-bold">{{ $t("modal.exchangeModal.rate") }}:</span> {{
            Number.parseInt(Object.values(result.rates)[0].rate) | separateValue
          }}
        </div>
      </div>
      <div class="flex w-full justify-evenly mt-4">
        <h3 class="text-md"><span class="font-bold">{{ $t("from") }}:</span> {{ Number.parseFloat(result.amount) }}
          {{ result.base_currency_code.toUpperCase() }}</h3>
        <h3 class="text-md"><span class="font-bold">{{ $t("to") }}:</span>
          {{ Number.parseInt(Object.values(result.rates)[0].rate_for_amount) | separateValue }}
          {{ Object.keys(result.rates)[0].toUpperCase() }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import CustomSelect from "@/components/ui/CurrencySelect";
import Currency from "@/model/Currency.model";
import {exchange} from "@/service/Currency.service";

export default {
  components: {CustomSelect},
  data() {
    return {
      from: new Currency("USD", "United States Dollar"),
      to: new Currency("VND", "Vietnamese Dong"),
      amount: 1,
      result: null,
      isSubmit: false
    };
  },
  methods: {
    selectFrom(currency) {
      this.from = Object.assign({}, currency);
    },
    selectTo(currency) {
      this.to = Object.assign({}, currency);
    },
    async exchange() {
      this.$helpers.loading();
      try {
        this.result = await exchange(this.from.key, this.to.key, this.amount);
        this.isSubmit = true;
        this.$helpers.close();
      } catch (e) {
        this.$helpers.showError(e);
      }
    }
  }
};
</script>

