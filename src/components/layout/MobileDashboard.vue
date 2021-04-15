<template>
  <div>
    <app-header></app-header>
    <div class="px-4 pt-80 ">
      <app-transaction v-for="trans in transactions" :key="trans.id" :transaction="trans"/>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/mobile/AppHeader";
import AppTransaction from "@/components/ui/AppTransaction";
import {transactionStore} from "@/plugin/db";
import store from "@/store"

export default {
  data() {
    return {
      transactions: [],
    };
  },
  components: {
    AppTransaction,
    AppHeader,
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