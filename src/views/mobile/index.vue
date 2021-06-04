<template>
    <mobile-layout></mobile-layout>
</template>
<script>
import MobileLayout from "@/layout/MobileLayout";
import {BudgetService} from "@/service/Budget.service";

export default {
  components: {
    MobileLayout,
  },
  async created() {
    if (process.env.VUE_APP_CURRENCY) await this.$store.dispatch("currencyModule/fetchCurrency");
    await BudgetService.changeStatus();
  }
};
</script>