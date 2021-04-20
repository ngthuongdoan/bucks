<template>
  <div class="w-full h-full  row-span-2">
    <h1 class="font-bold text-gray-700 text-lg">Debt/Loan</h1>
    <div class="bg-white w-full h-full rounded-xl">
      <ul class="flex justify-around text-gray-400 font-bold cursor-pointer">
        <li :class="['uppercase py-2 w-full h-full text-center rounded-tl-xl', isDebt?'text-black bg-white':'text-gray-500 bg-gray-200']">
          Debt
        </li>
        <li :class="['uppercase py-2 w-full h-full  text-center rounded-tr-xl', !isDebt?'text-black bg-white':'text-gray-500 bg-gray-200']">
          Loan
        </li>
      </ul>
      <div class="py-10">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DebtLoan",
  data() {
    return {
      isDebt: true
    }
  }
}
</script>

<style scoped>

</style>