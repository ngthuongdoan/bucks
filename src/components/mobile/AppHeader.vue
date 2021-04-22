<template>
  <div class="fixed">
    <app-modal
        v-if="optionModal.open"
        class="z-50 absolute "
        @away="closeOption"
    >
      <component :is="optionModal.name" :wallet="wallet" @close="closeOption"></component>
    </app-modal>
    <img alt="" class="w-screen" src="~@/assets/img/top-panel.svg"/>
    <h1
        class="absolute z-10 top-5 left-5  text-xl text-white font-monoton"
    >
      bucks
    </h1>
    <img
        alt=""
        class="absolute z-10 top-7 right-5 w-6 cursor-pointer"
        src="https://img.icons8.com/ios/64/000000/card-exchange.png"
        @click="$helpers.to('/wallet')"
    />
    <wallet-card
        v-if="wallet"
        :wallet="wallet"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-20 translate-z"
        @open-modal="openOption($event)"
    ></wallet-card>
  </div>
</template>

<script>
import WalletCard from "@/components/ui/WalletCard";
import {walletStore} from "@/plugin/db";
import store from "@/store"
import AppModal from "@/components/modal/AppModal";

export default {
  data() {
    return {
      wallet: {},
      optionModal: {
        open: false,
        name: "",
      },
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
    WalletCard,
    AppModal,
    TransferMoney: () => import("@/components/modal/TransferMoneyModal"),
    AdjustBalance: () => import("@/components/modal/AdjustBalanceModal"),
  },
  firestore() {
    const selectedWallet = store.getters["userModule/user"].data.selectedWallet;
    return {
      wallet: walletStore.doc(selectedWallet.id)
    }
  }
};
</script>

<style>
</style>