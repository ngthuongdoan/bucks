<template>
  <add-layout title="Change Information">
    <form id="addForm" ref="form" class="flex flex-col m-auto gap-3 px-7 py-5" @submit.prevent="changeInformation">
      <div class="grid grid-cols-add gap-y-2 justify-center items-center">
        <label class="text-input" for="name">Name</label>
        <input
            id="name"
            v-model.trim="wallet.name"
            class="add-input"
            required
        />
        <label class="text-input" for="wallet-type">Type</label>
        <div>
          <div class="flex items-center mr-4 mb-4 mt-3">
            <input id="radio1" v-model="wallet.type" class="hidden" name="radio" required type="radio" value=""/>
            <label class="flex items-center cursor-pointer" for="radio1">
              <span class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
              None</label>
          </div>
          <div class="flex items-center mr-4 mb-4">
            <input id="radio2" v-model="wallet.type" class="hidden" name="radio" required type="radio" value="visa"/>
            <label class="flex items-center cursor-pointer" for="radio2">
              <span class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
              Visa</label>
          </div>
          <div class="flex items-center mr-4 mb-4">
            <input id="radio3" v-model="wallet.type" class="hidden" name="radio" required type="radio"
                   value="mastercard"/>
            <label class="flex items-center cursor-pointer" for="radio3">
              <span class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
              Mastercard</label>
          </div>
        </div>
        <label class="text-input" for="color">Color</label>
        <v-swatches id="color" v-model="wallet.color" class="ml-3" popover-x="right"></v-swatches>
        <label class="text-input" for="serial">Serial
        </label>
        <input
            id="serial"
            v-model="wallet.serial"
            class="add-input"
        />
      </div>
    </form>
  </add-layout>
</template>

<script>
import {walletStore} from "@/plugin/db";
import AddLayout from "@/layout/AddLayout";
import VSwatches from "vue-swatches";

// Import the styles too, typically in App.vue or main.js
import 'vue-swatches/dist/vue-swatches.css';

export default {
  data() {
    return {
      wallet: null,
    };
  },
  methods: {
    async changeInformation() {
      this.$helpers.loading();
      try {
        await this.$firestoreRefs.wallet.set(this.wallet);
        this.$helpers.showSuccess();
        await this.$router.push("/dashboard")
      } catch (e) {
        this.$helpers.showError(e)
      }
    }
  },
  components: {
    AddLayout,
    VSwatches
  },
  firestore() {
    const wallet = walletStore.doc(this.$route.params.id);
    return {
      wallet
    };
  }
};
</script>

<style scoped>

</style>