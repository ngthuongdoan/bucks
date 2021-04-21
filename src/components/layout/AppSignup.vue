<template>
  <form
      class="relative bg-white py-10 px-20 shadow-lg"
      @submit.prevent="signup"
  >
    <div class="flex flex-col lg:flex-row">
      <div class="flex flex-col lg:mr-8">
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
import {walletStore} from "@/plugin/db";
import {Auth} from "@/plugin/modules/auth";
import {UserService} from "@/service/User.service";
import {WalletService} from "@/service/Wallet.service";

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
    async signup() {
      this.$helpers.loading();
      try {
        const data = await Auth
            .createUserWithEmailAndPassword(this.user.email, this.user.password);
        await data.user.updateProfile({
          displayName: this.user.name
        });
        const response = await WalletService.initOverviewWallet(data.user.uid);
        const walletSnapshot = await walletStore.doc(response.id).get();
        const selectedWallet = await walletSnapshot.data();
        await UserService.addNew(new User(data.user.uid, data.user.displayName, data.user.email, {id: response.id, ...selectedWallet}));
        await this.$helpers.showSuccess();
      } catch (err) {
        this.$helpers.showError(err);
      }
    }
  }
};
</script>

<style>
</style>