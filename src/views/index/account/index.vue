<template>
  <div>
    Account
    {{ currentUser }}
    <button class="bg-blue-600 text-white font-bold cursor-pointer w-full block py-3" @click="logout">Logout</button>
  </div>
</template>

<script>
import {logout} from "@/plugin/oauth2";
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      currentUser: "userModule/user"
    })
  },
  methods: {
    logout,
  },

}
</script>

<style>
</style>