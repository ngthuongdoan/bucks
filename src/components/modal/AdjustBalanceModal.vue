<template>
  <form class="flex flex-col w-full px-10 justify-center items-center" @submit.prevent="adjustBalance">
    <label for="">Enter current balance of this wallet</label>
    <input v-model="balance" class="input" step="0.1" type="number">
    <div class="flex w-full items-center justify-center gap-3">
      <input
          class="p-3 bg-control hover:bg-control-light font-bold text-md w-2/6 cursor-pointer ease-in-out duration-300 transition-all"
          type="submit"
          value="Adjust">
      <button class="p-3 bg-gray-200 font-bold text-md w-2/6 cursor-pointer ease-in-out duration-100 transition-all"
              type="button"
              @click="$emit('close')">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
import Transaction from "@/model/Transaction.model";
import {Timestamp} from "@/plugin/db";
import {CategoryService} from "@/service/Category.service";
import {TransactionService} from "@/service/Transaction.service";

export default {
  name: "AdjustBalance",
  data() {
    return {
      balance: 0,
    }
  },
  created() {
    this.balance = this.wallet.amount;
  },
  props: {
    wallet: {
      type: Object,
      required: true
    }
  },
  methods: {
    async adjustBalance() {
      try {
        const adjust = +this.balance - +this.wallet.amount;
        console.log(adjust)
        const adjustTransaction = new Transaction(
            adjust,
            Timestamp.fromDate(new Date()),
            "Adjust Balance"
        );
        adjustTransaction.wallet = this.wallet;
        adjustTransaction.category = await CategoryService.fetchAdjustBalance();
        adjustTransaction.category.type = (adjust > 0) ? "income" : "expense"
        console.log(adjust)
        await TransactionService.addNew(adjustTransaction)
        this.$helpers.showSuccess();
        this.$emit("close")
      } catch (e) {
        this.$helpers.showError(e);
      }
    }
  },
}
</script>

<style scoped>

</style>