<template>
  <div class="w-full h-80 max-h-80 ">
    <h1 class="font-bold text-gray-700 text-lg">Transactions</h1>
    <div class=" bg-white w-full h-full rounded-xl overflow-auto custom-scrollbar relative">
      <div class="fixed p-3 pb-0 rounded-t-xl bg-white flex">
        <datepicker v-model="selectedDate"
                    :highlighted="highlightedFn"
                    format="dd/MM/yyyy"
                    input-class="text-gray-400 font-bold cursor-pointer flex-grow "
                    placeholder="Select Date"
        ></datepicker>
        <p class="font-bold flex-grow text-right w-full">
          Total:
          <span :class="(total<0)?'text-red-400':'text-green-400'">{{
              total | separateValue
            }}</span></p>
      </div>
      <div class="py-10 ">
        <div v-if="filterTransactions.length===0" class="text-center italic text-gray-500">No Transactions</div>
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
import {mapGetters} from "vuex";

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
  computed: {
    ...mapGetters({
      user: "userModule/user"
    }),
    total() {
      return this.filterTransactions.reduce((accumulator, currentValue) => accumulator + Number.parseFloat(currentValue.value), 0)
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
    },
    user: {
      deep: true,
      handler(user) {
        this.$bind("transactions",
            transactionStore
                .where("uid", "==", user.data.uid)
                .where("wallet", "==", user.data.selectedWallet)
        )
      }
    }
  },
  components: {
    AppTransaction,
    Datepicker,
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    const wallet = store.getters["userModule/user"].data.selectedWallet;
    return {
      transactions: transactionStore
          .where("uid", "==", uid)
          .where("wallet", "==", wallet),
    };
  }
}
</script>

<style scoped>

</style>