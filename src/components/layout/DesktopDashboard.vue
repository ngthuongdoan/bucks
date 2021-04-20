<template>
  <div v-if="wallet" class="desktop-dashboard">
    <all-wallet-modal
        v-if="walletModal"
        @away="toggleWalletModal"
    ></all-wallet-modal>
    <wallet-card
        :wallet="wallet"
        class="relative"
        @click.native="chooseWallet"
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
import AllWalletModal from "@/components/modal/AllWalletModal";
import {mapGetters} from "vuex";
import OverviewInformation from "@/components/ui/OverviewInformation";
import AllTransaction from "@/components/ui/AllTransaction";
import DebtLoan from "@/components/ui/DebtLoan";

export default {
  data() {
    return {
      walletModal: false,
      isDebt: true,

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
      this.walletModal = true;
    },
    toggleWalletModal() {
      this.walletModal = false;
    }
  },
  components: {
    WalletCard,
    AllWalletModal,
    OverviewInformation,
    AllTransaction,
    DebtLoan
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