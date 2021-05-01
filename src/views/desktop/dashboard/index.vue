<template>
  <div v-if="user" class="desktop-dashboard">
    <app-modal
        v-if="optionModal.open"
        class="z-50 absolute "
        @away="closeOption"
    >
      <component :is="optionModal.name" :wallet="wallet" @close="closeOption"></component>
    </app-modal>
    <wallet-card
        :wallet="wallet"
        class="relative"
        @click.native="chooseWallet"
        @open-modal="openOption($event)"
    ></wallet-card>
    <!--    Overview Information-->
    <overview-information></overview-information>
    <!--    All Trans-->
    <all-transaction></all-transaction>
    <!--    Debt/Loan-->
    <debt-loan></debt-loan>
    <!--    ...-->
    <div class="w-full"></div>
  </div>
</template>

<script>
import {transactionStore, walletStore} from "@/plugin/db";
import store from "@/store"
import WalletCard from "@/components/ui/WalletCard";
import AppModal from "@/components/modal/AppModal";
import {mapGetters} from "vuex";
import OverviewInformation from "@/components/ui/OverviewInformation";
import AllTransaction from "@/components/ui/AllTransaction";
import DebtLoan from "@/components/ui/DebtLoan";
import {isMobile} from "mobile-device-detect";
import ChooseWallet from "@/components/modal/ChooseWallet";
import TransferMoney from "@/components/modal/TransferMoneyModal";
import AdjustBalance from "@/components/modal/AdjustBalanceModal";


export default {
  data() {
    return {
      walletModal: false,
      isDebt: true,
      optionModal: {
        open: false,
        name: "",
      },
      isMobile
    };
  },
  computed: {
    ...mapGetters({
      user: "userModule/user"
    }),
    wallet() {
      return this.user.data.selectedWallet;
    }
  },
  methods: {
    chooseWallet() {
      this.optionModal.open = true;
      this.optionModal.name = "ChooseWallet"
    },
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
    ChooseWallet,
    WalletCard,
    AppModal,
    OverviewInformation,
    AllTransaction,
    DebtLoan,
    TransferMoney,
    AdjustBalance
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