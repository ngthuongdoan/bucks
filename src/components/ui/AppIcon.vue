<template>
  <div @click="oauth2(icon.tags[0])">
    <svg
        class="hidden"
        xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <symbol :id="icon.tags[0]" viewBox="0 0 1000 1000">
          <path :d="icon.paths[0]"></path>
        </symbol>
      </defs>
    </svg>
    <!-- :style="'fill:' + icon.attrs[0].fill" -->
    <svg :style="filled" class="w-12 h-11">
      <use :xlink:href="'#' + icon.tags[0]"></use>
    </svg>
  </div>
</template>

<script>
import User from "@/model/User.model";
import {createProvider, signInWithPopup} from "@/plugin/oauth2";
import {UserService} from "@/service/User.service";
import {WalletService} from "@/service/Wallet.service";

export default {
  props: {
    icon: {
      type: Object,
      required: true
    }
  },
  computed: {
    filled() {
      return this.icon.attrs ? { fill: this.icon.attrs[0].fill } : null;
    }
  },
  methods: {
    async oauth2(platform) {
      try {
        let provider = createProvider(platform);
        const data = await signInWithPopup(provider);
        if (data.additionalUserInfo.isNewUser) {
          const response = await WalletService.initOverviewWallet(data.user.uid);
          await UserService.addNew(new User(data.user.uid, data.user.displayName, data.user.email, response.id));
        }
        this.$helpers.showSuccess();
      } catch (e) {
        this.$helpers.showError(e);
      }
    }
  }
};
</script>

<style></style>
