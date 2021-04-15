<template>
  <div v-if="wallet" class="desktop-dashboard">
    <wallet-card
        :wallet="wallet"
        class="relative"
    ></wallet-card>
    <!--    Overview Information-->
    <div>
      <div class="flex gap-3">
        <button :class="['btn', activeOverview==='week'&&'btn-active']" @click="activeOverview='week'">Week</button>
        <button :class="['btn', activeOverview==='month'&&'btn-active']" @click="activeOverview='month'">Month</button>
        <button :class="['btn', activeOverview==='year'&&'btn-active']" @click="activeOverview='year'">Year</button>
      </div>
      <div class="grid grid-cols-2 grid-rows-2 gap-2 w-max mt-3">
        <h1 class="font-bold text-lg">INCOME </h1><span
          class="ml-3 font-bold text-lg text-green-400">{{ 3000000 | separateValue }}</span>
        <h1 class="font-bold text-lg">EXPENSE </h1><span
          class="ml-3 font-bold text-lg text-red-400">{{ 4500000 | separateValue }}</span>
        <h1 class="font-bold text-lg">NET </h1><span
          :class="['ml-3 font-bold text-lg',(-1500000>0)?'text-green-400':'text-red-400']">{{
          -1500000 | separateValue
        }}</span>
      </div>
    </div>
    <!--    All Trans-->
    <div class="w-full h-full  row-span-2">
      <h1 class="font-bold text-gray-700 text-lg">Transactions</h1>
      <div class="bg-white w-full h-full rounded-xl">
        <datepicker v-model="selectedDate"
                    format="dd/MM/yyyy"
                    input-class="top-2 left-3 text-gray-400 font-bold absolute cursor-pointer w-fit"
                    placeholder="Select Date"
        ></datepicker>
        <div class="py-10">
          <div v-if="filterTransactions.length===0" class="text-center  italic text-gray-500">No Transactions</div>
          <app-transaction v-for="trans in filterTransactions" v-else :key="trans.id" :transaction="trans"
                           class="shadow-none"/>
        </div>
      </div>
    </div>
    <!--    Debt/Loan-->
    <div class="w-full h-full  row-span-2">
      <h1 class="font-bold text-gray-700 text-lg">Debt/Loan</h1>
      <div class="bg-white w-full h-full rounded-xl">
        <ul class="flex justify-around text-gray-400 font-bold cursor-pointer">
          <li :class="['uppercase py-2 w-full h-full text-center rounded-tl-xl', isDebt?'text-black bg-white':'text-gray-500 bg-gray-200']">
            Debt
          </li>
          <li :class="['uppercase py-2 w-full h-full  text-center rounded-tr-xl', !isDebt?'text-black bg-white':'text-gray-500 bg-gray-200']">
            Loan
          </li>
        </ul>
        <div class="py-10">
        </div>
      </div>
    </div>
    <!--    ...-->
    <div class="w-full"></div>
  </div>
</template>

<script>
import AppTransaction from "@/components/ui/AppTransaction";
import {transactionStore, walletStore} from "@/plugin/db";
import store from "@/store"
import WalletCard from "@/components/ui/WalletCard";
import Datepicker from "vuejs-datepicker";
import * as dayjs from "dayjs"

export default {
  data() {
    return {
      isDebt: true,
      transactions: [],
      wallet: {},
      activeOverview: "week",
      selectedDate: new Date(),
      filterTransactions: [],
    };
  },
  watch: {
    selectedDate: {
      immediate: true,
      handler: function (value) {
        console.log(value)
        this.filterTransactions = this.transactions.filter(trans => {
          return dayjs(trans.time.toDate()).isSame(dayjs(value), "day");
        })
      }
    }
  },
  methods: {
    // async fetchTransaction(time) {
    //   const uid = store.getters["userModule/user"].data.uid;
    //   const wallet = store.getters["userModule/user"].data.selectedWallet.id;
    //   const transactionRefs = transactionStore
    //       .where("uid", "==", uid)
    //       .where("wallet.id", "==", wallet)
    //       .where("time", "==", Timestamp(time));
    //   const snapshot = await transactionRefs.get();
    //   this.transactions = snapshot.data()
    // }
  },
  components: {
    AppTransaction,
    WalletCard,
    Datepicker
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    const wallet = store.getters["userModule/user"].data.selectedWallet.id;
    return {
      transactions: transactionStore
          .where("uid", "==", uid)
          .where("wallet.id", "==", wallet),
      wallet: walletStore.doc(wallet),
    };
  }
};
</script>