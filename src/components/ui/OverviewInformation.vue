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
import {Timestamp} from "@/plugin/db";

export default {
  name: "OverviewInformation",
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
}
</script>

