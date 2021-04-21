<template>
  <div class="w-full h-80 max-h-80 row-span-2">
    <h1 class="font-bold text-gray-700 text-lg">Transactions</h1>
    <div class="bg-white w-full h-full rounded-xl overflow-auto">
      <datepicker v-model="selectedDate"
                  format="dd/MM/yyyy"
                  input-class="top-2 left-3 text-gray-400 font-bold absolute cursor-pointer w-fit"
                  placeholder="Select Date"
                  :highlighted="highlightedFn"
      ></datepicker>
      <div class="py-10 ">
        <div v-if="filterTransactions.length===0" class="text-center  italic text-gray-500">No Transactions</div>
        <app-transaction v-for="trans in filterTransactions" v-else :key="trans.id" :transaction="trans"
                         class="shadow-none"/>
      </div>
    </div>
  </div>
</template>

<script>
import * as dayjs from "dayjs";
import store from "@/store";
import {transactionStore} from "@/plugin/db";
import AppTransaction from "@/components/ui/AppTransaction";
import Datepicker from "vuejs-datepicker";

export default {
  name: "AllTransaction",
  data() {
    return {
      selectedDate: new Date(),
      transactions: [],
      filterTransactions: [],
      highlightedFn: {
        customPredictor(date) {
          return dayjs(date).isSame(dayjs(), "day");
        }
      },
    }
  },
  watch: {
    selectedDate: {
      immediate: true,
      handler: function (value) {
        this.filterTransactions = this.transactions.filter(trans => {
          return dayjs(trans.time.toDate()).isSame(dayjs(value), "day");
        })
      }
    },
    transactions() {
      this.selectedDate = new Date();
    }
  },
  components: {
    AppTransaction,
    Datepicker,
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    const wallet = store.getters["userModule/user"].data.selectedWallet.id;
    return {
      transactions: transactionStore
          .where("uid", "==", uid)
          .where("wallet.id", "==", wallet),
    };
  }
}
</script>

<style scoped>

</style>