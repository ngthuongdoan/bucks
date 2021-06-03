<template>
  <add-layout title="Add Transaction">
    <app-modal
        v-if="isOpen"
        :is-category="this.modal==='category-modal'"
        @away="$store.dispatch('modalModule/changeModal')"
    >
      <component
          :is="modal"
          :detail="transaction.detail"
          @change-detail="transaction.detail = $event"
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
            v-if="ocr"
            :src="ocr"
            class="cropper"
            @change="change"
        ></cropper>
        <button v-if="ocr" class="main-btn w-full p-2" type="button" @click="recognize">
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
            @click="$store.dispatch('modalModule/changeModal',{modal:'blank-modal'})"
        ></textarea>
        <label class="font-bold mt-2">Wallet</label>
        <div class="add-input " @click="$store.dispatch('modalModule/changeModal',{modal:'wallet-modal'})">
          {{ wallet.name || '' }}
        </div>
        <label class="font-bold mt-2">Category</label>
        <div class="add-input" @click="$store.dispatch('modalModule/changeModal',{modal:'category-modal'})">
          {{ transaction.category.name || '' }}
        </div>
        <label class="font-bold mt-2" for="createdDate">Date</label>
        <input id="createdDate" v-model="tempDate" class="add-input" type="date"/>
        <label v-if="isDebtLoan" class="font-bold mt-2">Person</label>
        <div
            v-if="isDebtLoan" class="add-input"
            @click="$store.dispatch('modalModule/changeModal',{modal:'person-modal'})">{{
            transaction.person.name || ''
          }}
        </div>
      </div>
    </form>
  </add-layout>
</template>

<script>
import AppModal from '@/components/modal/AppModal'
import CategoryModal from '@/components/modal/CategoryModal'
import PersonModal from '@/components/modal/PersonModal'
import AddLayout from '@/layout/AddLayout'
import Transaction from '@/model/Transaction.model'
import {Timestamp, walletStore} from '@/plugin/db'
import {load, postProcessing} from '@/plugin/tesseract'
import {Cropper} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import {TransactionService} from '@/service/Transaction.service'
import WalletModal from '@/components/modal/TransactionWalletModal'
import {mapGetters} from 'vuex'
import {ImageService} from '@/service/Image.service'
import {storage} from '@/plugin/storage'
import BlankModal from "@/components/modal/BlankModal";

export default {
  data() {
    return {
      transaction: new Transaction(),
      cropper: {},
      tempDate: '',
      ocr: '',
      wallets: [],
      wallet: {},
      isDebtLoan: false,
    }
  },
  computed: {
    ...mapGetters({
      modal: 'modalModule/modal',
      isOpen: 'modalModule/isOpen',
    }),
  },
  watch: {
    'transaction.wallet'(newValue) {
      this.$bind('wallet', walletStore.doc(newValue))
    },
  },
  methods: {
    changeWallet(wallet) {
      this.transaction.wallet = wallet.id
      this.$store.dispatch('modalModule/changeModal')
    },
    changeCategory(category) {
      this.transaction.category = {id: category.id, ...category}
      this.isDebtLoan = this.$getConst('DEBT_LOAN_DICT').includes(category.type)
      this.$store.dispatch('modalModule/changeModal')

    },
    changePerson(person) {
      this.transaction.person = {id: person.id, ...person}
      this.$store.dispatch('modalModule/changeModal')
    },
    uploadImage() {
      this.$helpers.loading();

      const image = this.$refs.fileInput.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (evt) => {
        this.ocr = evt.target.result
      }
      const metadata = {
        contentType: 'image/jpeg',
      }

// Upload file and metadata to the object 'images/mountains.jpg'
      let uploadTask = storage.ref('transaction/' + image.name).put(image, metadata)

// Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed', // or 'state_changed'
          () => {
          },
          (error) => {
            this.$helpers.showError(error)
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.transaction.images.push(downloadURL)
              this.$helpers.close();
            })
          },
      )
    },
    change(result) {
      this.cropper = Object.assign({}, result)
    },
    async recognize() {
      this.$helpers.loading()

      const image = ImageService.preprocessImage(this.cropper.canvas)
      const worker = await load()

      this.transaction.detail = ''
      try {
        const result = await worker.recognize(image)
        const lines = result.data.lines
        const {detail, value} = postProcessing(lines);
        this.transaction.detail = detail;
        this.transaction.value = value;
        await worker.terminate()
        this.$helpers.close()
      } catch (err) {
        await worker.terminate()
        this.$helpers.showError(err)
      }
    },
    async addTransaction() {
      this.$helpers.loading()
      try {
        //Refined Data
        this.transaction.time = Timestamp.fromDate(new Date(Date.parse(this.tempDate)))
        this.transaction.value = Number.parseFloat(this.transaction.value) *
            (this.$getConst('INCREASE_DICT').includes(this.transaction.category.type) ? 1 : -1)

        if (this.$getConst('DEBT_DICT').includes(this.transaction.category.type)) {
          this.transaction.person.totalDebt += this.transaction.value
        } else if (this.$getConst('LOAN_DICT').includes(this.transaction.category.type)) {
          this.transaction.person.totalLoan += this.transaction.value
        }

        await TransactionService.addNew(this.transaction)
        this.$helpers.showSuccess()
        await this.$helpers.to('/dashboard')
      } catch (e) {
        this.$helpers.showError(e)
      }
    },
  },
  components: {
    Cropper,
    AddLayout,
    AppModal,
    CategoryModal,
    WalletModal,
    PersonModal,
    BlankModal,
  },
}
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