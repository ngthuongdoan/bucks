<template>
  <div :class="['shadow-lg px-3 py-2', budget.status==='inactive'?'grayscale':'']">
    <div
        class="my-3 flex w-full transaction items-center bg-white"
    >
      <img :src="budget.category.icon" alt="" class="object-contain w-1 justify-self-start flex-grow"
           style="max-width: 30px">
      <div class="ml-3 flex-grow">
        <h1 class="font-bold text-sm m-0">{{ budget.category.name }}</h1>
        <p class="italic text-xs text-gray-400">{{ refinedBeginDay }}<span class="mx-2">-</span>{{ refinedDueDay }}</p>
      </div>
      <div class="flex-grow justify-self-end text-right text-sm font-bold ">
        <span class="text-green-400">{{
            budget.total | separateValue
          }}</span><br>
        <span class="text-gray-400">{{
            budget.currentValue | separateValue
          }}</span>
      </div>

    </div>
    <k-progress
        :percent="percent"
        :status="status"
    ></k-progress>
  </div>
</template>

<script>
import KProgress from 'k-progress';
import * as dayjs from "dayjs";

export default {
  name: "AppBudget",
  props: {
    budget: {
      type: Object,
      required: true
    }
  },
  computed: {
    refinedBeginDay() {
      return dayjs(this.budget.beginDate.toDate()).format("DD/MM/YYYY")
    },
    refinedDueDay() {
      return dayjs(this.budget.dueDate.toDate()).format("DD/MM/YYYY")
    },
    percent() {
      return (this.budget.currentValue < this.budget.total) ? (this.budget.currentValue * 100 / this.budget.total).toFixed(2) : 100;
    },
    status() {
      if (this.percent < 80) return "success";
      if (this.percent >= 100) return "error";
      return "warning"
    }
  },
  components: {
    KProgress
  }
}
</script>

<style scoped>

</style>