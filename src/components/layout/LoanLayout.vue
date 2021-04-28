<template>
  <div>
    <div v-for="person in haveLoan" :key="person.id" class="shadow-2xl">
      <debt-loan-card
          :is-debt="false"
          :person="person"
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
  computed: {
    haveLoan() {
      return this.persons.filter(p => p.totalLoan !== 0)
    }
  },
  components: {
    DebtLoanCard
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    return {
      persons: personStore
          .where("uid", "==", uid)
    };
  }
}
</script>

<style scoped>

</style>