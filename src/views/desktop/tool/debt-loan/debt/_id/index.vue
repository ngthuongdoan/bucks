<template>
  <div>
    <app-modal
        v-if="isPay"
        @away="isPay = !isPay"
    >
      <form class="flex flex-col w-full px-10 justify-center items-center" @submit.prevent="repaying">
        <label for="">Enter value</label>
        <input v-model="amount" class="input" step="0.1" type="number">
        <div class="flex w-full items-center justify-center gap-3">
          <input
              class="p-3 bg-control hover:bg-control-light font-bold text-md w-2/6 cursor-pointer ease-in-out duration-300 transition-all"
              type="submit"
              value="Pay">
          <button class="p-3 bg-gray-200 font-bold text-md w-2/6 cursor-pointer ease-in-out duration-100 transition-all"
                  type="button"
                  @click="isPay = !isPay">
            Cancel
          </button>
        </div>
      </form>
    </app-modal>
    <div class="w-full h-20 flex items-center bg-white shadow-xl">
      <h1 class="font-bold text-lg text-gray-900 ml-5">{{ person.name }}</h1>
      <span class="flex-grow justify-self-end text-right font-bold mr-5">{{
          person.totalDebt | separateValue
        }}</span>
    </div>
    <div>
      <app-transaction
          v-for="trans in transactions"
          :key="trans.id"
          :transaction="trans"
      ></app-transaction>
    </div>
    <div class="w-full flex px-5 gap-5">
      <button class="w-1/2 bg-gray-50 p-3 rounded-full font-bold" @click="$helpers.back()">BACK</button>
      <button class="w-1/2 bg-control text-light-grey p-3 rounded-full font-bold" @click="isPay = !isPay">PAY</button>
    </div>
  </div>
</template>

<script>
import store from "@/store"
import {personStore, Timestamp, transactionStore} from "@/plugin/db";
import AppTransaction from "@/components/ui/AppTransaction";
import AppModal from "@/components/modal/AppModal";
import Transaction from "@/model/Transaction.model";
import {CategoryService} from "@/service/Category.service";
import {TransactionService} from "@/service/Transaction.service";
import {WalletService} from "@/service/Wallet.service";

export default {
  data() {
    return {
      person: {},
      transactions: [],
      isPay: false,
    }
  },
  computed: {
    amount() {
      return this.person.totalDebt
    }
  },
  methods: {
    async repaying() {
      this.$helpers.loading();
      try {
        let transaction = new Transaction();
        //Refined Data
        transaction.time = Timestamp.fromDate(new Date());
        transaction.value = Number.parseFloat(this.amount) * -1;
        transaction.category = await CategoryService.fetchCategory("Repayment");
        transaction.person = this.person;
        transaction.person.totalDebt = this.person.totalDebt - this.amount;
        transaction.wallet = await WalletService.fetchWallet("Overview");
        await TransactionService.addNew(transaction);
        this.$helpers.showSuccess();
        await this.$helpers.back();
      } catch (e) {
        this.$helpers.showError(e);
      }
    }
  },
  components: {
    AppTransaction,
    AppModal
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    return {
      person: personStore.doc(this.$route.params.id),
      transactions: transactionStore
          .where("uid", "==", uid)
          .where("category.type", "in", this.$getConst("DEBT_DICT"))
          .where("person.id", "==", this.$route.params.id)
          .orderBy("time", "desc")
    }
  },
}
</script>

<style scoped>

</style>