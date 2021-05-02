<template>
  <div v-if="user" class="desktop-dashboard">
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
import {mapGetters} from "vuex";
import OverviewInformation from "@/components/ui/OverviewInformation";
import AllTransaction from "@/components/ui/AllTransaction";
import DebtLoan from "@/components/ui/DebtLoan";

export default {
  computed: {
    ...mapGetters({
      user: "userModule/user",
    }),
    wallet() {
      return this.user.data.selectedWallet;
    }
  },
  components: {
    WalletCard,
    OverviewInformation,
    AllTransaction,
    DebtLoan,

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