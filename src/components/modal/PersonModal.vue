<template>
  <div>
    <div class="flex flex-col">
      <div>
        <input v-model="searchCriteria" class="px-5 py-2" placeholder="search..." type="search">
        <i v-if="filterPerson.length===0" class="fa fa-plus" @click="createPerson"></i>
      </div>
      <ul class="max-h-96 overflow-y-scroll">
        <li v-for="(person, i) in filterPerson" :key="i"
            class="w-full px-5 py-2 rounded-2xl my-2 cursor-pointer flex"
            @click="changePerson(person)">
          <h1 class="capitalize">{{ person.name }}</h1>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import {personStore} from "@/plugin/db";

export default {
  name: "PersonModal",
  data() {
    return {
      searchCriteria: "",
      persons: []
    }
  },
  computed: {
    filterPerson() {
      if (this.searchCriteria === "") {
        return [...this.persons].sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      } else {
        return [...this.persons]
            .filter(
                person => this.searchCriteria.toLowerCase().split('')
                    .every(v => person.name.toLowerCase().includes(v))
            )
            .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      }
    }
  },
  methods: {
    createPerson() {
      const uid = this.$store.getters["userModule/user"].data.uid;
      personStore.add({
        uid,
        name: this.searchCriteria,
        total: 0
      })
    },
    changePerson() {

    }
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    return {
      persons: personStore.where("uid", "==", uid)
    };
  }
}
</script>

<style scoped>

</style>