<template>
  <div>
    <div class="w-full h-20 flex items-center bg-white shadow-xl">
      <h1 class="font-bold text-lg text-gray-900 ml-5">{{ person.name }}</h1>
      <span class="flex-grow justify-self-end text-right font-bold mr-5">{{
          person.totalLoan | separateValue
        }}</span>
    </div>
    <div>
      <app-transaction
          v-for="trans in transactions"
          :key="trans.id"
          :transaction="trans"
      ></app-transaction>
    </div>
    <div>
      <button @click="$helpers.back()">BACK</button>
      <button>PAY</button>
    </div>
  </div>
</template>

<script>
import store from "@/store"
import {personStore, transactionStore} from "@/plugin/db";
import AppTransaction from "@/components/ui/AppTransaction";

export default {
  data() {
    return {
      person: [],
      transactions: [],
    }
  },
  components: {
    AppTransaction
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    return {
      person: personStore.doc(this.$route.params.id),
      transactions: transactionStore
          .where("uid", "==", uid)
          .where("category.type", "in", this.$getConst("LOAN_DICT"))
          .where("person.id", "==", this.$route.params.id)
          .orderBy("time", "desc")
    }
  },
}
</script>

<style scoped>

</style>