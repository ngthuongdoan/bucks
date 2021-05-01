<template>
  <div>
    <app-navigation
        :routes="routes"
        :tab="currentNavigation"
        @route="currentNavigation = $event"
    ></app-navigation>

    <component :is="currentNavigation[0]+ '-layout'"></component>
  </div>
</template>

<script>
import AppNavigation from "@/components/layout/AppNavigation";
import {routes} from "@/config/routes";
import DebtLayout from "@/components/layout/DebtLayout";
import LoanLayout from "@/components/layout/LoanLayout";

export default {
  data() {
    return {
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