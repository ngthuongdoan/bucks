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
        <div>
          <label id="listbox-label" class="block text-sm font-medium text-gray-700">
            From
          </label>
          <div class="mt-1 relative">
            <button
                aria-expanded="true"
                aria-haspopup="listbox"
                aria-labelledby="listbox-label"
                class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="button"
                @click="fromSelect=!fromSelect"
            >
              <span class="flex items-center">
                <div
                    :class="['currency-icon currency-flag currency-flag-lg',` currency-flag-${from.key.toLowerCase()}`]"
                ></div>
                <span class="ml-3 block truncate">
                  {{ from.key }}
                </span>
              </span>
              <select-icon/>
            </button>
            <ul
                v-show="fromSelect"
                aria-activedescendant="listbox-option-3"
                aria-labelledby="listbox-label"
                class="absolute mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                role="listbox"
                tabindex="-1">
              <li
                  v-for="cur in currencies"
                  id="listbox-option-0"
                  :key="cur.key"
                  class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                  role="option"
                  @click="selectFrom(cur)"
              >
                <div class="flex items-center">
                  <div
                      :class="['currency-icon currency-flag currency-flag-lg',`currency-flag-${cur.key.toLowerCase()}`]"
                  ></div>
                  <span class="font-normal ml-3 block truncate">
                    {{ cur.key }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--        -->
        <div>
          <label id="listbox-label-1" class="block text-sm font-medium text-gray-700">
            To
          </label>
          <div class="mt-1 relative">
            <button
                aria-expanded="true"
                aria-haspopup="listbox"
                aria-labelledby="listbox-label"
                class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="button"
                @click="toSelect=!toSelect"
            >
              <span class="flex items-center">
                <div
                    :class="['currency-icon currency-flag currency-flag-lg',` currency-flag-${to.key.toLowerCase()}`]"
                ></div>
                <span class="ml-3 block truncate">
                  {{ to.key }}
                </span>
              </span>
              <select-icon/>
            </button>
            <ul
                v-show="toSelect"
                aria-activedescendant="listbox-option-3"
                aria-labelledby="listbox-label-1"
                class="absolute mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                role="listbox"
                tabindex="-1">
              <li
                  v-for="cur in currencies"
                  id="listbox-option-1"
                  :key="cur.key"
                  class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                  role="option"
                  @click="selectTo(cur)"
              >
                <div class="flex items-center">
                  <div
                      :class="['currency-icon currency-flag currency-flag-lg',`currency-flag-${cur.key.toLowerCase()}`]"
                  ></div>
                  <span class="font-normal ml-3 block truncate">
                    {{ cur.key }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <input class="w-full rounded bg-yellow-500 text-gray-50 font-bold mt-4 p-2" type="submit" value="Exchange">
    </form>
    <div v-if="isSubmit"
         class="w-full max-w-screen-sm rounded shadow p-5 mt-4 mx-auto bg-white">
      <div class="grid grid-cols-3 items-start justify-center gap-3 text-center">
        <h1 class="font-bold text-lg text-gray-900">
          <div :class="['currency-flag currency-flag-xl ', `currency-flag-${from.key.toLowerCase()}`]"></div>
          {{ from.name }}
        </h1>
        <img class="object-cover w-10 justify-self-center"
             src="https://img.icons8.com/cotton/64/000000/data-in-both-directions.png"/>
        <h1 class="font-bold text-lg text-gray-900">
          <div :class="['currency-flag currency-flag-xl ', `currency-flag-${to.key.toLowerCase()}`]"></div>
          {{ to.name }}
        </h1>
        <div class="col-span-3 justify-center">
          <span class="font-bold">Rate:</span> {{ Number.parseInt(result.rate) | separateValue }}
        </div>
      </div>
      <div class="flex w-full justify-evenly mt-4">
        <h3 class="text-md"><span class="font-bold">From:</span> {{ Number.parseFloat(result.amount) }}
          {{ from.key.toUpperCase() }}</h3>
        <h3 class="text-md"><span class="font-bold">To:</span> {{ Number.parseInt(result.value) | separateValue }}
          {{ to.key.toUpperCase() }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import SelectIcon from "@/components/ui/SelectIcon";
import Currency from "@/model/Currency.model";
import { exchange } from "@/service/Currency.service";

export default {
  components: { SelectIcon },
  data() {
    return {
      from: new Currency("USD", "United States Dollar"),
      fromSelect: false,
      toSelect: false,
      to: new Currency("VND", "Vietnamese Dong"),
      amount: 1,
      result: null,
      isSubmit: false
    };
  },
  computed: {
    currencies() {
      return this.$store.getters["currencyModule/currencies"];
    }
  },
  methods: {
    selectFrom(currency) {
      this.from = Object.assign({}, currency);
      this.fromSelect = !this.fromSelect;
    },
    selectTo(currency) {
      this.to = Object.assign({}, currency);
      this.toSelect = !this.toSelect;
    },
    async exchange() {
      this.$helpers.loading();
      try {
        const result = await exchange(this.from.key, this.to.key, this.amount);
        this.result = { amount: result.amount, rate: result.rate, value: result.rate_for_amount };
        this.isSubmit = true;
        this.$helpers.close();
      } catch (e) {
        this.$helpers.showError(e);
      }
    }
  }
};
</script>

