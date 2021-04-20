<template>
  <div
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none flex justify-center items-center ">
    <div
        v-on-click-away="away"
        class="relative mx-auto bg-white py-5 px-1 min-w-max w-2/6 rounded-lg shadow-2xl">
      <!--content-->
      <div
          class="border-0 flex flex-col justify-center items-center w-full">
        <!--body-->
        <wallet-card v-for="(wallet, i) in wallets" :key="wallet.id"
                     :show-setting="false"
                     :style="{
                         zIndex:i,
                         transform: `rotateY(10deg) translateY(${(i)*((isMobile)?150:-50)}px) !important`
                     }"
                     :wallet="wallet"
                     class="wallet lg:w-3/4"
                     @click.native="changeWallet(wallet)"
        ></wallet-card>
      </div>
    </div>
    <!--    <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>-->
  </div>
</template>

<script>
import WalletCard from "@/components/ui/WalletCard";
import {userStore, walletStore} from "@/plugin/db";
import store from "@/store";
import {directive as onClickAway} from "vue-clickaway";
import {isMobile} from 'mobile-device-detect';


export default {
  data() {
    return {
      wallets: [],
      isMobile
    };
  },
  directives: {
    onClickAway
  },
  methods: {
    async changeWallet(wallet) {
      try {
        const users = userStore.doc(this.$store.getters["userModule/user"].data.uid);
        this.$bind('users', users);
        await this.$firestoreRefs.users.update({selectedWallet: {id: wallet.id, ...wallet}});
        await this.$store.dispatch("userModule/changeSelected", wallet);
        this.away()
      } catch (e) {
        console.log(e);
      }
    },
    away() {
      this.$emit('away');
    },
  },
  components: {
    WalletCard
  },
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    return {
      wallets: walletStore.where("uid", "==", uid)
    };
  }
};
</script>

<style lang="scss">

</style>