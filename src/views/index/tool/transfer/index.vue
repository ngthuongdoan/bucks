<template>
  <add-layout title="Transfer Money">
    <app-modal
        v-if="walletModal"
        @away="toggleWalletModal"
    >
      <ul class="w-full p-2 flex-auto">
        <li v-for="(item, i) in wallets" :key="i" :style="{backgroundColor:item.color}"
            class="shadow-xl w-full px-5 py-2 rounded-2xl my-2 cursor-pointer"
            @click="changeWallet(item)">
          <h1 class="font-bold text-white">{{ item.name }}</h1>
          <p class="italic text-gray-200 text-sm">{{ item.amount }} {{ item.currency.key }}</p>
        </li>
      </ul>
    </app-modal>
    <form id="addForm" class="flex flex-col m-auto gap-3 px-7 py-5" @submit.prevent="addTransaction">
      <div class="flex flex-col justify-center items-center mb-4 gap-2">
        <label>
          <input
              v-model="transaction.value"
              class="add-input text-4xl font-bold text-center m-0"
              type="text"
          />
        </label>
      </div>
      <div class="grid grid-cols-add items-end gap-y-2">
        <label class="font-bold  mt-2" for="wallet">From</label>
        <div class="add-input " @click="toggleWalletModal('from')">{{ fromWallet.name || "" }}</div>
        <label class="font-bold  mt-2" for="wallet">To</label>
        <div class="add-input " @click="toggleWalletModal('to')">{{ toWallet.name || "" }}</div>
        <label class="font-bold self-start" for="note">Note</label>
        <textarea
            id="note"
            v-model="transaction.detail"
            class="add-input"
        ></textarea>
        <label class="font-bold  " for="createdDate">Date</label>
        <input id="createdDate" v-model="tempDate" class="add-input" type="date"/>
      </div>
    </form>
  </add-layout>
</template>

<script>
import AppModal from "@/components/modal/AppModal";
import AddLayout from "@/layout/AddLayout";
import {Timestamp, walletStore} from "@/plugin/db";
import store from "@/store";
import "vue-advanced-cropper/dist/style.css";
import {TransactionService} from "@/service/Transaction.service";
import Transaction from "@/model/Transaction.model";
import Wallet from "@/model/Wallet.model";
import {CategoryService} from "@/service/Category.service";

export default {
  data() {
    return {
      mode: "from",
      fromWallet: new Wallet(),
      toWallet: new Wallet(),
      fromTransaction: new Transaction(),
      toTransaction: new Transaction(),
      transaction: new Transaction(),
      adjustBalance: {},
      walletModal: false,
      tempDate: "",
      wallets: []
    };
  },
  methods: {
    toggleWalletModal(mode) {
      this.mode = mode;
      this.walletModal = !this.walletModal;
    },
    changeWallet(wallet) {
      switch (this.mode) {
        case "from":
          this.fromWallet = Object.assign({id: wallet.id}, wallet)
          break;
        case "to":
          this.toWallet = Object.assign({id: wallet.id}, wallet)
          break;
        default:
          break;
      }
      this.toggleWalletModal()
    },
    async addTransaction() {
      this.$helpers.loading();
      try {
        //Refined Data
        this.transaction.time = Timestamp.fromDate(new Date(Date.parse(this.tempDate)));
        this.transaction.category = await CategoryService.fetchAdjustBalance();

        this.fromTransaction.time = this.transaction.time;
        this.fromTransaction.category = this.transaction.category;
        this.fromTransaction.category.type = "expense";
        this.fromTransaction.value = -Number.parseFloat(this.transaction.value);
        this.fromTransaction.wallet = this.fromWallet;

        this.toTransaction.time = this.transaction.time;
        this.toTransaction.category = this.transaction.category;
        this.toTransaction.category.type = "income";
        this.toTransaction.value = Number.parseFloat(this.transaction.value);
        this.toTransaction.wallet = this.toWallet;

        await TransactionService.addNew(Object.assign({}, this.fromTransaction));
        await TransactionService.addNew(Object.assign({}, this.toTransaction));
        this.$helpers.showSuccess();
        await this.$helpers.to("/dashboard");
      } catch (e) {
        this.$helpers.showError(e);
      }
    }
  },
  components: {
    AddLayout,
    AppModal,
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    return {
      wallets: walletStore.where("uid", "==", uid),
    };
  }
};
</script>

<style>
/*
  Maybe you need to set the limits for the cropper sizes or its container sizes
  otherwise a cropping image will try to fill all available space
*/
.cropper {
  height: fit-content;
  max-height: 600px;
  background: #ddd;
}
</style>