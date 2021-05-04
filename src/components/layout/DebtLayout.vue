<template>
  <div>
    <div v-for="person in persons" :key="person.id" class="shadow-2xl ">
      <debt-loan-card
          :person="person"
          :class="[person.totalDebt===0?'bg-gray-300 line-through':'']"
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
      persons: [],
      transactions: []
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
          .orderBy("totalDebt", "desc"),
    };
  }
}
</script>

<style scoped>

</style>