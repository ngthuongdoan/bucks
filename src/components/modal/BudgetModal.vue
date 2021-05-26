<template>
  <div class="w-full p-3 h-72 overflow-auto custom-scrollbar">
    <app-budget v-for="budget in budgets" :key="budget.id" :budget="budget"></app-budget>
  </div>
</template>

<script>
// import store from "@/store";
// import {budgetStore} from "@/plugin/db";
import AppBudget from "@/components/ui/AppBudget";
import {Timestamp} from "@/plugin/db";

export default {
  name: "BudgetModal",
  components: {
    AppBudget
  },
  data() {
    return {
      budgets: [
        {
          category: {
            icon: "https://firebasestorage.googleapis.com/v0/b/bucks-10010.appspot.com/o/category%2F024-medical.png?alt=media&token=6f2b7812-3d15-429d-abb6-5625031c0195",
            name: "Medical"
          },
          beginDate: Timestamp.now(),
          dueDate: Timestamp.now(),
          total: 20000,
          currentValue: 10000
        },
        {
          category: {
            icon: "https://firebasestorage.googleapis.com/v0/b/bucks-10010.appspot.com/o/category%2F024-medical.png?alt=media&token=6f2b7812-3d15-429d-abb6-5625031c0195",
            name: "Medical"
          },
          beginDate: Timestamp.now(),
          dueDate: Timestamp.now(),
          total: 20000,
          currentValue: 10000
        },
        {
          category: {
            icon: "https://firebasestorage.googleapis.com/v0/b/bucks-10010.appspot.com/o/category%2F024-medical.png?alt=media&token=6f2b7812-3d15-429d-abb6-5625031c0195",
            name: "Medical"
          },
          beginDate: Timestamp.now(),
          dueDate: Timestamp.now(),
          total: 20000,
          currentValue: 10000
        },
        {
          category: {
            icon: "https://firebasestorage.googleapis.com/v0/b/bucks-10010.appspot.com/o/category%2F024-medical.png?alt=media&token=6f2b7812-3d15-429d-abb6-5625031c0195",
            name: "Medical"
          },
          beginDate: Timestamp.now(),
          dueDate: Timestamp.now(),
          total: 20000,
          currentValue: 10000
        },
        {
          category: {
            icon: "https://firebasestorage.googleapis.com/v0/b/bucks-10010.appspot.com/o/category%2F024-medical.png?alt=media&token=6f2b7812-3d15-429d-abb6-5625031c0195",
            name: "Medical"
          },
          beginDate: Timestamp.now(),
          dueDate: Timestamp.now(),
          total: 20000,
          currentValue: 10000
        },
        {
          category: {
            icon: "https://firebasestorage.googleapis.com/v0/b/bucks-10010.appspot.com/o/category%2F024-medical.png?alt=media&token=6f2b7812-3d15-429d-abb6-5625031c0195",
            name: "Medical"
          },
          beginDate: Timestamp.now(),
          dueDate: Timestamp.now(),
          total: 20000,
          currentValue: 10000
        }
      ]
    }
  },
  // firestore(){
  //   const uid = store.getters["userModule/user"].data.uid
  //   return {
  //     budgets: budgetStore.where("uid","==",uid)
  //   }
  // }
}
</script>

<style scoped>

</style>