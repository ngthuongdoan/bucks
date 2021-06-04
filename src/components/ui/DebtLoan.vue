<template>
  <div class="w-full h-full h-80 max-h-80">
    <h1 class="font-bold text-gray-700 text-lg">{{ $t("dashboard.debtloan") }}</h1>
    <div class="bg-white w-full h-full rounded-xl">
      <app-navigation
          :routes="routes"
          :tab="currentNavigation"
          class="rounded-t-2xl"
          @route="currentNavigation = $event"
      ></app-navigation>
      <component :is="currentNavigation[0]+ '-layout'"></component>
    </div>
  </div>
</template>

<script>
import AppNavigation from "@/components/layout/AppNavigation";
import {routes} from "@/config/routes";
import DebtLayout from "@/components/layout/DebtLayout";
import LoanLayout from "@/components/layout/LoanLayout";

export default {
  name: "DebtLoan",
  data() {
    return {
      isDebt: true,
      routes: [...routes.DEBT_LOAN],
      currentNavigation: ["debt"]
    }
  },
  components: {
    AppNavigation,
    DebtLayout,
    LoanLayout
  }
}
</script>

<style scoped>

</style>