<template>
  <form
      class="relative bg-white py-10 px-20 shadow-lg"
      @submit.prevent="signup"
  >
    <div class="flex">
      <div class="flex flex-col mr-8">
        <label class="font-bold">Email</label>
        <input v-model.trim="user.email" class="input" type="email"/>
        <br/>
        <label class="font-bold">Name</label>
        <input v-model.trim="user.name" class="input" type="text"/>
      </div>
      <div class="flex flex-col">
        <label class="font-bold">Password</label>
        <input
            ref="pass"
            v-model.trim="user.password"
            class="input"
            type="password"
        />
        <br/>
        <label class="font-bold">Confirm Password</label>
        <input v-model.trim="confirmPassword" class="input" type="password"/>
      </div>
    </div>
    <input
        class="bg-green-500 w-full py-3 font-semibold mt-4 cursor-pointer"
        type="submit"
        value="Sign up"
    />
  </form>
</template>

<script>
import WalletService from "@/service/Wallet.service"
import UserService from "@/service/User.service"
import {Auth} from "@/plugin/modules/auth";
import {db} from "@/plugin/db";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        name: "",
      },
      confirmPassword: "",
    };
  },
  methods: {
    async signup() {
      try {
        const data = await Auth
            .createUserWithEmailAndPassword(this.user.email, this.user.password);

        await data.user.updateProfile({
          displayName: this.user.name,
        });


        const response = await WalletService.addNew(WalletService.initOverviewWallet(data.user.uid))
        await UserService.addNew({
          uid: data.user.uid,
          displayName: this.user.name,
          email: this.user.email,
          selectedWallet: db.collection("wallets").doc(response.id)
        })
        await this.$router.push("/login")
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style>
</style>