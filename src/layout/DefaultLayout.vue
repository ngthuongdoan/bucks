<template>
  <div class="bg-gray-300 min-h-screen min-w-full">
    <action-button class="absolute right-10 bottom-10"></action-button>
    <app-modal
        v-if="isOpen"
        class="z-50 absolute "
        @away="$store.dispatch('modalModule/changeModal')"
    >
      <component :is="modal"></component>
    </app-modal>
    <app-sidebar></app-sidebar>
    <!--    <app-right-sidebar></app-right-sidebar>-->
    <main>
      <router-view></router-view>
    </main>

  </div>
</template>

<script>
import AppSidebar from "@/components/layout/AppSidebar";
import ActionButton from "@/components/ui/ActionButton";
import {mapGetters} from "vuex";
import TransferMoney from "@/components/modal/TransferMoneyModal";
import AdjustBalance from "@/components/modal/AdjustBalanceModal";
import ChooseWallet from "@/components/modal/ChooseWallet";
import AddWallet from "@/components/modal/AddWallet";
import AddTransaction from "@/components/modal/AddTransaction";

import AppModal from "@/components/modal/AppModal";
import WalletModal from "@/components/modal/WalletModal";

export default {
  computed: {
    ...mapGetters({
      user: "userModule/user",
      modal: "modalModule/modal",
      isOpen: "modalModule/isOpen"
    }),
  },
  components: {
    AppSidebar,
    ActionButton,
    AppModal,
    TransferMoney,
    AdjustBalance,
    ChooseWallet,
    AddTransaction,
    AddWallet,
    WalletModal
  }
};
</script>

<style>

</style>