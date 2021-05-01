<template>
  <div v-if="user" class="desktop-dashboard">
    <app-modal
        v-if="isOpen"
        class="z-50 absolute "
        @away="$store.dispatch('modalModule/changeModal')"
    >
      <component :is="modal"></component>
    </app-modal>
    <wallet-card
        :wallet="wallet"
        class="relative"
        @click.native="$store.dispatch('modalModule/changeModal','choose-wallet')"
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
import {transactionStore} from "@/plugin/db";
import store from "@/store"
import WalletCard from "@/components/ui/WalletCard";
import AppModal from "@/components/modal/AppModal";
import {mapGetters} from "vuex";
import OverviewInformation from "@/components/ui/OverviewInformation";
import AllTransaction from "@/components/ui/AllTransaction";
import DebtLoan from "@/components/ui/DebtLoan";
import ChooseWallet from "@/components/modal/ChooseWallet";
import TransferMoney from "@/components/modal/TransferMoneyModal";
import AdjustBalance from "@/components/modal/AdjustBalanceModal";

export default {
  computed: {
    ...mapGetters({
      user: "userModule/user",
      modal: "modalModule/modal",
      isOpen: "modalModule/isOpen"
    }),
    wallet() {
      return this.user.data.selectedWallet;
    }
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
    };
  }
};
</script>