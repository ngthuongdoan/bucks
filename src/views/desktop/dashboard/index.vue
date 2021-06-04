<template>
  <div v-if="user" class="desktop-dashboard">
    <wallet-card
        :wallet="wallet"
        class="relative"
        @click.native="$store.dispatch('modalModule/changeModal',{modal:'choose-wallet'})"
    ></wallet-card>
    <!--    Overview Information-->
    <all-budgets></all-budgets>
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
import {mapGetters} from "vuex";
import AllBudgets from "@/components/ui/AllBudgets";
import AllTransaction from "@/components/ui/AllTransaction";
import DebtLoan from "@/components/ui/DebtLoan";

export default {
  data() {
    return {wallet: {}}
  },
  computed: {
    ...mapGetters({
      user: "userModule/user",
    }),
  },
  watch: {
    user: {
      deep: true,
      handler(wallet) {
        this.$bind('wallet', walletStore.doc(wallet.data.selectedWallet))
      }
    }
  },
  components: {
    WalletCard,
    AllBudgets,
    AllTransaction,
    DebtLoan,

  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    const wallet = store.getters["userModule/user"].data.selectedWallet;
    return {
      transactions: transactionStore
          .where("uid", "==", uid)
          .where("wallet", "==", wallet),
      wallet: walletStore.doc(wallet)
    };
  }
};
</script>