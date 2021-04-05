<template>
  <div>
    <div
        class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div
          v-on-click-away="away"
          class="relative w-auto my-6 mx-auto min-w-full max-w-sm">
        <!--content-->
        <div
            class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--body-->
          <div class="relative p-2 flex-auto">
            <ul v-if="isWallet">
              <li v-for="(item, i) in data" :key="i" :style="{backgroundColor:item.color}"
                  class="shadow-xl w-full px-5 py-2 rounded-2xl my-2 cursor-pointer"
                  @click="changeWallet(item)">
                <h1 class="font-bold text-white">{{ item.name }}</h1>
                <p>{{ item.id }}</p>
                <p class="italic text-gray-200 text-sm">{{ item.amount }} {{ item.currency.key }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import { directive as onClickAway } from "vue-clickaway";

export default {
  name: "large-modal",
  props: {
    data: {
      type: Array,
      required: true
    },
    isWallet: {
      type: Boolean,
      default: true
    }
  },
  directives: {
    onClickAway
  },
  methods: {
    away() {
      this.$emit('away');
    },
    changeWallet(wallet) {
      this.$emit("change-wallet", wallet);
      this.away();
    }
  }

};
</script>