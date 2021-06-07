<template>
  <form id="addForm" class="flex flex-col m-auto gap-3 px-7 py-5" @submit.prevent="addTransaction">
    <div class="flex flex-col justify-center items-center mb-4 gap-2">
      <label>
        <input
            v-model="transaction.value"
            class="add-input text-4xl font-bold text-center m-0"
            type="text"
        />
      </label>
      <p class="text-center w-full mx-0">{{ $t("or") }}</p>
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
        {{ $t("crop") }}
      </button>
    </div>
    <div class="grid grid-cols-add items-end gap-y-2">
      <label class="font-bold self-start" for="note">{{ $t("note") }}</label>
      <textarea
          id="note"
          v-model="transaction.detail"
          class="add-input"
          rows="5"
          @click="$store.dispatch('modalModule/changeModal',{modal:'blank-modal'})"
      ></textarea>
      <label class="font-bold mt-2">{{ $t("wallet") }}</label>
      <div class="add-input " @click="$store.dispatch('modalModule/changeModal',{modal:'wallet-modal'})">
        {{ wallet.name || '' }}
      </div>
      <label class="font-bold mt-2">{{ $t("category") }}</label>
      <div class="add-input" @click="$store.dispatch('modalModule/changeModal',{modal:'category-modal'})">
        {{ transaction.category.name[$i18n.locale] || '' }}
      </div>
      <label class="font-bold mt-2" for="createdDate">{{ $t("date") }}</label>
      <input id="createdDate" v-model="tempDate" :max="maxDate" class="add-input" type="date"/>
      <label v-if="isDebtLoan" class="font-bold mt-2">{{ $t("person") }}</label>
      <div
          v-if="isDebtLoan" class="add-input"
          @click="$store.dispatch('modalModule/changeModal',{modal:'person-modal'})">{{
          transaction.person.name || ''
        }}
      </div>
    </div>
    <button class="main-btn p-3" type="button" @click="deleteTransaction">{{ $t("delete") }}</button>
  </form>
</template>

<script>
import {transactionStore} from "@/plugin/db";
import * as dayjs from "dayjs";
import {TransactionService} from "@/service/Transaction.service";

export default {
  data() {
    return {
      transaction: {},
      tempDate: '',
      isDebtLoan: false,
    }
  },
  computed: {
    maxDate() {
      return dayjs().format('YYYY-MM-DD');
    }
  },
  methods: {
    async deleteTransaction() {
      this.$helpers.loading()
      try {
        await TransactionService.delete(this.transaction)
        this.$helpers.showSuccess()
        await this.$store.dispatch("modalModule/changeModal")
      } catch (e) {
        this.$helpers.showError(e)
      }
    }
  },
  firestore() {
    const transactionId = this.$route.params.id;
    return {
      transaction: transactionStore.doc(transactionId)
    }
  }
}
</script>

<style scoped>

</style>