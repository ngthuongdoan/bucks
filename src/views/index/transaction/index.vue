<template>
  <add-layout title="Add Transaction">
    <app-modal
        v-if="walletModal"
        @away="toggleWalletModal"
        @change-wallet="changeWallet($event)">
      <ul class="w-full p-2 flex-auto">
        <li v-for="(item, i) in wallets" :key="i" :style="{backgroundColor:item.color}"
            class="shadow-xl w-full px-5 py-2 rounded-2xl my-2 cursor-pointer"
            @click="changeWallet(item)">
          <h1 class="font-bold text-white">{{ item.name }}</h1>
          <p class="italic text-gray-200 text-sm">{{ item.amount }} {{ item.currency.key }}</p>
        </li>
      </ul>
    </app-modal>
    <category-modal
        v-if="categoryModal"
        @away="toggleCategoryModal"
        @change-category="changeCategory($event)"
    ></category-modal>
    <form id="addForm" class="flex flex-col m-auto gap-3 px-7 py-5" @submit.prevent="addTransaction">
      <div class="flex flex-col justify-center items-center mb-4 gap-2">
        <label>
          <input
              v-model="transaction.value"
              class="add-input text-4xl font-bold text-center m-0"
              type="text"
          />
        </label>
        <p class="text-center w-full mx-0">or</p>
        <label for="image">
          <img
              alt=""
              class="m-0 grayscale"
              src="https://img.icons8.com/metro/26/000000/camera.png"/>
        </label>
        <input
            id="image"
            ref="fileInput"
            accept="image/*"
            capture="environment"
            class="hidden"
            type="file"
            @change="uploadImage"
        />
        <cropper
            v-if="transaction.image"
            :src="transaction.image"
            class="cropper"
            @change="change"
        ></cropper>
        <button v-if="transaction.image" type="button" @click="crop">
          Crop it
        </button>
      </div>
      <div class="grid grid-cols-add items-end gap-y-2">
        <label class="font-bold self-start" for="note">Note</label>
        <textarea
            id="note"
            v-model="transaction.detail"
            class="add-input"
            rows="5"
        ></textarea>
        <label class="font-bold  mt-2" for="wallet">Wallet</label>
        <div class="add-input " @click="toggleWalletModal">{{ transaction.wallet.name || "" }}</div>
        <label class="font-bold mt-2" for="category">Category</label>
        <div class="add-input" @click="toggleCategoryModal">{{ transaction.category.name || "" }}</div>
        <label class="font-bold  " for="createdDate">Date</label>
        <input id="createdDate" v-model="tempDate" class="add-input" type="date"/>
      </div>
    </form>
  </add-layout>

</template>

<script>
import AppModal from "@/components/modal/AppModal";
import CategoryModal from "@/components/modal/CategoryModal";
import AddLayout from "@/layout/AddLayout";

import Transaction from "@/model/Transaction.model";
import {Timestamp, transactionStore, walletStore} from "@/plugin/db";
import worker from "@/plugin/tesseract";
import store from "@/store";
import {Cropper} from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import {WalletService} from "@/service/Wallet.service";

export default {
  data() {
    return {
      transaction: new Transaction(),
      cropper: {},
      walletModal: false,
      categoryModal: false,
      tempDate: "",
      wallets: []
    };
  },
  methods: {
    change(result) {
      this.cropper = Object.assign({}, result);
    },
    toggleWalletModal() {
      this.walletModal = !this.walletModal;
    },
    toggleCategoryModal() {
      this.categoryModal = !this.categoryModal;
    },
    changeWallet(wallet) {
      this.transaction.wallet = Object.assign({id: wallet.id}, wallet);
      this.toggleWalletModal()
    },
    changeCategory(category) {
      this.transaction.category = Object.assign({id: category.id}, category);
    },
    crop() {
      this.transaction.image = this.cropper.canvas.toDataURL("image/png", 1);
      this.recognize();
    },
    uploadImage() {
      const image = this.$refs.fileInput.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (evt) => {
        this.transaction.image = evt.target.result;
      };
    },
    async recognize() {
      this.$helpers.loading();
      try {
        const result = await worker.recognize(this.transaction.image);
        const lines = result.data.lines;
        lines.forEach((line) => {
          const words = line.words;
          this.transaction.detail += `${words[0].text} ${words[1].text} ${
              words.slice(-1)[0].text
          }\n`;
        });
        this.transaction.detail = result.data.words
            .slice(-1)[0]
            .text.trim()
            .replace(new RegExp("[\u{0080}-\u{FFFF}]", "gu"), "");
        this.$helpers.close();
      } catch (err) {
        this.$helpers.showError(err);
      } finally {
        await worker.terminate();
      }
    },
    async addTransaction() {
      this.$helpers.loading();
      try {
        //Refined Data
        this.transaction.time = Timestamp.fromDate(new Date(Date.parse(this.tempDate)));
        this.transaction.value = Number.parseFloat(this.transaction.value);
        await transactionStore.add({...this.transaction});
        //Update Wallet Value
        await WalletService.updateWalletAmount(
            this.transaction.value,
            this.transaction.category.type,
            this.transaction.wallet.id
        );
        this.$helpers.showSuccess();

        await this.$helpers.to("/dashboard");
      } catch (e) {
        this.$helpers.showError(e);
      }
    }
  },
  components: {
    Cropper,
    AddLayout,
    AppModal,
    CategoryModal
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    return {
      wallets: walletStore.where("uid", "==", uid)
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