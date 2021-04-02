<template>
  <div
      v-if="wallet"
      :style="{backgroundColor: wallet.color , minHeight:'150px'}"
      class="w-4/5 max-h-40 shadow-2xl rounded-lg text-white px-8 py-4"
  >
    <div v-if="showSetting" class="absolute right-4 w-1/2">
      <img alt="" class="absolute cursor-pointer right-0 py-5 pt-0" src="~@/assets/img/setting.svg"
           @click="option=!option"/>
      <wallet-options v-if="option" @away="closeOption" @config="handleOption($event)"></wallet-options>
    </div>

    <div class="flex flex-col h-full gap-3">
      <h1 class="font-bold text-sm">{{ wallet.name }}</h1>
      <p class="text-xl mt-3">{{ wallet.amount | separateValue }} <span
          class="font-bold uppercase">{{ wallet.currency }}</span></p>
      <div class="flex items-center">
        <app-icon :icon="icon"></app-icon>
        <p class="text-sm font-kredit ml-10">{{ wallet.serial }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import AppIcon from "@/components/ui/AppIcon";
import WalletOptions from "@/components/ui/WalletOptions";
import icons from "@/config/icon.json";

import { WalletService } from "@/service/Wallet.service";

export default {
  data() {
    return {
      option: false,
      icon: {},
      optionModal: ""
    };
  },
  props: {
    showSetting: {
      type: Boolean,
      default: true
    },
    wallet: {
      type: Object,
      required: true
    }
  },
  watch: {
    wallet() {
      this.icon = icons.icons.find((i) => i.tags[0] === this.wallet.type);
    },
    optionModal() {
      console.log(this.optionModal);
    }
  },
  methods: {
    closeOption() {
      this.option = false;
    },
    deleteWallet: async function () {
      const choose = await this.$helpers.confirmSwal();
      if (choose.isConfirmed) {
        this.$helpers.loading();
        try {
          await WalletService.delete(this.wallet);
          this.$helpers.showSuccess();
        } catch (err) {
          await this.$helpers.close();

          await this.$helpers.showError(err);
        }
      }
    },
    handleOption(option) {
      switch (Object.keys(option)[0]) {
        case "path":
          this.$router.push(option.path + this.wallet.id);
          break;
        case "component":
          this.optionModal = option.component;
          break;
        case "methods":
          this.deleteWallet();
          break;
        default:
          break;
      }
      this.closeOption();
    }
  },
  created() {
    this.icon = icons.icons.find((i) => i.tags[0] === this.wallet.type);
  },
  components: {
    AppIcon,
    WalletOptions
  }
};
</script>