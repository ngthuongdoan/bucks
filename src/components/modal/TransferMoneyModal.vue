<template>
  <div>
    <app-modal
        v-if="isSubOpen"
        @away="toggleSubModal"
    >
      <wallet-modal @change-wallet="changeWallet($event)"></wallet-modal>
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
        <div class="add-input " @click="toggleWallet('from')">{{ fromWallet.name || "" }}</div>
        <label class="font-bold  mt-2" for="wallet">To</label>
        <div class="add-input " @click="toggleWallet('to')">{{ toWallet.name || "" }}</div>
        <label class="font-bold self-start" for="note">Note</label>
        <textarea
            id="note"
            v-model="transaction.detail"
            class="add-input"
        ></textarea>
        <label class="font-bold  " for="createdDate">Date</label>
        <input id="createdDate" v-model="tempDate" class="add-input" type="date"/>
      </div>
      <div class="flex w-full items-center justify-center gap-3">
        <input
            class="main-btn p-3 w-2/6"
            type="submit"
            value="Transfer">
        <button class="p-3 bg-gray-200 font-bold text-md w-2/6 cursor-pointer ease-in-out duration-100 transition-all"
                type="button"
                @click="$store.dispatch('modalModule/changeModal')">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import AppModal from "@/components/modal/AppModal";
import {Timestamp} from "@/plugin/db";
import "vue-advanced-cropper/dist/style.css";
import {TransactionService} from "@/service/Transaction.service";
import Transaction from "@/model/Transaction.model";
import Wallet from "@/model/Wallet.model";
import {CategoryService} from "@/service/Category.service";
import WalletModal from "@/components/modal/WalletModal";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      fromWallet: new Wallet(),
      toWallet: new Wallet(),
      fromTransaction: new Transaction(),
      toTransaction: new Transaction(),
      transaction: new Transaction(),
      adjustBalance: {},
      tempDate: "",
      modal: "",
      isSubOpen: false,
      mode: "from",
      wallets: []
    };
  },
  computed: {
    ...mapGetters({
      isOpen: "modalModule/isOpen",
    })
  },
  methods: {
    toggleSubModal(modal = "") {
      this.isSubOpen = !this.isSubOpen;
      this.modal = modal;
    },
    toggleWallet(mode) {
      this.toggleSubModal();
      this.mode = mode;
    },
    changeWallet(wallet) {
      const w = {id: wallet.id, ...wallet};
      this.mode === "from" ? this.fromWallet = {...w} : this.toWallet = {...w};
      this.toggleSubModal()
    },
    createTransaction(type) {
      let transaction = new Transaction();
      transaction.time = this.transaction.time;
      transaction.category = {...this.transaction.category};
      transaction.category.type = type;
      if (type === "expense") {
        transaction.value = Number.parseFloat(this.transaction.value) * -1;
        transaction.wallet = {...this.fromWallet};
      } else {
        transaction.value = Number.parseFloat(this.transaction.value);
        transaction.wallet = {...this.toWallet};
      }
      return transaction;
    },
    async addTransaction() {
      this.$helpers.loading();
      try {
        //Refined Data
        this.transaction.time = Timestamp.fromDate(new Date(Date.parse(this.tempDate)));
        this.transaction.category = await CategoryService.fetchCategory("Adjust Balance");

        this.fromTransaction = this.createTransaction("expense");
        this.toTransaction = this.createTransaction("income");

        await TransactionService.addNew({...this.fromTransaction});
        await TransactionService.addNew({...this.toTransaction});
        this.$helpers.showSuccess();
        await this.$store.dispatch("modalModule/changeModal")
      } catch (e) {
        this.$helpers.showError(e);
      }
    }
  },
  components: {
    AppModal,
    WalletModal
  },
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