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
import User from "@/model/User.model";
import { db } from "@/plugin/db";
import { Auth } from "@/plugin/modules/auth";
import { UserService } from "@/service/User.service";
import { WalletService } from "@/service/Wallet.service";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        name: ""
      },
      confirmPassword: ""
    };
  },
  methods: {
    signup: async function () {
      this.$helpers.loading();
      try {
        const data = await Auth
            .createUserWithEmailAndPassword(this.user.email, this.user.password);

        await data.user.updateProfile({
          displayName: this.user.name
        });

        const response = await WalletService.initOverviewWallet(data.user.uid);
        await UserService.addNew(new User(data.user.uid, this.user.name, this.user.email, db.collection("wallets").doc(response.id)));
        await this.$helpers.showSuccess();
        await this.$router.go(0);
      } catch (err) {
        this.$helpers.showError(err);
      }
    }
  }
};
</script>

<style>
</style>