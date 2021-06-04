<template>
    <default-layout></default-layout>
</template>
<script>
import DefaultLayout from "@/layout/DefaultLayout";
import {BudgetService} from "@/service/Budget.service";

export default {
  components: {
    DefaultLayout
  },
  async created() {
    if (process.env.VUE_APP_CURRENCY) await this.$store.dispatch("currencyModule/fetchCurrency");
    await BudgetService.changeStatus();
  }
};
</script>