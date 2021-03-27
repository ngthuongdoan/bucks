<template>
  <div
      :style="{backgroundColor: wallet.color }"
      class="w-4/5 min-h-40 max-h-40 shadow-2xl rounded-lg text-white px-8 py-4"
      v-if="wallet"
  >
    <img
        alt="" class="float-right cursor-pointer" src="~@/assets/img/setting.svg"/>
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

export default {
  data() {
    return {
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
  created() {
    this.icon = icons.icons.find((i) => i.tags[0] === this.wallet.type);

  },
  components: {
    AppIcon,
  },
};
</script>