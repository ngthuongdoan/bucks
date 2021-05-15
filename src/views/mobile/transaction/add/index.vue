<template>
  <add-layout title="Add Transaction">
    <app-modal
        v-if="isOpen"
        :is-category="this.modal==='category-modal'"
        @away="$store.dispatch('modalModule/changeModal')"
    >
      <component
          :is="modal"
          @change-wallet="changeWallet($event)"
          @change-person="changePerson($event)"
          @change-category="changeCategory($event)"
      ></component>
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
        <label class="font-bold mt-2" for="wallet">Wallet</label>
        <div class="add-input " @click="$store.dispatch('modalModule/changeModal',{modal:'wallet-modal'})">
          {{ wallet.name || "" }}
        </div>
        <label class="font-bold mt-2" for="category">Category</label>
        <div class="add-input" @click="$store.dispatch('modalModule/changeModal',{modal:'category-modal'})">
          {{ transaction.category.name || "" }}
        </div>
        <label class="font-bold mt-2" for="createdDate">Date</label>
        <input id="createdDate" v-model="tempDate" class="add-input" type="date"/>
        <label v-if="isDebtLoan" class="font-bold mt-2">Person</label>
        <div v-if="isDebtLoan" class="add-input"
             @click="$store.dispatch('modalModule/changeModal',{modal:'person-modal'})">{{
            transaction.person.name || ""
          }}
        </div>
      </div>
    </form>
  </add-layout>
</template>

<script>
import AppModal from "@/components/modal/AppModal";
import CategoryModal from "@/components/modal/CategoryModal";
import PersonModal from "@/components/modal/PersonModal";
import AddLayout from "@/layout/AddLayout";
import Transaction from "@/model/Transaction.model";
import {Timestamp, walletStore} from "@/plugin/db";
import worker from "@/plugin/tesseract";
import {Cropper} from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import {TransactionService} from "@/service/Transaction.service";
import WalletModal from "@/components/modal/TransactionWalletModal";
import {mapGetters} from "vuex";
import {ImageService} from "@/service/Image.service";

export default {
  data() {
    return {
      transaction: new Transaction(),
      cropper: {},
      tempDate: "",
      wallets: [],
      wallet: {},
      isDebtLoan: false
    };
  },
  computed: {
    ...mapGetters({
      modal: "modalModule/modal",
      isOpen: "modalModule/isOpen"
    })
  },
  watch: {
    "transaction.wallet"(newValue) {
      this.$bind('wallet', walletStore.doc(newValue))
    }
  },
  methods: {
    changeWallet(wallet) {
      this.transaction.wallet = wallet.id;
      this.$store.dispatch("modalModule/changeModal")
    },
    changeCategory(category) {
      this.transaction.category = {id: category.id, ...category};
      this.isDebtLoan = this.$getConst("DEBT_LOAN_DICT").includes(category.type);
      this.$store.dispatch("modalModule/changeModal")

    },
    changePerson(person) {
      this.transaction.person = {id: person.id, ...person}
      this.$store.dispatch("modalModule/changeModal")

    },
    uploadImage() {
      const image = this.$refs.fileInput.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (evt) => {
        this.transaction.image = evt.target.result;
      };
    },
    change(result) {
      this.cropper = Object.assign({}, result);
    },
    crop() {
      this.transaction.image = this.cropper.canvas.toDataURL("image/png", 1);
      this.recognize();
    },
    async recognize() {
      const image = ImageService.preprocessImage(this.cropper.canvas);
      this.transaction.image = image.src
      this.$helpers.loading();
      try {
        const result = await worker.recognize(image);
        const lines = result.data.lines;
        lines.forEach((line) => {
          const words = line.words;
          console.log(line)
          this.transaction.detail += line.text
          //
          //     `${words[0].text} ${words[1].text} ${
          //     words.slice(-1)[0].text
          // }\n`;
        });
        // this.transaction.detail = result.data.words
        //     .slice(-1)[0]
        //     .text.trim()
        //     .replace(new RegExp("[\u{0080}-\u{FFFF}]", "gu"), "");
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
        this.transaction.value = Number.parseFloat(this.transaction.value) *
            (this.$getConst("INCREASE_DICT").includes(this.transaction.category.type) ? 1 : -1)

        if (this.$getConst("DEBT_DICT").includes(this.transaction.category.type)) {
          this.transaction.person.totalDebt += this.transaction.value;
        } else if (this.$getConst("LOAN_DICT").includes(this.transaction.category.type)) {
          this.transaction.person.totalLoan += this.transaction.value;
        }

        await TransactionService.addNew(this.transaction);
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
    CategoryModal,
    WalletModal,
    PersonModal
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