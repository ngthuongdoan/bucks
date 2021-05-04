<template>
  <div>
    <div v-for="person in persons" :key="person.id" class="shadow-2xl">
      <debt-loan-card
          :is-debt="false"
          :person="person"
          :class="[person.totalLoan===0?'bg-gray-300 line-through':'']"
      ></debt-loan-card>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import {personStore} from "@/plugin/db";
import DebtLoanCard from "@/components/ui/DebtLoanCard";

export default {
  data() {
    return {
      persons: []
    }
  },
  components: {
    DebtLoanCard
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    return {
      persons: personStore
          .where("uid", "==", uid).orderBy("totalLoan", "desc"),
    };
  }
}
</script>

<style scoped>

</style>