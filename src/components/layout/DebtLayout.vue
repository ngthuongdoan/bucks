<template>
  <div>
    <div v-for="person in haveDebt" :key="person.id" class="shadow-2xl">{{ person.name }}
      {{ person.totalDebt | separateValue }}
    </div>
  </div>
</template>

<script>
import store from "@/store";
import {personStore} from "@/plugin/db";

export default {
  data() {
    return {
      persons: [],
      transactions: []
    }
  },
  computed: {
    haveDebt() {
      return this.persons.filter(p => p.totalDebt !== 0)
    }
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    return {
      persons: personStore
          .where("uid", "==", uid),
    };
  }
}
</script>

<style scoped>

</style>