<template>
  <div class="h-screen overflow-auto w-screen">
    <div
      class="bg-gray-600 text-white flex justify-around items-center w-full py-5"
    >
      <img src="~@/assets/back.png" class="w-7" @click="$helpers.back" />
      <h1 class="text-lg">Add Transaction</h1>
      <button class="font-bold text-lg">Save</button>
    </div>
    <form class="flex flex-col m-auto gap-3 px-7 py-5">
      <div class="flex flex-col justify-center items-center mb-4 gap-2">
        <input
          type="number"
          min="0"
          step="1000"
          value="0"
          class="add-input text-4xl font-bold text-center"
          v-model="transaction.value"
        />
        <p class="text-center w-full ml-3">or</p>
        <label for="image">
          <img
            class="ml-3 grayscale"
            src="https://img.icons8.com/metro/26/000000/camera.png"
          />
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          ref="fileInput"
          capture="environment"
          @change="recognize"
          class="hidden"
        />
      </div>
      <div class="grid grid-cols-add items-end gap-y-2">
        <label for="username" class="font-bold self-start">Note</label>
        <textarea
          class="add-input"
          rows="5"
          v-model="transaction.detail"
        ></textarea>
        <label for="username" class="font-bold">Wallet</label>
        <select class="add-input" v-model="transaction.wallet">
          <option value="">Sacombank</option>
          <option value="">Overview</option>
          <option value="">Saving</option>
        </select>
        <label for="username" class="font-bold">Category</label>
        <select class="add-input" v-model="transaction.category">
          <option value="">A</option>
          <option value="">B</option>
          <option value="">C</option>
          c
        </select>
        <label for="username" class="font-bold">Date</label>
        <input type="date" class="add-input" v-model="transaction.date" />
      </div>
    </form>
  </div>
</template>

<script>
import { createWorker, PSM, OEM } from "tesseract.js";
const worker = createWorker({
  // workerPath: 'https://unpkg.com/tesseract.js@v2.0.0/dist/worker.min.js',
  langPath:
    "https://raw.githubusercontent.com/naptha/tessdata/gh-pages/4.0.0_best/",
  // corePath: 'https://unpkg.com/tesseract.js-core@v2.0.0/tesseract-core.wasm.js',
  logger: (m) => console.log(m),
});
export default {
  data() {
    return {
      transaction: {
        value: 0,
        time: new Date(),
        category: "",
        detail: "",
        image: "",
        wallet: "",
      },
    };
  },
  methods: {
    uploadImage() {
      const image = this.$refs.fileInput.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (evt) => {
        let img = evt.target.result;
        this.transaction.image = img;
      };
    },
    async recognize() {
      this.uploadImage();
      this.$helpers.loading();
      try {
        await worker.load();
        await worker.loadLanguage("vie");
        await worker.initialize("vie");
        const result = await worker.recognize(this.transaction.image);
        this.transaction.detail = result.data.text;
        await worker.terminate();
        this.$helpers.close();
      } catch (err) {
        this.$helpers.showError(err);
      }
    },
  },
};
</script>

<style>
</style>