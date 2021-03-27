<template>
  <div
      v-if="wallet"
      :style="{backgroundColor: wallet.color }"
      class="w-4/5 min-h-40 max-h-40 shadow-2xl rounded-lg text-white px-8 py-4"
  >
    <div class="absolute right-4 w-1/2">
      <img alt="" class="absolute cursor-pointer right-0 py-5 pt-0" src="~@/assets/img/setting.svg"
           @click="option=!option"/>
      <wallet-options v-if="option" @away="closeOption"></wallet-options>
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
import icons from "@/config/icon.json";
import WalletOptions from "@/components/ui/WalletOptions";

export default {
  data() {
    return {
      option: false,
      icon: {},
    };
  },
  props: {
    wallet: {
      type: Object,
      required: true
    }
  },
  watch: {
    wallet() {
      this.icon = icons.icons.find((i) => i.tags[0] === this.wallet.type);
    }
  },
  methods: {
    closeOption() {
      this.option = false
    },

  },
  created() {
    this.icon = icons.icons.find((i) => i.tags[0] === this.wallet.type);
  },
  components: {
    AppIcon,
    WalletOptions
  },
};
</script>