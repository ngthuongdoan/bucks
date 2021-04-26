<template>
  <div
      class=" px-3 py-2 my-3 flex w-full transaction items-center shadow"
      @click="$helpers.to(`/transaction/${transaction.id}`)"
  >
    <img :src="transaction.category.icon" alt="" class="object-contain w-1 justify-self-start flex-grow"
         style="max-width: 30px">
    <h1 class="ml-3 font-bold text-sm flex-grow">{{ transaction.category.name }}</h1>
    <span :class="['flex-grow justify-self-end text-right font-bold', isExpense?'text-red-400':'text-green-400']">{{
        transaction.value | separateValue
      }}</span>
  </div>
</template>
<script>
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
    }
  },
};
</script>