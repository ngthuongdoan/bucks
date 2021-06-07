<template>
  <div class="w-full p-3 h-72 overflow-auto custom-scrollbar">
    <div v-if="budgets.length===0" class="text-center italic text-gray-500">{{ $t("noBudgets") }}</div>
    <div v-for="budget in budgets" v-else :key="budget.id" class="flex w-full">
      <app-budget :budget="budget" class="flex-grow shadow-none"></app-budget>
      <img class="w-8 object-contain cursor-pointer" src="https://img.icons8.com/fluent/48/000000/delete-forever.png"
           @click="deleteBudget(budget.id)"/>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import {budgetStore} from "@/plugin/db";
import AppBudget from "@/components/ui/AppBudget";
import {BudgetService} from "@/service/Budget.service";

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
  methods: {
    async deleteBudget(budget) {
      try {
        const choose = await this.$helpers.confirmSwal();
        if (choose.isConfirmed) {
          await BudgetService.delete(budget)
          this.$helpers.showSuccess()
        }
      } catch (e) {
        this.$helpers.showError(e)
      }
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