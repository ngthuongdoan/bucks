<template>
  <div v-if="wallet" class="desktop-dashboard">
    <component :is="optionModal" class="absolute z-50 bg-red-500"></component>
    <app-modal
        v-if="walletModal"
        @away="toggleWalletModal"
        class="z-50 absolute "
    >
      <wallet-card v-for="(wallet, i) in wallets" :key="wallet.id"
                   :show-setting="false"
                   :style="{
                         zIndex:i,
                         transform: `rotateY(10deg) translateY(${(i)*((isMobile)?150:-50)}px) !important`
                     }"
                   :wallet="wallet"
                   class="wallet lg:w-3/4"
                   @click.native="changeWallet(wallet)"
      ></wallet-card>
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
import {transactionStore, userStore, walletStore} from "@/plugin/db";
import store from "@/store"
import WalletCard from "@/components/ui/WalletCard";
import AppModal from "@/components/modal/AppModal";
import {mapGetters} from "vuex";
import OverviewInformation from "@/components/ui/OverviewInformation";
import AllTransaction from "@/components/ui/AllTransaction";
import DebtLoan from "@/components/ui/DebtLoan";
import {isMobile} from "mobile-device-detect";

export default {
  data() {
    return {
      walletModal: false,
      isDebt: true,
      optionModal: "",
      wallets: [],
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
      this.walletModal = true;
    },
    toggleWalletModal() {
      this.walletModal = false;
    },
    openOption(modal) {
      console.log(modal)
      this.optionModal = modal;
    },
    async changeWallet(wallet) {
      try {
        const users = userStore.doc(this.$store.getters["userModule/user"].data.uid);
        this.$bind('users', users);
        await this.$firestoreRefs.users.update({selectedWallet: {id: wallet.id, ...wallet}});
        await this.$store.dispatch("userModule/changeSelected", wallet);
        this.toggleWalletModal()
      } catch (e) {
        console.log(e);
      }
    },
  },
  components: {
    WalletCard,
    AppModal,
    OverviewInformation,
    AllTransaction,
    DebtLoan,
    AdjustBalance: () => import("@/components/modal/AdjustBalanceModal"),
    TransferMoney: () => import("@/components/modal/TransferMoneyModal")
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    const wallet = store.getters["userModule/user"].data.selectedWallet.id;
    return {
      transactions: transactionStore
          .where("uid", "==", uid)
          .where("wallet.id", "==", wallet),
      wallet: walletStore.doc(wallet),
      wallets: walletStore.where("uid", "==", uid)
    };
  }
};
</script>