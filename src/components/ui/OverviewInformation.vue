<template>
  <div class="w-full h-full max-h-36 ">
    <h1 class="font-bold text-gray-700 text-lg">Budgets</h1>
    <div class="bg-white w-full h-full rounded-xl overflow-y-scroll custom-scrollbar">
      <app-budget v-for="budget in budgets" :key="budget.id" :budget="budget"></app-budget>
    </div>
  </div>
</template>

<script>
import AppBudget from "@/components/ui/AppBudget"
import store from "@/store"
import {budgetStore} from "@/plugin/db";

export default {
  name: "OverviewInformation",
  components: {
    AppBudget
  },
  data() {
    return {
      budgets: [],
    }
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    console.log(uid)
    return {
      budgets: budgetStore.where("uid", "==", uid)
    }
  }
}
</script>

