<template>
  <form class="flex flex-col w-full px-10 justify-center items-center" @submit.prevent="adjustBalance">
    <label>{{ $t("enterValue") }}</label>
    <input v-model.number="balance" class="input" type="text" @keypress="preventCharacter($event)">
    <div class="flex w-full items-center justify-center gap-3">
      <input
          :value="$t('adjust')"
          class="main-btn p-3 w-2/6"
          type="submit">
      <button class="p-3 bg-gray-200 font-bold text-md w-2/6 cursor-pointer ease-in-out duration-100 transition-all"
              type="button"
              @click="$store.dispatch('modalModule/changeModal')">
        {{ $t("cancel") }}
      </button>
    </div>
  </form>
</template>

<script>
import Transaction from "@/model/Transaction.model";
import {Timestamp, walletStore} from "@/plugin/db";
import {CategoryService} from "@/service/Category.service";
import {TransactionService} from "@/service/Transaction.service";

export default {
  name: "AdjustBalance",
  data() {
    return {
      balance: 0,
      wallet: {}
    }
  },
  methods: {
    async createWallet() {
      const id = this.$store.getters["userModule/user"].data.selectedWallet;
      const ref = await walletStore.doc(id).get();
      const data = ref.data();
      this.balance = data.amount;
      this.wallet = {id, ...data}
    },
    preventCharacter(evt) {
      evt = (evt) ? evt : window.event;
      let charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
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
        adjustTransaction.wallet = this.wallet.id;
        adjustTransaction.category = await CategoryService.fetchCategory("Adjust Balance");
        adjustTransaction.category.type = (adjust > 0) ? "income" : "expense"

        await TransactionService.addNew(adjustTransaction)
        this.$helpers.showSuccess();
        await this.$store.dispatch('modalModule/changeModal')
      } catch (e) {
        this.$helpers.showError(e);
      }
    },
  },
  async created() {
    await this.createWallet();
  }
}
</script>

<style scoped>

</style>