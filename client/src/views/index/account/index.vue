<template>
  <div>
    Account
    <ul>
      <li v-for="p in persons" :key="p.id">{{ p }}</li>
    </ul>
    <button class="bg-blue-600 text-white font-bold cursor-pointer w-full block py-3" @click="logout">Logout</button>
  </div>
</template>

<script>
import {logout} from "@/plugin/oauth2";
import {db} from "@/plugin/db"

export default {
  data() {
    return {
      persons: [],
    }
  },
  methods: {
    logout,
  },
  firestore: {
    persons: db.collection("person"),
  },
}
</script>

<style>
</style>