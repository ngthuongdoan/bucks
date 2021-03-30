<template>
  <div>
    <form class="pt-8 px-4" @submit.prevent="exchange">
      <label>
        <input
            v-model.number="amount"
            class="add-input text-4xl font-bold text-center"
            type="text"
        />
      </label>
      <div class="flex items-center mt-5">
        <label class="font-bold" for="currency">From</label>
        <select v-model="from" class="add-input" required>
          <!--          BUGS: div not inside option, need to use custom select-->
          <option v-for="cur in currencies" :key="cur.key">
            <div :class="['currency-flag', `currency-flag-${cur.key.toLowerCase()}`]"> {{ cur.key }}</div>
          </option>
        </select>
        <label class="ml-4 font-bold" for="currency">To</label>
        <select v-model="to" class="add-input" required>
          <!--          BUGS: div not inside option, need to use custom select-->
          <option v-for="cur in currencies" :key="cur.key">
            {{ cur.key }}
          </option>
        </select>
      </div>
      <input class="w-full rounded bg-blue-600 text-white font-bold mt-4 p-2" type="submit" value="Exchange">
    </form>
    <div v-if="isSubmit"
         class="w-full rounded shadow p-5 mt-4 grid grid-cols-3 items-center justify-center gap-3 text-center">
      <h1 class="font-bold text-2xl">
        <div :class="['currency-flag', `currency-flag-${from.toLowerCase()}`]">{{ from }}</div>
      </h1>
      <img class="object-cover w-10 justify-self-center"
           src="https://img.icons8.com/cotton/64/000000/data-in-both-directions.png"/>
      <h1 class="font-bold text-2xl">
        <div :class="['currency-flag', `currency-flag-${to.toLowerCase()}`]">{{ to }}</div>
      </h1>
      <div class="col-span-3 justify-center">
        <span class="font-bold">Rate:</span> {{ Number.parseInt(result.rate) | separateValue }}
      </div>
      <h3 class="text-lg"><span class="font-bold">From:</span> {{ amount }}</h3>
      <span></span>
      <h3 class="text-lg"><span class="font-bold">To:</span> {{ Number.parseInt(result.value) | separateValue }}</h3>
    </div>
  </div>
</template>

<script>
import {exchange} from "@/service/Currency.service";

export default {
  data() {
    return {
      from: "",
      to: "",
      amount: 0,
      result: null,
      isSubmit: false
    }
  },
  computed: {
    currencies() {
      return this.$store.getters["currencyModule/currencies"];
    }
  },
  methods: {
    async exchange() {
      const result = await exchange(this.from, this.to, this.amount);
      this.result = {rate: result.rate, value: result.rate_for_amount}
      this.isSubmit = true
    }
  }
}
</script>

<style scoped>

</style>