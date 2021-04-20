<template>
  <div>
    <div class="flex gap-3">
      <button :class="['btn', activeOverview==='week'&&'btn-active']" @click="activeOverview='week'">Week</button>
      <button :class="['btn', activeOverview==='month'&&'btn-active']" @click="activeOverview='month'">Month</button>
      <button :class="['btn', activeOverview==='year'&&'btn-active']" @click="activeOverview='year'">Year</button>
    </div>
    <div class="grid grid-cols-2 grid-rows-2 gap-2 w-max mt-3">
      <h1 class="font-bold text-lg">INCOME </h1><span
        class="ml-3 font-bold text-lg text-green-400">{{ 3000000 | separateValue }}</span>
      <h1 class="font-bold text-lg">EXPENSE </h1><span
        class="ml-3 font-bold text-lg text-red-400">{{ 4500000 | separateValue }}</span>
      <h1 class="font-bold text-lg">NET </h1><span
        :class="['ml-3 font-bold text-lg',(-1500000>0)?'text-green-400':'text-red-400']">{{
        -1500000 | separateValue
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "OverviewInformation",
  data() {
    return {
      activeOverview: "week"
    }
  }
}
</script>

<style scoped>

</style>