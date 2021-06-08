<template>
  <form class="flex flex-col m-auto gap-3 px-7 py-5">
    <div class="flex flex-col justify-center items-center mb-4 gap-2">
      <label>
        <currency-input
            v-model="transaction.value"
            :currency="null"
            :precision="0"
            :value-as-integer="true"
            class="add-input text-4xl font-bold text-center m-0 select-none"
            disabled
        />
      </label>
    </div>
    <div class="grid grid-cols-add items-end gap-y-2">
      <label class="font-bold self-start">{{ $t("note") }}</label>
      <textarea
          id="note"
          v-model="transaction.detail"
          class="add-input"
          rows="5"
          readonly
      ></textarea>
      <label class="font-bold mt-2">{{ $t("wallet") }}</label>
      <div class="add-input">
        {{ transaction.wallet || '' }}
      </div>
      <label class="font-bold mt-2">{{ $t("category") }}</label>
      <div class="add-input">
        {{ transaction.category.name[$i18n.locale] || '' }}
      </div>
      <label class="font-bold mt-2" for="createdDate">{{ $t("date") }}</label>
      <input id="createdDate" v-model="tempDate" :max="maxDate" class="add-input" readonly type="date"/>
      <label v-if="isDebtLoan" class="font-bold mt-2">{{ $t("person") }}</label>
      <div
          v-if="isDebtLoan" class="add-input">
        {{ transaction.person.name || '' }}
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
      isDebtLoan: false,
    }
  },
  computed: {
    tempDate() {
      return dayjs(this.transaction.time.toDate()).format("YYYY-MM-DD");
    },
    maxDate() {
      return dayjs().format('YYYY-MM-DD');
    }
  },
  methods: {
    async deleteTransaction() {
      this.$helpers.loading();
      try {
        await TransactionService.delete(this.transaction);
        this.$helpers.showSuccess();
        await this.$router.push("/dashboard");
      } catch (e) {
        this.$helpers.showError(e);
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
