<template>
  <div v-if="user">
    <app-modal
        v-if="isOpen"
        class=" absolute z-50"
        @away="$store.dispatch('modalModule/changeModal')"
    >
      <component :is="modal" :wallet="user.data.selectedWallet"
                 @close="$store.dispatch('modalModule/changeModal')"></component>
    </app-modal>
    <app-header @open-modal="$store.dispatch('modalModule/changeModal', {modal:$event})"></app-header>
    <div class="absolute left-0 right-0 px-4 z-0" style="top: 300px">
      <div class="flex mx-7">
        <datepicker v-model="selectedDate"
                    :highlighted="highlightedFn"
                    format="dd/MM/yyyy"
                    input-class="text-gray-400 bg-light-grey font-bold cursor-pointer w-fit justify-self-start"
                    placeholder="Select Date"
        ></datepicker>
        <p class="font-bold justify-self-end">
          Total:
          <span :class="(total<0)?'text-red-400':'text-green-400'">{{
              total | separateValue
            }}</span>
        </p>
      </div>
      <div class="w-full h-80 overflow-y-scroll">
        <div v-if="filterTransactions.length===0" class="text-center italic text-gray-500">No Transactions</div>
        <app-transaction v-for="trans in filterTransactions" :key="trans.id" :transaction="trans"/>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/mobile/AppHeader";
import AppTransaction from "@/components/ui/AppTransaction";
import {transactionStore} from "@/plugin/db";
import store from "@/store"
import * as dayjs from "dayjs";
import Datepicker from "vuejs-datepicker";
import AppModal from "@/components/modal/AppModal";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      transactions: [],
      filterTransactions: [],
      selectedDate: new Date(),
      highlightedFn: {
        customPredictor(date) {
          return dayjs(date).isSame(dayjs(), "day");
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      user: "userModule/user",
      isOpen: "modalModule/isOpen",
      modal: "modalModule/modal"
    }),
    total() {
      return this.filterTransactions.reduce((accumulator, currentValue) => accumulator + Number.parseFloat(currentValue.value), 0)
    },
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
    AppHeader,
    Datepicker,
    AppModal,
    AdjustBalanceModal: () => import("@/components/modal/AdjustBalanceModal"),
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    const wallet = store.getters["userModule/user"].data.selectedWallet;
    return {
      transactions: transactionStore
          .where("uid", "==", uid)
          .where("wallet", "==", wallet)
    };
  }
};
</script>
