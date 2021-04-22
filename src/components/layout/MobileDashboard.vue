<template>
  <div>
    <app-modal
        v-if="optionModal.open"
        class=" absolute z-50"
        @away="closeOption"
    >
      <component :is="optionModal.name" :wallet="user.data.selectedWallet" @close="closeOption"></component>
    </app-modal>
    <app-header @open-modal="openOption($event)"></app-header>
    <div class="absolute left-0 right-0 px-4 top-80 z-0">
      <div class="left-3 fixed" style="top:330px">
        <datepicker v-model="selectedDate"
                    :highlighted="highlightedFn"
                    format="dd/MM/yyyy"
                    input-class="text-gray-400 bg-light-grey font-bold cursor-pointer w-fit"
                    placeholder="Select Date"
        ></datepicker>
      </div>
      <div class="w-full mt-5 h-80 overflow-y-scroll">
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
      selectedDate: new Date(),
      filterTransactions: [],
      optionModal: {
        open: false,
        name: "",
      },
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
    })
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
  methods: {
    openOption(modal) {
      this.optionModal.open = true;
      this.optionModal.name = modal;
    },
    closeOption() {
      this.optionModal.open = false;
      this.optionModal.name = "";
    },
  },
  components: {
    AppTransaction,
    AppHeader,
    Datepicker,
    AppModal,
    TransferMoney: () => import("@/components/modal/TransferMoneyModal"),
    AdjustBalance: () => import("@/components/modal/AdjustBalanceModal"),
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    const wallet = store.getters["userModule/user"].data.selectedWallet.id;
    return {
      transactions: transactionStore
          .where("uid", "==", uid)
          .where("wallet.id", "==", wallet)
    };
  }
};
</script>

<style scoped>

</style>