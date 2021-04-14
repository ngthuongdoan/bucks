<template>
  <div v-if="isMobile">
    <app-header></app-header>
    <div class="px-4 pt-80 ">
      <app-transaction v-for="trans in transactions" :key="trans.id" :transaction="trans"/>
    </div>
  </div>
  <div v-else class="desktop-dashboard">
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
      <div class="grid grid-cols-2 grid-rows-3 gap-2 w-max mt-3">
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
    <div class="w-full row-span-2">
      <h1 class="font-bold text-gray-700 text-lg">Transactions</h1>
      <div class="bg-white w-full h-full rounded-xl">
        <datepicker v-model="selectedDate"
                    format="dd/MM/yyyy"
                    input-class=" top-2 left-3 text-gray-400 font-bold absolute cursor-pointer w-fit"
                    placeholder="Select Date"
                    @selected="fetchTransaction"
        ></datepicker>
        <div class="py-10">
          <app-transaction v-for="trans in transactions" :key="trans.id" :transaction="trans" class="shadow-none"/>
        </div>
      </div>
    </div>
    <!--    Debt/Loan-->
    <!--    ...-->
  </div>
</template>

<script>
import AppHeader from "@/components/mobile/AppHeader";
import AppTransaction from "@/components/ui/AppTransaction";
import {transactionStore, walletStore} from "@/plugin/db";
import {isMobile} from "mobile-device-detect";
import store from "@/store"
import WalletCard from "@/components/ui/WalletCard";
import Datepicker from "vuejs-datepicker";
import * as dayjs from "dayjs";

export default {
  data() {
    return {
      isMobile,
      transactions: [],
      wallet: {},
      activeOverview: "week",
      selectedDate: new Date()
    };
  },
  methods: {
    fetchTransaction(evt) {
      console.log(dayjs(evt).format("DD/MM/YYYY"))
    }
  },
  components: {
    AppTransaction,
    AppHeader,
    WalletCard,
    Datepicker

  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    const wallet = store.getters["userModule/user"].data.selectedWallet.id;
    return {
      wallet: walletStore.doc(wallet),
      transactions: transactionStore
          .where("uid", "==", uid)
          .where("wallet.id", "==", wallet)
    };
  }
};
</script>