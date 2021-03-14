<template>
  <div>
    <mobile-layout v-if="isMobile"></mobile-layout>
    <default-layout v-else></default-layout>

    <!-- <button @click="signOut">Sign Out</button> -->
  </div>
</template>
<script>
import DefaultLayout from "@/layout/DefaultLayout";
import MobileLayout from "@/layout/MobileLayout";
import { isMobile } from "mobile-device-detect";
// import { mapGetters } from "vuex";
// import firebase from "firebase";
export default {
  data() {
    return {
      isMobile,
    };
  },
  computed: {
    // ...mapGetters({
    //   // map `this.user` to `this.$store.getters.user`
    //   user: "user",
    // }),
  },
  methods: {
    // signOut() {
    //   firebase
    //     .auth()
    //     .signOut()
    //     .then(() => {
    //       this.$router.replace("/login");
    //     });
    // },
  },
  components: {
    MobileLayout,
    DefaultLayout,
  },
};
</script>