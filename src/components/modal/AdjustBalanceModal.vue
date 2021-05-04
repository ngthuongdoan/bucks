<template>
  <form class="flex flex-col w-full px-10 justify-center items-center" @submit.prevent="adjustBalance">
    <label for="">Enter current balance of this wallet</label>
    <input v-model="balance" class="input" step="0.1" type="number">
    <div class="flex w-full items-center justify-center gap-3">
      <input
          class="main-btn p-3 w-2/6"
          type="submit"
          value="Adjust">
      <button class="p-3 bg-gray-200 font-bold text-md w-2/6 cursor-pointer ease-in-out duration-100 transition-all"
              type="button"
              @click="$store.dispatch('modalModule/changeModal')">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
import Transaction from "@/model/Transaction.model";
import {Timestamp, walletStore} from "@/plugin/db";
import {CategoryService} from "@/service/Category.service";
import {TransactionService} from "@/service/Transaction.service";
import store from "@/store";

export default {
  name: "AdjustBalance",
  data() {
    return {
      balance: 0,
      wallet: {}
    }
  },
  created() {
    this.balance = this.wallet.amount;
  },
  methods: {
    async adjustBalance() {
      this.$helpers.loading()
      try {
        const adjust = +this.balance - +this.wallet.amount;
        if (adjust === 0) throw new Error("Nothing to adjust")
        const adjustTransaction = new Transaction(
            adjust,
            Timestamp.fromDate(new Date()),
            "Adjust Balance"
        );
        adjustTransaction.wallet = this.wallet;
        adjustTransaction.category = await CategoryService.fetchCategory("Adjust Balance");
        adjustTransaction.category.type = (adjust > 0) ? "income" : "expense"
        await TransactionService.addNew(adjustTransaction)
        this.$helpers.showSuccess();
        await this.$store.dispatch('modalModule/changeModal')
      } catch (e) {
        this.$helpers.showError(e);
      }
    }
  },
  firestore() {
    const wallet = store.getters["userModule/user"].data.selectedWallet;
    return {
      wallet: walletStore.doc(wallet)
    }
  }
}
</script>

<style scoped>

</style>