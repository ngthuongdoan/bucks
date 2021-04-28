<template>
  <div
      class=" px-3 py-2 my-3 flex w-full transaction items-center shadow bg-white"
      @click="$helpers.to(`/transaction/${transaction.id}`)"
  >
    <img :src="transaction.category.icon" alt="" class="object-contain w-1 justify-self-start flex-grow"
         style="max-width: 30px">
    <div class="ml-3 flex-grow">
      <h1 class="font-bold text-sm m-0">{{ transaction.category.name }}</h1>
      <span class="text-xs text-gray-500">{{ transaction.detail || refinedDay }}</span>
    </div>
    <span :class="['flex-grow justify-self-end text-right font-bold', isExpense?'text-red-400':'text-green-400']">{{
        transaction.value | separateValue
      }}</span>
  </div>
</template>
<script>
import * as dayjs from "dayjs"

export default {
  name: 'app-transaction',
  props: {
    transaction: {
      type: Object,
      required: true
    }
  },
  computed: {
    isExpense() {
      return this.$getConst("DECREASE_DICT").includes(this.transaction.category.type)
    },
    refinedDay() {
      return dayjs(this.transaction.time.toDate()).format("DD/MM/YYYY")
    }
  },
};
</script>