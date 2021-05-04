<template>
  <div
      class=" px-3 py-5 my-3 flex w-full transaction items-center shadow bg-white"
      @click="to(person.id)"
  >
    <h1 class="ml-3 flex-grow font-bold text-sm m-0">{{ person.name }}</h1>
    <span class="flex-grow justify-self-end text-right font-bold">
      {{
        (isDebt ? person.totalDebt : person.totalLoan) | separateValue
      }}</span>
  </div>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      required: true
    },
    isDebt: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    to(id) {
      const path = this.isDebt ? "debt/" : "loan/";
      this.$helpers.to(path + id);
    }
  }
}
</script>

<style scoped>

</style>