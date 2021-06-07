<template>
  <div class="w-full p-3 h-72 overflow-auto custom-scrollbar">
    <div v-if="budgets.length===0" class="text-center italic text-gray-500">{{ $t("noBudgets") }}</div>
    <app-budget v-for="budget in budgets" v-else :key="budget.id" :budget="budget"></app-budget>
  </div>
</template>

<script>
import store from "@/store";
import {budgetStore} from "@/plugin/db";
import AppBudget from "@/components/ui/AppBudget";

export default {
  name: "BudgetModal",
  components: {
    AppBudget
  },
  data() {
    return {
      budgets: [],
    }
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid
    return {
      budgets: budgetStore.where("uid", "==", uid).orderBy("dueDate", "asc")
    }
  }
}
</script>

<style scoped>

</style>