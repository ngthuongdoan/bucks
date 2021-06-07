<template>
  <div>
    <form id="addForm" class="flex flex-col m-auto gap-3 px-7 py-5">
      <div class="flex flex-col justify-center items-center mb-4 gap-2">
        <label>
          <input
              v-model.number="transaction.value"
              v-unsigned
              class="add-input text-4xl font-bold text-center m-0"
              type="text"
          />
        </label>
      </div>
      <div class="grid grid-cols-add items-end gap-y-2">
        <label class="font-bold self-start" for="note">{{ $t("note") }}</label>
        <textarea
            id="note"
            v-model="transaction.detail"
            class="add-input"
            readonly
            rows="5"
        ></textarea>
        <label class="font-bold mt-2" for="wallet">{{ $t("wallet") }}</label>
        <div class="add-input ">
          {{ wallet.name }}
        </div>
        <label class="font-bold mt-2" for="category">{{ $t("category") }}</label>
        <div class="add-input">
          {{ transaction.category.name || "" }}
        </div>
        <label class="font-bold mt-2" for="createdDate">{{ $t("date") }}</label>
        <input id="createdDate" v-model="tempDate" class="add-input" readonly type="date"/>
        <label v-if="transaction.person" class="font-bold mt-2">{{ $t("person") }}</label>
        <div v-if="transaction.person" class="add-input">{{
            transaction.person.name || ""
          }}
        </div>
      </div>
      <button class="main-btn p-3" type="button" @click="deleteTransaction">{{ $t("delete") }}</button>
    </form>
  </div>
</template>

<script>
import {transactionStore, walletStore} from "@/plugin/db";
import store from "@/store"
import dayjs from "dayjs";
import {TransactionService} from "@/service/Transaction.service";

export default {
  data() {
    return {
      transaction: {},
      wallet: {}
    }
  },
  computed: {
    tempDate() {
      return dayjs(this.transaction.time.toDate()).format("YYYY-MM-DD")
    },
  },
  watch: {
    transaction() {
      this.$bind("wallet", walletStore.doc(this.transaction.wallet))
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
    const id = store.getters["modalModule/param"];
    return {
      transaction: transactionStore.doc(id),
    }
  }
};
</script>
