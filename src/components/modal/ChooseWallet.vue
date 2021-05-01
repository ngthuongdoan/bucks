<template>
  <div class="w-full px-10">
    <wallet-card v-for="(wallet, i) in wallets" :key="wallet.id"
                 :show-setting="false"
                 :style="{
                         zIndex:i,
                         transform: `rotateY(10deg) translateY(${(i)*((isMobile)?150:-50)}px) !important`
                     }"
                 :wallet="wallet"
                 class="wallet lg:w-full"
                 @click.native="changeWallet(wallet)"
    ></wallet-card>
  </div>
</template>
<script>
import WalletCard from "@/components/ui/WalletCard"
import store from "@/store";
import {userStore, walletStore} from "@/plugin/db";
import {isMobile} from "mobile-device-detect";

export default {
  data() {
    return {
      wallets: [],
      isMobile
    }
  },
  methods: {
    async changeWallet(wallet) {
      try {
        const users = userStore.doc(this.$store.getters["userModule/user"].data.uid);
        this.$bind('users', users);
        console.log({selectedWallet: {id: wallet.id, ...wallet}})
        await this.$firestoreRefs.users.update({selectedWallet: {id: wallet.id, ...wallet}});
        await this.$store.dispatch("userModule/changeSelected", wallet);
        await this.$store.dispatch("modalModule/changeModal");
      } catch (e) {
        console.log(e);
      }

    },
  },
  components: {WalletCard},
  firestore() {
    const uid = store.getters["userModule/user"].data.uid;
    return {
      wallets: walletStore.where("uid", "==", uid)
    };
  }
}
</script>